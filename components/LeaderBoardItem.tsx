import React from "react";
import { Box, ListItem, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { renderChangePercent, numberWithCommas } from "../generals/functions";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

const LeaderBoardItem = ({ list }) => {
  return (
    <ListItem fontSize={20}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              d={{ base: "block", lg: "flex" }}
              flex="1"
              textAlign="left"
              justifyContent="space-between"
            >
              <Box d="flex">
                <Text fontSize={{ base: 20, lg: 26 }}>{list.owner.name}</Text>
              </Box>
              <Box
                d={{ base: "block", lg: "flex" }}
                h="100%"
                alignItems="center"
                mt="6px"
              >
                <Text fontSize={20} d="inline" mr="10px">
                  Portfolio Value: ${numberWithCommas(list.currentTotal)}
                </Text>
                <Text
                  d="inline"
                  color={renderChangePercent(list.percentChange)}
                >
                  ({list.percentChange > 0 ? `+` : `-`}
                  {list.percentChange.toFixed(4)}%)
                </Text>
              </Box>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>

        <AccordionPanel pb={4}>
          <Box>Coins: </Box>
          {list.coins.map((coin, i) => {
            return (
              <Box d="flex" w="100px" justifyContent="space-between">
                <Box>{coin.name}</Box>
                <Box>x{coin.quantity}</Box>
              </Box>
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    </ListItem>
  );
};

export default LeaderBoardItem;
