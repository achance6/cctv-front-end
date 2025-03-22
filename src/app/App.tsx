import '@/assets/css/App.css';

import {createBrowserRouter, RouterProvider} from 'react-router';
import HomePage from "./routes/homePage.tsx";
import UploadPage from "./routes/uploadPage.tsx";


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
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;