import React from "react";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const StyledPaginationTableRow = styled(TableRow)(() => ({
  backgroundColor: "#EEE",
}));

function PaginationTableRow({ ...props }: React.ComponentProps<typeof TableRow>) {
  return <StyledPaginationTableRow {...props}>{props.children}</StyledPaginationTableRow>;
}

export default PaginationTableRow;
