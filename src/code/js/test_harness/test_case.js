/**
 * 
 */

import { AssertionError } from "../common/errors.js";
import { Utils } from "../common/utils.mjs";

export class TestCase {
	
	constructor() {
	}

	/* -------------- Assertion Conveniences ----------------	

	/*------------------------------ 
	 | assertEqual
	 ----------------*/
	 
	 assertEqual(arg1, arg2) {
		 if (arg1 != arg2)
		 	throw new AssertionError(`${arg1} != ${arg2}`)
	 }
	
	/*------------------------------ 
	 | assertEqual
	 ----------------*/
	 
	 assertEqual(arg1, arg2) {
		 if (arg1 != arg2)
		 	throw new AssertionError(`${arg1} != ${arg2}`)
	 }

	/*------------------------------ 
	 | assertTrue
	 ----------------*/
	 
	 assertTrue(arg1) {
		 if (!arg1)
		 	throw new AssertionError(`${arg1} is False instead of True`)
	 }

	/*------------------------------ 
	 | assertObjsEqual
	 ----------------*/
	 
	 assertObjsEqual(obj1, obj2) {

		 const obj1_keys = Object.getOwnPropertyNames(obj1);
		 const obj2_keys = Object.getOwnPropertyNames(obj2);
		 if (obj1_keys.length != obj2_keys.length) 
		 	throw new AssertionError(`Number of elements in objects differ`);

		 for (const key of Object.getOwnPropertyNames(obj1))
		     if (obj1[key] != obj2[key]) 
		     	throw new AssertionError(`Object value obj1.${key} != obj2.${key}: ${obj1[key]} != ${obj2[key]}`)
	 }		 

	/* ---------------- Test File Finding --------------------

	/*------------------------------
	| find_test_files
	--------------------*/
		
	/** Call to discover tests, i.e. files under start_dir
	   whose name starts with 'test_'. Use next_test() to
	   access found files one by one.
	*/
	async find_test_files(start_dir = process.cwd()) {
		this.test_list = Utils.walkdir(start_dir);
		return this.test_list;
	}
	
	/*------------------------------
	| next_test_file
	--------------------*/
	
	next_test_file() {
		if (this.test_list.length == 0) {
			 return null;
		} else {
			 return this.test_list.pop();
		}
	}
	
	/*------------------------------
	| run_tests
	--------------------*/
	
	/** Find test methods in current file, i.e. in
	    file this class is inherited
	*/
	run_tests(test_case_subclass_inst) {
		let filter=(prop) => prop.startsWith('test_')
		let test_funcs = Utils.getMethods(test_case_subclass_inst, filter); 

		for (const test of test_funcs) {
			// Use call() so we can initialize 'this'
			// to be the instance of the subclass:
			test.call(test_case_subclass_inst)
		}
	}
}
 
 /* ---------- Testing this Module --------------------- */
 
/* ***************************** 
async function test_this() {
	let test_fname  = null;
	let test_fname1 = null;
	let dir_name    = null
	try {
		dir_name = await mkdtemp('/tmp/tstcase_tst');
		test_fname = `${dir_name}/test_file.js`;
		
		console.log(`test_fname: '${test_fname}'`);
		
		let fd = await open(test_fname, 'w');
		await writeFile(fd, "foobar", {flush : true});
		
		let tester = new TestCase();
		tester.find_tests(dir_name);

		if (tester.test_list.length != 1) throw new Error("Should have 1 file.");		
		//console.log(`Queue length: ${tester.test_list.length}`);
		do {
		     var test_fn = tester.next_test();
			 console.log(`Test name: ${test_fn}`);
			 } while (test_fn !== null);
			 
		// Add another file:
		test_fname1 = `${dir_name}/test_file1.js`;
		let fd1 = await open(test_fname1, 'w');
		await writeFile(fd1, "bluebell", {flush : true});

		tester.find_tests(dir_name);
		if (tester.test_list.length != 2) throw new Error("Should have 2 file.");		
		
	} finally {
	     fs.rmSync(test_fname);
	     fs.rmSync(test_fname1);
	     fs.rmdirSync(dir_name);
	  }
	}

 test_this();
 
***************************** */

 
