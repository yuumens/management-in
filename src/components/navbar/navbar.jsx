import {Navbar, Container, Nav, Form} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Navbars = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">managementIn</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/addproduct'}>Add Product</NavLink>
          </Nav>
          <div>
            <Form.Control type='text' placeholder='Search Product'/>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbars