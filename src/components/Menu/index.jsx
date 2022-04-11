import React from "react"
import { Link } from "react-router-dom"

function Menu(props) {
  
  return(
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className={props.active === 'contacts' ? "nav-link active": "nav-link"} to="/contacts">
          Contacts
        </Link>
      </li>
      <li className="nav-item">
        <Link className={props.active === 'userprofile' ? "nav-link active": "nav-link"} to="/userprofile">
          Profile
        </Link>
      </li>
    </ul>
  )
}

export default Menu