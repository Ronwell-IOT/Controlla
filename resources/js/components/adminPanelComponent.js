import React, { useEffect, useState }  from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './jsxobj/sidebar';
import Control from './jsxobj/control';
import Dashboard from './jsxobj/dashboard';
import AddDevice from './jsxobj/addDevice';
import User from './jsxobj/user';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MyAreas from './jsxobj/myareas';
import ManageAreas from './jsxobj/manageareas';
import Rules from './jsxobj/rules';
import Navbar from './jsxobj/navbar';
import Voice from './jsxobj/voice';



function AdminPanelComponent() {
    const [isAuthorized, setAuthorized] = useState(false);
    console.log(process.env.MIX_DATA_ROUTES)
    axios.get("http://"+process.env.MIX_DATA_ROUTES+"/validationRoute",{
            headers: {
                authorization: "Bearer "+window.atob(localStorage.getItem('token'))
            },
            })
            .then(response => {
                //console.log(response)

                setAuthorized(true)
            }).catch((error) => {
                //window.location.replace('/');
            });
        if(isAuthorized){
            return (
                <React.Fragment>

                    <div className="container-fluid h-100">

                        <BrowserRouter>
                            <div className="row">
                                <div className="no-gutter" >
                                    <Sidebar/>
                                </div>
                                <div className="home-section">
                                    <Navbar/>
                                    <div className="col-md-12 ml-0 pl-0 pr-0 mr-0" style={{height:"100%"}}>
                                        <Switch>
                                            <Route exact path="/dashboard" component = {Dashboard}/>
                                            <Route  path="/control" component = {Control}/>
                                            <Route  path="/addDevice" component = {AddDevice}/>
                                            <Route  path="/myareas" component = {MyAreas}/>
                                            <Route  path="/manageareas" component = {ManageAreas}/>
                                            <Route  path="/rules" component = {Rules}/>
                                            <Route  path="/User" component = {User}/>
                                            <Route  path="/voices" component = {Voice}/>
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        </BrowserRouter>
                    </div>
                </React.Fragment>
            );
        }
    return("")
}

export default AdminPanelComponent;

if (document.getElementById('root')) {
    ReactDOM.render(<AdminPanelComponent/>, document.getElementById('root'));
}
