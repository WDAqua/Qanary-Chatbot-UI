// Since this is a user module, I need to specify not just the name but also the path.
const getTexts = jest.createMockFromModule("../getTexts");

getTexts.getTexts = () => ({
    "exemplary-questions": [
        "test",
    ],
});


module.exports = getTexts;