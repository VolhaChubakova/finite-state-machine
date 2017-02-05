class FSM {
    
    constructor(config) {
        this.config=config;
        this.currentState = config.initial;
        this.stateHistory = [];
        this.undoHistory = [];
    }

    
    getState() {
        return this.currentState;  
    }

    
    changeState(state) {
        if (!this.config.states[state]){
            throw new Error("unknown state");
        }
        else {
            this.stateHistory.push(this.currentState);
            this.currentState = state;
            this.undoHistory = [];
        }
    }
   
    trigger(event) {
        if (!this.config.states[this.currentState].transitions[event]) {
            throw new Error("event in current state does not exist");
        }
        else {
            this.stateHistory.push(this.currentState);
            this.currentState = this.config.states[this.currentState].transitions[event];
            this.undoHistory = [];
        }
    }

    
    reset() {
       this.currentState = this.config.initial;
    }

    
    getStates(event) {
        var names = [];
        if (!event){
            for (var stateName in this.config.states) {
                names.push(stateName);
            }
        }
        else{
            for (var stateName in this.config.states) {
                var state = this.config.states[stateName];
                for (var eventName in state.transitions) {
                    if (eventName === event){
                        names.push(stateName);
                        break;
                    }
                }
            }
        }
        return names;
   }

   
    undo() {
        if (this.stateHistory.length == 0) {
            return false;
        }
        this.undoHistory.push(this.currentState);
        this.currentState = this.stateHistory.pop();
        return true;
    }

    
    redo() {
        if (this.undoHistory.length == 0) {
            return false;
        }
        this.stateHistory.push(this.currentState);
        this.currentState = this.undoHistory.pop();
        return true;
    }

   
    clearHistory() {
        this.stateHistory = [];
        this.undoHistory = [];
    }
}

module.exports = FSM;


