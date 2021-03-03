import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import PortfolioCoin from "./PortfolioCoin";
import { fetchPrice } from "../pages/api/FetchPrice";
import { initializePrices } from "../generals/functions";

const PortfolioList = ({ coins }) => {
  const [update, setUpdate] = React.useState<number | string>(10);
  const [updatingCoins, setUpdatingCoins] = React.useState<boolean>(false);
  const [localCoins, setLocalCoins] = React.useState<null | []>(null);

  React.useEffect(() => {
    if (!localCoins) {
      setLocalCoins(initializePrices(coins));
    }

    update > 0 && setTimeout(() => setUpdate(Number(update) - 1), 1000);
    if (update <= 0) {
      updateList();
      setUpdate("restarting...");
      setTimeout(() => {
        setUpdate(10);
      }, 2000);
    }
  }, [update]);

  const updateList = async () => {
    setUpdatingCoins(true);
    const clone = coins.slice();
    await coins.map((coin, i) => {
      fetchPrice(coin.name.toLowerCase()).then((res) => {
        clone[i] = res;
        setLocalCoins(clone);
      });
    });
    setUpdatingCoins(false);
  };

  return (
    <Box>
      <Box>
        <Heading>
          Refreshing prices in: {update}
          {update > 0 ? "s" : null}
        </Heading>
      </Box>
      <Box>
        {!localCoins
          ? null
          : localCoins.map((coin, i) => {
              return <PortfolioCoin key={i} coin={coin} />;
            })}
      </Box>
    </Box>
  );
};

export default PortfolioList;
