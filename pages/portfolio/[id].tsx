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
  const user = await prisma.user.findFirst({
    where: { otp: { equals: params.id } },
  });

  const list = await prisma.list.findFirst({
    where: {
      userId: { equals: user.id },
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
