import {useEffect, useState} from 'react';
import '@/assets/css/playbackPage.css';
import {Video} from "@/assets/sampleVideos.ts";

function PlaybackPage() {
    const [videoSrc, setVideoSrc] = useState("beach.mp4");
    const [tags, setTags] = useState(["TAG 1", "TAG 2", "TAG 3", "TAG 4", "TAG 5"]);
    const [uploader, setUploader] = useState("Uploader Name");

    useEffect(() => {
        fetch('/api/videoData')
            .then(res => res.json())
            .then((data: Video) => {
                setVideoSrc(data.videoSrc);
                setTags(data.tags);
                setUploader(data.uploader);
            })
            .catch((err: unknown) => {
                console.error("Failed to fetch video data:", err)
            });
    }, []);

    return (
        <div className="tc">
            <div className="wrapper">
                <div className="video-container">
                    <video id="videoPlayer" controls>
                        <source src={videoSrc} type="video/mp4"/>
                    </video>
                </div>

                <div className="controls-container">
                    <div className="upload-btn-container">
                        <button type={"button"} className="uploadUser-btn">{uploader}</button>
                    </div>

                    <div className="tag-container">
                        {tags.map((tag) => (
                            <button type={"button"} key={tag} className="tag-btn">{tag}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaybackPage;
