import { FC } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { IDataTableColumn } from '@/components/DataTable/types';

/**
 * Data Table Loading Row Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ILoadingRowProps
 * @prop {Array<IDataTableColumn>} columns - data table columns
 */
interface ILoadingRowProps {
  columns: Array<IDataTableColumn>;
  message: string;
}

/**
 * Data Table Loading Row
 *
 * Table row component for handling row loading styling and functionality
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {ILoadingRowProps} props - component children
 * @returns {FC} - data table loading row functional component
 */
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
