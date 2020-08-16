I love this very unique way Nissa set up the unit test for the getGeneralInfoForm function in the general-infromation service. I ended up having to change it because of how I needed toggleEqrReceivedCountDisabled to be tested, but I'm placing it in all it's glory here to keep in mind:

```typescript
    describe('In generalInfoForm', () => {
        beforeEach(() => {
            spyOn(service, 'initStateYearReportNames');
            spyOn(service, 'initStateYearTaskAssignments');
            spyOn(service, 'toggleEqrReceivedCountDisabled');
            expect(service.initStateYearReportNames).toHaveBeenCalledTimes(0);
            expect(service.initStateYearTaskAssignments).toHaveBeenCalledTimes(0);
            expect(service.toggleEqrReceivedCountDisabled).toHaveBeenCalledTimes(0);
            expect(service.updateEqrReceivedCountValue).toHaveBeenCalledTimes(0);
            form = service.getGeneralInfoForm(<any>fakeFilledGeneralInfoValues);
        });

        it('eqrReceived field should be populated', () => {
            expect(form.controls['eqrReceived'].value).toBe(true);
        });

        it('eqrReceivedDate field should be populated', () => {
            expect(form.controls['eqrReceivedDate'].value).toEqual('10/01/19');
        });

        it('eqrReceivedCount field should be populated', () => {
            expect(form.controls['eqrReceivedCount'].value).toEqual(5);
        });

        it('eqrReceivedCount field should trigger error if higher than 999', () => {
            form.controls['eqrReceivedCount'].setValue(1000);
            expect(form.controls['eqrReceivedCount'].errors.max).toBeTruthy();
        });

        it('eqrReceivedCount field triggers an error if lower than 0', () => {
            form.controls['eqrReceivedCount'].setValue(-23);
            expect(form.controls['eqrReceivedCount'].errors.min).toBeTruthy();
        });

        it('eqrNotes field should be populated', () => {
            expect(form.controls['eqrNotes'].value).toEqual('eqr notes');
        });

        it('chipProgramLookupid field should be populated', () => {
            expect(form.controls['chipProgramLookupId'].value).toEqual(17);
        });

        it('popNotes field should be populated', () => {
            expect(form.controls['popNotes'].value).toEqual('population notes');
        });

        it('calls initStateYearReportNames with stateYearReportNames control & returned value for stateYearReportNames', () => {
            expect(service.initStateYearReportNames).toHaveBeenCalledTimes(1);
            expect(service.initStateYearReportNames).toHaveBeenCalledWith(form.get('stateYearReportNames'), fakeStateYearReportNameValues);
        });

        it('calls initStateYearTaskAssignments with stateYearTaskAssignments control & returned value for stateYearTaskAssignments', () => {
            expect(service.initStateYearTaskAssignments).toHaveBeenCalledTimes(1);
            expect(service.initStateYearTaskAssignments).toHaveBeenCalledWith(
                form.get('stateYearTaskAssignments'),
                fakeStateYearTaskAssignments
            );
        });

        it('calls toggleEqrReceivedCountDisabled with generalInfoForm if StateYearReportNames > 0', () => {
            expect(service.toggleEqrReceivedCountDisabled).toHaveBeenCalledTimes(1);
            expect(service.toggleEqrReceivedCountDisabled).toHaveBeenCalledWith(form);
        });
    });
```