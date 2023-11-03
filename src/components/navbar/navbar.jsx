import {Navbar, Container, Nav, Form} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState } from 'react'
import managementDark from '../../assets/managementDark.png'

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
        <Navbar.Brand href="/"><img src={managementDark} alt="managementInLogo" style={{width : '210px'}}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-4 p-2 navs-link">
            <NavLink to={'/addproduct'} className='nav-link' >Add Product</NavLink>
            <NavLink to={'/chatbot'} className='nav-link' >Ask ChatBot</NavLink>
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