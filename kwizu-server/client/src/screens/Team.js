import React, { Component } from 'react';
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
				<h1 class="title">Join Our Team</h1>

				<div class="card">
				<h2>Marketing Lead</h2>
				<h5>What You Will Do</h5>
				<ul>
					<li>Publishing content regularly on our various social media channels</li>
					<li>Monitor social media channels for inquiries and assist in engaging with the followers.</li>
					<li>Manage social groups and provide customer service.</li>
					<li>Work with marketing team to oversee various events and campaigns, develop and implement new branding strategies to gain awareness of the company.</li>
					<li>Assisting with additional social media and marketing responsibilities as needed.</li>
				</ul>
				<h5>Preferred Experience</h5>
				<ul>
					<li>Familiar with Facebook, Twitter, LinkedIn, Instagram, and Medium.</li>
					<li>Strong writing and communication skills.</li>
					<li>Proficient in graphic design and is familiar with Adobe Photoshop and Illustrator.</li>
				</ul>
				<h5>How to Apply</h5>
				<p>Send an email to <a href="mailto:kwizu.app@gmail.com">kwizu.app@gmail.com</a> with your attached resume (PDF) and a brief introduction of who you are and why you are interested.
				Feel free to attach relevant design materials to showcase your work.
				</p>

				<h2>Technology Lead</h2>
				<h5>What You Will Do</h5>
				<ul>
					<li>Code the frontend (React, React Native) and backend APIs (Ruby on Rails) of the website and app.</li>
					<li>Debug and organize the code repository and maintain code documentation.</li>
					<li>Manage and oversee the running of AWS server instances and security groups.</li>
					<li>Expected to be on-call frequently and responsive to company-wide communication.</li>
				</ul>
				<h5>Preferred Experience</h5>
				<ul>
					<li>Very skilled in React, React Native, Ruby on Rails, AWS, and Firebase.</li>
					<li>Has previously completed a full-stack project or has had prior experience working at a software engineering position.</li>
					<li>Preferably an Android programmer, but iOS programmer also accepted.</li>
					<li>Familiar with REST APIs and open-source code development.</li>
					<li>Strong leadership and communication skills.</li>
				</ul>
				<h5>How to Apply</h5>
				<p>Send an email to <a href="mailto:kwizu.app@gmail.com">kwizu.app@gmail.com</a> with your attached resume (PDF) and a brief introduction of who you are and why you are interested.
				Feel free to link any relevant websites or apps you have made or provide a Github link.
				</p>

				<h2>Strategy Lead</h2>
				<h5>What You Will Do</h5>
				<ul>
					<li>Support the development of competitive strategy</li>
					<li>Manage an important workstream on strategic projects, delivering actionable recommendations for key clients.</li>
					<li>Coordinate execution of recommendations with key stakeholders as needed for workstream</li>
					<li>Conduct key qualitative (e.g., primary research, synthesis of secondary data sources) and quantitative (e.g., Excel modelling) analysis in support of deliverables</li>
				</ul>
				<h5>Preferred Experience</h5>
				<ul>
					<li>Prior work experience, preferably at a strategy consulting firm (technology client work), corporate development/strategy role at a major tech company</li>
					<li>Practical knowledge of finance and valuation analyses, strong analytical ability and oral and written communication skills.</li>
				</ul>
				<h5>How to Apply</h5>
				<p>Send an email to <a href="mailto:kwizu.app@gmail.com">kwizu.app@gmail.com</a> with your attached resume (PDF) and a brief introduction of who you are and why you are interested.</p>
				
				<h2>Finance Lead</h2>
				<h5>What You Will Do</h5>
				<ul>
					<li>Analyze financial performance by highlighting trends and anomalies</li>
					<li>Streamline reporting through the use of databases such as Tableau or with Excel macros</li>
					<li>Partner with cross functional groups and business partners to analyze the business</li>
					<li>Provide insights and recommendations for operational improvements and innovations</li>
				</ul>
				<h5>Preferred Experience</h5>
				<ul>
					<li>Excellent modeling skills (e.g. Microsoft Office Excel; experience with Microsoft PowerQuery/Power BI and/or SQL a plus)</li>
					<li>Excellent analytical and written communication skills</li>
					<li>Bonus: data science (Python, Tableau) skills</li>
				</ul>
				<h5>How to Apply</h5>
				<p>Send an email to <a href="mailto:kwizu.app@gmail.com">kwizu.app@gmail.com</a> with your attached resume (PDF) and a brief introduction of who you are and why you are interested.</p>
				
				</div>
			</div>
		);
	}
}

export default App;
