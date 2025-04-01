import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Flex,
  Image,
  SearchField,
} from "@aws-amplify/ui-react";
import { Link } from "react-router";
import logo from "@/assets/logo.png";
import defaultAvatar from "@/assets/default.png";

const avatarImages = import.meta.glob('/src/assets/avatars/*.png');

function NavBar() {
  const [searchValue, setSearchValue] = React.useState("");
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const user = localStorage.getItem("userLoginId") ?? "user not found";
  const firstLetter = user.charAt(0).toLowerCase();
  
  useEffect(() => {
    const loadAvatar = async () => {
        const imageLoader = avatarImages[`/src/assets/avatars/${firstLetter}.png`];

        if (imageLoader) {
            try {
                const imageModule = (await imageLoader()) as { default: string };
                setAvatarSrc(imageModule.default); 
            } catch (error) {
                console.error("Error loading avatar image:", error);
                setAvatarSrc(defaultAvatar);
            }
        } else {
            setAvatarSrc(defaultAvatar);
        }
    };

    loadAvatar();
  }, [firstLetter]);

  const search = () => {
    console.log("Searching for ", searchValue);
  };

  return (
    <Flex
      direction={"row"}
      justifyContent={"space-around"}
      alignItems={"center"}
      alignContent={"center"}
      wrap={"nowrap"}
      gap={"1rem"}
      height={"20vh"}
      paddingTop={"1rem"}
      className={"shrink-0"}
    >
      <Link to={"/"} className={"w-14 hover:drop-shadow-xl"}>
        <Image alt={"logo"} src={logo} />
      </Link>

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
      <Link to={"/upload"}>
        <Button type={"button"} className={"Upload Button"}>
          + Upload
        </Button>
      </Link>

      {/*}
            <div>
                Hello {localStorage.getItem("userLoginId") ?? "user not found"}
            </div>
            */}

      <Link to={"/profile"} className={"hover:drop-shadow-xl"}>
        <Avatar src={avatarSrc || defaultAvatar} size={"large"} />
      </Link>
    </Flex>
  );
}

export default NavBar;
