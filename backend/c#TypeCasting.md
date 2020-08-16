Type Casting

When Olivia and I were working through the backend, I ran into an exception stating I could not implicitly convert one type to another. Olivia's solution was to "cast the type". Not knowing what that was, I decided to write this up.

Type casting is when you change a variables type from one to another for instances where code has incompatible types, like int and double, or string and int.

There are two types of type casting in C#:
1. Implicit casting is converting a smaller type to a larger type, like from int to double, or more specifically when the data type being converted TO is compatible with the original data type, like the example below: 
```
int this = 9; // this = 9
long that = this; // that = 9
float theOther = that; // theOther = 9
```
2. Explicit casting is converting a larger type to a smaller type, or more specifically an incompatible type, using parentheses to manually cast the type, like from double to int...
```
double theFirst = 7.95; // theFirst = 7.95
int theSecond = (int) theThird; // theSecond = 7... You lose the .95 value
```

You can also use built-in C# methods to convert data types:
ToBoolean(), ToChar(), ToString(), ToInt32() *int, ToInt64() *long, ToDouble(), and others...

In the example Olivia walked me through we needed to convert a mutable int or int? to a standard int in PipService: 
```
// PipView.cs (or Pip2016View.cs or PipPost2016View.cs)

 public int? PopulationLookupId { get; set; } // the mutable int


// PipService.cs
            assignmentToUpdate.PipTopicAssignmentPlans = PipConverterClass.ConvertPipPlans(new List<int>((int)pipView.PipTopicAssignmentPlan), pip); // standard int conversion

```

Other examples I have found in EQR are as follows:
```
// ExportController.cs casting goalsPerChecklist average to float
 List<QChecklistGoalsObjectivesAggregateExport> goalsObjectivesAggregate = new List<QChecklistGoalsObjectivesAggregateExport> {
              new QChecklistGoalsObjectivesAggregateExport
              {
                 Metric = "Average",
                 Goals_per_Checklist = (float)goalsPerChecklist.Average(),
                 Objectives_per_Checklist = (float)objectivesPerChecklist.Average(),
                 Goals_and_Objectives_Core_Set_Measures_per_Checklist = (float)objectivesPMeasuresPerChecklist.Average()
              },

// DetailedPipReports.cs from mutable double to double
private string FormatPercentage(double? rate)
        {
            return rate != null ? Math.Round(((double)rate), 1).ToString() + "%" : "";
        }
```
Sources: 
Geeks for Geeks: https://www.geeksforgeeks.org/c-sharp-type-casting/
w3Schools: https://www.w3schools.com/cs/cs_type_casting.asp 
Codescracker - C# Type Conversion- https://codescracker.com/c-sharp/c-sharp-type-conversion.htm
tutorialspoint - C# Type Conversion - https://www.tutorialspoint.com/csharp/csharp_type_conversion.htm

