import React from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  renderMarketChange,
  renderChangeColor,
  numberWithCommas,
} from "../generals/functions";
import { Coin } from "../typescript/interfaces";

const Low: React.FC<{ coin: Coin }> = ({ coin }) => (
  <Box d="flex">
    <Box d="flex" mr="20px">
      <Text fontSize={14} mr="6px">
        24h L:
      </Text>
      <Text fontSize={12} color="red" mt={{ base: "2px" }}>
        ${numberWithCommas(coin.market_data.low_24h.usd)}
      </Text>
    </Box>
    <Box d="flex">
      <Text fontSize={14} mr="6px">
        All-time L:
      </Text>
      <Text fontSize={12} color="red" mt={{ base: "2px" }}>
        ${numberWithCommas(coin.market_data.atl.usd)}
      </Text>
    </Box>
  </Box>
);

const High: React.FC<{ coin: Coin }> = ({ coin }) => (
  <Box d="flex">
    <Box d="flex" mr="20px">
      <Text fontSize={14} mr="6px">
        24h H:{" "}
      </Text>
      <Text fontSize={12} color="green" mt="4px">
        ${numberWithCommas(coin.market_data.high_24h.usd)}
      </Text>
    </Box>
    <Box d="flex">
      <Text fontSize={14} mr="6px">
        All-time H:
      </Text>
      <Text fontSize={12} color="green" mt="4px">
        ${numberWithCommas(coin.market_data.ath.usd)}
      </Text>
    </Box>
  </Box>
);

const SearchCoinData: React.FC<{ coin: Coin }> = ({ coin }) => {
  return (
    <Box>
      <Box mt="10px">
        <Box>
          <Box d="flex">
            <Text fontSize={{ base: 18, lg: 30 }} mr="10px">
              Current Price: $
              {numberWithCommas(coin.market_data.current_price.usd)}
            </Text>
            <Text
              fontSize={{ base: 14, lg: 24 }}
              color={renderChangeColor(coin)}
              mt={{ base: "4px", lg: "6px" }}
            >
              $({renderMarketChange(coin)})
            </Text>
          </Box>
        </Box>

        <Box ml={{ base: "0", lg: "20px" }}>
          <Low coin={coin} />
          <High coin={coin} />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchCoinData;
