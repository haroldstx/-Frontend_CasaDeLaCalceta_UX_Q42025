// pagination.jsx
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = ({ page, totalPages, onPageChange }) => {
  return (
    // CAMBIO CLAVE: Añadir la prop 'sx' para limitar el ancho del Stack
    <Stack alignItems="center" mt={3} sx={{ width: "fit-content" }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        shape="rounded"
      />
    </Stack>
  );
};

export default PaginationComponent;
