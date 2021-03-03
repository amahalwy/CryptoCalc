import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Form } from "react-final-form";
import { fetchPrice } from "../pages/api/FetchPrice";
import ListCoin from "./ListCoin";
import AutoSave from "./AutoSave";

const Watchlist = ({
  watchlist,
  setWatchlist,
  setTotal,
  setCalculatingTotal,
}) => {
  const [update, setUpdate] = React.useState<number | string>(180);
  const [updatingCoins, setUpdatingCoins] = React.useState<boolean>(false);

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

  const save = async (values) => {};

  const removeField = (args, state) => {
    const field = state.fields[args[0]];
    field.change(field.initial);
  };

  return (
    <Box w="98%" m="0 auto">
      <Text fontSize={24} m="20px 0">
        Coins data refreshing in: {update}
        {update > 0 ? "s" : null}
      </Text>
      <Form
        onSubmit={save}
        mutators={{
          removeField,
        }}
        render={({ handleSubmit, form, values }) => (
          <form onSubmit={handleSubmit}>
            <AutoSave
              debounce={100}
              save={save}
              setTotal={setTotal}
              watchlist={watchlist}
              setCalculatingTotal={setCalculatingTotal}
            />
            <Box maxH="250px" overflow="scroll">
              {watchlist.map((coin, i) => {
                return (
                  <ListCoin
                    key={i}
                    coin={coin}
                    form={form}
                    watchlist={watchlist}
                    setWatchlist={setWatchlist}
                  />
                );
              })}
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default Watchlist;
