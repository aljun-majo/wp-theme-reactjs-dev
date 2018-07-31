import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem

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
      isOpen: false,
      menus: [],
      postsRoute: [],
      pagesRoute: [],
      postPagaIDRoute: {}
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {

    const wp_rest_menus = ( 'http://thegoodartisan-live.localhost/wp-json/thegoodartisan/menu' );
    const wp_rest_posts = ( 'http://thegoodartisan-live.localhost/wp-json/wp/v2/posts' );
    const wp_rest_pages = ( 'http://thegoodartisan-live.localhost/wp-json/wp/v2/pages' );
    const wp_rest_PostPageID = ( 'http://thegoodartisan-live.localhost/wp-json/thegoodartisan/page-post/id' );

   return axios.all([
         axios.get( wp_rest_menus ),
         axios.get( wp_rest_pages ),
         axios.get( wp_rest_posts ),
         axios.get( wp_rest_PostPageID )
       ])
       .then(axios.spread((menuCotents, pageContents, postContents, postPageId) => {
                const mContent = menuCotents.data || [];
                const pagesData = pageContents.data || [];
                const postsData = postContents.data || [];
                const postPageData = postPageId.data || [];

                this.setState({
                    menus: mContent,
                    postsRoute: postsData,
                    pagesRoute: pagesData,
                    postPagaIDRoute: postPageData.ID // from: postPageData {ID: 15} change to: postPageData.ID
                })
            // console.log("menuCotents:menuCotents.menus",this.state.menus)
            }));

  }


  render() {
    console.log('Menus State: ', this.state.menus);
    console.log('postsRoute State: ', this.state.postsRoute);
    console.log('pagesRoute State: ', this.state.pagesRoute);
    console.log('postPagaIDRoute State: ', this.state.postPagaIDRoute);
    return (
      <BrowserRouter>
        <div>
          <Navbar color="light" light expand="md">
            <Container>
              <NavbarBrand href="/">TheGoodArtisan</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>

                  {this.state.menus.map((menu, index) => {
                    return (


                        <Route
                          key={index}
                          path={`/${menu.title.replace(/\s+/g, '-').toLowerCase()}`}
                          children={({match}) => (
                            <NavItem className={match ? "active" : ""}>
                              <Link to={`/${menu.title.replace(/\s+/g, '-').toLowerCase()}`} className='nav-link'>{menu.title}</Link>
                            </NavItem>
                          )}
                        />

                    )
                  })}

                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <Switch>
            <Route exact path="/" render={() => <div className='container'><p>Front-page Route.</p></div>} />
            <Route path="/Home" component={Home} />
            <Route path="/About" component={About} />
            <Route path="/services"  component={Services} />
            <Route path="/gallery"  component={Gallery} />
            <Route path="/contact"  component={Contact} />
            <Route path="/github" render={() => <div className='text-center'>https://github.com/jun20</div>} />
          </Switch>

          <p className='text-center mt-5'>WP REST API Menus <em><code>(Please check the Console Tab)</code></em>:
          <span className='d-none'>{`${console.log('Menus in Render Method: ', this.state.menus)}`}</span>
          </p>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
