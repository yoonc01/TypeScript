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

const person: {
  name: string;
  age: number;
} = {
  name: "hyoyoon",
  age: 7,
};

console.log(person.name);
/*
 * 없는 property를 찾으면 오류
 * console.log(person.nickname);
 */
