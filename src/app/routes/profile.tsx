import NavBar from "@/components/navBar";
import {
  Button,
  Flex,
  Heading,
  useAuthenticator,
  View,
  Text,
} from "@aws-amplify/ui-react";


function Profile() {

    const { user } = useAuthenticator((context) => [context.user]);
    const userDetails = user.signInDetails?.loginId;
    const userName = userDetails?.substring(0, userDetails.lastIndexOf("@"));

  const { signOut } = useAuthenticator((context) => [context.user]);
  return (
    <View width={"100%"} className={"bg-gray-200"}>
      <NavBar />
        <Heading level={1} textAlign={"center"}
          fontWeight={"bold"} fontSize={"2.5em"} fontFamily={"monospace"}
        >
            Profile
        </Heading>
        <Flex direction={"row"} alignItems={"center"} justifyContent={"center"}>


          <Text fontSize="2.5em" fontWeight={"bold"} fontFamily={"monospace"}>
            Welcome {userName}
          </Text>

          <Button type={"button"} onClick={signOut} className="sign-out-button"
            variation="primary" colorTheme="error"
             size="large" marginLeft={"100px"}>
            Sign out
          </Button>

        </Flex>

    </View>
  );
}

export default Profile;
