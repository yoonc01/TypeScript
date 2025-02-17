function add(n1: number, n2: number) {
  return n1 + n2;
}

// unintended behavior occurs
// by using ts we can prevent it!
// however compile goes on
//const number1 = "5";
const number1 = 5;
const number2 = 2.9;

const result = add(number1, number2);
console.log(result);
