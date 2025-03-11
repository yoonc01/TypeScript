// interface를 타입으로 선언해도 잘 동작한다.
// 다만 interface는 같은 이름으로 여러 번 선언 시 자동으로 병합된다.
// js에 interface에 대한 내용이 없기에 js로 변환되었을 때 코드로 존재하지 않는다.

interface Named {
    // readonly 설정 가능
    readonly name?: string;
    // optional로 설정
    outputName?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

// , 로 여러 개의 interface implement 가능
class Person implements Greetable {
    //여기도 optional 사용 가능 대신 Greetable의 name이 optional이어야 함
     name?: string;

     // 생성자를 name 없이 선언 가능
     constructor(name?: string) {
        if (name)
            this.name = name;
     }

    greet(phrase: string) {
        if (this.name)
            console.log(`${phrase} this.name`);
        else
            console.log("HI!");
    }
}

let user1: Greetable;

user1 = new Person("hyoyoon");

user1.greet("Hi there - I am");

// interface로 함수 타입 정의하기 
interface AddFn {
    (a: number, b: number): number;
}

let addFunction: AddFn;

addFunction = (a: number, b: number) => (a + b);