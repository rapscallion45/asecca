import { FC, ReactNode } from 'react';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';
import { styled } from '@mui/material';

/* alert snackbar stylings */
const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }) => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: theme.palette.secondary.main,
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: theme.palette.error.main,
    },
  })
);

interface IAlertProviderProps {
  children?: ReactNode;
}

/* Alert Provider */
/* ============== */
const AlertProvider: FC<IAlertProviderProps> = (props) => {
  const { children = null } = props;

  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default AlertProvider;
