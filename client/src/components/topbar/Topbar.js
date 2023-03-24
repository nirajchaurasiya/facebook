import './topbar.css'
import { BsSearch, BsFillPersonFill, BsFillChatFill } from 'react-icons/bs'
import { IoNotificationsSharp } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import { useContext, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
export default function Topbar() {
    const { user } = useContext(AuthContext);
    console.log(useContext(AuthContext))
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo" ><NavLink to='/' style={{ textDecoration: "none", color: "white" }}> Social App</NavLink></span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <BsSearch className='searchIcon' />
                    <input placeholder='Search friend, post or videos' className='searchInput' />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink" style={{ color: "black", fontSize: "13px" }}>Welcome,</span>
                    <NavLink to={`/profile/${user?.username}`} style={{ textDecoration: "none", color: "white" }}><span className="topbarLink" style={{ fontSize: "13px" }}>{user?.username}</span></NavLink>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <BsFillPersonFill />
                        <span className="topbarIconBadge">1</span>
                    </div>

                    <div className="topbarIconItem">
                        <BsFillChatFill />
                        <span className="topbarIconBadge">1</span>
                    </div>

                    <div className="topbarIconItem">
                        <IoNotificationsSharp />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>

                <NavLink to={`/profile/${user?.username}`}>
                    <img src={user?.profilePicture ? PF + user?.profilePicture : PF + `person/1.jpeg`} alt="" className="topbarImg" />
                </NavLink>
            </div>

        </div>
    )
}
