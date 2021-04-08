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
import { required } from "../generals/validations";
import { Coin, WatchlistProps } from "../typescript/interfaces";
import { SubmitData } from "../typescript/interfaces";
import ListCoin from "./ListCoin";
import AutoSave from "./AutoSave";
import RunningTotal from "./RunningTotal";
import SaveListBottom from "./SaveListBottom";

const Watchlist: React.FC<WatchlistProps> = ({
  total,
  watchlist,
  calculatingTotal,
  setTotal,
  setWatchlist,
  setCalculatingTotal,
}) => {
  const [updatingCoins, setUpdatingCoins] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<SubmitData | null>(null);
  const [update, setUpdate] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (localStorage && !localStorage.cryptoCalcUpdate && !update) {
      localStorage.setItem("cryptoCalcUpdate", JSON.stringify(180));
    }
    setUpdate(JSON.parse(localStorage.cryptoCalcUpdate));
    update > 0 &&
      update !== null &&
      setTimeout(() => {
        const newUpdate = Number(update) - 1;
        setUpdate(newUpdate);
        localStorage.setItem("cryptoCalcUpdate", JSON.stringify(newUpdate));
      }, 1000);
    if (update <= 0 && update !== null) {
      updateList();
      setTimeout(() => {
        setUpdate(180);
        localStorage.setItem("cryptoCalcUpdate", JSON.stringify(180));
      }, 1000);
    }
  }, [update]);

  const updateList = async () => {
    const clone: Coin[] = watchlist.slice();
    watchlist.map((coin: object | any, i) => {
      return fetchCoin(coin.id).then((res: Coin) => {
        clone[i] = res;
        setWatchlist(clone);
      });
    });
  };

  const save = async (values) => {};

  const removeField = (
    args: (string | number)[],
    state: { fields: { [x: string]: any } }
  ) => {
    const field = state.fields[args[0]];
    field.change(field.initial);
  };

  const onSubmit = (values: {
    [x: string]: any;
    username: any;
    active: any;
  }) => {
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
              {watchlist.map((coin, i) => (
                <ListCoin
                  key={i}
                  coin={coin}
                  form={form}
                  watchlist={watchlist}
                  setWatchlist={setWatchlist}
                />
              ))}
            </Box>
            <RunningTotal total={total} calculatingTotal={calculatingTotal} />
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
