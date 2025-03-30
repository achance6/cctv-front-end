import React from "react";
import {
  Avatar,
  Button,
  Flex,
  Image,
  SearchField,
} from "@aws-amplify/ui-react";
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
    <Flex
      direction={"row"}
      justifyContent={"space-around"}
      alignItems={"center"}
      alignContent={"normal"}
      wrap={"nowrap"}
      gap={"1rem"}
    >
      <Image
        alt={"logo"}
        src={logo}
        height={"5%"}
        width={"5%"}
        onClick={handleHomepageClick}
        className={"logo"}
      />

      <SearchField
        label="Search"
        placeholder="Search here..."
        size={"large"}
        width={"50%"}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onSubmit={search}
      />

      <Button
        type="button"
        className="Upload Button"
        onClick={handleUploadClick}
      >
        + Upload
      </Button>

      {/*}
            <div>
                Hello {localStorage.getItem("userLoginId") ?? "user npt found"}
            </div>
            */}

      <Avatar
        src={circle}
        size={"large"}
        onClick={handleAvatarClick}
        className={"avatar"}
      />
    </Flex>
  );
}

export default NavBar;
