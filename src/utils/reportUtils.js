const extractWeightReport = (weightHistory) => {
    const minWeight = weightHistory.reduce((prev, curr) => {
        return curr.weight < prev.weight ? curr : prev;
    });

    const maxWeight = weightHistory.reduce((prev, curr) => {
        return curr.weight > prev.weight ? curr : prev;
    });

    const currentWeight = weightHistory[weightHistory.length - 1];

    return {
        minWeight: minWeight.weight,
        currentWeight: currentWeight.weight,
        maxWeight: maxWeight.weight
    }
}

const extractWorkoutReport = (workoutHistory) => {
    // const totalCaloriesBurnt = workoutHistory.map((event => event.))
}

module.exports = {
    extractWeightReport,
    extractWorkoutReport
}