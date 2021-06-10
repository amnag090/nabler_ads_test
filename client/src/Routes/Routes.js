import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import App from '../App';
import Create_Channel from '../Pages/Create_channel';
import Dashboard from '../Pages/Dashboard';
import updateChannel from '../Pages/Update_Channel';
import SingleChannel from '../Pages/View_Channel';

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/create" exact component={Create_Channel} />
                <Route path="/channels/:slug" exact component={SingleChannel} />
                <Route path="/channels/update/:slug" exact component={updateChannel} />
                <Route path="/dashboard" exact component={Dashboard}/>
            </Switch>
        </BrowserRouter>
        
    )
}

export default Routes;