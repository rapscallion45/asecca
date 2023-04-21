import { FC } from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { IDataTableColumn } from '@/components/DataTable/types';

/**
 * Data Table Header Row Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IHeaderRowProps
 * @prop {Array<IDataTableColumn>} columns - data table columns
 */
interface IHeaderRowProps {
  columns: Array<IDataTableColumn>;
}

/**
 * Data Table Header Row
 *
 * Table row component for handling row header styling and functionality
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {IHeaderRowProps} props - component props
 * @returns {FC} - data table header row functional component
 */
const HeaderRow: FC<IHeaderRowProps> = (props) => {
  const { columns } = props;

  /**
   * Styled Data Table Header Cell
   *
   * Application specific styling of data table header cell
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @component
   * @returns {Component} - styled data table header cell component
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

  return (
    <TableRow>
      {/* map passed columns to table headers row */}
      {columns.map((column: IDataTableColumn) => (
        <StyledTableHeadCell key={column.key} align="left">
          {column.label}
        </StyledTableHeadCell>
      ))}
    </TableRow>
  );
};

export default HeaderRow;
