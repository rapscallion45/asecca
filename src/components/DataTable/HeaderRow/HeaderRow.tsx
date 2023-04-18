import { FC } from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { IDataTableColumn } from '@/components/DataTable/types';

/**
 * table header cell stylings
 *
 * @since - 0.0.0
 */
const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  /** table header colors */
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    fontSize: 16,
    fontWeight: 400,
  },
}));

interface IHeaderRowProps {
  columns: Array<IDataTableColumn>;
}

/**
 * Data Table Header Row helper
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param props - header columns
 * @returns {FC} - data table header row functional component
 * @type {( props : IHeaderRowProps)}
 */
const HeaderRow: FC<IHeaderRowProps> = (props) => {
  const { columns } = props;

  return (
    <TableRow>
      {/** map passed columns to table headers row */}
      {columns.map((column: IDataTableColumn) => (
        <StyledTableHeadCell key={column.key} align="left">
          {column.label}
        </StyledTableHeadCell>
      ))}
    </TableRow>
  );
};

export default HeaderRow;
