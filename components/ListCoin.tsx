import React from "react";
import {
  Box,
  Image,
  Text,
  FormControl,
  InputGroup,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { Field } from "react-final-form";
import {
  renderMarketChange,
  renderChangeColor,
  numberWithCommas,
} from "../generals/functions";
import { ListCoinProps } from "../typescript/interfaces";

const ListCoin: React.FC<ListCoinProps> = ({
  coin,
  form,
  watchlist,
  setWatchlist,
}) => {
  const findAndRemove = () => {
    const id: number = watchlist.findIndex((item: any) => item.id === coin.id);
    const newList: any[] = watchlist
      .slice(0, id)
      .concat(watchlist.slice(id + 1));
    setWatchlist(newList);
    const name: string = coin.id;
    form.mutators.removeField(name);
  };

  return (
    <Box
      d={{ base: "block", lg: "flex" }}
      justifyContent="space-between"
      borderBottom="1px solid #ccc"
      pb="20px"
      mb="20px"
    >
      <Box d="flex" justifyContent="flex-start">
        <Box mt={{ base: "10px", lg: "7px" }} mr={{ base: "4px", lg: "10px" }}>
          <Image src={coin.image.thumb} />
        </Box>
        <Box>
          <Text d="inline" fontSize={24} mr="10px">
            {coin.name}
          </Text>
          <Text d="inline" fontSize={20} mr="6px">
            ${numberWithCommas(coin.market_data.current_price.usd)}
          </Text>
          <Text d="inline" color={renderChangeColor(coin)}>
            $({renderMarketChange(coin)})
          </Text>
        </Box>
      </Box>
      <Box d="flex" w={{ base: "80%", lg: "20%" }}>
        <Field
          name={coin.id}
          render={({ input, meta }) => (
            <FormControl isInvalid={meta.touched && meta.error} w="60%">
              <InputGroup>
                <Input
                  id={coin.id}
                  placeholder="Quantity"
                  {...input}
                  mt="1px"
                />
              </InputGroup>
              {meta.touched && meta.error && (
                <FormErrorMessage ml="1%">{meta.error}</FormErrorMessage>
              )}
            </FormControl>
          )}
        />
        <Button onClick={findAndRemove} ml="4%" mt="1px">
          Remove
        </Button>
      </Box>
    </Box>
  );
};

export default ListCoin;
