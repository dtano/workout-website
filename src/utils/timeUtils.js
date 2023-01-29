const convertToDuration = (numSeconds) => {
    let secondsNum = parseInt(numSeconds, 10);
    let hours = Math.floor(secondsNum / 3600);
    let minutes = Math.floor((secondsNum - (hours * 3600)) / 60);
    let seconds = secondsNum - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    console.log(`${minutes}:${seconds}`);
    
    return minutes+':'+seconds;
}

const getAge = (birthDate) => {
    let today = new Date();

    // Reformat the date string
    // Slice the first 10 characters
    let dateString = birthDate.slice(0, 10);
    let birthDateObj = new Date(dateString);

    let age = today.getFullYear() - birthDateObj.getFullYear();
    var monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age;
}

const convertToMinutes = (seconds) => {
    if(!seconds) return 0;
    return seconds/60;
}

const extractDate = (datetimeString) => {
    const date = datetimeString.slice(0, 10);
    return date;
}

module.exports = {
    convertToDuration,
    getAge,
    extractDate,
    convertToMinutes
}