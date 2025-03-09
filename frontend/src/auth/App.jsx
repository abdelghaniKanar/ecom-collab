import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignuoForm from './SignuoForm';
import Login from './Login';
import AfeterLogIn from './AfeterLogIn';
import CominSoon from './CominSoon';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
  return (
    <Router>
      <div className="flex">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={ <SignuoForm />} />
            <Route path='/after-login' element={  <AfeterLogIn />  } />
            <Route path="/CominSoon" element={  <ProtectedRoute> <CominSoon />  </ProtectedRoute>   } />
            
        

 

          </Routes>
        </div>
      </div>
    </Router>
  );
}
