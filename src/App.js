import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// components
import Footer from './components/Footer';

// containers
import HeaderContainer from './containers/HeaderContainer';
import Home from './containers/Home.js';
import DangNhap from './containers/DangNhap';
import DanhSachBaiHocContainer from './containers/DanhSachBaiHocContainer';
import ChiTietBaiHocContainer from './containers/ChiTietBaiHocContainer';
import DangKy from './containers/DangKy';
import UpdateProfileContainer from './containers/UpdateProfileContainer';
import CheckAuthenticated from "./containers/CheckAuthenticated";
import ExerciseListContainer from './containers/ExerciseListContainer';
import Game from './components/Game';
import ExerciseQuestionContainer from './containers/ExerciseQuestionContainer';

// css
import './App.css';
import NavBarContainer from './containers/NavBarContainer';
import ChatBox from './containers/ChatBox';
import ExerciseResultContainer from './containers/ExerciseResultContainer';
import NotFound from './components/NotFound';

const HelloWorld = function (props) {
	return <div>Hello world</div>
}

class App extends Component {

	render() {
		return (
			<Router>
				<div>
					{this.props.isRequesting ?
						<div className="spinner-container d-flex justify-content-center align-items-center">
							<div className="spinner"></div>
						</div> : null
					}
					<HeaderContainer></HeaderContainer>
					<NavBarContainer></NavBarContainer>
					<Container fluid id="main-content-container" className="d-flex align-items-start">
						{/* Row bọc ngoài cùng của 1 view cần phải xài thêm class flex-md-grow-1 */}
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/dang-nhap" component={DangNhap} />
							<Route exact path="/bai-hoc/:monhoc(toan|tieng-viet)" component={DanhSachBaiHocContainer} />
							<Route exact path="/bai-hoc/:monhoc(toan|tieng-viet)/:idbaihoc" component={ChiTietBaiHocContainer} />
							<Route exact path="/dang-ky" component={DangKy} />
							<Route exact path="/cap-nhat-tai-khoan" component={CheckAuthenticated(UpdateProfileContainer)} />
							<Route path="/tro-choi" component={Game} />
							<Route exact path="/bai-tap/:monhoc(toan|tieng-viet)" component={ExerciseListContainer} />
							<Route exact path="/bai-tap/:monhoc(toan|tieng-viet)/:topicId" component={ExerciseQuestionContainer} />
							<Route exact path="/bai-tap/ket-qua" component={ExerciseResultContainer} />
							<Route exact path="/teacher-chat-box" component={CheckAuthenticated(HelloWorld)} />
							<Route component={NotFound} />
						</Switch>
					</Container>
					<Footer></Footer>
					<ChatBox className="chatbox"></ChatBox>
				</div>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	return {
		isRequesting: state.isRequesting
	}
}

export default connect(mapStateToProps)(App);
