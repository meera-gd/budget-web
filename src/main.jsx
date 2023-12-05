import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Hello from './routes/Hello';
import Home from './routes/Home';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/hello',
    element: <Hello />,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
