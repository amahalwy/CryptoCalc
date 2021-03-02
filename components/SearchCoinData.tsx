import React from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  renderMarketChange,
  renderChangeColor,
  numberWithCommas,
} from "../generals/functions";

const SearchCoinData = ({ coin }) => {
  return (
    <Box>
      <Box mt="10px">
        <Box d="flex">
          <Text fontSize={30} mr="10px">
            Current Price: $
            {numberWithCommas(coin.market_data.current_price.usd)}
          </Text>
          <Text fontSize={24} color={renderChangeColor(coin)} mt="6px">
            $({renderMarketChange(coin)})
          </Text>
          <Box d="inline-block" mt="10px" ml="4px"></Box>
        </Box>

        <Box d="flex">
          <Box d="flex" mr="10px">
            <Text fontSize={24} mr="6px">
              24h L:
            </Text>
            <Text fontSize={20} color="red" mt="4px">
              ${numberWithCommas(coin.market_data.low_24h.usd)}
            </Text>
          </Box>
          <Box d="flex">
            <Text fontSize={24} mr="6px">
              24h H:{" "}
            </Text>
            <Text fontSize={20} color="green" mt="4px">
              ${numberWithCommas(coin.market_data.high_24h.usd)}
            </Text>
          </Box>
        </Box>
        <Box d="flex">
          <Box d="flex" mr="10px">
            <Text fontSize={24} mr="6px">
              All-time L:
            </Text>
            <Text fontSize={20} color="red" mt="4px">
              ${numberWithCommas(coin.market_data.atl.usd)}
            </Text>
          </Box>
          <Box d="flex">
            <Text fontSize={24} mr="6px">
              All-time H:
            </Text>
            <Text fontSize={20} color="green" mt="4px">
              ${numberWithCommas(coin.market_data.ath.usd)}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchCoinData;
