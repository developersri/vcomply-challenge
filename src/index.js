import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import './index.css';
import App from './App';
import NavbarReducer from './store/reducers/navbar';
import SidebarReducer from './store/reducers/sidebar';

const rootReducer = combineReducers({
    navbar: NavbarReducer,
    sidebar: SidebarReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);