import '@/assets/css/App.css';

import {createBrowserRouter, RouterProvider} from 'react-router';
import HomePage from "./routes/homePage.tsx";
import UploadPage from "./routes/uploadPage.tsx";
import {Authenticator} from "@aws-amplify/ui-react";


function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage/>
        },
        {
            path: '/upload',
            element: <UploadPage/>
        }
    ]);

    return (
        <Authenticator>
            {({signOut, user}) => (
                <div className="App">
                    <h1>Hello {user?.signInDetails?.loginId}!</h1>
                    <RouterProvider router={router}/>
                    <button type={"button"} onClick={signOut}>Sign out</button>
                </div>
            )}
        </Authenticator>
    );
}

export default App;