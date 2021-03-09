import React from "react";
import { Box, CircularProgress, Heading } from "@chakra-ui/react";
import PortfolioCoin from "./PortfolioCoin";
import { PortfolioListProps } from "../typescript/interfaces";

const PortfolioList: React.FC<PortfolioListProps> = ({ coins }) => {
  const [update, setUpdate] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (localStorage && !localStorage.cryptoCalcUpdate && !update) {
      localStorage.setItem("cryptoCalcUpdate", JSON.stringify(180));
    }
    setUpdate(JSON.parse(localStorage.cryptoCalcUpdate));
    update > 0 &&
      update !== null &&
      setTimeout(() => {
        const newUpdate = Number(update) - 1;
        setUpdate(newUpdate);
        localStorage.setItem("cryptoCalcUpdate", JSON.stringify(newUpdate));
      }, 1000);
    if (update <= 0 && update !== null) {
      setTimeout(() => {
        setUpdate(180);
        localStorage.setItem("cryptoCalcUpdate", JSON.stringify(180));
      }, 1000);
    }
  }, [update]);

  return (
    <Box>
      <Box m="10px 0">
        {update > 0 && update ? (
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
