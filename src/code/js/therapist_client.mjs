/**
 * 
 */

import { WebSocket } from 'ws';
import { default as prompt_maker } from 'prompt-sync';
 
const prompt = prompt_maker({"sigint" : true});
 
//import { "prompt-sync" };
  
// var ws = new WebSocket("ws://localhost:8888/websocket");

const SERVER_URL = "ws://localhost:8888/therapist"

class TherapistClient {

	/**
	 * Entry point; contacts Therapist server.
	 */
	constructor() {
		let client = new WebSocket(SERVER_URL);
		client.onopen = function() {
		   client.send("Hello, world");
		};

	client.onmessage = function (evt) {
	   console.log(evt.data);
	   console.log("Next msg to send: ");
	   
	   client.send(new_msg);
	};
		}
}	

var th_client = new TherapistClient();

