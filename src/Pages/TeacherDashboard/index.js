import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import Navbar from '../../Components/Navbar';

import './style.css';

class TeacherDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [
                "Engineering Mathematics I",
                "Microprocessor and Micro-controller",
            ],
            classes: [
                "CSE-1",
                "ECE-2",
            ],
            classDisplay: false,
            selectedSubject: '',
            students: [
                {
                    name: 'John',
                    class: '0',
                },
                {
                    name: 'Jane',
                    class: '1',
                },
                {
                    name: 'Jack',
                    class: '0',
                },
                {
                    name: 'Jill',
                    class: '1',
                },
                {
                    name: 'Joe',
                    class: '0',
                },
                {
                    name: 'Jenny',
                    class: '1',
                },
                {
                    name: 'Juan',
                    class: '0',
                },
            ],
            studentsDisplay: false,
            studentsFiltered: [],
            selectedClass: '',
        }
    }

    takeClass = (index) => {
        console.log(this.state.subjects[index]);

        this.setState({
            classDisplay: true,
            studentsDisplay: false,
            selectedSubject: this.state.subjects[index],
            studentsFiltered: []
        })
    }

    showStudents = (index) => {
        console.log(index);
        console.log("Subject Name: ", this.state.classes[index]);
        let classStudents = this.state.students.filter(student => student.class == index);
        console.log({classStudents});
        this.setState({
            selectedClass: index,
            studentsFiltered: classStudents,
            studentsDisplay: true,
            classDisplay: false,
        })
    }

    render() {
        return (
            <div>
                <Navbar />

                <div className="container mt-5">
                    <h3> Welcome, Teacher Name.</h3>

                    <div className="row mt-4">
                        <div className="col-6">
                            <h5>Subjects Teaching:</h5>
                            <ol>
                            {
                                this.state.subjects.map((subject, index) => {
                                    return (
                                        <div key={index}>
                                            <li>
                                                {subject} 
                                                <span class="subjectBadge badge bg-secondary ms-3" onClick={() => this.takeClass(index)}>
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
                                <input type="text" class="form-control" placeholder="Add Subject"  name='newSubject'
                                    onChange={this.onTextChange} aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2"> Add </button>
                            </div>


                            <h5 className="mt-4">Classes:</h5>
                            
                            {
                                this.state.classes.map((cl, index) => {
                                    return (
                                        <div className="row" key={index}>
                                            <div className="col-8">
                                                <div class="alert alert-info" role="alert">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            {cl}
                                                        </div>
                                                        <div className="col-6 d-flex flex-row-reverse">
                                                            <p className="showStudents mb-0" onClick={() => this.showStudents(index)}>
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
                            <input type="text" class="form-control" value={this.state.selectedSubject}  />

                            <p className="mt-3 mb-1">Select the class to take attendance:</p>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                {
                                    this.state.classes.map((cl, index) => {
                                        return (
                                            <option key={index}>{cl}</option>
                                        )
                                    })   
                                }
                            </select>

                            <div className="mt-3">
                            {
                                this.state.students.map((student, index) => {
                                    return (
                                        <div class="alert alert-secondary" role="alert" key={index}>
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
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder={"Add Student to class " + this.state.classes[this.state.selectedClass]}  name='newStudent'
                                    onChange={this.onTextChange} />
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2"> Add </button>
                            </div>
                            {
                                this.state.studentsFiltered.map((student, index) => {
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