import {AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// HMR 모드 전 소스
// ReactDOM.render(<App />, document.getElementById('root'));


// HMR 모드 후 소스
const render = Component => 
ReactDOM.render(
    <AppContainer>
        <Component/>
    </AppContainer>,
    document.getElementById('root')
);

render (App);

if (module.hot) module.hot.accept('./components/App', () => render (App));
