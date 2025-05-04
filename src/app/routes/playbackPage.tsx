import { useEffect, useRef, useState } from "react";
import "@/assets/css/playbackPage.css";
import NavBar from "@/components/navBar.tsx";
import { Link, useSearchParams } from "react-router";
import { getUrl } from "aws-amplify/storage";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
} from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import {
  Button,
  Flex,
  Heading,
  Label,
  Menu,
  MenuItem,
  Text,
  View,
} from "@aws-amplify/ui-react";
import Video from "@/types/video.ts";

function PlaybackPage() {
  const [video, setVideo] = useState<Video>({
    creationDateTime: new Date(0),
    description: "",
    tags: [],
    time: 0,
    title: "",
    uploader: "",
    videoId: "",
    viewCount: 0,
  });
  const [highResPresignedUrl, setHighResPresignedUrl] = useState<
    string | undefined
  >(undefined);
  const [mediumResPresignedUrl, setMediumResPresignedUrl] = useState<
    string | undefined
  >(undefined);
  const [lowResPresignedUrl, setLowResPresignedUrl] = useState<
    string | undefined
  >(undefined);
  const [ultraLowResPresignedUrl, setUltraLowResPresignedUrl] = useState<
    string | undefined
  >(undefined);
  const [searchParams] = useSearchParams();

  const player = useRef<MediaPlayerInstance>(null);
  // Desired video player defaults
  if (player.current) {
    player.current.qualities.switch = "current";
    player.current.qualities.autoSelect();
  }

  useEffect(() => {
    const uuid = searchParams.get("v") ?? "";
    fetch(
      "https://t0cgas8vb5.execute-api.us-east-1.amazonaws.com/video/" +
        uuid +
        "/view",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((data: Video) => {
        setVideo(data);
      })
      .catch((err: unknown) => {
        console.error("Error fetching video metadata: ", err);
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
        setHighResPresignedUrl(result.url.toString());
      })
      .catch((unknown: unknown) => {
        console.error("Failed to load video data:", unknown);
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
      path: "mp4/" + uuid + "-medium-res.mp4",
    })
      .then(function (result) {
        setMediumResPresignedUrl(result.url.toString());
      })
      .catch((unknown: unknown) => {
        console.error("Failed to load video data:", unknown);
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
      path: "mp4/" + uuid + "-low-res.mp4",
    })
      .then(function (result) {
        setLowResPresignedUrl(result.url.toString());
      })
      .catch((unknown: unknown) => {
        console.error("Failed to load video data:", unknown);
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
      path: "mp4/" + uuid + "-ultra-low-res.mp4",
    })
      .then(function (result) {
        setUltraLowResPresignedUrl(result.url.toString());
      })
      .catch((unknown: unknown) => {
        console.error("Failed to load video data:", unknown);
      });
  }, [searchParams]);

  function handleQualitySelect(id: string) {
    if (!player.current) {
      return;
    }
    switch (id) {
      case "highQualitySelect":
        if (player.current.qualities[0]) {
          player.current.qualities[0].selected = true;
        }
        break;
      case "mediumQualitySelect":
        if (player.current.qualities[1]) {
          player.current.qualities[1].selected = true;
        }
        break;
      case "lowQualitySelect":
        if (player.current.qualities[2]) {
          player.current.qualities[2].selected = true;
        }
        break;
      case "ultraLowQualitySelect":
        if (player.current.qualities[3]) {
          player.current.qualities[3].selected = true;
        }
    }
  }

  return (
    <View>
      <NavBar />
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading level={2} fontWeight={"bold"} marginBottom={"1rem"} style={{ color: "white" }}>
          {video.title}
        </Heading>

        <Flex
          direction={"column"}
          width={"100%"}
          maxWidth={"1400px"}
          backgroundColor={"black"}
          boxShadow={"0 4px 10px rgba(0, 0, 0, 0.3)"}
        >
          {highResPresignedUrl &&
          mediumResPresignedUrl &&
          lowResPresignedUrl &&
          ultraLowResPresignedUrl ? (
            <MediaPlayer
              title="Sprite Fight"
              controls={true}
              ref={player}
              viewType={"video"}
              streamType={"on-demand"}
              src={[
                {
                  src: highResPresignedUrl,
                  type: "video/mp4",
                  width: 1920,
                  height: 1080,
                },
                {
                  src: mediumResPresignedUrl,
                  type: "video/mp4",
                  width: 1280,
                  height: 720,
                },
                {
                  src: lowResPresignedUrl,
                  type: "video/mp4",
                  width: 853,
                  height: 480,
                },
                {
                  src: ultraLowResPresignedUrl,
                  type: "video/mp4",
                  width: 640,
                  height: 360,
                },
              ]}
              playsInline={true}
            >
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
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
            <Link to={"/profile/" + video.uploader}>
              <Button
                id={"upload-user"}
                type={"button"}
                className="uploadUser-btn"
              >
                {video.uploader}
              </Button>
            </Link>
          </Flex>
          <View>
            <Label htmlFor={"qualitySelect"} color={"black"}>
              Quality
            </Label>
            <Menu id={"qualitySelect"} size={"large"}>
              <MenuItem
                id={"highQualitySelect"}
                onClick={(event) => {
                  handleQualitySelect(event.currentTarget.id);
                }}
              >
                1080p
              </MenuItem>
              <MenuItem
                id={"mediumQualitySelect"}
                onClick={(event) => {
                  handleQualitySelect(event.currentTarget.id);
                }}
              >
                720p
              </MenuItem>
              <MenuItem
                id={"lowQualitySelect"}
                onClick={(event) => {
                  handleQualitySelect(event.currentTarget.id);
                }}
              >
                480p
              </MenuItem>
              <MenuItem
                id={"ultraLowQualitySelect"}
                onClick={(event) => {
                  handleQualitySelect(event.currentTarget.id);
                }}
              >
                360p
              </MenuItem>
            </Menu>
          </View>
        </Flex>
        <Flex justifyContent={"start"}>
          <Text fontSize={"1rem"} lineHeight={"1.4"}>
            {video.description}
          </Text>
          <Text fontSize={"1rem"} lineHeight={"1.4"}>
            {video.viewCount} views
          </Text>
        </Flex>
        <Flex gap={"10px"}>
          {video.tags.map((tag) => (
            <Button type={"button"} key={tag} className="tag-btn">
              {tag}
            </Button>
          ))}
        </Flex>
      </Flex>
    </View>
  );
}

export default PlaybackPage;
