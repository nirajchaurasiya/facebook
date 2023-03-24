import './closefriends.css'
export default function Closefriends({ details }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="sidebarFriend">
            <img className='sidebarFriendImg' src={PF + details?.profilePicture} alt="" />
            <span className='sidebarFriendName'>
                {details?.username}
            </span>
        </li>
    )
}
