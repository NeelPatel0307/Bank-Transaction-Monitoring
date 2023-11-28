import logo from './logo.svg';
import './App.css';
import Createaccount from './components/Createaccount';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DepositMoney from './components/DepositMoney';
function App() {
  return (
<>
      <Router>
      
          <Routes>
           
          
            <Route path="/createaccount" element={<Createaccount/>} />
            <Route path="/operation/:userId" element={<DepositMoney/>} />
          </Routes>
   
      </Router>
    </>
  );
}

export default App;
