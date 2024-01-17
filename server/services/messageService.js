const ChatRoom = require('../models/ChatRoom')

async function createChatRoom(buyer, seller) {
    let chatRoom = new ChatRoom({ buyer, seller})
    return await chatRoom.save();
}

module.exports = {
    createChatRoom
}