import Header from './Component/Header';
import Footer from './Component/Footer';
//import Form from './userInfoForm/userInfoForm';
import DonationHistory from './History/History';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <DonationHistory/>
      <Footer/>
    </div>
  );
}

export default App;
