import React, { Component } from 'react';
import '../App.css';
import axios from 'axios'
import {BrowserRouter, Router, Switch, Route, Link} from 'react-router-dom'

import appleLogo from "../apple.png";
import googlePlayLogo from "../google-play.png";
import screenshot from "../screenshot_portrait.png";

class Home extends React.Component {
	
	componentDidMount() {
//		window.location.assign('kwizu://quizzings/1/3');
	}

	render() {
		return (
			<div class="main flex">
				<div class="container phone-container">
					<img src={screenshot} alt="screenshot" />
				</div>
				<div class="container description-container">
					<div>
						<h1>
							Kwizu = Quizzes + You
						</h1>
						<p>
							A refreshing twist on the classic personality tests is brought to you by 
							many nights of caffeine and creative adrenaline. 
							We hope that you have smiled and laughed while 
							taking our quizzes.
						</p>
						<div class="store-links">
							<a href="https://apps.apple.com/us/app/dreamemo/id1524239390?ls=1">
								<button class="store-link apple">
									<img src={appleLogo} alt="apple" />
									<span>App Store</span>
								</button>
							</a>
							<button class="store-link google-play">
								<img src={googlePlayLogo} alt="google-play" />
								<span>Google Play</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
