import sampleThumbnail from '@/assets/sample-thumbnail.jpg'

export interface Video {
    title: string,
    videoSrc: string,
    uploader: string,
    channelName: string,
    views: string,
    time: string,
    thumbnail: string,
    tags: string[]
}

const sampleVideos: Video[] = [{
    title: "Title 1", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 1", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 2", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 2", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 3", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 3", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 4", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 4", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 5", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 5", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 5", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 5", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 5", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 5", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 5", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 5", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 5", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 5", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 5", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 5", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 5", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 5", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 5", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 5", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}, {
    title: "Title 5", videoSrc: "video.mp4", uploader: "test@test.com", channelName: "Channel 5", views: "100", time: "1 day ago", thumbnail: sampleThumbnail, tags: []
}];

export default sampleVideos;