import NavBar from "@/components/navBar";
import { Button, Flex, Heading, View } from "@aws-amplify/ui-react";
import { AuthEventData } from "@aws-amplify/ui";

function Profile(signOut?: (data?: AuthEventData) => void) {
  return (
    <View width={"100%"} className={"bg-gray-200"}>
      <NavBar />
      <Flex direction={"column"} alignItems={"center"}>
        <Heading level={1} textAlign={"center"}>
          Profile
        </Heading>
        <Button width={"fit-content"} type={"button"} onClick={signOut}>
          Sign out
        </Button>
      </Flex>
    </View>
  );
}

export default Profile;
