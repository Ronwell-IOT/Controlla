import React, { Component } from 'react'
import { CircularGauge, Scale, Label, RangeContainer, Range, Size, Geometry   } from 'devextreme-react/circular-gauge';
import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    Export,
    Legend,
    Margin
  } from 'devextreme-react/chart';
import {Tab, Tabs} from 'react-mdl';
class Control extends Component {

      constructor(props){
        super(props)
        this.state = {
            activeTab: 0,
            username:"",
            device: [


            ],
            sensor: [

            ],
            Edit: {
                id: "",
                deviceName: "",
                description:"",
                type:0,
            }

          } // end of state
          this.handleButtonToggle = this.handleButtonToggle.bind(this); // switching on/off the control button
          this.toggleTab = this.toggleTab.bind(this);   // for switching between the nav tab (device & sensor)
          this.handlebuttonEdit =this.handlebuttonEdit.bind(this); // the function for each of the edit button in sensors and control device
          this.handleCloseModalButton = this.handleCloseModalButton.bind(this); // this is the close button when the edit form modal pops up in the screen
          this.handleDeleteButton = this.handleDeleteButton.bind(this) // this is the function for each of the delete button in the sensor and control device
          this.handleUpdateDB = this.handleUpdateDB.bind(this) // function for the save button
          this.handleDevicenameChange = this.handleDevicenameChange.bind(this) // this when the device text box in the edit modal is changed.
          this.handleDeviceIdChange = this.handleDeviceIdChange.bind(this) // this is when the device id text box in the edit modal is changed.
          this.handleDevicedesChange =this.handleDevicedesChange.bind(this) // this is when the device description in the edit modal is changed
            //  this.updateSensorValue = this.updateSensorValue.bind(this);
        }
        handleButtonToggle(id){  /////////// function for switching the control on/ off
            var stateItemsNo = this.state.device.length;
            var devStatus = "";
            var devStat2 = "off";
            var devSrc = "";
            for(var i = 0 ; i < stateItemsNo; i++ ){
                if(this.state.device[i].id == id){

                    if(this.state.device[i].status == '0'){
                        devStatus = '1';
                        var devStat2 = "off";
                        devSrc = '/pictures/off.png'
                    }else if (this.state.device[i].status == '1'){
                        devStatus = '0'
                        var devStat2 = "on";
                        devSrc = '/pictures/on.png '
                    }

                    // Idk what is happening in this chunk either.
                    const prevState = this.state.device;
                    this.setState(prevState.map(
                     obj => (obj.id === id ? Object.assign(obj, { status: devStatus}, {src : devSrc}) : obj) // update the status of the device as well as the image src used in button
                   ))
                    //  it updates the object inside the state.
                    axios.post('/api/UpdateDeviceStat', {
                        id: id,
                        status: devStatus,
                        src: devSrc
                    })
                    var username = window.atob(localStorage.getItem('username'))
                    var message = "The device "+this.state.device[i].deviceName+" is now "+devStat2;
                    axios.post('/api/InsertLog', {
                        notifCode: 1,
                        message: message,
                        userId: username
                    })



                    //alert("the status of device with id : " +  this.state.device[i].id + " is now " + this.state.device[i].status)
                }
            }
        }
        updateSensorValue(id, value){ // update sensor value
            const prevState = this.state.sensor;
                this.setState(prevState.map(
                 obj => (obj.id === id ? Object.assign(obj, { value: value}) : obj)
               ))
        }
        handlebuttonEdit(id){ // edit button on each component (device/sensor)
            console.log(id)
            var devName = "";
            var devId = "";
            var description = "";
            var type
            document.querySelector('.bg-modal').style.display = 'flex'; // show the edit modal => located below
            for( var i = 0; i < this.state.device.length; i++ ){
                if(this.state.device[i].id == id ){
                    devName = this.state.device[i].deviceName;
                    devId = this.state.device[i].id;
                    description = this.state.device[i].description;
                    type = 0;
                }
            }
            for( var i = 0; i < this.state.sensor.length; i++ ){
                if(this.state.sensor[i].id == id ){
                    devName = this.state.sensor[i].deviceName;
                    devId = this.state.sensor[i].id;
                    description = this.state.sensor[i].description;
                    type = 1;
                }
            }

            this.setState(prevState => {
                let Edit = Object.assign({}, prevState.Edit);  // creating copy of state variable
                Edit.deviceName = devName;
                Edit.id = devId;
                Edit.description = description;
                Edit.type = type;
                return { Edit };                                 // return new object object
              })  // saving the edit object that can be used for update query to db

        }

        handleUpdateDB(){
            console.log(this.state.Edit.type)
            // alert("Device Updated")
            // console.log(this.state.Edit) // use the edit data from the state for db update

            if(this.state.Edit.type == 0 ){
                axios.post('/api/UpdateDevice', {
                    id: this.state.Edit.id,
                    deviceName: this.state.Edit.deviceName,
                    description: this.state.Edit.description
                })

                alert("Device Update");
                location.reload();
            }else if(this.state.Edit.type == 1 ){

                axios.post('/api/UpdateSensor', {
                    id: this.state.Edit.id,
                    deviceName: this.state.Edit.deviceName,
                    description: this.state.Edit.description
                })
                alert("Sensor Updated ")
                location.reload();
            }





        }
        handleCloseModalButton(){
            document.querySelector('.bg-modal').style.display = 'none'; // close the edit modal
        }
        handleDeleteButton(id){ // delete the device
            var r = confirm("Do you really want to delete " + id + " ?");
            if (r == true) {
                alert(id + " is now deleted");
                axios.post('/api/DeleteDevice', {
                    id: id
                })
                axios.post('/api/DeleteSensor', {
                    id: id
                })
                 location.reload();
            } else {

            }


        }
        componentDidMount(){
            this._isMounted = true;
            if (localStorage.getItem("username") === null) {
                window.location.replace('/')
              }
            var username = window.atob(localStorage.getItem('username'))
            var token = "Bearer "+window.atob(localStorage.getItem('token'))


            // get value from database for device obj in state
            axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetControlDevice",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;

                this.setState({device: data});

            })
            .catch(function(error){
                console.log(error);
            })

            axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetSensors",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                this.setState({sensor: data});

            })
            .catch(function(error){
                console.log(error);
            })

            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();


            this.myInterval = setInterval(()=>{ // this is a sample random data for the sensors
                // for(var i = 0; i < this.state.sensor.length; i++ ){
                    axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetSensors",{
                        cancelToken: source.token,
                        headers: {
                            authorization: token
                        },
                        params:{
                            userId: username,
                        }})
                        .then(response => {
                            var data= response.data;
                            this.setState({sensor: data});
                            // this.state.sensor.map(sen =>{
                            //     console.log(sen.sensorlogs)
                            // } )
                        })
                        .catch(function(error){
                            if (axios.isCancel(error)) {
                                console.log('Request canceled', error.message);
                            }
                            else{
                            console.log(error);
                            }
                        })
                    // percentage = Math.floor(Math.random() * 100);
                    // id = this.state.sensor[i].id
                    // //console.log(percentage)
                    // this.updateSensorValue(id,percentage)



                // }

            } , 2000)

        }


        handleDevicenameChange(event){ // runs when data in edit modal => device name textbox has changed
            var Edit = this.state.Edit;
            var modifiedDevname = event.target.value;
            Edit.deviceName = modifiedDevname;
            this.setState(
                {
                    Edit: Edit
                }
            )

        }
        handleDeviceIdChange(event){// runs when data in edit modal => device id textbox has changed
            var Edit = this.state.Edit;
            var modifiedDevid = event.target.value;
            Edit.id = modifiedDevid;
            this.setState(
                {
                    Edit: Edit
                }
            )
        }
        handleDevicedesChange(event){// runs when data in edit modal => device description  textbox has changed
            var Edit = this.state.Edit;
            var modifiedDevdes = event.target.value;
            Edit.description = modifiedDevdes;
            this.setState(
                {
                    Edit: Edit
                }
            )
        }
        toggleTab(){ // switches tab

            if(this.state.activeTab === 0){
                return(
                    //  {/* for control tab  */}

                     <div className="row mt-2 pl-1">
                         {/* devices */}
                         {this.state.device.map(dev => {
                             return(
                             <div key={dev.id} className='col-md-3 h-100 pt-1 pb-3 ml-0 mr-0 pl-2 pr-3'>
                                 <div className="control-item text-center pb-2 pl-2 pr-2 bg-white">
                                     <div className="w-100 text-right">

                                        <button onClick={() => this.handlebuttonEdit(dev.id)} className="btn btn-sm btn-outline-success mt-2 ml-1" style={{borderRadius:"50%"}}><i className="far fa-edit"></i></button>
                                        <button onClick={() => this.handleDeleteButton(dev.id)} className="btn btn-sm btn-outline-danger mt-2 ml-1" style={{borderRadius:"50%"}}><i className="fas fa-trash-alt"></i></button>

                                     </div>

                                     <h5 className="mt-0 pt-2 josefin-font">{dev.deviceName}</h5>
                                     <button onClick={() => this.handleButtonToggle(dev.id)} className="control-item-button"  ><img src={dev.src} width={"20%"} className="pt-2 pb-2 "></img></button>
                                     <p className="pt-2 text-truncate">{dev.description}</p>
                                 </div>
                             </div>
                             );
                         })
                         }

                     </div>

                )
            }
            else if(this.state.activeTab === 1){
                return(
                    // {/* for sensor tab  */}

                    <div className="row mt-2 pl-1">

                        {this.state.sensor.map(sen => {
                            return(
                                <React.Fragment  key={sen.id}>
                                <div className="col-md-6">
                                    <div className="row">

                                <div className='col-lg-5 pr-1 pt-1 pb-2 pl-1'>
                                    <div className="control-item text-center pb-2 pl-4 pr-4 pt-2 bg-white">
                                    <div className="w-100 text-right">

                                        <button onClick={() => this.handlebuttonEdit(sen.id)} className="btn btn-sm btn-outline-success mt-2 ml-1" style={{borderRadius:"50%"}}><i className="far fa-edit"></i></button>
                                        <button onClick={() => this.handleDeleteButton(sen.id)} className="btn btn-sm btn-outline-danger mt-2 ml-1" style={{borderRadius:"50%"}}><i className="fas fa-trash-alt"></i></button>

                                    </div>
                                    <h5 className="josefin-font">{sen.deviceName}</h5>
                                            <CircularGauge
                                                id="gauge"
                                                value={sen.value}
                                                >
                                                <Scale startValue={sen.minval} endValue={sen.maxval} tickInterval={10}>
                                                <Label useRangeColors={true} />
                                                </Scale>
                                                <RangeContainer >
                                                    <Range startValue={sen.minval} endValue={sen.maxval * .33} color={"#D92E2E"}/>
                                                    <Range startValue={sen.maxval * .33} endValue={sen.maxval * .66} color={"#ffad7d"} />
                                                    <Range startValue={sen.maxval * .66} endValue={sen.maxval} color={"#3BD429"}/>
                                                </RangeContainer>
                                                <Geometry
                                                startAngle={180}
                                                endAngle={0}
                                                ></Geometry>
                                                 <Size
                                                        width={"50%"}
                                                        height={150}
                                                    ></Size>
                                                </CircularGauge>
                                                <h3 className="josefin-font no-space">{sen.value}</h3>
                                                <p className="josefin-font no-space text-truncate">{sen.description}</p>
                                    </div>
                                </div>
                                <div className='col-lg-7 pl-1  pr-2 pt-1 pb-1'>
                                    <div className="control-item text-center h-100  pb-2 pl-4 pr-4 pt-2 bg-white">

                                        <Chart
                                        palette="Harmony Light"
                                        dataSource={sen.sensorlogs}
                                        >
                                            <CommonSeriesSettings
                                                argumentField={"time"}
                                                type={'splinearea'}
                                            />
                                            <Series valueField={"value"} name={"Average Per 10 mins"} color={"#0f8d83"}></Series>

                                            <Margin bottom={20} />
                                            <ArgumentAxis valueMarginsEnabled={false} />
                                            <Legend
                                                verticalAlignment={"bottom"}
                                                horizontalAlignment={"center"}
                                            />
                                            <Export enabled={true} />

                                            <Size width={"100%"} height={350}></Size>
                                        </Chart>
                                    </div>
                                </div>

                                </div>
                                </div>
                                </React.Fragment>

                            );
                        })}
                    </div>

                )
            }
        }
        componentWillUnmount() {
            clearInterval(this.myInterval)
            this._isMounted = false;
        }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid mt-4 mr-4 josefin-font ">
                    <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                        <Tab><span style={{color:"white"}}>Device</span> </Tab>
                        <Tab><span style={{color:"white"}}>Sensors</span> </Tab>
                    </Tabs>
                    <div className="control-area">
                        {this.toggleTab()}
                    </div>
                </div>

                {/* this is the edit modal  */}
                <div className="bg-modal josefin-font">
                    <div className="modal-content">
                        <div className="shad pt-4 pb-4 pl-4 pr-4 ">
                            <div className="text-right w-100">
                                <button onClick={this.handleCloseModalButton} className="btn btn-sm btn-outline-danger mt-2 " style={{borderRadius:"50px"}}><i className="fas fa-times"></i></button>
                            </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="deviceId" className="col-sm-2 col-form-label">Device/Sensor Id</label>
                                    <div className="col-sm-10">
                                        <input type="text" onChange={this.handleDeviceIdChange} defaultValue={this.state.Edit.id} className="form-control" id="deviceId" required/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label  className="col-sm-2 col-form-label" htmlFor="deviceName">Device/Sensor Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" onChange={this.handleDevicenameChange} defaultValue={this.state.Edit.deviceName} className="form-control" id="deviceName" required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="deviceId" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                    <textarea className="form-control " onChange={this.handleDevicedesChange} defaultValue={this.state.Edit.description} id="deviceId" placeholder="Add description ex. Located at Office A" required></textarea>

                                    </div>
                                </div>


                            </form>
                            <div className="form-group row">
                                    <div className="col-sm-10">
                                        <button onClick={this.handleUpdateDB} className="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Control;
