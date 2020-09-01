Debugging Finds

Date Sent to DQ

Bug:
• The round statuses in the dropdown menu were reversed, ie every status that should have been true was disabled, and every condition that should have been false was enabled.

My steps:

1. I checked the frontend to be sure the info was not getting reversed by a coding mistake in the component. I added a console.log to inspect the data from the HTTP response. Since there were no conditionals or statements that would alter the information coming from the http response, the issue was not there.
2. I looked at the database to see if there was incorrectly formatted data. In this instance, the database did not have an IsEnabled column or anything of the like, so I knew the problem wasn’t there.
3. I looked at the backend code to follow the data backwards from the endpoint (RoundStatusTypesController). The Controller pointed me get pointed me to the GetRoundStatusTypes function in the RoundStatusTypeRepository, which pointed me to the GetRoundStatuses function in the RoundStatusTypesHelper. In GetRoundStatuses, there is a function called HandleAllRoundAssignments, which included HandleEnabled function. The HandleEnabled function had conflicting lines of code due to my mistake when handling a merge conflict for my recent pull request. Once I deleted the redundant code, and checked the console.log in the frontend again, the round statuses were correctly displaying.
   Bug:
   Round status is not going to “In QA” after Date Sent to DQ is removed and round edit is saved.
   Context:
   If a proposal’s RoundStatus is Questions Sent to CMCS or With DMCP, and the Date Sent to DQ is removed, the RoundStatus should become In QA after saving.
   My Steps:
   • Olivia noted that the RoundStatus would be modified even when a round that was NOT the current round was updated. That shouldn’t happen. So I added a conditional that nested the conditional that changes the round status. However the change was not happening.
   • Will and I used the debugging tool in VSCode to see the if the correct properties of proposal and RoundAssignmentView were being compared. After talking through this, we realized that I was using RoundAssignmentId but should have been using RoundTypeId (and I think that property’s name should be changed). We changed it.
   General Information Component unit testing bugs

Bug:
GetGeneralInfo() in ngOnInit was not being called.
My steps:

1. I ran the testing file (Karma), and saw the error stating Expected a spy, got undefined.
2. I looked at the section of code noting it was calling comp.generalInfoForm on line 74, and changed it to comp.getGeneralInfo
3. Test ran smoothly

Bug:
GeneralInfoForm.markAsPristine not being called
My steps:

1. I ran the testing file (Karma), and saw the error stating Expected a spy, but got Function” in regard to generalInfoFrom.markAsPristine. There is a spy in the beforeEach of this “describe” section.
2. I looked at other test files and saw the same code as I had typed for the same type of test.
3. I googled “expected a spy, but got Function, and saw StackOverflow had entries for the same issue.

Bug:
All plans on plans tab had incorrectly formatted delete buttons.

My steps (with Olivia):

1. We checked the Console tab in Chrome Dev Tools, and saw that the error stated "Cannot read property 'get' of undefined", but we knew there was supposed to be a defined value.
2. In the console, we added a breakpoint at the line stated in the console error, and reran the app.
3. At the breakpoint, we checked the values of the different properties by hovering over them. The in the console, I typed in "plansFormArray[0]" and it showed undefined. So I typed in plansFormArray, and Olivia pointed out that she saw the syntax error. We went through all of the properties in the plansFormArray, and Olivia mentioned the property 'controls'. I looked at that property and noticed an array of FormGroups in there. I typed in plansFormArray.controls[0] and saw there was a value of 'hasPips' in the 'value' property.
4. I added 'controls' to the line in the hasPips function and tested the app again. It worked.

Bug: In testing, error: cannot read proerty 'get' of undefined in "hasPips function returns value of false if plan has associated PIPs"

My steps:

1. In the console I saw that my false statement was not passing. The line of code I wrote had the planIds instead of the actual indexes of the plans in the stub.

Bug: My true statement in my test isnt passing: "Expecting undefined to be "Cannot Delete: Has Associated PIP(s)"

My steps:

1. I was trying to add the function response on the stub.
2. Will showed me that I didn't need to add the response to the stub, especially since I needed more than one responce in this describe. I added masterServiceStub.plansServiceStub.hasPips.and.returnValue(false). to clear up the false statement.

Bug: "Expected undefined to be "cannot delete: has associated pip(s)" in the toolTip funtion in plansComponent

My steps:

1. After adding what I had in the previous bug, I tried changing the toEqual() to toBe(), to no avail.

2. I changed the variable assignment to match the outcome to ensure it wasn't the variable. It wasn't.

3. I moved masterServiceStub.plansServiceStub.hasPips.and.returnValue(true) to the line preceding the setting of the variable, thinking the spy needs to be overwritten before the variable is set. It was successful.

Bug: Incorrect syntax near 'Entity'. Expecting '.', ID, or QUOTED_ID in my Sql script.

My steps:

1. I tried changing the way I added the table name. No
2. I googled the error. Nope
3. I asked Will if he recocnized this error. He stated placing square brackets around the entity should work because the entity name was on of many keywords in SQL.

Bug: Unable to pull from development after doing a git add and commit.

My steps:

1. After trying to talk thru it with Will, we saw the issue was with package-lock.json. Then we deleted all package-lock.json files.
2. We ran git status, and when tree was clean, we ran git pull origin development.
3. After that we ran npm intsall on the frontend files.
4. Lastly we ran the application to ensure nothing was broken. Success!

Bug: in SQL Server Mgmt Studio Either the parameter@objname is ambiguous or the claimed @objtype is wrong.

My steps:

1. I had used the same query window as the last rename statement, and this was happening repeatedly.
2. I had to reload my db, then I opened a new window for each statement/query. Success!

Bug: Cannot read value of "undefined" when trying to get hasPips in 'create plan as empty form (plansService) \*haspips (and add Automapper info I just learned)

My steps:

1. I saw that the line with haspips was not passing in the test.
2. Olivia saw that the spelling of haspips should have been hasPips. I changed it. Success!

Bug: Unable to get info required from SQL db

My steps:

1. I created a SELECT statement in SQL SMS to get a list of pips that had multiple plans selected.
2. I realized I was doing a join when I didn't need to because the table PipTopicAssignmentPlan had all the things I needed; PlanId, PipTopicAssignmentId, PipTopicAssignmentPlanId.
3. I simplified my statement and it worked.

Helpful sources: https://dba.stackexchange.com/questions/31720/find-the-foreign-keys-associated-with-a-given-primary-key , Will, W3Schools

Bug: EQR App not displaying data correctly after I made changes in the (front-end code)

My steps:

1. I refresehed the screen several times after making the changes to plansService file.
2. After looking back carefully at my code (with several windows open in split screen style), I realized I had not saved two of the files. I then saved them and refreshed the screen. Success!

Bug: I wasn't able to get the correct info thru AutoMapper

My steps:

1. I was using AutoMapper to map the EQRReceivedCount (the actual number of StateYear Reports) from StateYear to EQRReceivedCount in StateYearView). I used:
cfg.CreateMap<StateYear, StateYearBasicInfoView>()
                 .ForMember(dest => dest.EqrReceivedCount, opt => opt.MapFrom(x => x.EqrReceivedCount.Any()))
2. I realixed that I needed to get the actual count of State Year Report Names from StateYear.StateYearReportNames, and I used:
cfg.CreateMap<StateYear, StateYearBasicInfoView>()
                 .ForMember(dest => dest.EqrReceivedCount, opt => opt.MapFrom(x => x.StateYearReportNames.Count()));
                 Success! 
Helpful Sources: My AutoMapper research, looking at other examples in the AutoMapper, particularly The hasPips one.

Bug: Number of EqrReceivedCount not changing after adding another report.

My steps: 

1. I added a report (California 2017) after adding the first one, and submitted changes. The EQR Received Count didn't change to 2. I looked in the db abd it had not shown their either.

2. I realized I forgot to refresh the screen. Once I did, all reports were added, but db still shows one less that there are.

Bug: Unable to disable the input field "Eqr Received Count" in the HTML when a Report is added and the form is "dirty"

My steps:

1. I added [disabled]="!generalInfoForm.valid" to the input field. In the console, I saw:
"It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true when you set up this control in your component class, the disabled attribute will actually be set in the DOM for you. We recommend using this approach to avoid 'changed after checked' errors.
       
      Example: 
      form = new FormGroup({
        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
        last: new FormControl('Drew', Validators.required)
      });"
This is confusing because FormGroup is already set for this component, and I am not sure if that is the solution to disabling this field in this dynamic form.

2. After talking to Olivia, I learned that similar to how we access the fields through the form controls, I needed to set a property of the field to disable. I did this by using this.formName.controls['fieldName'].disable().


Bug: Cannot read property 'toggleEqrReceivedCountDisabled' of undefined (in generalInformationService.ts)

My steps: (using Chrome Dev Tools)

1. I put a breakpoint at line before disableEQR (in the service), and after (because I am certain the increment line won't work.)

2. The info from GeneralInformationComponent was not coming thru on the service.

3. I moved the functions (toggleEqrReceivedCountDisabled, updateEqrReceivedCountValue) to the service, and as Olivia said, they're being there fits more in line for what the service is meant for.

4. After adding the functions to the service, I modified the add and remove functions to accept generalInfoForm from the html form, and modified the html to reflect this. Success.

Bug: Cannot read property 'controls' of undefined

My steps:

1. I saw this issue in the console. Thanks to the previous bug, I remembered to add the argument to removeStateYearReportName in the html.

Bug: Expecting false to be true (in the toggleEqrReceivedCountDisabled function sets EQR Received field to disabled when its value is > 0, unit test)

My steps:

1. I changed the form from a generalInfoform created in the beforeEach, to a filled GeneralInfoForm.

2. Olivia noticed I used the field 'eqrReceived' instead of 'eqrReceivedCount', and I changed it. Success.

Bug: Unable to find 'generalInfoForm' (once I removed 'let generalInfoForm' from the top level describe and placed 'let generalInfoForm' in the beforeEach of the describe for the updateEqrReceivedCountValue function of the general-information.service.spec.ts file)

My steps:
1. I noticed that this was a scope issue, but I thought you could only add variables to the beforeEach in a describe block.

2. Olivia told me I could place it outside the beforeEach.

3. We agreed to change the name of the generalInfoForm to form, which used a variable in line with the rest of the unit tests in the file.

Bug: Unintentional Cartesian join in SQL script.

My steps:

1. I knew I was trying to get the yearName, StateName, StateYearEQRReceived, and StsteYearEQRReceivedDate from the StateYear table, matching the YearId to StateYear YearId and StateId to StateYear StateId.

2. I assigned s to State, y to Year, and sy to StaeYear.

3. I created 2 inner joins, s.StateId = sy.StateId, and y.YearId = sy.YearId, THEN added my conditional of sy.EqrReceived = 1 AND sy.EqrReceivedDate IS NULL. Instead of 900+ results, I had 6. Success.

Bug: eqr fields not showing at all in app once Validators.min(0) added

My steps:

1. I took my validator off the line in general-information.service to see how the line worked without it. I re-added it to make the line fail again. 

2. I looked up ways to include more than one validator on a line. I found an example in measures-form.service where both validators were wrapped in another square bracket. I applied this to the line in general info service. Success.

Bug: Error on Validators.min(0) only showing "Other Error"

My steps:

1. I found that Validators.max(999) had a custom error. I searched for the Validators.max error function, and created one for the Validators.min I created. Success.

Not really a Bug, but important: Adding tests for Validators and errors
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


Bug: EQR Received Count field zeroing out after "Save Changes" is clicked, and user is able to save user-input # in field even when EQR Received Count field doesn't match the number of reports.

My steps:

1. After recreating the bug, I realized the generalInfoForm passed to updateEqrReceivedCountValue has a null value for 'eqrReceivedCount'. Even after setting the value (in the console) after the function is completed, the value is set back to null.

2. I added { emitValue: true} to setValue, as my plan is to update the form with a subscription.

3. Olivia and I walked through the situation at hand, using Chrome Dev tools and realized the correct value is never sent to the server. And the server can only reflect what it receives. 

4. Olivia found a method .getRawValue(), which I didn't know about. This method retieves all values regardless of disabled status, where .value excludes disabled controls. I added .getRawValue() to the following line in the onSubmit function, which handles the 'Save Changes' button and process. Success.

```typescript
 this.generalInformationResource
            .putGeneralInfo(this.stateYearId, this.generalInfoForm.getRawValue())
            .subscribe((values: StateYearBasicInfo) => {
                this.setGeneralInfoForm(values);
            });
```

Bug: EQRReceivedCount disabled when there are no stateYearReportNames and EQRReceivedCount enabled when stateYearReportNames present

My steps:
1. I put a breakpoint at the updateEqrReceivedCountValue step in getGeneralInfoForm in general-information.service. Even though the hint for EQR Received Count is that this field would be disabled when there are State Year Reports, the actual function was not checking for them. Instead, it was checking for the eqrReceivedCount.
2. At Olivia's suggestion, I did not change toggleEqrReceivedCountDisabled because since updateEqrReceivedCountValue had already been run, the EqrReceived and stateYear ReportList already were compared and matched.
3. After going back and forth in trying to find the right way to word the function, including using a boolean table to ensure we are checking both the stateYearReportNames and eqrReceivedCount and adding a boolean value to the service, Olivia removed updateEqrReceivedCountValue from getGeneralInfoForm, and added a conditional to toggleEqrReceivedCountDisable that only runs it when stateYearReportNames is greater than zero.

Bug: When all report names are deleted from Report List (in General Information tab), EQR Received Count remains at 1.

Steps:
1. Olivia modified updateEqrReceivedCountValue as follows:
```typescript
 if (stateYearReportNames.length >= 0) {
            generalInfoForm.controls['eqrReceivedCount'].setValue(stateYearReportNames.length);
        }
```
This ensures that when all reports are removed (via removeStateYearReoprtName) the value will drop to zero. 

Bug: Cannot read property 'max' (or) 'min' of null (in general-information.service.spec.ts)

```typescript
describe('In generalInfoForm (Form Controls)', () => {
        beforeEach(() => {
            form = service.getGeneralInfoForm(<any>fakeFilledGeneralInfoValues);
        });
it('eqrReceivedCount field should trigger error if higher than 999', () => {
            form.controls['eqrReceivedCount'].setValue(1000);
            expect(form.controls['eqrReceivedCount'].errors.max).toBeTruthy();
        });

        it('eqrReceivedCount field triggers an error if lower than 0', () => {
            form.controls['eqrReceivedCount'].setValue(-23);
            expect(form.controls['eqrReceivedCount'].errors.min).toBeTruthy();
        });
}});
```
1. I checked form-hints.service.ts to ensure my error messages were correct:
```typescript
if (error === 'min') {
    return this.getMinMessage(errors);
    } else if (error === 'max') {
        return this.getMaxMessage(errors);}
```
All looked well.
2. I double checked my unit tests. The form is created and the value is modified for each test.

3. After speaking with Olivia, she alerted me to the fact that the spies for the three functions in the getGeneralInfoForm function STILL needed to be present. When they aren't present, the real functions are attempting to be accessed (BIG NO NO!).

4. I added the spies for the 3 functions. Success.

Bug(found before it created a mess): changing the value from an actual stub class would mess it up for the rest of the unit tests dependent on the values

What we did:
1. At first, I attempted to change fakeFilledGeneralInfoValues, then using it in the form, as follows:
```typescript
    fakeFilledGeneralInfoValues.stateYearReportNames = [];
    form = service.getGeneralInfoForm(<any>fakeFilledGeneralInfoValues);
```
Olivia explained that this changes the ACTUAL fakeFilledGeneralInfoValues, and would create an issue for any unit tests following this one that also uses it.

2. Olivia showed how to use JSON.parse() and JSON.stringify() to create a copy of fakeFilledGeneralInfoFormValues for my unit test, as follows:
```typescript
    const fakeGeneralCopy = JSON.parse(JSON.stringify(fakeFilledGeneralInfoValues));
    fakeGeneralCopy.stateYearReportNames = [];
    form = service.getGeneralInfoForm(fakeGeneralCopy);
    expect(service.toggleEqrReceivedCountDisabled).toHaveBeenCalledTimes(0); 
```
Success.

Bug: .type() does not accept empty string (while testing in Cypress file general.spec.js)
Date: 03/18/2020
JIRA Ticket: COR-2554
My steps:
1. I looked up the error in Cypress documentation, but saw nothing about this problem. 
2. I googled the error, and found a response on github ( https://github.com/cypress-io/cypress/issues/3587#issuecomment-572293406 ) that stated I should use .clear() instead. I also learned that .clear() was a shortcut for .type({selectall}{backspace}). I changed the code. Success.

Bug: Timeout error on general.spec.js :
```javascript
CypressError: Timed out retrying: expected '<input#mat-input-0.mat-input-element.mat-form-field-autofill-control.cdk-text-field-autofill-monitored.ng-untouched.ng-pristine.ng-valid>' to equal '3/18/2030'
```
Date: 03/18/2020
JIRA Ticket: COR-2554
My steps:
1. I had the following:
```javascript
const checkData = () => {
        // First input field should have date entered
        cy.get('.mat-input-element')
            .eq(0)
            .should('eq', '3/18/2030');
    };
```
and this was failing at the "should" assertion. I saw the folling on another cypress file, performance-reporting.spec.js:
```javascript
            .invoke('val')
            .then(str => {
                expect(str).to.eq('1975');
            });
```
and added it where the .should() statement was in my function. Success.

Bug: No output on General Information tab
Date: 3/20/2020
JIRA Ticket: COR-2714  
My steps:
1. I added the validation 'uniqueId' before running the application.
2. The Exception User-Unhandled error shows there is no EQRReceived column because I forgot to redo my local db.

Bug: Adding an EQRO that already exists shows no error, but won't allow user to click "submit" button
Date: 3/20/2020
JIRA Ticket: COR-2714
My steps:
1. I noticed that errors only seem to show up in input fields, this is a dropdown menu.

Bug: E2E testing- File is getting stuck at @saveChanges. 
Date: 3/23/2020
JIRA Ticket:  COR-2554
My steps:
1. I thought the issue was on the general.js file, but there was a test for the checkbox that I removed from the General-information tab on another file.
2. I removed the checkbox from the second test file, and added a new test for the EQR Received Date field. Success.

Bug: Get a list (array) of unique values from the eqroLookupIds array
Date:
JIRA Ticket: COR-2714
My steps:
1. I was trying to iterate through the mapped out array of eqroLookupIds to get just the values and not the duplicates. I unsuccessfully tried sorting the values in the array then comparing each to the next then placing them in a new array.
2. Olivia told me about set() which returns an object of the unique vales in a given collection.

Bug: Getting a list of the indexes of ids in the eqroLookupIds array
Date:
JIRA Ticket: COR-2714
My steps:
1. I was trying to get a list of the indexes of each id in the eqroLookupIds array to count them and see if there were duplicates.I didnt know how to do this, and Olivia told me about indexOf() which iterates through an array and returns the index a given value. (Example I used at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

Bug: Getting the while loop to stop
JIRA Ticket: COR-2714
Context: I encountered and "Aw, Snap! Something went wrong" message in Chrome after I added an EQRO (intentionally choosing a duplicate). I'd never seen that while coding. So I reloaded the page with breakpoints in the code (Chrome Dev Tools), and noticed that when it gets to the while loop, it stops, and the error message appreas. Also, the debugging session was closed because "Render process gone".
My steps:
1. The while loop I added to iterate through an array was stuck in an infinite loop because I forgot to advance it to the next index. I was using:
```typescript
let idx = eqroLookupIds.indexOf(x); // find the indices of matching values in eqroLookupIds
while (idx !== -1) {
    r.push(idx); // add index of matching id to r - for 1, r = [0, 3]
    }
```
2. I went back to the original example to see how to get the value to advance. I used this successfully:
```typescript
idx = eqroLookupIds.indexOf(x, idx + 1);
``` 

Bug: Getting the error set at the correct formControl
JIRA Ticket: COR-2174
Context:
```typescript
if (r.length >= 2) {
    r.forEach(z => {
    formArray.controls[z].setErrors({ error: true }); // set error in the actual formArray on the control at z
    });
```
My steps:
1. I was trying to set the error at the index z in r (see above) but this line I had was setting every item in the array to show the error. In the example above, I was setting the child control at index z in the form array to error: true. Placing error: true in {} looks like it triggers the options for the setErrors() method, and not setting the error in the parameter(another bug). The problem remains that I am unable to access the correct form control.

** Discussion with Olivia 4/6 **
When discussing why the error was not showing up on the formControl, e discussed how the custom-mat-error element was on the formControl in the HTML file, and NOT on the formArray as a whole. (See "The incorrect error is showing when there are duplicate EQROs" explaining why using setErrors({error: true}) didnt work)

2. Olivia changed the line to the following:
```typescript
(<FormGroup>formArray.controls[z]).controls['eqroLookupId'].setErrors({error: true});
```
This sets the error on the control "eqroLookupId" for the item at the index of z in the formArray. I am not too sure why we needed (<formGroup>formArray.contols[z]) and will ask that later and update this bug. I think its because you can't type controls[idx].controls[idx]. From Olivia: The (<FormGroup>formArray.controls[z]) syntax is used to cast the abstract control (formArray.controls[z]) into a form group. This enables us to access the controls property on the form group. If we didn’t cast the abstract control to into a form group, it wouldn’t be sure that we could access the controls property and would show an error (try it out to see).

Bug: The incorrect error is showing when there are duplicate EQROs
Date: 3/31/2020
JIRA Ticket: COR-2174
Context:
```typescript
if (r.length >= 2) {
    r.forEach(z => {
        (<FormGroup>formArray.controls[z]).controls['eqroLookupId'].setErrors({error: true}); // set error in the actual formArray on the control at z
    });
```
My steps:
1..setErrors({error: true}) was NOT getting the error from the parameter, but instead looking for an event and setting the boolean according to Angular Documentation (https://angular.io/api/forms/AbstractControl#setErrors). This was setting the formControl to invalid, but was showing "other error" in the form.

** Discussion with Olivia 4/6 **
In order to get MY error (from the parameter/arguments) I would have to use the following syntax:
```typescript
const e = {}; // an empty object
e[error] = true; // to create the object {duplicateName: true}
```
getValidatorError() is already doing this, and was created by the MCQ team for this purpose.

2. I had to change the line to the following to get the correct error to show:
```typescript
    (<FormGroup>formArray.controls[z]).controls['eqroLookupId'].setErrors(getValidatorError(error)); // set error in the actual formArray on the control at z
```

Bug: Unable to use parameter in function
Date: 4.01.2020
JIRA Ticket: COR-2714
Context:
```typescript
export function uniqueId(error: string, control: string): ValidatorFn { // passing error and control as strings
    return (formArray: FormArray): { [key: string]: any } | null => {
        const ids = formArray.value.map(x => x.eqroLookupId); // control = eqroLookupId but how to access?
        ...
```
My Steps:
1. The validator I created needs to be able to be used anywhere in the application, so I needed to remove all personalization to the EQRO situation. When the array ids is created, I need to pass the control from the parameter to the map function. I tried x.control, but that doesn't get the control from the parameter since control is a property of FormArray that is an array of child controls. I also tried x.[control], but that caused to code to not render. 

2. Olivia suggested using x[control] which is the same as x.eqroLookupId (if control == eqroLookupId). Success.

Bug: "Sequence has no elements" exception in .Net
Date: 04/09/2020
JIRA Ticket: COR 2724
Context:
In EQR, I need to change PipTopicAssignmentPlans(ICollection), to PipTopicAssignmentPlan(int).
In PipView and PipListItemView I changed PiPipTopicAssignmentPlans to PipTopicAssignmentPlan.

This set off PipService and PipListService with the following error:
'PipTopicAssignment' does not contain a definition for 'PipTopicAssignmentPlan' and no accessible extension method 'PipTopicAssignmentPlan' accepting a first argument of type 'PipTopicAssignment' could be found (are you missing a using directive or an assembly reference?) [EQR2]

I changed the following code in PipListService:
```
private void MapPopulationAndPlanNames(ICollection<PipListItemView> listItemViews)
        {
            listItemViews.ToList().ForEach(view =>
            {
                view.PopulationName = db.PopulationLookups.Where(x => x.PopulationLookupId == view.PopulationLookupId).Select(x => x.Name).SingleOrDefault();
                if (view.PipTopicAssignmentPlan.Any())
                {
                    int planId = view.PipTopicAssignmentPlan.ToList()[0];
                    view.PlanName = db.Plans.Where(x => x.PlanId == planId).Select(x => x.Name).Single();
                }
            });
        }
```
to removing the if statement because PipTopicAssignmentPlan would always be single, and removing ToList()[0] clearing the error on PipListItemView:
```
private void MapPopulationAndPlanNames(ICollection<PipListItemView> listItemViews)
        {
            listItemViews.ToList().ForEach(view =>
            {
                view.PopulationName = db.PopulationLookups.Where(x => x.PopulationLookupId == view.PopulationLookupId).Select(x => x.Name).SingleOrDefault();
                int planId = view.PipTopicAssignmentPlan;
                view.PlanName = db.Plans.Where(x => x.PlanId == planId).Select(x => x.Name).Single();

            });
        }
```
On PipService, there are two sections, Pip2016View and PipPost2016View, both having a section of code converting the Pip Plans. Again, because the PipTopicAssignmentPlans will now be a single PipTopicAssignmentPlan, the conversion is unnecessary (I think), so I commented out the following line in both sections:
```
    assignmentToUpdate.PipTopicAssignmentPlans = PipConverterClass.ConvertPipPlans(pipView.PipTopicAssignmentPlans, pip);

```
I then saw an error on PipListService that "Sequence contains no elements" at 
```
view.PopulationName = db.PopulationLookups.Where(x => x.PopulationLookupId == view.PopulationLookupId).Select(x => x.Name).SingleOrDefault();
                // if (view.PipTopicAssignmentPlan.Any())
                // {
                int planId = view.PipTopicAssignmentPlan;
                view.PlanName = db.Plans.Where(x => x.PlanId == planId).Select(x => x.Name).Single();
                // }
```
After talking to Olivia, I rolled back all edits and used the PlanProfile AutoMapper to map a single PipTopicAssignmentPlan (frontend) to a collection of ONE PipTopicAssignmentPlan (backend):

Before
```
 public class PlanProfile : Profile
    {
        public PlanProfile()
        {
            CreateMap<Plan, PlanView>()
                .ForMember(dest => dest.HasPips, opt => opt.MapFrom(x => x.PipTopicAssignmentPlans.Any()));
            CreateMap<PlanView, Plan>();
        }
    }
```

After
```
public class PlanProfile : Profile
    {
        public PlanProfile()
        {
            CreateMap<Plan, PlanView>()
                .ForMember(dest => dest.HasPips, opt => opt.MapFrom(x => x.PipTopicAssignmentPlans.Any()))
                .ForMember(dest => dest.PlanId, opt => opt.MapFrom(x => x.PipTopicAssignmentPlans.First()));
            CreateMap<PlanView, Plan>()
                .ForMember(dest => dest.PipTopicAssignmentPlans, opt => opt.MapFrom(x => x.PlanId));
        }
    }
```
Conclusion: I misunderstood what I needed to do in the backend, and went (a wee bit) too far, and got lost, but after speaking with Olivia, I was able to backout of what I did, and map the correct information to correctly use the application until I tackle the backend.
Sources: https://stackoverflow.com/questions/11801769/handling-sequence-has-no-elements-exception

Bug: Build Error Code 1
Date: 4/14/2020
JIRA Ticket: COR 2724
Context: My build failed after I KNEW my tests passed
My Steps: 1. I checked the log to see when it failed which was at unit tests.
2. Then I remembered I may have left an fdescribe, searched for it and changed it, pushed it up and the new build passed.
Sources: Previous experience, yay.
Questions for another dev: What would be a great way to ensure you remove "fdescribe"s and commented code before pushing to git?

Bug: Invalid Operator Exception in PlanService (backend)
Date: 4/15/2020
JIRA Ticket: 2724
Context: I added a mapper in PlanProfile to map PipTopicAssignment in Plan to PlanView and vice versa. I received this error.
My Steps: I talked to Olivia and she realized the mapper was in the incorrect file. I began to map in PipProfile instead.
Sources: Olivia
Questions for another dev: How could I have figured this out better on my own? 

Bug: Value cannot be null in LookupToAssignmentConverterClass.cs
Date: 4/15/2020
JIRA Ticket: 2724
Context: When adding a new pip, or even editing a new pip, the code fails here. In the frontend there is a single PipTopicAssignmentPlan, but in the backend, nothing has been changed so this converter is looking for a list. 
My Steps: 1. I traced this issue to the converter, then to the PipConverterClass.
2. I created a map in the AutoMapper from PipListItemView to PipTopicAssignment, as follows:
```
CreateMap<PipListItemView, PipTopicAssignment>()
            .ForMember(dest => dest.PipTopicAssignmentPlans, opt => opt.MapFrom(x => new List<int> { x.PipTopicAssignmentId }));
```  
AAAAAAnd this isn't the problem. The problem (including the fact that this Mapper is wrong) is that whatever I am sending from the front end as a single PipTopicAssignmentPlan needs to be converted to a List of PipTopicAssignmentPlans containing the one from the frontend.

2. I recreated this scenario and see what we are sending back in the Network tab (Chrome Dev Tools). I saw (after adding a pip with PipTopicAssignmnetPlandId 2135) that these are all sent as one object. This goes from the front end as one object containing ONE PipTopicAssnmentPlan (not an array or list) to PipView (via PipPost2016View or Pip2016View) to PipTopicAssignment. Speaking with Olivia helped me see that PipView (which actually has the PipTopicAssignmentPlans property, and Pip2016View and PipPost2016View extend PipView) needs "ICollection<int> PipTopicAssignmentPlans" to be changed to "int PipTopicAssignmentPlan", and Pip2016View and PipPost2016View should map to PipTopicAssignment both to ensure the single PipTopicAssignmentPlan from Pip2016View or PipPost2016View is added to a list to map to PipTopicAssignment, and that the first (and only) item in the PipTopicAssignmentPlans gets mapped to Pip2016View or PipPost2016View.

Sources:
Questions for another dev:

Bug: Unable to use First() to extract from an ICollection in .Net (c#)
Date: 4/16/2020
JIRA Ticket: COR-2724
Context: I need to map one (and now the only) PipTopicAssignmentPlanId from an ICollection ofPipTopicAssignmentPlans in PipTopicAssignments to PipView (via Pip2016View or PipPost2016View).
My Steps: I read the error which was "'ICollection<PipTopicAssignmentPlan>' does not contain a definition for 'First' and no accessible extension method 'First' accepting a first argument of type 'ICollection<PipTopicAssignmentPlan>' could be found (are you missing a using directive or an assembly reference?) [EQR2]". I looked up the First() method (Google-fu) and saw that it is a Linq method. I added "using System.Linq;" to the PipProfile file. Success.
Sources: https://www.tutorialspoint.com/chash-linq-first-method
Questions for another dev:

Bug: Error mapping types (.Net)
Date: 4/16/2020
JIRA Ticket: COR-2724
Context: After changing PipProfile to reflect mapping Pip2016View to PipTopicAssignment, I saw an error in PipService that was error mapping types at the following lines:
```
// PipService:
PipTopicAssignment assignment = db.PipTopicAssignments.Find(pipTopicAssignmentId);
            return _mapper.Map<PipTopicAssignment, PipPost2016View>(assignment);

// PipProfile:
CreateMap<PipTopicAssignment, PipPost2016View>() // map list of 1 PTAP to one PTAP
                .ForMember(dest => dest.PipTopicAssignmentPlan, opt => opt.MapFrom(x => x.PipTopicAssignmentPlans.FirstOrDefault()));
```

My Steps: 
1. The first problem was that there were no PipTopicAsignmentPlans to map from, which makes sense because this is a GET method, and there would be no PipTopicAsignmentPlans yet, it would have to be null. I had to make PipTopicAsignmentPlan a nullable int (int?), then add a ternary operator to the PTAP>PP2016View that if PTAP == null, send null otherwise send the PTAP First or Default:
```
CreateMap<PipTopicAssignment, PipPost2016View>() // map list of 1 PTAP to one PTAP
                .ForMember(dest => dest.PipTopicAssignmentPlan, opt => opt.MapFrom(x => x.PipTopicAssignmentPlans == null ? null : x.PipTopicAssignmentPlans.FirstOrDefault()));
```
2. Next the error was in the build after I saved the above code change stating "Cannot implicitly convert type 'int?' to 'int'". Olivia advised that I cast pipView.PipTopicAssgnmentPlan to type int, stating this would change the type back to int from int? for the PUT method:
```
 assignmentToUpdate.PipTopicAssignmentPlans = PipConverterClass.ConvertPipPlans(new List<int>((int)pipView.PipTopicAssignmentPlan), pip);
```
This made the GET method work successfully. However a new error for the PUT arose and I needed to do the same thing from PipPost2016View to PipTopicAssignment, particularly the property PipTopicAssignmentPlans.
3. 
Sources:
Questions for another dev:

Bug: 'int' does not contain a definition for 'Plan' and no accessible extension method 'Plan' accepting a first argument of type 'int' could be found (EQR)
Date: 4/22/2020
JIRA Ticket: 2724
Context: In DetailedPipReports, I attempted to change Plan = x.PipTopicAssignmentPlans.FirstOrDefault().Plan.Name to reflect the change to a single PlanId in PipTopicAssignment...
My Steps:1. I changed to Plan = x.PlanId.Plan.Name, I received the above error. 2. I noticed that Read function has a parameter that is from the SQLModel and I haven't updated it yet... So it's now on hold...
Sources:
Questions for another dev:

Bug: Expected spy createEqroAssignment to have been called 2 times. It was called 3 times.
Date: 4/23/2020
JIRA Ticket: 2714
Context: In the eqro.sevice.spec.ts, I saw this error even though I had added nothing to the tests...
My Steps:
Sources:
Questions for another dev:

Bug: Cannot read property 'value' of undefined
Date: 4/24/2020
JIRA Ticket:2714
Context: in eqro.services.spec.ts, I was trying to set the value of one of the fakeEqroValues to make a duplicate to trigger the validator
expect((formArray.controls[1] as FormGroup).controls['error'].value).toBe('duplicateName');
My Steps: I was having a hard time making the stub work for me. After speaking with Olivia, I created a mini version of the stub in the test file similar to how Olivia created a test formArray in the unique array validator test file.
Sources:
Questions for another dev:

Bug: Unable to add FK to PipTopicAssignment.PlanId from Plan.PlanId (SQL)
Date: 4/24/2020
JIRA Ticket: 2724
Context: After creating a column in PipTopiAssignment called PlanId, and migrating the infomation from PipTopicAssignmentPlan.PlanId, I attempted to add the foreign key to link Plan to PipTopicAssignment. I mentioned this and my steps here: https://mathematicampr.atlassian.net/browse/COR-2863
1. I tried the method mentioned in the source link below, but kept seeing the same mysterious constraint renamed.
Sources:https://stackoverflow.com/questions/3496687/sql-server-error-is-not-a-constraint-could-not-drop-constraint-see-previo
Questions for another dev:

Bug: Still getting double underscore names for FK constraint (SQL)
Date: 4/29/2020
JIRA Ticket: 2724
Context: I added the FK constraint with the following script:
USE EQR;
ALTER TABLE dbo.PipTopicAssignment
ADD FOREIGN KEY (PlanId) REFERENCES dbo.[Plan](PlanId);

My Steps: I recopied the db, and this time added the naming convention for the FK as follows:
USE EQR;
ALTER TABLE dbo.PipTopicAssignment
ADD CONSTRAINT FK_Plan_PipTopicAssignment
FOREIGN KEY (PlanId) REFERENCES dbo.[Plan](PlanId);
Success!
Sources: https://www.w3schools.com/sql/sql_foreignkey.asp
Questions for another dev:

Bug: PutPip2016 & PutPipPost2016 - assignmentToUpdate.PipTopicAssignmentPlans (Converter no longer necessary?)
Date: 4/30/2020
JIRA Ticket: 2724
Context:
```      assignmentToUpdate.PipTopicAssignmentPlans = PipConverterClass.ConvertPipPlans(new List<int>((int)pipView.PipTopicAssignmentPlan), pip); // TJT
```
My Steps: I had deleted the converter script because PipTopicAssignmentPlans doesn't exist anymore, and this error popped up in Visual Studio, looking for PipTopicAssignmentPlan even though it was commented out. I wasnt sure if there still needed to be values for assignmentToUpdate. There was already PipTopicAssignment's pip defined bove the assignmentToUpdate code for PipTopicAssignmentPlan. I deleted it because there was no need for it. 
Sources:
Questions for another dev:

Bug: PipListItemView - Mapping?
Date: 4/30/2020 
JIRA Ticket: 2724
Context: I don't understand what is needed to map PipListItemView to PipTopicAssignment in PipProfile.cs.
My Steps:
Sources:
Questions for another dev:

Bug: Trying to get the Plan name from PlanId in PipTopicAssignment (DetailedPipsReport.cs)
Date: 4/29/2020
JIRA Ticket: 2724
Context: the Read function in DetailedPipsReport is looking for the name of the plan:
```
public void Read(int yearId, SqlModel db)
        {
            this.pips = db.PipTopicAssignments
                .Where(x =>
                    x.StateYear.YearId == yearId
                    && x.PipTopicAssignmentCheckboxes.Any(y => y.PipTopicCheckboxLookupId == topicId)
                )
                .Select(x => new PipAbstractionClass
                {
                    State = x.StateYear.State.Name,
                    Plan = x.PipTopicAssignmentPlans.FirstOrDefault().Plan.Name, // THIS LINE
                    DetailedAbstraction = x.PipAbstraction,
                    MeasurementYear = x.PerformanceYear,
                    Population = x.PopulationLookup != null ? x.PopulationLookup.Name : ""
                })
                .ToList();

            if (this.topicId == 7) // Asthma
            {
                this.pips = this.pips.Where(x => x.Population == "Child" || x.Population == "Both").ToList();
            }

            this.reportingCycle = ReportHelperClass.GetReportingCycle(db, yearId);
        }
```
My Steps: Because PipTopicAssignmentPlan was deleted, the plan name can no longer be found through that relationship.
 Now that the realtionship is through PipTopicAssignment, I needed to change Plan = x.PipTopicAssignmentPlans.FirstOrDefault().Plan.Name to Plan = x.Plan.Name. Success. 
Sources: Olivia
Questions for another dev:

Bug: GetPlan function in Uploads Controller
Date: 4/29/2020
JIRA Ticket:
Context:
My Steps:
Sources:
Questions for another dev:

Bug: Build Errors in Visual Studio (PipTopicAssignmentPlan and PipListView missing?)
Date: 4/30/2020
JIRA Ticket: 2724
Context: While attempting to run EQR in Visual Studio, I faced build errors:
Severity	Code	Description	Project	File	Line	Suppression State
Error	CS2001	Source file 'C:\Users\TTrainor\OneDrive - Mathematica\Documents\Projects\EQR2\EQR2\Models\PipTopicAssignmentPlan.cs' could not be found.	EQR2	C:\Users\TTrainor\OneDrive - Mathematica\Documents\Projects\EQR2\EQR2\CSC	1	Active
and
Severity	Code	Description	Project	File	Line	Suppression State
Error	CS2001	Source file 'C:\Users\TTrainor\OneDrive - Mathematica\Documents\Projects\EQR2\EQR2\ClientObjects\StateYear\PipPlanView.cs' could not be found.	EQR2	C:\Users\TTrainor\OneDrive - Mathematica\Documents\Projects\EQR2\EQR2\CSC	1	Active

I'm not sure why the code is still searching for files that were deleted if I have removed all instances of them.
My Steps: I found the lines <Compile Include="Models\PipTopicAssignmentPlan.cs" />  and     <Compile Include="ClientObjects\StateYear\PipPlanView.cs" /> in EQR2.csproj.
I deleted those two lines from the file, and it ran. NOT sure if that was entirely safe.
Sources: https://stackoverflow.com/questions/19406924/error-cs2001-source-file-cs-could-not-be-found
Questions for another dev:

Bug: After modifying all frontend instances of PipTopicAssignmentPlan, solution still showing PipTopicAssignmentPlan
Date: 5/1/2020
JIRA Ticket: 2724
Context: I had to go back to the frontend to now match the changed backend. After doing so, there remain errors searching for PipTopicAssignmentPlan in Chrome Dev Tools. I expected changing the formControlName to Plans to work. I'm not sure what to place here. There is something to be said about NOT working in one part of an app for a while. I was all backend all last week. :(
My Steps: I talked to Olivia and realized the formControlName I needed in the html file was planId. I changed it and it worked. I was confused about the difference between formControlName and formGroup. pipForm is the formGroup, and planId, a field in the Pip model, is the formControlName. I understand this now. But honestly, these hiccups when switching back and froth betwwen working the frontend and working the backend HAVE to get smoother...
Sources:
Questions for another dev:

5/4/2020 - 5/8/2020

Bug: Confusion about which FormGroup to use on PipPlansComponent html
Date: 5/4/2020
JIRA Ticket:2724
Context: The FormGroup on the html page for PipPlansComponent was originally pipTopicAssignmentPlans. Once I changed the remainder of the app to reflect that pipTopicAssignmentPlans no longer existed, I couldn't figure out what FormGroup it should be. Originally, I thought it should be Plans, but I was shooting in the dark.  
My Steps: Once I explained where my confusion was to Olivia, she pointed out that it was the FormControlNAME I needed there, not FormGroup. This was a complete mistake, and clearly, I wasn't paying enough attention to see what the issue was. pipTopicAssignmentPlans was changed to planId, and for some reason I was looking for something else. It was right there in front of my face.
Sources:
Questions for another dev:

Bug: How to test that there are NO duplicates in eqroAssignments
Date: 5/5/2020
JIRA Ticket: 2714
Context: I have a test in eqro.service.spec.ts to test if there are duplicates present, but I am not sure how to test that there are no duplicates present.
My Steps: 1. I added test that expected the formArray to be valid, similar to the test that checks for duplicates. I could not figure out how to show that it was still valid without replicating that same thing:
```
expect(formArray.valid).toBe(true);
(formArray.controls[1] as FormGroup).controls['eqroLookupId'].setValue(2); // set a fake EQRO's eqroLookupId to match
fn(formArray);
expect(formArray.valid).toBe(false);
(formArray.controls[1] as FormGroup).controls['eqroLookupId'].setValue(3); // set a fake EQRO's eqroLookupId back to original
expect(formArray.valid).toBe(true);
```
2. I looked at how this was tested IN the uniqueArrayItem tests, and saw that I could test that the function returns null if there are no duplicates in the array by creating a variable (in my case "returned") that equals the result of running the function on the formArray. This was successful. 
Sources: unique-array-item.validator.ts
Questions for another dev:

Bug: issue with Mapper in PutPipPost2016 (and PutPit2016) function
Date: 5/6/2020
JIRA Ticket: 2724
Context: I saw an exception error in the PutPipPost2016 function. I looked at the function and saw that assignmentToUpdate was of type PipTopicAssignment and the info was from mapping from Pip2016View to PipTopicAssignment using pipView (update: from the parameters/arguments). 
My Steps: I was looking at the function and was a little confused about where pipView was coming from. After speaking to Olivia, I saw pipView was from the parameter/arguments. Also, Olivia recalled an activity with me about the AutoMapper, reminding me that if I map items that already have the same name in the AutoMapper, those lines will fail/error out. I removed the PipProfile lines mapping planId to planId in Pip2016View(and PipPost2016View)/PipPipTopicAssignment. I saw that I was mapping other properties between models that shared the same name and I deleted those as well. This cleared the error I received. 
Sources:
Questions for another dev:

Bug: Testing Error eqrosService: it('should call createEqroAssignment function for every assignment to be added if assignments argument is truthy')
Date: 5/7/2020
JIRA Ticket: 2714
Context: after making sure my tests for adding the uniqueArrayItems validator to eqroAssignments, I ran the remainder of the tests for the application. I received an error in the about it statement stating, "expected 3 to be 2". 
My Steps: I couldn't understand why it was calling createEqroAssignment 3 times. I observed the function createEqroAssignment was called in for this teat, addEqroAssignment, and it should ONY have been called as many times as there were assignments... Then I looked at the fakeEqroAssignmentValues stub. I forgot that in trying to add additional test information for the uniqueArrayItems validator, I altered the fakeEqroAssignmentValues stub. Once I removed the new fake value, the test passed with no problem. This made me think that maybe it would be best for myself to place a comment, possibly with my initials, in places I may need to reference back to when something breaks. Of course, this doesn't seem entirely possible, but a week or two had passed since I changed this branch and I forgot about the changes I made. I could also use git to search for my changes.
Sources:
Questions for another dev:

Bug: Column 'Name' in table 'StateYearReportName' is of a type that is invalid for use as a key column in an index.
Date: 5/13/2020
JIRA Ticket: COR-2044
Context: I was attempting to set a Unique Constraint to StateYearId and Name in the StateYearReportName table. I saw the above error when doing so.
My Steps: I googled the error and discovered that a unique constraint cannot be placed on nvarchar(max) (as well as other large object data types such as ntext, text, varchar(max), xml, or image). So, I requested to change the type of the column to a compatible one.
Sources: https://stackoverflow.com/questions/30298629/is-of-a-type-that-is-invalid-for-use-as-a-key-column-in-an-index
Questions for another dev:

Bug: Figuring out how to get fakeStateYearReportNames to work for testing uniqueArrayItem validator in general-information.service.spec.ts
Date: 5/13/2020 - 5/22/2020 (as I moved through different tickets and received comments)
JIRA Ticket: COR-2044
Context: I was trying to use the fakeStateYearReportNames for testing the uniqueArrayItems validator. I kept getting errors saying StateYearReportNames could not use FormArray(?). I was trying to set the formArray as the fakeStateYearReportValues.
My Steps: 
1. 5/13/2020 I scanned the rest of the document for a way to use fakeStateYearReportValues. I came across the variable reportNames, and I replaced formArray with reportNames. I completed the PR.
2. On 5/21/2020, I started working on this agian. Olivia commented I needed to use the fake values for the service(and I removed one test). So added the lines
```typescript
((<FormGroup>form.controls['eqroAssignments']).controls[1] as FormGroup).controls['eqroLookupId'].setValue(2);
            // set fake eqroLookupId to match
            expect(((<FormGroup>form.controls['eqroAssignments']).controls[1] as FormGroup).controls['eqroLookupId'].errors).toEqual({ duplicateName: true });
```             
but it wasn't working even though I KNEW the syntax was correct. The problem was that I couldn't figure out how to fill the empty array...
3. After speaking with Olivia again, it was clear that the form had nothing in the eqroAssignments FormArray (as shown on the test 'eqroAssignments field should be empty array'). And she told me that I needed to add items to the eqroAssignments form array to test. Initially, I thought this meant using addEqroAssignments function (from the service) to add the eqroAssignments, but that would add complexity to the test, and we want to test one thing at a time, not test the validator AND the addEqroAssignment function.
4. So in figuring out how to add the eqroAssignments, I needed to push two empty eqroAssignment Index stubs to the empty eqroAssignments form array, BUT the line "form.controls['eqroAssignments'].push(someIndexes)" returned the error of "Property 'push' does not exist on AbstractControl". I could not figure out what that meant, and Olivia reminded me that eqroAssignments needed its type to be cast so we COULD use .push(). So I changed the line to "(form.controls['eqroAssignments'] as FormArray).push(someIndexes);"  
5. I modified the values for the two fake eqroAssignemtns I added, making them match in the hopes of triggering the validator.
```typescript
it('sets formArray as invalid if duplicate eqroAssignments are present', () => {
            (form.controls['eqroAssignments'] as FormArray).push(masterFormStub.emptyEqroAssignmentIndexStub); // adding empty eqroAssignments to the form
            (form.controls['eqroAssignments'] as FormArray).push(masterFormStub.emptyEqroAssignmentIndexStub);
            ((<FormGroup>form.controls['eqroAssignments']).controls[0] as FormGroup).controls['eqroAssignmentId'].setValue(1);
            ((<FormGroup>form.controls['eqroAssignments']).controls[0] as FormGroup).controls['eqroLookupId'].setValue(2);
            ((<FormGroup>form.controls['eqroAssignments']).controls[1] as FormGroup).controls['eqroAssignmentId'].setValue(2);
            ((<FormGroup>form.controls['eqroAssignments']).controls[1] as FormGroup).controls['eqroLookupId'].setValue(2);
            // set fake eqroLookupId to match
            expect(((<FormGroup>form.controls['eqroAssignments']).controls[1] as FormGroup).controls['eqroLookupId'].errors).toEqual({ duplicateName: true });
        });
```
Sources:
Questions for another dev:

Bug: Unable to get Login method to work
Date: 6/26/2020
JIRA Ticket: n/a
Context: Within the Dating app tutorial, there is a login method, and my version was not working.
My Steps:
I used this as an opportunity to understand debugging in .NET more with Nissa. Nissa had never done the tutorial, so she was more green than =I was with the app.
We added breakpoints within the login function, particularly at the point the function ensure the userFromRepo variable is not null. We ran the program and noticed the vale was not null BUT the value of the token was not what it we expected it to be. So we looked at the register function, and noticed that the parameter for the passwordHash was set twice instead of once, and there was no passwordSalt. After correcting my oversight, the function ran smoothly. It was good to see how Nissa was able to debug without having done the tutorial, and as I foillowed along, I understood debugging a little more. 
Sources: Udemy - Build An app with aspNet.Core and Angular from scratch tutorial
Questions for another dev:

Bug: Once a user is logged in, they are unable to view all values
Date: 6/28/2020
JIRA Ticket: N/A 
Context: Within the Dating app tutorial, there is a login method. A user can only view all values once they are logged in. However, my users were seeing "Unauthorized" after logging in. The login function was giving me a token, but my token was unable to pass Authorization.
My Steps:
After adding breakpoints at the first conditional in the login function, I ran the app again, and checked the values in Postman to ensure I was getting the correct token when logging a user in. I then placed the token in as a key in the header (Authorization: Bearer *token*). Of course it was then I realized I was placing the key in the wrong place, adding it as a parameter in Postman. Once I added the token in the correct place, it ran smoothly.
Sources: Udemy - Build An app with aspNet.Core and Angular from scratch tutorial
Questions for another dev:

Bug: Unable to render data visualization
Date: 7/2/2020
JIRA Ticket: NA
Context: Created Viz1.html for week 3 Assignment, was not rendering
My Steps: After successfully rendering the rectangle, circle and octagon with svg tag in HTML, I attempted to recreate them with d3 notation. Nothing was rendering in my browser.
I looked at the id I was using for the div and realized I spelled it incorrectly. After correcting it, it worked fine.
Sources: 
Questions for another dev:

Bug: Getting my data sample into my js file in d3
Date: 7/2/2020
JIRA Ticket: NA
Context: In assignment 3.2 we need to bring in our data to use it to make rectangles and circles.
My Steps: I was unable to use d3.json to capture the data in my html file (in the script tag).
My code:
```javascript
 createRects = (data) => {
     const rectangles = d3.select("body").selectAll("#myDiv")
                .data(data)

            rectangles
                .enter()
                .append('rect')
                .attr('x', (d, i) => (i * 10) + 2)
                .attr('y', 50)
                .attr('width', d => d.size)
                .attr('height', 10)
                .style('color', d => d.color)
        }
```
I can see in the Chrome Dev Tools window all 10 rectangles and all 10 circles, INSIDE the body, but below the script as follows:
```html
<body>
    <div id="myDiv"></div>


    <script src="https://d3js.org/d3.v4.min.js"></script>
    <script></script>
        
<rect x="12" y="50" width="50" height="10" style="color: magenta;"></rect><rect x="22" y="50" width="20" height="10" style="color: green;"></rect><rect x="32" y="50" width="35" height="10" style="color: white;"></rect><rect x="42" y="50" width="65" height="10" style="color: black;"></rect><rect x="52" y="50" width="75" height="10" style="color: steelblue;"></rect><rect x="62" y="50" width="115" height="10" style="color: blue;"></rect><rect x="72" y="50" width="95" height="10" style="color: orange;"></rect><rect x="82" y="50" width="85" height="10" style="color: red;"></rect><rect x="92" y="50" width="40" height="10" style="color: bisque;"></rect><circle cx="50" cy="-100" r="5" style="color: magenta;"></circle><circle cx="20" cy="-40" r="5" style="color: green;"></circle><circle cx="35" cy="-70" r="5" style="color: white;"></circle><circle cx="65" cy="-130" r="5" style="color: black;"></circle><circle cx="75" cy="-150" r="5" style="color: steelblue;"></circle><circle cx="115" cy="-230" r="5" style="color: blue;"></circle><circle cx="95" cy="-190" r="5" style="color: orange;"></circle><circle cx="85" cy="-170" r="5" style="color: red;"></circle><circle cx="40" cy="-80" r="5" style="color: bisque;"></circle></body>
```

Sources:
Questions for another dev:

Bug: Unable to remove a migration (SQLite)
Date: 7/2/2020
JIRA Ticket: NA
Context: I was attempting to add a new data migration with new properties and Entities. But because I did them incorrectly, I needed to revert the db. I received an error stating "The property or navigation 'MoodId' cannot be added to the entity type 'DonzoApp.API.Models.Workout' because a property or navigation with the same name already exists on entity type 'DonzoApp.API.Models.Workout'."
My Steps:
I attempted to remove the migration the same as the tutorial by dropping the db (dotnet ef database drop) then removing the migration (dotnet ef migrations remove). I was still receiving the same error, but noticed the error pointed me to the line in the migration for 'MoodId'. I deleted that part of the code from the migration file. The same error came up, but for UserId. So I repeated the steps, deleting the affected line of code. I once again received the error for WTypeId, and I repeated the steps. After this, I again attempted to remove the migration (dotnet ef migrations remove) and it was successful. Once the migration was removed, I was able to update the database to the previous migration(dotnet ef database update)
Sources: I kinda guessed this one, but I know I would NOT do this on an app again, unless I knew I had backup of the data. Even then, I wouldn't want to do this.
Questions for another dev:


Bug: Unable to access formControlName correctly
Date: 8/4/2020
JIRA Ticket: COR-2044
Context: I added the uniqueArrayItem validator to generalInforForm.stateYearReportNames, and I was unable to access where the error was in the unit test.
My Steps:
1. After fumbling horribly with the test myself, I reached out to Nissa. She was able to see immediately that I was not accessing the correct formControl. We looked at FormArray (in Angular documentation) together, then we looked at the validator function to see where the error was being set, and modified the test code to access the correct formControl.
2. After that was still unsuccessful, Nisaa said there HAD to be spies in the describe block. We notice that all of the functions within getGeneralInfoForm (which is the function I was using to create my form) had spies earlier on in the describe block. 
3. Nissa suggested I add a describe block above my code, including the tests the spies were for, to pull the three spies out of scope for my describe block. I did as she suggested.
4. My test passed with no problem after that.
Sources: https://angular.io/api/forms/FormArray
Questions for another dev:

Bug: Population Name not showing in Pip Lists
Date: 8/6/2020
JIRA Ticket: COR-2724
Context: Population name was not appearing in Pip list (State Year Information)
My Steps: 1. I ran the application and checked the network tab (Chrome Dev Tools). I saw that the population name was null.
2. I saw that I had removed the MapPopulaionAndPlanNames when I was doing this ticket, so the population names were not being mapped.
3. I added the function back to PipsListItemsView (GetPipsList), omitting the PipTopicAssignmentPlans portion. This didnt work.
4. Nissa suggested I create a mapper for the population name. I added it to PipProfile, mapping from PipTopicAssignment to PipsListItemView, and this worked. I realize that the previous function had a lot more to do that just map the population name which was why it was a separate function.
Sources:
Questions for another dev:

Bug:
Date:
JIRA Ticket:
Context:
My Steps:
Sources:
Questions for another dev:

Bug:
Date:
JIRA Ticket:
Context:
My Steps:
Sources:
Questions for another dev:
