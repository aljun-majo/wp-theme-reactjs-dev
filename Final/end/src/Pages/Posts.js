import React from 'react';
import {
  Container, Row,
  Card, CardImg, CardBody,
  CardTitle, Button
  } from 'reactstrap';

const Posts = props => (
			<Container>
        <Row>
   				{
  					props.postcontents.map((post, index) => {
  						return (
  							<Card key={index} className='mt-3 pb-3'>

  									{post.thegoodartisan_featured_media &&
  					                    <CardImg top 
  					                    	src={post.thegoodartisan_featured_media}
  					                        alt={post.title.rendered} />
          							}

  						        <CardBody>

  						          <CardTitle dangerouslySetInnerHTML={{ __html:post.title.rendered }} />


  						          <div className='card-text' dangerouslySetInnerHTML={{ __html:post.content.rendered }} />

  						          <Button>Read more...</Button>
  						        </CardBody>



  							</Card>
  							)

  						})
  				}
        </Row>
			</Container>

);
export default Posts;
