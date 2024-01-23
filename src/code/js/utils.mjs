/**
 * 
 */

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
}
