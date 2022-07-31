import React from "react";
import Navbar from "../../Components/Navbar";
import moment from "moment";

import "./style.css";
import axios from "axios";
import Swal from "sweetalert2";

class StaffDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markedToday: false,
      allAttendance: []
    }
  }

  componentDidMount() {
    this.getAttendance();
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
      window.location.reload();
    }
    
  }

  render() {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let today = new Date();
    let day = weekday[today.getDay()];
    
    let date = moment().format("Do MMMM, YYYY");

    const startOfMonth = moment().startOf("month").format("DD");
    const endOfMonth = moment().endOf("month").format("DD");
    let daysOfMonth = [];
    for (let i = startOfMonth; i <= endOfMonth; i++) {
      daysOfMonth.push(i);
    }

    // get user from local stroage
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      <div>
        <Navbar />

        <div className="container mt-5">
          <h3>Welcome, {user.name}.</h3>

          <div className="row bg-success text-light p-5">
            <div className="col-6 text-center">
              <h5 className="mb-0">Mark Attendance for today!</h5>
              <h5>
                <b>{date}</b>
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
            <div className="col-10 offset-1">
            * Background of each day present will be marked with different color
              <div className="month">
                <ul className="cal">
                  <li>
                    {today.toLocaleString("default", { month: "long" })}
                    <br />
                    <span>{today.getFullYear()}</span>
                  </li>
                </ul>
              </div>

              <ul className="days">
                {
                  daysOfMonth.map(day => {
                    return (
                      <li className="day">
                        <span className={ this.state.allAttendance.filter(d => moment(d.date, "DD-MMM-YYYY").format("DD") == day).length === 0 ? "" : "active" }>
                          {day}
                        </span>
                      </li>
                    )
                  })
                }
              </ul>

              {/* <div className="row mt-5 mb-5">
                Get the report:
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StaffDashboard;
