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
  constructor(n: string) {
    this.name = n;
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
const retailBu = new BusinessUnit("Retail");

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
