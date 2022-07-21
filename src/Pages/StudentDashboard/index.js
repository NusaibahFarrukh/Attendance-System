import React from "react";
import Navbar from "../../Components/Navbar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [
        "Engineering Mathematics - I",
        "Micro Processors and Micro-Controllers",
        "Data Structure and Algorithms",
      ],
    };
  }
  render() {
    let datasets = [
      {
        label: "Attendance",
        backgroundColor: "#4258ff",
        data: [60, 90, 80, 100],
      },
    ];

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
      today.getFullYear();

    return (
      <>
        <Navbar />

        <div className="container mt-5">
          <h3>Hello, Student.</h3>
          <div className="row mt-4">
            <div className="col-6 bg-dark text-light p-5">
              Select the subject and mark your attendance for the day.
              <select
                class="form-select mt-2"
                aria-label="Default select example"
              >
                <option selected>Open this select menu</option>
                <option value="1">Engineering Mathematics - I</option>
                <option value="2">
                  Micro Processors and Micro-Controllers
                </option>
                <option value="3">Data Structure and Algorithms</option>
              </select>
              <h4 className="mt-4 text-center">{date}</h4>
              <h4 className="text-center">({weekday[today.getDay()]})</h4>
              <button className="btn btn-info w-100 mt-4">
                <b>Mark Me Present</b>
              </button>
            </div>

            <div className="col-6 p-5">
              <Bar
                data={{
                  labels: this.state.subjects,
                  datasets: datasets,
                }}
                options={{
                  title: {
                    display: true,
                    text: "Attendace Analysis",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
                <h4 className="mt-4">Request for Regularization:</h4>
              <table class="table table-danger p-5">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Class Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Teacher</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Engineering Mathematics</td>
                    <td>July 12, 2022</td>
                    <td>Smahoda Billory</td>
                    <td>
                        <button className="btn btn-danger">Request</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Data Structures and Algorithms</td>
                    <td>July 14, 2022</td>
                    <td>Samsher Khan</td>
                    <td>
                        <button className="btn btn-danger">Request</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Some Other Subject</td>
                    <td>July 21, 2022</td>
                    <td>Samoh Lal Chadda</td>
                    <td>
                        <button className="btn btn-danger">Request</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StudentDashboard;
