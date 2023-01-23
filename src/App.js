import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import WorkoutPage from './pages/Workout/WorkoutPage';

import './App.scss';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/Register/SignUpPage';
import ProfilePage from './pages/Profile/ProfilePage';
import ReportsPage from './pages/Reports/ReportsPage';
import { useEffect, useState } from 'react';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  
  
  let user = JSON.parse(localStorage.getItem("user"));
  console.log("App user", user);

  useEffect(() => {
    console.log("Rerender");
  }, []);

  useEffect(() => {
    console.log("Selected workout", selectedWorkout);
  }, [selectedWorkout]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Home setSelectedWorkout={setSelectedWorkout}/>
          </ProtectedRoute>
        }/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route path='/workout/:id' element = {
          <ProtectedRoute>
            <WorkoutPage />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path='/reports' element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
