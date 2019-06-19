import React from 'react';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import importedComponent from 'react-imported-component';

import Home from './Home';
import Loading from './Loading';

import MVCModel from './MVC/MVCModel';

const AsyncDynamicPage = importedComponent(
    () => import (/* webpackChunkName: 'DynamicPage' */ './DynamicPage'),
    {
        LoadingComponent: Loading
    }
);
// import DynamicPage from './DynamicPage';

const AsyncNoMatch = importedComponent(
    () => import(/* webpackChunkName: 'NoMatch' */ './NoMatch'),
    {
        LoadingComponent: Loading
    }
);
// import NoMatch from './NoMatch';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/dynamic" component={AsyncDynamicPage} />
                    <Route component={AsyncNoMatch} /> 
                                    
                </Switch>
            </div>
            <div>
                {MVCModel}
            </div>
        </Router>
    );
};

export default App;