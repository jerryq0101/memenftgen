import logo from './logo.svg';
import React, {useState} from "react"
import './App.css';
import Header from "./components/Header"
import Meme from "./components/Meme"

function App() {

  const [buttonClicked, setButtonClicked] = useState(false)

  if (!buttonClicked){
    return (
      <div>
            <p>Hello, to enter the meme generator:
                <ol>
                    <li>Metamask</li>
                    <li>Connect to Ropsten</li>
                </ol>
            </p>
            <button onClick={()=>{setButtonClicked(true)}}>Enter app</button>
        </div>
    )
  }

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
                  To use this app, please connect to metamask.
                </h2>
                <p className="connectDesc">
                  I am begging you
                </p>
                <button className="connectButton" onClick={handleCheck}>
                  Connect to the application
                </button>
                <p className="gray">get metamask <a className="gray" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">here</a></p>
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
