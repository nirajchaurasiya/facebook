import './post.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLike, setIsLike] = useState(false)
    const [users, setUsers] = useState({})
    const { user } = useContext(AuthContext)



    useEffect(() => {
        setIsLike(post.likes.includes(user._id))
    }, [user._id, post._likes])

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: user._id });
        } catch (error) {
            console.log("An unexpected error occured");
        }
        setLike(isLike ? like - 1 : like + 1)
        setIsLike(!isLike);
    }
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const fetchAllPostsFromApi = async () => {
        const res = await axios.get(`/user?userId=${post.userId}`)
        setUsers(res.data);
    }
    useEffect(() => {
        fetchAllPostsFromApi()
    }, [post?.userId])
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <NavLink to={`/profile/` + users.username}> <img src={users?.profilePicture ? PF + users?.profilePicture : `${PF}person/1.jpeg`} className='postProfileImg' alt="" />
                        </NavLink>
                        <span className='postUsername'>{users?.username}</span>
                        <span className='postDate'>{format(post?.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <BsThreeDotsVertical />
                    </div>
                </div>
                <div className="postCenter">
                    <span className='postText'>
                        {post?.desc}
                    </span>
                    <img src={PF + post.img} alt="" className='postImage' />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${PF}like.png`} alt="" className='likeIcon' onClick={likeHandler} />
                        <img src={`${PF}heart.png`} alt="" className='likeIcon' onClick={likeHandler} />
                        <span className='postLikeCounter'>{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post?.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
