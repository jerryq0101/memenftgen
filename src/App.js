import logo from './logo.svg';
import './App.css';
import Header from "./components/Header"
import Meme from "./components/Meme"

function App() {
  if (!window.ethereum){

    function handleCheck(){
      if (window.ethereum){
        window.location.reload();
      }
    }
    return (
        <div>
            <div className="header">
              <h2 className="header--title">😂 meme generator</h2>
            </div>
            <div className="centerConnect">
                <h2 className="connectText">
                  To use this stupid app, please connect to metamask.
                </h2>
                <p className="connectDesc">
                  I am begging you bruv {":,<"}
                </p>
                <button className="connectButton" onClick={handleCheck}>
                  Connect to the application
                </button>
            </div>
        </div>
    )
  }

  return (
    <div className="App">
      <Header />
      <Meme />
    </div>
  );
}

export default App;
