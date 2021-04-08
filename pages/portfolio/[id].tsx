import React from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { Coin, PrismaClient } from "@prisma/client";
import CountDown from "../../components/CountDown";
import TimerComponent from "../../components/TimerComponent";
import PortfolioList from "../../components/PortfolioList";
import PortfolioTotal from "../../components/PortfolioTotal";
import { List, Timeleft } from "../../typescript/interfaces";
import { getTimeRemaining, initializePrices } from "../../generals/functions";
import { setListActive } from "../../util/SetListActive";
import { List as PrismaList } from "@prisma/client";

export const getServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();
  const list: PrismaList = await prisma.list.findUnique({
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
  const [list, setList] = React.useState<List>(props.list);
  const [localCoins, setLocalCoins] = React.useState<null | Coin[]>(null);
  const [timeLeft, setTimeLeft] = React.useState<Timeleft>(
    getTimeRemaining(list.endDate)
  );
  const [active, setActive] = React.useState<boolean>(list.active);

  React.useEffect(() => {
    console.log(list);
    if (timeLeft.total < 1000 && active) {
      setListActive({ list, localCoins }).then((res) => {
        setActive(res.active);
        setList(res);
      });
    }
    const timer = setTimeout(() => {
      if (timeLeft.total >= 1000) {
        setTimeLeft(getTimeRemaining(list.endDate));
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  let timerComponents: any[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft.total <= 0) {
      timerComponents = [];
      return;
    }

    if (
      timeLeft[interval] === undefined ||
      timeLeft[interval] === null ||
      interval === "total"
    ) {
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
          <Box d="flex" justifyContent="center" p="10px 0">
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
            <PortfolioList active={active} coins={localCoins} />
          </Box>
          <Box>
            <PortfolioTotal
              list={list}
              active={active}
              startingTotal={list.total}
              coins={localCoins}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PortfolioPage;
