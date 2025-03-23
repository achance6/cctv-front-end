import React, { useState, useEffect } from 'react';
import 'tachyons/css/tachyons.min.css';
import './playbackPage.css';

interface VideoData {
  videoSrc: string;
  tags: string[];
  uploader: string;
}

const playbackPage: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>("beach.mp4");
  const [tags, setTags] = useState<string[]>(["TAG 1", "TAG 2", "TAG 3", "TAG 4", "TAG 5"]);
  const [uploader, setUploader] = useState<string>("Uploader Name");

  useEffect(() => {
    fetch('/api/videoData')
      .then(res => res.json())
      .then((data: VideoData) => {
        setVideoSrc(data.videoSrc);
        setTags(data.tags);
        setUploader(data.uploader);
      })
      .catch(err => console.error("Failed to fetch video data:", err));
  }, []);

  return (
    <div className="tc">
      <div className="wrapper">
        <div className="video-container">
          <video id="videoPlayer" controls>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>

        <div className="controls-container">
          <div className="upload-btn-container">
            <button className="uploadUser-btn">{uploader}</button>
          </div>

          <div className="tag-container">
            {tags.map((tag, index) => (
              <button key={index} className="tag-btn">{tag}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default playbackPage;
