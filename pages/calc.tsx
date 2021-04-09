import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import SearchForm from "../components/SearchForm";
import SearchCoin from "../components/SearchCoin";
import Watchlist from "../components/Watchlist";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { Coin } from "../typescript/interfaces";

const Calc: React.FC = () => {
  const [coin, setCoin] = React.useState<null | any>(null);
  const [total, setTotal] = React.useState<null | number>(0);
  const [watchlist, setWatchlist] = React.useState<Coin[]>([]);
  const [calculatingTotal, setCalculatingTotal] = React.useState<boolean>(
    false
  );

  return (
    <Box>
      <GoogleAnalytics />
      <Box
        w={{ base: "90%", lg: "60%" }}
        m="6% auto"
        bg="white"
        borderWidth="1px"
        borderRadius="md"
      >
        <Box px={4} py={4}>
          <Box color="orange.400">
            <Heading fontSize={{ base: 36, lg: 54 }}>CryptoCalc</Heading>
            <Heading fontSize={18}>
              How much can you make with 1 million?
            </Heading>
          </Box>
        </Box>
        <Box>
          <SearchForm setCoin={setCoin} />
          {!coin ? null : coin && !coin.error ? (
            <SearchCoin
              coin={coin}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          ) : (
            <Box px={4} py={2} color="red">
              Error: {coin.error}
            </Box>
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
