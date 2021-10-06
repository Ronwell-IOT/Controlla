import React, { Component } from 'react'
import { CircularGauge, Scale, Label, RangeContainer, Range, Size, Geometry } from 'devextreme-react/circular-gauge';
import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    Export,
    Legend,
    Margin
  } from 'devextreme-react/chart';
class MyAreas extends Component {
    constructor(props){
        super(props)
        this.state= {

            areas: [
                {
                    areaId: 0,
                    areaName: "",
                    areaDescription : "",
                    areaUser: "" // username
                },
            ],
            device: [


            ],
            sensor: [

            ],
            unallocated:[],
            togledArea :{ // the area that is currently selected
                areaId:0,
                areaName:"",
                areaDescription:"",
                areaUser:"",

            },
            Edit: {
                id: "", // id of sensor or device
                areaId: 0 // id of area
            },
            Add: {
                id: "", // id of sensor or device
                areaId: 0 // id of area
            }

        }
        this.displayAreasSelection = this.displayAreasSelection.bind(this)
        this.displayArea = this.displayArea.bind(this)
        this.handleButtonToggle = this.handleButtonToggle.bind(this)
        this.handleDeleteButton = this.handleDeleteButton.bind(this)
        this.handlebuttonEdit = this.handlebuttonEdit.bind(this)
        this.handleCloseModalButton = this.handleCloseModalButton.bind(this)
        this.loadChoiceArea =this.loadChoiceArea.bind(this)
        this.handleUpdateDB = this.handleUpdateDB.bind(this)
        this.handleChoiceChanged = this.handleChoiceChanged.bind(this)
        this.handleAddDeviceButton = this.handleAddDeviceButton.bind(this)
        this.addDeviceToArea = this.addDeviceToArea.bind(this)
        this.insertNewDeviceToArea = this.insertNewDeviceToArea.bind(this)
        this.displayOptions = this.displayOptions.bind(this)
    }





    updateSensorValue(id, value){ // update sensor value
        const prevState = this.state.sensor;
            this.setState(prevState.map(
             obj => (obj.id === id ? Object.assign(obj, { value: value}) : obj)
           ))
    }
    handlebuttonEdit(id){
        console.log(id)
        document.querySelector('.bg-modal2').style.display = 'flex'; // close the edit modal
        var devId = "";
        var areaId ="";

        //what is the areaId of the sensor with the given deviceId = id
        // check muna kung ano ung original na areaId nung device gamit ung pinasa na id
        for( var i = 0; i < this.state.device.length; i++ ){
            if(this.state.device[i].id == id ){

                devId = this.state.device[i].id;
                areaId = this.state.device[i].areaId;
            }
        }
        for( var i = 0; i < this.state.sensor.length; i++ ){
            if(this.state.sensor[i].id == id ){
                devId = this.state.sensor[i].id;
                areaId = this.state.sensor[i].areaId;
            }
        }
            // pag nakita na kung anong areaId, isasave na ngayon sa Edit data sa state. un ung gagamitin pag mag uupdate ng db
            // change the Edit data in state in which contains the data that needs to be updated in the db
        this.setState(prevState => {
            let Edit = Object.assign({}, prevState.Edit);  // creating copy of state variable
            Edit.areaId = areaId;
            Edit.id = devId;
            return { Edit };                                 // return new object object
          })  // saving the edit object that can be used for update query to db
    }

    handleUpdateDB(){
        console.log(this.state.Edit) // use the edit data from the state for db update
        axios.post('/api/UpdateDeviceArea', {
            id: this.state.Edit.id,
            areaId: this.state.Edit.areaId
        })
        axios.post('/api/UpdateSensorArea', {
            id: this.state.Edit.id,
            areaId: this.state.Edit.areaId
        })
        alert("Device is moved to new area")
        location.reload()
    }
    handleCloseModalButton(){
        document.querySelector('.bg-modal2').style.display = 'none'; // close the edit modal
        document.querySelector('.bg-modal5').style.display = 'none'; // close the edit modal
    }
    componentDidMount(){
        this._isMounted = true;
        if (localStorage.getItem("username") === null) {
            window.location.replace('/')
        }
        var username = window.atob(localStorage.getItem('username'))
        var token = "Bearer "+window.atob(localStorage.getItem('token'))
        axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetAreas",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;

                this.setState({areas: data});
                var firstArea = data[0];
                var newtoggleArea = this.state.togledArea;
                newtoggleArea.areaId = firstArea.areaId;
                newtoggleArea.areaName = firstArea.areaName;
                newtoggleArea.areaDescription = firstArea.areaDescription;
                newtoggleArea.areaUser = firstArea.areaUser;

                this.setState({togledArea: newtoggleArea})
                //console.log(this.state.areas)

            })
            .catch(function(error){
                console.log(error);
            })
        axios.get("http://"+process.env.MIX_DATA_ROUTES+"/UnallocatedSen",{
            // headers: {
            //     authorization: token
            // },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                this.setState({unallocated: data});

            })
            .catch(function(error){
                console.log(error);
            })
        axios.get("http://"+process.env.MIX_DATA_ROUTES+"/UnallocatedDev",{
            // headers: {
            //     authorization: token
            // },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                var unallocated = this.state.unallocated;
                for(var i = 0; i < data.length; i++){
                    unallocated.push(data[i]);
                }

                this.setState({unallocated: unallocated});


            })
            .catch(function(error){
                console.log(error);
            })



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


        var percentage = 0;
        var id = ""

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        this.myInterval = setInterval(()=>{ // this is a sample random data for the sensors
                axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetSensors", {
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

                })
                .catch(function(error){
                    if (axios.isCancel(error)) {
                        console.log('Request canceled', error.message);
                    }
                    else{
                        console.log(error);
                    }
                })

            axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetControlDevice",{
            cancelToken: source.token,
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
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                }
                else{
                    console.log(error);
                }
            })


        } , 2000)

    }
    displayArea(id){ // function that used to switch between areas
        var newArea;
        var areas = this.state.areas;
        //console.log(event.target.id)
        for(var i = 0; i < areas.length; i++){
            if(id == areas[i].areaId){
                newArea = areas[i];
            }
        }
        var newtoggleArea = this.state.togledArea;
        newtoggleArea.areaId = newArea.areaId;
        newtoggleArea.areaName = newArea.areaName;
        newtoggleArea.areaDescription = newArea.areaDescription;
        newtoggleArea.areaUser = newArea.areaUser;
        this.setState({togledArea: newtoggleArea})

        var edit = this.state.Edit;
        edit.areaId = newtoggleArea.areaId;
        this.setState({Edit: edit})

        // console.log(this.state.togledArea)
    }
    displayAreasSelection(){
            // dito imamap lahat ng areas na meron ka.
            return(
                this.state.areas.map(area => {
                    return(
                    <button key={area.areaId} onClick={() => this.displayArea(area.areaId)} id={area.areaId} className=" pt-4 pb-4 area-buttons text-center pl-2 pr-4">
                        {/* dito  */}
                        <span className="josefin-font ">{area.areaName}</span>
                    </button>
                    )
                })

            )


    }

    handleAddDeviceButton(){
        document.querySelector('.bg-modal5').style.display = 'flex'; // close the edit modal
        // console.log("add device")
    }

    insertNewDeviceToArea(){
        var Add = this.state.Add; var data = this.state.togledArea.areaId; Add.areaId = data;this.setState({Add: Add});
        console.log(this.state.Add)

        axios.post('/api/UpdateDeviceArea', {
            id: this.state.Add.id,
            areaId: this.state.Add.areaId
        })
        axios.post('/api/UpdateSensorArea', {
            id: this.state.Add.id,
            areaId: this.state.Add.areaId
        })
        location.reload();
    }

    handleChoiceChanged(event){
        var Edit = this.state.Edit;  // edit ung data sa state na gagamitin pag mag uupdate sa database
        var data = event.target.value; // value=area.areaId ung ginamit sa select box kasi areaId ang i uupdate sa device
        console.log("clicked")
        Edit.areaId = data;
        this.setState(
            {
                Edit: Edit
            }
        )
    }
    addDeviceToArea(event){
        var Add = this.state.Add;
        var data = event.target.value;
        Add.id = data;
        this.setState({Add: Add});
        // console.log(this.state.Add)
    }

    handleButtonToggle(id){ // pag uupdate ng status nung control button ex status nung Smart Ligth
        var devStat2 = "off";
        var stateItemsNo = this.state.device.length;

        for(var i = 0 ; i < stateItemsNo; i++ ){
            if(this.state.device[i].id == id){
                var devStatus = "";
                var devSrc = "";
                if(this.state.device[i].status == '0'){
                    devStatus = '1';
                    devStat2 = "off"
                    devSrc = '/pictures/off.png'
                }else if (this.state.device[i].status == '1'){
                    devStatus = '0'
                    devStat2 = "on"
                    devSrc = '/pictures/on.png '
                }

                // Idk what is happening in this chunk either.
                const prevState = this.state.device;
                this.setState(prevState.map(
                 obj => (obj.id === id ? Object.assign(obj, { status: devStatus}, {src : devSrc}) : obj)
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

    handleDeleteButton(id){
        console.log(id)
        alert("the device with id "+ id +" is now removed to this area")
        axios.post('/api/UpdateDeviceArea', {
            id: id,
            areaId: "none"
        })
        axios.post('/api/UpdateSensorArea', {
            id: id,
            areaId: "none"
        })
        location.reload()
    }
    loadChoiceArea(){
        return(
            this.state.areas.map(area => {
                return(

                        <option key={area.areaId} value={area.areaId}>{area.areaName}</option> // using the value instead of areaName when updating the db

                )

            })
        )
    }
    displayOptions(){
        return(
            this.state.unallocated.map(u => {
                return(
                    <option key={u.id} value={u.id}>{u.deviceName}</option>
                )
            })
        )
    }
    componentWillUnmount() {
         clearInterval(this.myInterval)
        this._isMounted = false;
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid area-container josefin-font">
                    <div className="row">
                        <div className="col-md-1 area-selection text-center">
                            {this.displayAreasSelection()}
                        </div>
                        <div className="col-md-11">
                            <div className="row">
                                <div className="col-md-10">
                                    <h3 className="areaName josefin-font">{this.state.togledArea.areaName}</h3>
                                </div>
                                <div className="col-md-2 mt-4">
                                    <button className="btn btn-lg btn-outline-success" onClick={this.handleAddDeviceButton}><i className="fas fa-plus"></i>  Add Device</button>
                                </div>
                            </div>
                            <hr style={{ marginLeft:"4px",marginRight:"4px"}}/>
                            <h5 className="areaDesc josefin-font">{this.state.togledArea.areaDescription}</h5>
                            {/* sensor */}
                            <div className="Device-Area">
                                <div className="row text-center">
                                    {this.state.sensor.map(sen => {
                                        if(this.state.togledArea.areaId == sen.areaId){
                                        return(
                                            <React.Fragment  key={sen.id}>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <div className='col-lg-5  pt-1 pb-2 pl-2 '>
                                                            <div className="control-item text-center pb-2 pl-4 pr-4 pt-2 bg-white">
                                                            <div className="w-100 text-right">

                                                                <button onClick={() => this.handlebuttonEdit(sen.id)} className="btn btn-sm btn-outline-primary mt-2 ml-1" style={{borderRadius:"50%"}}><i className="fas fa-exchange-alt"></i></button>
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
                                                                            height={180}
                                                                        ></Size>
                                                                    </CircularGauge>
                                                                    <h3 className="josefin-font no-space">{sen.value}</h3>
                                                                    <p className="josefin-font no-space text-truncate">{sen.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-7 pl-0  pt-1 pb-2'>
                                                            <div className="control-item text-center h-100 pb-2 pl-4 pr-4 pt-2 bg-white">

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

                                                                    <Size width={"100%"} height={380}></Size>
                                                                </Chart>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                    </React.Fragment>
                                        );
                                    }
                                    }

                                    )}
                                </div>
                                {/* control */}
                                <div className="row text-center mt-4 pt-4">
                                    {this.state.device.map(dev => {
                                        if (this.state.togledArea.areaId == dev.areaId) {
                                            return(
                                                <div key={dev.id} className='col-md-3  pt-1 pb-2 pl-2 '>
                                                    <div className="control-item text-center pb-2 pl-2 pr-2 bg-white">
                                                        <div className="w-100 text-right">

                                                            <button onClick={() => this.handlebuttonEdit(dev.id)} className="btn btn-sm btn-outline-primary mt-2 ml-1" style={{borderRadius:"50%"}}><i className="fas fa-exchange-alt"></i></button>
                                                            <button onClick={() => this.handleDeleteButton(dev.id)} className="btn btn-sm btn-outline-danger mt-2 ml-1" style={{borderRadius:"50%"}}><i className="fas fa-trash-alt"></i></button>

                                                        </div>

                                                        <h5 className="mt-0 pt-2 josefin-font">{dev.deviceName}</h5>
                                                        <button onClick={() => this.handleButtonToggle(dev.id)} className="control-item-button"><img src={dev.src} width={"20%"} className="pt-2 pb-2 "></img></button>
                                                        <p className="pt-2 text-truncate">{dev.description}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* move device to another area */}
                <div className="bg-modal2 josefin-font">
                    <div className="modal-content">
                        <div className="shad pt-4 pb-4 pl-4 pr-4 ">
                            <div className="text-right w-100">
                                <button onClick={this.handleCloseModalButton} className="btn btn-sm btn-outline-danger mt-2 "style={{borderRadius:"50px"}}><i className="fas fa-times"></i></button>
                            </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                            <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Change Area</label>
                                <select className="form-control" id="" onChange={this.handleChoiceChanged}>
                                    {this.loadChoiceArea()}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Device ID</label>
                                <input type="text" className="form-control" id="" placeholder="" defaultValue={this.state.Edit.id}/>
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
                {/* / / / / / / / / / /  */}
                {/* add new device to area */}
                <div className="bg-modal5 josefin-font">
                    <div className="modal-content">
                        <div className="shad pt-4 pb-4 pl-4 pr-4 ">
                            <div className="text-right w-100">
                                <button onClick={this.handleCloseModalButton} className="btn btn-sm btn-outline-danger mt-2 "style={{borderRadius:"50px"}}><i className="fas fa-times"></i></button>
                            </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                            <form>
                                <h5 className="text-center josefin-font">Add new device to this area</h5>
                                {/* <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Device ID</label>
                                    <input type="text" className="form-control" id="" placeholder="" onChange={this.addDeviceToArea} defaultValue={this.state.Add.id}/>
                                </div> */}
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect2">Device Name</label>
                                    <select className="form-control" onClick={this.addDeviceToArea}>
                                        {this.displayOptions()}
                                    </select>
                                </div>

                            </form>
                            <div className="form-group row">
                                    <div className="col-sm-10">
                                        <button onClick={this.insertNewDeviceToArea} className="btn btn-primary">Save</button>
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

export default MyAreas;
