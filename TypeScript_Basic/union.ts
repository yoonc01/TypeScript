// 아래 number의 타입은 2.8이다.
const number = 2.8;

// 🔹 유니온 타입(Union Type): 여러 타입을 허용하는 타입스크립트 기능
// number 또는 string 타입을 받을 수 있도록 설정
// resultConversion은 literal 타입으로 선언하여 "as-number" 또는 "as-text"로만 사용 가능
// union type을 하나하나 적는 것은 귀찮으니 type을 통해 alias 할 수 있다!
type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

// 이런 식으로 객체 타입에도 alias를 할 수 있다!
type User = { name: string; age: number };
 
function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}
 
function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}

function combine(input1: Combinable, input2: Combinable, resultConversion: ConversionDescriptor) {
    let result: number | string;

    // 🔹 타입 가드(Type Guard) 사용
    // 유니온 타입을 사용할 때, 특정 타입을 보장하려면 typeof 검사가 필요함
    if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === "as-number")
        result = +input1 + +input2; // 두 숫자를 더함 resultConversion === "as-number일 경우에는 input이 문자열일 수 있어 +로 형변환"
    else
        result = input1.toString() + input2.toString(); // 문자열로 변환 후 연결
    // if (resultConversion === "as-number")
    //     return +result;
    // else
    //     return result.toString();
    return result;
}

// 🔹 유니온 타입을 활용한 예제
const combinedAges = combine(10, 20, "as-number"); // 숫자 덧셈

// want output to be number although "10" and "20" are strings
const combinedStringAges = combine("10", "20", "as-number");

const combinedName = combine("Hyo", "Yoon", "as-text"); // 문자열 결합

console.log(combinedAges); // 30
console.log(combinedName); // "HyoYoon"
