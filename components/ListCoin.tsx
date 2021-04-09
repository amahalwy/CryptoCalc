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
      pb="4%"
    >
      <Box d="flex" alignItems="center" m="2% 0">
        <Box mr={{ base: "4px", lg: "10px" }} mt={{ base: "1%", lg: "15px" }}>
          <Image
            src={coin.image.small}
            h={{ base: "30px", sm: "35px", lg: "80%" }}
          />
        </Box>
        <Box d="flex" alignItems="center">
          <Text fontSize={{ base: 30, sm: 34, lg: 50 }} mr="3%">
            {coin.name}
          </Text>
          <Text fontSize={20} mr="1%" mt="3%">
            ${numberWithCommas(coin.market_data.current_price.usd)}
          </Text>
          <Text color={renderChangeColor(coin)} mt="3%">
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
                  ml="1%"
                  mt="1px"
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
        <Button onClick={findAndRemove} ml="4%" mt="1px">
          Remove
        </Button>
      </Box>
    </Box>
  );
};

export default ListCoin;
