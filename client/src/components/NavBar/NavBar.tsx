import { FunctionComponent } from "react"
import { useUser } from "../../context/UserContext"
import './NavBar.css'


const NavBar: FunctionComponent = () => {

  const {handleLogOut} = useUser();

  return (
    <div className="navbar">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
        News
      </div>
      <div className="logout" onClick={() => handleLogOut()}>
        Logout
      </div>
    </div>
  )
}

export default NavBar