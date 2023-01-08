import { Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import WorkoutPage from './pages/Workout/WorkoutPage';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/workout' element={<WorkoutPage />}/>
      </Routes>
    </div>
  );
}

export default App;
