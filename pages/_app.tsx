import React from "react";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { MyProvider } from "../components/Context/MyContext";

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
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <MyProvider value={{ loading, setLoading }}>
        {loading ? <Loading /> : null}
        <Component {...pageProps} />
      </MyProvider>
    </ChakraProvider>
  );
};

export default MyApp;
