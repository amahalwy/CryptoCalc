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
      <Box>
        <Spinner />
      </Box>
    );
  } else if (state.value && state.value.ErrorCode) {
    return (
      <Box>
        <Text fontSize={20} color="red">
          Username taken
        </Text>
      </Box>
    );
  } else if (state.value && !state.value.ErrorCode) {
    setTimeout(() => {
      router.push(`/portfolio/${state.value.id}`);
    }, 2000);
    return <Box>OTP for login with username: {state.value.otp}</Box>;
  } else {
    return null;
  }
};

export default ShowStatus;
