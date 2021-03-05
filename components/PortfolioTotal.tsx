import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { numberWithCommas } from "../generals/functions";

const GetChange = ({ total, startingTotal }) => {
  const diff = total - startingTotal;

  return (
    <Text fontSize={20} color={diff > 0 ? "green" : "red"} mt="2px">
      ({(diff / startingTotal).toFixed(4)}%)
    </Text>
  );
};

const PortfolioTotal = ({ coins, startingTotal }) => {
  const [total, setTotal] = React.useState<number>(0);
  const getTotal = () => {
    return coins.reduce((acc, curr) => {
      return acc + curr.market_data.current_price.usd * curr.quantity;
    }, 0);
  };

  React.useEffect(() => {
    if (coins) {
      setTotal(getTotal());
    }
  }, [coins]);

  return (
    <Box>
      <Box m="10px 0">
        <Text fontSize={22}>
          Starting Value: ${numberWithCommas(startingTotal)}{" "}
        </Text>
      </Box>
      <Box d="flex">
        <Text fontSize={22} mr="4px">
          Current Portfolio Value: ${numberWithCommas(total)}
        </Text>
        <GetChange total={total} startingTotal={startingTotal} />
      </Box>
    </Box>
  );
};

export default PortfolioTotal;
