import React from "react";
import { Box, CircularProgress, Heading, Text } from "@chakra-ui/react";
import PortfolioCoin from "./PortfolioCoin";
import { initializePrices } from "../generals/functions";
import { Coin } from "@prisma/client";

const PortfolioList = ({ coins }) => {
  const [update, setUpdate] = React.useState<number | string>(10);
  const [updatingCoins, setUpdatingCoins] = React.useState<boolean>(false);

  React.useEffect(() => {
    update > 0 && setTimeout(() => setUpdate(Number(update) - 1), 1000);
    if (update <= 0) {
      setTimeout(() => {
        setUpdate(10);
      }, 1000);
    }
  }, [update]);

  return (
    <Box>
      <Box m="10px 0">
        {update > 0 ? (
          <Heading>
            Refreshing prices in: {update}
            {update > 0 ? "s" : null}
          </Heading>
        ) : (
          <Box d="flex">
            <Heading mr="10px">Loading new prices</Heading>
            <CircularProgress isIndeterminate color="green.300" />
          </Box>
        )}
      </Box>
      <Box>
        {!coins
          ? null
          : coins.map((coin, i) => {
              return (
                <PortfolioCoin
                  key={i}
                  update={update}
                  coin={coin}
                  setUpdate={setUpdate}
                />
              );
            })}
      </Box>
    </Box>
  );
};

export default PortfolioList;
