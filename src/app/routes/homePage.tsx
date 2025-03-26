import NavBar from '@/components/navBar';
import VideoCard from "@/components/videoCard";
import {Card, Collection, Heading, View} from "@aws-amplify/ui-react";
import '@/assets/css/homePage.css';
import sampleVideos from '@/assets/sampleVideos';

function HomePage() {
    return (
        <View className="min-h-screen bg-gray-100">
            <NavBar/>

            <Heading
                level={6}
                className="text-4xl font-bold text-center my-8"
            >
                Home Page
            </Heading>

            <Card>
                <Collection
                    type="list"
                    direction="row"
                    gap="8"
                    wrap="wrap"
                    items={sampleVideos}
                    isPaginated={true}
                    itemsPerPage={6}
                    className="feed container mx-auto px-4"
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