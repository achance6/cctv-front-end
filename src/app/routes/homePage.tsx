import NavBar from "@/components/navBar";
import { Heading, View } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import Video from "@/types/video.ts";
import VideoCollection from "@/components/videoCollection.tsx";
import { apiGatewayUrl } from "@/config/const.ts";

function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
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
    <View width={"100%"} className={""}>
      <NavBar />

      <Heading
        level={1}
        textAlign={"center"}
        className={"text-4xl font-bold my-8"}
        style={{ color: "white", fontWeight: 700 }}
      >
        Home Page
      </Heading>

      <VideoCollection videos={videos} />
    </View>
  );
}

export default HomePage;
