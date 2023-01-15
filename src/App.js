import { Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import WorkoutPage from './pages/Workout/WorkoutPage';

import './App.scss';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/Register/SignUpPage';
import ProfilePage from './pages/Profile/ProfilePage';
import ReportsPage from './pages/Reports/ReportsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route path='/workout' element={<WorkoutPage />}/>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/reports' element={<ReportsPage />} />
      </Routes>
    </div>
  );
}

export default App;
