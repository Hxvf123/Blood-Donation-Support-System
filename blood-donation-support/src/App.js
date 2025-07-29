import Router from "./Route";
import './App.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer position="top-right" autoClose={3000} />
      
    </div>
  );
}

export default App;
