console.log("Vaango anna");
//--------------------------------Classes ------------------------------
console.log("");
console.log(
  "--------------------------------Classes ------------------------------"
);
//define a new class
class Department {
  //properties in the class
  name: string;

  //constructor that initializes name property
  constructor(n: string) {
    this.name = n;
  }
}
//initialize the Department class using new keyword and constructor call
const markettingDepartment = new Department("Marketting");

console.log(markettingDepartment);
//-----------------------------Classes Ends ----------------

//-----------------------------Methods and this keyword----------------
console.log("");
console.log(
  "-----------------------------Methods and this keyword----------------"
);
//define a new class
class Project {
  //properties in the class
  name: string;

  //constructor that initializes name property
  constructor(n: string) {
    this.name = n;
  }
  //method
  describe() {
    console.log("The project name is " + this.name);
  }
  //method that takes in an argument
  details(manager: string) {
    console.log(
      "the project name is " + this.name + " and manger is  " + manager
    );
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
  //properties in the class
  name: string;

  //constructor that initializes name property
  constructor(n: string) {
    this.name = n;
  }
  //now describe method force callers that this method is called
  //on an object that is syntactically same to the type defined for this
  describe(this: DeliveryUnit) {
    console.log("The project name is " + this.name);
  }
  details(manager: string) {
    console.log(
      "the project name is " + this.name + " and manger is  " + manager
    );
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
console.log(
  "----------------------------Access Modifiers----------------------"
);
//define a new class
class BusinessUnit {
  //properties in the class
  public name: string;
  private employees: string[];

  //constructor that initializes name property
  constructor(n: string, employees: string[]) {
    this.name = n;
    this.employees = employees;
  }
  public describe() {
    console.log("Welcome to " + this.name + " Business Unit");
    if (this.employees) {
      console.log(
        "This business Unit has " + this.employees.length + " employees"
      );
      console.log("employees working here are " + this.employees);
    }
  }
  //public method
  public addEmployee(employee: string) {
    //can access private properties and methods from within the class

    if (this.employees) {
      this.employees.push(employee);
      this.printEmployees();
    } else {
      this.employees = [];
      this.employees.push(employee);
      this.printEmployees();
    }
  }
  //private method
  private printEmployees() {
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
console.log(
  "----------------------------Shorthand Notation----------------------"
);

//define a new class
class StrategicUnit {
  //constructor that initializes name property
  constructor(public name: string, private employees: string[]) {}
  //method
  public describe() {
    console.log("Welcome to " + this.name + " Strategic Unit");

    console.log(
      "This Strategic Unit has " + this.employees.length + " employees"
    );
    console.log("employees working here are " + this.employees);
  }
  //public method
  public addEmployee(employee: string) {
    //can access private properties and methods from within the class
    this.employees.push(employee);
    this.printEmployees();
  }
  //private method
  private printEmployees() {
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
console.log(
  "----------------------------Read only Properties----------------------"
);

//define a new class
class StrategicBusinessUnit {
  //public and private readonly properties
  private readonly buId: number;
  public readonly sbuId: number;

  //constructor that initializez above properties also
  //defines some additional public/private readonly and normal properties
  constructor(
    public readonly unitId: number,
    private readonly Id: number,
    buId: number,
    sbuId: number,
    public name: string,
    private employees: string[]
  ) {
    this.buId = buId;
    this.sbuId = sbuId;
  }
  //method
  public describe() {
    console.log("Welcome to " + this.name + " Strategic Business Unit");

    console.log(
      "This Strategic Business Unit has " + this.employees.length + " employees"
    );
    console.log("employees working here are " + this.employees);
  }
  //public method
  public addEmployee(employee: string) {
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
  private printEmployees() {
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
class AccountingDepartment extends Project {}
//parent class constructor is automatically called
//we need to pass name argument as it is required by parent class constructor
const accounting = new AccountingDepartment("Accounting");
console.log(accounting);

class ItDepartment extends Project {
  private admins: string[];
  constructor(name: string, admins: string[]) {
    //calling constructor of base class should be first line
    super(name);
    this.admins = admins;
  }
}
const itDepartment = new ItDepartment("It", ["hansaa"]);
console.log(itDepartment);
class AdminDepartment extends Project {
  constructor(public admins: string[]) {
    //calling constructor of base class should be first line
    super("Admin");
  }
  //new methods added
  addAdmin(admin: string) {
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
console.log(
  "-------------Overriding Properties & The protected Modifier-----------"
);

class Floor {
  constructor(
    private floorName: string,
    public floorMarshal: string,
    protected employees: string[]
  ) {}

  private addEmployees(employee: string) {
    this.employees.push(employee);
  }

  public printEmployees() {
    console.log("the employees on the floor are " + this.employees);
  }

  protected validateAndAddEmployees(employee: string) {
    if (employee) {
      this.employees.push(employee);
    }
  }

  protected currentFloorName() {
    return this.floorName;
  }
}
class AdminFloor extends Floor {
  constructor(public floorMarshal: string, protected employees: string[]) {
    super("FirstFloor", floorMarshal, employees);
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
  public printEmployees() {
    //can access protected methods
    console.log(
      "the employees on of " +
        this.currentFloorName() +
        " are " +
        this.employees
    );
  }
  //can override protected method
  protected validateAndAddEmployees(employee: string) {
    if (employee !== "") {
      //can access protected properties
      this.employees.push(employee);
    }
  }

  //override public method
  public currentFloorName() {
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
  private currentReport: string = "";

  //getter
  get recentReport() {
    if (this.currentReport) {
      return this.currentReport;
    } else if (this.reports[0]) {
      return this.reports[0];
    } else {
      throw new Error("No report generated yet");
    }
  }
  //setter
  set recentReport(currtReport: string) {
    if (currtReport) {
      this.currentReport = currtReport;
    } else {
      throw new Error("wrong report");
    }
  }
  constructor(
    public floorMarshal: string,
    protected employees: string[],
    public reports: string[]
  ) {
    super("FirstFloor", floorMarshal, employees);
  }

  addReport(report: string) {
    this.reports.push(report);
    this.currentReport = report;
  }
}

const accountingFloor = new AccountingFloor("Neeraj", ["chetna", "namit"], []);

console.log(accountingFloor);
//call getter
try {
  console.log(accountingFloor.recentReport);
} catch (error) {
  console.log(error);
}
//call setter
try {
  accountingFloor.recentReport = "";
} catch (error) {
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

class EmployeeUtils {
  static fiscalYear = 2020;

  static createEmployee(empName: string) {
    return { name: empName };
  }

  static returnDouble(num: number) {
    return num * 2;
  }

  returnHalf(num: number) {
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
abstract class Student {
  constructor(protected name: string, protected rollNo: number) {}

  //abstract method
  abstract getStudentDetails(): Student;
  //non abstract method
  setStudentDetails(name: string, rollNo: number) {
    this.name = name;
    this.rollNo = rollNo;
  }
}

//cannot instantiate an abstract class
//const student=new Student('Rudhra',22);

class EngineeringStudent extends Student {
  getStudentDetails(): Student {
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
  private static instance: SingletonDemo;
  private constructor(private name: string) {}

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

interface Greetable {
  name: string;

  greet(message: string): void;
}

const user1: Greetable = {
  name: "Rudhra",

  greet(message: string) {
    console.log(message + "  " + this.name);
  },
};

user1.greet("heyaa");

//class implements interface
class Greeter implements Greetable {
  name: string;
  //extra fields
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  greet(message: string): void {
    console.log(message + "  " + this.name);
  }
}

//interface used as a type for a variable
let Welcomer: Greetable;
//interface type variable saves an object of implementing class
Welcomer = new Greeter("Rudhra", 30);
console.log(Welcomer);
Welcomer.greet("Good Morning ");

interface Wisher {
  readonly name: string;

  greet(message: string): void;
}

//class implements interface
class WishMan implements Wisher {
  name: string;
  //extra fields
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  greet(message: string): void {
    console.log(message + "  " + this.name);
  }
}

let morningWisher: Wisher;
morningWisher = new WishMan("Rudhra", 30);
morningWisher.greet("gud Morning");
//read only beaviour enforced because of interface
//morningWisher.name='Vikas';

//Interface inheritance
interface AgedWishMan extends Wisher {
  age: number;
  revealAge(): string;
}

class AgedNightWisher implements AgedWishMan {
  age: number;
  name: string;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  revealAge(): string {
    return `the age of wisher is ${this.age}`;
  }

  greet(message: string): void {
    console.log(message + "  " + this.name);
  }
}

const AgedNightWisherGuy = new AgedNightWisher("Avijit", 45);
AgedNightWisherGuy.revealAge();
AgedNightWisherGuy.greet("Gud night");

//Interface as a function type
interface AddFn {
  (n1: number, n2: number): number;
}
let adder: AddFn;
//error as dder does not follow signature specified in AddFn
//adder = (n1: string, n2: number) => n1 + n2;
adder = (n1: number, n2: number) => n1 + n2;
console.log(adder(2, 6));

//Interface with optional properties
interface StylishWishMan {
  //Optional property
  age?: number;
  readonly name: string;
  //Optional property
  style?: string;
  //Optional property
  eyeColor?: string;
  //Optional method
  greet?(message: string): void;
  revealAge(): string;
}

class EveningWisher implements StylishWishMan {
  //Optional property in interface and class
  age?: number;
  name: string;
  //Optional property in interface required in class
  style: string;
  //Optional property in interface and class
  eyeColor?: string;
  //Optional property in interface and class
  shirtColor?: string;
  //Constructor with optional properties
  constructor(
    name: string,
    style: string,
    age?: number,
    eyeColor: string = "Red",
    shirtColor?: string
  ) {
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
  revealAge(): string {
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
