import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Link } from "react-router-dom";
import { WP_REST_ROUTE } from './WP-Route/Rest-Route'
import axios from 'axios';
import Posts from './Pages/Posts';
import Pages from './Pages/Pages';
import Loading from './Pages/Loading';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
   } from 'reactstrap';


   const PageNotFound = ({ location, pageLoad, match }) => (

     pageLoad
       ?   (<div>
             <h3>Oops! That page <code>{location.pathname}</code> can’t be found.</h3>
             <p>It looks like nothing was found at this Page or URL.</p>
           </div>)

       :  <Loading />


   );


class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      menus: [],
      postsRoute: [],
      pagesRoute: [],
      postPagaIDRoute: {},
      pageLoad: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {

    const ROOTURL = window.wp_root_URL !== undefined ? window.wp_root_URL : WP_REST_ROUTE.ROOTURL;

    const wp_rest_menus = ( ROOTURL + '/wp-json/thegoodartisan/menu' );
    const wp_rest_posts = ( ROOTURL + '/wp-json/wp/v2/posts' );
    const wp_rest_pages = ( ROOTURL + '/wp-json/wp/v2/pages' );
    const wp_rest_PostPageID = ( ROOTURL + '/wp-json/thegoodartisan/page-post/id' );

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
                    postPagaIDRoute: postPageData.ID, // from: postPageData res: {ID: 15} change to: postPageData.ID res: 15
                    pageLoad: true
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
              <Link to='/' className="navbar-brand">TheGoodArtisan</Link>
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
            {this.state.pagesRoute.map((page, index) => {

               return (
                   <Route
                     key={index}
                     exact
                     path={ `/${ page.title.rendered.replace(/\s+/g, '-').toLowerCase()}/` }
                     render={({match}) => console.log(match.url) || (
                       ( match.path === `/${ page.title.rendered.replace(/\s+/g, '-').toLowerCase()}/` && this.state.postPagaIDRoute !== page.id  )
                       ? <Pages pageFeaturedImage={page.thegoodartisan_featured_media} pageTitle={page.title.rendered} pageContent={page.content.rendered} />
                       : <Posts postcontents={this.state.postsRoute} />

                     )}
                   />
               )

             })}

             <Route exact path='/' render={() => (
                       this.state.pagesRoute.filter( pContent => pContent.title.rendered === 'Home')
                       .map(pContent => <Pages key={pContent.id}
                      pageTitle={pContent.title.rendered}
                      pageContent={pContent.content.rendered} />
                      ))}
              />

              <Route exact render={(props) => <PageNotFound {...props} pageLoad={this.state.pageLoad} />} />

          </Switch>

          <Container>
            <Row>
              <footer className="col site-footer bg-light">
              		<div className="site-info text-center my-3 pt-5 pb-5">
              		<a href="https://wordpress.org/">
              				Proudly powered by WordPress</a>  &amp; <a href="https://reactjs.org/">
                  				ReactJS</a>
              			<span> | </span>
              				Coded by <a href="http://thegoodartisan.com">baymax</a>.

                      </div>
              	</footer>
            </Row>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
