import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './TitleBox.css';

export default class TitleBox extends Component {

	render() {
		let titleBoxHeaderStyle = {
			color: '#' + ((this.props.color & 0xfefefd) >> 1).toString(16)
		}

		let titleBoxContentStyle = {
			backgroundColor: '#' + this.props.color.toString(16)
		}
		return (
			<Row className="title-box my-1 mx-0">
				{/* <Col xs="12" className="d-flex justify-content-end"></Col> */}
				<Col xs="6" md="4" className="d-flex flex-column align-items-center py-2 px-1">
					<div className="title-box-header" style={titleBoxHeaderStyle}>{this.props.header}</div>
					<img className="title-box-img" alt="" src={this.props.src}></img>
				</Col>
				<Col xs="6" md="8" className="title-box-content d-flex align-items-center" style={titleBoxContentStyle}>
					<ul className="m-0">
						<li><Link to={this.props.baseLink + '/toan'}>Toán</Link></li>
						<li><Link to={this.props.baseLink + '/tieng-viet'}>Tiếng Việt</Link></li>
					</ul>
				</Col>
			</Row>
		)
	}
}



