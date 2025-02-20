// 🔹 유니온 타입(Union Type): 여러 타입을 허용하는 타입스크립트 기능
// number 또는 string 타입을 받을 수 있도록 설정
function combine(input1: number | string, input2: number | string) {
    let result: number | string;

    // 🔹 타입 가드(Type Guard) 사용
    // 유니온 타입을 사용할 때, 특정 타입을 보장하려면 typeof 검사가 필요함
    if (typeof input1 === "number" && typeof input2 === "number")
        result = input1 + input2; // 두 숫자를 더함
    else
        result = input1.toString() + input2.toString(); // 문자열로 변환 후 연결

    return result;
}

// 🔹 유니온 타입을 활용한 예제
const combinedName = combine("Hyo", "Yoon"); // 문자열 결합
const combinedAges = combine(10, 20); // 숫자 덧셈

console.log(combinedName); // "HyoYoon"
console.log(combinedAges); // 30
