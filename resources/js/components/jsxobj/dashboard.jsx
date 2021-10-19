import React, { Component } from 'react'
import PieChart, {
    Series,
    Label,
    Size,
    Legend
  } from 'devextreme-react/pie-chart';

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            VACommandVal:'', // latest voice command
            VAid:'', //
            sensors : 0,
            device : 0, // total number of device
            rules : 0,
            areas: 0,
            notifications: [

            ],
            areas2 : [
            ],
            areas3 : [
            ],
            unallocatedsen:0,
            uanllocateddev:0

         }
         this.clearNotification = this.clearNotification.bind(this)
        }
    clearNotification(){
        // Clear all the items from the activity
        var r = confirm("confirm clear notification ? ");
        if (r == true) {
            axios.post("/api/ClearLogs", {})
        } else {

        }
    }

    async componentDidMount(){
        let data_route = process.env.MIX_DATA_ROUTES;

        // console.log(data_route)
        this._isMounted = true;
        if (localStorage.getItem("username") === null) {
            window.location.replace('/')
        }
        //Get the username that is saved to local storage after login
        var username = window.atob(localStorage.getItem('username'))
        // Get token
        var token = "Bearer "+window.atob(localStorage.getItem('token'))

        // number of device
        await axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetControlDeviceNum",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                this.setState({device: (data[0]["totalDevice"])});

            }).catch((error) => {
                window.location.replace('/')
            })

        // number of sensors
        await axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetSensorsNum",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                this.setState({sensors: (data[0]["totalSensors"])});

            }).catch((error) => {
                window.location.replace('/')
            })
        // number of rules
        await axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetRulesNum",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                this.setState({rules: (data[0]["totalRules"])});

            }).catch((error) => {
                window.location.replace('/')
            })
        // number of areas
        await axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetAreasNum",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                this.setState({areas: (data[0]["totalAreas"])});

            }).catch((error) => {
                window.location.replace('/')
            })
        //Get the number of sensor allocated to the areas
        await axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetSensorPerArea",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                this.setState({areas2: (data)});

            }).catch((error) => {
                window.location.replace('/')
            })
        // Get the number of sensor allocated to each areas
        await axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetDevicePerArea",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                this.setState({areas3: (data)});

            }).catch((error) => {
                window.location.replace('/')
            })
        // Get all device that is not allocated to areas
        await axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetUnallocatedSen",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                this.setState({unallocatedsen: (data[0]['unallocatedsen'])});

            }).catch((error) => {
                window.location.replace('/')
            })
        // Get all device thet is not allocated to areas
        await axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetUnallocatedDev",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                this.setState({unallocateddev: (data[0]['unallocateddev'])});

            }).catch((error) => {
                window.location.replace('/')
            })

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        this.myInterval = setInterval(async()=>{
            // continues process of getting the logs from the server
            await axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetLogs",{
                cancelToken: source.token,
                headers: {
                    authorization: token
                },
                params:{
                userId: username,
                }})
                .then(response => {
                    var data= response.data;
                    this.setState({notifications: data})
                }).catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled', error.message);
                    }
                    else{
                        window.location.replace('/')
                    }
                })
            // Get the latest voice commands
            await axios.get("http://"+process.env.MIX_DATA_ROUTES+"/getVaCommandValue2",{
                headers: {
                    authorization: token
                },
                params:{
                    userId: username,
                }})
                .then(response => {
                    var data= response.data;

                    this.setState({VACommandVal: data[0].value});
                    this.setState({VAid: data[0].deviceId});
                    // console.log(this.state.device)

                })
                .catch(function(error){
                    console.log(error);
                })
        } , 1000)
    }
    componentWillUnmount() {
        clearInterval(this.myInterval)
        this._isMounted = false;
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid mt-4 pt-4">
                    <div className="row">
                        <div className="col-md-3 mb-1">
                            <div className=" w-100"style={{borderRadius:"15px", backgroundColor:"#ADD8E6",padding:"10px"}}>
                                <h5 className="josefin-font"><i className="fas fa-tachometer-alt pl-4" style={{fontSize:"120%"}}></i> Sensors</h5>
                                <h5 className="josefin-font text-right pr-4"> {this.state.sensors}</h5>
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <div className=" w-100"style={{borderRadius:"15px",backgroundColor:"#FFFF99",padding:"10px" }}>
                                <h5 className="josefin-font"><i className="fas fa-robot pl-4" style={{fontSize:"120%"}}></i> Devices</h5>
                                <h5 className=" josefin-font text-right pr-4"> {this.state.device}</h5>
                            </div>
                        </div>

                        <div className="col-md-3 mb-1">
                            <div className=" w-100"style={{borderRadius:"15px", backgroundColor:"#90EE90",padding:"10px"}}>
                                <h5 className="josefin-font"><i className="fas fa-list-alt pl-4" style={{fontSize:"120%"}}></i> Active Rules</h5>
                                <h5 className="josefin-font text-right pr-4"> {this.state.rules}</h5>
                            </div>
                        </div>
                        <div className="col-md-3 mb-1">
                            <div className=" w-100"style={{borderRadius:"15px", backgroundColor:"#ffcccb",padding:"10px"}}>
                                <h5 className="josefin-font"><i className="fas fa-map-marked-alt pl-4" style={{fontSize:"120%"}}></i> Areas</h5>
                                <h5 className="josefin-font text-right pr-4"> {this.state.areas}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 activity-area">
                        <div className="col-lg-4">
                            <div className="row ">
                                <div className="col-md-6">
                                    <h5 className="ml-2 pt-2 pb-2 josefin-font" style={{color:"white"}}>Activity and Notification</h5>
                                </div>
                                <div className="col-md-6 text-right pt-4">
                                    <button className="josefin-font custom-button mt-2 mb-1" onClick={this.clearNotification}> Clear Notification </button>
                                </div>
                            </div>
                                <div className="notif-area" style={{borderRadius:"20px"}}>
                                <ul className="list-group">
                                    {this.state.notifications.map(notif => {
                                        if (notif.notifCode=="1") {
                                            return <li className="list-group-item list-group-item-success josefin-font" key={notif.id}>{notif.message} <span className="float-right" style={{color:"#0f8d83"}}>{notif.notifDate}</span></li>
                                        }
                                        else if (notif.notifCode=="0") {
                                            return <li className="list-group-item list-group-item-danger josefin-font" key={notif.id}>{notif.message} <span className="float-right" style={{color:"#0f8d83"}}>{notif.notifDate}</span></li>
                                        }
                                    })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="pl-1 pr-1 pt-1 pb-1">
                                <h5 className="josefin-font text-light">Sensor Allocation</h5>
                                <PieChart
                                    className="pie"
                                    palette={'Soft Pastel'}
                                    sizeGroup="piesGroup"
                                    dataSource={this.state.areas2}
                                    >
                                    <Series argumentField="areaName" valueField="total">
                                        <Label visible={true} />
                                    </Series>
                                    <Size width={"100%"} />
                                    <Legend
                                        verticalAlignment="bottom"
                                        horizontalAlignment="center"
                                        itemTextPosition="right"
                                        rowCount={2}
                                    />
                                </PieChart>

                                <p className="josefin-font text-light">Unallocated : {this.state.unallocatedsen}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="pl-1 pr-1 pt-1 pb-1">
                                <h5 className="josefin-font text-light">Device Allocation</h5>
                                <PieChart
                                    className="pie"
                                    palette={'Office'}
                                    sizeGroup="piesGroup"
                                    dataSource={this.state.areas3}
                                    >
                                    <Series argumentField="areaName" valueField="total">
                                        <Label visible={true} />
                                    </Series>
                                    <Size width={"100%"} />
                                    <Legend
                                        verticalAlignment="bottom"
                                        horizontalAlignment="center"
                                        itemTextPosition="right"
                                        rowCount={2}
                                    />
                                </PieChart>
                                <p className="josefin-font text-light">Unallocated : {this.state.unallocateddev}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-4 pl-3 pr-3">
                            <div className="exec-com">
                                <h5 className="josefin-font content-title text-center" >Voice Command</h5>
                                <h5 className="text-center w-100 josefin-font">{this.state.VACommandVal}</h5>
                                <p className="text-center w-100 josefin-font">{this.state.VAid}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
