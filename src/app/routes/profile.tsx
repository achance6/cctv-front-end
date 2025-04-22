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

function Profile() {
  const { username } = useParams();
  const friendlyUsername = username?.substring(0, username.lastIndexOf("@"));

  const { signOut } = useAuthenticator((context) => [context.user]);
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
      </Flex>
    </View>
  );
}

export default Profile;
