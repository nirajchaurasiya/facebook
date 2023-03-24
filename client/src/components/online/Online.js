import './online.css'
export default function Online({ details }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img src={PF + details?.profilePicture} className='rightbarProfileImg' alt="" />
                <span className='rightbarOnline'></span>
            </div>

            <span className="rightbarUsername">{details?.username}</span>

        </li>
    )
}
