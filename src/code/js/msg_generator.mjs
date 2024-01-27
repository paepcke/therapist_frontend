/**
 * Common constants, and data structures
 */

import crypto from "crypto";
import "./common/constants.mjs";

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
	
	static canonicalize(raw_msg) {
		
		let id_str = raw_msg['id'];
		let action = raw_msg['action'];
		let info   = raw_msg['info'];
		
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
