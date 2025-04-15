import { useEffect, useState } from "react";
import "@/assets/css/playbackPage.css";
import NavBar from "@/components/navBar.tsx";
import { useSearchParams } from "react-router";
import { getUrl } from "aws-amplify/storage";
import "@vidstack/react/player/styles/base.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { Button, Flex, Text, View } from "@aws-amplify/ui-react";

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
      })
      .catch((unknown: unknown) => {
        console.error("Failed to load video data:", unknown);
      });
  }, [searchParams]);

  return (
    <View>
      <NavBar />
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex direction={"column"} className={"video-container"}>
          {presignedUrl ? (
            <MediaPlayer title="Sprite Fight" src={presignedUrl}>
              <MediaProvider />
            </MediaPlayer>
          ) : (
            <Text>Loading video...</Text>
          )}
        </Flex>

        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <Flex justifyContent={"flex-start"}>
            <Button type={"button"} className="uploadUser-btn">
              {uploader}
            </Button>
          </Flex>

          <Flex gap={"10px"}>
            {tags.map((tag) => (
              <Button type={"button"} key={tag} className="tag-btn">
                {tag}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
}

export default PlaybackPage;
