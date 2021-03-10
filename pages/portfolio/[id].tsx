import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Coin, PrismaClient } from "@prisma/client";
import CountDown from "../../components/CountDown";
import { getTimeRemaining, initializePrices } from "../../generals/functions";
import TimerComponent from "../../components/TimerComponent";
import PortfolioList from "../../components/PortfolioList";
import PortfolioTotal from "../../components/PortfolioTotal";
import {
  List,
  timeleft,
  TimerComponentProps,
} from "../../typescript/interfaces";

export const getServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();
  const list: List = await prisma.list.findUnique({
    where: {
      id: params.id,
    },
    include: {
      coins: true,
      owner: true,
    },
  });

  if (!list) {
    return {
      notFound: true,
    };
  }

  list.startDate = list.startDate.toString();
  list.endDate = list.endDate.toString();

  return {
    props: {
      list,
    },
  };
};

const PortfolioPage = (props: { list: List }) => {
  const list = props.list;
  const [localCoins, setLocalCoins] = React.useState<null | Coin[]>(null);
  const [timeLeft, setTimeLeft] = React.useState<timeleft>(
    getTimeRemaining(list.endDate)
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeRemaining(list.endDate));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents: any[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval] === undefined || timeLeft[interval] === null) {
      return;
    }

    timerComponents.push(
      <TimerComponent key={interval} interval={interval} timeLeft={timeLeft} />
    );
  });

  React.useEffect(() => {
    if (!localCoins) {
      initializePrices(list.coins).then((res) => {
        setLocalCoins(res);
      });
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
            <PortfolioList coins={localCoins} />
          </Box>
          <Box>
            <PortfolioTotal startingTotal={list.total} coins={localCoins} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PortfolioPage;
