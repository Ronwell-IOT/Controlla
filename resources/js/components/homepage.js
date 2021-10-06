import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './jsxobj/login';
import LoginNav from './jsxobj/loginnav';
import LoginFooter from './jsxobj/loginfooter';
import ContactUs from './jsxobj/contactus';
function Homepage() {
    return (
        <div className="container-fluid no-gutter">
            <LoginNav></LoginNav>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component = {Login}/>
                        <Route exact path="/contact" component = {ContactUs}/>
                    </Switch>
                </BrowserRouter>
            <LoginFooter></LoginFooter>
        </div>
    );
}

export default Homepage;

if (document.getElementById('root2')) {
    ReactDOM.render(<Homepage/>, document.getElementById('root2'));
}
