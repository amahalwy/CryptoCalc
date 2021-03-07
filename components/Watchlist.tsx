import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { Field, Form } from "react-final-form";
import { fetchCoin } from "../pages/api/FetchCoin";
import ListCoin from "./ListCoin";
import AutoSave from "./AutoSave";
import RunningTotal from "./RunningTotal";
import SaveListBottom from "./SaveListBottom";
import { required } from "../generals/validations";
import { Coin, WatchlistProps } from "../typescript/interfaces";
import { SubmitData } from "../typescript/watchlistInterfaces";

const Watchlist: React.FC<WatchlistProps> = ({
  total,
  watchlist,
  calculatingTotal,
  setTotal,
  setWatchlist,
  setCalculatingTotal,
}) => {
  const [update, setUpdate] = React.useState<number | string>(180);
  const [updatingCoins, setUpdatingCoins] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<SubmitData | null>(null);

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
    const clone: Coin[] = watchlist.slice();
    watchlist.map((coin: Coin, i) => {
      return fetchCoin(coin.id).then((res: any) => {
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

  const onSubmit = (values) => {
    watchlist.map((coin: Coin) => {
      coin.quantity = Number(values[coin.id]);
    });
    const data: SubmitData = {
      name: values.username,
      coins: watchlist,
      active: values.active,
    };

    setFormData(data);
  };

  return (
    <Box w="96%" m="0 auto">
      <Text fontSize={{ base: 18, lg: 24 }} m="20px 0" w="98%">
        Coins data refreshing in: {update}
        {update > 0 ? "s" : null}
      </Text>
      <Form
        onSubmit={onSubmit}
        mutators={{
          removeField,
        }}
        initialValues={{ active: false }}
        render={({ handleSubmit, form, values }) => (
          <form onSubmit={handleSubmit}>
            <AutoSave
              debounce={100}
              save={save}
              setTotal={setTotal}
              watchlist={watchlist}
              setCalculatingTotal={setCalculatingTotal}
            />
            <Box maxH="250px" overflow="scroll" m="0 auto">
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
            <RunningTotal
              total={total}
              calculatingTotal={calculatingTotal}
              setCalculatingTotal={setCalculatingTotal}
            />
            <Field
              name="username"
              validate={required}
              render={({ input, meta }) => (
                <FormControl isInvalid={meta.touched && meta.error} w="100%">
                  <InputGroup>
                    <Input
                      borderRadius="0"
                      borderBottom="1px solid #ccc"
                      fontSize={{ base: 24, lg: 30 }}
                      w="100%"
                      id="username"
                      h="3.68rem"
                      placeholder="Create portfolio with username"
                      {...input}
                    />
                  </InputGroup>
                  {meta.touched && meta.error && (
                    <FormErrorMessage ml="1%">{meta.error}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Box p="10px 0">
              <SaveListBottom data={formData} total={total} />
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default Watchlist;
