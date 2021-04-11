import React from "react";
import { Box, Text, Spinner, Image } from "@chakra-ui/react";
import {
  numberWithCommas,
  renderChangeColor,
  renderMarketChange,
} from "../generals/functions";
import { fetchPrice } from "../util/coins/price";
import { PortfolioCoinProps } from "../typescript/interfaces";

const PortfolioCoin: React.FC<PortfolioCoinProps> = ({ coin, update }) => {
  const [price, setPrice] = React.useState<null | number>(
    coin.market_data.current_price.usd
  );

  React.useEffect(() => {
    if (update <= 0) {
      updateCoinPrice();
    }
  }, [update]);

  const updateCoinPrice = async () => {
    setPrice(null);
    await fetchPrice(coin.name.toLowerCase()).then((res) => {
      setPrice(res[coin.id].usd);
    });
  };

  return (
    <Box
      d="flex"
      borderBottom="1px solid #ccc"
      p="10px 0"
      m="4px 0"
      alignItems="center"
    >
      <Box mr={{ base: "4px", lg: "10px" }} mt={{ sm: "1%", lg: "15px" }}>
        <Image
          src={coin.image.small}
          h={{ base: "30px", sm: "35px", lg: "80%" }}
        />
      </Box>
      <Box w="90%" d="flex" alignItems="center">
        <Text fontSize={{ base: 36, lg: 50 }} mr="4px">
          {coin.name}
        </Text>
        <Text fontSize={20} mr="1%" mt="3%">
          {!price ? <Spinner /> : `$${numberWithCommas(price)}`}
        </Text>
        <Text color={renderChangeColor(coin)} mt="3%">
          $({renderMarketChange(coin)})
        </Text>

        <Text fontSize={20} mt="3%" ml="4%">
          Qty: {coin.quantity}
        </Text>
      </Box>
    </Box>
  );
};

export default PortfolioCoin;
