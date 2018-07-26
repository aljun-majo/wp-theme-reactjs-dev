import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render() {
    return (
      <div>
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">TheGoodArtisan</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Services</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Gallery</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Contact</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/jun20">GitHub</NavLink>
              </NavItem>

            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      </div>
    );
  }
}

export default App;
