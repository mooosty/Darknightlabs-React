import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import { SynProvider } from './context/context';

function App() {
  return (
    <SynProvider>
    <Router>
        <Routes>
          <Route path="*" element={<Homepage />} />
          {/* Test page to ensure router is working properly */}
          {/* <Route path="/about" element={<Aboutpage />} /> */}
        </Routes>
    </Router>
    </SynProvider>
  );
}

export default App;
