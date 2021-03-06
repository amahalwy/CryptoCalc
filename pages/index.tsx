import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import SearchForm from "../components/SearchForm";
import SearchCoin from "../components/SearchCoin";
import Watchlist from "../components/Watchlist";
import RunningTotal from "../components/RunningTotal";

const Home = () => {
  const [coin, setCoin] = React.useState<null | Object>(null);
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
            {!coin ? null : (
              <SearchCoin
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                coin={coin}
              />
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

          <Box>
            <RunningTotal total={total} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
