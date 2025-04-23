import "@/assets/css/App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./routes/homePage.tsx";
import UploadPage from "./routes/uploadPage.tsx";
import { Authenticator } from "@aws-amplify/ui-react";
import { AuthProvider } from "react-oidc-context";
import { Amplify } from "aws-amplify";
import PlaybackPage from "@/app/routes/playbackPage.tsx";
import Profile from "@/app/routes/profile.tsx";
import SearchPage from "@/app/routes/searchPage.tsx";
import ErrorSearchPage from "./routes/errorSearchPage.tsx";

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

export default function App() {
  return (
    <Authenticator>
      {() => {
        return (
          <BrowserRouter>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path={"/upload"} element={<UploadPage />} />
              <Route path={"/playback"} element={<PlaybackPage />} />
              <Route path={"/profile/:username"} element={<Profile />} />
              <Route path={"/search"} element={<ErrorSearchPage />} />
              <Route path={"/search/:query"} element={<SearchPage />} />
            </Routes>
          </BrowserRouter>
        );
      }}
    </Authenticator>
  );
}

// wrap the application with AuthProvider
// @ts-expect-error/Won't be null
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
);
