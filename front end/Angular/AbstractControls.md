FormArrays, FormControl, and FormGroups are all subclasses of AbstractControl

FormControl

According to Angular documentation, FormControl tracks the value and validation status of an individual form control. I have history with this in COR-2473 where I modified the value of eqrReceivedCount through the command: 
```typescript
generalInfoForm.controls['eqrReceivedCount'].setValue(2)
```
with .controls[] giving me access to properties inhereted from AbstractControl, such as value, validator, status, valid, pristine, and dirty, as well as other methods (like patchValue(), and reset()).

see https://angular.io/api/forms/FormControl 

FormGroup

FormGroup tracks the value and validity status of FormControls, meaning checking for the group of FormControls as one object. Each control has the control name as the key, and the value of said control as the value. According to Angular documentation, if one of the controls in the FormGroup is invalid, the entire group is invalid. FormGroups "calculates its status by reducing the status values of its children."

You instantiate a FormGroup by passing in a collections of child controls, as follows:
```typescript

```


see https://angular.io/api/forms/FormGroup

FormArray

FormArray is the last of the three fundamental AbstractControl subclasses. FormArray is similar to FormGroup in that tracks the value and validity of multiple FormControls, but it's form is an array, not an object.

Using FormArray.value will allow you to access the FormArray as a standard array. For instance, you can now use higher order fuctions like .map() and .reduce(). Before using .value, you would have had to get through all of the FormArray specific values (see documentation at https://angular.io/api/forms/FormArray )

https://netbasal.com/angular-reactive-forms-the-ultimate-guide-to-formarray-3adbe6b0b61a