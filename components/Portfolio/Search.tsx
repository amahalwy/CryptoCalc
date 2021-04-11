import React, { useContext } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useAsyncFn } from "react-use";
import { useRouter } from "next/router";
import { fetchList } from "../../util/lists/fetchList";
import { Context, List, SearchProps } from "../../typescript/interfaces";
import ShowStatus from "../ShowStatus";
import MyContext from "../../lib/MyContext";

const Search: React.FC<SearchProps> = ({ data, pristine, form }) => {
  const { setLoading } = useContext<Context>(MyContext);
  const router = useRouter();
  const [state, fetch] = useAsyncFn(async () => {
    const response = await fetchList(data);
    return response;
  }, [data]);

  React.useEffect(() => {
    if (data) {
      fetch().then((res: { status: number; list: List }) => {
        if (res.status === 200) {
          setLoading(true);
          router
            .push(`/portfolio/${res.list.id}`)
            .then(() => setLoading(false));
        }
      });
    }
  }, [data]);

  return (
    <Box w="100%" mt="4%">
      <ShowStatus state={state} />
      <Box d="flex" w="100%">
        <Button
          type="submit"
          colorScheme="blue"
          disabled={pristine}
          mr="4%"
          pos="inherit"
        >
          Search
        </Button>
        <Button onClick={() => form.reset()} disabled={pristine}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Search;
