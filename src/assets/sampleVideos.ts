import sampleThumbnail from "@/assets/sample-thumbnail.jpg";
import { v4 as uuidv4 } from "uuid";

export interface Video {
  uuid: string;
  title: string;
  videoSrc: string;
  uploader: string;
  channelName: string;
  views: string;
  time: string;
  thumbnail: string;
  tags: string[];
}

const sampleVideos: Video[] = [
  {
    uuid: uuidv4(),
    title: "Title 1",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 1",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 2",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 2",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 3",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 3",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 4",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 4",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 5",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 5",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 5",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 5",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 5",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 5",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 5",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 5",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 5",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 5",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 5",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 5",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 5",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 5",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 5",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 5",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
  {
    uuid: uuidv4(),
    title: "Title 5",
    videoSrc: "video.mp4",
    uploader: "test@test.com",
    channelName: "Channel 5",
    views: "100",
    time: "1 day ago",
    thumbnail: sampleThumbnail,
    tags: [],
  },
];

export default sampleVideos;
