class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    greet(){
        console.log('hello my name is ' + this.name)
    }
}

const hasnain = new Person('Syed Hasnain', 23)
hasnain.greet()
