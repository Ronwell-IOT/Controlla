import React, { Component } from 'react'

class User extends Component {
    constructor(props){

        super(props)
        this.state = {
            toggleTab :0,
            password:"",
            newPassword:"",
            confirmPassword:""
        }
        this.toggleSidebar = this.toggleSidebar.bind(this)
        this.displayToggledArea = this.displayToggledArea.bind(this)
        this.handleChangeButton = this.handleChangeButton.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
        this.newPasswordChange = this.newPasswordChange.bind(this)
        this.confirmPasswordChange = this.confirmPasswordChange.bind(this)
    }
    toggleSidebar(toggleId){
        this.setState({toggleTab:toggleId})
    }
    handleChangeButton(){
        if (localStorage.getItem("username") === null) {
            window.location.replace('/')
          }
        var username = window.atob(localStorage.getItem('username'))


        if(this.state.password == ""){
            alert("your password is empty")
            return
        }
        if(this.state.newPassword == ""){
            alert("Please enter your new password")
            return
        }
        if(this.state.confirmPassword == ""){
            alert("Please confirm your password")
            return
        }
        var r = confirm("Confirm Change password ? ");
        if (r == true) {
            if(this.state.newPassword == this.state.confirmPassword){
                // alert("Password Changed")

                axios.post('/api/UserChangePassword', {
                    username: username,
                    password: this.state.password,
                    newPassword: this.state.newPassword
                }).then((response) => {
                    if(response.data.error){

                        alert(response.data.error);
                        return;
                    }
                    else{
                        alert(response.data)
                    }
                },(error)=> {
                    console.log(error);
                });
                //window.location.replace('/dashboard')
            }
            else if(this.state.newPassword != this.state.confirmPassword){
                alert("password did not match")
            }
        } else {

        }
    }
    passwordChange(event){this.setState({password:event.target.value});}
    newPasswordChange(event){this.setState({newPassword:event.target.value});}
    confirmPasswordChange(event){this.setState({confirmPassword:event.target.value}); console.log}

    displayToggledArea(){
        if(this.state.toggleTab == 0 ){
            return(
                <div>
                   <form>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword" onChange={this.passwordChange} placeholder="Password" required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword1" className="col-sm-2 col-form-label">New Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword1" onChange={this.newPasswordChange} placeholder="Password" required/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword2" className="col-sm-2 col-form-label">Confirm New Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword2" onChange={this.confirmPasswordChange} placeholder="Password" required/>
                            </div>
                        </div>
                    </form>
                    <button className="custom-button" onClick={this.handleChangeButton}>Change</button>
                </div>
            )
        }
        // else if(this.state.toggleTab == 1 ){
        //     return(
        //         <div>
        //             Change username
        //         </div>
        //     )
        // }
    }
    componentDidMount(){
        this._isMounted = true;
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    render() {
        return (
            <React.Fragment>
                  <div className="container mt-4 josefin-font" style={{paddingTop:"8%"}}>
                      <div className="settings-wrapper">
                        <div className="row">
                            <div className="col-md-2 sidebar-setting">
                                <button className="btn0 sidebar-item text-center " onClick={() => this.toggleSidebar(0)} >Change Password</button>
                                {/* <button className="btn1 sidebar-item text-center " onClick={() => this.toggleSidebar(1)}>Change Username</button> */}
                            </div>
                            <div className="col-md-10" style={{paddingLeft:"5%", paddingTop:"5%", paddingRight:"5%"}}>
                                {this.displayToggledArea()}
                            </div>
                        </div>
                      </div>
                  </div>
            </React.Fragment>
         );
    }
}

export default User;
