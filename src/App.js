import Login from './Pages/Login';
import MainPage from './Pages/MainPage/index';
import AdminDashboard from './Pages/AdminDashboard';
import StaffIncharge from './Pages/StaffIncharge';
import TeacherDashboard from './Pages/TeacherDashboard';
import StaffDashboard from './Pages/StaffDashboard';
import StudentDashboard from './Pages/StudentDashboard';

// importing bootstrap css file
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App({user}) {
  // console.log("Printing user from props: ", user)

  if (user) {
    if (user.role === 'admin') {
      return <AdminDashboard user={user} />
    } else if (user.role === 'incharge') {
      return <StaffIncharge user={user} />
    } else if (user.role === 'nonTeacher') {
      return <StaffDashboard user={user} />
    } else if (user.role === 'teacher') {
      return <TeacherDashboard user={user} />
    } else if (user.role === 'student') {
      return <StudentDashboard user={user} />
    }
  }
  else return <Login />
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <MainPage /> */}
      {/* <AdminDashboard /> */}
      {/* <StaffIncharge /> */}
      {/* <TeacherDashboard /> */}
      {/* <StaffDashboard /> */}
      {/* <StudentDashboard /> */}
    </div>
  );
}

export default App;
