import "./share.css";
import { MdEmojiEmotions, MdLabel, MdLocationPin, MdPermMedia } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function Share({ username }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useContext(AuthContext)
    const desc = useRef()
    const [file, setFile] = useState(null)
    const submitHandler = async () => {
        const newPosts = {
            userId: user._id,
            desc: desc.current.value,
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName)
            data.append("file", file);
            newPosts.img = fileName
            try {
                await axios.post("/upload", data)
                    .then((data) => {
                        console.log(data.data)
                    })
                    .catch((err) => {
                        console.log("An unexpected error occured")
                    })
            } catch (error) {
                console.log(error)
            }
        }
        try {
            axios.post("/posts", newPosts)
                .then((data) => {
                    console.log(data.data)
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log("Error")
        }

    }


    return (

        <div className="shareItem">
            <div className="share">
                <div className="shareWrapper">
                    <div className="shareTop">
                        {username ?
                            <NavLink to={`/profile/${username}`}>
                                <img src={user.profilePicture ? `${PF + user.profilePicture}` : PF`person/3.jpeg`} alt="" className="shareProfileImage" />
                            </NavLink> :
                            <img src={user.profilePicture ? PF + user.profilePicture : PF`person/3.jpeg`} alt="" className="shareProfileImage" />}
                        <textarea ref={desc} cols="4" rows="2" className='shareInput' placeholder={`What's in your mind, ${user.username}?`} style={{ resize: "none" }} />
                    </div>
                    <hr className="shareHr" />
                    <div className="shareBottom">
                        <div className="shareOptions">
                            <label htmlFor="file" className="shareOption">
                                <MdPermMedia color="tomato" className="shareIcon" />
                                <span className='shareOptionText'>Photo or Video</span>
                                <input hidden type="file" name="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => { setFile(e.target.files[0]) }} />
                            </label>

                            <div className="shareOption">
                                <MdLabel color="blue" className="shareIcon" />
                                <span className='shareOptionText'>Tag</span>
                            </div>

                            <div className="shareOption">
                                <MdLocationPin color="green" className="shareIcon" />
                                <span className='shareOptionText'>Location</span>
                            </div>

                            <div className="shareOption">
                                <MdEmojiEmotions color='goldenrod' className="shareIcon" />
                                <span className='shareOptionText'>Feeling</span>
                            </div>
                        </div>

                        <button className="shareButton" onClick={submitHandler}>
                            Share
                        </button>

                    </div>

                </div>

            </div>

            <div className="divimagesToShow">
                {file && <img src={URL.createObjectURL(file)} alt="" className="imagesToShow" />}
            </div>
        </div>
    )
}
