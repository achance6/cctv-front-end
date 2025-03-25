import NavBar from '@/components/navBar';
import VideoCard from "@/components/videoCard";
import {Collection} from "@aws-amplify/ui-react";
import '@/assets/css/homePage.css';
import sampleVideos from '@/assets/sampleVideos';

function HomePage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar/>

            <h1 className="text-4xl font-bold text-center my-8">Home Page</h1>

            <div className="feed container mx-auto px-4">
                <Collection
                    type="list"
                    direction="row"
                    gap="8"
                    wrap="wrap"
                    items={sampleVideos}
                    isPaginated={true}
                    itemsPerPage={9}
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
            </div>
        </div>
    );
}

export default HomePage;