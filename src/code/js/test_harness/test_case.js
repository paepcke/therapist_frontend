/**
 * 
 */

import { Utils } from "../utils/utils.mjs";
/// import {temporaryDirectory, temporaryDirectoryTask} from 'tempy';
import { mkdtemp, open, writeFile } from 'fs/promises';
import fs from "fs"

export class TestCase {
	
	constructor() {
		this.test_list = [];
	}
	
	next_test() {
		if (this.test_list.length == 0) {
			 return null;
		} else {
			 return this.test_list.pop();
		}
	}
	
	async find_tests(start_dir = process.cwd()) {

		this.test_list = Utils.walkdir(start_dir);
		return this.test_list;
	}
}
 
 /* ---------- Testing this Module --------------------- */
 
async function test_this() {
	let test_fname = null;
	let dir_name   = null
	try {
		//***dir_name   = temporaryDirectory();
		dir_name = await mkdtemp('/tmp/tstcase_tst');
		test_fname = `${dir_name}/test_file.js`;
		
		console.log(`test_fname: '${test_fname}'`);
		
		let fd = await open(test_fname, 'w');
		await writeFile(fd, "foobar", {flush : true});
		
		let tester = new TestCase();
		tester.find_tests(dir_name);
		
		console.log(`Queue length: ${tester.test_list.length}`);
		do {
		     var test_fn = tester.next_test();
			 console.log(`Test name: ${test_fn}`);
			 } while (test_fn !== null);
		
	} finally {
	     fs.rmSync(test_fname);
	     fs.rmdirSync(dir_name);
	  }
	}

 test_this();
 
 
