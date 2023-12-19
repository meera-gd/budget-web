import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

export default function Hello() {
  const { user } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ['greeting'],
    queryFn: () => user.getIdToken().then((token) => fetch('/api/hello/meera', { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json())),
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error.message}`}</p>;
  return <p>{data.message}</p>;
}
