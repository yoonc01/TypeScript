// Decorator는 대문자로 시작하는 것이 관례
function Logger(logString: string) {
  console.log("Logger Factory");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("Template Factory");
  return function<T extends {new(...args: any[]): {name: string}}> (originalConstructor: T) {
    return class extends originalConstructor {
        // python의 for _ in range(n) 느낌의 _임
        constructor(..._: any[]) {
            super();
            console.log("Rendering template");
            const hookElement = document.getElementById(hookId);
            if (hookElement) {
            hookElement.innerHTML = template;
            hookElement.querySelector("h1")!.textContent = this.name;
            }
        }
    }
  };
}

// Decorator는 class가 선언될 때 실행됨

// 아래는 실행 순서
// factory 함수는 코드 순
// decorator는 bottom-up 순서

// 왜?????????? 를 찾아보자 진짜 이해가 안 가네

// 굳이 Factory로 해서 실행하는 이유도 찾아보자 그냥 강사 마음인가

// app.js:9  Logger Factory
// app.js:16 Template Factory
// app.js:18 Rendering template
// app.js:30 Creating person object...
// app.js:11 Logging - DecoratorPerson
// app.js:12 class DecoratorPerson {
//     constructor() {
//         this.name = "hyoyoon";
//         console.log("Creating person object...");
//     }
// }
// app.js:30 Creating person object...


@Logger("Logging - DecoratorPerson")
@WithTemplate("<h1>My Decorator Person Object</h1>", "app")
class DecoratorPerson {
  name = "hyoyoon";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new DecoratorPerson();

console.log(pers);

function Log(target: any, propertyName: string | Symbol) {
    console.log("Property decorator!");
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log(":Parameter decorator!");
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(price: number) {
        if (price > 0)
            this._price = price;
        else
            throw new Error("Invalid price - should be positive!");
    }
    constructor(title: string, price: number) {
        this.title = title;
        this._price = price;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product("Book1", 19);
const p2 = new Product("Book2", 19);
const p3 = new Product("Book3", 19);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  // Autobind를 통해 객체로 this binding
  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button .addEventListener("click", p.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // ["required", "positive"]
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
  ...registeredValidators[target.constructor.name],
    [propName]: ["required"]
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
  ...registeredValidators[target.constructor.name],
    [propName]: ["positive"]
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          // !!는 truthy와 falsy를 boolean으로 형 변환을 한다.
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", e => {
  e.preventDefault();
  const titleElement = document.getElementById("title") as HTMLInputElement;
  const priceElement = document.getElementById("price") as HTMLInputElement;

  const title = titleElement.value;
  const price = +priceElement.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid Input!");
    return;
  }
  console.log(createdCourse);
});
