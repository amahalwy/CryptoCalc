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
    <Box w="100%">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="crypto"
              validate={required}
              render={({ input, meta }) => (
                <FormControl isInvalid={meta.touched && meta.error} w="100%">
                  <InputGroup>
                    <Input
                      borderRadius="0"
                      borderBottom="1px solid #ccc"
                      fontSize={{ base: 24, lg: 30 }}
                      w="100%"
                      id="crypto"
                      h="3.68rem"
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
                type="submit"
                colorScheme="blue"
                m="0 1%"
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
