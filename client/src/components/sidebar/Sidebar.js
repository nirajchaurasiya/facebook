import './sidebar.css'
import { MdBookmark, MdChat, MdGroups, MdOutlineWork, MdRssFeed } from 'react-icons/md'
import { AiFillQuestionCircle, AiFillVideoCamera } from 'react-icons/ai'
import { BsFillCalendarEventFill } from 'react-icons/bs'
import { FaGraduationCap } from 'react-icons/fa'
import { Users } from '../../dummyData'
import Closefriends from '../closeFriend/Closefriends'
export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <MdRssFeed className='sidebarIcon' />
                        <span className='sidebarListItemText'>Feed</span>
                    </li>

                    <li className="sidebarListItem">
                        <MdChat className='sidebarIcon' />
                        <span className='sidebarListItemText'>Chats</span>
                    </li>

                    <li className="sidebarListItem">
                        <AiFillVideoCamera className='sidebarIcon' />
                        <span className='sidebarListItemText'>Videos</span>
                    </li>

                    <li className="sidebarListItem">
                        <MdGroups className='sidebarIcon' />
                        <span className='sidebarListItemText'>Groups</span>
                    </li>

                    {/*  */}
                    <li className="sidebarListItem">
                        <MdBookmark className='sidebarIcon' />
                        <span className='sidebarListItemText'>Bookmarks</span>
                    </li>

                    <li className="sidebarListItem">
                        <AiFillQuestionCircle className='sidebarIcon' />
                        <span className='sidebarListItemText'>Questions</span>
                    </li>

                    {/*  */}
                    <li className="sidebarListItem">
                        <MdOutlineWork className='sidebarIcon' />
                        <span className='sidebarListItemText'>Jobs</span>
                    </li>

                    <li className="sidebarListItem">
                        <BsFillCalendarEventFill className='sidebarIcon' />
                        <span className='sidebarListItemText'>Events</span>
                    </li>

                    <li className="sidebarListItem">
                        <FaGraduationCap className='sidebarIcon' />
                        <span className='sidebarListItemText'>Courses</span>
                    </li>
                </ul>

                <button className='sidebarButton'>
                    Show More
                </button>
                <hr className='sidebarHr' />

                <ul className="sidebarFriendList">
                    {Users.map((e) => {
                        return (
                            <Closefriends key={e?.id} details={e} />
                        )
                    })}
                </ul>

            </div>
        </div>
    )
}
