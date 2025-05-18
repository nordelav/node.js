const array = process.argv[2];

const calcSum = (array) => {
  let sum = 0;
  for (let element of array) {
    if (Array.isArray(element)) {
      sum = sum + calcSum(element);
    } else {
      sum = sum + element;
    }
  }

  return(sum);
};

console.log(calcSum(JSON.parse(array)));
