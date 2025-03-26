import "@aws-amplify/ui-react/styles.css";
import '@/assets/css/uploadPage.css';
import NavBar from '@/components/navBar';
import {Button, Flex, Input, Label, TextAreaField, Message} from '@aws-amplify/ui-react';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {uploadData} from "aws-amplify/storage/s3";

function UploadPage() {
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoTags, setVideoTags] = useState('');
    const [file, setFile] = useState<File | null>();
    const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
    const navigate = useNavigate();

    const handleCancel = async () => {
        await navigate('/');
    }


    const uploadVideo = () => {
        if (!file) {
            alert('Please upload a video');
            return;
        }
        if (videoTitle === "" || videoDescription === "" || videoTags === "") {
            alert("Please fill in all fields");
            return;
        } else {
            console.log("Uploading...");
            console.log('Title:', videoTitle);
            console.log('Description:', videoDescription);
            console.log('Tags:', videoTags);
        }

        try {
            uploadData({
                path: ({identityId}) => `${identityId?.toString() ?? ""}/${file.name}`,
                data: file,
                options: {
                    bucket: {
                        bucketName: "cctv-video-storage",
                        region: "us-east-1"
                    }
                }
            });
            setUploadStatus("success");
        }catch(err) {
            console.log("Upload failed:", err);
            setUploadStatus("error");
        }



    }

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar/>
            <h1 className="text-4xl font-bold text-center my-8">Upload Page</h1>
            <p className="text-center mb-8">Upload your video here</p>
            <Flex as="form" direction="row" className="container mx-auto px-4" width="full" gap="8">
                <Flex direction="column" gap="4" className="w-full md:w-1/2">
                    <Flex direction="row" gap="4" className="items-center">
                        <Label htmlFor="videoTitle" className="w-1/4">Title:</Label>
                        <Input
                            id="videoTitle"
                            type="text"
                            value={videoTitle}
                            onChange={(e) => {
                                setVideoTitle(e.target.value)
                            }}
                            className="w-3/4"
                        />
                    </Flex>
                    <Flex direction="row" gap="4" className="items-center">
                        <Label htmlFor="videoDescription" className="w-1/4">Description:</Label>
                        <TextAreaField
                            label="Description"
                            name="last_name"
                            placeholder="Tell us about your video"
                            rows={3}
                            value={videoDescription}
                            onChange={(e) => {
                                setVideoDescription(e.target.value)
                            }}
                            className="w-3/4"
                        />
                    </Flex>
                    <Flex direction="row" gap="4" className="items-center">
                        <Label htmlFor="videoTags" className="w-1/4">Tags:</Label>
                        <Input
                            id="videoTags"
                            type="text"
                            value={videoTags}
                            onChange={(e) => {
                                setVideoTags(e.target.value)
                            }}
                            className="w-3/4"
                        />
                    </Flex>


                </Flex>
                <Flex direction="column" gap="4" className="w-full md:w-1/2">
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                            setFile(e.target.files?.[0])
                        }}
                        className="w-full"
                    />
                    {/*File upload status*/}
                    {uploadStatus === "success" && <Message colorTheme="success">File uploaded successfully!</Message> }
                    {uploadStatus === "error" && <Message colorTheme="error">File upload failed!</Message> }

                </Flex>

            </Flex>
            <Flex direction="row" gap="8" className="container mx-auto px-4 mt-8">
                <Button type="button" onClick={uploadVideo}
                        className="btn upload bg-blue-500 text-white px-4 py-2 rounded">Upload</Button>
                <Button type="button" onClick={handleCancel}
                        className="btn cancel bg-red-500 text-white px-4 py-2 rounded">Cancel</Button>
            </Flex>
        </div>
    );
}

export default UploadPage;
