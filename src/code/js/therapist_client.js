/**
 * 
 */

 import { WebSocket } from 'ws';
 import { default as prompt_maker } from 'prompt-sync';
 
 const prompt = prompt_maker({"sigint" : true});
 
 //import { "prompt-sync" };
  
// var ws = new WebSocket("ws://localhost:8888/websocket");

export function start() {
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
	}
	
start();	