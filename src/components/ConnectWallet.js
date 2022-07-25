import { React, useState, useEffect } from "react";
import axios from "axios";
import "../CSS/connectwallet.css";
import connectwalletBtn from "../images/connectwalletImg.png";
import connectWithMetamask from "../images/connectwithmetamask.png";
import connectWithwallet from "../images/connectwithwallet.png";
import groupMLogo from "../images/groupmLogo.png";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AlertDialogCloseButton, Button, cancelRef } from "@chakra-ui/react";

const ConnectWallet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      signingMessage: "hello",
    });
  }
  useEffect(() => {
    if (isAuthenticated) {
      console.log(user.get("ethAddress"), "user address");
      let publicKey = user.get("ethAddress");
      axios
        .post("https://brew-api.immodesta.com/get-jwt", { publicKey })
        .then((res) => {
          console.log(res);
          localStorage.setItem("jwt_token", res.data.jwtToken);
          if (res.data.jwtToken) {
            axios
              .get("https://brew-api.immodesta.com/video-url", {
                headers: { Authorization: `Bearer ${res.data.jwtToken}` },
              })
              .then((res2) => {
                console.log(res2);
                localStorage.setItem("User_Auth", true);
                navigate("/accessgranted");
              })
              .catch((err) => {
                console.log(err);
                navigate("/accessdenied");
              });
          }
        });
    }
    if (!isWeb3Enabled && !isAuthenticated) {
      console.log("web3 activated");
      console.log(isAuthenticated, "checking");
    }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3, user]);
  return (
    <div className="d-flex justify-content-center align-items-center flex-column connect-wallet-main">
      <img src={groupMLogo} height={90} className="mb-5" alt="" srcSet="" />
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <span
          className="brew-heading"
          style={{ fontWeight: "700", fontSize: "52px" }}
        >
          BREW 2022
        </span>
        <p className="brew-p" style={{ color: "white" }}>
          The deeper yo go, The more you know.
        </p>
        <div className="my-5">
          <span
            style={{ color: "#4AABE9", fontWeight: "700", fontSize: "42px" }}
          >
            #DiveIn
          </span>
        </div>
        <button className="wallet-connect-btn" onClick={onOpen}>
          Connect Wallet
        </button>
        <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Connect Wallet</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>

        <div className="d-flex flex-column justify-content-center flex-wrap align-items-center">
          <img src={connectWithMetamask} className="my-2 connect-with-metamask-img" style={{cursor:"pointer", border:"2px solid #001F54", borderRadius:"12px"}} height={35} onClick={() => authenticate({ signingMessage: "Hello youtube" })} alt="" srcSet="" />
          <img src={connectWithwallet} className="my-2" style={{cursor:"pointer", border:"2px solid #001F54", borderRadius:"12px"}} height={35} onClick={() => authWalletConnect()} alt="" srcSet='' />
        </div>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
        <span style={{ fontWeight: "700", color: "white" }}>with a valid event pass NFT.</span>
      </div>
    </div>
  );
};

export default ConnectWallet;
