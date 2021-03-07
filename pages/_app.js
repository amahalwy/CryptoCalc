import React from "react";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "blue.900",
      },
    },
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
