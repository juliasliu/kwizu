import firebase from 'firebase';

var firebaseConfig = {
		apiKey: "AIzaSyBIt9xj_pVFBNUhT6P8-kj1D9XQZMkqPrc",
		authDomain: "kwizu123.firebaseapp.com",
		databaseURL: "https://kwizu123.firebaseio.com",
		projectId: "kwizu123",
		storageBucket: "kwizu123.appspot.com",
		messagingSenderId: "358186761271",
		appId: "1:358186761271:web:6c6e7aa3c388882e3d93b2",
		measurementId: "G-2D8Y0LBZ0E"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();