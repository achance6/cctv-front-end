import "@/assets/css/videoCard.css";
import { Card, Flex, Image, Text, View } from "@aws-amplify/ui-react";
import { Link } from "react-router";

interface VideoCardProps {
  thumbnail: string;
  title: string;
  channelName: string;
  views: number;
  time: string;
}

function VideoCard(props: VideoCardProps) {
  return (
    <Link to={"/playback"} className={"hover:bg-fuchsia-300"}>
      <Card
        className={"bg-white hover:bg-fuchsia-300"}
        variation={"elevated"}
        width={"350px"}
        height={"250px"}
        border={"1px solid gray"}
      >
        <Image
          className={"videoThumbnail"}
          src={props.thumbnail}
          alt={props.title}
        />
        <View>
          <Text
            isTruncated={true}
            className={"videoTitle"}
            fontWeight={"bold"}
            fontSize={"1.1rem"}
          >
            {props.title}
          </Text>
          <Flex gap={".7rem"} className={"videoInfo"}>
            {/*<Avatar  className="videoAvatar"src={props.avatar} />*/}
            <Text
              className="videoChannelName"
              isTruncated={true}
              fontStyle={"italic"}
            >
              {props.channelName}
            </Text>
            <Text className="videoData" paddingLeft={"1rem"}>
              {props.views} views : {props.time}
            </Text>
          </Flex>
        </View>
      </Card>
    </Link>
  );
}

export default VideoCard;
