import { FC } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

/**
 * Loading Panel Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 *
 * @typedef ILoadingPanelProps
 * @prop {boolean} show - loading panel is showing flag
 */
interface ILoadingPanelProps {
  show: boolean;
}

/**
 * Loading Panel
 *
 * Presents a loading panel to indicate to user sibling component is not
 * interactive in its current state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 *
 * @component
 * @param {ILoadingPanelProps} props - component props
 * @returns {FC} - loading panel functional component
 */
const LoadingPanel: FC<ILoadingPanelProps> = (props) => {
  const { show } = props;

  return (
    <Backdrop open={show} sx={{ position: 'absolute', zIndex: '999' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingPanel;
