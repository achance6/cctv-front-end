import { useEffect, useState } from "react";
import "@/assets/css/playbackPage.css";
import NavBar from "@/components/navBar.tsx";
import { useSearchParams } from "react-router";
import { getUrl } from "aws-amplify/storage";

export interface VideoApi {
  uuid: string;
  title: string;
  description: string;
  tags: string[];
  creationDate: Date;
  uploader: string;
}

function PlaybackPage() {
  const [tags, setTags] = useState([
    "TAG 1",
    "TAG 2",
    "TAG 3",
    "TAG 4",
    "TAG 5",
  ]);
  const [uploader, setUploader] = useState("Uploader Name");
  const [description, setDescription] = useState("Description");
  const [title, setTitle] = useState("Title");
  const [presignedUrl, setPresignedUrl] = useState<string | undefined>(
    undefined,
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const uuid = searchParams.get("v") ?? "";
    fetch(
      "https://t0cgas8vb5.execute-api.us-east-1.amazonaws.com/video/" + uuid,
    )
      .then((response) => response.json())
      .then((data: VideoApi) => {
        setUploader(data.uploader);
        setTags(data.tags);
      })
      .catch((err: unknown) => {
        console.error("Failed to fetch video data:", err);
      });

    getUrl({
      options: {
        bucket: {
          bucketName: "cctv-transcoded-video-storage",
          region: "us-east-1",
        },
        validateObjectExistence: true,
        expiresIn: 300,
        useAccelerateEndpoint: false,
      },
      path: "mp4/" + uuid + "-high-res.mp4",
    })
      .then(function (result) {
        setPresignedUrl(result.url.toString());
        const videoPlayer = document.getElementById(
          "videoPlayer",
        ) as HTMLVideoElement;
        videoPlayer.load();
      })
      .catch((unknown: unknown) => {
        alert(unknown);
      });
  }, [searchParams]);

  return (
    <div className="tc">
      <NavBar />
      <div className="wrapper">
        <div className="video-container">
          <video id="videoPlayer" controls>
            <source src={presignedUrl} type="video/mp4" />
          </video>
        </div>

        <div className="controls-container">
          <div className="upload-btn-container">
            <button type={"button"} className="uploadUser-btn">
              {uploader}
            </button>
          </div>

          <div className="tag-container">
            {tags.map((tag) => (
              <button type={"button"} key={tag} className="tag-btn">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaybackPage;
