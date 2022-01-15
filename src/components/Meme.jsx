import { ethers } from 'ethers'
import React, {useState, useEffect} from 'react'
import "../index.css"
import 'babel-polyfill'


function Meme(){

    // Make the meme state
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        img: "http://i.imgflip.com/1bij.jpg",
    })

    const [memesData, setMemesData] = useState([])

    // Get memes from external api fetch
        // .then functions
    
    useEffect(()=>{
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setMemesData(data.data.memes)
        }
        getMemes()
    }, [])


    // Functions handling the clicks of meme requests 

    function handleChange(event){
        const {name, value} = event.target;
        setMeme((prev) => {
            return (Object.assign({}, prev, {[name]: value}))
        })
    }
    console.log(memesData)

    function getNewImage(){
        const randomNumber = Math.floor(Math.random() * 100)
        const link = memesData[randomNumber].url
        setMeme((prev) => {
            return (Object.assign({}, prev, {img: link}))
        })
    }

    // WEB3 SHIT
        const nftAbi = require("../metadata/MemeNFT.json")
        const contractAddress = "0x7880154d11549De8d951F7ae6717c6b1eBe59505"
        const [web3provider, setWeb3Provider] = useState({})
        const [signer, setSigner] = useState({})
        const [accounts, setAccounts] = useState([]);
        const [accountuse, setAccountUse] = useState("");
        const [nftamounts, setNFTAmounts] = useState("");
        const [nftsObjects, setNFTObjects] = useState([]); 
        const [nftreact, setNFTReact] = useState([])
        const [finishedLoading, setFinishedLoading] = useState(false)
        const [isMinting, setIsMinting] = useState(false)
        const [sus, setSus] = useState(false);


        // Get Contract setup
        useEffect(() => {
        

             // Get NFTs
             async function getthefrickingnfts(contractWithSigner, daaccount){    
                 
                setFinishedLoading(false)
                console.log("Inside nft get function", contractWithSigner)    
                let nftarr = []
                
                console.log("Account in state:", daaccount)
                
                //const numNFTs = await contractWithSigner.balanceOf(accountuse);
                
                for (let i = 1; i<100; i++){
                    try {
                        const owner = await contractWithSigner.ownerOf(i) // Ownerof takes tokenid
                        console.log("owner:", owner)
                        if ((daaccount+"") === (owner+"")) {
                            const memeinstance = await contractWithSigner.tokenURI(i);
                            nftarr.push(JSON.parse(memeinstance))
                        }
                    } catch (error) {
                        break;
                    }
                    
                }
                setFinishedLoading(true)
                console.log("nft array for this account:", nftarr)
                setNFTObjects(nftarr)
            }


            async function setup() {
                const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                setWeb3Provider(provider)
                const signer = provider.getSigner();
                setSigner(signer)

                // Annoying sequence that I have to paste everywhere
                const nftcontract = new ethers.Contract(contractAddress, nftAbi.abi, provider)
                const connection = nftcontract.connect(signer)

                const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
                const accountinuse = await signer.getAddress();
                setAccountUse(accountinuse)

                getthefrickingnfts(connection, accountinuse)
            }
            setup()            
        }, [nftamounts])


        useEffect(()=>{
            // Print the frickin nfts as jsx

            function setfinished(){
                setFinishedLoading(true)
            }

            function printNFTs(){
                const nftjsx = []

                nftsObjects.map((nftobject) => {
                    const topText = nftobject.attribute[0].topText
                    const bottomText = nftobject.attribute[1].bottomText
                    const img = nftobject.image;

                    nftjsx.push(

                            <div className="container-inner">
                                    <img src={img} className="memeimg center imgUpdate"></img>
                                    <h2 className="memetext top topU updateGalleryFont">{topText}</h2>
                                    <h2 className="memetext bot botU updateGalleryFont">{bottomText}</h2>
                            </div>
                        
                    )
                    return nftobject
                })  
                setNFTReact(nftjsx)
                console.log(nftjsx)
            }
            printNFTs()
            setfinished()
        }, [nftsObjects, nftamounts])

        
        
        const [txhash, setTxHash] = useState("")

        // Handle the call
        async function handleNFT(metadata){

            // loading variable 
            setIsMinting(true);

            // put the function mintnfts in here.
            // dot env doesnt wokr for react.

            // using ethers instead of alchemy
            const nftcontract = new ethers.Contract(contractAddress, nftAbi.abi, web3provider)

            // connect to the signer
            const nftwithsigner = nftcontract.connect(web3provider.getSigner())
            // Execute tx using signer connection
            const tx = await nftwithsigner.mintNFT(accountuse, metadata)
            console.log(tx)
            setTxHash(tx.hash)

            // setting ownership of the people
            const balance = await nftwithsigner.balanceOf(accountuse)

            setTimeout(()=>{
                setNFTAmounts(balance)
                setIsMinting(false)
                console.log("ended 20 seconds")
            }, 20000)
        }
        
        function generateJSONFile(){
            const nftmetadata =
            {
                attribute: [
                    {
                        type: "topText",
                        topText: meme.topText,
                    }, 
                    {
                        type: "bottomText",
                        bottomText: meme.bottomText,
                    }
                ],
                description: "An nft from meme generator",
                image: meme.img
            }
            
            const jsonform = JSON.stringify(nftmetadata);
            console.log("Got the json file, now sending to handleNFT to mint!", jsonform)
            handleNFT(jsonform)
        }


    return (
        <div>
            
            <div className="form">
                <input
                    name="topText"
                    onChange={handleChange}
                    placeholder="meme top text"
                    type="text"
                    className="form--input"
                /> 
                <input
                    name="bottomText"         
                    onChange={handleChange}
                    placeholder="meme bottom text"
                    type="text"
                    className="form--input"
                />
                <button className="form--button" onClick={getNewImage}>
                    Get a new 🏙 meme image
                </button>
            </div>
            
            <div className = "memeContainer">
                <img src={meme.img} className="memeimg center"></img>
                <h2 className="memetext top">{meme.topText}</h2>
                <h2 className="memetext bot">{meme.bottomText}</h2>
            </div>

            <div>
                <button
                  id="mint-button"
                  className="mintButton"
                  onClick={generateJSONFile}
                  disabled = {isMinting}
                >
                    {!isMinting ? "mint ur own memeNFT!" : "Wait up, minting right now"} 
                </button>
                <br></br>
                {isMinting && <a className="gray" target="_blank" href={`https://ropsten.etherscan.io/tx/${txhash}`}>Transaction status</a>}
            </div> 
            
            <div className="line"></div>

            {finishedLoading && <div className="">
                <h2 className="header--title">
                    Meme Gallery
                </h2>
            </div>
            }
            
            {finishedLoading ?
                <div className="galleryContainer">
                        {nftreact.map((nft) => nft)}
                </div> 
                :
                <div className="linespace">
                    Loading gallery...
                    
                </div>
            }

        </div>
    )
}
export default Meme; 