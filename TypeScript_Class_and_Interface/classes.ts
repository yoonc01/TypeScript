class Department {
    static fiscalYear = 2020;
    // readonly를 사용해서 초기화된 후에는 수정할 수 없게 할 수 있음
    // private 선언
    protected readonly id: number;
    private name: string;

    //protected로 선언하여 상속한 class에서 사용할 수 있게 함
    protected employees: string[] = [];

    // 생성자
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    static createEmployee(name: string) {
        return {name: name};
    }

    /*
        constructor (private name: string) {} 으로 작성해서 property 선언을 하지 않고 약식으로 사용 가능
     */

    // 매개변수를 this: Department로 선언하면 this는 항상 Department만 가리켜야 함
    describe(this: Department) {
        console.log(this.id);
        console.log(this.name);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    public admins: string[];
    constructor(id: number, admins: string[]) {
        super(id, "IT");
        // 부모 class 초기화 후 초기화 가능
        this.admins = admins;
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    // 싱글톤 패턴

    get getLastReport() {
        if (this.lastReport)
            return this.lastReport;
        throw new Error("No report found.");
    }

    set setLastReport(value: string) {
        if (!value)
            throw new Error("Please pass in a valid value");
        this.addReport(value);
    }

    //singleton pattern
    private constructor (id: number, private reports: string[]) {
        super(id, "Accounting");
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment(1, []);
        return this.instance;
    }

    describe(){
        console.log(this.id);
    }

    //method override
    addEmployee(name: string) {
        if (name === "hello") {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

const employee1 = Department.createEmployee("Hyoyoon");

console.log(employee1, Department.fiscalYear);

const it = new ITDepartment(1, ["hello"]);

const accounting = AccountingDepartment.getInstance();
const accounting1 = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting1, accounting2);

accounting.addReport("Souething went wrong...");

//getter 
console.log(accounting.getLastReport);

//setter
accounting.setLastReport = "";

accounting.addEmployee("hello");
accounting.addEmployee("hello11");

accounting.describe();
accounting.printEmployeeInformation();

const hyoyoon = new Department(1, "hyoyoon");

hyoyoon.addEmployee("hello");
hyoyoon.addEmployee("boy");

// hyoyoon.employees[2] = "private need";

console.log(hyoyoon);

hyoyoon.describe();
hyoyoon.printEmployeeInformation();

// const hyoyoonCopy = {name: "hyoyoonCopy", describe: hyoyoon.describe };

// undefined
// this는 호출하는 녀석을 가리킨다라고 이해하면 편함
// hyoyoonCopy.describe();