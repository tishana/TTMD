// const ids = [1, 5, 7, 1, 22, 7];
// const y = [1, 5, 7, 22];
// y.forEach(r => {
// console.log(r)
// if (r.length < 1) {
//     r // [0, 3] I do need an if statement. Also, both the original and the dupe(s) need the error statement
//     r.forEach(z => {
//         console.log('error ' + z)
//     })

// }
// });
const statuses = [
    {
        id: 1,
        color: "blue"
    }, {
        id: 2,
        color: "brown"
    }, {
        id: 3,
        color: "orange"
    }, {
        id: 4,
        color: "violet"
    }, {
        id: 5,
        color: "grey"
    }, {
        id: 6,
        color: "green"
    }
];

const reviewApproved = statuses.filter(x => x.id === 5);
console.log(reviewApproved);

// // view.peerRefined = view.peerFiltered.filter(function (value) {
// // We have firstComparisonYear & secondComparisonYear
// // 1. grab the last two characters of the first comparison year (20)
// var firstComparisonYear = view.dataSlice.compYears.split()
// // 2. grab the last two characters of the second comparison year (21)
// var secondComparisonYear = view.dataSlice.compYears.
// const combYears = view.dataSlice.compYears.includes(firstComparisonYear, secondComparisonYear)
//     // if value contains specific strings, return true

//     // we return true if the value contains firstComparisonYear AND it contains secondComparisonYear

//     // if we want to keep the item in the array, we want the callback function to return true on the value
//     // 3. insert those values into a filter variable (ie combYears)
//     // 4. return the values that match / has characters that are the same as the comparison years characters
//     //  (ie return value.unit.includes(combYears))
//     // add last 15 characters of parameter

// })

// dropdown from peer-view.html

// <div class="peer-dropdown-containers top-left" id="peer-narrow-dropdown-top-left">
//                 <!-- This is where the new dropdown for the stacked bar chart will go -->
//                 <label for="comparison-years">Comparison Years</label>
//                 <select name="compYears" class="form-control" id="year-comparison-peer"
//                     onchange="myApp.views.peerView.updateDataSlice({compYears:this.value})"></select>
//                 <!-- This is where the new dropdown for the stacked bar chart will go -->
//             </div>

// For the dropdown
//  this.dropDownServiceCompYears = new DropDownService();     compYears: 'FY2019 & FY2020'
// const comparisonYears = ['FY2019 & FY2020', 'FY2019 & FY2021', 'FY2020 & FY2021'];

// in updateCharts: // add in stacked bar chart
        // this.charts.peerStackedBarChart.updateVis(this.data.peerGroupAssignments);