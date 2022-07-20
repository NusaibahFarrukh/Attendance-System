import React from 'react';
import Navbar from '../../Components/Navbar';

import { FiEdit } from 'react-icons/fi';

import './style.css';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            principalName: 'Viral Patel',
            hodName: 'Aakash Holla'
        }
    }

    onTextChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
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
                        <p>{this.state.principalName} <FiEdit /></p>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Edit Principal
                        </button>
                    </div>
                    <div className='col-6'>
                        <h3>HOD Name:</h3>
                        <p>{this.state.hodName} <FiEdit /></p>

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
                            <input type="text" class="form-control" id="principalName" placeholder="Enter new principal name" name="principalName"
                                value={this.state.principalName} onChange={this.onTextChange} />
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
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
                            <input type="text" class="form-control" id="principalName" placeholder="Enter new principal name" name="hodName"
                                value={this.state.hodName} onChange={this.onTextChange} />
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AdminDashboard;
