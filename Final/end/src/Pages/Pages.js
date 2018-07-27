import React from "react";
import {
  Container,Row
  } from 'reactstrap';

const Pages = props => (
	<Container>
    <Row>
  		<h2 dangerouslySetInnerHTML={{ __html:props.pageTitle }} />
  		{props.pageFeaturedImage &&
              <img className='img-fluid'
              	src={props.pageFeaturedImage}
                  alt={props.pageTitle} />
  		}
  		<div dangerouslySetInnerHTML={{ __html:props.pageContent }} />
    </Row>
	</Container>
);

export default Pages;
