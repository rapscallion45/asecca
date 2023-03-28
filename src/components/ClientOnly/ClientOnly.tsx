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
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <div>{children}</div>;
};

export default ClientOnly;
