import React from "react";
import { Box, Text, Spinner, Image } from "@chakra-ui/react";
import {
  numberWithCommas,
  renderChangeColor,
  renderMarketChange,
} from "../generals/functions";
import { fetchPrice } from "../pages/api/FetchPrice";

const PortfolioCoin = ({ coin, update, setUpdate }) => {
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
      <Box mr="10px" h="100%">
        <Image src={coin.image.small} />
      </Box>
      <Box d="flex" alignItems="center" justifyContent="space-between" w="90%">
        <Box d="flex">
          <Text fontSize={34} mr="10px">
            {coin.name}
          </Text>
          <Box mt="4.5%">
            <Text d="inline" fontSize={22} mr="6px">
              {!price ? <Spinner /> : `$${numberWithCommas(price)}`}
            </Text>
            <Text d="inline" color={renderChangeColor(coin)}>
              $({renderMarketChange(coin)})
            </Text>
          </Box>
        </Box>
        <Box>
          <Text fontSize={20} mr="10px">
            Quantity: {coin.quantity}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PortfolioCoin;
