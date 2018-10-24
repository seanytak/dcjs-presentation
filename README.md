# ICS 484 Visualization Framework Critique | DC.js

## DC.js (Dimensional Charting JavaScript Library)

![DC.js Banner](https://dc-js.github.io/dc.js/dc.logo.png)

The primary purpose of DC.js is to seamlessly integrate D3.js and Crossfilter.js

### Documentation 

Overall, DC.js is well-documented with complete coverage on all available Classes and Functions.

The easiest way to get started is to try tweaking their minimal viable examples [here](http://dc-js.github.io/dc.js/examples/).


### Installation

I recommend using the files from https://cdnjs.com/ for ease of usage. Furthermore, I highly recommend using the version of Crossfilter.js listed here instead of the one DC.js has on their documentation.

#### CSS
```html
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/dc/3.0.8/dc.min.css" />
```

#### JS
```html
<!-- D3.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min.js"></script>
<!-- Crossfilter.js (Version 2, Community-Maintained) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crossfilter2/1.4.6/crossfilter.min.js"></script>
<!-- DC.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/dc/3.0.8/dc.min.js"></script>

```

### Usage


#### HTML 
In the HTML file, specify a `div` with the class `dc-chart` and a unique `id` 
```html
<div id="programming-chart" class="dc-chart" style="width: 100%"></div>
```

#### JS
In the JavaScript file, you need to specify a `dc.chart('#chart-id')` the crossfilter `dimension` and `group` as well as the `attributes` for a `chart`
```javascript
// Define the chart linked to the HTML ID
const classChart = dc.pieChart('#class-chart');

// Load the data like Plotly
d3.tsv("../data/acm.tsv").then(function (data) {

    // Create a crossfilter object on the data
    const cf = crossfilter(data);

    // Create crossfilter dimension on the data
    // Takes a function that operates on each row / record in the data
    const classStanding = cf.dimension(function (student) {
        return student['Class Standing']; // Get the attribute of the data
    });

    // Create a crossfilter group
    const classStandingGroup = classStanding.group();

    /**************************************************
    * Essentially, a SQL GROUP BY on 'Class Standing'
    * **************************************************/

    // D3.js method chaining to specify attributes of a chart
    classChart
        .height(300)
        .dimension(classStanding)
        .group(classStandingGroup)
        .legend(dc.legend());
```

### Framework Comparison

#### 1) Basic Comparison
Metric | DC.js | Plotly 
------------ | ------------- | ------------- 
Basic Charts (Bar, Pie, Scatter) | :white_check_mark: | :white_check_mark: 
Advanced Charts (Network, Sankey) |  | :white_check_mark: 
Dynamic Filtering | :white_check_mark: | 
Chart Tools (Zoom, Pan) | | :white_check_mark: 
HoverTool | :white_check_mark: | :white_check_mark:
Documentation | :white_check_mark: | :white_check_mark:
Active Community | :white_check_mark: | :white_check_mark:

#### 2) "Winners" Comparison
Metric | DC.js | Plotly 
------------ | ------------- | ------------- 
Best Attention to Detail? (Color, Ordering) | | :white_check_mark: 
Best Interactivity? (Playing with individual data) | :white_check_mark: | 
Easier Framework to Work With? | | :white_check_mark:

#### 3) Where DC.js Shines

- DC.js uses a different subset of features from D3.js than Plotly 
- DC.js allows users to visually construct a "Query" on the data set
    - Selections on the **same** chart are similar to:
        - **WHERE** Chart1_Dimension = X **OR** Chart1_Dimension = Y
    - Selections on **different** charts are similar to:
        - **WHERE** Chart1_Dimension = X **AND** Chart2_Dimension = Y

If the only features you want for a specific visual component are:
- Basic 2D Charts
- Simple views of the data (no zooming, panning, ...)

Then DC.js adds an extra layer of interactivity that empowers users to explore the data freely if they choose to without any additional effort on your part.


### Examples:

1. Majority of Basic Charts | [Nasdaq 100 Index 1985 - 2012](https://dc-js.github.io/dc.js/)
2. USA Choropleth Map  | [Startup Founder Demographics](http://dataviz.pitchbook.com/founders/)
3. My Demo | [ACM@Manoa Members Statistics]()






