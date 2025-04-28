import { Card, Flex, Image, Text } from "@aws-amplify/ui-react";
import { Link } from "react-router";
import Video from "@/types/video.ts";
import { getUrl } from "aws-amplify/storage";
import { useEffect, useState } from "react";

function VideoCard(video: Video) {
  const [thumbnailSrc, setThumbnailSrc] = useState("");

  useEffect(() => {
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
      path: "thumbs/" + video.videoId + ".0000000.jpg",
    })
      .then(function (result) {
        setThumbnailSrc(result.url.toString());
      })
      .catch((unknown: unknown) => {
        console.error("Failed to load video data:", unknown);
      });
  });

  return (
    <Link
      to={{
        pathname: "/playback",
        search: "?v=" + video.videoId,
      }}
      className={"hover:bg-fuchsia-300"}
    >
      <Card
        className={"bg-white hover:bg-fuchsia-300"}
        variation={"elevated"}
        width={"400px"}
        height={"330px"}
        border={"1px solid gray"}
      >
        <Image
          src={thumbnailSrc ? thumbnailSrc : undefined}
          alt={video.title}
          objectFit={"cover"}
          width={"100%"}
          height={"75%"}
        />
        <Flex direction={"column"}>
          <Text
            isTruncated={true}
            fontWeight={"bold"}
            fontSize={"1.1rem"}
            padding-left={"20px"}
          >
            {video.title}
          </Text>
          <Flex gap={".7rem"} direction={"row"}>
            <Text isTruncated={true} fontStyle={"italic"} fontWeight={"bold"}>
              {video.uploader}
            </Text>

            {/*<Avatar  className="videoAvatar"src={props.avatar} />*/}
            <Text paddingLeft={"1rem"} fontSize={"1rem"}>
              {video.viewCount} views
            </Text>
            <Text paddingLeft={"1rem"} fontSize={"1rem"}>
              {new Date(video.creationDateTime).toDateString()}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
}

export default VideoCard;
