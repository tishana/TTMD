I was trying to disable the input field on GeneralInfo Component by adding a conditional to the disable attribute on the HTML. I saw this error message:

"It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true when you set up this control in your component class, the disabled attribute will actually be set in the DOM for you. We recommend using this approach to avoid 'changed after checked' errors.

Example:

```javascript  
      form = new FormGroup({
        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
        last: new FormControl('Drew', Validators.required)
      }); 
```

I had a hard time understanding what this meant. I know there was already a Form on the page, however, there were other [disabled] attributes on the page. So why can't I use it on this form? 

I worked with Olivia before on form.control[field].value, and this time she showed me formName.controls[field].disable() and .enable() which, as named, disable and enable the named attribute. I also found good use in .setValue(). With all three of these forms, I was able to successfully create functions for the service, and test them.

To test if a field has been enabled/disabled, I used the following:
```typescript
describe('the toggleEqrReceivedCountDisabled function', () => {
        beforeEach(() => {
            form = masterFormStub.filledGeneralInfoFormStub;
        });
        it('sets EQR Received Count field to disabled when its value is > 0', () => {
            form.controls['eqrReceivedCount'].enable();
            service.toggleEqrReceivedCountDisabled(form);
            expect(form.controls['eqrReceivedCount'].disabled).toBe(true);
        });
        it('sets EQR Received Count field to enabled when its value is 0', () => {
            form.controls['eqrReceivedCount'].disable();
            form.controls['eqrReceivedCount'].setValue(0);
            service.toggleEqrReceivedCountDisabled(form);
            expect(form.controls['eqrReceivedCount'].enabled).toBe(true);
        });
    });
```
In "sets EQR Received Count field to disabled..." I used a form that already existed, as opposed to using another function, getGeneralInfoForm, to make the form. I enabled the eqrReceivedCount field, using .enable(), then called the toggleEqrReceivedCountDisabled function. Since the form I used at the timne has a value for eqrReceivedCount of 5, I knew that the field would be disabled, reflected by the epect line following the call of the function.

In "sets EQR Received Count field to enabled..., I used the same form, but disabled the eqrReceivedCount field using .disable() and calling the toggleEqrReceivedCountDisabled(). I then expected the field to be enabled once the function ran.

In creating toggleEqrReceivedCountDisabled() and updateEqrReceivedCountValue(), it became necessary for me to modify existing functions, namely addStateYearReportName and removeStateYearReportName, because toggleEqrReceivedCountDisabled and updateEqrReceivedCountValue needed additional parameters. I added the required additional parameter, the General Info Form, to the functions in the service, and added the form as an argument for both functions in the HTML. 

Then this happened...

EQR Received Count field zeroing out after "Save Changes" is clicked, and user is able to save user-input # in field even when EQR Received Count field doesn't match the number of reports.

My steps:

1. After recreating the bug, I realized the generalInfoForm passed to updateEqrReceivedCountValue has a null value for 'eqrReceivedCount'. Even after setting the value (in the console) after the function is completed, the value is set back to null.

2. Olivia and I walked through the situation at hand, using Chrome Dev tools and realized the correct value is never sent to the server. And the server can only reflect what it receives. 

3. Olivia found a method .getRawValue(), which I didn't know about. This method retieves all values regardless of disabled status, where .value excludes disabled controls. I added .getRawValue() to the following line in the onSubmit function, which handles the 'Save Changes' button and process. Success.

```typescript
 this.generalInformationResource
            .putGeneralInfo(this.stateYearId, this.generalInfoForm.getRawValue())
            .subscribe((values: StateYearBasicInfo) => {
                this.setGeneralInfoForm(values);
            });
```

Helpful links:
Netbasal on Medium - Angular Reactive Forms Tips and Tricks: 
https://netbasal.com/angular-reactive-forms-tips-and-tricks-bb0c85400b58

Netbasal on Medium - Three Ways to Dynamically Alter your Form Validation in Angular:
https://netbasal.com/three-ways-to-dynamically-alter-your-form-validation-in-angular-e5fd15f1e946

Angular - Reactive Forms:
https://angular.io/guide/reactive-forms

Angular Snafoos! form.value vs form.getRawValues():
http://azanebrain.github.io/news/angular-snafoo-form-value-vs-getrawvalues/ 