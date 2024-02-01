class Room {
    constructor(roomId, roomTitle, namespace, privateRoom = false){
        this.roomId,
        this.roomTitle,
        this.namespace,
        this.privateRoom,
        this.history = []
    }

    addMessage(message){
        this.history.push(message)
    }
    clearHistory(){
        this.history = [];
    }
}

exports.default =  Class;