import NavBar from "@/components/navBar";
import VideoCard from "@/components/videoCard";
import { Card, Collection, Heading, View } from "@aws-amplify/ui-react";
import sampleVideos from "@/assets/sampleVideos";

function HomePage() {
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
          items={sampleVideos}
          isPaginated={true}
          itemsPerPage={6}
          className={"container mx-auto px-4"}
        >
          {(item) => <VideoCard {...item} />}
        </Collection>
      </Card>
    </View>
  );
}

export default HomePage;
