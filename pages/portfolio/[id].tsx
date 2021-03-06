import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import CountDown from "../../components/CountDown";
import { getTimeRemaining, initializePrices } from "../../generals/functions";
import TimerComponent from "../../components/TimerComponent";
import PortfolioList from "../../components/PortfolioList";
import PortfolioTotal from "../../components/PortfolioTotal";

export const getServerSideProps = async ({ params }) => {
  const list = await prisma.list.findUnique({
    where: {
      id: params.id,
    },
    include: {
      coins: true,
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

const PortfolioPage = (props) => {
  const list = props.list;
  const [localCoins, setLocalCoins] = React.useState(null);

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

const prisma = new PrismaClient();

export default PortfolioPage;
