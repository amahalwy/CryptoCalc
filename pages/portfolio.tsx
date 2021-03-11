import React from "react";
import {
  Box,
  Button,
  Heading,
  FormControl,
  InputGroup,
  Input,
  Spinner,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Form, Field } from "react-final-form";
import { required } from "../generals/validations";
import { useAsyncFn } from "react-use";
import { fetchList } from "../util/FetchList";
import { useRouter } from "next/router";
import GoogleAnalytics from "../components/GoogleAnalytics";

const ShowStatus: React.FC<{
  state: {
    loading?: boolean;
    error?: object | any;
    value?: object | any;
  };
}> = ({ state }) => {
  if (state.loading) {
    return (
      <Box mb="20px">
        <Spinner />
      </Box>
    );
  } else if (
    state.error ||
    state.value === "Error: List not found" ||
    state.value === "Internal server error"
  ) {
    return (
      <Box color="red" mb="20px">
        Error: Couldn't find your list
      </Box>
    );
  } else if (state.value && state.value !== "Error: List not found") {
    return (
      <Box color="green" mb="20px">
        Found your Portfolio! Redirecting...{" "}
      </Box>
    );
  } else {
    return null;
  }
};

const Search: React.FC<{
  data: object | any;
  pristine: boolean;
  form: object | any;
}> = ({ data, pristine, form }) => {
  const router = useRouter();
  const [state, fetch] = useAsyncFn(async () => {
    const response = await fetchList(data);
    const result = await response;
    return result;
  }, [data]);

  React.useEffect(() => {
    if (data) {
      fetch().then((res) => {
        res === "Error: List not found" || res === "Internal Server Error"
          ? null
          : setTimeout(() => {
              router.push(`/portfolio/${res}`);
            }, 1000);
      });
    }
  }, [data]);

  return (
    <Box>
      <Box>
        <ShowStatus state={state} />
        <Box pb="20px">
          <Button type="submit" disabled={pristine}>
            Search
          </Button>
          <Button onClick={() => form.reset()} disabled={pristine} ml="20px">
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const Porfolio = () => {
  const [formData, setFormData] = React.useState<object | null>(null);
  const onSubmit = (values: { username: string }) => {
    const data: { name: string } = {
      name: values.username,
    };

    setFormData(data);
  };
  return (
    <Box m="8% auto" w={{ base: "80%", lg: "30%" }}>
      <GoogleAnalytics />
      <Box minH={{ base: "180px", lg: "250px" }} bg="white">
        <Box d="flex" p="3% 0" ml="5%" borderBottom="1px solid #ccc">
          <Heading color="orange.400" fontSize={{ base: 24, lg: 34 }}>
            Search for Portfolio
          </Heading>
        </Box>
        <Box>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, pristine }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="username"
                  validate={required}
                  render={({ input, meta }) => (
                    <FormControl
                      isInvalid={meta.touched && meta.error}
                      w="90%"
                      m="4% auto"
                    >
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
                <Box w="90%" m="0 auto" d="flex">
                  <Search data={formData} pristine={pristine} form={form} />
                </Box>
              </form>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Porfolio;
