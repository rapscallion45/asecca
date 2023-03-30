import { FC, useState, useEffect, ReactNode } from 'react';

interface IClientOnlyProps {
  children: ReactNode;
}

/* Client Only */
/* =========== */
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
