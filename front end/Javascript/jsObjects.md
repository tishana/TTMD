Objectives:
- Write a paragraph describing JS objects
- Describe:
    * what objects are used to store
    * how to create an object
    * how to edit a property in an object
    * how to delete a property in an object
    * the two ways to access object properties, with examples from uniqueIdValidator

Objects are a data type in JavaScrit that is a collection of properties, defined by key value pairs (key: value), and can contain methods (functions specific to the object). 

You create an object a couple of ways:
1. Object literal - In one statement with the name of the object and the objects properties and values in curly braces ->
```javascript
    var doll = { id: 001, name: "maya", hair: "curly", occupation: "nurse"};
```
2. JS keyword "new" - One or multiple statements after declaration of type ->
```javascript
    var cat = new Object();
    cat.kingdom = "Animalia"; // adds new property kingdom
    cat.phylum = "Chordata"; // adds new property phylum
    cat.name = "Papi"; // adds new property name
    cat.color = "orange"; // adds new property color
    cat.call = "meow!"; // adds new property call
```
You can access and edit a property in an object by using the object name and property name and assigning it a new value:
```javascript
cat.name = "Morris"; // dot notation
cat[color] = "Salt and Pepper"; // square braces
y = call; cat[y]; // using an expression that has to equal a property name
```

You can delete a property of an object using the delete keyword:
```javascript
delete cat.phylum;
console.log(cat); // returns: { kingdom: "Animalia", name: "Papi", color: "orange", call: "meow!" }
```

Examples from uniqueId Validator for accessing properties of objects:
```typescript
const ids = formArray.value.map(x => x[control]); // attempting to access the control (in argument) property of item x of formArray (an Object)
if (y.size !== ids.length) { return null }; // y.size is a method to get the length of the Set y (an Object) 
```
- Sources:
    * W3Schools Objects - https://www.w3schools.com/js/js_objects.asp
    * MDN Web Docs: Object - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
    * Eloquent Javascript - https://eloquentjavascript.net/

    