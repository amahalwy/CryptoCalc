import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoAddSharp } from "react-icons/io5";
import { findInList } from "../generals/functions";
import { Coin, SearchCoinProps } from "../typescript/interfaces";
import SearchCoinData from "./SearchCoinData";

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
    <Box m="0 auto" px={4} py={2}>
      <Box d="flex" justifyContent="space-between" alignItems="center">
        <Box d="flex" alignItems="center">
          <Box mr={{ base: "4px", lg: "10px" }} mt={{ sm: "1%", lg: "15px" }}>
            <Image
              src={coin.image.small}
              h={{ base: "30px", sm: "35px", lg: "80%" }}
            />
          </Box>
          <Box d="flex" alignItems="center">
            <Text fontSize={{ base: 30, sm: 34, lg: 50 }} mr="4px">
              {coin.name}
            </Text>
            <Box
              mt={{ base: "3%", lg: "30px" }}
              _hover={{ cursor: "pointer" }}
              onClick={() => setShowMore(!showMore)}
              fontSize={{ base: 12, lg: 26 }}
            >
              <AiOutlineInfoCircle />
            </Box>
          </Box>
        </Box>

        <Box>
          <Button
            onClick={() => addToWatchlist(coin)}
            disabled={findInList(watchlist, coin)}
            p={0}
            h="2rem"
            w="1.2rem"
            fontSize={18}
          >
            <IoAddSharp />
          </Button>
        </Box>
      </Box>
      {showMore ? <SearchCoinData coin={coin} /> : null}
    </Box>
  );
};

export default SearchCoin;
