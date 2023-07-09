import React from 'react';
import {createRoot} from "react-dom/client";
import {BrowserRouter} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

import './index.css';
import App from './App';
import 'mapbox-gl/dist/mapbox-gl.css';
import Provider from './Context_API/provider';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider>
      <ChakraProvider>
        <App/>
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
  
);
