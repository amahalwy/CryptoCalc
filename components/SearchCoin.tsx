import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import {
  renderMarketChange,
  renderChangeColor,
  findInList,
  numberWithCommas,
} from "../generals/functions";
import { AiOutlineInfoCircle } from "react-icons/ai";

const SearchCoin = ({ coin, watchlist, setWatchlist }) => {
  const [showMore, setShowMore] = React.useState<boolean>(false);

  const addToWatchlist = (coin) => {
    const newList = watchlist.concat(coin);
    setWatchlist(newList);
  };

  return (
    <Box w="98%" m="0 auto" borderBottom="1px solid #ccc" pb="10px">
      <Box>
        <Box d="flex" justifyContent="space-between" alignItems="center">
          <Box d="flex">
            <Box mr="10px" mt="5px">
              <Image src={coin.image.small} />
            </Box>
            <Box>
              <Text d="inline" fontSize={40} mr="30px">
                {coin.name}
              </Text>
              <Text d="inline" fontSize={30} mr="10px">
                Current Price: $
                {numberWithCommas(coin.market_data.current_price.usd)}
              </Text>
              <Box d="inline-flex">
                <Text fontSize={24} color={renderChangeColor(coin)}>
                  $({renderMarketChange(coin)})
                </Text>
                <Box
                  d="inline-block"
                  mt="10px"
                  ml="4px"
                  _hover={{ cursor: "pointer" }}
                  onClick={() => setShowMore(!showMore)}
                >
                  <AiOutlineInfoCircle />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Button
              onClick={() => addToWatchlist(coin)}
              disabled={findInList(watchlist, coin)}
            >
              Add to watchlist
            </Button>
          </Box>
        </Box>
      </Box>
      {showMore ? (
        <Box>
          <Box d="flex" mt="10px">
            <Box d="flex" mr="10px">
              <Text d="inline" fontSize={24} mr="6px">
                24h L:{" "}
              </Text>
              <Text d="inline" fontSize={24} color="red">
                {numberWithCommas(coin.market_data.low_24h.usd)}
              </Text>
            </Box>
            <Box>
              <Text d="inline" fontSize={24}>
                24h H:{" "}
              </Text>
              <Text d="inline" fontSize={24} color="green">
                {numberWithCommas(coin.market_data.high_24h.usd)}
              </Text>
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default SearchCoin;
