import React from "react";

import {
  Box,
  Text,
  Flex,
  List,
  Button,
  Heading,
  Textarea,
  ListItem,
  useToast,
  Input,
  IconButton,
  useColorMode,
  useDisclosure,
  useColorModeValue,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";

const PortfolioPage = (props) => {
  const list = props.list;
  return <Box color="red">{list.id}</Box>;
};

const prisma = new PrismaClient();

export const getServerSideProps = async ({ params }) => {
  console.log(params);

  const list = await prisma.list.findUnique({
    where: {
      id: params.id,
    },
    include: {
      coins: true,
    },
  });

  return {
    props: {
      list,
    },
  };
};

export default PortfolioPage;
