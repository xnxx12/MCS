import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signUp' element={<Signup/>} />
        <Route path='/' element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
