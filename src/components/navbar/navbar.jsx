import {Navbar, Container, Nav, Form} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState } from 'react'

const Navbars = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch(query);
    };
  
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">managementIn</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-4 m-2">
            <NavLink to={'/addproduct'} >Add Product</NavLink>
          </Nav>
          <div>
        <Form.Group controlId="searchProduct">
            <Form.Control 
                type='text' 
                placeholder='Search Product'
                value={searchQuery}
                onChange={handleSearch}
            />
        </Form.Group>
    </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

Navbars.propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

export default Navbars