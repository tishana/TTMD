Observables 
An observable allows transmission of data between components.
There will be one that emits the data (outgoing) and one or more that receives the transmission (listener, incoming).
A subject is used to emit an observable using .emit().
Observer is what is "listening".
.next() is what happens once data is emitted from the observable.
.subscribe() starts the observable, must use .unsubscribe() within same component to prevent memory/resource loss. The subscribe holds the observable handler function.
.complete() completes the observable, no .unsubscribe() needed.
errors cancel the observable, they do not complete the observable.
.pipe(), from rxjs.operators can be used to include built in operators, like map(). You can use the operators to transform a copy of the data coming from the observable without changing the actual data. You can use this on built in observables and custom observables. pipe takes an unlimited amount of arguments.

In the component's service create an emitter,:
```typescript
    // from UserService
    activatedEmitter = new EventEmitter<boolean>();
```


 and in the component you create a method that calls the emitter (and any arguments):
 ```typescript
import { UserService } from '../user.service';

 constructor(private userService: UserService) {}

 onActivate() {
     this.userService.activatedEmitter.emit(true);
 }
 ```

 Then, in the html, you attach the method from the component to the element:
 ```html
 <button class="btn btn-primary" (click)="onActivate()">Activate</button>
 ```

 ```typescript
  toggleReviewCompleted(): void {
        this.dateApprovedSubscription = this.statusDropdownDataService.dateApprovedSubject.subscribe(state => {
            if (!state) {
                const statusType = this.statusTypes.filter(x => x.statusTypeId = 5); // returns matching statusType in an array
                statusType[0].isEnabled = false;
                // tslint:disable-next-line: no-console
                console.log(statusType[0].isEnabled);
            }
        });
    }
```