Unit Testing

In order to better understand unit testing, I was tasked with studying a component (general-information in EQR) and writing the unit tests for this component from a blank page, without looking at the pre-existing spec file.
Setting up unit tests:
Because the it statements were what I was most familiar with, the first thing I decided to do was to create a skeleton spec file, creating a describe for each function present in the general-information component, and adding a comment for each line in the function. Then, I added it statements for each of the comments. Finally, I attempted to add expect statements, but realized I was missing much more.
I think I had the hardest time understanding stubs and spies. I followed the unit testing basics in the Angular tutorial (Udemy), creating variables to represent the component and fixture, (ComponentFixture<ComponentName>) the testing mock-up of the component. Lastly, I imported and added a variable for the MasterServiceStub because that gives the testing file access to all service and resource stubs in the testing folder. The stubs contain spies (in this case, a mock of a function) for functions within the service or resource file for a component. A stub can also contain fake values which mock the data for parameters and function results. The spies, in addition to tallying how many times a spy line in “executed”, can also return a value, mocking the result to be expected from the function.
While working with Will and pair programming Directed Payments unit tests, I learned the importance of testing all possible outcomes for functions with conditional statements. There was a line in a function that needed to be executed whether the conditional was met or not. Will showed me that I needed to test if the line would be executed when the conditional was truthy AND when the conditional was falsy.
Providers:
Providers are items from the constructor object within the component. This includes services and resources within the component, but in the actual test file this will include service and resource stubs because we don’t want to trigger the actual code.
Creating spies:
We create spies for functions/methods within the component. These spies won’t exist anywhere because they are all within the component we are testing, as opposed to resources and services which will already have spies in their stubs (if they have already been created, of course).

Different types of tests:
Testing a component’s methods: Since a function may have multiple methods called within it, you will need to test each method call. The method may also have lines of code where a variable is being set, and these need to be tested as well.
To test each function, you set it up as follows…
• Use beforeEach() to set any variable for values you may need for each of the functions (or at least more than one).
• Spy on any component methods you expect the function you’re testing to call. Service and resource spies belong on the corresponding stub.

1. Testing function calls
   Notes:
   • This includes cases where functions have been called with values from observables.
   • Using onInit as an example

a. Expect the function has been called zero times.
b. Run onInit ().
i. Typically, only the function that you’re testing is run, but there are cases that require running other functions supporting the function call. i.e.: The function would be expected to have been called 0 times, onInit would be triggered, and an observable subject would be called with a value. I would then expect the function to have been called once with that value from the subject.
c. Expect the function has been called 1 time.
d. (if applicable) Expect the function has been called with the correct parameters.

2. To test variables have been set
   Notes:
   • This includes cases where variables have been set from values from observables.
   • Using ngOnInit as an example

a. Expect the variable to be undefined.
b. Run ngOnInit()
i. Typically, only the function that you’re testing is run, but there are cases that require running other functions supporting the change to this variable. i.e.: In the case of general-information component, stateYearId should be set with the results from the queryParams Observable. So, the variable StateYearId would be expected to be undefined, ngOnInit() would be triggered, and the queryParams Subject would be called with a value {stateYearId: ‘1’}. I would then expect stateYearId to be equal to 1.
c. Expect the variable to equal whatever you are expecting it to equal.

3. Testing values returned by a function:
   Example(s): showFields, reportNames, and canDeactivate on general-information component
   a. (If applicable) Set the form or variable with the test component to the fake values available, i.e., comp.generalInfoForm = masterFormStub.filledGeneralInfoFormStub.
   b. Run the function and test that the return value matches your expectation
   i. Set a test variable to the value of what is returned from running that snippet of code, i.e., const formValue = comp.reportNames for reportNames.
   ii. Expect the variable to equal the value of running the snippet of code on the fake values, i.e., expect(formValue).toEqual(masterFormStub.filledGeneralInfoFormStub.get('stateYearReportNames')).


4. Testing to see if a particular function is called (edge case: a developer may change a method but it should NOT be changed):
   Example: onSubmit on general-information component using .getRawValue()
   a. Create a spy that returns a value. 
   ```typescript
   //the original function from the component where .getRawValue is called
   onSubmit(): void {
        this.generalInfoForm.markAsPristine();
        this.generalInformationResource
            .putGeneralInfo(this.stateYearId, this.generalInfoForm.getRawValue())
            .subscribe((values: StateYearBasicInfo) => {
                this.setGeneralInfoForm(values);
            });
    }
    // spy in the unit test for the onSubmit function
   spyOn(comp.generalInfoForm, 'getRawValue').and.returnValue(105);
   ```
   b. Create a unit test that calls the function in question
   ```typescript
    //the unit test for getRawValue
   it('calls getRawValue function on the generalInfoForm', () => {
            expect(comp.generalInfoForm.getRawValue).toHaveBeenCalledTimes(0);
            comp.onSubmit();
            expect(comp.generalInfoForm.getRawValue).toHaveBeenCalledTimes(1);
        });
   ```
   c. Verify returned value is returned for this function where the funtion is used as a parameter
   ```typescript
   // unit test for function (putGeneralInfo) where .getRawValue is called as a parameter... See above for original function
   it('calls putGeneralInfo function from GeneralResource with stateYearId and generalForm value as parameters', () => {
            expect(masterServiceStub.generalInformationResourceStub.putGeneralInfo).toHaveBeenCalledTimes(0);
            comp.onSubmit();
            expect(masterServiceStub.generalInformationResourceStub.putGeneralInfo).toHaveBeenCalledTimes(1);
            expect(masterServiceStub.generalInformationResourceStub.putGeneralInfo)
                .toHaveBeenCalledWith(101, 105); // 105 is the returned value from the spy I created
        });
   ```  
   Now that this is set up, should another developer change .getRawValue() to .value, the test will fail and the developer will see that .getRawValue HAS to be called.

   Resetting spy calls

   I was trying to figure out a way to reset the spy call values. I found the following:
   ```typescript
   test = spyOn(service, 'functionName'); // set your spy to a variable
   test.calls.reset(); // reset call values to 0
   service.functionThatContainsThisFunction(); // calling the function that contains 'functionName'
   expect(test.calls.count).toBe(1); // getting the count of the spy
   ```

Those pesky spies...

After working with Nissa on a unit test, I realized that spies set earlier in a describe block were affecting my nested describe block... See my bug below:
Bug: Unable to access formControlName correctly
Date: 8/4/2020
JIRA Ticket: COR-2044
Context: I added the uniqueArrayItem validator to generalInforForm.stateYearReportNames, and I was unable to access where the error was in the unit test.
My Steps:
1. After fumbling horribly with the test myself, I reached out to Nissa. She was able to see immediately that I was not accessing the correct formControl. We looked at FormArray (in Angular documentation) together, then we looked at the validator function to see where the error was being set, and modified the test code to access the correct formControl.
2. After that was still unsuccessful, Nisaa said there HAD to be spies in the describe block. We notice that all of the functions within getGeneralInfoForm (which is the function I was using to create my form) had spies earlier on in the describe block. 
3. Nissa suggested I add a describe block above my code, including the tests the spies were for, to pull the three spies out of scope for my describe block. I did as she suggested.
4. My test passed with no problem after that.

Overriding a spy:

When there is already a spy and you need that spy to return a different value, you can call the spy by its name (vague much?) and add ".and.returnValueOf(newValue)" to override.

```typescript
            masterServiceStub.statusDropdownDataServiceStub.checkReviewCompleted.and.returnValue(true); // set state to false
```

When testing, if you use TestBed... Your service injection order does not matter:

```typescript
TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [ReactiveFormsModule],
            providers: [
                {
                    provide: TimelineTrackerFormService,
                    useValue: masterServiceStub.timelineTrackerFormServiceStub
                },
                {
                    provide: TimelineTrackerFormResource,
                    useValue: masterServiceStub.timelineTrackerFormResourceStub
                },
                { provide: StatusDropdownDataService, useValue: masterServiceStub.statusDropdownDataServiceStub },
                {
                    provide: StatusInstructionsService,
                    useValue: masterServiceStub.statusInstructionsServiceStub
                }
            ],
            declarations: [StatusDropdownComponent, StatusInstructionsComponent]
        }).compileComponents();
```

If you do NOT use TestBed... your service injection order MATTERS!
```typescript
beforeEach(() => {
        masterServiceStub = new MasterServiceStub();
        masterFormStub = new MasterFormStub();

        component = new TimelineTrackerComponent(
            <any>masterServiceStub.matDialogStub,
            <any>masterServiceStub.timelineTrackerFormServiceStub,
            <any>masterServiceStub.timelineTrackerFormResourceStub,
            <any>masterServiceStub.timelineTrackerDataServiceStub,
            <any>masterServiceStub.parseRouteServiceStub,
            <any>masterServiceStub.activatedRouteStub,
            <any>masterServiceStub.checkFormsServiceStub,
            <any>masterServiceStub.dropdownResourceStub,
            <any>masterServiceStub.statusInstructionsServiceStub,
            <any>masterServiceStub.statusDropdownDataServiceStub

        );
    });
```