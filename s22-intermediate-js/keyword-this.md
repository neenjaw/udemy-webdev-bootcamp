# How 'this' works in Javascript

## 1. Global Context

> when 'this' is not inside of a declared object

```js
console.log(this) // window

function whatIsThis() {
    return this;
}

function variablesInThis() {
    // since the value of this is the window
    // all we are doing here is creating a global variable

    this.person = "elie"; //sets the person property of the window object
}
```

- is a variable that referes to the global Object. (aka the window Object)
- setting properties of the global this is a bad practice generally
- this is why `"use strict"` mode was created in ES5
  - disallows the use of the global context of this inside of a function.

## 2. Inside of a declared object

```js
var person = {
    firstName: "Elie",
    sayHi: function() {
        return "Hi " + this.firstName;
    },
    determineContext: function() {
        return this === person;
    }
}
```

- we look at the closest parent object to see the value of this inside of a declared object.

### But what about inside of nested objects

```js
var person = {
    firstName: "Cotl",
    sayHi: function() {
        return "Hi " + this.firstName;
    },
    determineContext: function() {
        return this === person;
    },
    dog: {
        sayHello: function() {
            //returns "Hello undefined" as firstname is undefined in this context
            return "Hello " + this.firstName;
        },
        determineContext() {
            //returns false as person is undefined in this context
            return this === person;
        }
    }
}
```

## 3. Using 'this' with explicit binding

> 'call', 'apply', and 'bind' can only be called by functions.

| Name of Method | Parameters | Invoke Immediately |
|----------------|------------|--------------------|
| Call | thisArg, a, b, c, ... | Yes |
| Apply | thisArg, [a, b, c, ...] | Yes |
| Bind | thisArg, a, b, c, ... | No |

> Function definition:
> If a function is created and returned, but not invoked, then it is a function definition

- bind allows for functions to be saved, good for callbacks and currying

### Using 'Call'

```js
person.dog.sayHello() // "Hello undefined"
person.dog.sayHello.call(person) // "Hello Colt"
```

The seconds function call sets the person to 'this' allowing the function to return a defined value.

More often, `Call` is used to make code DRY'er:

```js
var colt = {
    firstName: "Colt",
    sayHi: function () {
        return "Hi " + this.firstName;
    }
}

var elie = {
    firstName: "Elie",
    sayHi: function () {
        return "Hi " + this.firstName;
    }
}

colt.sayHi();
elie.sayHi(); //calls the redundant code
```

How could this be refactored?

```js
var colt = {
    firstName: "Colt",
    sayHi: function () {
        return "Hi " + this.firstName;
    }
}

var elie = {
    firstName: "Elie"
}

colt.sayHi();
colt.sayHi.call(elie); //now calls the one function, making it more DRY
```

### Using 'Apply'

Not much difference from `Call` until we take into account arguments.

```js
colt.addNumbers.call(elie, 1, 2, 3, 4);
colt.addNumbers.apply(elie, [1, 2, 3, 4]);
```

### Using 'Bind'

Similar to 'Call' but does not invoke the function, but returns a function definition.

```js
var elieCalc = colt.addNumbers.bind(elie, 1, 2, 3, 4);
elieCalc();

var elieCalc2 = colt.addNumbers.bind(elie, 1, 2);
elieCalc2(3,4);
```