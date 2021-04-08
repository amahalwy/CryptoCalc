import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { findInList } from "../generals/functions";
import { AiOutlineInfoCircle } from "react-icons/ai";
import SearchCoinData from "./SearchCoinData";
import { Coin, SearchCoinProps } from "../typescript/interfaces";

const SearchCoin: React.FC<SearchCoinProps> = ({
  coin,
  watchlist,
  setWatchlist,
}) => {
  const [showMore, setShowMore] = React.useState<boolean>(false);

  const addToWatchlist = (coin: Coin) => {
    const newList: Coin[] = watchlist.concat(coin);
    setWatchlist(newList);
  };

  return (
    <Box w="96%" m="0 auto" borderBottom="1px solid #ccc">
      <Box>
        <Box d="flex" justifyContent="space-between" alignItems="center">
          <Box d="flex">
            <Box
              mr={{ base: "4px", lg: "10px" }}
              mt={{ base: "", sm: "10px", lg: "15px" }}
            >
              <Image
                src={coin.image.small}
                h={{ base: "30px", sm: "35px", lg: "80%" }}
              />
            </Box>
            <Box d="flex">
              <Text d="inline" fontSize={{ base: 20, sm: 34, lg: 50 }} mr="4px">
                {coin.name}
              </Text>
              <Box
                mt={{ base: "6px", sm: "15px", lg: "30px" }}
                _hover={{ cursor: "pointer" }}
                onClick={() => setShowMore(!showMore)}
                fontSize={{ base: 18, lg: 26 }}
              >
                <AiOutlineInfoCircle />
              </Box>
            </Box>
          </Box>

          <Box>
            <Button
              onClick={() => addToWatchlist(coin)}
              disabled={findInList(watchlist, coin)}
              p="0 10px"
            >
              Add to watchlist
            </Button>
          </Box>
        </Box>
      </Box>
      {showMore ? <SearchCoinData coin={coin} /> : null}
    </Box>
  );
};

export default SearchCoin;
