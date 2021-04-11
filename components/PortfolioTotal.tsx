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
    <Text fontSize={16} color={diff >= 0 ? "green" : "red"} mt="4px">
      ({diff / startingTotal < 0.0 ? `-` : `+`}
      {(diff / startingTotal).toFixed(4)}%)
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
    if (coins && active) setTotal(getTotal());
  }, [coins]);

  return (
    <Box>
      <Box>
        <Text fontSize={26}>Portfolio Value:</Text>
      </Box>
      <Box m="10px 0">
        <Text fontSize={20}>Starting: ${numberWithCommas(startingTotal)} </Text>
      </Box>
      <Box d="flex">
        <Text fontSize={20} mr="4px">
          {list.active ? " Current" : "Final Total"}: ${numberWithCommas(total)}
        </Text>
        <GetChange total={total} startingTotal={startingTotal} />
      </Box>
    </Box>
  );
};

export default PortfolioTotal;
