Typecasting in TypeScript

Type Casting or Type assertion exists in TypeScript to tell the complier to assign a specific type, and to not guess. 

There are two ways to assert type in TypeScript:

1. Using angular bracket syntax:

let spry: any = 25;
let BigSpry = <number> spry; // BigSpry will be of type number


2. Using “as” syntax:

let spry: any = 24;
let BigSpry = spry as number;

I have seen examples of the “as” syntax used in EQR2 where I was having in EQR2 with assigning the fake data's Abstract Control to type FormArray:

```typescript
(form.controls['eqroAssignments'] as FormArray).push(masterFormStub.emptyEqroAssignmentIndexStub); // adding empty eqroAssignments to the form
```

However, this is the only type assertion used in applications using the React framework because angular syntax is also used in JSX, an XML syntax used in React. 

