import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Avatar,
  Button,
  Flex,
  Image,
  SearchField,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import { Link } from "react-router";
import logo from "@/assets/logo.png";
import defaultAvatar from "@/assets/default.png";


const avatarImages = import.meta.glob("/src/assets/avatars/*.png");

function NavBar() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [searchValue, setSearchValue] = React.useState("");
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const navigate = useNavigate();
  const firstLetter =
    user.signInDetails?.loginId?.charAt(0).toLowerCase() ?? "";

  useEffect(() => {
    const loadAvatar = async () => {
      const imageLoader =
        avatarImages[`/src/assets/avatars/${firstLetter}.png`];

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

    void loadAvatar();
  }, [firstLetter]);

  const handleSearch = async () =>{
    if(searchValue ==="" ) {
      await navigate("/search");

    }else{
      try{
       localStorage.removeItem("searchQuery");
        localStorage.setItem("searchQuery", searchValue);
        await navigate("/search/" + searchValue);
        window.location.reload();
        setSearchValue("");
      }catch (error) {
        console.error("Error during search:", error);
      }

    }
  }


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
      paddingBottom={"1rem"}
      className={"shrink-0"}
    >
      <Link to={"/"} className={"w-14 hover:drop-shadow-xl"}>
        <Image alt={"logo"} src={logo} height="100px" objectFit="contain" />
      </Link>

      <SearchField
        label="Search"
        placeholder="Search here..."
        size={"large"}
        width={"50%"}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onSubmit={handleSearch}
        value={searchValue}
      />
      <Link to={"/upload"}>
        <Button
          type={"button"}
          className={"Upload Button"}
          variation="primary"
          colorTheme="info"
        >
          + Upload
        </Button>
      </Link>
      <Link
        to={"/profile/" + (user.signInDetails?.loginId ?? "")}
        className={"hover:drop-shadow-xl"}
      >
        <Avatar src={avatarSrc ?? defaultAvatar} size={"large"} />
      </Link>
    </Flex>
  );
}

export default NavBar;
