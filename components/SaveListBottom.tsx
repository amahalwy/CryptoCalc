import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import useAsyncFn from "react-use/lib/useAsyncFn";
import MyContext from "../lib/MyContext";
import { Context, SaveListBottomProps } from "../typescript/interfaces";
import { saveList } from "../util/lists/saveList";
import ShowStatus from "./ShowStatus";

const SaveListBottom: React.FC<SaveListBottomProps> = ({ data, total }) => {
  const { setLoading } = useContext<Context>(MyContext);
  const router = useRouter();
  const [state, fetch] = useAsyncFn(async () => {
    const response = await saveList(data);
    const result = await response;
    return result;
  }, [data]);

  React.useEffect(() => {
    if (data) {
      fetch().then((res) => {
        setLoading(true);
        router.push(`/portfolio/${res.id}`).then(() => setLoading(false));
      });
    }
  }, [data]);

  return (
    <Box>
      <ShowStatus state={state} />
      <Button
        type="submit"
        colorScheme="blue"
        disabled={total > 1000000 || total === 0}
      >
        {total > 1000000
          ? "Portfolio greater than 1 million"
          : "Create Portfolio"}
      </Button>
    </Box>
  );
};

export default SaveListBottom;
