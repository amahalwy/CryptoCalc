import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputGroup,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { saveList } from "../util/SaveList";
import { Form, Field } from "react-final-form";
import { required } from "../generals/validations";

const SaveListForm = ({ watchlist }) => {
  const onSubmit = (values) => {
    const data = {
      name: values.username,
      coins: watchlist,
    };
    console.log(data);
    saveList(data);
  };
  return (
    <Box>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="username"
              validate={required}
              render={({ input, meta }) => (
                <FormControl isInvalid={meta.touched && meta.error} w="100%">
                  <InputGroup>
                    <Input
                      borderRadius="0"
                      borderBottom="1px solid #ccc"
                      fontSize={30}
                      w="100%"
                      id="username"
                      h="3.68rem"
                      placeholder="Save list with username"
                      {...input}
                    />
                  </InputGroup>
                  {meta.touched && meta.error && (
                    <FormErrorMessage ml="1%">{meta.error}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Box p="10px 0 ">
              <Button type="submit">Save list</Button>
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default SaveListForm;
