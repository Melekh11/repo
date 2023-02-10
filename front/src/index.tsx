import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.scss';

const domNode = document.createElement('div');
domNode.id = 'root';
document.body.appendChild(domNode);

const root = createRoot(domNode);

root.render(
  <App/>
);
