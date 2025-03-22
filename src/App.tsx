import './App.css'
import {useAuth} from "react-oidc-context";

function App() {
    const auth = useAuth();

    const signOutRedirect = () => {
        const clientId = "19bsumbuesnn7c83kfsvb34a2h";
        const logoutUri = "<logout uri>";
        const cognitoDomain = "https://us-east-1ow9mybmi1.auth.us-east-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                <pre> Hello: {auth.user?.profile.email} </pre>
                <pre> ID Token: {auth.user?.id_token} </pre>
                <pre> Access Token: {auth.user?.access_token} </pre>
                <pre> Refresh Token: {auth.user?.refresh_token} </pre>

                <button onClick={
                    () => auth.removeUser()
                } type={"button"}>Sign out
                </button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => auth.signinRedirect()} type={"button"}>Sign in</button>
            <button onClick={() => {
                signOutRedirect();
            }} type={"button"}>Sign out
            </button>
        </div>
    );
}

export default App;
