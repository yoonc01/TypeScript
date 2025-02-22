//return type

// refer string
//function add(n1: number, n2: number) {
    //return n1.toString() + n2.toString();
//}

// refer number
function add(n1: number, n2: number) {
    return n1 + n2;
}

// 명시적으로 반환 타입 설정 가능
function add(n1: number, n2: number): number {
    return n1 + n2;
}

// return nothing => void
function printResult(num: number) {
    console.log("Result: " + num);
}

printResult(add(1, 2));

// return undefined or void
// 그냥 void 쓰는 게...!
function printResult1(num: number): undefined {
    console.log("Result: " + num);
    return ;
}

// any로 설정된 combineValues는 함수가 아닌 다른 값이 들어갈 수 있어 runtime error 발생 가능성이 있다
// let combineValues;

// Function으로 타입을 설정하면 이제 함수만 넣을 수 있지만 반환 타입까지 검사해주지는 않는다.
// let combineValues: Function;

// () 안의 타입까지 맞아야 한다!
let combineValues: (a: number, b: number) => number;

// 오류가 발생한다!
// combineValues = printResult;

combineValues = add;
console.log(combineValues(1, 2));

// callback type
function addAndHandle(n1: number, n2:number, callback:(num: number) => void) {
    const result = n1 + n2;
    // void를 반환하는 것은 반환값으로 아무것도 하지 않겠다는 의미를 내포할 때 쓰기도 한다.\
    // 그래서 밑의 예제에서 callback 함수가 return 값이 있어도 오류가 발생하지 않는다.
    callback(result);
}

addAndHandle(10, 20, (result) => {
    console.log(result);
    return result;
})