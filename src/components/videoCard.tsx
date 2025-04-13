import "@/assets/css/videoCard.css";
import { Card, Flex, Image, Text, View } from "@aws-amplify/ui-react";
import { Link } from "react-router";
import { Video } from "@/assets/sampleVideos.ts";

function VideoCard(video: Video) {
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
          className={"videoThumbnail"}
          src={video.thumbnail}
          alt={video.title}
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
              {video.channelName}
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
