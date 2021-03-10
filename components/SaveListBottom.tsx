import { Box, Button } from "@chakra-ui/react";
import React from "react";
import useAsyncFn from "react-use/lib/useAsyncFn";
import { SaveListBottomProps } from "../typescript/interfaces";
import { saveList } from "../util/SaveList";
import ShowStatus from "./ShowStatus";

const SaveListBottom: React.FC<SaveListBottomProps> = ({ data, total }) => {
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
      <Button
        m="10px 0"
        type="submit"
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
