import React from "react";
import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { renderChangePercent, numberWithCommas } from "../generals/functions";
import { DrawerProps, LeaderBoardItemProps } from "../typescript/interfaces";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const Drawer: React.FC<DrawerProps> = ({ list }) => (
  <Box>
    <Box>Coins:</Box>
    <Box>
      <UnorderedList>
        {list.coins.map((coin, i) => (
          <ListItem key={i}>
            {coin.name}: {numberWithCommas(coin.quantity)}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  </Box>
);

const LeaderBoardItem: React.FC<LeaderBoardItemProps> = ({
  list,
  pos,
  activeItem,
  setActiveItem,
}) => (
  <Box
    px={6}
    py={4}
    bg={pos % 2 === 0 ? "gray.100" : "white"}
    onClick={() => {
      activeItem === pos ? setActiveItem(null) : setActiveItem(pos);
    }}
  >
    <Box d="flex">
      <Box d="flex" p="0 7.5%" w="15%" justifyContent="center">
        <Text>{pos}</Text>
      </Box>
      <Box w="50%" p="0 15%">
        <Text textAlign="left">{list.owner.name}</Text>
      </Box>
      <Box w="30%">
        <Text fontSize={16} mr="6px" d="flex">
          ${numberWithCommas(list.currentTotal)}
          {activeItem === pos ? (
            <MdArrowDropUp fontSize={20} />
          ) : (
            <MdArrowDropDown fontSize={20} />
          )}
        </Text>
        <Text
          fontSize={12}
          h="100%"
          color={renderChangePercent(list.percentChange)}
        >
          ({list.percentChange > 0 ? `+` : `-`}
          {list.percentChange.toFixed(3)}%)
        </Text>
      </Box>
    </Box>
    {activeItem === pos ? <Drawer list={list} /> : null}
  </Box>
);

export default LeaderBoardItem;
