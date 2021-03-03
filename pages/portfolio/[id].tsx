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
  console.log(list);
  return <Box color="red">{list.id}</Box>;
};

const prisma = new PrismaClient();

export const getServerSideProps = async ({ params }) => {
  const list = await prisma.list.findUnique({
    where: {
      id: params.id,
    },
    include: {
      coins: true,
    },
  });

  list.startDate = list.startDate.toString();

  return {
    props: {
      list,
    },
  };
};

export default PortfolioPage;

// function getTimeRemaining(endtime) {
//   const total = Date.parse(endtime) - Date.parse(new Date());
//   const seconds = Math.floor((total / 1000) % 60);
//   const minutes = Math.floor((total / 1000 / 60) % 60);
//   const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//   const days = Math.floor(total / (1000 * 60 * 60 * 24));

//   return {
//     total,
//     days,
//     hours,
//     minutes,
//     seconds,
//   };
// }
