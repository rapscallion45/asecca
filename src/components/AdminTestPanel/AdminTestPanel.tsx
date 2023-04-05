import { FC, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { setPermissionLevel } from '@/redux/slices/userPermissionSlice';
import { AppDispatch, AppState } from '@/redux/store';
import { UserPermissionLevel } from '@/redux/types';

const permissions = [
  {
    value: 'Global',
    label: 'Global',
  },
  {
    value: 'Customer',
    label: 'Customer',
  },
  {
    value: 'Project',
    label: 'Project',
  },
  {
    value: 'Collection',
    label: 'Collection',
  },
];

/* Admin Test Panel */
/* ================ */
const AdminTestPanel: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  /* get user permission level held in redux state */
  const { permission: userPermission } = useSelector(
    (state: AppState) => state.userPermission
  );

  /* change user permission level state when dropdown changed */
  const handlePermissionChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      setPermissionLevel({ level: event.target.value as UserPermissionLevel })
    );
  };

  return (
    <Card sx={{ minWidth: 275, minHeight: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Admin Test Panel
        </Typography>
        <Box mt={4}>
          <TextField
            id="user-permission-level-select"
            select
            label="User Permission"
            value={userPermission.level}
            onChange={handlePermissionChange}
            SelectProps={{
              native: true,
            }}
            sx={{ minWidth: 170 }}
          >
            {permissions.map((permission) => (
              <option key={permission.value} value={permission.value}>
                {permission.label}
              </option>
            ))}
          </TextField>
        </Box>
        <Typography sx={{ my: 1.5 }} color="text.secondary">
          Selection of simulated user permission level
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AdminTestPanel;
