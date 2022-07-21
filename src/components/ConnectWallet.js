import { React, useState, useEffect } from 'react'
import axios from 'axios';
import '../CSS/connectwallet.css'
import connectwalletBtn from '../images/connectwalletImg.png'
import groupMLogo from '../images/groupmLogo.png'
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";


const ConnectWallet = () => {
  let navigate = useNavigate();
  const {
    authenticate,
    isWeb3Enabled,
    isAuthenticated,
    user,
    enableWeb3,
    Moralis,
  } = useMoralis();
  async function authWalletConnect() {
    const user = await authenticate({
      provider: "walletconnect",
      chainId: 137,
      // mobileLinks: [
      //   "metamask",
      //   "trust",
      //   "rainbow",
      //   "argent",
      //   "imtoken",
      //   "pillar",
      // ],
    });
  }
  useEffect(() => {
    if (isAuthenticated) {
      console.log(user.get("ethAddress"), "user address");
      let publicKey=user.get("ethAddress")
      axios.post('https://brew-api.immodesta.com/get-jwt',{publicKey}).then((res)=>{
        console.log(res)
        localStorage.setItem("jwt_token",res.data.jwtToken)
        try {
          axios.get('https://brew-api.immodesta.com/video-url',{
          headers: { Authorization: `Bearer ${res.data.jwtToken}` }})
          .then((res2)=>{
            console.log(res2)
            localStorage.setItem("User_Auth",true)
            navigate("/accessgranted")
          })
        } catch (error) {
          // navigate('/accessdenied')
          console.log(error)
        }
      })
    }
    if (!isWeb3Enabled && !isAuthenticated) {
      console.log("web3 activated");
      console.log(isAuthenticated, "checking");
    }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3, user]);
  return (
    <div className='d-flex justify-content-center align-items-center flex-column connect-wallet-main'>
      <img src={groupMLogo} height={90} className="mb-5" alt="" srcSet="" />
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <span className='brew-heading' style={{ fontWeight: "700", fontSize: "52px" }}>BREW 2022</span>
        <p className='brew-p' style={{ color: "white" }}>The deeper yo go, The more you know.</p>
        <div className='my-5'>
          <span style={{ color: "#4AABE9", fontWeight: "700", fontSize: "42px" }}>#DiveIn</span>
        </div>
        <div className="d-flex flex-row align-items-center">
          <img src={connectwalletBtn} className="my-2" style={{ cursor: "pointer" }} height={65} onClick={() => authenticate({ signingMessage: "Hello youtube" })} alt="" srcSet="" />
          <button className='wallet-connect-btn ms-2' onClick={() => authWalletConnect()}>Sign using Wallet connect</button>
        </div>
        <span style={{ fontWeight: "700", color: "white" }}>with a valid event pass NFT.</span>
      </div>
    </div>
  )
}

export default ConnectWallet