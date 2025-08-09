import { Stack, Pagination, Select, MenuItem } from "@mui/material";

export default function FooterPagination({
  totalPages,
  totalDocs,
  limit,
  page,
  setPage,
  handleLimit,
  setLoading,
}) {
  return (
    <Stack
      direction="row"
      justifyContent="right"
      spacing={2}
      sx={{ marginTop: "20px" }}
    >
      <Stack direction="column" justifyContent="center">
        <Pagination
          hideNextButton={false}
          hidePrevButton={false}
          page={page}
          count={totalPages}
          color="primary"
          variant="outlined"
          onChange={(event, pageNum) => {
            setLoading(true);
            setPage(parseInt(pageNum));
            window.localStorage.setItem(
              "pageShectionShiftAtt",
              parseInt(pageNum)
            );
          }}
        />
      </Stack>
      <Select size="small" value={limit} onChange={handleLimit}>
        {/* <MenuItem value={1}>1/Page</MenuItem> */}
        <MenuItem value={6}>6/Page</MenuItem>
        <MenuItem value={8}>8/Page</MenuItem>
        <MenuItem value={10}>10/Page</MenuItem>
        <MenuItem value={totalDocs}>All/Page</MenuItem>
      </Select>
    </Stack>
  );
}
