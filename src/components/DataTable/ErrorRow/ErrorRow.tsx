import { FC } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
import { IDataTableColumn } from '@/components/DataTable/types';

interface IErrorRowProps {
  columns: Array<IDataTableColumn>;
  message: string;
}

/* Data Table Error Row helper */
/* =========================== */
const ErrorRow: FC<IErrorRowProps> = (props) => {
  const { columns, message } = props;

  return (
    <TableRow>
      <TableCell colSpan={columns.length}>
        <Box display="flex" flexDirection="column" py={7} alignItems="center">
          <ErrorIcon color="error" fontSize="medium" />
          <Typography variant="body1" mt={2}>
            {message}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ErrorRow;
