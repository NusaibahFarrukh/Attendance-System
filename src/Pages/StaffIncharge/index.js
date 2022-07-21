import React from 'react';

import {FiTrash2} from 'react-icons/fi';
import Swal from 'sweetalert2'

import Navabar from '../../Components/Navbar';

import './style.css';

class StaffIncharge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teachersName: [
                "Hubert Woolridge",
                "Robert Burgess",
                "Nina Williamson",
                "Ashley Hancock",
                "Callie Massy",
                "Trista Loxley",
                "Cedric Marshman",
                "Tony Tingey",
                "Trix Morton",
                "Conrad Jackson"
            ],
            newTeacher: '',
            nonTeachersName: [
                "Callie Massy",
                "Trista Loxley",
                "Cedric Marshman",
                "Tony Tingey",
                "Trix Morton",
                "Conrad Jackson",
                "Hubert Woolridge",
                
            ],
            newStaff: ''
        }
    }

    deleteTeacher = (index) => {
        console.log("Teacher to be deleted: ", index)

        Swal.fire({
            title: 'Do you want to remove ' + this.state.teachersName[index] + ' from the list?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let temp = this.state.teachersName;
                temp.splice(index, 1);
                this.setState({
                    teachersName: temp
                })
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    deleteStaff = (index) => {
        console.log("Staff to be deleted: ", index)

        Swal.fire({
            title: 'Do you want to remove ' + this.state.nonTeachersName[index] + ' from the list?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let temp = this.state.nonTeachersName;
                temp.splice(index, 1);
                this.setState({
                    nonTeachersName: temp
                })
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }

    addTeacher = () => {
        console.log(this.state.newTeacher)
        let temp = this.state.teachersName;
        temp.push(this.state.newTeacher);
        this.setState({
            teachersName: temp,
            newTeacher: ''
        })
    }

    addStaff = () => {
        console.log("Staff to Add: ", this.state.newStaff)
        let temp = this.state.nonTeachersName;
        temp.push(this.state.newStaff);
        this.setState({
            nonTeachersName: temp,
            newStaff: ''
        })
    }

    onTextChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    markTeacherAttendance = (index) => {
        console.log("Teacher to mark attendance: ", this.state.teachersName[index])

        Swal.fire({
            title: 'Mark the attendance for ' + this.state.teachersName[index],
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Present',
            denyButtonText: `Absent`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Attendance Marked as Present!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Attendance Marked as Absent!', '', 'info')
            }
          })
    }

    render() {
        return (
            <>
                <Navabar />

                <div className='container mt-5'>
                    <h1>Welcome, Staff Incharge (HOD/Principal).</h1>

                    <div className='row mt-4'>

                        {/* div for teaching staff`` */}
                        <div className='col-4'>
                            <h3>Teaching Staff:</h3>
                            
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Add teacher"  value={this.state.newTeacher} name='newTeacher'
                                    onChange={this.onTextChange} aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                                    onClick={this.addTecher}>
                                        Add
                                </button>
                            </div>
                            <ol>
                            {
                                this.state.teachersName.map((teacher, index) => {
                                    return (
                                        <li key={index}>
                                            <span className="teacherName" onClick={() => this.markTeacherAttendance(index)}>
                                                {teacher}  | </span>
                                            <span className='ml-5'>
                                                <FiTrash2 onClick={() => this.deleteTeacher(index)} />
                                            </span>
                                        </li>
                                    )
                                })
                            }
                            </ol>
                        </div>

                        {/* div for non teaching staff */}
                        <div className='col-4'>
                            <h3>Non-Teaching Staff:</h3>
                            
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Add new staff"  value={this.state.newStaff} name='newStaff'
                                    onChange={this.onTextChange} aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                                    onClick={this.addStaff}>
                                        Add
                                </button>
                            </div>
                            <ol>
                            {
                                this.state.nonTeachersName.map((teacher, index) => {
                                    return (
                                        <li key={index}>
                                            <span className="teacherName" onClick={this.markStaffAttendance}>{teacher} | </span>
                                            <span className='ml-5'>
                                                <FiTrash2 onClick={() => this.deleteStaff(index)} />
                                            </span>
                                        </li>
                                    )
                                })
                            }
                            </ol>
                        </div>

                        {/* div for regularization requests */}
                        <div className='col-4'>
                            <h3>Regularization Requests:</h3>
                            <div class="alert alert-info" role="alert">
                                Hubert Woolridge has requested to mark them <b>present</b> on 21st July 2022.
                                <br />
                                <button className="btn btn-sm btn-success me-2">Accept</button>
                                <button className="btn btn-sm btn-danger">Reject</button>
                            </div>
                            <div class="alert alert-info" role="alert">
                                Callie Massy has requested to mark them <b>absent</b> on 12th July 2022.
                                <br />
                                <button className="btn btn-sm btn-success me-2">Accept</button>
                                <button className="btn btn-sm btn-danger">Reject</button>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-4">
                            <h4>Check the attendance report:</h4>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                {
                                    this.state.teachersName.map(teacher => (
                                        <option>{teacher}</option>
                                    ))
                                }
                                {
                                    this.state.nonTeachersName.map(staff => (
                                        <option>{staff}</option>
                                    ))
                                }
                                {/* <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option> */}
                            </select>
                            <button className="btn btn-info mt-4">Generate Report</button>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default StaffIncharge;
