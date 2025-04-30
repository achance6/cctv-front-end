import NavBar from "@/components/navBar";
import { useParams } from "react-router";
import { Flex, Heading, View } from "@aws-amplify/ui-react";
import VideoCollection from "@/components/videoCollection.tsx";
import { useEffect, useState } from "react";
import Video from "@/types/video.ts";
import { apiGatewayUrl } from "@/config/const.ts";

const SearchPage = () => {
  const params = useParams();
  const query = params.query;
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const videosEndpoint = "/video/videos";
    const queryParam = "?search=" + (query ?? "");
    fetch(apiGatewayUrl + videosEndpoint + queryParam)
      .then((response) => response.json())
      .then((data: Video[]) => {
        setVideos(data);
      })
      .catch((err: unknown) => {
        console.error("Failed to fetch video data:", err);
        setVideos([]);
      });
  }, [query]);

  return (
    <View>
      <NavBar />
      <Flex direction="column">
        <Heading level={1} className="text-4xl text-center mt-8">
          Search Page
        </Heading>
        <VideoCollection videos={videos} />
      </Flex>
    </View>
  );
};

export default SearchPage;
