// below 18.5 is underweight
// between 18.5 and 24.9 is healthy
// between 25 and 29.9 is overweight
// of 30 or over is obese

export const calculateBmi = (height:number, weight:number)=> {
    const bmi:number = weight/(height * height) * 10000
    
    if (bmi < 18.5) {
        return 'underweight'
    } else if (bmi > 18.5 && bmi < 24.9) {
        return 'healthy'
    } else if (bmi > 25 && bmi <29.9) {
        return 'overweight'
    } else {
        return 'obese'
    }
}