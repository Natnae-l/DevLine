const Namespace = require('../classes/namespaceClass');
const Room = require('../classes/roomClass');

const storeNamespaces = [];

// create namespaces
const developer = new Namespace(1, 'DEVS', "/images/coding.png", 'DEVS');
const test = new Namespace(2, 'TEST', '/images/test.png', 'TEST');
const production = new Namespace(3, 'PRODUCTION', '/images/direction.png','PRODUCTION');

// create rooms and store in namespaces
    // developer rooms
    developer.addRoom(new Room(1, 'Discuss', 'developer'))
    developer.addRoom(new Room(2, 'Documentation', 'developer'))
    developer.addRoom(new Room(3, 'Reach Out', 'developer'))
    
    // test rooms
    test.addRoom(new Room(1, 'Discuss', 'test'))
    test.addRoom(new Room(2, 'Check', 'test'))
    test.addRoom(new Room(3, 'Review', 'test'))

    // production rooms
    production.addRoom(new Room(1, 'Discuss', 'production'))
    production.addRoom(new Room(2, 'Get Back', 'production'))
    production.addRoom(new Room(3, 'Review', 'production'))

// add all namespaces to storage
storeNamespaces.push(developer, test, production)

module.exports = storeNamespaces;