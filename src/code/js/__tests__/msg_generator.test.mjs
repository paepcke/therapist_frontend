/**
 * 
 */

const msg_gen = await import('../msg_generator.mjs');
// const utils   = await import('../utils.mjs');
import { Utils } from '../utils.mjs';

class Tester {
	
	static p = /^[^-]{8}-[^-]{4}-[^-]{4}-[^-]{4}-[a-z0-9]{12}$/;
		
	/*------------------------------ 
	 | head
	 ----------------*/
	 
	 test_msg_creation = function() {

		msg = msg_gen.MsgManager.mk_msg(
			MsgAction.GET_PRELUDE, 
			id=null, 
			info="This is my info");
		expected = `${WIRE_PREFIX}${MSG_UUID_CLASS}${msg_id}${WIRE_SUFFIX}`;
	 }
}

var methods = Utils.getAllMethods(msg_gen.MsgManager);
console.log(`Names: ${methods}`)