import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { styled, Typography, InputLabel, MenuItem, Select, Box, Button } from "@mui/material";

const PaginationContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginTop:"10px"
});

const PaginationWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    height: "44px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    backgroundColor: "#2761E5",
    color: "white",
  },
});

const NavButton = styled(Button)({
    height: "44px",
    minWidth: "44px",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor:"pointer",
    '&:hover': {
      backgroundColor: "#f0f0f0",
    },
    "&.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.26)",
      borderColor: "rgba(0, 0, 0, 0.26)",
    //   cursor: "not-allowed",  
    },
  });

const MuiPaginationComponent = ({ count, page, setPage, pageLimit, setPageLimit }) => {
  const siblingCount = 0;
  const boundaryCount = count > 4 ? 1 : 0;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setPageLimit(event.target.value);
    setPage(1); 
  };

  return (
    <PaginationContainer>
      <Box display="flex" alignItems="center">
        {/* <InputLabel>Rows per page:</InputLabel> */}
        <Select
          value={pageLimit}
          onChange={handleRowsPerPageChange}
          sx={{ ml: 1, minWidth: 60 }}
        >
          <MenuItem value={5}> Results per page: 5</MenuItem>
          <MenuItem value={10}> Results per page: 10</MenuItem>
          <MenuItem value={20}>Results per page: 20</MenuItem>
        </Select>
      </Box>

      <PaginationWrapper>
        <StyledPagination
          count={count}
          onChange={handleChange}
          page={page}
          siblingCount={siblingCount}
          boundaryCount={boundaryCount}
          variant="outlined"
          shape="rounded"
          renderItem={(item) => {
            if (item.type === "previous" || item.type === "next") {
              return null;
            }
            return <PaginationItem {...item} />;
          }}
        />
      </PaginationWrapper>

      <Box sx={{display:"flex" , columnGap : "10px"}}>
        <NavButton
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          <Typography variant="body2">Previous</Typography>
        </NavButton>
        <NavButton
          onClick={() => setPage(Math.min(page + 1, count))}
          disabled={page === count}
        >
          <Typography variant="body2">Next</Typography>
        </NavButton>
      </Box>
    </PaginationContainer>
  );
};

export default MuiPaginationComponent;
