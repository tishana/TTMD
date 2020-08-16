Validators in Angular-

https://angular.io/api/forms/Validators

Validators are functions used in Angular to ensure data integrity. The validators are added to form services for reactive forms. There are built in validators, such as required, and maxLength(), which indicate a mandatory field and a maximum length of characters, respectively. You can also create custom validators, adding logic specific to your application. Validators can be sync or async. Sync validators immediately return errors or null, where async validators return errors later through a promise or observable. Sync validators are passed into the second argument of formControls (or formArrays, or formGroups), and async validators are passed into the third argument.

•	What is the structure of validators? 
The validator's structure is that of a function with additional parameters as you see fit. In the *uniqueId validator, the parameter is the error as a string (error: string) to be passed into the section of the validator that sets the error for whichever formControl we are validating if it fails to pass the logic, of course. *Within the validator function is an "inner function", whose input is the formArray, formControl, or formGroup that the validator is placed on. That form group, array, or control is accessed in the inner function. The validator is also required to return a *value, an object containing the validation errors or null, to the formControl if there is an error and returns null if there is no error. The logic for each custom validator is subjective to its creator and application. 

•	What are their inputs?
Validator inputs are the parameters included. For uniqueIds, that would be the error as a string.

•	What do they return?
Validators return a function. The function returns and error or null.

•	How and why do they sometimes need to add and remove errors on individual form controls?
In the case of uniqueId validator, and error will be added to each form control if two or more ids match. If a user changes the value of one of the matching ids to a unique id, the error needs to be cleared from the matching id from the first part of this case. I would do this by checking to see if there is already an error on the formControl then removing it if the field has otherwise passed the validation, and like num-populated-fields, I would do it with a separate function to add the errors, and remove the errors. *Setting and removing the errors on the individual form controls within a form array or form group communicates to the user what exactly is invalid about the items within the form array or form group because the validator function simply sets the entire form array or form group as invalid. If the validator was on a form control, as opposed to a form array or form group, the individual control would be invalid. By setting the error on a form control WITHIN a form array (or form group), we show the user that THIS form control is why the form array is invalid. Then a user can modify the form control. Once the user modifies the form control and makes the form array (or form group) valid, we should remove the error from the individual form control.

*return (formArray: FormArray): { [key: string]: any } | null 
return is the action (this is an unnamed function)
 formArray is the input parameter,
 {[key: string] : any } | null is the return value type

Adding more than one validator for a field-
Use [] around the Validator methods, otherwise, neither will work.
Example:
```typescript
eqrReceivedCount: [values.eqrReceivedCount, [Validators.min(0), Validators.max(999)]]
```
Adding tests for Validators-
This checks that if the value placed within the mentioned field does not pass validation, it will pass an error:
In General-Information Service:
```typescript
it('eqrReceivedCount field triggers an error if lower than 0', () => {
            form.controls['eqrReceivedCount'].setValue(-23);
            expect(form.controls['eqrReceivedCount'].errors.min).toBeTruthy();
        });
```
Creating Error messages for Validators-

This gives the user the reason why their input failed validation:

```typescript
// Specifying the error on form-hints.service.ts
getErrorMessage(form: FormGroup, field: string): string {
        const errors = form.controls[field].errors;
        if (error === 'min') {
            return this.getMinMessage(errors);
        }
}
// Customizing the error message
 getMinMessage(errors: any): string {
        return 'This value must be more than or equal to ' + errors['min']['min'];
    }
```

Adding unit tests for validator errors-
```typescript
it('calls getMinMessage function with errors as a parameter if there is a min error', () => {
            const errors = { min: { min: 10 } };
            expect(service.getMinMessage).toHaveBeenCalledTimes(0);
            form.controls['sampleField'].setErrors(errors);
            service.getErrorMessage(form, 'sampleField');
            expect(service.getMinMessage).toHaveBeenCalledTimes(1);
            expect(service.getMinMessage).toHaveBeenCalledWith(errors);
        });
describe('the getMinMessage function', () => {
        it('should return a message with specified min limit', () => {
            const errors = { min: { min: 10 } };
            const message = service.getMinMessage(errors);
            expect(message).toEqual('This value must be more than or equal to 10');
        });
    });
``` 

Helpful for finding how to use .indexOf() to find all orccurences for an element: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

Example:
```javascript
var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.indexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = array.indexOf(element, idx + 1);
}
console.log(indices);
// [0, 2, 4]
```

How I used it:
```typescript
 y.forEach(x => {
    let r = [];
    let idx = eqroLookupsIds.indexOf(x); // find the indices of matching values in eqroLookupIds
    while (idx !== -1) {
        r.push(idx); // add indxx of matching id to r
        idx = eqroLookupIds.indexOf(x, idx + 1); // advances to the next index in idx to continue loop
        }
    if (r.length > 1) { // not necessary because if r is empty nothing will happen
        r.forEach(z => {
            formArray.controls[z].setErrors({ error: true }); // set error in the formArray on the control at z
            });
    } else { //  also unecessary
        return null; } // do nothing
        // else, set error on ids at the indices in r
        // });
        return getValidatorError(error);
```

Need to change uniqueId validator (EQR) into separate functions within a validator class:
```typescript
static setFormControlErrors(list: string[], ids: string[], formArray: FormArray){
        // get array/object
        // iterate through array/object
        // set error for item
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
        // removing error from affected ids (separate function)
            });
    }

    static clearFormControlErrors(list: [], ids: [], formArray: FormArray, control: string): void {
        // if error is present
        // clear error
        list.forEach(x => {
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
    }
```