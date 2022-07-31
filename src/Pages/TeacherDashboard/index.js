import axios from 'axios';
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import moment from 'moment';
import Swal from "sweetalert2";

import Navbar from '../../Components/Navbar';

import './style.css';

class TeacherDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            classes: [],
            students: [],
            classDisplay: false,
            selectedSubject: '',
            studentsDisplay: false,
            studentsFiltered: [],
            selectedClass: '',
            selectedClassName: '',
            newSubject: '',
            newStudent: '',
            newStudentEmail: '',
            attendanceClass: '',
            markedToday: false,
            allAttendance: []
        }
    }

    componentDidMount() {
        // get user from local storage
        let user = JSON.parse(localStorage.getItem('user'));
        axios.get('http://localhost:5000/teacher/getTeacherSubjects?teacherId=' + user._id)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({
                        subjects: response.data.data,
                    })
                }
            }
        ).catch(error => {
            console.log(error);
        })

        axios.get('http://localhost:5000/teacher/getTeachersClass?teacherId=' + user._id)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({
                        classes: response.data.data,
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        
        this.getAttendance();
    }

    onTextChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    takeClass = (id) => {
        let selectedSubject = this.state.subjects.filter(subject => subject._id === id)[0];
        console.log({selectedSubject});

        this.setState({
            classDisplay: true,
            studentsDisplay: false,
            selectedSubject: selectedSubject,
            studentsFiltered: []
        })
    }

    markAttendance = () => {
        if (this.state.markedToday) {
          console.log("Regularizing")
          let user = JSON.parse(localStorage.getItem("user"));
          axios.get('http://localhost:5000/staff/regularize?userid=' + user._id)
          Swal.fire({
            title: "Regularized!",
            text: "Attendance for today is marked as regularized.",
            icon: "success",
            confirmButtonText: "OK"
          })
        } else {
          console.log("Marking attendance")
          let user = JSON.parse(localStorage.getItem("user"));
          axios.get('http://localhost:5000/staff/addAttendance?userid='+user._id)
            .then(res => {
              this.setState({
                markedToday: true
              })
            }) .catch(err => {
              console.log(err)
            })
    
          // reload the page
        //   window.location.reload();
        }
        
      }

    showStudents = (classID) => {
        console.log(classID);
        let selectedClass = this.state.classes.filter(classs => classs._id === classID)[0];

        axios.get('http://localhost:5000/teacher/getClassStudents?classId=' + classID)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({
                        selectedClass: classID,
                        selectedClassName: selectedClass.name,
                        students: response.data.data,
                        studentsDisplay: true,
                        classDisplay: false,
                    })
                }
            }).catch(error => {
                console.log(error);
            })
    }

    addSubject = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        let userID = user._id;
        axios.get('http://localhost:5000/teacher/addSubject?name=' + this.state.newSubject + '&teacher=' + userID)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    axios.get('http://localhost:5000/teacher/getTeacherSubjects?teacherId=' + user._id)
                        .then(response => {
                            console.log(response);
                            if (response.status === 200) {
                                this.setState({
                                    subjects: response.data.data,
                                })
                            }
                        }
                    ).catch(error => {
                        console.log(error);
                    })
                }
            }).catch(error => {
            console.log(error);
        })
    }

    addStudent = () => {
        let student = this.state.newStudent;
        let selectedClass = this.state.selectedClass
        let email = student.toLowerCase().replace(/\s/g, '') + "@gmail.com";
        console.log(student, selectedClass, email);

        axios.get('http://localhost:5000/teacher/addStudent?name=' + student + '&class=' + selectedClass + '&email=' + email)
            .then(response => {
                if (response.status === 200) {
                    console.log("Added the student successfully!")
                }
            }).catch(error => {
            console.log(error);
        })
    }

    selectClassForAttendance = (event) => {
        let classID = event.target.value;
        this.setState({
            attendanceClass: classID
        }, () => {
            // get student for this class
            let selectedClass = this.state.classes.filter(classs => classs._id === classID)[0];

            axios.get('http://localhost:5000/teacher/getClassStudents?classId=' + classID)
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        this.setState({
                            selectedClass: classID,
                            selectedClassName: selectedClass.name,
                            students: response.data.data,
                            studentsDisplay: false,
                            classDisplay: true,
                        })
                    }
                }).catch(error => {
                    console.log(error);
                })
        })
    }

    getAttendance = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        axios.get('http://localhost:5000/staff/getAttendance?userid=' + user._id)
          .then(res => {
            if (res.status === 200) {
              let attendance = res.data.data;
              let isToday = attendance.filter(att => att.date === moment().format("DD-MMM-YYYY"));
              if (isToday.length === 0) {
                this.setState({
                  markedToday: false,
                  allAttendance: attendance
                })
              } else {
                this.setState({
                  markedToday: true,
                  allAttendance: attendance
                })
              }
            }
          }).catch(err => {
            console.log(err);
          })
      }

    render() {
        let user = JSON.parse(localStorage.getItem('user'));

        return (
            <div>
                <Navbar />

                <div className="container mt-5">
                    <h3> Welcome, {user.name}.</h3>

                    <div className="row bg-success text-light p-5">
                        <div className="col-6 text-center">
                        <h5 className="mb-0">Mark Attendance for today!</h5>
                        <h5>
                            <b>{moment().format("Do MMMM, YYYY")}</b>
                        </h5>
                        </div>
                        <div className="col-6 text-center">
                        <p className={this.state.markedToday ? "d-block" : "d-none"}>Attendance for today is marked.</p>
                        <button className="btn btn-info btn-lg" onClick={this.markAttendance} >
                            {this.state.markedToday ? "Regularize" : "Mark Attendance"}
                        </button>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-6">
                            <h5>Subjects Teaching:</h5>
                            <ol>
                            {
                                this.state.subjects.map((subject, index) => {
                                    return (
                                        <div key={subject._id}>
                                            <li>
                                                {subject.name} 
                                                <span class="subjectBadge badge bg-secondary ms-3" onClick={() => this.takeClass(subject._id)}>
                                                    Take Class
                                                </span>
                                                <span class="mx-3"><FiTrash2 /></span>
                                            </li>
                                        </div>
                                    )
                                })
                            }
                            </ol>

                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Add Subject"  name='newSubject' value={this.state.newSubject}
                                    onChange={this.onTextChange} aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.addSubject}> Add </button>
                            </div>


                            <h5 className="mt-4">Classes:</h5>
                            
                            {
                                this.state.classes.map((cl, index) => {
                                    return (
                                        <div className="row" key={cl._id}>
                                            <div className="col-8">
                                                <div class="alert alert-info" role="alert">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            {cl.name}
                                                        </div>
                                                        <div className="col-6 d-flex flex-row-reverse">
                                                            <p className="showStudents mb-0" onClick={() => this.showStudents(cl._id)}>
                                                                Show Students
                                                            </p>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                            <div className="col-4 mt-3">
                                                <span class="mt-5"><FiTrash2 /></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {/* Add student to the class */}
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Student Name"  value={this.state.newStudent} name='newStudent'
                                    onChange={this.onTextChange} />
                                <select class="form-select" name="selectedClass" onChange={this.onTextChange}>
                                    <option selected>Select the class</option>
                                    {
                                        this.state.classes.map((cl) => {
                                            return (
                                                <option key={cl._id} value={cl._id}>{cl.name}</option>
                                            )
                                        })   
                                    }
                                </select>
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2"
                                    onClick={this.addStudent}>
                                        Add
                                </button>
                            </div>

                            <h5 className="mt-4">Regularization Requests:</h5>
                            <div class="alert alert-info" role="alert">
                                Jane has requested to mark them <b>present</b> on 21st July 2022 for the class Engineering Mathematics - I at 12:00pm.
                                <br />
                                <button className="btn btn-sm btn-success me-2">Accept</button>
                                <button className="btn btn-sm btn-danger">Reject</button>
                            </div>
                            <div class="alert alert-info" role="alert">
                                Julian has requested to mark them <b>present</b> on 21st July 2022 for the class Microprocessor and Micro-controller at 11:00am.
                                <br />
                                <button className="btn btn-sm btn-success me-2">Accept</button>
                                <button className="btn btn-sm btn-danger">Reject</button>
                            </div>
                        </div>

                        <div name="take-class" className="col-6" style={{ display: this.state.classDisplay ? 'block' : 'none' }}>
                            <h5>Taking Class: </h5>
                            <input type="text" class="form-control" value={this.state.selectedSubject.name} disabled />

                            <p className="mt-3 mb-1">Select the class to take attendance:</p>
                            <select class="form-select" onChange={this.selectClassForAttendance} value={this.state.attendanceClass}>
                                <option value='' selected>Select the class</option>
                                {
                                    this.state.classes.map((cl) => {
                                        return (
                                            <option key={cl._id} value={cl._id}>{cl.name}</option>
                                        )
                                    })   
                                }
                            </select>

                            <div className="mt-3">
                            {
                                this.state.students.map((student, index) => {
                                    return (
                                        <div class="alert alert-secondary" role="alert" key={student._id}>
                                            <div className="row">
                                                <div className="col-6">
                                                    <b>{index + 1}.</b> {student.name}
                                                </div>
                                                <div className="col-6 d-flex flex-row-reverse">
                                                    <span className="cursor">Present</span>
                                                    <span  className="me-4 cursor">Absent</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>

                        <div name="show-students" className="col-5 offset-1" style={{ display: this.state.studentsDisplay ? 'block' : 'none' }}>
                            {/* <label>Add Student to class {this.state.selectedClassName}:</label>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder={"Student Name"}  name='newStudent'
                                    onChange={this.onTextChange} />
                                <input type="text" class="form-control" placeholder={"Student Email"}  name='newStudentEmail'
                                    onChange={this.onTextChange} />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2"> Add </button>
                            </div> */}
                            {
                                this.state.students.map((student, index) => {
                                    return (
                                        <div class="alert alert-secondary" role="alert" key={index}>
                                            <div className="row">
                                                <div className="col-6">
                                                    <b>{index + 1}.</b> {student.name}
                                                </div>
                                                <div className="col-6 d-flex flex-row-reverse">
                                                    <span><FiTrash2 /></span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeacherDashboard;