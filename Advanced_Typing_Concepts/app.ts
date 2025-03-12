type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// 두 개 모두를 가지고 있어야 한다.
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "hyoyoon",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combine = string | number;
type Numeric = number | boolean;

type Universal = Combine & Numeric;

//overloads
function addCombine(a: number, b: number): number;
function addCombine(a: string, b: string): string;
function addCombine(a: string, b: number): string;
function addCombine(a: number, b: string): string;
function addCombine(a: Combine, b: Combine) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const addCombineResult = addCombine("hyo", " yoon");
// 위의 오버로딩 덕분에 typescript가 올바른 타입을 추론할 수 있다.
// 그렇기에 split을 사용해도 오류가 나지 않음
addCombineResult.split(" ");

type UnKnownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnKnownEmployee) {
  console.log(`Name: ${emp.name}`);
  if ("privileges" in emp) {
    console.log(`Privileges: ${emp.privileges}`);
  }
  if ("startDate" in emp) {
    console.log(`StartDate: ${emp.startDate}`);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo... ${amount}`);
  }
}

type Vehicle = Car | Truck;
type WhatIsIt = Car & Truck;

const v1: Vehicle = new Car();
const v2: Vehicle = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  //interface이기에 instanceof를 사용할 수 없음
  // 또한 아래와 같은 경우 오타가 났을 때 확인 불가
  if ("flyingSpeed" in animal) {
    console.log(`Moving with speed: ${animal.flyingSpeed}`);
  }
  // 그렇기에 type을 설정해서 리터럴 타입을 사용
  if (animal.type === "bird") {
    console.log(`Flying at speed: ${animal.flyingSpeed}`);
  } else if (animal.type === "horse") {
    console.log(`Running at speed: ${animal.runningSpeed}`);
  }
}

//!를 추가하여 NULL이 아님을 알려줄 수 있다.
// <> 사이에 dom 형변환을 해주면 된다.
// 이는 근데 React의 <>와 충돌한다.
// lib에 dom 이 있어 HTMLInputElement가 잘 동작하는 것
// config.json에서 lib을 설정하지 않으면 기본적으로 설정된 lib이 적용된다.
// node_modules에서 typescript에 관한 내용을 찾아보면 lib 파일이 있다.

// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;

// 그래서 아래와 같이 형변환이 가능하다.
// 타입스크립트에서의 형변환은 타입을 보장하는 것이라고 이해하기(string을 number로 바꾼다거나 그런 기능은 없음)
const userInputElement = document.getElementById("user-input")! as HTMLInputElement;

// 만약 형변환을 시도하지 않는다면 아래와 같이 사용한다.
if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there!";
}

userInputElement.value = "Hi there!";

interface ErrorContainer {
  // { email: "Not a valid email", username: "Must start with a character"}
  // 객체의 key는 string이어야 하고 value도 string이어야 한다
  [key: string]: string;

  // 필수 속성을 선언할 때도 value가 string 타입이어야 함
  // 이를 해결하고 싶으면 [key: string]: string | number로 선언하면 됨
  id: string;
}

const errorBag: ErrorContainer = {
  id: "1",
  email: "Not a valid email",
};

const fetchedUserData = {
  id: "1",
  name: "hyoyoon",
  job: { title: "CEO", description: "My own company" },
};

// fetch 해 올 때 모든 데이터를 가져오지 않을 수 있음
// optional chaining을 사용
console.log(fetchedUserData?.job?.title);

const userInput1 = null;

// 이러한 방식은 Falsy로 인식되는 빈문자열("")도 "DEFAULT"로 저장한다.
const storedData = userInput1 || "DEFAULT";

// NULL 병합을 이용하여 NULL, UNDEFINED만 걸러줌

const storedData1 = userInput1 ?? "DEFAULT";
