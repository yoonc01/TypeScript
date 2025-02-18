function add(n1: number, n2: number) {
  return n1 + n2;
}

// 의도하지 않은 동작이 발생할 수 있음
// TypeScript를 사용하면 이를 방지할 수 있다!
// 하지만 컴파일 자체는 진행됨

// const number1 = "5"; // 이 코드가 실행되면 런타임 에러 발생 가능
const number1 = 5;
const number2 = 2.9;

const result = add(number1, number2);
console.log(result);

// 객체 타입 정의
// 타입은 추론하도록 하는 것이 좋긴 함
const person: {
  name: string;
  age: number;
  hobbies: string[]; //Array
  role: [number, string]; //Tuple
} = {
  name: "hyoyoon",
  age: 7,
  hobbies: ["Sports", "Cooking"],
  role: [2, "author"], // 타입을 정의하지 않고 이런 식으로 선언하여 TypeScript가 추론하게 하면 문자열과 숫자가 union된 배열로 이해하여 tuple로 사용할 수는 없다!
};

let favoriteActivities: string[];

// 오류 발생
// favoriteActivities = "Sports"; // 문자열 하나만 할당할 수 없음
// favoriteActivities = ["Sports", 1]; // 문자열 배열이어야 하는데 숫자가 포함됨

// 다양한 타입을 허용하려면 any[] 사용 가능

console.log(person.name);

// 존재하지 않는 속성을 찾으면 오류 발생
// console.log(person.nickname);

// hobby가 string 타입임을 알기 때문에 문자열 관련 자동 완성이 동작함
// 또한 문자열이 아닌 메서드를 사용하면 오류가 표시됨
for (const hobby of person.hobbies) {
  console.log(hobby);
}
