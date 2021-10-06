import { isNull } from 'lodash'
import React, { Component } from 'react'
class Rules extends Component {
    constructor(props){
        super(props)
        this.state = {
            device:[],
            Rules0: [

            ],
            sensor: [],
            Edit: {
                isActive: " ",
                ruleId: 0,
                deviceId : " ",
                deviceStat:0,
                isMinMax : "no",
                sensorId : " ",
                minVal : 0,
                maxVal : 0,
                isTimer: "no",
                from : " ",
                to: " ",
                ruleDescription:" "
            },
            Add: {
                isActive: "yes",
                ruleId: 0,
                deviceId : " ",
                deviceStat:0,
                isMinMax : "no",
                sensorId : " ",
                minVal : 0,
                maxVal : 0,
                isTimer: "no",
                from : " ",
                to: " ",
                ruleDescription:" "
            }
        }
        this.showDevice = this.showDevice.bind(this)
        this.showSensor = this.showSensor.bind(this)

        this.AddRulesButton = this.AddRulesButton.bind(this)
        this.loadRulesRow =this.loadRulesRow.bind(this)
        this.editRule = this.editRule.bind(this)
        this.deleteRule = this.deleteRule.bind(this)
        this.closeEditRuleModal = this.closeEditRuleModal.bind(this)

        this.fromTimeChanged = this.fromTimeChanged.bind(this)
        this.toTimeChanged = this.toTimeChanged.bind(this)
        this.isActiveChange = this.isActiveChange.bind(this)
        this.deviceIdChange = this.deviceIdChange.bind(this)
        this.isMinMaxChange = this.isMinMaxChange.bind(this)
        this.sensorIdChange = this.sensorIdChange.bind(this)
        this.minValChange = this.minValChange.bind(this)
        this.maxValChange = this.maxValChange.bind(this)
        this.isTimerChange = this.isTimerChange.bind(this)
        this.saveEditButton = this.saveEditButton.bind(this)
        this.ruleDescriptionChange = this.ruleDescriptionChange.bind(this)
        this.deviceStatEdit = this.deviceStatEdit.bind(this)

        this.fromTimeChangedAdd = this.fromTimeChangedAdd.bind(this)
        this.toTimeChangedAdd = this.toTimeChangedAdd.bind(this)
        this.isActiveChangeAdd = this.isActiveChangeAdd.bind(this)
        this.deviceIdChangeAdd = this.deviceIdChangeAdd.bind(this)
        this.isMinMaxChangeAdd = this.isMinMaxChangeAdd.bind(this)
        this.sensorIdChangeAdd = this.sensorIdChangeAdd.bind(this)
        this.minValChangeAdd = this.minValChangeAdd.bind(this)
        this.maxValChangeAdd = this.maxValChangeAdd.bind(this)
        this.isTimerChangeAdd = this.isTimerChangeAdd.bind(this)
        this.saveAddButtonAdd = this.saveAddButtonAdd.bind(this)
        this.ruleDescriptionAdd = this.ruleDescriptionAdd.bind(this)
        this.deviceStatAdd = this.deviceStatAdd.bind(this)
    }
    AddRulesButton(){
        console.log("Add rules")
        document.querySelector('.bg-modal7').style.display = 'flex';
    }



    // edit
    fromTimeChanged(event){var Edit = this.state.Edit; var data = event.target.value; Edit.from = data;this.setState({Edit: Edit});}
    toTimeChanged(event){var Edit = this.state.Edit; var data = event.target.value; Edit.to = data;this.setState({Edit: Edit});}
    isActiveChange(event){var Edit = this.state.Edit; var data = event.target.value; Edit.isActive = data;this.setState({Edit: Edit});}
    deviceIdChange(event){var Edit = this.state.Edit; var data = event.target.value; Edit.deviceId = data;this.setState({Edit: Edit}); }
    isMinMaxChange(event){var Edit = this.state.Edit; var data = event.target.value; Edit.isMinMax = data;this.setState({Edit: Edit});
        if(data == "yes")document.querySelector('.use-sensor2').style.display = 'block';
        else if(data == "no")document.querySelector('.use-sensor2').style.display = 'none';
    }
    sensorIdChange(event){var Edit = this.state.Edit; var data = event.target.value; Edit.sensorId = data;this.setState({Edit: Edit}); }
    minValChange(event){var Edit = this.state.Edit;var data = event.target.value;Edit.minVal = data;this.setState({Edit: Edit});}
    maxValChange(event){var Edit = this.state.Edit; var data = event.target.value; Edit.maxVal = data;this.setState({Edit: Edit});}
    isTimerChange(event){var Edit = this.state.Edit; var data = event.target.value; Edit.isTimer = data;this.setState({Edit: Edit});
        if(data == "yes")document.querySelector('.use-timer2').style.display = 'flex';
        else if(data == "no")document.querySelector('.use-timer2').style.display = 'none';
    }
    ruleDescriptionChange(event){var Edit = this.state.Edit; var data = event.target.value; Edit.ruleDescription = data;this.setState({Edit: Edit}); }
    deviceStatEdit(event){var Edit = this.state.Edit; var data = event.target.value; Edit.deviceStat = data;this.setState({Edit: Edit}); }


    // add
    fromTimeChangedAdd(event){var Add = this.state.Add; var data = event.target.value; Add.from = data;this.setState({Add: Add});}
    toTimeChangedAdd(event){var Add = this.state.Add; var data = event.target.value; Add.to = data;this.setState({Add: Add});}
    isActiveChangeAdd(event){var Add = this.state.Add; var data = event.target.value; Add.isActive = data;this.setState({Add: Add});}
    deviceIdChangeAdd(event){var Add = this.state.Add; var data = event.target.value; Add.deviceId = data;this.setState({Add: Add}); }
    isMinMaxChangeAdd(event){var Add = this.state.Add; var data = event.target.value; Add.isMinMax = data;this.setState({Add: Add});
        if(data == "yes")document.querySelector('.use-sensor').style.display = 'block';
        else if(data == "no")document.querySelector('.use-sensor').style.display = 'none';
    }
    sensorIdChangeAdd(event){var Add = this.state.Add; var data = event.target.value; Add.sensorId = data;this.setState({Add: Add}); }
    minValChangeAdd(event){var Add = this.state.Add;var data = event.target.value;Add.minVal = data;this.setState({Add: Add});}
    maxValChangeAdd(event){var Add = this.state.Add; var data = event.target.value; Add.maxVal = data;this.setState({Add: Add});}
    isTimerChangeAdd(event){var Add = this.state.Add; var data = event.target.value; Add.isTimer = data;this.setState({Add: Add});
        if(data == "yes")document.querySelector('.use-timer').style.display = 'flex';
        else if(data == "no")document.querySelector('.use-timer').style.display = 'none';
    }
    ruleDescriptionAdd(event){var Add = this.state.Add; var data = event.target.value; Add.ruleDescription = data;this.setState({Add: Add});}
    deviceStatAdd(event){var Add = this.state.Add; var data = event.target.value; Add.deviceStat = data;this.setState({Add: Add});}

    saveEditButton(){
        console.log("edit func");

        var Rules0 = this.state.Rules0;
        var Edit = this.state.Edit;
        for(var i = 0; i < Rules0.length; i++){
            if(Rules0[i].ruleId == Edit.ruleId  ){

                Rules0[i].deviceId = Edit.deviceId
                Rules0[i].deviceStat = Edit.deviceStat
                Rules0[i].isActive = Edit.isActive
                Rules0[i].isMinMax = Edit.isMinMax
                Rules0[i].sensorId = Edit.sensorId
                Rules0[i].minVal = Edit.minVal
                Rules0[i].maxVal = Edit.maxVal
                Rules0[i].isTimer = Edit.isTimer
                Rules0[i].from = Edit.from
                Rules0[i].to = Edit.to
                Rules0[i].ruleDescription = Edit.ruleDescription
            }
        }

        axios.post('/api/UpdateRule', {
            ruleId: this.state.Edit.ruleId,
            isActive: this.state.Edit.isActive,
            deviceId: this.state.Edit.deviceId,
            deviceStat: this.state.Edit.deviceStat,
            isMinMax: this.state.Edit.isMinMax,
            sensorId: this.state.Edit.sensorId,
            minVal: this.state.Edit.minVal,
            maxVal: this.state.Edit.maxVal,
            isTimer: this.state.Edit.isTimer,
            from: this.state.Edit.from,
            to: this.state.Edit.to,
            ruleDescription: this.state.Edit.ruleDescription
        })
        //console.log(this.state.Edit)
        location.reload()
        // this.setState({Rules0: Rules0})
    }

    saveAddButtonAdd(){
        //console.log(this.state.Add);
        var Add = this.state.Add
        var Rules0 = this.state.Rules0;
        Rules0.push(Add)
        var username = window.atob(localStorage.getItem('username'))
        axios.post('/api/AddNewRules', {
            userId: username,
            isActive: this.state.Add.isActive,
            deviceId: this.state.Add.deviceId,
            deviceStat: this.state.Add.deviceStat,
            isMinMax: this.state.Add.isMinMax,
            sensorId: this.state.Add.sensorId,
            minVal: this.state.Add.minVal,
            maxVal: this.state.Add.maxVal,
            isTimer: this.state.Add.isTimer,
            from: this.state.Add.from,
            to: this.state.Add.to,
            ruleDescription: this.state.Add.ruleDescription
        }).then((response) => {
            if(response.data.error){

                alert(response.data.error);
            }
        },(error)=> {
            console.log(error);
        });
        alert("New Rule is Added")
        // console.log(this.state.Add)
        location.reload()
        // this.setState({Rules0: Rules0})


    }

    editRule(id){
        // console.log(id)
        document.querySelector('.bg-modal6').style.display = 'flex';

        var ruleId ;
        var deviceStat = 0;
        var deviceId =" ";
        var isMinMax ;
        var sensorId =" ";
        var minVal, maxVal, isTimer="";
        var from =" ";
        var to=" ";
        var isActive=" ";
        var ruleDescription=" "
        for( var i = 0; i < this.state.Rules0.length; i++ ){
            if(this.state.Rules0[i].ruleId == id ){

                ruleId = this.state.Rules0[i].ruleId;
                deviceId = this.state.Rules0[i].deviceId;
                deviceStat = this.state.Rules0[i].deviceStat;
                isMinMax = this.state.Rules0[i].isMinMax;
                sensorId = this.state.Rules0[i].sensorId;
                minVal = this.state.Rules0[i].minVal;
                maxVal = this.state.Rules0[i].maxVal;
                isTimer = this.state.Rules0[i].isTimer;
                from = this.state.Rules0[i].from;
                to = this.state.Rules0[i].to;
                isActive = this.state.Rules0[i].isActive;
                ruleDescription = this.state.Rules0[i].ruleDescription;
            }
        }
        if(isNull(sensorId)){
            sensorId = " "
        }
        this.setState(prevState => {
            let Edit = Object.assign({}, prevState.Edit);  // creating copy of state variable
            Edit.ruleId = ruleId;
            Edit.deviceId = deviceId;
            Edit.deviceStat = deviceStat;
            Edit.isMinMax = isMinMax;
            Edit.sensorId = sensorId;
            Edit.minVal = minVal;
            Edit.maxVal = maxVal;
            Edit.isTimer = isTimer;
            Edit.from = from;
            Edit.to = to;
            Edit.isActive = isActive;
            Edit.ruleDescription = ruleDescription;
            return { Edit };                                 // return new object object
          })  // saving the edi
          //console.log(this.state.Edit.deviceId)
        if(isMinMax == "yes")document.querySelector('.use-sensor2').style.display = 'block';
        else if(isMinMax == "no")document.querySelector('.use-sensor2').style.display = 'none';


        // if(isTimer == "yes")document.querySelector('.use-timer2').style.display = 'flex';
        // else if(isTimer == "no")document.querySelector('.use-timer2').style.display = 'none';

    }
    closeEditRuleModal(){
        document.querySelector('.bg-modal6').style.display = 'none';
        document.querySelector('.bg-modal7').style.display = 'none';
    }
    deleteRule(id){

        var r = confirm("Do you really want to rule ?");
        if (r == true) {
            //console.log(id);
            axios.post('/api/DeleteRule', {
                ruleId: id
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
        var username = window.atob(localStorage.getItem('username'))

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
            // console.log(this.state.device)

        })
        .catch(function(error){
            console.log(error);
        })
        axios.get("http://"+process.env.MIX_DATA_ROUTES+"/GetRules",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;

                this.setState({Rules0: data});
                // console.log(this.state.Rules0)

            })
            .catch(function(error){
                console.log(error);
            })
    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    showDevice(){
        return(
            this.state.device.map(dev => {
                return(
                    <option key={dev.id} value={dev.id}>{dev.deviceName}</option>
                )
            })
        )
    }
    showSensor(){
        return(
            this.state.sensor.map(sen => {
                return(
                    <option key={sen.id} value={sen.id}>{sen.deviceName}</option>
                )
            })
        )
    }

    loadRulesRow(){
        return(
        this.state.Rules0.map(rule => {
            return(
                <React.Fragment key={rule.ruleId}>

                    <div className="col-lg-3 rule-container"  >
                        <div className="bg-white pl-1 pr-1" style={{borderRadius:"20px"}}>
                            <div className="text-right">
                                <button onClick={() => this.editRule(rule.ruleId)} className="btn btn-sm btn-outline-success mt-2 ml-1" style={{borderRadius:"50%"}}><i className="far fa-edit"></i></button>
                                <button onClick={() => this.deleteRule(rule.ruleId)} className="btn btn-sm btn-outline-danger mt-2 ml-1" style={{borderRadius:"50%"}}><i className="fas fa-trash-alt"></i></button>
                            </div>
                            <p className="text-gray pl-4 pr-4 rule-desc josefin-font">{rule.ruleDescription}</p>
                            <div className="row">
                                <div className="col-lg-12 d-block rule">
                                    <div className="d-flex">
                                        <p className="rule-label"> Rule is Active ?: </p>
                                        <p className="rule-value">{rule.isActive}</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="rule-label">Device Id: </p>
                                        <p className="rule-value">{rule.deviceId}</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="rule-label">Use Sensor ?: </p>
                                        <p className="rule-value">{rule.isMinMax}</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="rule-label">Sensor Id: </p>
                                        <p className="rule-value">{rule.sensorId}</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="rule-label">Minimum Value: </p>
                                        <p className="rule-value">{rule.minVal}</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="rule-label">Maximum Value: </p>
                                        <p className="rule-value">{rule.maxVal}</p>
                                    </div>
                                    {/* <div className="d-flex">
                                        <p className="rule-label">Use Timer ?: </p>
                                        <p className="rule-value">{rule.isTimer}</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="rule-label">Start Time: </p>
                                        <p className="rule-value">{rule.from}</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="rule-label">End Time: </p>
                                        <p className="rule-value">{rule.to}</p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>


                </React.Fragment>
            )
        })
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid josefin-font" style={{color:'white'}}>
                    <div className="row">
                        <div className="col-md-10">
                            <h3 className="josefin-font">Rules</h3>
                        </div>
                        <div className="col-md-2 mt-4">
                            <button onClick={this.AddRulesButton} className="btn btn-lg btn-outline-success"><i className="fas fa-plus"></i>  Add Rules</button>
                        </div>
                    </div>

                    <hr style={{marginLeft:"4px", marginRight:"4px"}}/>

                    <div className="row pl-4 pr-4">

                                {this.loadRulesRow()}


                    </div>
                </div>

                {/* edit modal */}
                <div className="bg-modal6 josefin-font">
                    <div className="modal-content">
                        <div className="shad pt-4 pb-4 pl-4 pr-4 ">
                            <div className="text-right w-100">
                                <button onClick={this.closeEditRuleModal} className="btn btn-sm btn-outline-danger mt-2 "style={{borderRadius:"50px"}}><i className="fas fa-times"></i></button>
                            </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                            <form>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleFormControlTextarea1">Rule Description</label>
                                    <div className="col-sm-9">
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.ruleDescriptionChange} value={this.state.Edit.ruleDescription}></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleFormControlSelect1">isActive</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" onChange={this.isActiveChange} id="" value={this.state.Edit.isActive} >
                                            <option value={"yes"}>yes</option>
                                            <option value={"no"}>no</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label  className="col-sm-3 col-form-label" htmlFor="deviceName">Device Id</label>
                                    <div className="col-sm-4">
                                        <input type="text" onChange={this.deviceIdChange} className="form-control" id="deviceName" required value={this.state.Edit.deviceId} />
                                    </div>
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleFormControlSelect1">Device Status:</label>
                                    <div className="col-sm-2">
                                        <select className="form-control" onChange={this.deviceStatEdit} value={this.state.Edit.deviceStat} >
                                            <option value={0}>On</option>
                                            <option value={1}>Off</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleFormControlSelect1">Use Sensor ?</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" onChange={this.isMinMaxChange} id="" value={this.state.Edit.isMinMax}>
                                            <option value={"no"}>No</option>
                                            <option value={"yes"}>Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="use-sensor2">
                                    <div className="form-group row">
                                        <label  className="col-sm-3 col-form-label" htmlFor="deviceName">Sensor Id</label>
                                        <div className="col-sm-9">
                                            <select className="form-control" onChange={this.sensorIdChange} id="" value={this.state.Edit.sensorId} >
                                                {this.showSensor()}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="josefin-font col-sm-2 pt-2">Sensor Value</label>
                                        <label  className="col-sm-1 col-form-label " htmlFor="deviceName">Min</label>
                                        <div className="col-sm-4">
                                            <input type="number" onChange={this.minValChange} min={0} max={100} className="form-control" id="deviceName" required value={this.state.Edit.minVal}/>
                                        </div>
                                        <label  className="col-sm-1 col-form-label" htmlFor="deviceName">Max</label>
                                        <div className="col-sm-4">
                                            <input type="number" onChange={this.maxValChange} min={0} max={100} className="form-control" id="deviceName" value={this.state.Edit.maxVal}  required />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleFormControlSelect1">Use Timer?</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" onChange={this.isTimerChange} id="" value={this.state.Edit.isTimer}>
                                            <option value={"no"}>No</option>
                                            <option value={"yes"}>Yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row use-timer2">
                                    <label  className="col-sm-3 col-form-label" htmlFor="deviceName">From</label>
                                    <div className="col-sm-3">
                                        <input type="time" onChange={this.fromTimeChanged} className="form-control" id="" required defaultValue={this.state.Edit.from}/>
                                    </div>
                                    <label  className="col-sm-3 col-form-label" htmlFor="deviceName">To</label>
                                    <div className="col-sm-3">
                                        <input type="time" onChange={this.toTimeChanged} className="form-control" id="" required defaultValue={this.state.Edit.to}/>
                                    </div>
                                </div> */}
                            </form>
                            <div className="form-group row">
                                    <div className="col-sm-12 text-right">
                                        <button onClick={this.saveEditButton} className="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            {/* add modal */}
                <div className="bg-modal7 josefin-font">
                    <div className="modal-content">
                        <div className="shad pt-4 pb-4 pl-4 pr-4 ">
                            <div className="text-right w-100">
                                <button onClick={this.closeEditRuleModal} className="btn btn-sm btn-outline-danger mt-2 "style={{borderRadius:"50px"}}><i className="fas fa-times"></i></button>
                            </div>
                            <h5 className="text-center josefin-font">Add New Rule</h5>
                        <div className="row mt-2">
                            <div className="col-md-12">
                            <form>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleFormControlTextarea1">Rule Description</label>
                                    <div className="col-sm-9">
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.ruleDescriptionAdd} value={this.state.Add.ruleDescription}></textarea>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleFormControlSelect1">isActive</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" onChange={this.isActiveChangeAdd} id="" value={this.state.Add.isActive} >
                                            <option value={"yes"}>yes</option>
                                            <option value={"no"}>no</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label  className="col-sm-3 col-form-label" htmlFor="deviceName">Device Id</label>

                                    <div className="col-sm-4">
                                        <select className="form-control" onChange={this.deviceIdChangeAdd} id="" value={this.state.Add.deviceId} >
                                            {this.showDevice()}
                                        </select>
                                    </div>
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleFormControlSelect1">Device Status:</label>
                                    <div className="col-sm-2">
                                        <select className="form-control" onChange={this.deviceStatAdd} value={this.state.Add.deviceStat}>
                                            <option value={0}>On</option>
                                            <option value={1}>Off</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleFormControlSelect1">Use Sensor ?</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" onChange={this.isMinMaxChangeAdd} id="" value={this.state.Add.isMinMax}>
                                            <option value={"no"}>no</option>
                                            <option value={"yes"}>yes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="use-sensor ">
                                    <div className="form-group row">
                                        <label  className="col-sm-3 col-form-label" htmlFor="deviceName">Sensor Id</label>
                                        <div className="col-sm-9">
                                            <select className="form-control" onChange={this.sensorIdChangeAdd} id="" value={this.state.Add.sensorId} >
                                                {this.showSensor()}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label  className="col-sm-3 col-form-label " htmlFor="min">Min</label>
                                        <div className="col-sm-3">
                                            <input type="number" onChange={this.minValChangeAdd} min={0} max={100} className="form-control" id="min" required value={this.state.Add.minVal}/>
                                        </div>
                                        <label  className="col-sm-3 col-form-label " htmlFor="max">Max</label>
                                        <div className="col-sm-3">
                                            <input type="number" onChange={this.maxValChangeAdd} min={0} max={100} className="form-control" id="max" value={this.state.Add.maxVal}  required />
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="form-group row">
                                    <label className="col-sm-3 col-form-label" htmlFor="exampleFormControlSelect1">Use Timer?</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" onChange={this.isTimerChangeAdd} id="" value={this.state.Add.isTimer}>
                                            <option value={"no"}>no</option>
                                            <option value={"yes"}>yes</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row use-timer">
                                    <label  className="col-sm-3 col-form-label" htmlFor="deviceName">From</label>
                                    <div className="col-sm-3">
                                        <input type="time" onChange={this.fromTimeChangedAdd} className="form-control" id="" required defaultValue={this.state.Add.from}/>
                                    </div>
                                    <label  className="col-sm-3 col-form-label" htmlFor="deviceName">To</label>
                                    <div className="col-sm-3">
                                        <input type="time" onChange={this.toTimeChangedAdd} className="form-control" id="" required defaultValue={this.state.Add.to}/>
                                    </div>
                                </div> */}
                            </form>
                            <div className="form-group row">
                                    <div className="col-sm-12 text-right">
                                        <button onClick={this.saveAddButtonAdd} className="btn btn-primary">Save</button>
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

export default Rules;
