import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="firstpage/" className="link">
          First page
        </Link>

        <Link to="/secondpage" className="link">
          Second page
        </Link>
      </nav>
    </div>
  )
}

export default Navbar
