import VideoCard from "@/components/videoCard.tsx";
import { Collection } from "@aws-amplify/ui-react";
import Video from "@/types/video.ts";

interface VideoCollectionProps {
  videos: Video[];
}

function VideoCollection({ videos }: VideoCollectionProps) {
  return (
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
  );
}

export default VideoCollection;
