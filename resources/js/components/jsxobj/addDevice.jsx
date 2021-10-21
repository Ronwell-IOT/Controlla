import React, { Component } from 'react'
import { CircularGauge, Scale, Label, RangeContainer, Range, Size, Geometry } from 'devextreme-react/circular-gauge';
import {Tab, Tabs} from 'react-mdl';
class Control extends Component {

      constructor(props){
        super(props)
        this.state = {
            activeTab: 0,
            newDev:{
                id: "",
                deviceName: "",
                status: 1,
                description:"",
                src: "/pictures/off.png "
            },
            newSen:{

                id: "",
                deviceName: "",
                description:""

            },
            added:""
          } // end of state
          this.handleDevChange = this.handleDevChange.bind(this)
          this.handleSenChange = this.handleSenChange.bind(this)
          this.toggleTab = this.toggleTab.bind(this);
          this.handleSaveDeviceButton = this.handleSaveDeviceButton.bind(this)
          this.handleSaveSensorButton = this.handleSaveSensorButton.bind(this)
        }
        handleDevChange(event){
            const {name, value} = event.target
            var newDev = this.state.newDev;
            newDev[name] = value;
            this.setState({newDev: newDev})
            console.log(this.state.newDev[name])
        }
        handleSenChange(event){
            const {name, value} = event.target
            var newSen = this.state.newSen;
            newSen[name] = value;
            this.setState({newSen: newSen})
            console.log(this.state.newSen[name])
        }
        handleSaveDeviceButton(){
            var username = window.atob(localStorage.getItem('username'))
            axios.post('/api/AddNewDevice', {
                id: this.state.newDev.id,
                deviceName: this.state.newDev.deviceName,
                status: this.state.newDev.status,
                description: this.state.newDev.description,
                src: this.state.newDev.src,
                userId: username
            }).then(response => {
                var data= response.data;
                if(data.message == "Data received"){
                    var newDevClear = this.state.newDev
                    var devicename = newDevClear.deviceName
                    this.setState({added:devicename})
                    $('#success').toast('show')
                    newDevClear.description = "";
                    newDevClear.deviceName = "";
                    newDevClear.id="";
                    this.setState({newDev:newDevClear})
                }

            }).catch((error) => {
                $('#error').toast('show')
            })




        }
        componentDidMount(){
            this._isMounted = true;
            if (localStorage.getItem("username") === null) {
                window.location.replace('/')
            }
        }
        handleSaveSensorButton(){
            var username = window.atob(localStorage.getItem('username'))
            console.log(this.state.newSen)
            axios.post('/api/AddNewSensor', {
                id: this.state.newSen.id,
                deviceName: this.state.newSen.deviceName,
                value: 0,
                description: this.state.newSen.description,
                userId: username
            })


            var newSensorClear = this.state.newSen
            var devicename = newSensorClear.deviceName
            this.setState({added:devicename})
            $('.toast').toast('show')
            newSensorClear.description = "";
            newSensorClear.deviceName = "";
            newSensorClear.id="";
            this.setState({newSen:newSensorClear})

        }
        toggleTab(){

            if(this.state.activeTab === 0){
                return(
                    //  {/* for control tab  */}
                    <div className="container shad pt-4 pb-4 pl-4 pr-4 mt-4 bg-white josefin-font">
                     <div className="row mt-2">
                         <div className="col-md-12">
                         <form>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label" htmlFor="deviceName">Device Name</label>
                                <div className="col-sm-10">
                                    <input type="deviceName" className="form-control" id="deviceName" onChange={this.handleDevChange} name="deviceName" value={this.state.newDev.deviceName} required />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="deviceId" className="col-sm-2 col-form-label">Device Id</label>
                                <div className="col-sm-10">
                                    <input type="deviceId" className="form-control" id="deviceId" onChange={this.handleDevChange} name="id" value={this.state.newDev.id} required/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="deviceId" className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-10">
                                <textarea className="form-control " id="deviceId" placeholder="Add description ex. Located at Office A" onChange={this.handleDevChange} name="description" value={this.state.newDev.description} required></textarea>

                                </div>
                            </div>
                        </form>
                        <button onClick={this.handleSaveDeviceButton}   className="btn btn-primary">Save</button>
                        </div>
                     </div>
                    </div>

                )
            }
            else if(this.state.activeTab === 1){
                return(
                    // {/* for sensor tab  */}

                    <div className="container shad pt-4 pb-4 pl-4 pr-4 mt-4 bg-white josefin-font">
                     <div className="row mt-2">
                         <div className="col-md-12">
                         <form>
                            <div className="form-group row">
                                <label  className="col-sm-2 col-form-label" htmlFor="deviceName" >Sensor Name</label>
                                <div className="col-sm-10">
                                    <input type="deviceName" className="form-control" id="deviceName" onChange={this.handleSenChange} value={this.state.newSen.deviceName} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="deviceId" className="col-sm-2 col-form-label">Sensor Id</label>
                                <div className="col-sm-10">
                                    <input type="deviceId" className="form-control" id="deviceId"   onChange={this.handleSenChange} value={this.state.newSen.id} required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="deviceId" className="col-sm-2 col-form-label" >Description</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control " id="deviceId" placeholder="Add description ex. Located at Office A" onChange={this.handleSenChange} value={this.state.newSen.description} required></textarea>

                                </div>
                            </div>




                        </form>
                        <button onClick={this.handleSaveSensorButton} className="btn btn-primary">Save</button>
                        </div>
                     </div>
                    </div>

                )
            }
        }
        componentWillUnmount() {
            this._isMounted = false;
        }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid mt-4 ">
                    <div style={{display:'flex'}}>
                        <div className="container-fluid">
                            <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                                <Tab><span style={{color:"white"}}>Add Device</span> </Tab>
                                <Tab><span style={{color:"white"}}>Add Sensors</span> </Tab>
                            </Tabs>
                            {this.toggleTab()}
                        </div>
                        {/* toast  */}
                    </div>
                    <div aria-live="polite" aria-atomic="true"  style={{position:'absolute',top:0, right:0, minHeight:"200px", minWidth:"400px"}}>
                        <div className="toast" id="success"  data-delay="2000" data-autohide="true">
                            <div className="toast-header">
                                <img src="/pictures/icon2.png" style={{width:'20px'}} className="rounded mr-2" alt="..."/>
                                <strong className="mr-auto">Success</strong>
                            </div>
                            <div className="toast-body">
                                {this.state.added} is succesfully added.
                            </div>
                        </div>
                    </div>
                    <div aria-live="polite" aria-atomic="true"  style={{position:'absolute',top:0, right:0, minHeight:"200px", minWidth:"400px"}}>
                        <div className="toast" id="error" data-delay="2000" data-autohide="true">
                            <div className="toast-header">
                                <img src="/pictures/cross.png" style={{width:'20px'}} className="rounded mr-2" alt="..."/>
                                <strong className="mr-auto">Error</strong>
                            </div>
                            <div className="toast-body">
                                {this.state.added} is not added.
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default Control;
