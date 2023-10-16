"use strict";
const calculateExercises = (days, target) => {
    const calcTime = days.reduce((a, b) => a + b, 0);
    const averageTime = calcTime / days.length;
};
console.log(calculateExercises([2, 3, 5, 10], 2));
