/**
 * 
 */

import { MsgManager, MsgFormat } from '../msg_generator.mjs';
import { MsgAction } from '../common/constants.mjs';
import { TestCase } from '../test_harness/test_case.js';
import { Utils } from '../common/utils.mjs';

class Tester extends TestCase {
	
	static is_uuid_pat = /^[^-]{8}-[^-]{4}-[^-]{4}-[^-]{4}-[a-z0-9]{12}$/;

	constructor() {
		super();
		this.WIRE_PREFIX    	= MsgManager.WIRE_PREFIX;
		this.WIRE_SUFFIX    	= MsgManager.WIRE_SUFFIX;
		this.MSG_UUID_CLASS 	= MsgManager.MSG_UUID_CLASS;
		this.MSG_ACTION_CLASS   = MsgManager.MSG_ACTION_CLASS;
		super.run_tests(this);
		console.log("Tests done");
	}
		
	/*------------------------------ 
	 | test_msg_creation
	 ----------------*/
	 
	 test_msg_creation() {

		let msg_id = null;
		let info   = "This is my info";
		 
		const msg = MsgManager.make_msg(
			MsgAction.GET_PRELUDE, 
			msg_id,
			info,
			MsgFormat.OBJ
			);
		super.assertTrue(Utils.is_uuid(msg.id));
		
		const expected = {"id"     : msg.id, 
		 	 			  "action" : MsgAction.GET_PRELUDE,
		 	 		      "info"   : info
					};
		super.assertObjsEqual(msg, expected)

		// Now ask for a wire-ready form of the message:
		const msg_w = MsgManager.make_msg(
			MsgAction.GET_PRELUDE, 
			msg_id,
			info,
			MsgFormat.WIRE
			);
		
		// What we expect msg_w to be. Since make_msg()
		// invents a uuid, we just have to copy the id from
		// msg_w:
		const exp_msg_w = {
			"id" : msg_w.id,
			"action" : `${this.WIRE_PREFIX}${this.MSG_ACTION_CLASS}_${MsgAction.GET_PRELUDE}${this.WIRE_SUFFIX}`,
			"info"   : info
		}
		
		super.assertObjsEqual(msg_w, exp_msg_w);
	 }

}

/* --------------------- Main -------------------- */


new Tester();