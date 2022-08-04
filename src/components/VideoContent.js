import React,{useEffect} from 'react'
import groupm from '../images/groupmVideoContent.png'
import disconnect from '../images/diconnectVideoContent.png'
import '../CSS/videocontent.css'
import vid1 from '../images/Andysession.png'
import vid2 from '../images/Appreciationvsappropiation.png'
import vid3 from '../images/Dalvirsession.png'
import vid4 from '../images/VirDassession.png'
import { useMoralis } from "react-moralis";
import { useNavigate, Navigate } from 'react-router-dom'

const VideoContent = () => {
    const { logout, isAuthenticating } = useMoralis();
  const IsUserAuth=JSON.parse(localStorage.getItem("User_Auth"))
    let navigate=useNavigate()
    const refreshPage = () => {
        navigate(0);
    }
    if (!IsUserAuth) {
        return <Navigate to="/" replace />;
        }
    const handleDisconnect=()=>{
        logout()
        localStorage.setItem('User_Auth',false)
        localStorage.removeItem("jwt_token")
        navigate('/')
      }
    // useEffect(() => {
    //  refreshPage()
    // }, [])
    
    return (
        <div className='container-fluid'>
            <div className="container">
                <div className="d-flex align-items-center my-5 flex-row justify-content-between">
                    <img src={groupm} className="groupm-logo-videocontent" alt="" srcSet="" />
                    <img src={disconnect} onClick={() => handleDisconnect()} className="disconnect-btn-videocontent" alt="" style={{cursor:"pointer"}} srcSet="" />
                </div>
                <div className='my-5 text-center d-flex justify-content-center align-items-center p-3'>
                    <div className='video-content-text'>
                        <span style={{ color: "#001F54", fontWeight: "700"}} className="videoContent-heading">About BREW 2022</span>
                        <p style={{ color: "#121212", fontWeight: "400"}} className="videoContent-p">In a dynamic environment, ideas evolve rapidly and they have the power to change the course of how things are done. What holds true for an idea today might not hold true tomorrow. But a deeper understanding of content, culture and technology helps in mastering them.</p>
                        <p style={{ color: "#121212", fontWeight: "400"}} className="videoContent-p mt-3">And so, we are inviting marketeers to take the plunge and <span style={{ fontWeight: "700" }}>#DiveIn at BREW.</span> To take the leap, get to the depths, unlearn & relearn from the best thought leaders out there.</p>
                    </div>
                </div>
            </div>
            <div style={{ background: "#001F54" }} className="py-5">
                <div className="container">
                    <div className='d-flex justify-content-center flex-column align-items-center'>
                        <span style={{ color: "white", fontWeight: "700", fontSize: "42px", fontStyle: "italic" }} className="inspiration-h">Inspiration awaits! </span>
                        <p className='mt-4 divein-p' style={{ color: "white", fontWeight: "400", fontSize: "26px", fontStyle: "italic" }} >#DiveIn with us as we explore content, culture and technology deeper.</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6 my-5 d-flex justify-content-center">
                            <div className="">
                            {/* <a href ='https://monkhubweb.s3.ap-south-1.amazonaws.com/brew22/Andy-Session.mp4' target='_blank'><img src={vid1} alt="" srcSet="" className='videos-thumbnail' /></a> */}
                            <video className='videos-thumbnail' controls>
                            <source src="https://monkhubweb.s3.ap-south-1.amazonaws.com/brew22/Andy-Session.mp4" type="video/mp4"/>
                            </video>
                            <p style={{fontSize:"18px",color:"white"}} className="text-center mt-3 videos-details">Andy's Session</p>
                            </div>
                        </div>
                        <div className="col-md-6 my-5 d-flex justify-content-center">
                            <div>
                            {/* <a href="https://monkhubweb.s3.ap-south-1.amazonaws.com/brew22/appriciation-vs-appropiation.mp4" target='_blank'><img src={vid2} alt="" srcSet="" className='videos-thumbnail' /></a> */}
                            <video className='videos-thumbnail' controls>
                            <source src="https://monkhubweb.s3.ap-south-1.amazonaws.com/brew22/appriciation-vs-appropiation.mp4" type="video/mp4"/>
                            </video>
                            <p style={{fontSize:"18px",color:"white"}} className="text-center mt-3 videos-details">Appreciation vs Appropiation</p>
                            </div>
                        </div>
                        <div className="col-md-6 my-5 d-flex justify-content-center">
                            <div className="">
                            {/* <a href="https://monkhubweb.s3.ap-south-1.amazonaws.com/brew22/Dalvir-Session.mp4" target='_blank'><img src={vid3} alt="" srcSet="" className='videos-thumbnail' /></a> */}
                            <video className='videos-thumbnail' controls>
                            <source src="https://monkhubweb.s3.ap-south-1.amazonaws.com/brew22/Dalvir-Session.mp4" type="video/mp4"/>
                            </video>
                            <p style={{fontSize:"18px",color:"white"}} className="text-center mt-3 videos-details">Dalvir's Session</p>
                            </div>
                        </div>
                        <div className="col-md-6 my-5 d-flex justify-content-center">
                            <div className="">
                            {/* <a href="https://monkhubweb.s3.ap-south-1.amazonaws.com/brew22/Vir-Das-Session.mp4" target='_blank'><img src={vid4} alt="" srcSet="" className='videos-thumbnail' /></a> */}
                            <video className='videos-thumbnail' controls>
                            <source src="https://monkhubweb.s3.ap-south-1.amazonaws.com/brew22/Vir-Das-Session.mp4" type="video/mp4"/>
                            </video>
                            <p style={{fontSize:"18px",color:"white"}} className="text-center mt-3 videos-details">Vir Das's Session</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoContent