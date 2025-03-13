const names: Array<string> = ["hyo", "yoon"]; // string[]

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});

// Promise<string>을 통해 반환된 data가 string이라는 것을 알 수 있다.
promise.then((data) => {
  data.split(" ");
});

// 아래 방식은 반환 타입이 object로 고정되기에 타입스크립트는 반환된 object가 해당 속성을 가지고 있는지 모른다.
// 그래서 1번 예시에서 mergedObj.age를 접근하려고 하면 오류가 난다.
// function merge(objA: object, objB: object) {
//     return Object.assign({}, objA, objB);
// }

function merge<T, U>(objA: T, objB: U) {
  return Object.assign({}, objA, objB);
}

// 1번 예시
const mergedObj = merge({ name: "hyoyoon" }, { age: 29 });
mergedObj.age;
console.log(mergedObj);

// 2번 예시
// 1은 객체가 아니기에 무시함
// 이런 경우를 방지하기 위해 Generic를 사용하면서도 T extends object로 객체여야 한다는 제한을 추가하면 된다.
const mergedObj2 = merge<string, number>("hello", 1);
console.log(mergedObj2);

function mergeObject<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign({}, objA, objB);
}

// 오류 발생
const mergedObj3 = mergeObject<string, number>("hello", 1);

interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = `Got 1 element.`;
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements.`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there!"));
console.log(countAndDescribe(["hyoyoon", "god"]));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return `Value: ${obj[key]}`;
}

// 오류
extractAndConvert({}, "name");

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) == -1) return;
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const stringStorage = new DataStorage<string>();
stringStorage.addItem("hyoyoon1");
stringStorage.addItem("hyoyoon2");
stringStorage.addItem("hyoyoon3");
stringStorage.addItem("hyoyoon4");
stringStorage.addItem("hyoyoon5");

stringStorage.removeItem("hyoyoon1");

console.log(stringStorage.getItems());

const objectStorage = new DataStorage<object>();
objectStorage.addItem({ name: "hyoyoon" });
objectStorage.addItem({ name: "hyoyoon1" });
objectStorage.addItem({ name: "hyoyoon2" });

// 의도한대로 동작하지 않음
// 참조로 찾기에
// 변수로 설정 후에 넣어야 한다.
// 그래서 객체는 허용하지 않고 원시값들만 가능하게 하는 것이 좋을 거 같음
objectStorage.removeItem({ name: "hyoyoon" });

console.log(objectStorage.getItems());
