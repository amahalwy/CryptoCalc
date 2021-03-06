import React from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import SearchForm from "../components/SearchForm";
import SearchCoin from "../components/SearchCoin";
import Watchlist from "../components/Watchlist";
import RunningTotal from "../components/RunningTotal";

const Calc = () => {
  const [coin, setCoin] = React.useState<null | any>(null);
  const [total, setTotal] = React.useState<null | number>(0);
  const [watchlist, setWatchlist] = React.useState<[]>([]);
  const [calculatingTotal, setCalculatingTotal] = React.useState<boolean>(
    false
  );

  return (
    <Box h="100%" w="100%">
      <Box w="60%" m="4% auto" pb="2%">
        <Box mb="10px">
          <Heading fontSize={54} color="orange">
            CryptoCalc
          </Heading>
          <Heading fontSize={24} color="orange.300">
            The quick and easy way to get Crypto Currency prices
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

              {/* <SaveListForm watchlist={watchlist} /> */}
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Calc;