import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputGroup,
  Input,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { saveList } from "../util/SaveList";
import { Form, Field } from "react-final-form";
import { required } from "../generals/validations";
import { useAsyncFn, useAsync } from "react-use";

const Demo = ({ data }) => {
  const [state, fetch] = useAsyncFn(async () => {
    const response = await saveList(data);
    const result = await response;
    return result;
  }, [data]);

  React.useEffect(() => {
    if (data) {
      console.log(data);
      fetch();
    }
  }, [data]);

  console.log(state);
  return (
    <Box>
      {state.loading ? <Box>Loading...</Box> : null}
      {state.error ? <Box>Error: {state.error.message}</Box> : null}
      {state.value ? (
        <Box>OTP for login with username: {state.value.otp}</Box>
      ) : null}

      <Button m="10px 0" type="submit" disabled={state.value}>
        Create!!!
      </Button>
    </Box>
  );
};

const SaveListForm = ({ watchlist }) => {
  const [formData, setFormData] = React.useState<object | null>(null);

  const onSubmit = (values) => {
    const data = {
      name: values.username,
      coins: watchlist,
      active: values.active,
    };

    setFormData(data);
  };
  return (
    <Box>
      <Form
        onSubmit={onSubmit}
        initialValues={{ active: false }}
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
                      placeholder="Create portfolio with username"
                      {...input}
                    />
                  </InputGroup>
                  {meta.touched && meta.error && (
                    <FormErrorMessage ml="1%">{meta.error}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Box p="10px 0" ml="1%">
              <Demo data={formData} />
              {/* <Button type="submit">Create!</Button> */}
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default SaveListForm;
