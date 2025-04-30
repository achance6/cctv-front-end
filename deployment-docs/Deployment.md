# Deployment Instructions for CCTV

Cloud Chasers TV (CCTV) makes extensive use of AWS services and makes use of an entirely serverless backend.
The web client is static, served out of an S3 bucket. The database layer makes use of DynamoDB.

## Setting up DynamoDB Persistence

1. In the AWS console, create a DynamoDB table with default configuration
2. Set the partition key to `VideoId` of type `String`

## Setting up S3 buckets

1. In the AWS console, three S3 buckets will be created (all should have public access blocked)
2. Create an S3 bucket to hold original videos.
    1. Set the bucket's CORS configuration `cors.json`
3. Create an S3 bucket to hold transcoded videos and thumbnails.
    1. Set the bucket's CORS configuration to `cors.json`
4. Create an S3 bucket that will host the static web client.
    1. If you are setting a DNS service to point to the web client, the S3 bucket name must match the domain name.
    2. Enable static website hosting for this bucket
    3. Set the bucket's "bucket policy" to `bucket-policy.json`
    4. Set the bucket's CORS configuration to `cors.json`

## Deploying the Backend Services

There are a couple backend services that need to be set up. `Transcoder Dispatch Service` and `Video Service`.
Both services are compiled to native image using GraalVM, containerized, and deployed to AWS Lambda.
The `Video Service` is a more traditionally setup web server, while the `Transcoder Dispatch Service` is set up in a
more function / "lambda-esque" style.
Both use the Micronaut framework and come with a maven wrapper for building (i.e., no local maven install required).

### Transcoder Dispatch Service

1. Clone https://github.com/achance6/cctv-transcoder-dispatch-service
2. In `com.chasers.cloud.TranscoderDispatchService` change these fields to match your setup
    1. `private static final String s3OutputURI = "s3://<your transcoded S3 storage bucket name>/";`
    2. `private static final String mediaConvertRoleArn = "<arn for your mediaConvert default role>";`
3. Run `./mvnw package -Dpackaging=docker-native -Dmicronaut.runtime=lambda -Pgraalvm`
4. `function.zip` will be placed in `cctv-transcoder-dispatch-service/target`.
   This contains the native executable (compiled on Linux) along with the bootstrap file needed for a lambda custom
   runtime
5. In the AWS console, create an AWS lambda using the following settings:
    1. Same architecture of the machine you compiled on (I used arm64).
    2. Amazon Linux 202x runtime
    3. This lambda will need permissions to submit jobs to MediaConvert.
6. Upload function.zip to the lambda
7. From the S3 bucket hosting original videos, create an S3 event notification that invokes the transcoder dispatch
   function
   whenever an object is uploaded to the bucket
8. In AWS MediaConvert, create "output presets" called `high-res`, `medium-res`, `low-res`, `ultra-low-res`
    1. See the respective json files for the definitions of these presets.

### Video Service

1. Clone https://github.com/achance6/cctv-video-service
2. Set the variable in `cctv-video-service/src/main/java/cctv/video/service/service/VideoService.java` to the name of
   your DynamoDB table
    1. `private static final String DYNAMODB_TABLE_NAME = "<DynamoDB table name>";`
3. Run `./mvnw package -Dpackaging=docker-native -Dmicronaut.runtime=lambda -Pgraalvm`
4. `function.zip` will be placed in `cctv-video-service/target`
   This contains the native executable (compiled on Linux) along with the bootstrap file needed for a lambda custom
   runtime
5. In the AWS console, create an AWS lambda using the following settings:
    1. Same architecture of the machine you compiled on (I used arm64).
    2. Amazon Linux 202x runtime
    3. This lambda will need permissions to read and write to DynamoDB

## Setting up API Gateway

1. In the AWS console, create an API Gateway HTTP API
2. Create a single route called `/{proxy+}` that accepts HTTP requests of type `ANY`
3. On this route, attach an integration to the `Video Service` lambda using payload format 2.0
4. Configure CORS on this API
    1. Set `Access-Control-Allow-Origin` to allow either all origins `*` or just the domains you'd like to be able to
       access the API
       e.g. http://localhost:5173 or https://cloudchaserstv.com
    2. Set `Access-Control-Allow-Methods` to allow all HTTP methods `*`.

## Deploying the Client

You must have the Node Package Manager (NPM) tool installed. Optionally install the Vite CLI.
These instructions assume you have Vite CLI, but the same instructions can be run using `npm run` instead of `vite`.

1. Clone the front end repository at https://github.com/achance6/cctv-front-end
2. Run `npm i` to install needed dependencies
3. Set the constant in `cctv-front-end/src/config/const.ts` to the API Gateway URL
4. Run `vite build` to build the project for production
5. The built project will be contained within the `cctv-front-end/dist` folder
6. Upload the contents of the dist folder to the S3 bucket setup to act as a static site host.
7. Use the S3 generated bucket URL to access the web client.
8. Optionally configure a DNS provider (e.g., Amazon Route 53) to point a domain towards your bucket instead of using
   the generated URL.