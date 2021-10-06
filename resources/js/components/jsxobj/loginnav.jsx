import React, { Component } from 'react'
import {Link} from 'react-router-dom';
class LoginNav extends Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark login-nav text-center" >
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/" style={{marginTop:"7px"}}><img src='pictures/icon2.png' alt="logo" width={"35px"} /><p className="josefin-font pl-0 pt-2" style={{color:"#0f8d83",float:"right",fontSize:"20px"}}>ontrolla</p></a>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-lg-0">
                            <li className="nav-item">
                                <a className="nav-link josefin-font" href="/" style={{fontSize:"18px"}}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link josefin-font text-large" href="/contact" style={{fontSize:"18px"}}>Contact Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link josefin-font text-large" href="" style={{fontSize:"18px"}}>Shop</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default LoginNav;
