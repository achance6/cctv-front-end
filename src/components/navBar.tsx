import React from "react";
import {
  Avatar,
  Button,
  Flex,
  Image,
  SearchField,
} from "@aws-amplify/ui-react";
import { Link } from "react-router";
import circle from "@/assets/circle.png";
import logo from "@/assets/logo.jpg";

function NavBar() {
  const [searchValue, setSearchValue] = React.useState("");

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
                Hello {localStorage.getItem("userLoginId") ?? "user npt found"}
            </div>
            */}

      <Link to={"/profile"} className={"hover:drop-shadow-xl"}>
        <Avatar src={circle} size={"large"} />
      </Link>
    </Flex>
  );
}

export default NavBar;
