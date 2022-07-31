import React from 'react';
import axios from 'axios';
import moment from 'moment';

import {FiTrash2} from 'react-icons/fi';
import Swal from 'sweetalert2'

import Navabar from '../../Components/Navbar';

import './style.css';

class StaffIncharge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teachersName: [],
            nonTeachersName: [],
            newTeacher: '',
            newTeacherEmail: '',
            newStaff: '',
            newStaffEmail: '',
            regularizeRequests: [],
            fromDate: '',
            tillDate: '',
            report: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/getTeaching')
            .then(res => {
                console.log(res.data.data)
                if (res.status === 200) {
                    console.log("Found Teachers from API");
                    let allTeachers = res.data.data;
                    console.log({allTeachers})

                    this.setState({
                        teachersName: allTeachers
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        
        axios.get('http://localhost:5000/getNonTeaching')
            .then(res => {
                console.log(res.data.data)
                if (res.status === 200) {
                    console.log("Found Non Teachers from API");
                    let allNonTeachers = res.data.data;
                    console.log({allNonTeachers})

                    this.setState({
                        nonTeachersName: allNonTeachers
                    })
                }
            }).catch(err => {
                console.log(err)
            })

        axios.get('http://localhost:5000/staff/getAllReg')
            .then(res => {
                this.setState({
                    regularizeRequests: res.data.data
                })
            }).catch(err => {
                console.log(err)
            })
    }

    deleteTeacher = (id, diff) => {
        console.log("Teacher to be deleted: ", id)
        let teacherName = this.state[diff].filter(item => item._id === id)[0].name
        

        Swal.fire({
            title: 'Do you want to remove ' + teacherName  + ' from the list?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
          }).then((result) => {
            if (result.isConfirmed) {
                axios.get('http://localhost:5000/deleteStaff?id=' + id)
                    .then(res => {
                        console.log(res)
                        if (res.status === 200) {
                            console.log("Teacher deleted")
                            this.componentDidMount()
                        }
                    }).catch(err => {
                        console.log(err)
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
        console.log(this.state.newTeacherEmail)
        
        axios.get('http://localhost:5000/addTeacher?name=' + this.state.newTeacher + '&email=' + this.state.newTeacherEmail + '&subrole=teacher')
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    console.log("Teacher added to DB")
                    axios.get('http://localhost:5000/getTeaching')
                        .then(response => {
                            console.log(response.data.data)
                            if (response.status === 200) {
                                let allTeachers = response.data.data;
                                this.setState({
                                    teachersName: allTeachers,
                                    newTeacher: '',
                                    newTeacherEmail: ''
                                })
                            }
                        }
                        ).catch(err => {
                            console.log(err)
                        })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    addStaff = () => {
        console.log("Staff to Add: ", this.state.newStaff)
        console.log("Staff to Add: ", this.state.newStaffEmail)

        axios.get('http://localhost:5000/addNonTeacher?name=' + this.state.newStaff + '&email=' + this.state.newStaffEmail + '&subrole=nonTeacher')
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    console.log("Staff added to DB")
                    axios.get('http://localhost:5000/getNonTeaching')
                        .then(response => {
                            console.log(response.data.data)
                            if (response.status === 200) {
                                let allNonTeachers = response.data.data;
                                this.setState({
                                    nonTeachersName: allNonTeachers,
                                    newStaff: '',
                                    newStaffEmail: ''
                                })
                            }
                        }
                        ).catch(err => {
                            console.log(err)
                        }
                    )

                }
            }).catch(err => {
                console.log(err)
            }
        )
    }


    onTextChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    markTeacherAttendance = (id) => {
        
        let teacher = this.state.teachersName.filter(teach => teach._id === id)
        if (teacher.length === 0) {
            teacher = this.state.nonTeachersName.filter(teach => teach._id === id)
        }
        teacher = teacher[0]
        console.log("Teacher to mark attendance: ", id)

        Swal.fire({
            title: 'Mark the attendance for ' + teacher.name,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Present',
            denyButtonText: `Absent`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.get('http://localhost:5000/staff/addAttendance?userid='+id)
                    .then(res => {
                        this.setState({
                            markedToday: true
                        })
                    }) .catch(err => {
                        console.log(err)
                    })

                Swal.fire('Attendance Marked as Present!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Attendance Marked as Absent!', '', 'info')
            }
          })
    }

    deleteRequest = (id) => {
        let req = this.state.regularizeRequests
        req = req.filter(item => item._id !== id)
        this.setState({
            regularizeRequests: req
        })
    }

    generateReport = () => {
        let user = this.state.selectedStaff
        let startDate = moment(this.state.fromDate, 'YYYY-MM-DD').format('DD-MM-YYYY')
        let endDate = moment(this.state.tillDate, 'YYYY-MM-DD').format('DD-MM-YYYY')

        console.log(user, startDate, endDate)
        axios.get('http://localhost:5000/staff/getReport?startDate=' + startDate + '&endDate=' + endDate + '&userid=' + user)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    console.log("Report generated")
                    this.setState({
                        report: res.data.data
                    })
                }
            }).catch(err => {
                console.log(err)
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
                                <input type="text" class="form-control" placeholder="Teacher Name"  value={this.state.newTeacher} name='newTeacher'
                                    onChange={this.onTextChange} />
                                <input type="email" class="form-control" placeholder="Teacher Email"  value={this.state.newTeacherEmail} name='newTeacherEmail'
                                    onChange={this.onTextChange} />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                                    onClick={this.addTeacher}>
                                        Add
                                </button>
                            </div>

                            <ol>
                                {
                                    this.state.teachersName.map(teacher => {
                                        return (
                                            <li key={teacher._id}>
                                                <span className="teacherName" onClick={() => this.markTeacherAttendance(teacher._id)}>
                                                    {teacher.name}  |  </span>
                                                <span className='me-5'>
                                                    <FiTrash2 onClick={() => this.deleteTeacher(teacher._id, 'teachersName')} />
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
                                <input type="text" class="form-control" placeholder="Staff Name"  value={this.state.newStaff} name='newStaff'
                                    onChange={this.onTextChange} />
                                <input type="text" class="form-control" placeholder="Staff Email"  value={this.state.newStaffEmail} name='newStaffEmail'
                                    onChange={this.onTextChange} />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                                    onClick={this.addStaff}>
                                        Add
                                </button>
                            </div>
                            <ol>
                            {
                                this.state.nonTeachersName.map((teacher, index) => {
                                    return (
                                        <li key={teacher._id}>
                                            <span className="teacherName"  onClick={() => this.markTeacherAttendance(teacher._id)}>
                                                {teacher.name} | </span>
                                            <span className='ml-5'>
                                                <FiTrash2 onClick={() => this.deleteTeacher(teacher._id, 'nonTeachersName')} />
                                            </span>
                                        </li>
                                    )
                                })
                            }
                            </ol>
                        </div>

                    </div>

                    {/* <div className='row mt-5'>
                        <h4>Regularization Requests:</h4>
                        {
                            this.state.regularizeRequests.map(request => {
                                let user = this.state.teachersName.filter(teach => teach._id === request.user)
                                if (user.length === 0) {
                                    user = this.state.nonTeachersName.filter(teach => teach._id === request.user)
                                }
                                user = user[0]

                                return (
                                    <div class="alert alert-info" role="alert">
                                        {user.name} has requested to mark them <b>absent</b> on {request.date}.
                                        <br />
                                        <button className="btn btn-sm btn-success me-2" onClick={() => this.deleteRequest(request._id)}>Accept</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => this.deleteRequest(request._id)}>Reject</button>
                                    </div>
                                )
                            })
                        }
                    </div> */}

                    <div className="row mt-5">
                        <h4>Check the attendance report:</h4>
                        <div className="col-4">
                            <label>Select the employee:</label>
                            <select class="form-select" value={this.state.selectedStaff} name='selectedStaff' onChange={this.onTextChange}>
                                <option selected value=''>Open this select menu</option>
                                {
                                    this.state.teachersName.map(teacher => (
                                        <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                                    ))
                                }
                                {
                                    this.state.nonTeachersName.map(staff => (
                                        <option key={staff._id} value={staff._id}>{staff.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='col-4'>
                            <label>From Date</label>
                            <input type="date" class="form-control" placeholder="Date"  value={this.state.fromDate} name='fromDate' onChange={this.onTextChange} />
                        </div>
                        <div className='col-4'>
                            <label>Till Date</label>
                            <input type="date" class="form-control" placeholder="Date"  value={this.state.tillDate} name='tillDate' onChange={this.onTextChange} />
                        </div>

                        <div className={this.state.report.length === 0 ? "d-none" : "col-12 mt-3"}>
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.report.map((rep, index) => {
                                        let user = this.state.teachersName.filter(teach => teach._id === rep.userID)
                                        if (user.length === 0) {
                                            user = this.state.nonTeachersName.filter(teach => teach._id === rep.userID)
                                        }
                                        user = user[0]
                                        return (
                                            <tr key={rep._id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{user.name}</td>
                                                <td>{rep.date}</td>
                                                <td>{rep.time}</td>
                                                <td>PRESENT</td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>
                            </table>
                        </div>

                        <div className='col-4'>
                            <button className="btn btn-info mt-4" onClick={this.generateReport}>Generate Report</button>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default StaffIncharge;
