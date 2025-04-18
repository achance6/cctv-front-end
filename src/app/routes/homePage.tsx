import NavBar from "@/components/navBar";
import VideoCard from "@/components/videoCard";
import { Collection, Heading, View } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import Video from "@/types/video.ts";

function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const apiGatewayUrl =
      "https://t0cgas8vb5.execute-api.us-east-1.amazonaws.com";
    const videosEndpoint = "/video/videos";
    fetch(apiGatewayUrl + videosEndpoint)
      .then((response) => response.json())
      .then((data: Video[]) => {
        setVideos(data);
      })
      .catch((err: unknown) => {
        console.error("Failed to fetch video data:", err);
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
    </View>
  );
}

export default HomePage;
