import { FC, useState, useEffect, ReactNode } from 'react';

interface IClientOnlyProps {
  children: ReactNode;
}

/**
 * Client Only - renders component on client only, no SSR
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param props - component children
 * @returns {FC} - client only HOC
 */
const ClientOnly: FC<IClientOnlyProps> = (props) => {
  const { children } = props;
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  /** useEffect is only run in the client/browser environment */
  useEffect(() => {
    /** useEffect has run, therefore this is browser/client environment */
    setHasMounted(true);
  }, []);

  return hasMounted ? (
    <div aria-labelledby="client-only-element">{children}</div>
  ) : null;
};

export default ClientOnly;
