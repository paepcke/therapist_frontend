/**
 * 
 */

import { NotFoundError } from "./errors.js";
import fs from "fs"

export class Utils {
	
	/*------------------------------
	| range
	--------------------*/
	
	static range = function (startAt, endAt) {
	    let size = endAt - startAt;
	    return [...Array(size).keys()].map(i => i + startAt);
	}
	
	/*------------------------------
	| getMethods
	--------------------*/

	/**
	 * Given a class, or an instance of a class, return a list of methods
	 * on the class, or the instance's class.
	 * If filter is provided, only include props for which
	 * filter returns true. To search only for methods
	 * that start with 'test_':
	 * 
	 *     my_filter = (prop) => prop.startsWith('test_')
	 * 	   Util.getMethods(Foo, meth_filter=my_filter)
	 */

	static getMethods(get_from, meth_filter=null) {
		let the_class = null;
		// Instance, or class?
		if (typeof(get_from) == 'object')
			// It's an instance; get its class object
			the_class = get_from.constructor;
		else
		    // It's already a class object:
			the_class = get_from

		let method_names = Object.getOwnPropertyNames(the_class.prototype);
		let method_objs = [];
		let methods = null;
		if (meth_filter == null) {
			methods = method_names;
		} else {
			methods = method_names.filter(prop_name => meth_filter(prop_name))
		}			   
	    // Turn method names into function objecst:
	    for (const i in methods) {
			let meth_name = methods[i];
			method_objs.push(the_class.prototype[meth_name])
		}

		// The following do not work for replacing the loop above; don't know why:
	    //method_objs = methods.map(meth_name => the_class.prototype[meth_name])
	    //method_objs = methods.map(i => the_class.prototype[methods[i]])
	    return method_objs
	}
	
	/*------------------------------
	| walkdir
	--------------------*/
	
	static walkdir(location, filter_fn=null, ret_absolute=true) {
		return Utils._walkdir_helper([], location, filter_fn, ret_absolute);
	} 
	
	static _walkdir_helper(so_far, location, filter_fn=null, ret_absolute=true) {
		
		if (!fs.existsSync(location)) {
			throw new NotFoundError(`Location '${location}' was not found`)
		};
	    if (!fs.statSync(location).isDirectory()) {
	        throw new TypeError(`Arg 'location' must be a directory, not '${location}'`);
	    }
	    
	    let content = fs.readdirSync(location);
	    for (const entry of content) {
			let abs_path = `${location}/${entry}`;
			try {
		        if(fs.statSync(abs_path).isFile() &&
					(typeof(filter_fn) == 'function' ? filter_fn(entry) : true)) {
					ret_absolute ? so_far.push(abs_path) : so_far.push(entry)
					}
		        else {
		            so_far.push(...Utils._walkdir_helper(
							so_far, 
		                	abs_path, 
		                	filter_fn, 
		                	ret_absolute)
		            	)
		        }
		    }
		    catch(e) {
				// Happens for unusual files, such as symlinks:
				// ignore
				continue;
			}
	    };
	    return so_far;
	}
	
	/*------------------------------ 
	 | is_uuid 
	 ----------------*/
	
	static is_uuid(uuid_str) {
		const is_uuid_pat = /^[^-]{8}-[^-]{4}-[^-]{4}-[^-]{4}-[a-z0-9]{12}$/;
		let the_match = uuid_str.match(is_uuid_pat);
		return the_match !== null;
	 }
}

/* ----------------------- Testing ------------------- */

/* ------------ 
class Foo {
    meth1() {
    }

    test_meth2() {
    }

    test_meth3() {
    }
}
var i = new Foo()
var methods = Utils.getMethods(i)
for (const i in methods) console.log(`Type of Meth: '${typeof(methods[i])}'`)
	
var test_it = function() {
	let loc = '/Users/paepcke/tmp';
	let paths = Utils.walkdir(loc);
	console.log(`Number of files: ${paths.length}`);
}
test_it();
------------ */
