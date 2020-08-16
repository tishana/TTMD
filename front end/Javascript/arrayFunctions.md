Objectives:
- Write a paragraph describing array functions from Jeff Lombard's medium article https://medium.com/@JeffLombardJr/understanding-foreach-map-filter-and-find-in-javascript-f91da93b9f2c
- Include input parameters and return values of each function type mentioned in the article
- Describe when you would use each function type
- Share an example of each from the EQR repo, if possible

Array functions .forEach(), .map(), .filter(), .find(), and .reduce() are higher order functions, which are functions that can accept other functions (callback) as arguments and use it to manipulate data arrays.

.forEach is an array function that is a more succinct cousin of the for loop. It takes an array of values and performs an action on each value. It differs from the for loop by not requiring an iterator (i.e. i = 0; i >= array.length; i++), and by not requiring changes in scope since the function within the forEach has its own scope. It's best to use forEach when a more specific function, like .map or .reduce, won't get the results you need. The forEach function does not return anything, and it manipulates the original array.

.map is an array function that runs a function on all items within an array and returns a new array from the returned values that will match the length of the original array. I used .map to return values from the eqroAssigntments formArray. Each eqroAssignment contains an eqroAssignmentId, an eqroLookupId, and a stateYearId. All I needed was the eqroLookupIds. So .map is best used when you want just some parts of each of the items in an array.

.filter is an array function that runs a conditional function on an array of values. If the condition is true, then the item stored in a new array, This differs from the .map in that the length of the new array may not match the original array, and is best used when you want to "filter" out certain values that meet the conditional function.

.find is an array function that will find one element out of the given array using the callback function to iterate through the array and stop upon finding an index with a truthy value and returns that value. This makes it best used when you need to find a single item from an array. When the element is NOT found, undefined is returned.

.reduce is an array function that accepts an array and can reduce it to a single value. Being the most flexible of the higher order functions, it can perform the same functionality as .map, .forEach, .filter, and .find. You would use reduce when you need to get one value from multiple items in an array, like the sum of all of the numbers in an array. 
The standard parameters for these are: (source: MDN Docs )
1.	callback which is the function to run on every item in the array,
2.	element with is representative of each item in the array on which the callback function will be executed.
Some optional parameters for the callback function within array functions are: (source: MDN Docs )
 1. index which is the index of the element currently being handled (I used this in one of my projects on .map when returning the text values from JSON objects from my API to display in the front end),
 2. array which is the array on which the .map function was called,
 3. thisArg which is the value to use "this" when the callback function is executed.

 Examples of the array functions from EQR:
 .map() is used in rollup.component.ts to get a list of rollup nanems from the array of rollup lookups:
```typescript
 this.rollupNames = this.rollupLookups.map(x => x.name);
```

 .filter() is used in eqr-performance-measures.component.ts to filter child or adult measures when either choice is made in the EQRO Population field:
 
 ```typescript
 getPopLookups(measure: EQRPMeasureAssignment): PopulationLookup[] {
        if (measure.adult && measure.child) {
            return this.popLookups;
        } else if (measure.adult) {
            return this.popLookups.filter(x => x.name === 'Adult');
        } else if (measure.child) {
            return this.popLookups.filter(x => x.name === 'Child');
        } else {
            return [];
        }
    }
```
.reduce() is used in d3-bar-chart.component.ts to flatten an array"
```typescript
function flatten(arr: any[]): any[] {
            return arr.reduce(function(flat: any[], toFlatten: any): any[] {
                return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
            }, []);
        }
```

.forEach() is used in plans.service.ts to create an array of plans from the plansForm, in the addPlans function:
```typescript
addPlans(plansForm: FormGroup, plans: Plan[], stateYearId: number): void {
        const plansFormArray = plansForm.get('plans') as FormArray;
        if (plans) {
            plans.forEach(plan => {
                plansFormArray.push(this.createPlan(stateYearId, plan));
            });
        } else {
            plansFormArray.push(this.createPlan(stateYearId, null));
        }
        this.matDataSourceService.emitTableData();
    }
```
Sources:
    MDN Docs - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    Eloquent JavaScript - https://eloquentjavascript.net/05_higher_order.html 
    Why and when to use forEach, map, filter, reduce, and find in JavaScript by Jeff Lombard - https://medium.com/@JeffLombardJr/understanding-foreach-map-filter-and-find-in-javascript-f91da93b9f2c
    Higher Order Functions (funfunfunction channel) - https://www.youtube.com/watch?v=BMUiFMZr7vk