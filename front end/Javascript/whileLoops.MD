While Loops

While loops run a block of code as long as the given condition is true. For example in uniqueValidator the while loop shown below pushes values, the indeces of values from y, as long as idx does not equal -1. I used this to find duplicated in the array ids. Then if the length of r was greater than or equal to 2, I knew there were duplicates of that particular id and I could set an error on them.: 

```typescript
const y = new Set(ids);
        if (y.size !== ids.length) {
            y.forEach(x => {
                let r = []; // empty array for pushed indices
                let idx = ids.indexOf(x);
                while (idx !== -1) {
                    r.push(idx);
                    idx = ids.indexOf(x, idx + 1); //incrementing the variable to prevent infinite loop. Not having this crashed my browser.
                }
```
idx would only be equal to -1 if there were no value to match "x".

Its important to increment the variable or the loop will continue infinitely, crashing the browser.

To compare a while loop to a for loop for this situation, a while loop is actually a for loop without the first and third statements, first being the initializing statement for the iterator, and the third incrementing the iterator. The While loop simply contains the conditon for running the code. You iterate within the while loop. The condition for this while loop, idx !== -1, continues to be true because a negative index is undefined. So since the set y is all unique values from array ids, each item in y WILL be found in ids. I think a for loop for this same solution might work. 

ids = [ 4, 5, 5, 31, 4, 23];
y = {4, 5, 31, 23};
y.forEach(x => {
    var idx = ids.indexOf(y.i); // this isn't right*
    var r = [];
    for (i = 0; i > (y.size - 1) ; i++){
    r.push(idx);
    }
...
})
 In the case of 4, r = [0, 4].

 The problem is that since y is a Set(), I would have to create an iterator using .entries(). The for loop can be done, I'm sure, but it would have been lengthy and a little more complicated.


Since a while loop runs until a certain condition is met, in this case while idx !== -1, and a for loop is run a predetermined amount of time, the while loop was necessasry here. We don't know how many instances of any of the array items in Set y would appear in the ids array so setting the while condition to run until it couldn't find anymore is the best way to handle the loop. 

Using a for loop how would I find all of the instances? 

If I used a for loop, I would have to create an array for each item in Set y, and push the index of each matching item (idx) in y into the array. 
ids = [ 4, 5, 5, 31, 4, 23];
y = {4, 5, 31, 23};
y.forEach(x => {
    var idx = ids.indexOf(y.i); // this isn't right*
    var r = [];
    for (i = 0; i > (ids.length) ; i++){
    if (ids[i] == x){
        r.push(idx);
    }
    ...
}}

I also considered a for/of loop:
for(let id of ids){
    if (ids[id] == x) {// if the item in ids matches x (of Set y) 
    r.push(idx); // pushes the index to r
    }
}

I think either of these would work to get the index of every instance of items in y



 Sources:
 MDN - While https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while
Set.prototype.entries() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries
 W3Schools - https://www.w3schools.com/js/js_loop_while.asp

