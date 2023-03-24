import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './profile.css'
import { useParams } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
export default function Profile({ }) {
  const [users, setUsers] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { username } = useParams()
  const { user } = useContext(AuthContext)
  const fetchAllPostsFromApi = async (username) => {
    const res = await axios.get(`/user?username=${username}`)
    console.log(res.data)

    setUsers(res.data)
  }
  useEffect(() => {
    fetchAllPostsFromApi(username)
  }, [username])
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={users.coverPicture ? PF + users.coverPicture : PF + `post/1.jpeg`} alt="" className='profileCoverImg' />
              <img src={user.profilePicture ? PF + user.profilePicture : PF + `person/6.jpeg`} alt="" className='profileUserImg' />
            </div>
            <div className="profileInfo">
              <h4 className='profileInfoName'>{users.username}</h4>
              <p className='profileInfoDesc'>{users.desc ? users.desc : `Hello! My Friends`}</p>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={users.username} />
            <Rightbar profile user={users} />
          </div>
        </div>
      </div>
    </>
  )
}
