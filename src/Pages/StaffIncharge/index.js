import React from 'react';

import {FiTrash2} from 'react-icons/fi';
import Swal from 'sweetalert2'

import Navabar from '../../Components/Navbar';

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
                                            <span>{teacher} </span>
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
                                            <span>{teacher} </span>
                                            <span className='ml-5'>
                                                <FiTrash2 onClick={() => this.deleteStaff(index)} />
                                            </span>
                                        </li>
                                    )
                                })
                            }
                            </ol>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default StaffIncharge;
