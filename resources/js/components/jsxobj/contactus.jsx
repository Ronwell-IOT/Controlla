import React, { Component } from 'react'

class ContactUs extends Component {
    constructor(props){
        super(props)
        this.state={
            reason:"",
            name:"",
            email:"",
            mobile:"",
            message:""
        }
        this.handleReasonChanged = this.handleReasonChanged.bind(this)
        this.handleFullnameChanged = this.handleFullnameChanged.bind(this)
        this.handleEmailChanged = this.handleEmailChanged.bind(this)
        this.handleMobileChanged = this.handleMobileChanged.bind(this)
        this.handleMessageChanged = this.handleMessageChanged.bind(this)
        this.send = this.send.bind(this)
    }
    handleReasonChanged(e){this.setState({reason: e.target.value});}
    handleFullnameChanged(e){this.setState({name: e.target.value});}
    handleEmailChanged(e){this.setState({email: e.target.value});}
    handleMobileChanged(e){this.setState({mobile: e.target.value});}
    handleMessageChanged(e){this.setState({message: e.target.value});}
    send(){

        // using smtp js
        var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

        Email.send({
            SecureToken : "18709091-9678-4dad-a5c8-d970034cece2",
            To : 'rpbutial@multisyscorp.com',
            From : this.state.email,
            Subject : this.state.reason,
            Body : "name : "+this.state.name+"\r mobile : "+this.state.mobile+"\r mesage : "+this.state.message,
        }).then(
          message => alert(message)
        );
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid josefin-font">
                    <div className="row contact-page">
                        <div className="col-md-7 m-0 pl-4 pr-4">
                            <div className="contact-form">
                                <h3 className="josefin-font" style={{color:"#0f8d83"}}>Contact Us</h3>
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="reason">Reason for contacting us</label>
                                                <select className="form-control" id="purpose" onChange={this.handleReasonChanged} value={this.state.reason}>
                                                    <option></option>
                                                    <option>Inquiry</option>
                                                    <option>Partnership</option>
                                                    <option>General Inquiry</option>
                                                    <option>Others</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="Fullname">Full Name</label>
                                            <input type="Fullname" value={this.state.name} onChange={this.handleFullnameChanged} className="form-control" id="Fullname"/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" value={this.state.email} onChange={this.handleEmailChanged} className="form-control" id="email"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="mobile">Mobile No</label>
                                            <input type="mobile" value={this.state.mobile} onChange={this.handleMobileChanged} className="form-control" id="mobile"/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="messaage">Message</label>
                                            <textarea className="form-control" value={this.state.message} onChange={this.handleMessageChanged} id="messaage" rows="3"></textarea>
                                        </div>
                                    </div>
                                    {/* <div className="form-row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="agree"/>
                                            <label className="form-check-label" htmlFor="agree">
                                               I agree with the <a href="" className="privacy-statement">Privacy Statement</a>
                                            </label>
                                        </div>
                                    </div> */}

                                </form>
                                    <div className="form-group row">
                                        <div className="col-sm-10">
                                            <button onClick={this.send} className="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="col-md-5 contact-map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d574.2162123814725!2d121.00442032345093!3d14.493251001905973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cff1ddbd82fd%3A0x1440a00c242ab616!2sMultisys%20Technologies%20Corporation!5e0!3m2!1sen!2sph!4v1626336537696!5m2!1sen!2sph" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ContactUs;
