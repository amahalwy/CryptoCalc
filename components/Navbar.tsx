import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (!localStorage.cryptoCalcUpdate)
      localStorage.setItem("cryptoCalcUpdate", JSON.stringify(180));
  }, []);

  return (
    <Box w="100%" h="70px" bg="orange.400">
      <Box
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        w={{ base: "98%", lg: "97%" }}
        m="0 auto"
        h="100%"
      >
        <Heading
          m={{ base: "10px 20px", lg: "5px 20px" }}
          color="#1A365D"
          _hover={{ cursor: "pointer", color: "white" }}
          onClick={() => router.push("/")}
        >
          CryptoCalc
        </Heading>
        <Menu>
          <MenuButton m="10px 20px" as={Button}>
            <HamburgerIcon />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => router.push("/")}>Home</MenuItem>
            <MenuItem onClick={() => router.push("/calc")}>Calculator</MenuItem>
            <MenuItem onClick={() => router.push("/portfolio")}>
              Portfolio Search
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
