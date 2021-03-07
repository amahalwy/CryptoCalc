import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <Box w="100%" h="60px" bg="orange.400">
      <Box d="flex" justifyContent="flex-end" p="10px 20px">
        <Menu>
          <MenuButton as={Button}>Menu</MenuButton>
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
