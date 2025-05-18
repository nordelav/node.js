const array = process.argv[2];

const calcSum = (array) => {
 return array.reduce((prev, next) => {
    if (Array.isArray(next)) {
      return prev + calcSum(next);
    } else {
      return prev + next;
    }
  }, 0);
};

console.log(calcSum(JSON.parse(array)));
