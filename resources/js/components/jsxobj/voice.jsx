import React, { Component } from 'react'

class Voice extends Component {
    constructor(props){
        super(props)
        this.state={
            device:[],
            username:"",
            VACommandVal:"",
            voiceSetting:{
                deviceId:'',
                deviceDescription:''
            },
            voiceCommand:{
                command:'',
                deviceId: '',
                status:"On",
            },
            commands:[]
        }
        this.loadsRow = this.loadsRow.bind(this)

    }
    componentDidMount(){
        var username = window.atob(localStorage.getItem('username'))
        this.setState({username: username})
        var vaId= "";
        var token = "Bearer "+window.atob(localStorage.getItem('token'))
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
        axios.get("http://"+process.env.MIX_DATA_ROUTES+"/getVA",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
            }})
            .then(response => {
                var data= response.data;
                vaId = data[0].deviceId;
                var voiceSetting = this.state.voiceSetting;
                voiceSetting.deviceId = data[0].deviceId;
                voiceSetting.deviceDescription = data[0].description;
                this.setState({voiceSetting: voiceSetting});
                axios.get("http://"+process.env.MIX_DATA_ROUTES+"/getCommands",{
                    headers: {
                        authorization: token
                    },
                    params:{
                        userId: username,
                        vaId: vaId,
                    }})
                    .then(response => {
                        var data= response.data;
                        this.setState({commands:data})
                        console.log(data)

                    })
                    .catch(function(error){
                        console.log(error);
                    })

            })
            .catch(function(error){
                console.log(error);
            })

        this.myInterval = setInterval(()=>{
            axios.get("http://"+process.env.MIX_DATA_ROUTES+"/getVaCommandValue",{
            headers: {
                authorization: token
            },
            params:{
                userId: username,
                deviceId: this.state.voiceSetting.deviceId,
            }})
            .then(response => {
                var data= response.data;

                this.setState({VACommandVal: data[0].value});
                // console.log(this.state.device)

            })
            .catch(function(error){
                console.log(error);
            })
        } , 1000)



    }
    deviceIdChange(e){
        var voiceSetting = this.state.voiceSetting;
        voiceSetting.deviceId = e.target.value;
        this.setState({voiceSetting:voiceSetting});
        console.log(this.state.voiceSetting.deviceId)

    }
    descriptionChange(e){
        var voiceSetting = this.state.voiceSetting
        voiceSetting.deviceDescription = e.target.value;
        this.setState({voiceSetting:voiceSetting});

    }
    commandChange(e){
        var voiceCommand = this.state.voiceCommand
        voiceCommand.command = e.target.value;
        this.setState({voiceCommand:voiceCommand})
        console.log(this.state.voiceCommand.command)
    }
    saveCommand(){
        axios.post('/api/saveCommand', {
            deviceId: this.state.voiceCommand.deviceId,
            status:this.state.voiceCommand.status,
            userId: this.state.username,
            vaId: this.state.voiceSetting.deviceId,
            command: this.state.voiceCommand.command,
            active: "Yes"
        })
        location.reload()
    }
    saveSetting(){
        axios.post('/api/saveNewVA', {
            deviceId: this.state.voiceSetting.deviceId,
            deviceDescription:this.state.voiceSetting.deviceDescription,
            userId: this.state.username,
        })
    }
    deviceSelected(e){
        var voiceCommand = this.state.voiceCommand;
        voiceCommand.deviceId = e.target.value;
        this.setState({voiceCommand:voiceCommand})
        console.log(this.state.voiceCommand.deviceId)
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
    statSelected(e){
        console.log(e.target.value)
        var voiceCommand = this.state.voiceCommand;
        voiceCommand.status = e.target.value;
        this.setState({voiceCommand:voiceCommand})
    }
    deleteCommand(id){
        axios.post('/api/deleteCommand', {
            id: id,
            vaId: this.state.voiceSetting.deviceId,
            userId: this.state.username

        })
         location.reload()
    }
    activeUpdate(e){
        axios.post('/api/updateActiveCommand', {
            id: e.target.id,
            vaId: this.state.voiceSetting.deviceId,
            userId: this.state.username,
            active: e.target.value,

        })
    }
    loadsRow(){
        return(
            this.state.commands.map(c => {
                return(

                    <tr key={c.id} style={{marginTop:"2px",marginBottom:"2px",fontSize:"1em"}}>
                        <th scope="row" className="text-center">{c.command}</th>
                        <td className="text-center">{c.deviceName}</td>
                        <td className="text-center">{c.status}</td>
                        <td className="text-center">
                            <select className="form-control w-75 form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={this.activeUpdate.bind(this)} id={c.id} defaultValue={c.active} style={{display:'block', marginLeft:'auto', marginRight:'auto'}}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select></td>
                        <td className="text-center"> <button onClick={()=> this.deleteCommand(c.id)} className="btn btn-sm btn-danger "><i className="fas fa-trash-alt"></i></button> </td>
                    </tr>

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
                            <h3 className="josefin-font">Voice Assistant</h3>
                        </div>
                    </div>
                    <hr style={{marginLeft:"4px", marginRight:"4px"}}/>
                </div>
                <div className="row ml-2 mr-2 pl-4 pr-4  w-100">
                    <div className="col-md-4  p-0 ">
                        <div className="row content-wrapper m-0">
                            <div className="col-md-12">
                                <h5 className="josefin-font content-title text-center" >Your Voice Assistant</h5>
                                <form className="josefin-font">
                                    <div className="mb-3">
                                        <label htmlFor="DeviceId" className="form-label">Device ID:</label>
                                        <input type="text" className="form-control" id="DeviceId" onChange={this.deviceIdChange.bind(this)} defaultValue={this.state.voiceSetting.deviceId}/>

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="DeviceId" className="form-label">Description:</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" onChange={this.descriptionChange.bind(this)} defaultValue={this.state.voiceSetting.deviceDescription} rows="3"/>
                                    </div>
                                </form>
                                <button className="btn btn-primary save-btn" onClick={this.saveSetting.bind(this)}>Save</button>
                            </div>
                        </div>
                        <br />
                        <div className="row content-wrapper m-0">
                            <div className="col-md-12">
                                <h5 className="josefin-font content-title text-center" >Executed Command</h5>
                                <h5 className="text-center w-100 josefin-font">{this.state.VACommandVal}</h5>
                            </div>
                        </div>
                        <br />
                    </div>
                    <div className="col-md-8 right-panel">
                        <div className="row mb-4">
                            <div className="col-md-12 add-command pt-4 pb-4">

                                <form className="josefin-font">
                                    <div className="row ">
                                        <div className="col-md-2 pt-2">
                                            <label htmlFor="command" className="form-label">Command:</label>
                                        </div>
                                        <div className="col-md-4">
                                            <input type="text" className="form-control" id="command" onChange={this.commandChange.bind(this)} defaultValue={this.state.voiceCommand.command}/>
                                        </div>
                                        <div className="col-md-2 pt-2 pl-2">
                                            <label htmlFor="Device" className="form-label">Device :</label>
                                        </div>
                                        <div className="col-md-4 ">
                                            <select className="form-control" onChange={this.deviceSelected.bind(this)} value={this.state.voiceCommand.deviceId}>
                                                <option value={""}></option>
                                                {this.showDevice()}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-1">
                                        <div className="col-md-2 pt-2">
                                            <label className="form-label">Status :</label>
                                        </div>
                                        <div className="col-md-4 ">
                                            <select className="form-control" onChange={this.statSelected.bind(this)} value={this.state.voiceCommand.status}>
                                                <option ></option>
                                                <option value={"On"}>On</option>
                                                <option value={"Off"}>Off</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 add-command-wrap text-right ">
                                            <button type="button" className="btn btn-sm btn-primary add-command-btn mt-2 mb-2 " onClick={this.saveCommand.bind(this)} >Save Command</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="row mb-4 ">
                            <div className="col-md-12 command-list-wrapper">
                                <h5 className="josefin-font content-title2 text-center" >Commands</h5>
                                <table className="table josefin-font" style={{overflow:"auto"}}>
                                    <thead className="table-dark text-center">
                                        <tr>
                                            <th scope="col">Command</th>
                                            <th scope="col">Device Name</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Active</th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.loadsRow()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Voice;
