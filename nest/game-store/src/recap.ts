const testValue = 'Carlos'
const age = 12

const sumFunction = (a: number, b: number) => {
  return a + b
}

sumFunction(age, age + 1)

class Person {
  private age: number
  private name: string

  constructor(age: number, name: string) {
    this.age = age
    this.name = name
  }

  getSummary() {
    return `My name is ${this.name} and my age is ${this.age}`
  }
}

const person1 = new Person(age, testValue)
person1.getSummary()
