import NavBar from "@/components/navBar";
import {
  Button,
  Flex,
  Heading,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";

function Profile() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  return (
    <View width={"100%"} className={"bg-gray-200"}>
      <NavBar />
      <Flex direction={"column"} alignItems={"center"}>
        <Heading level={1} textAlign={"center"}>
          Profile
        </Heading>
        <Button type={"button"} onClick={signOut} className="sign-out-button">
          Sign out
        </Button>
      </Flex>
    </View>
  );
}

export default Profile;
