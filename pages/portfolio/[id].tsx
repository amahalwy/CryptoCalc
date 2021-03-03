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
import CountDown from "../../components/CountDown";
import { getTimeRemaining, initializePrices } from "../../generals/functions";
import TimerComponent from "../../components/TimerComponent";
import ListCoin from "../../components/ListCoin";
import PortfolioCoin from "../../components/PortfolioCoin";
import PortfolioList from "../../components/PortfolioList";
import PortfolioTotal from "../../components/PortfolioTotal";
import { update } from "final-form-arrays";
import { fetchPrice } from "../api/FetchPrice";

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
  list.endDate = list.endDate.toString();

  return {
    props: {
      list,
    },
  };
};

const PortfolioPage = (props) => {
  const list = props.list;
  const [localCoins, setLocalCoins] = React.useState<null | []>(null);

  const [timeLeft, setTimeLeft] = React.useState(
    getTimeRemaining(list.endDate)
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeRemaining(list.endDate));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval] === undefined || timeLeft[interval] === null) {
      return;
    }

    timerComponents.push(
      <TimerComponent interval={interval} timeLeft={timeLeft} />
    );
  });

  React.useEffect(() => {
    if (!localCoins) {
      setLocalCoins(initializePrices(list.coins));
    }
  }, []);

  return (
    <Box h="100%" w="100%">
      <Box w="40%" m="4% auto" pb="2%" bg="white" borderRadius="10px">
        <Box bg="orange.500" borderTopRadius="8px">
          <Box d="flex" justifyContent="center">
            <Heading fontSize={50} color="white">
              Coundown Clock
            </Heading>
          </Box>
          <Box>
            <CountDown timerComponents={timerComponents} />
          </Box>
        </Box>
        <Box w="95%" m="0 auto">
          <Box>
            <PortfolioTotal coins={localCoins} />
          </Box>
          <Box>
            <PortfolioList coins={list.coins} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const prisma = new PrismaClient();

export default PortfolioPage;
