const getOptionImageName = (optionName) => {
    const lowercaseName = optionName.toLowerCase();

    return `workout-${lowercaseName}.jpg`;
};

module.exports = {
    getOptionImageName
}