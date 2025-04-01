import NavBar from "@/components/navBar";
import { Button, Heading, View } from "@aws-amplify/ui-react";
import { AuthEventData } from "@aws-amplify/ui";

function Profile(signOut?: (data?: AuthEventData) => void) {
  return (
    <View className={"min-h-screen bg-gray-200"}>
      <NavBar />

      <Heading level={1}>Profile</Heading>
      <Button type={"button"} onClick={signOut} className="sign-out-button">
        Sign out
      </Button>
    </View>
  );
}

export default Profile;
