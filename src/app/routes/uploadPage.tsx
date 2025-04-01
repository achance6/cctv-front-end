import "@aws-amplify/ui-react/styles.css";
import "@/assets/css/uploadPage.css";
import NavBar from "@/components/navBar";
import {
  Button,
  Flex,
  Heading,
  Input,
  Message,
  Text,
  TextAreaField,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { uploadData } from "aws-amplify/storage/s3";

function UploadPage() {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoTags, setVideoTags] = useState("");
  const [file, setFile] = useState<File | null>();
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const navigate = useNavigate();

  const handleCancel = async () => {
    await navigate("/");
  };

  const uploadVideo = () => {
    if (!file) {
      alert("Please upload a video");
      return;
    }

    if (videoTitle === "" || videoDescription === "" || videoTags === "") {
      alert("Please fill in all fields");
      return;
    } else {
      console.log("Uploading...");
      console.log("Title:", videoTitle);
      console.log("Description:", videoDescription);
      console.log("Tags:", videoTags);
    }

    try {
      uploadData({
        path: ({ identityId }) =>
          `${identityId?.toString() ?? ""}/${file.name}`,
        data: file,
        options: {
          bucket: {
            bucketName: "cctv-video-storage",
            region: "us-east-1",
          },
        },
      });
      setUploadStatus("success");
    } catch (err) {
      console.log("Upload failed:", err);
      setUploadStatus("error");
    }
  };

  return (
    <View width={"100%"} className={"bg-gray-200"}>
      <NavBar />
      <Flex
        direction={"column"}
        alignItems={"center"}
        className={"bg-gray-200"}
      >
        <Heading level={1}>Upload Page</Heading>
        <Text>Upload your video here</Text>
        <Flex
          as="form"
          direction="row"
          justifyContent={"space-evenly"}
          paddingRight={"5%"}
          paddingLeft={"5%"}
          width={"100%"}
          gap="8"
        >
          <Flex
            width={"50%"}
            height={"100%"}
            textAlign={"center"}
            direction="column"
            gap="4"
            className="items-center"
          >
            <TextField
              id="videoTitle"
              name={"videoTitle"}
              onChange={(e) => {
                setVideoTitle(e.target.value);
              }}
              label={"Title:"}
            />
            <TextAreaField
              id="videoDescription"
              name="videoDescription"
              placeholder="Tell us about your video"
              rows={3}
              onChange={(e) => {
                setVideoDescription(e.target.value);
              }}
              label="Description:" //Blank label to remove default label
            />
            <TextField
              id="videoTags"
              name="videoTags"
              onChange={(e) => {
                setVideoTags(e.target.value);
              }}
              label={"Tags:"}
            />
            <Flex direction="row" gap="8" className="container">
              <Button
                type="button"
                onClick={uploadVideo}
                className="btn upload bg-blue-500 text-white px-4 py-2 rounded"
              >
                Upload
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                className="btn cancel bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
          <View
            height={"100%"}
            width={"30%"}
            className="p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <Input
              id="videoUpload"
              type="file"
              accept="video/*"
              size="large"
              variation={"quiet"}
              onChange={(e) => {
                setFile(e.target.files?.[0]);
              }}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </View>
          {/*File upload status*/}
          {uploadStatus === "success" && (
            <Message colorTheme="success">Video uploaded successfully!</Message>
          )}
          {uploadStatus === "error" && (
            <Message colorTheme="error">Video upload failed!</Message>
          )}
        </Flex>
      </Flex>
    </View>
  );
}

export default UploadPage;
