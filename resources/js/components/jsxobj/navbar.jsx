import React, { Component } from 'react'
import {Link} from 'react-router-dom';

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            hideDropdown1:0,
            hideDropdown2:0,
            username:"",
            profilepic:"",
            sb1: "#0f8d83",
            sb2: "#818181",
            sb3: "#818181",
            sb4: "#818181",
            sb5: "#818181",
            sb6: "#818181",
            sb7: "#818181",
            sb8: "#818181",
            sb9: "#818181",
        }
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleDropdownClick2 = this.handleDropdownClick2.bind(this);
        this.changeSb1 = this.changeSb1.bind(this)
        this.changeSb2 = this.changeSb2.bind(this)
        this.changeSb3 = this.changeSb3.bind(this)
        this.changeSb5 = this.changeSb5.bind(this)
        this.changeSb6 = this.changeSb6.bind(this)
        this.changeSb7 = this.changeSb7.bind(this)
        this.changeSb8 = this.changeSb8.bind(this)
        this.changeSb9 = this.changeSb9.bind(this)
    }
    componentDidMount(){
        this._isMounted = true;
        var username = window.atob(localStorage.getItem('username'))
         this.setState({username: username})
        var currUrl = window.location.pathname;
        if(currUrl == "/control") this.changeSb2();
        else if(currUrl == "/addDevice") this.changeSb3();
        else if(currUrl == "/myareas") this.changeSb5();
        else if(currUrl == "/manageareas") this.changeSb6();
        else if(currUrl == "/rules") this.changeSb7();
        else if(currUrl == "/user") this.changeSb8();
        else if(currUrl == "/voices") this.changeSb9();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    handleLogout(){
        alert("logout")
        localStorage.removeItem("username")
        localStorage.removeItem("token")
    }
    handleDropdownClick(){
         if(this.state.hideDropdown1 == 0){
             document.querySelector('.dropdown-container1').style.display = 'block';
             this.setState({hideDropdown1:1})


         }
         else if(this.state.hideDropdown1 == 1){
             document.querySelector('.dropdown-container1').style.display = 'none';
             this.setState({hideDropdown1:0})

         }
     }

     handleDropdownClick2(){
        if(this.state.hideDropdown2 == 0){
            document.querySelector('.dropdown-container2').style.display = 'block';
            this.setState({hideDropdown2:1})


        }
        else if(this.state.hideDropdown2 == 1){
            document.querySelector('.dropdown-container2').style.display = 'none';
            this.setState({hideDropdown2:0})

        }
    }
    changeSb1(){var active = "#0f8d83";var inactive = "#818181";this.setState({sb1:active});this.setState({sb2:inactive});this.setState({sb3:inactive});this.setState({sb4:inactive});this.setState({sb5:inactive});this.setState({sb6:inactive});this.setState({sb7:inactive});this.setState({sb8:inactive});this.setState({sb9:inactive});}
    changeSb2(){var active = "#0f8d83";var inactive = "#818181";this.setState({sb1:inactive});this.setState({sb2:active});this.setState({sb3:inactive});this.setState({sb4:inactive});this.setState({sb5:inactive});this.setState({sb6:inactive});this.setState({sb7:inactive});this.setState({sb8:inactive});this.setState({sb9:inactive});}
    changeSb3(){var active = "#0f8d83";var inactive = "#818181";this.setState({sb1:inactive});this.setState({sb2:inactive});this.setState({sb3:active});this.setState({sb4:inactive});this.setState({sb5:inactive});this.setState({sb6:inactive});this.setState({sb7:inactive});this.setState({sb8:inactive});this.setState({sb9:inactive});}
    changeSb5(){var active = "#0f8d83";var inactive = "#818181";this.setState({sb1:inactive});this.setState({sb2:inactive});this.setState({sb3:inactive});this.setState({sb4:active});this.setState({sb5:active});this.setState({sb6:inactive});this.setState({sb7:inactive});this.setState({sb8:inactive});this.setState({sb9:inactive});}
    changeSb6(){var active = "#0f8d83";var inactive = "#818181";this.setState({sb1:inactive});this.setState({sb2:inactive});this.setState({sb3:inactive});this.setState({sb4:active});this.setState({sb5:inactive});this.setState({sb6:active});this.setState({sb7:inactive});this.setState({sb8:inactive});this.setState({sb9:inactive});}
    changeSb7(){var active = "#0f8d83";var inactive = "#818181";this.setState({sb1:inactive});this.setState({sb2:inactive});this.setState({sb3:inactive});this.setState({sb4:inactive});this.setState({sb5:inactive});this.setState({sb6:inactive});this.setState({sb7:active});this.setState({sb8:inactive});this.setState({sb9:inactive});}
    changeSb8(){var active = "#0f8d83";var inactive = "#818181";this.setState({sb1:inactive});this.setState({sb2:inactive});this.setState({sb3:inactive});this.setState({sb4:inactive});this.setState({sb5:inactive});this.setState({sb6:inactive});this.setState({sb7:inactive});this.setState({sb8:active});this.setState({sb9:inactive});}
    changeSb9(){var active = "#0f8d83";var inactive = "#818181";this.setState({sb1:inactive});this.setState({sb2:inactive});this.setState({sb3:inactive});this.setState({sb4:inactive});this.setState({sb5:inactive});this.setState({sb6:inactive});this.setState({sb7:inactive});this.setState({sb8:inactive});this.setState({sb9:active});}
    render() {

        return ( <React.Fragment>
            <div className="navbar1">
                <div className="row nav-head" >
                    <div className="pl-2 pt-2">
                        <img src='pictures/icon2.png' alt="logo" width={"35px"} />
                        <p className="josefin-font pl-0 pt-2" style={{color:"#0f8d83",float:"right",fontSize:"20px"}}>ontrolla</p>
                    </div>
                    <div className="w-50 float-right pr-3" style={{marginLeft:"20%"}}>
                        <p className="josefin-font pt-3 " style={{color:"#0f8d83", fontSize:"17px", float:"right", fontWeight:"bolder"}}>Hi, {this.state.username}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="navbar-items1 d-flex my-auto ">

                        <div className="navbar-links1 mx-auto text-center d-flex">
                            <Link to="/dashboard"  onClick={this.changeSb1}>
                                <i className="fas fa-chart-line pl-3 pr-3" style={{color:this.state.sb1,fontSize:"30px"}}></i>
                            </Link>
                            <Link to="/control"  onClick={this.changeSb2}>
                                <i className="fas fa-toggle-off pl-3 pr-3" style={{ color:this.state.sb2,fontSize:"30px"}} ></i>
                            </Link>
                            <Link to="/addDevice" onClick={this.changeSb3}>
                                <i className="fas fa-plus-circle pl-3 pr-3" style={{ color:this.state.sb3,fontSize:"30px"}} />
                            </Link>
                            <div className="pl-0 pr-0 ml-0 mr-0">
                                <button className="dropdown-btn1 pl-3 pr-3 " onClick={this.handleDropdownClick}>
                                    <i className="fas fa-map-marked-alt" style={{fontSize:"30px",color:this.state.sb4}}></i>
                                    <i className="fa fa-caret-down pl-1"></i>
                                </button>
                                <div className="dropdown-container1">
                                    <Link to="/myareas" onClick={this.changeSb5}>
                                        <span className="dropdown-link1 pl-2 pr-2 pt-2 pb-2 josefin-font"  style={{color:this.state.sb5}}> My Areas </span>
                                    </Link>
                                    <Link to="/manageareas" onClick={this.changeSb6}>
                                        <span className="dropdown-link1 pl-2 pr-2 pt-2 pb-2 josefin-font" style={{color:this.state.sb6}}> Manage Areas </span>
                                    </Link>
                                </div>
                            </div>
                            <Link to="/rules" onClick={this.changeSb7}>
                                <i className="fas fa-list-alt pl-3 pr-3" style={{ color:this.state.sb7,fontSize:"30px"}} ></i>
                            </Link>
                            {/* <Link to="/user" onClick={this.changeSb8}>
                                <i className="fas fa-user-cog pl-2 pr-2" style={{ color:this.state.sb8,fontSize:"30px"}} ></i>
                            </Link> */}
                            <Link to="/voices" onClick={this.changeSb9}>
                                <i className="fas fa-microphone pl-3 pr-3" style={{ color:this.state.sb9,fontSize:"30px"}} ></i>
                            </Link>
                            <div className="pl-0 pr-0 ml-0 mr-0">
                                <button className="dropdown-btn1 pl-3 pr-3 " onClick={this.handleDropdownClick2}>
                                    <i className="fas fas fa-user-cog" style={{fontSize:"30px",color:this.state.sb8}}></i>
                                    <i className="fa fa-caret-down pl-1"></i>
                                </button>
                                <div className="dropdown-container2">
                                    <Link to="/user" onClick={this.changeSb8}>
                                        <span className="dropdown-link1 pl-2 pr-2 pt-2 pb-2 josefin-font"  style={{color:this.state.sb5}}> Password Change </span>
                                    </Link>
                                    <a onClick={this.handleLogout} href="/" style={{height:"30px"}}>
                                        <span className="josefin-font pl-2" style={{color:"#818181", fontSize:"17px"}}>Logout</span>
                                    </a>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment> );
    }
}

export default Navbar;
