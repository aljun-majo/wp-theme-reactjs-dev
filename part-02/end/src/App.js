import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
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
  NavLink
   } from 'reactstrap';

const Home = () => (
  <Container className='mt-5'>
    <div className='text-center'>
      Home Page.
    </div>
  </Container>
)

const About = () => (
  <Container className='mt-5'>
    <div className='text-center'>
      About Page.
    </div>
  </Container>
)

const Services = () => (
  <Container className='mt-5'>
    <div className='text-center'>
      Services Page.
    </div>
  </Container>
)

const Gallery = () => (
  <Container className='mt-5'>
    <div className='text-center'>
      Gallery Page.
    </div>
  </Container>
)

const Contact = () => (
  <Container className='mt-5'>
    <div className='text-center'>
      Contact Page.
    </div>
  </Container>
)


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
      <BrowserRouter>
        <div>
          <Navbar color="light" light expand="md">
            <Container>
              <NavbarBrand href="/">TheGoodArtisan</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/home">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/about">About</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/services">Services</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/gallery">Gallery</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/contact">Contact</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/github">GitHub</NavLink>
                  </NavItem>

                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <Switch>
            <Route exact path="/" render={() => <div className='container'><p>Front-page Route.</p></div>} />
            <Route path="/home" component={Home} />
            <Route path="/about"  component={About} />
            <Route path="/services"  component={Services} />
            <Route path="/gallery"  component={Gallery} />
            <Route path="/contact"  component={Contact} />
            <Route path="/github" render={() => <div className='text-center'>https://github.com/jun20</div>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
