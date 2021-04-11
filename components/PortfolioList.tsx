import React from "react";
import { Box } from "@chakra-ui/react";
import PortfolioCoin from "./PortfolioCoin";
import { PortfolioListProps } from "../typescript/interfaces";
import PortfolioRefreshing from "./PortfolioRefreshing";

const PortfolioList: React.FC<PortfolioListProps> = ({ coins, active }) => {
  const [update, setUpdate] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (localStorage && !localStorage.cryptoCalcUpdate && !update) {
      localStorage.setItem("cryptoCalcUpdate", JSON.stringify(180));
    }
    setUpdate(JSON.parse(localStorage.cryptoCalcUpdate));

    if (!active) return;
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
        <PortfolioRefreshing update={update} active={active} />
      </Box>
      <Box>
        {coins
          ? coins.map((coin, i) => (
              <PortfolioCoin
                key={i}
                update={update}
                coin={coin}
                setUpdate={setUpdate}
              />
            ))
          : null}
      </Box>
    </Box>
  );
};

export default PortfolioList;
