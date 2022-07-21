import React from "react";
import Navbar from "../../Components/Navbar";
import moment from "moment";

import "./style.css";

class StaffDashboard extends React.Component {
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
    
    let date =
      today.toLocaleString("default", { month: "long" }) +
      " " +
      (today.getMonth() + 1) +
      ", " +
      today.getFullYear() +
      " (" +
      day +
      ")";

    const startOfMonth = moment().startOf("month").format("DD");
    const endOfMonth = moment().endOf("month").format("DD");

    return (
      <div>
        <Navbar />

        <div className="container mt-5">
          <h3>Welcome, Staff Member.</h3>

          <div className="row bg-success text-light p-5">
            <div className="col-6 text-center">
              <h5 className="mb-0">Mark Attendance for today!</h5>
              <h5>
                <b>{date}</b>
              </h5>
            </div>
            <div className="col-6 text-center">
              <button className="btn btn-info btn-lg">Mark Attendance</button>
            </div>
          </div>

            
          <div className="row mt-4">
            <div className="col-10 offset-1">
            * Background of each day present will be marked with different color
              <div class="month">
                <ul className="cal">
                  <li>
                    {today.toLocaleString("default", { month: "long" })}
                    <br />
                    <span>{today.getFullYear()}</span>
                  </li>
                </ul>
              </div>

              <ul class="weekdays">
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
                <li>Su</li>
              </ul>

              <ul class="days">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>
                  <span class="active">10</span>
                </li>
                <li>11</li>
                <li>12</li>
                <li>13</li>
                <li>14</li>
                <li>15</li>
                <li>16</li>
                <li>17</li>
                <li>18</li>
                <li>19</li>
                <li>20</li>
                <li>21</li>
                <li>22</li>
                <li>23</li>
                <li>24</li>
                <li>25</li>
                <li>26</li>
                <li>27</li>
                <li>28</li>
                <li>29</li>
                <li>30</li>
                <li>31</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StaffDashboard;
