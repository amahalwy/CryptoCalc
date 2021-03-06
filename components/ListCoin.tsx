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

const ListCoin = ({ coin, total, setTotal }) => {
  return (
    <Box d="flex" justifyContent="space-between">
      <Box d="flex">
        <Box mt="5px" mr="10px">
          <Image src={coin.image.thumb} />
        </Box>
        <Box>
          <Text d="inline" fontSize={24} mr="10px">
            {coin.name}
          </Text>
          <Text d="inline" fontSize={20}>
            ${numberWithCommas(coin.market_data.current_price.usd)}
          </Text>
          <Text d="inline" color={renderChangeColor(coin)}>
            ({renderMarketChange(coin)})
          </Text>
        </Box>
      </Box>
      <Box d="flex">
        <Field
          name={coin.id}
          render={({ input, meta }) => (
            <FormControl isInvalid={meta.touched && meta.error} w="100%">
              <InputGroup>
                <Input
                  w="100%"
                  id={coin.id}
                  placeholder="Quantity"
                  {...input}
                />
              </InputGroup>
              {meta.touched && meta.error && (
                <FormErrorMessage ml="1%">{meta.error}</FormErrorMessage>
              )}
            </FormControl>
          )}
        />
        <Button>Remove</Button>
      </Box>
    </Box>
  );
};

export default ListCoin;
