import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';

const domNode = document.createElement('div');
domNode.id = 'root';
document.body.appendChild(domNode);

const root = createRoot(domNode);

root.render(
  <div>here is my cool app</div>
);
