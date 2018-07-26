import React from "react";
import {
  Container
  } from 'reactstrap';

const Pages = props => (
	<Container>
		<h2 dangerouslySetInnerHTML={{ __html:props.pageTitle }} />
		{props.pageFeaturedImage &&
            <img width="100%" className='img-fluid'
            	src={props.pageFeaturedImage}
                alt={props.pageTitle} />
		}
		<div dangerouslySetInnerHTML={{ __html:props.pageContent }} />
	</Container>
);

export default Pages;
