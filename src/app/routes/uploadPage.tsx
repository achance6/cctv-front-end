import "@aws-amplify/ui-react/styles.css";
import '@/assets/css/uploadPage.css';
import NavBar from '@/components/navBar';
import {Button, Flex, Input, Label, TextAreaField} from '@aws-amplify/ui-react';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {uploadData} from "aws-amplify/storage/s3";


function UploadPage() {

    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoTags, setVideoTags] = useState('');
    const [file, setFile] = useState<File | null>();
    const navigate = useNavigate();

    const handleCancel = async () => {
        await navigate('/');
    }

    const uploadVideo = () => {
        if (!file) {
            return;
        }
        if (videoTitle === "" || videoDescription === "" || videoTags === "") {
            alert("Please fill in all fields");
        } else {
            console.log("Uploading...");
            console.log('Title:', videoTitle);
            console.log('Description:', videoDescription);
            console.log('Tags:', videoTags);
        }

        uploadData({
            path: ({identityId}) => `${identityId?.toString() ?? ""}/${file.name}`,
            data: file,
            options: {
                bucket: {
                    bucketName: "cctv-video-storage",
                    region: "us-east-1"
                }
            }
        })
    }

    return (
        <div>
            <NavBar/>
            <h1>Upload Page</h1>
            <p>Upload your video here</p>
            <Flex as="form" direction="row" width="50rem" className="container">

                <Flex direction="column" gap="small" width="25rem" className="div">
                    <Flex direction="row" gap="small" className="div">
                        <Label htmlFor="Title">Title:</Label>
                        <Input
                            id="videoTitle"
                            type="text"
                            value={videoTitle}
                            onChange={(e) => {
                                setVideoTitle(e.target.value)
                            }}/>
                    </Flex>

                    <Flex direction="row" gap="small" className="div">
                        <Label htmlFor="Description">Description:</Label>
                        <TextAreaField
                            label="Description"
                            name="last_name"
                            placeholder="Tell us about your video"
                            rows={3}
                            value={videoDescription}
                            onChange={(e) => {
                                setVideoDescription(e.target.value)
                            }}
                        />
                    </Flex>

                    <Flex direction="row" gap="small" className="div">
                        <Label htmlFor="Tags">Tags:</Label>
                        <Input
                            id="videoTags"
                            type="text"
                            value={videoTags}
                            onChange={(e) => {
                                setVideoTags(e.target.value)
                            }}/>
                    </Flex>

                </Flex>

                <Flex direction="column" gap="small" width="25rem" className="div">
                    <input
                        type={"file"}
                        accept={"video/*"}
                        onChange={(e) => {
                            setFile(e.target.files?.[0])
                        }}/>
                </Flex>
            </Flex>

            <Flex direction="row" gap="large" width="20rem" className="container">
                <Button type="button"
                        onClick={uploadVideo}
                        className="btn upload">Upload
                </Button>
                <Button type="button"
                        onClick={handleCancel}
                        className="btn cancel">Cancel
                </Button>
            </Flex>
        </div>
    );
}

export default UploadPage;
