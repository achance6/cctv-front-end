import React from "react";
import { Avatar, SearchField } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router";
import "@/assets/css/navBar.css";
import circle from "@/assets/circle.png";
import logo from "@/assets/logo.jpg";

function NavBar() {
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();

  const search = () => {
    console.log("Searching for ", searchValue);
  };
  const handleUploadClick = async () => {
    await navigate("/upload");
  };
  const handleHomepageClick = async () => {
    await navigate("/");
  };
  const handleAvatarClick = async () => {
    await navigate("/profile");
  };

  return (
    <div className="navBar">
      <img
        src={logo}
        alt="logo"
        className="logo"
        onClick={handleHomepageClick}
      />

      <SearchField
        label="Search"
        placeholder="Search here..."
        className="search"
        width="600px"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onSubmit={search}
      />
      <button
        type="button"
        className="Upload Button"
        onClick={handleUploadClick}
      >
        + Upload
      </button>
      {/*}
            <div>
                Hello {localStorage.getItem("userLoginId") ?? "user npt found"}
            </div>
            */}
      <Avatar
        src={circle}
        className="avatar"
        marginRight="20px"
        width="45px"
        height="40px"
        onClick={handleAvatarClick}
      />
    </div>
  );
}

export default NavBar;
