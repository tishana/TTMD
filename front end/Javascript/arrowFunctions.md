Objectives:
- Write a paragraph describing arrow functions
- Rewrite the inner function from uniqueIdValidator as a standard function (not arrow function)
- Rewrite the outer function from uniqueIdValidator as an arrow funtion
- Sources:
    * Eloquent Javascript - https://eloquentjavascript.net/03_functions.html
    * W3Schools Arrow Functions - https://www.w3schools.com/js/js_arrow_function.asp

    Arrow functions were introduced in 2015 with ES6 to write functions with less code. The basic syntax is:

    ```javascript
    // standard function
    const upDog = function() {
        return "What is up, dog?";
    }
    // arrow function
    const downDog = () => {
        return "I love YOGA!";
    }
    // OR, even less code if the functions only has one statement:
    const dog = () => "woof!";

    const beg = item => "please give me " + item; // no parentheses
    ```
The first part is the parentheses, with or without parameters.
```javascript
// with parameters
const madLib = (feeling, noun, number) => {
    return "My arm is " + feeling + " about the " + noun + " and the " + number + " pizzas I ate!";
}    
```
The arrow replaces the word function, and is created using the equal sign and greater-than sign, respectively ( => ). The remainder of the function is basically the same.

Special use of "this"

Standard functions handle the use of the keyword 'this' by referencing the object that is calling the function, whereas in arrow functions, 'this' can represent the entire object the arrow fuction belongs to or more precisely, where the arrow function is defined. 


outer function written as an arrow function:
```typescript
static uniqueId = (error: string, control: string) => {
    return (formArray: FormArray): { [key: string]: any } | null => {
        const ids = formArray.value.map(x => x[control]);
        const y = new Set(ids);
        if (y.size !== ids.length) {
            y.forEach(x => {
                // tslint:disable-next-line: prefer-const
                let r = [];
                let idx = ids.indexOf(x);
                while (idx !== -1) {
                    r.push(idx);
                    idx = ids.indexOf(x, idx + 1);
                }
                if (r.length >= 2) {
                    r.forEach(z => {
                        // tslint:disable-next-line:max-line-length
                        (<FormGroup>formArray.controls[z]).controls[control].setErrors(getValidatorError(error));
                    });
                }
            });
            return getValidatorError(error);
        } else {
            y.forEach(x => {
                // tslint:disable-next-line: prefer-const
                let r = [];
                let idx = ids.indexOf(x);
                while (idx !== -1) {
                    r.push(idx);
                    idx = ids.indexOf(x, idx + 1);
                }
                r.forEach(z => {
                    (<FormGroup>formArray.controls[z]).controls[control].setErrors(null);
                });
            });
            return null;
        }
    };
}

```
Inner function of uniqueId writting as a standard function:
```typescript
export function uniqueId(error: string, control: string): ValidatorFn {
    return function (formArray: FormArray): { [key: string]: any } | null { // return in FRONT of function?
        const ids = formArray.value.map(x => x[control]);
        const y = new Set(ids);
        if (y.size !== ids.length) {
            y.forEach(x => {
                // tslint:disable-next-line: prefer-const
                let r = [];
                let idx = ids.indexOf(x);
                while (idx !== -1) {
                    r.push(idx);
                    idx = ids.indexOf(x, idx + 1);
                }
                if (r.length >= 2) {
                    r.forEach(z => {
                        // tslint:disable-next-line:max-line-length
                        (<FormGroup>formArray.controls[z]).controls[control].setErrors(getValidatorError(error));
                    });
                }
            });
            return getValidatorError(error);
        } else {
            y.forEach(x => {
                // tslint:disable-next-line: prefer-const
                let r = [];
                let idx = ids.indexOf(x);
                while (idx !== -1) {
                    r.push(idx);
                    idx = ids.indexOf(x, idx + 1);
                }
                r.forEach(z => {
                    (<FormGroup>formArray.controls[z]).controls[control].setErrors(null);
                });
            });
            return null;
        }
    };
}
```