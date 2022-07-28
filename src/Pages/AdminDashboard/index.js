import React from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';

import { FiEdit } from 'react-icons/fi';

import './style.css';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            principalName: {
                name: ''
            },
            hodName: {
                name: ''
            }
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/getIncharge')
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    let data = res.data.data;

                    let principal = data.filter(item => item.subrole === 'principal');
                    let HOD = data.filter(item => item.subrole === 'hod');

                    this.setState({
                        principalName: principal[0],
                        hodName: HOD[0]
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    onTextChange = (event) => {
        let principalData = this.state.principalName
        let hodData = this.state.hodName

        if (event.target.name === 'principalName') {
            principalData.name = event.target.value
            this.setState({
                principalName: principalData
            })
        } else if (event.target.name === 'hodName') {
            hodData.name = event.target.value
            this.setState({
                hodName: hodData
            })
        }
    }

    changePrincipal = () => {
        console.log("Changing Principal")
        axios.get('http://localhost:5000/changeIncharge?name=' + this.state.principalName.name + '&subrole=principal')
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    console.log("Principal changed")
                }
            }).catch(err => {
                console.log(err)
            }
        )
    }

    changeHod = () => {
        console.log("Changing HOD")
        axios.get('http://localhost:5000/changeIncharge?name=' + this.state.hodName.name + '&subrole=hod')
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    console.log("HOD changed")
                }
            }).catch(err => {
                console.log(err)
            }
        )
    }

    render() {
        return (
            <>
                <Navbar />
                
                <div className='container mt-5'>
                    <h1>Welcome, Admin.</h1>
                </div>

                <div className="container">
                <div className=' row mt-5'>
                    <div className='col-6'>
                        <h3>Principal Name: </h3>
                        <p>{this.state.principalName.name} <FiEdit /></p>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Edit Principal
                        </button>
                    </div>
                    <div className='col-6'>
                        <h3>HOD Name:</h3>
                        <p>{this.state.hodName.name} <FiEdit /></p>

                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                            Edit HOD
                        </button>
                    </div>
                </div>
                </div>

                

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enter the name of new principal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" id="principalName" placeholder="Enter new principal name" name="principalName"
                                value={this.state.principalName.name} onChange={this.onTextChange} />
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.changePrincipal}>Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enter the name of new HOD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" id="principalName" placeholder="Enter new principal name" name="hodName"
                                value={this.state.hodName.name} onChange={this.onTextChange} />
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.changeHod}>Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AdminDashboard;
