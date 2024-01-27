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

	/*------------------------------ 
	 | test_canonicalization
	 ----------------*/
	 
	 test_canonicalization() {
		 
		 const the_action = MsgAction.OK;
		 const info = "This is my info";
		 
		 // Test a good wire msg:
		 const msg_w = {"id"     : "th__<MsgUUID>_51466fad-2d4d-44bd-880c-ef7b76b450e0__th",
		  	   		    "action" : `th__<MsgAction>_${the_action}__th`,
		  	      		"info"   : info
				  	    };
		 let msg_obj = MsgManager.canonicalize(msg_w);

		 // Check fields:
		 super.assertEqual(msg_obj.id, '51466fad-2d4d-44bd-880c-ef7b76b450e0');
		 super.assertEqual(msg_obj.action, the_action);
		 super.assertEqual(msg_obj.info, info); 
		 
		 // console.log(msg_obj)
	 }

}

/* --------------------- Main -------------------- */


new Tester();