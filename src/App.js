import MainPage from './Pages/MainPage/index';
import AdminDashboard from './Pages/AdminDashboard';
import StaffIncharge from './Pages/StaffIncharge';
import TeacherDashboard from './Pages/TeacherDashboard';
import StaffDashboard from './Pages/StaffDashboard';
import StudentDashboard from './Pages/StudentDashboard';

// importing bootstrap css file
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <MainPage /> */}
      {/* <AdminDashboard /> */}
      {/* <StaffIncharge /> */}
      {/* <TeacherDashboard /> */}
      {/* <StaffDashboard /> */}
      <StudentDashboard />
    </div>
  );
}

export default App;
