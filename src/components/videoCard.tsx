import "@/assets/css/videoCard.css";
import { Card, Flex, Image, Text, View } from "@aws-amplify/ui-react";

interface VideoCardProps {
  thumbnail: string;
  title: string;
  channelName: string;
  views: number;
  time: string;
}

function VideoCard(props: VideoCardProps) {
  return (
    <Card
      className="videoCard"
      variation="outlined"
      maxWidth="350px"
      maxHeight="250px"
    >
      <Image
        className="videoThumbnail"
        src={props.thumbnail}
        alt={props.title}
      />
      <View>
        <Text
          isTruncated={true}
          className="videoTitle"
          fontWeight="bold"
          fontSize={"1.1rem"}
        >
          {props.title}
        </Text>
        <Flex gap=".7rem" className="videoInfo">
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
  );
}

export default VideoCard;
