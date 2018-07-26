import React from 'react';
import {
  Container,
  Card, CardImg, CardBody,
  CardTitle, Button
  } from 'reactstrap';

const Posts = props => (
			<Container>
 				{
					props.postcontents.map((post, index) => {
						return (
							<Card key={index} className='mt-3 pb-3'>

									{post.thegoodartisan_featured_media &&
					                    <CardImg top width="100%"
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
			</Container>

);
export default Posts;
