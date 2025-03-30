import NavBar from "@/components/navBar";
import { Heading, View } from "@aws-amplify/ui-react";

function Profile() {
  return (
    <View className={"min-h-screen bg-gray-200"}>
      <NavBar />

      <Heading level={1}>Profile</Heading>
    </View>
  );
}

export default Profile;
