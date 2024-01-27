/**
 * Common constants, and data structures
 */

import crypto from "crypto";
import "./common/constants.mjs";
import { WireFormatError } from "./common/errors.js";

class Message {

  id     = ''
  action = ''
  info   = ''
  
  constructor(action, info, id=null) {
    this.action = action;
    this.info   = info;
    if (id === null) {
		// Create a uuid:
		this.id = crypto.randomUUID()
		}
	else {
		this.id = id
	}
  }
}

class MsgFormat {
    static WIRE = 0
    static OBJ  = 1
    }

//export class MsgManager {
class MsgManager {	
	
	static WIRE_PREFIX      = 'th__';
	static WIRE_SUFFIX      = '__th';
	static MSG_UUID_CLASS   = '<MsgUUID>';
	static MSG_ACTION_CLASS = '<MsgAction>';

	/*------------------------------ 
	 | canonicalize 
	 ----------------*/

	/** Given an obj straight from the wire, return
	 * a regular JS object.
	 */	
	static canonicalize(raw_msg) {
		
		let id_str     = raw_msg['id'];
		let action_str = raw_msg['action'];
		let info       = raw_msg['info'];
		
		if (typeof(id_str) != 'string')
			throw new WireFormatError(`Msg ID from wire '${id_str}' must be a string`)
		if (typeof(action_str) != 'string')
			throw new WireFormatError(`Action from wire '${action_str}' must be a string`)
		if (typeof(info) != 'string')
			throw new WireFormatError(`Info from wire '${action_str}' must be a string`)
		
		// Extract the UUID from like:
		//   'th__<MsgUUID>_51466fad-2d4d-44bd-880c-ef7b76b450e0__th':
		const id_preamble  = `${this.WIRE_PREFIX}${this.MSG_UUID_CLASS}_`;
		const id_postamble = this.WIRE_SUFFIX;
		if (! id_str.startsWith(id_preamble) || ! id_str.endsWith(id_postamble))
			throw WireFormatError(`Cannot find msg_id in ${id_str}`)
		const pre_len  = id_preamble.length;
		const post_len = id_postamble.length;
		const msg_id   = id_str.slice(pre_len, id_str.length - post_len);
		
		// Extract the action, which looks like:
		//   'th__<MsgAction>_2__th'
		if (! action_str.startsWith(this.WIRE_PREFIX) || ! action_str.endsWith(this.WIRE_SUFFIX))
			throw WireFormatError(`Cannot find action in ${action_str}`)
		const action_preamble  = `${this.WIRE_PREFIX}${this.MSG_ACTION_CLASS}_`;
		const action_excerpt = action_str.slice(action_preamble.length, action_str.length - this.WIRE_SUFFIX.length)
		
		// Turn the action into a number:
		const action = Number(action_excerpt);
		if (typeof(action) != 'number')
			throw WireFormatError(`Action ${action_excerpt} cannot be turned into a number`);
		
		const msg = this.make_msg(action, msg_id, info, MsgFormat.OBJ)
				
		return msg
		
	} // end canonicalize
	
	/*------------------------------ 
	 | make_msg
	 ----------------*/
	
	static make_msg(
		action,
		msg_id=null,
		info=null,
		ret_format=MsgFormat.WIRE 
		) {

		// Invent a message id, if necessary:
		var the_msg_id = msg_id === null ? crypto.randomUUID() : msg_id; 
		
		if (ret_format == MsgFormat.OBJ) {
			let msg = 
				{"id"     : the_msg_id, 
			 	 "action" : action,
			 	 "info"   : info
				};
			return msg; 
		}
		// Want a message formatted for sending to server over wire:
		let wire_id     = `${MsgManager.WIRE_PREFIX}`+
						  `${MsgManager.MSG_UUID_CLASS}_`+
						  `${the_msg_id}`+
						  `${MsgManager.WIRE_SUFFIX}`;
		let wire_action = `${MsgManager.WIRE_PREFIX}`+
						  `${MsgManager.MSG_ACTION_CLASS}_`+
						  `${action}`+
						  `${MsgManager.WIRE_SUFFIX}`; 
		let msg = 
			{"id"     : wire_id, 
		 	 "action" : wire_action,
		 	 "info"   : info
			};
		return msg; 		
	}
	
} // end MsgManager

export {MsgManager, Message, MsgFormat}
