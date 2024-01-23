/**
 * Common constants, and data structures
 */

import "crypto";
import "./constants.mjs";
// require('crypto');
//require('./constants')

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
export class MsgManager {	
	
	static WIRE_PREFIX      = 'th__';
	static WIRE_SUFFIX      = '__th';
	static MSG_UUID_CLASS   = '<MsgUUID>';
	static MSG_ACTION_CLASS = '<MsgAction>';
	
	static canonicalize = function(raw_msg) {
		
		let id_str = raw_msg['id'];
		let action = raw_msg['action'];
		let info   = raw_msg['info'];
		
	} // end canonicalize
	
	static mk_msg = function(
		action,
		msg_id=null,
		info=null) {

		// Convert action to a MsgAction enum:
		if (msg_id === null) {
			msg_id = crypto.randomUUID();
		};
		let wire_id     = `${MsgManager.WIRE_PREFIX}`+
						  `${MsgManager.MSG_UUID_CLASS}_`+
						  `${msg_id}`+
						  `${MsgManager.WIRE_SUFFIX}`;
		let wire_action = `${MsgManager.WIRE_PREFIX}`+
						  `${MsgManager.MSG_ACTION_CLASS}`+
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
