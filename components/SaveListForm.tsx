import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputGroup,
  Input,
  FormErrorMessage,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { saveList } from "../util/SaveList";
import { Form, Field } from "react-final-form";
import { required } from "../generals/validations";
import { useAsyncFn, useAsync } from "react-use";

const ShowStatus = ({ state }) => {
  console.log(state);

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
    return <Box>OTP for login with username: {state.value.otp}</Box>;
  } else {
    return null;
  }
};

const Save = ({ data }) => {
  const [state, fetch] = useAsyncFn(async () => {
    const response = await saveList(data);
    const result = await response;
    return result;
  }, [data]);

  React.useEffect(() => {
    if (data) {
      fetch();
    }
  }, [data]);

  return (
    <Box>
      <ShowStatus state={state} />
      <Button m="10px 0" type="submit">
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
              <Save data={formData} />
            </Box>
          </form>
        )}
      />
    </Box>
  );
};

export default SaveListForm;
