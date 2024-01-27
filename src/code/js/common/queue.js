/**
 * 
 */


 class Queue {
	constructor() {
		this.items = {}
		this.frontIndex = 0
		this.backIndex = 0
	}
	enqueue(item) {
		this.items[this.backIndex] = item
		this.backIndex++
		return item + ' inserted'
	}
	dequeue() {
		const item = this.items[this.frontIndex]
		delete this.items[this.frontIndex]
		this.frontIndex++
		return item
	}
	peek() {
		return this.items[this.frontIndex]
	}
	get printQueue() {
		return this.items;
	}
	
	isEmpty() {
	    // return true if the queue is empty.
	    return Object.keys(this.items).length == 0;
	}
	
	length() {
		return Object.keys(this.items).length;
	}
	
}

export {Queue};