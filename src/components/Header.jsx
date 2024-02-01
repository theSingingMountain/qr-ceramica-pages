import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button"
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";
import { Form } from 'react-bootstrap';

import "../switch.css"
export default function Header({show, onChangeState, disabled}) {
  const navigate = useNavigate()
  async function handleLogout() {
    try {
      const logout = await signOut(auth)
      return navigate("/login", { replace: true })
    }
    catch(error) {
      return error.message;
    }
  }

  const handleClick = () => {
    onChangeState(!show)
  }
  return (
    <Navbar expand="sm" className="bg-body-tertiary header" id="navbar--height">
      <Container className="ms-2 w-100">
        <NavLink to="/" end className="navbar-brand"><img src="/android-chrome-512x512.png" width="64px" height="64px"></img></NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavLink to="/" className="nav-link">Add Product</NavLink>
            <div className='d-flex justify-content-lg-center align-items-center nav-link gap-1'>
              <label className="switch ">
                <input type="checkbox" name="export-btn" checked={show} onChange={handleClick} disabled={disabled}/>
                <span className="slider round"></span>
              </label>
              <div style={{userSelect: "none", cursor: "pointer"}} onClick={handleClick} disabled={disabled}>Exports</div>
            </div>
            <NavLink to="/delete" className="nav-link">Delete Product</NavLink>
            <button className="nav-link header--button" onClick={handleLogout}>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}