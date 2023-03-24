import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import './rightbar.css'
import { AiFillPlusSquare, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    const { user: currentUser, dispatch } = useContext(AuthContext)
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id))

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get('/user/friends/' + user?._id)
                setFriends(friendList.data)
            } catch (error) {
                console.log("An unexpected error occur")
            }
        }
        getFriends()
    }, [user?._id])

    const HomeRightBar = () => {
        return (
            <><div className="birthdayContainer">
                <img src={`${PF}gift.png`} alt="" className='birthdayImg' />
                <span className='birthdayText'><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today</span>
            </div>
                <img src={`${PF}ad.png`} alt="" className='rightbarAd' />
                <h4 className="rightbarTitle">
                    Online Friends
                </h4>
                <ul className="rightbarFriendList">
                    {Users.map(e => {
                        return (
                            <Online key={e?.id} details={e} />
                        )
                    })}
                </ul></>
        )
    }
    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`http://localhost:5000/api/user/${user._id}/unfollow`, { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id })
            } else {
                await axios.put(`http://localhost:5000/api/user/${user._id}/follow`, { userId: currentUser._id })
                dispatch({ type: "FOLLOW", payload: user._id })
            }

        } catch (error) {
            console.log(error)
        }
        setFollowed(!followed)
    }

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button onClick={handleClick} className="rightbarFollowerButton">
                        {
                            followed ? "Unfollow" : "Follow"
                        }
                        {
                            followed ? <AiOutlineMinus /> : <AiOutlinePlus />
                        }
                    </button>
                )}
                <h4 className='rightbarTitle'>User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>


                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship !== null ? "Married" : "Single"}</span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>User Friends</h4>

                <h4 className="rightbarTitle">
                    <div className="rightbarFollowings">
                        {friends?.length >= 1 ? friends?.map((e) => {
                            return (
                                <NavLink key={e._id} to={`/profile/${e?.username}`} style={{ textDecoration: "none", color: "black", textAlign: "center" }}><div className="rightbarFollwing">
                                    <img className='rightbarFollwingImg' src={`${PF}person/5.jpeg`} alt="" />
                                    <span className="rightbarFollwingName">{e.username}</span>
                                </div></NavLink>
                            )
                        }) : "No friends to show"}
                    </div>
                </h4>
            </>
        )
    }



    return (
        <div className='rightbar'>
            <div className="rightWrapper">
                {user ? <ProfileRightbar /> : <HomeRightBar />}
            </div>
        </div>
    )
}
