import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Hello() {
  const { isPending, error, data } = useQuery({
    queryKey: ['greeting'],
    queryFn: () => fetch('/api/hello/meera').then((res) => res.json()),
  });
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error.message}`}</p>;
  return <p>{data.message}</p>;
}
