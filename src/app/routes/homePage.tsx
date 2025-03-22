import NavBar from '../../components/navBar';
import VideoCard from "../../components/videoCard";
import {Collection} from "@aws-amplify/ui-react";
import '../../assets/css/homePage.css';
import sampleVideos from '../../assets/sampleVideos';


function HomePage() {

    const videos = sampleVideos;


    return (
        <div>
            <NavBar/>

            <h1>Home Page</h1>

            <div className="feed">
                <Collection
                    type="list"
                    direction="row"
                    gap="30px"
                    wrap="wrap"
                    items={videos}
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