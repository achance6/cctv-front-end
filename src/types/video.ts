export default interface Video {
  videoId: string;
  title: string;
  description: string;
  tags: string[];
  creationDateTime: Date;
  uploader: string;
  viewCount: number;
  time?: number;
}
