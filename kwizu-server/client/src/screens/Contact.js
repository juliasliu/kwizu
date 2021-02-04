import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios'
import {BrowserRouter, Router, Switch, Route, Link} from 'react-router-dom'

class App extends React.Component {
	
	
	componentDidMount() {
//		window.location.assign('kwizu://quizzings/1/3');
	}

	render() {
		return (
			<div class="main">
				<h1 class="title">Contact Us</h1>

				<div class="card">
				<h2>Questions and Feedback</h2>

				<p>
					If you have specific questions or feedback using our app, please direct them to <a href={"mailto:kwizu.app@gmail.com"}>kwizu.app@gmail.com</a>.
					Please refrain from spamming or sending inappropriate content; doing so will result in immediate expulsion from using our app and 
					we will be blocking your email address for future messages.
				</p>

				<h2>Report a Problem, User, or Content</h2>

				<p>We want your experience using our app to be as smooth and safe as possible. If you have run into a bug while using the app, 
				or have encountered user(s) engaging in suspicious or offensive activity or kwizzes with malicious or inappropriate content,
				please let us know in the app immediately.
				</p>
				<p>Navigate to your Profile > Settings in the mobile app and then select the corresponding page in order to submit a ticket. 
				For more urgent situations, feel free to email us.
				</p>
				
				</div>
			</div>
		);
	}
}

export default App;
