import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css';

// This looks for the <div id="root"></div> in your index.html
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("CRITICAL ERROR: 'root' div not found in index.html");
}