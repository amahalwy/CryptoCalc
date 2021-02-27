import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Form } from "react-final-form";
import ListCoin from "./ListCoin";

const Watchlist = ({ watchlist, setWatchlist, total, setTotal }) => {
  // const [update, setUpdate] = React.useState(null);
  const [calculatingTotal, setCalculatingTotal] = React.useState(false);

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

  return (
    <Box w="98%" m="0 auto">
      <Text>Coins data refreshing in: {/*update*/}</Text>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            {watchlist.map((coin, i) => {
              return (
                <ListCoin
                  key={i}
                  coin={coin}
                  total={total}
                  setTotal={setTotal}
                />
              );
            })}
            <Box p="10px 0 ">
              <Button
                type="submit"
                colorScheme="blue"
                ml="1%"
                isLoading={calculatingTotal}
              >
                Calculate Total
              </Button>
              <Button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </Button>
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default Watchlist;
