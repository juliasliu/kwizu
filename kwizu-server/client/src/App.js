import React, { Component } from 'react';
import logo from './icon-clear.png';
import './App.css';
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import Home from './screens/Home'
import TermsOfService from './screens/TermsOfService'
import PrivacyPolicy from './screens/PrivacyPolicy'
import Team from './screens/Team'
import Contact from './screens/Contact'

class App extends React.Component {
	
	state = {
//			backgroundStyle: {},
	}
	
	componentDidMount() {
//		window.location.assign('kwizu://quizzings/1/3');
//		this.startBackgroundAnimation();
	}
	
	startBackgroundAnimation() {
		var colors = new Array(
				[62,35,255],
				[60,255,60],
				[255,35,98],
				[45,175,230]);

		var step = 0;
		//color table indices for: 
		// current color left
		// next color left
		// current color right
		// next color right
		var colorIndices = [0,1,2,3];

		//transition speed
		var gradientSpeed = 0.002;
		
		setTimeout(() => this.updateGradient(colors, step, colorIndices, gradientSpeed), 10);
	}
	
	updateGradient(colors, step, colorIndices, gradientSpeed) {
		var color1;
		var color2;
		
		var backgroundStyle;
		
		var c0_0 = colors[colorIndices[0]];
		var c0_1 = colors[colorIndices[1]];
		var c1_0 = colors[colorIndices[2]];
		var c1_1 = colors[colorIndices[3]];

		var istep = 1 - step;
		var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
		var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
		var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
		color1 = "rgb("+r1+","+g1+","+b1+")";

		var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
		var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
		var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
		color2 = "rgb("+r2+","+g2+","+b2+")";

		backgroundStyle = {
			background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"
		}
		this.setState({backgroundStyle})
		
		step += gradientSpeed;
		if ( step >= 1 )
		{
			step %= 1;
			colorIndices[0] = colorIndices[1];
			colorIndices[2] = colorIndices[3];

			//pick two new target color indices
			//do not pick the same as the current one
			colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
			colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

		}
		
		setTimeout(() => this.updateGradient(colors, step, colorIndices, gradientSpeed), 10);
	}

	render() {
		
		return (
			<div class="body">
				<div id="gradient" style={{background: "-webkit-gradient(linear, left top, right top, from(#476794), to(#994399))"}}></div>
				<header class="header">
		            <span class="header-left">
			          <Link to="/" class="logo">
			          	<img src={logo} alt="Logo" />
			          </Link>
		            </span>
		            <span class="header-center">
			          <ul>
			            <li>
			              <Link to="/terms-of-service">Terms of Service</Link>
			            </li>
			            <li>
			              <Link to="/privacy-policy">Privacy Policy</Link>
			            </li>
			            <li>
			              <Link to="/team">Team</Link>
			            </li>
			            <li>
			              <Link to="/contact">Contact</Link>
			            </li>
				      </ul>
			        </span>
			        <span class="header-right">
			          <ul>
			            <li>
			              <Link to="/terms-of-service">
			              
			              </Link>
			            </li>
			            <li>
			              <Link to="/">
			              	<FaFacebook />
			              </Link>
			            </li>
			            <li>
			              <Link to="/">
			              	<FaTwitter />
			              </Link>
			            </li>
			            <li>
			              <Link to="/">
			              	<FaGithub />
			              </Link>
			            </li>
				      </ul>
			        </span>
		        </header>
				<div>
					<Route exact path="/terms-of-service" component={TermsOfService} />
			        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
					<Route exact path="/team" component={Team} />
			        <Route exact path="/contact" component={Contact} />
			        <Route exact path="/" component={Home} />
			    </div>
			 </div>
		);
	}
}

export default App;
