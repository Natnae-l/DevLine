class Namespace{
    constructor(id, nsTitle, img, endPoint){
        this.id,
        this.nsTitle,
        this.img,
        this.endPoint,
        this.rooms = []
    }

    addRoom(roomObj){
        this.rooms.push(roomObj)
    }
}

exports.default =  Namespace;