import React, { Component } from 'react'

class ContactUs extends Component {
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
                                                <select className="form-control" id="purpose">
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
                                            <input type="Fullname" className="form-control" id="Fullname"/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" id="email"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="mobile">Mobile No</label>
                                            <input type="mobile" className="form-control" id="mobile"/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="messaage">Message</label>
                                            <textarea className="form-control" id="messaage" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="agree"/>
                                            <label className="form-check-label" htmlFor="agree">
                                               I agree with the <a href="" className="privacy-statement">Privacy Statement</a>
                                            </label>
                                        </div>
                                    </div>
                                </form>
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
