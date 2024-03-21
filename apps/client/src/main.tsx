import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import {ConfigProvider} from 'antd';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const theme = {
  token: {
    // Seed Token
    colorPrimary: '#03565B',
    
  }
};


root.render(
    <BrowserRouter>
    <ConfigProvider
    theme={theme}
  >
      <App/>
      </ConfigProvider>
    </BrowserRouter>
);
