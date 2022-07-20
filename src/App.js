import MainPage from './Pages/MainPage/index';
import AdminDashboard from './Pages/AdminDashboard';
import StaffIncharge from './Pages/StaffIncharge';

// importing bootstrap css file
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <MainPage /> */}
      {/* <AdminDashboard /> */}
      <StaffIncharge />
    </div>
  );
}

export default App;
