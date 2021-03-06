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

const Watchlist = ({
  watchlist,
  setWatchlist,
  total,
  setTotal,
  calculatingTotal,
  setCalculatingTotal,
}) => {
  const [update, setUpdate] = React.useState<number | string>(180);
  const [updatingCoins, setUpdatingCoins] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<object | null>(null);

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
      fetchCoin(coin.id).then((res) => {
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
    watchlist.map((coin) => {
      coin.quantity = Number(values[coin.id]);
    });
    const data = {
      name: values.username,
      coins: watchlist,
      active: values.active,
    };

    setFormData(data);
  };

  const getTotal = () => {
    if (!watchlist || watchlist.length === 0) return null;
    return watchlist.reduce((acc, curr) => {
      return acc + curr.market_data.current_price.usd;
    }, 0);
  };

  return (
    <Box w="96%" m="0 auto">
      <Text fontSize={24} m="20px 0" w="98%">
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
              // values
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
                      fontSize={30}
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
