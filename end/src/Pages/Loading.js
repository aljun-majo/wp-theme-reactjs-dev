import React from 'react';
import '../App.css';
import {
  Container
  } from 'reactstrap';

const Loading = props => (
			<Container className='text-center py-5'>
 				<h4>I am working and this Page is loading :)</h4>
        		<p>Please wait...</p>
        		<hr />
				<div>
					<div className='lds-spin text-center mx-auto d-block py-5 my-5'>
						<div>
							<div>
							</div>
						</div>
						<div>
							<div>
						<	/div>
						</div>
						<div>
							<div>
							</div>
						</div>
						<div>
							<div>
							</div>
						</div>
						<div>
							<div>
							</div>
						</div>
						<div>
							<div>
							</div>
						</div>
						<div>
							<div>
							</div>
						</div>
						<div>
							<div>
							</div>
						</div>
					</div>
				</div>
			</Container>

);
export default Loading;
