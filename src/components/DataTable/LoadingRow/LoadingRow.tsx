import { FC } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { IDataTableColumn } from '@/components/DataTable/types';

interface ILoadingRowProps {
  columns: Array<IDataTableColumn>;
  message: string;
}

/* Data Table Loading Row helper */
/* ============================= */
const LoadingRow: FC<ILoadingRowProps> = (props) => {
  const { columns, message } = props;

  return (
    <TableRow>
      <TableCell colSpan={columns.length}>
        <Box display="flex" flexDirection="column" py={7} alignItems="center">
          <CircularProgress size={30} />
          <Typography variant="body1" mt={2}>
            {message}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default LoadingRow;
