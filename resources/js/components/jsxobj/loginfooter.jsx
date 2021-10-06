import React, { Component } from 'react'

class LoginFooter extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="login-footer">
                    <div className="text-center pt-4 pb-4">
                        <a href=""><i className="fab fa-facebook ml-2 mr-2" style={{fontSize:"35px", color:"#0f8d83"}}></i></a>
                        <a href=""><i className="fab fa-linkedin ml-2 mr-2" style={{fontSize:"35px", color:"#0f8d83"}}></i></a>
                        <a href=""><i className="fab fa-instagram ml-2 mr-2" style={{fontSize:"35px", color:"#0f8d83"}}></i></a>
                    </div>
                    <div className="text-center pb-4">
                        <a href="" className="josefin-font footer-link">Contact Us 	&middot; </a>
                        <a href="" className="josefin-font footer-link">Terms of Use &middot; </a>
                        <a href="" className="josefin-font footer-link">Privacy Policy</a>
                    </div>
                    <div className="text-center footer-copyright pb-4">
                        <p className="josefin-font">&#9400; Controlla 2021</p>
                    </div>

                </div>
            </React.Fragment>
          );
    }
}

export default LoginFooter;
