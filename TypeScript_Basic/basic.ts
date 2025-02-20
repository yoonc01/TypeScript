function add(n1: number, n2: number) {
  return n1 + n2;
}

// 의도하지 않은 동작이 발생할 수 있음
// TypeScript를 사용하면 이를 방지할 수 있다!
// 하지만 컴파일 자체는 진행됨

// const number1 = "5"; // 문자열을 할당하면 런타임 에러 발생 가능
const number1 = 5;
const number2 = 2.9;

const result = add(number1, number2);
console.log(result);

enum Status {
  SLEEP, // SLEEP = 3 처럼 특정 숫자로 값을 할당할 수도 있음
  EAT,
  THINK,
}

// 객체 타입 정의
// 타입을 명시할 수도 있지만, 자동 추론을 활용하는 것이 일반적으로 더 좋다
const person: {
  name: string;
  age: number;
  hobbies: string[]; // 배열 (Array)
  role: [number, string]; // 튜플 (Tuple)
  status: Status;
} = {
  name: "hyoyoon",
  age: 7,
  hobbies: ["Sports", "Cooking"],
  role: [2, "author"], // TypeScript의 자동 추론을 활용하면 (number | string)[] 로 인식되므로, 튜플을 사용하려면 명시적으로 타입 지정이 필요
  status: Status.SLEEP, // 문자열 대신 Enum을 사용하면 오타를 방지할 수 있음 + enum 이 아닌 macro 방식은 타입 추론을 number로 하기에 status와 관련없는 값도 할당 가능
};

let favoriteActivities: string[];

// 오류 발생
// favoriteActivities = "Sports"; // 문자열 하나만 할당할 수 없음
// favoriteActivities = ["Sports", 1]; // 문자열 배열이어야 하는데 숫자가 포함됨

// 여러 타입을 허용하려면 any[] 사용 가능

console.log(person.name);

// 존재하지 않는 속성을 찾으면 오류 발생
// console.log(person.nickname); // Error: nickname 속성이 없음

// hobby가 string 타입임을 알기 때문에 문자열 관련 자동 완성이 동작함
// 또한 문자열이 아닌 메서드를 사용하면 오류가 표시됨
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase()); // 자동 완성 기능이 정상 작동함
}
