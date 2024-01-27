/**
 * 
 */

class MsgAction {
	static ERROR = 0;
	static OK    = 1;
	
    static GET_PRELUDE     = 2; 
    static SET_PRELUDE     = 3;
    static ADD_PRELUDE     = 4;
    static INCLUDE_PRELUDE = 5;
     
    static GET_DIAGNOSIS   = 6;
    static SET_DIAGNOSIS   = 7;
    
    static GET_TEMPERATURE = 8;
    static SET_TEMPERATURE = 9;
        
    static GET_RESP_SIZE   = 10;
    static SET_RESP_SIZE   = 11;
    
    static GET_MODELS      = 12;
    
    static COMPLETE        = 13;
    
    static SET_GRADE       = 14;
    
    static RESTART_SESSION = 15;
    
    static SERVER_SHUTDOWN = 16;
    
    constructor(value) {
		this.value = value;
	}
}

export {MsgAction};