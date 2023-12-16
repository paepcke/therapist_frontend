/**
 * 
 */
import { WebSocket } from 'ws';
 import { default as prompt_maker } from 'prompt-sync';
 
 const prompt = prompt_maker({"sigint" : true});
 
 //import { "prompt-sync" };
  
// var ws = new WebSocket("ws://localhost:8888/websocket");

export function start() {
	
	console.log("Trying to connect to ws://localhost:8888/websocket...")
	let client = new WebSocket("ws://localhost:8888/websocket");

	client.onopen = function() {
	   client.send("Hello, world");
	};
	
	client.onmessage = function (evt) {
	   console.log(evt.data);
	   console.log("Next msg to send: ");
	   const new_msg = prompt("Enter a string: ");
	   client.send(new_msg);
	};
	
	client.onerror = function(evt) {
		console.log(`Error from server; evt keys: ${Object.keys(evt)}`);
	}
	
	client.onclose = function (evt) {
		console.log(`Closed by server; evt keys: ${Object.keys(evt)}`);
	}
	}
	
start();
