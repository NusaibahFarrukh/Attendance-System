import React from 'react';
import axios from 'axios';

import {FiTrash2} from 'react-icons/fi';
import Swal from 'sweetalert2'

import Navabar from '../../Components/Navbar';

import './style.css';

class StaffIncharge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // teachersName: [
            //     "Hubert Woolridge",
            //     "Robert Burgess",
            //     "Nina Williamson",
            //     "Ashley Hancock",
            //     "Callie Massy",
            //     "Trista Loxley",
            //     "Cedric Marshman",
            //     "Tony Tingey",
            //     "Trix Morton",
            //     "Conrad Jackson"
            // ],
            // nonTeachersName: [
            //     "Callie Massy",
            //     "Trista Loxley",
            //     "Cedric Marshman",
            //     "Tony Tingey",
            //     "Trix Morton",
            //     "Conrad Jackson",
            //     "Hubert Woolridge",
                
            // ],
            teachersName: [],
            nonTeachersName: [],
            newTeacher: '',
            newTeacherEmail: '',
            newStaff: '',
            newStaffEmail: '',
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
                                            <span className="teacherName" onClick={this.markStaffAttendance}>{teacher.name} | </span>
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

                    <div className="row mt-5">
                        <div className="col-4">
                            <h4>Check the attendance report:</h4>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                {
                                    this.state.teachersName.map(teacher => (
                                        <option>{teacher.name}</option>
                                    ))
                                }
                                {
                                    this.state.nonTeachersName.map(staff => (
                                        <option>{staff.name}</option>
                                    ))
                                }
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
