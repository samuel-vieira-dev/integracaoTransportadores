import React from 'react'
import { Router, Switch, Route } from 'react-router'
import UploadFile from '../pages/file';
import Login from '../pages/login';
import Registrar from '../pages/registrar';
import {history} from '../history';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import Concluido from '../pages/concluido';


const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route component={Login} exact path="/login"/>
            <PrivateRoute component={UploadFile} exact path="/"/>
            <PrivateRoute component={Concluido} exact path="/concluido"/>
            <Route component={Registrar} exact path="/registrar"/>
            <Route component={NotFound} />
        </Switch>
    </Router>
)

export default Routes;