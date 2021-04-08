import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { numberWithCommas } from "../generals/functions";
import { PortfolioTotalProps } from "../typescript/interfaces";

const GetChange: React.FC<{ total: number; startingTotal: number }> = ({
  total,
  startingTotal,
}) => {
  const diff: number = total - startingTotal;

  return (
    <Text fontSize={20} color={diff >= 0 ? "green" : "red"} mt="2px">
      ({(diff / startingTotal).toFixed(4)}%)
    </Text>
  );
};

const PortfolioTotal: React.FC<PortfolioTotalProps> = ({
  list,
  active,
  coins,
  startingTotal,
}) => {
  const [total, setTotal] = React.useState<number>(list.endTotal);
  const getTotal = () => {
    return coins.reduce((acc, curr) => {
      return acc + curr.market_data.current_price.usd * curr.quantity;
    }, 0);
  };

  React.useEffect(() => {
    if (coins && active) {
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
