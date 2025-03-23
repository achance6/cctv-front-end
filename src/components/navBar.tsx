import React from 'react';
import {SearchField, Avatar} from '@aws-amplify/ui-react';
import {useNavigate} from 'react-router';
import '@/assets/css/navBar.css';
import circle from '@/assets/circle.png';
import logo from '@/assets/logo.jpg';

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
                src={logo}
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