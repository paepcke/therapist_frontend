/**
 * 
 */

import { NotFoundError } from "./errors.js";
import fs from "fs"

export class Utils {
	static range = function (startAt, endAt) {
	    let size = endAt - startAt;
	    return [...Array(size).keys()].map(i => i + startAt);
	}
	
	static getAllMethods(the_class) {
	    const props = [];
	    let obj = the_class;
	    
	    do {
	        props.push(...Object.getOwnPropertyNames(obj));
	    } while (obj = Object.getPrototypeOf(obj));
	    
	    return props.sort().filter((the_prop, idx, arr) => {
			try {
				prop_element = the_class[the_prop];
				prop_type    = typeof(prop_element)
			} catch(err) {
				return false;
			}
	       if (the_prop!=arr[idx+1] && prop_type == 'function')
		       	return true;
	    });
	}
	
	static walkdir(location, filter_fn=null) {
		if (!fs.existsSync(location)) {
			throw new NotFoundError(`Location '${location}' was not found`)
		};
	    if (!fs.statSync(location).isDirectory()) {
	        throw new TypeError(`Arg 'location' must be a directory, not '${location}'`);
	    }
	    let result = [];
	    let content = fs.readdirSync(location);
	    content.forEach(c => {
	        if(fs.statSync(`${location}/${c}`).isFile()) result.push(c);
	        else {
	            let name = `${location}/${c}`;
	            result.push({
	                [`${name}`]: walkdir(`${location}/${c}`, filter)
	            })
	        }
	    });
	    return result;
	}
}
