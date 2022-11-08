import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { loadComponentData } from './component-parse';
// import reportWebVitals from './reportWebVitals';
import App from './app';
import { BrowserRouter } from 'react-router-dom';

loadComponentData().then(data => {
    let rootElement = document.getElementById('root');
    if (!rootElement) throw new Error(`Element 'root' is not exists.`)
    const root = ReactDOM.createRoot(rootElement);
    root.render(<BrowserRouter>
        <App componentData={data} />
    </BrowserRouter>);
})

