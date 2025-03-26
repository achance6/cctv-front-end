import "@/assets/css/App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./routes/homePage.tsx";
import UploadPage from "./routes/uploadPage.tsx";
import { Authenticator, Button, Flex, View } from "@aws-amplify/ui-react";
import { AuthProvider } from "react-oidc-context";
import { Amplify } from "aws-amplify";
import { AuthUser } from "aws-amplify/auth";
import PlaybackPage from "@/app/routes/playbackPage.tsx";
import Profile from "@/app/routes/profile.tsx";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ow9MYBmi1",
  client_id: "75aqan1rrlu803ngkv4dnqqfb7",
  redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
  response_type: "code",
  scope: "email openid phone",
};

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_ow9MYBmi1",
      userPoolClientId: "75aqan1rrlu803ngkv4dnqqfb7",
      identityPoolId: "us-east-1:0a84427a-0e39-42cf-ae6e-5b9dff9e5020",
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: false,
      passwordFormat: {
        minLength: 8,
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/upload",
    element: <UploadPage />,
  },
  {
    path: "/playback",
    element: <PlaybackPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function storeUserData(user?: AuthUser) {
  if (user?.signInDetails?.loginId) {
    localStorage.setItem("userLoginId", user.signInDetails.loginId);
  }
}

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => {
        storeUserData(user);
        return (
          <View className="App">
            <Flex direction={"row"} gap={4} padding={4}>
              <RouterProvider router={router} />
            </Flex>
            <Button
              type={"button"}
              onClick={signOut}
              className="sign-out-button"
            >
              Sign out
            </Button>
          </View>
        );
      }}
    </Authenticator>
  );
}

// @ts-expect-error/Won't be null
const root = createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
);

export default App;
