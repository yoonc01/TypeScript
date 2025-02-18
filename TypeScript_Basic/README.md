# TypeScript에서 타입 추론과 타입 명시 정리

## 1. 타입 추론을 사용하는 것이 좋은 경우

TypeScript는 강력한 **타입 추론 (Type Inference)** 기능을 제공하므로, 불필요한 타입 선언을 줄일 수 있다.
타입 추론을 사용하면 코드가 더 간결하고 유지보수하기 쉬워진다.

### ✅ 변수 선언 시 타입 추론

```ts
let message = "Hello, TypeScript!"; // 자동으로 string 타입 추론됨
let age = 30; // number 타입 추론됨
let isDeveloper = true; // boolean 타입 추론됨
```

👉 변수의 초기값이 명확할 때는 타입을 명시하지 않아도 된다.

### ✅ 함수의 반환 타입 추론

```ts
function add(a: number, b: number) {
  return a + b; // TypeScript가 자동으로 number로 추론함
}
```

👉 `return` 값을 보고 반환 타입을 자동으로 추론할 수 있다.

### ✅ 객체 타입 추론

```ts
const person = {
  name: "Hyoyoon",
  age: 7,
};
```

👉 `person.name`은 `string`, `person.age`는 `number`로 자동 추론됨.

---

## 2. 타입을 명시하는 것이 좋은 경우

타입 추론이 애매하거나, **의도를 명확하게 전달하기 위해 타입을 명시하는 것이 더 좋은 경우**가 있다.

### ✅ 함수의 매개변수 타입

```ts
function greet(name: string) {
  console.log("Hello, " + name);
}
```

👉 함수의 매개변수는 기본적으로 `any`로 추론되기 때문에 **반드시 명시적으로 타입을 지정하는 것이 좋다.**

### ✅ 함수의 반환 타입이 명확하지 않을 때

```ts
function fetchUserData(id: number): Promise<{ name: string; age: number }> {
  return new Promise((resolve) => {
    resolve({ name: "Hyoyoon", age: 7 });
  });
}
```

👉 비동기 함수나 복잡한 연산을 수행하는 함수는 **반환 타입을 명시하는 것이 안전하다.**

### ✅ 빈 배열 또는 객체 선언 시

```ts
let hobbies: string[] = []; // string[] 타입을 명시해야 함
hobbies.push("Sports");
```

👉 `let hobbies = [];` 처럼 선언하면 `never[]`로 추론될 수 있으므로 타입을 명시하는 것이 좋다.

---

## 3. 튜플 사용 시 타입 명시 필요

튜플은 배열과 달리 요소의 개수와 타입이 고정되므로, 타입을 **명시적으로 선언하는 것이 필수적**이다.

### ✅ 올바른 튜플 타입 명시

```ts
let user: [number, string] = [1, "Hyoyoon"];
```

👉 `[number, string]`을 명시하여 `user[0]`는 **number**, `user[1]`은 **string**이 되도록 보장함.

### ❌ 타입을 명시하지 않으면 생길 수 있는 문제

```ts
let user = [1, "Hyoyoon"]; // TypeScript는 (number | string)[] 로 추론할 수 있음
user.push(30); // 의도치 않게 숫자가 추가될 수 있음
console.log(user); // [1, "Hyoyoon", 30] -> 원래 [number, string]로 사용하고 싶었는데 깨짐
```

👉 배열처럼 취급될 가능성이 높아, **튜플의 개수와 타입 제한이 깨질 위험**이 있음.

---

## 4. 결론: 타입 추론 vs 타입 명시

| 상황                                 | 타입 추론 사용 | 타입 명시 필요 |
| ------------------------------------ | -------------- | -------------- |
| 변수 선언 시                         | ✅             | ❌             |
| 함수의 매개변수                      | ❌             | ✅             |
| 함수의 반환 타입 (명확할 경우)       | ✅             | ❌             |
| 함수의 반환 타입 (복잡하거나 비동기) | ❌             | ✅             |
| 객체 리터럴 선언                     | ✅             | ❌             |
| 빈 배열 또는 빈 객체 선언            | ❌             | ✅             |
| 튜플 사용 시                         | ❌             | ✅             |
