import NavBar from "@/components/navBar";
import VideoCard from "@/components/videoCard";
import { Card, Collection, Heading, View } from "@aws-amplify/ui-react";
import sampleVideos from "@/assets/sampleVideos";

function HomePage() {
  return (
    <View width={"100%"} >
      <NavBar />

      <Heading
        level={1}
        textAlign={"center"}
        className={"text-3xl font-bold my-8 text-white"}
      >
        Home
      </Heading>

      <Card className="w-full flex justify-center">
        <Collection
          type={"list"}
          direction={"row"}
          gap={"8"}
          wrap={"wrap"}
          items={sampleVideos}
          isPaginated={true}
          itemsPerPage={6}
          className={"flex flex-wrap justify-center items-center gap-4 mx-auto px-4"}
        >
          {(item, index) => (
            <VideoCard

              key={index}
              title={item.title}
              channelName={item.channelName}
              views={parseInt(item.views)}
              time={item.time}
              thumbnail={item.thumbnail}
            />
          )}
        </Collection>
      </Card>
    </View>
  );
}

export default HomePage;
