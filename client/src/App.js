import { CreateSchedule, ExportSchedule, Home, NavMenu } from './components';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavMenu />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-schedule' element={<CreateSchedule />} />
            <Route path='/export-schedule' element={<ExportSchedule />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
