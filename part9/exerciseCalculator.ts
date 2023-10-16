interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (days: number[], target:number):Result => {

  const calcTime:number = days.reduce((a,b)=>a+b, 0);

  const averageTime:number = calcTime / days.length;

  const trainingDays = days.filter(day=> {
    const count:number[] = [];
    if (day !== 0 ) {
      count.push(day);
    }
  });

  const desc = "Not too bad";
  return {
    periodLength : days.length,
    trainingDays:trainingDays.length,
    success:true,
    target,
    average:averageTime, 
    ratingDescription: desc,
    rating:2,
  };
};


console.log(calculateExercises([2,3,5,10], 2));
