function pig(name, age) {
    this.name = name;
    this.age = age;
    this.sayHello = function () {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }

}
pig.sayHello = function () {
    console.log("Hello, I am a pig.");
}

const pig1 = new pig("piggy", 2);
const pig2 = new pig("porky", 3);
pig1.sayHello(); // 输出: Hello, my name is piggy and I am 2 years old.


