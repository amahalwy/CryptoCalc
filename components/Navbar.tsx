import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  React.useEffect(() => {
    if (!localStorage.cryptoCalcUpdate) {
      localStorage.setItem("cryptoCalcUpdate", JSON.stringify(180));
    }
  }, []);
  return (
    <Box w="100%" h="60px" bg="orange.400">
      <Box d="flex" justifyContent="space-between">
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
            Menu
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
