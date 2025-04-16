export default interface Video {
  uuid: string;
  title: string;
  description: string;
  tags: string[];
  creationDate: Date;
  uploader: string;
  views?: number;
  time?: number;
}
