//importing react
import React from 'react';
//react-router-dom
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';

//AppRouter component
const AppRouter = () => (
    <BrowserRouter>
        <div>
        {/*<Header />*/}
        <Switch>
            <Route path="/" component={Dashboard} exact={true}/>
        </Switch>
        <Footer />
        </div>
    </BrowserRouter>
);

export default AppRouter;