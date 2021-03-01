import React from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import SearchForm from "../components/SearchForm";
import SearchCoin from "../components/SearchCoin";
import Watchlist from "../components/Watchlist";
import RunningTotal from "../components/RunningTotal";

import SaveListForm from "../components/SaveListForm";

const Home = () => {
  const [coin, setCoin] = React.useState<null | any>(null);
  const [total, setTotal] = React.useState<null | number>(0);
  const [watchlist, setWatchlist] = React.useState<[]>([]);

  return (
    <Box h="100%" w="100%">
      <Box w="60%" m="8% auto" pb="2%">
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

          <Box>
            {!coin ? null : coin && !coin.error ? (
              <SearchCoin
                coin={coin}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />
            ) : (
              <Box ml="10px">Error: {coin.error}</Box>
            )}
          </Box>
          <Box>
            {watchlist.length > 0 ? (
              <Watchlist
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                total={total}
                setTotal={setTotal}
              />
            ) : null}
          </Box>

          {watchlist.length > 0 ? <RunningTotal total={total} /> : null}
        </Box>

        {watchlist.length > 0 ? <SaveListForm watchlist={watchlist} /> : null}
      </Box>
    </Box>
  );
};

export default Home;
