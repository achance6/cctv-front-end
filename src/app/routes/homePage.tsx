import NavBar from "@/components/navBar";
import VideoCard from "@/components/videoCard";
import { Card, Collection, Heading, View } from "@aws-amplify/ui-react";
import { Video } from "@/assets/sampleVideos";
import { useEffect, useState } from "react";
import { VideoApi } from "@/app/routes/playbackPage.tsx";
import sampleThumbnail from "@/assets/sample-thumbnail.jpg";

function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const apiGatewayUrl =
      "https://t0cgas8vb5.execute-api.us-east-1.amazonaws.com";
    const videosEndpoint = "/video/videos";
    const videosArr: Video[] = [];
    fetch(apiGatewayUrl + videosEndpoint)
      .then((response) => response.json())
      .then((data: VideoApi[]) => {
        data.forEach((videoApi) => {
          const video: Video = {
            uuid: videoApi.uuid,
            title: videoApi.title,
            uploader: videoApi.uploader,
            time: videoApi.creationDate.toString(),
            tags: videoApi.tags,
            videoSrc: "video.mp4",
            channelName: "Channel 1",
            views: "100",
            thumbnail: sampleThumbnail,
          };
          videosArr.push(video);
        });
      })
      .catch((err: unknown) => {
        console.error("Failed to fetch video data:", err);
      })
      .finally(() => {
        setVideos(videosArr);
      });
  }, []);

  return (
    <View width={"100%"} className={"bg-gray-200"}>
      <NavBar />

      <Heading
        level={1}
        textAlign={"center"}
        className={"text-4xl font-bold my-8"}
      >
        Home Page
      </Heading>

      <Card>
        <Collection
          type={"list"}
          direction={"row"}
          gap={"8"}
          wrap={"wrap"}
          items={videos}
          isPaginated={true}
          itemsPerPage={6}
          className={"container mx-auto px-4"}
        >
          {(item, key) => <VideoCard {...item} key={key} />}
        </Collection>
      </Card>
    </View>
  );
}

export default HomePage;
