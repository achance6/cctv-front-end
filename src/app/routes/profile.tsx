import NavBar from "@/components/navBar";
import {
  Button,
  Flex,
  Heading,
  Text,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import { useParams } from "react-router";
import VideoCollection from "@/components/videoCollection.tsx";
import { useEffect, useState } from "react";
import Video from "@/types/video.ts";
import { apiGatewayUrl } from "@/config/const.ts";

function Profile() {
  // whose profile page this is is acquired from path parameter
  const { username } = useParams();
  const friendlyUsername = username?.substring(0, username.lastIndexOf("@"));
  const [videos, setVideos] = useState<Video[]>([]);

  // user currently signed in, could be different from which user this profile page is for.
  const { user } = useAuthenticator((context) => [context.user]);

  const { signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    const videosEndpoint = "/video/videos";
    if (!username) {
      throw new Error("User not found!");
    }
    const queryParam = "?uploader=" + username;
    fetch(apiGatewayUrl + videosEndpoint + queryParam)
      .then((response) => response.json())
      .then((data: Video[]) => {
        setVideos(data);
      })
      .catch((err: unknown) => {
        console.error("Failed to fetch video data:", err);
      });
  }, [username]);

  return (
    <View width={"100%"} className={"bg-gray-200"}>
      <NavBar />
      <Heading
        level={1}
        textAlign={"center"}
        fontWeight={"bold"}
        fontSize={"2.5em"}
        fontFamily={"monospace"}
      >
        Profile
      </Heading>
      <Flex direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <Text fontSize="2.5em" fontWeight={"bold"} fontFamily={"monospace"}>
          Welcome {friendlyUsername}
        </Text>

        {/*Only show signin button if user is on own profile page*/}
        {username == user.signInDetails?.loginId ? (
          <Button
            type={"button"}
            onClick={signOut}
            className="sign-out-button"
            variation="primary"
            colorTheme="error"
            size="large"
            marginLeft={"100px"}
          >
            Sign out
          </Button>
        ) : null}
      </Flex>
      <VideoCollection videos={videos} />
    </View>
  );
}

export default Profile;
