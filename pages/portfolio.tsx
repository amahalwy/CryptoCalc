import React, { useContext } from "react";
import {
  Box,
  Heading,
  FormControl,
  InputGroup,
  Input,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";
import { Form, Field } from "react-final-form";
import { required } from "../generals/validations";
import GoogleAnalytics from "../components/GoogleAnalytics";
import Search from "../components/Portfolio/Search";
import MyContext from "../components/Context/MyContext";
import { Context } from "../typescript/interfaces";

const Porfolio = () => {
  const [formData, setFormData] = React.useState<object | null>(null);

  const onSubmit = (values: { username: string }) => {
    const data: { name: string } = {
      name: values.username,
    };
    setFormData(data);
  };

  return (
    <Box
      w={{ base: "90%", lg: "60%" }}
      m="6% auto"
      bg="white"
      borderWidth="1px"
      borderRadius="md"
    >
      <GoogleAnalytics />
      <Box d="flex" px={6} py={4}>
        <Heading color="orange.400" fontSize={{ base: "2xl", lg: 34 }}>
          Search for Portfolio
        </Heading>
      </Box>
      <Divider zIndex={1} />
      <Box px={6} py={4}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, pristine }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="username"
                validate={required}
                render={({ input, meta }) => (
                  <FormControl isInvalid={meta.touched && meta.error}>
                    <InputGroup>
                      <Input
                        borderRadius="0"
                        borderBottom="1px solid #ccc"
                        fontSize={{ base: 22, lg: 30 }}
                        id="username"
                        h="3.68rem"
                        placeholder="Portfolio Username"
                        {...input}
                      />
                    </InputGroup>
                    {meta.touched && meta.error && (
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <Box m="0 auto" d="flex">
                <Search data={formData} pristine={pristine} form={form} />
              </Box>
            </form>
          )}
        />
      </Box>
    </Box>
  );
};

export default Porfolio;
