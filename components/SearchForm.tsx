import React from "react";
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { Form, Field } from "react-final-form";
import { required } from "../generals/validations";
import { fetchCoin } from "../pages/api/FetchCoin";
import { SearchFormProps } from "../typescript/interfaces";

const SearchForm: React.FC<SearchFormProps> = ({ setCoin }) => {
  const [searching, setSearching] = React.useState<boolean>(false);

  const onSubmit = async (values: { crypto: string }) => {
    setSearching(true);
    setCoin(null);
    await fetchCoin(values.crypto).then((res) => setCoin(res));
    setSearching(false);
  };

  return (
    <Box px={4}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="crypto"
              validate={required}
              render={({ input, meta }) => (
                <FormControl isInvalid={meta.touched && meta.error}>
                  <InputGroup>
                    <Input
                      id="crypto"
                      borderRadius="0"
                      borderBottom="1px solid #ccc"
                      fontSize={{ base: 20, lg: 30 }}
                      h={{ base: "3rem", lg: "3.68rem" }}
                      placeholder="Search for a cryptocurrency by name"
                      {...input}
                    />
                  </InputGroup>
                  {meta.touched && meta.error && (
                    <FormErrorMessage ml="1%">{meta.error}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Box p="2% 0">
              <Button
                mr="2%"
                type="submit"
                colorScheme="blue"
                isLoading={searching}
                disabled={pristine || submitting}
              >
                Search
              </Button>
              <Button
                type="button"
                onClick={() => {
                  form.reset();
                  setCoin(null);
                }}
                disabled={submitting || pristine}
              >
                Reset
              </Button>
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default SearchForm;
