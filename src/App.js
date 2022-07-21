import logo from "./MageLogo.jpg";
import React, { useEffect, useState } from "react";
import "./App.css";
import { useMoralis } from "react-moralis";
import { Button, Box, Heading } from "@chakra-ui/react";
import { Container, Center } from "@chakra-ui/react";
import ConnectWallet from './components/ConnectWallet'
import AccessDenied from './components/AccessDenied'
import VideoContent from "./components/VideoContent";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const LogoutButton = () => {
  const { logout, isAuthenticating } = useMoralis();

  return (
    <Button
      display={"block"}
      colorScheme="red"
      variant="solid"
      isLoading={isAuthenticating}
      onClick={() => logout()}
      disabled={isAuthenticating}
    >
      Logout
    </Button>
  );
};

// ---------- APP -------------
function App() {
  const IsUserAuth=JSON.parse(localStorage.getItem("User_Auth"))
  // const {
  //   authenticate,
  //   isWeb3Enabled,
  //   isAuthenticated,
  //   user,
  //   enableWeb3,
  //   Moralis,
  // } = useMoralis();

  // async function authWalletConnect() {
  //   const user = await authenticate({
  //     provider: "walletconnect",
  //     chainId: 137,
  //     // mobileLinks: [
  //     //   "metamask",
  //     //   "trust",
  //     //   "rainbow",
  //     //   "argent",
  //     //   "imtoken",
  //     //   "pillar",
  //     // ],
  //   });
  // }

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     console.log(user.get("ethAddress"), "user address");
  //   }
  //   if (!isWeb3Enabled && !isAuthenticated) {
  //     console.log("web3 activated");
  //     console.log(isAuthenticated, "checking");
  //   }
  // }, [isWeb3Enabled, isAuthenticated, enableWeb3, user]);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }
  });

  // ----- Authenticate in Metamask---------
  // if (!isAuthenticated && !user) {
  //   console.log(user);
  //   return (
  //     <Container maxW="container.lg">
  //       <br />
  //       <Center>
  //         <Heading as="h2" size="3xl" p={10}>
  //           Wallet authentication
  //         </Heading>
  //       </Center>
  //       <Center>
  //         <Button
  //           colorScheme="green"
  //           size="lg"
  //           onClick={() => authenticate({ signingMessage: "Hello youtube" })}
  //         >
  //           Sign in using Metamask
  //         </Button>
  //       </Center>
  //       <br />
  //       <Center>
  //         <Button
  //           colorScheme="green"
  //           size="lg"
  //           onClick={() => authWalletConnect()}
  //         >
  //           Sign in using Wallet Connect
  //         </Button>
  //       </Center>
  //       <br />
  //     </Container>
  //   );
  // }

  return (
    <>
    {/* {!isAuthenticated && !user?<ConnectWallet/>:<VideoContent/>} */}
    <Routes forceRefresh={true}>
      <Route exact path="/" element={<ConnectWallet/>}/>
      <Route exact path="/accessgranted" forceRefresh={true} element={<VideoContent/>} />
      <Route exact path="/accessdenied" element={<AccessDenied/>} />     
    </Routes>
    
    {/* <Box display={"block"} p={35} className="App">
      <LogoutButton />
      <Center>
        <img width={500} height={500} src={logo} alt="logo" />
      </Center>

      <Center>
        <Heading as="h2" size="3xl" p={10}>
          Wallet Logged in
        </Heading>
      </Center>
    </Box> */}
    </>
  );
}

export default App;
