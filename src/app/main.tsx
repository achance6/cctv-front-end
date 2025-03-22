import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '@/assets/css/index.css'
import App from './App.tsx'
import {AuthProvider} from "react-oidc-context";

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ow9MYBmi1",
    client_id: "19bsumbuesnn7c83kfsvb34a2h",
    redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
    response_type: "code",
    scope: "email openid phone",
};

// @ts-expect-error/Won't be null
const root = createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
    <StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <App/>
        </AuthProvider>
    </StrictMode>
);
