import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { fetchPrice } from "../pages/api/FetchPrice";
import ListCoin from "./ListCoin";

const Watchlist = ({ watchlist, setWatchlist, total, setTotal }) => {
  const [update, setUpdate] = React.useState<number | string>(180);
  const [updatingCoins, setUpdatingCoins] = React.useState<boolean>(false);
  const [calculatingTotal, setCalculatingTotal] = React.useState<boolean>(
    false
  );

  const onSubmit = async (values) => {
    setCalculatingTotal(true);
    let newTotal = 0;
    for (const [key, value] of Object.entries(values)) {
      const foundCoin = watchlist.find((coin) => coin.id === key);
      const price = foundCoin.market_data.current_price.usd;
      newTotal = newTotal + price * Number(value);
    }

    setTimeout(() => {
      setCalculatingTotal(false);
      setTotal(newTotal);
    }, 2000);
  };

  const updateList = async () => {
    setUpdatingCoins(true);
    const clone = watchlist.slice();
    await watchlist.map((coin, i) => {
      fetchPrice(coin.id).then((res) => {
        clone[i] = res;
        setWatchlist(clone);
      });
    });
    setUpdatingCoins(false);
  };

  React.useEffect(() => {
    update > 0 && setTimeout(() => setUpdate(Number(update) - 1), 1000);
    if (update <= 0) {
      updateList();
      setUpdate("restarting...");
      setTimeout(() => {
        setUpdate(180);
      }, 2000);
    }
  }, [update]);

  return (
    <Box w="98%" m="0 auto">
      <Text fontSize={24} m="20px 0">
        Coins data refreshing in: {update}
        {update > 0 ? "s" : null}
      </Text>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            {watchlist.map((coin, i) => {
              return (
                <ListCoin
                  key={i}
                  coin={coin}
                  watchlist={watchlist}
                  setWatchlist={setWatchlist}
                />
              );
            })}
            <Box p="10px 0 ">
              <Button
                type="submit"
                colorScheme="blue"
                m="0 1%"
                isLoading={calculatingTotal}
              >
                Calculate Total
              </Button>
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default Watchlist;
