"use strict";
console.log("Vaango anna");
//--------------------------------Classes ------------------------------
console.log("");
console.log("--------------------------------Classes ------------------------------");
//define a new class
class Department {
    //constructor that initializes name property
    constructor(n) {
        this.name = n;
    }
}
//initialize the Department class using new keyword and constructor call
const markettingDepartment = new Department("Marketting");
console.log(markettingDepartment);
//-----------------------------Classes Ends ----------------
//-----------------------------Methods and this keyword----------------
console.log("");
console.log("-----------------------------Methods and this keyword----------------");
//define a new class
class Project {
    //constructor that initializes name property
    constructor(n) {
        this.name = n;
    }
    //method
    describe() {
        console.log("The project name is " + this.name);
    }
    //method that takes in an argument
    details(manager) {
        console.log("the project name is " + this.name + " and manger is  " + manager);
    }
}
const development = new Project("Dev project");
console.log(development);
development.describe();
development.details("alan walker");
//create a new object using object literal notation
//the property describe is assigned a type which is the type of
//describe method in development object
const testing = { describe: development.describe };
//when describe method is called on testing object it prints undefined as
//inside the method we are referring to this.name
//and in this case this is the calling object testing
//that does not have a name property
testing.describe();
//define a new class
class DeliveryUnit {
    //constructor that initializes name property
    constructor(n) {
        this.name = n;
    }
    //now describe method force callers that this method is called
    //on an object that is syntactically same to the type defined for this
    describe() {
        console.log("The project name is " + this.name);
    }
    details(manager) {
        console.log("the project name is " + this.name + " and manger is  " + manager);
    }
}
const retail = new DeliveryUnit("Retail");
console.log(retail);
retail.describe();
retail.details("Enrique");
const hiTech = { describe: retail.describe };
//below lines will give an error because ts  now determines that the object
//on which describe is called does not have a name property and a details method
//hiTech.describe();
//now if we create an object and provide name and details code works fine
const insurance = {
    name: "hiTech",
    details: retail.details,
    describe: retail.describe,
};
insurance.describe();
//-----------------------------Methods and this keyword Ends----------------
//----------------------------Access Modifiers----------------------
console.log("");
console.log("----------------------------Access Modifiers----------------------");
//define a new class
class BusinessUnit {
    //constructor that initializes name property
    constructor(n, employees) {
        this.name = n;
        this.employees = employees;
    }
    describe() {
        console.log("Welcome to " + this.name + " Business Unit");
        if (this.employees) {
            console.log("This business Unit has " + this.employees.length + " employees");
            console.log("employees working here are " + this.employees);
        }
    }
    //public method
    addEmployee(employee) {
        //can access private properties and methods from within the class
        if (this.employees) {
            this.employees.push(employee);
            this.printEmployees();
        }
        else {
            this.employees = [];
            this.employees.push(employee);
            this.printEmployees();
        }
    }
    //private method
    printEmployees() {
        console.log("currently we have " + this.employees + " as employees");
    }
}
//initialize the BusinessUnit class using new keyword and constructor call
const retailBu = new BusinessUnit("Retail", []);
console.log(retailBu);
retailBu.describe();
//can access public properties
retailBu.name = "New RetailBu";
//cant access private properties
//retailBu.employees.push('Raman');
retailBu.addEmployee("chetna");
retailBu.addEmployee("hansa");
retailBu.addEmployee("naincy");
//cant access private methods
//retailBu.printEmployees();
//can access public methods
retailBu.describe();
//-----------------------------Access Modifiers Ends----------------
//----------------------------Shorthand Notation----------------------
console.log("");
console.log("----------------------------Shorthand Notation----------------------");
//define a new class
class StrategicUnit {
    //constructor that initializes name property
    constructor(name, employees) {
        this.name = name;
        this.employees = employees;
    }
    //method
    describe() {
        console.log("Welcome to " + this.name + " Strategic Unit");
        console.log("This Strategic Unit has " + this.employees.length + " employees");
        console.log("employees working here are " + this.employees);
    }
    //public method
    addEmployee(employee) {
        //can access private properties and methods from within the class
        this.employees.push(employee);
        this.printEmployees();
    }
    //private method
    printEmployees() {
        console.log("currently we have " + this.employees + " as employees");
    }
}
//initialize the StrategicUnit class using new keyword and constructor call
const retailSu = new StrategicUnit("Retail", []);
console.log(retailSu);
//can access public properties
retailSu.name = "New RetailSu";
//cant access private properties
//retailSu.employees.push('Raman');
retailSu.addEmployee("Vrinda");
retailSu.addEmployee("Namit");
retailSu.addEmployee("Neeraj");
//cant access private methods
//retailSu.printEmployees();
//can access public methods
retailSu.describe();
//-----------------------------Shorthand Notation Ends----------------
//----------------------------Read only Properties----------------------
console.log("");
console.log("----------------------------Read only Properties----------------------");
//define a new class
class StrategicBusinessUnit {
    //constructor that initializez above properties also
    //defines some additional public/private readonly and normal properties
    constructor(unitId, Id, buId, sbuId, name, employees) {
        this.unitId = unitId;
        this.Id = Id;
        this.name = name;
        this.employees = employees;
        this.buId = buId;
        this.sbuId = sbuId;
    }
    //method
    describe() {
        console.log("Welcome to " + this.name + " Strategic Business Unit");
        console.log("This Strategic Business Unit has " + this.employees.length + " employees");
        console.log("employees working here are " + this.employees);
    }
    //public method
    addEmployee(employee) {
        //can access private properties and methods from within the class
        this.employees.push(employee);
        this.printEmployees();
        //can access private readonly Properties
        console.log("Id is " + this.Id);
        console.log("Buid is " + this.buId);
        //can access public readonly Properties
        console.log("unitId is " + this.unitId);
        console.log("sbuId is " + this.sbuId);
        //cant modify private readonly property
        //this.Id=22;
        //this.buId=22;
        //cant modify public readonly property
        //this.unitId=22;
        //this.sbuId=22;
    }
    //private method
    printEmployees() {
        console.log("currently we have " + this.employees + " as employees");
    }
}
//initialize the StrategicBusinessUnit class using new keyword and constructor call
const retailSBu = new StrategicBusinessUnit(1, 2, 3, 4, "Retail", []);
console.log(retailSBu);
retailSBu.addEmployee("Malay");
retailSBu.addEmployee("Shobhit");
retailSBu.addEmployee("Niket");
//cant access private readonly Properties
//console.log('Id is '+retailSBu.Id);
//console.log('Buid is '+retailSBu.buId);
//can access public readonly Properties
console.log("unitId is " + retailSBu.unitId);
console.log("sbuId is " + retailSBu.sbuId);
//cant modify private readonly property
//retailSBu.Id=22;
//retailSBu.buId=22;
//cant modify public readonly property
//retailSBu.unitId=22;
//retailSBu.sbuId=22;
retailSBu.describe();
//-----------------------------Read only Properties Ends----------------
//-----------------------------Inheritance----------------
console.log("");
console.log("-----------------------------Inheritance----------------");
//class that extends another class
class AccountingDepartment extends Project {
}
//parent class constructor is automatically called
//we need to pass name argument as it is required by parent class constructor
const accounting = new AccountingDepartment("Accounting");
console.log(accounting);
class ItDepartment extends Project {
    constructor(name, admins) {
        //calling constructor of base class should be first line
        super(name);
        this.admins = admins;
    }
}
const itDepartment = new ItDepartment("It", ["hansaa"]);
console.log(itDepartment);
class AdminDepartment extends Project {
    constructor(admins) {
        //calling constructor of base class should be first line
        super("Admin");
        this.admins = admins;
    }
    //new methods added
    addAdmin(admin) {
        this.admins.push(admin);
    }
    displayAdmins() {
        console.log(this.admins);
    }
}
const AdminDept = new AdminDepartment(["Rudhra"]);
console.log(AdminDept);
AdminDept.addAdmin("karan");
AdminDept.displayAdmins();
AdminDept.describe();
//-----------------------------Inheritance Ends----------------
//-----------------------------Overriding Properties & The "protected" Modifier----------------
console.log("");
console.log("-------------Overriding Properties & The protected Modifier-----------");
class Floor {
    constructor(floorName, floorMarshal, employees) {
        this.floorName = floorName;
        this.floorMarshal = floorMarshal;
        this.employees = employees;
    }
    addEmployees(employee) {
        this.employees.push(employee);
    }
    printEmployees() {
        console.log("the employees on the floor are " + this.employees);
    }
    validateAndAddEmployees(employee) {
        if (employee) {
            this.employees.push(employee);
        }
    }
    currentFloorName() {
        return this.floorName;
    }
}
class AdminFloor extends Floor {
    constructor(floorMarshal, employees) {
        super("FirstFloor", floorMarshal, employees);
        this.floorMarshal = floorMarshal;
        this.employees = employees;
    }
    /*
    Cant override a private method
    private addEmployees(employee: string) {
      this.employees.push(employee);
    } */
    /*
    cant access private properties
    public printEmployees() {
      console.log("the employees on of "+this.floorName +' are ' +this.employees);
    } */
    //can override public methods
    printEmployees() {
        //can access protected methods
        console.log("the employees on of " +
            this.currentFloorName() +
            " are " +
            this.employees);
    }
    //can override protected method
    validateAndAddEmployees(employee) {
        if (employee !== "") {
            //can access protected properties
            this.employees.push(employee);
        }
    }
    //override public method
    currentFloorName() {
        //can access protected method
        return super.currentFloorName();
    }
}
const adminFloor = new AdminFloor("Neeraj", ["chetna", "namit"]);
console.log(adminFloor);
console.log(adminFloor.currentFloorName());
//cant access protected members from outside the class
//adminFloor.validateAndAddEmployees('shobhit');
//-----------------------------Overriding Properties & The "protected" Modifier Ends----------------
//----------------------------- Getters & Setters----------------
console.log("");
console.log("------------- Getters & Setters-----------");
class AccountingFloor extends Floor {
    constructor(floorMarshal, employees, reports) {
        super("FirstFloor", floorMarshal, employees);
        this.floorMarshal = floorMarshal;
        this.employees = employees;
        this.reports = reports;
        this.currentReport = "";
    }
    //getter
    get recentReport() {
        if (this.currentReport) {
            return this.currentReport;
        }
        else if (this.reports[0]) {
            return this.reports[0];
        }
        else {
            throw new Error("No report generated yet");
        }
    }
    //setter
    set recentReport(currtReport) {
        if (currtReport) {
            this.currentReport = currtReport;
        }
        else {
            throw new Error("wrong report");
        }
    }
    addReport(report) {
        this.reports.push(report);
        this.currentReport = report;
    }
}
const accountingFloor = new AccountingFloor("Neeraj", ["chetna", "namit"], []);
console.log(accountingFloor);
//call getter
try {
    console.log(accountingFloor.recentReport);
}
catch (error) {
    console.log(error);
}
//call setter
try {
    accountingFloor.recentReport = "";
}
catch (error) {
    console.log(error);
}
//call setter
accountingFloor.recentReport = "Annual sales Report";
//call getter
console.log(accountingFloor.recentReport);
accountingFloor.addReport("Budget");
//call getter
console.log(accountingFloor.recentReport);
console.log(accountingFloor);
//----------------------------- Getters & Setters Ends----------------
//----------------------------- Static Methods & Properties----------------
console.log("");
console.log("------------- Static Methods & Properties-----------");
let EmployeeUtils = /** @class */ (() => {
    class EmployeeUtils {
        static createEmployee(empName) {
            return { name: empName };
        }
        static returnDouble(num) {
            return num * 2;
        }
        returnHalf(num) {
            return num / 2;
        }
        returnNextYear() {
            //cant access static property from non static method using this
            //return this.fiscalYear+1;
            return EmployeeUtils.fiscalYear + 1;
        }
        static returnPreviousYear() {
            //can access static property from  static method using this
            return this.fiscalYear - 1;
        }
    }
    EmployeeUtils.fiscalYear = 2020;
    return EmployeeUtils;
})();
console.log(EmployeeUtils.fiscalYear);
console.log(EmployeeUtils.returnDouble(22));
console.log(EmployeeUtils.createEmployee("Rudhra"));
//cant call non static method using classNa,e
//console.log(EmployeeUtils.returnHalf(22));
//static method call to return a static property
console.log(EmployeeUtils.returnPreviousYear());
//for normal method calls we need to create an object
console.log(new EmployeeUtils().returnHalf(22));
console.log(new EmployeeUtils().returnNextYear());
//----------------------------- Static Methods & Properties Ends----------------
//----------------------------- Abstract Classes----------------
console.log("");
console.log("------------- Abstract Classes -----------");
//abstract class
class Student {
    constructor(name, rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }
    //non abstract method
    setStudentDetails(name, rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }
}
//cannot instantiate an abstract class
//const student=new Student('Rudhra',22);
class EngineeringStudent extends Student {
    getStudentDetails() {
        return new EngineeringStudent(this.name, this.rollNo);
    }
}
const engineer = new EngineeringStudent("Rudhra", 22);
console.log(engineer.getStudentDetails());
//----------------------------- Abstract Classes Ends----------------
//----------------------------- Singleton and Private constructors ----------------
console.log("");
console.log("------------- Singleton and Private constructors -----------");
class SingletonDemo {
    constructor(name) {
        this.name = name;
    }
    static getInstance() {
        if (this.instance) {
            console.log("Instance available returning");
            return this.instance;
        }
        console.log("no instance available creating a new instance and returning");
        this.instance = new SingletonDemo("Rudhra");
        return this.instance;
    }
}
//cant instantiate using new keyword as constructor is private
//const singleton = new SingletonDemo('Rudhra');
const singletonClass = SingletonDemo.getInstance();
console.log(singletonClass);
console.log(SingletonDemo.getInstance());
console.log(SingletonDemo.getInstance());
//----------------------------- Singleton and Private constructors Ends----------------
//----------------------------- Interfaces ----------------
console.log("");
console.log("------------- Interfaces -----------");
const user1 = {
    name: "Rudhra",
    greet(message) {
        console.log(message + "  " + this.name);
    },
};
user1.greet("heyaa");
//class implements interface
class Greeter {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet(message) {
        console.log(message + "  " + this.name);
    }
}
//interface used as a type for a variable
let Welcomer;
//interface type variable saves an object of implementing class
Welcomer = new Greeter("Rudhra", 30);
console.log(Welcomer);
Welcomer.greet("Good Morning ");
//class implements interface
class WishMan {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet(message) {
        console.log(message + "  " + this.name);
    }
}
let morningWisher;
morningWisher = new WishMan("Rudhra", 30);
morningWisher.greet("gud Morning");
class AgedNightWisher {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    revealAge() {
        return `the age of wisher is ${this.age}`;
    }
    greet(message) {
        console.log(message + "  " + this.name);
    }
}
const AgedNightWisherGuy = new AgedNightWisher("Avijit", 45);
AgedNightWisherGuy.revealAge();
AgedNightWisherGuy.greet("Gud night");
let adder;
//error as dder does not follow signature specified in AddFn
//adder = (n1: string, n2: number) => n1 + n2;
adder = (n1, n2) => n1 + n2;
console.log(adder(2, 6));
class EveningWisher {
    //Constructor with optional properties
    constructor(name, style, age, eyeColor = "Red", shirtColor) {
        this.name = name;
        this.style = style;
        if (age) {
            this.age = age;
        }
        if (eyeColor) {
            this.eyeColor = eyeColor;
        }
        if (shirtColor) {
            this.shirtColor = shirtColor;
        }
    }
    revealAge() {
        if (this.age) {
            return `the age of wisher is ${this.age}`;
        }
        return "age is just a number";
    }
}
const eveningWisher1 = new EveningWisher("Rudhra", "Retro");
console.log(eveningWisher1);
const eveningWisher2 = new EveningWisher("Chetna", "Jazz", 22);
console.log(eveningWisher2);
const eveningWisher3 = new EveningWisher("Vrinda", "Classical", 23, "Brown");
console.log(eveningWisher3);
const eveningWisher4 = new EveningWisher("Malay", "Cool", 24, "Black", "Blue");
console.log(eveningWisher4);
//cant just skip middle parameter
//const eveningWisher5=new EveningWisher('Rudhra','Retro','Green');
//# sourceMappingURL=app.js.map