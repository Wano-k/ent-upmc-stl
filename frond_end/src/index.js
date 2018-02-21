import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';


import App from './components/App_component/App';
import Inscription from './components/Inscription_component/Inscription';

ReactDOM.render(<App/>,
    document.getElementById('root'));
registerServiceWorker();
