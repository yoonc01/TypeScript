//return type
// refer number
function add(n1: number, n2: number) {
    return n1 + n2;
}

// refer string
function add(n1: number, n2: number) {
    return n1.toString() + n2.toString();
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