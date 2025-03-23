import React from 'react';
import {SearchField, Avatar} from '@aws-amplify/ui-react';
import {useNavigate} from 'react-router';
import '@/assets/css/navBar.css';
import circle from '@/assets/circle.png';

const logosrc = "data:image/jpeg;base64,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";

function NavBar() {
    const [searchValue, setSearchValue] = React.useState('');
    const navigate = useNavigate();

    const search = () => {
        console.log("Searching for ", searchValue);

    }
    const handleUploadClick = async () => {
        await navigate('/upload');
    }
    const handleHomepageClick = async () => {
        await navigate('/');
    }

    return (
        <div className="navBar">

            <img
                src={logosrc}
                alt='logo'
                className="logo"

                onClick={handleHomepageClick}
            />

            <SearchField
                label="Search"
                placeholder="Search here..."
                className="searchField"
                onChange={(e) => {
                    setSearchValue(e.target.value)
                }}
                onSubmit={search}
            />
            <button
                type="button"
                className="uploadButton"
                onClick={handleUploadClick}>
                + Upload
            </button>


            <div>
                Hello {localStorage.getItem("userLoginId") ?? "user npt found"}
            </div>
            <Avatar
                src={circle}
            />
            {/*
            <img src={circle} alt='profilePic' className='profilePic' />
             */}


        </div>
    );
}

export default NavBar;