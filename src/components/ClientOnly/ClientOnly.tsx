import { FC, useState, useEffect, ReactNode } from 'react';

/**
 * Client Only Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IClientOnlyProps
 * @prop {ReactNode} children - component children nodes
 */
interface IClientOnlyProps {
  children: ReactNode;
}

/**
 * Client Only
 *
 * Wrapper component for rendering children components on client only, no server
 * side rendering
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {IClientOnlyProps} props - component props
 * @returns {FC} - client only functional component
 */
const ClientOnly: FC<IClientOnlyProps> = (props) => {
  const { children } = props;
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  /* useEffect is only run in the client/browser environment */
  useEffect(() => {
    /* useEffect has run, therefore this is browser/client environment */
    setHasMounted(true);
  }, []);

  return hasMounted ? (
    <div aria-labelledby="client-only-element">{children}</div>
  ) : null;
};

export default ClientOnly;
