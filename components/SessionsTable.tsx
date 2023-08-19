import * as React from "react";
import { useRouter } from "next/router";
import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import { Session } from "../types/session";
import PaginationTableRow from "./PaginationTableRow";
import { FilterAndColumnsContext, filterkeys } from "@/contexts/FilterAndColumnsContext";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const colorMapping = {
  "100": "#FF0",
  "200": "#8ED28E",
  "300": "#85C1E9",
  "400": "#A569BD",
};
const textColorMapping = {
  "100": "#000",
  "200": "#000",
  "300": "#000",
  "400": "#FFF",
};

type Level = keyof typeof colorMapping;

interface LevelTextProps {
  level: Level;
}

const LevelText = styled("div")<LevelTextProps>(({ level }) => ({
  borderRadius: "15px",
  padding: "6px",
  alignContent: "center",
  backgroundColor: colorMapping[level] || "#f0f0f0",
  textAlign: "center",
  color: textColorMapping[level] || "#000",
}));

interface SessionTableProps {
  rows: Session[];
}
export default function SessionTable({ rows }: SessionTableProps) {
  const [page, setPage] = React.useState(0);
  const { filters } = React.useContext(FilterAndColumnsContext);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const router = useRouter();

  const filteredRows = rows.filter((session) => {
    let sessionIncluded = true;

    filterkeys.forEach((filterkey) => {
      if (!sessionIncluded) {
        // Exit the forEach loop early when a reason to exclude
        // the session has already been found.
        return;
      }

      // Get a list of enabled filter options from the filter context.
      const enabledFilterOptions = Object.keys(
        filters[filterkey as keyof typeof filters].options
      ).filter((option) => filters[filterkey as keyof typeof filters].options[option] === true);

      if (enabledFilterOptions.length == 0) {
        // no filter options were found, always return true.
        return true;
      }

      if (
        enabledFilterOptions.length ==
        Object.keys(filters[filterkey as keyof typeof filters].options).length
      ) {
        // No custom filtering for this filter key, so return true.
        return true;
      }

      // Check which filter values (e.g. level 200, or "chalk talk") are present for this session.
      const filterKeysForSession = session[filterkey as keyof Session];

      // Convert single strings to a list of strings.
      let filterKeysForSessionList: string[] = [];
      if (Array.isArray(filterKeysForSession)) {
        filterKeysForSessionList = filterKeysForSession;
      } else {
        filterKeysForSessionList.push(filterKeysForSession);
      }

      // If none of the filters in enabledFilterOptions is present in the filterKeysForSessionList,
      // return false to filter out the session
      sessionIncluded = filterKeysForSessionList.some((sessionFilter) =>
        enabledFilterOptions.includes(sessionFilter)
      );
    });
    return sessionIncluded;
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function renderServices(services: string[]): JSX.Element {
    // if services is an empty list, return "-"
    if (services.length === 0) {
      return <span />;
    }

    return (
      <span>
        {services.map((service, index) => (
          <React.Fragment key={index}>
            {service}
            <br />
          </React.Fragment>
        ))}
      </span>
    );
  }

  function clickRow(id: string) {
    router.push(`/sessions/${id}`);
  }

  return (
    <div>
      <TableContainer
        style={{ minHeight: "calc(100dvh - 117px", maxHeight: "calc(100dvh - 117px" }}
      >
        <Table aria-label="custom pagination table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Session ID</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Session Type</StyledTableCell>
              <StyledTableCell>Services</StyledTableCell>
              <StyledTableCell align="center">Level</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredRows
            ).map((session) => (
              <StyledTableRow
                key={session.thirdPartyID}
                onClick={() => clickRow(session.thirdPartyID)}
              >
                <TableCell component="th" scope="row">
                  {session.thirdPartyID}
                </TableCell>
                <TableCell component="th" scope="row">
                  {session.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {session.trackName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {renderServices(session.services)}
                </TableCell>
                <TableCell style={{ width: 80 }} align="center">
                  <LevelText level={session.level}> {session.level} </LevelText>
                </TableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationTableRow sx={{ justifyContent: "flex-end", display: "flex" }}>
        <TablePagination
          component={"div"}
          rowsPerPageOptions={[10, 50, 100, { label: "All", value: -1 }]}
          colSpan={4}
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </PaginationTableRow>
    </div>
  );
}
