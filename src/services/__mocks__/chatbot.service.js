// Since this is a user module, I need to specify not just the name but also the path.
// The file's ending is important here because jest would think that .service is the ending otherwise
// which causes it not to find and mock the module
const chatBotService = jest.createMockFromModule("../chatbot.service.js");

chatBotService.postQuery = jest.fn((question) => {
  return Promise.resolve({});
});

module.exports = chatBotService;
