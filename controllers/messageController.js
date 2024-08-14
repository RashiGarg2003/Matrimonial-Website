
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const message = new Message({
      sender: req.user._id,
      receiver: receiverId,
      content
    });
    await message.save();
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).send('Error sending message. Please try again.');
  }
};

exports.getInbox = async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user._id }).populate('sender', 'name');
    res.status(200).json(messages);
  } catch (error) {
    console.error('Get inbox error:', error);
    res.status(500).send('Error retrieving messages. Please try again.');
  }
};
