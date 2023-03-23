import { FC, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

/* use decimal number system for parsing integers */
const RADIX_DECIMAL = 10;

/* Admin Test Panel */
/* ================ */
const AdminTestPanel: FC = () => {
  /* user permission level state simulation used by other app elements */
  const [userPermissionLevel, setUserPermissionLevel] = useState<number>(3);

  /* change user permission level state when dropdown changed */
  const handlePermissionChange = (event: SelectChangeEvent) => {
    setUserPermissionLevel(
      parseInt(event.target.value, RADIX_DECIMAL) as number
    );
  };

  return (
    <Card sx={{ minWidth: 275, minHeight: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Admin Test Panel
        </Typography>
        <FormControl sx={{ minWidth: 200, mt: 3 }}>
          <InputLabel id="user-permission-level-select-label">
            Permission Level
          </InputLabel>
          <Select
            labelId="user-permission-level-select-label"
            id="user-permission-level-select"
            value={userPermissionLevel.toString()}
            label="User Permission Level"
            onChange={handlePermissionChange}
          >
            <MenuItem value={0}>Global</MenuItem>
            <MenuItem value={1}>Customer</MenuItem>
            <MenuItem value={2}>Project</MenuItem>
            <MenuItem value={3}>Collection</MenuItem>
          </Select>
        </FormControl>
        <Typography sx={{ my: 1.5 }} color="text.secondary">
          Selection of simulated user permission level
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AdminTestPanel;
