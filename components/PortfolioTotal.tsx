import React from "react";
import { Box } from "@chakra-ui/react";
import { numberWithCommas } from "../generals/functions";

const PortfolioTotal = ({ coins }) => {
  const [total, setTotal] = React.useState<number>(0);
  const getTotal = () => {
    if (!coins || coins.length === 0) return null;
    return coins.reduce((acc, curr) => {
      return acc + curr.market_data.current_price.usd;
    }, 0);
  };

  React.useEffect(() => {
    setTotal(getTotal());
  }, []);
  return <Box>${numberWithCommas(total)}</Box>;
};

export default PortfolioTotal;
