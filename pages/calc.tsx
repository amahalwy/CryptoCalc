import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import SearchForm from "../components/SearchForm";
import SearchCoin from "../components/SearchCoin";
import Watchlist from "../components/Watchlist";

const Calc: React.FC = () => {
  const [coin, setCoin] = React.useState<null | any>(null);
  const [total, setTotal] = React.useState<null | number>(0);
  const [watchlist, setWatchlist] = React.useState<[]>([]);
  const [calculatingTotal, setCalculatingTotal] = React.useState<boolean>(
    false
  );

  return (
    <Box h="100%" w="100%">
      <Box w={{ base: "90%", lg: "60%" }} m="4% auto" pb="2%">
        <Box mb="10px">
          <Heading fontSize={{ base: 44, lg: 54 }} color="orange.400">
            CryptoCalc
          </Heading>
          <Heading fontSize={24} color="orange.400">
            How much can you make with 1 million?
          </Heading>
        </Box>
        <Box bg="white">
          <SearchForm setCoin={setCoin} />

          {!coin ? null : coin && !coin.error ? (
            <SearchCoin
              coin={coin}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          ) : (
            <Box ml="10px">Error: {coin.error}</Box>
          )}

          {watchlist.length > 0 ? (
            <Box>
              <Watchlist
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                setTotal={setTotal}
                setCalculatingTotal={setCalculatingTotal}
                total={total}
                calculatingTotal={calculatingTotal}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Calc;
