import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContatosProvider from './contexts/contatos';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <ContatosProvider>
      <App />
    </ContatosProvider>
  );