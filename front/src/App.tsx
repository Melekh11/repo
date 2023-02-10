import React from 'react';
import { Box } from '@mui/material';
import { store } from './redux/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';

export const App = () => {
  return (
    <Box>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Box>
  );
};
