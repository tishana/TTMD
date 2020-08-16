3/20/2020
```javascript
const eqroLookupIds = [1, 5, 7, 7, 9. 31]
const y = new Set(eqroLookupIds); // [1, 5, 7, 9, 31]
if (y.size === eqroLookupIds.length) {
    return null; // in this case this would NOT be true
} else {
    return error; // this would be true, and an error wwould be returned
}
```
Set() creates an array of the unique values in a collection.

Set.prototype.size will return the length of the array created.

Set.prototype.has(value) will return a boolean of whether the set contains the value.

See more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set 


