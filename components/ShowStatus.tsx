import React from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ShowStatus: React.FC<{
  state: {
    loading?: boolean;
    error?: object | undefined;
    value?: object | any;
  };
}> = ({ state }) => {
  const router = useRouter();

  if (state.loading) {
    return (
      <Box m="10px 0">
        <Spinner />
      </Box>
    );
  } else {
    if (state.value && state.value.code === "P2002") {
      return (
        <Box>
          <Text fontSize={20} color="red">
            Username taken
          </Text>
        </Box>
      );
    } else if (state.value && !state.value.code) {
      setTimeout(() => {
        router.push(`/portfolio/${state.value.id}`);
      }, 2000);
      return (
        <Box color="green">Successfully saved your list! Redirecting...</Box>
      );
    } else {
      return null;
    }
  }
};

export default ShowStatus;
