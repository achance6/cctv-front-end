import "@/assets/css/videoCard.css";
import { Card, Flex, Image, Text, View } from "@aws-amplify/ui-react";
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
      path: "thumbs/" + video.uuid + ".0000000.jpg",
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
        search: "?v=" + video.uuid,
      }}
      className={"hover:bg-fuchsia-300"}
    >
      <Card
        className={"bg-white hover:bg-fuchsia-300"}
        variation={"elevated"}
        width={"350px"}
        height={"250px"}
        border={"1px solid gray"}
      >
        <Image
          src={thumbnailSrc ? thumbnailSrc : undefined}
          alt={video.title}
          objectFit={"cover"}
          width={"100%"}
          height={"100%"}
        />
        <View>
          <Text
            isTruncated={true}
            className={"videoTitle"}
            fontWeight={"bold"}
            fontSize={"1.1rem"}
          >
            {video.title}
          </Text>
          <Flex gap={".7rem"} className={"videoInfo"}>
            {/*<Avatar  className="videoAvatar"src={props.avatar} />*/}
            <Text
              className="videoChannelName"
              isTruncated={true}
              fontStyle={"italic"}
            >
              {video.uploader}
            </Text>
            <Text className="videoData" paddingLeft={"1rem"}>
              {video.views} views : {video.time}
            </Text>
          </Flex>
        </View>
      </Card>
    </Link>
  );
}

export default VideoCard;
