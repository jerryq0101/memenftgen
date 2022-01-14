import logo from './logo.svg';
import './App.css';
import Header from "./components/Header"
import Meme from "./components/Meme"
import { ethers } from 'ethers'


function App() {

  async function idcheck() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const { chainId } = await provider.getNetwork()
    console.log("chainid:", chainId);

    function handleCheck(){
      if (window.ethereum){
        window.location.reload();
      }
    }

    if (chainId !== 3){
      return (
        <div>
            <div className="header">
              <h2 className="header--title">😂 meme generator</h2>
            </div>
            <div className="centerConnect">
                <h2 className="connectText">
                  To use this stupid app, please connect to ropsten
                </h2>
                <p className="connectDesc">
                  I am begging you bruv {":,<"}
                </p>
                <button className="connectButton" onClick={handleCheck}>
                  Connect to the application
                </button>
                <p className="gray">get metamask <a className="gray" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">here</a></p>
            </div>
        </div>
      )
    }
  }

  idcheck()

  

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
