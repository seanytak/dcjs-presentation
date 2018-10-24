'use strict';

const programmingChart = dc.barChart('#programming-chart');
const careerChart = dc.rowChart('#career-chart');
const majorChart = dc.rowChart('#major-chart');
const classChart = dc.pieChart('#class-chart');
const sigsChart = dc.rowChart('#sigs-chart');
const counter = dc.dataCount('.dc-data-count');
// const table = dc.dataTable('.dc-data-table');


d3.tsv("../data/acm.tsv").then(function (data) {

    const cf = crossfilter(data);
    const all = cf.groupAll();

    const programming = cf.dimension(function (student) {
        let fields = student['Programming Languages'].trim().split(', ');
        fields = fields[0] != '' ? fields : []; // Remove null arrays
        return fields;
    }, true);
    const programmingGroup = programming.group();

    programmingChart
        .height(400)
        .x(d3.scaleBand())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Programming Languages')
        .yAxisLabel('Number of Proficient Students')
        .dimension(programming)
        .group(programmingGroup);


    const majors = cf.dimension(function (student) {
        return student['Major'];
    });
    const majorsGroup = majors.group();

    majorChart
        .height(300)
        .margins({ top: 20, right: 20, bottom: 40, left: 20 })
        .dimension(majors)
        .group(majorsGroup)
        .elasticX(true)
        .ordinalColors([
            '#4285F4', // Computer Science (General Track)
            '#F4B400', // Computer Science (Security Track)
            '#4285F4', // Computer Engineer
            '#DB4437', // Computer Science (General Track), Math
            '#4285F4',
            '#4285F4',
            '#4285F4',
            '#DB4437',
        ]);

    const classStanding = cf.dimension(function (student) {
        return student['Class Standing'];
    });
    const classStandingGroup = classStanding.group().orderNatural();

    classChart
        .height(300)
        .dimension(classStanding)
        .group(classStandingGroup)
        .legend(dc.legend());

    const sigs = cf.dimension(function (student) {
        let fields = student['SIGs Interest'].split(', ');
        fields = fields[0] != '' ? fields : []; // Remove null arrays
        return fields;
    }, true);
    const sigsGroup = sigs.group();

    sigsChart
        .height(300)
        .margins({ top: 20, right: 20, bottom: 40, left: 20 })
        .dimension(sigs)
        .group(sigsGroup)
        .ordinalColors([
            '#4285F4', // ACI
            '#F4B400', // GreyHats
            '#DB4437', // Manoa Data Science
            '#0F9D58', // Game Dev
            '#9370DB', // Enterpeneurship
        ]);


    const careers = cf.dimension(function (student) {
        let fields = student['Career Fields'].split(', ');
        fields = fields[0] != '' ? fields : []; // Remove null arrays
        return fields;
    }, true);
    const careersGroup = careers.group();

    careerChart
        .height(900)
        .margins({ top: 20, right: 20, bottom: 40, left: 20 })
        .dimension(careers)
        .group(careersGroup)
        .ordinalColors([
            '#4285F4', // Software Engineer
            '#4285F4', // Back-End Developer
            '#0F9D58', // Game Developer
            '#4285F4', // Mobile App Developer
            '#DB4437', // Data Scientist
            '#F4B400', // Information Security Analyst
            '#4285F4', // Front-End Developer
            '#DB4437', // Data Engineer
            '#4285F4', // Full-Stack Developer
            '#FFB6C1', // Researcher
            '#DB4437', // Database Administrator
            '#F4B400', // Network Engineer
            '#F4B400', // Security Engineer
            '#0F9D58', // VR / AR Engineer
            '#FFB6C1', // Professor
            '#4285F4', // Robotics Engineer
            '#4285F4', // UX Designer
            '#4285F4', // DevOps Engineering
            '#4285F4', // IoT Engineer
            '#DB4437', // Bioinformaticist
            '#F4B400', // Cyber security
            '#F4B400', // Digital Forensics Investigator
            '#FFB6C1', // Research
            '#F4B400', // Systems Administrator
        ])
        .xAxis().ticks(6);

    counter
        .dimension(cf)
        .group(all)
        .html({
            some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> students' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
            all: 'All students selected. Please click on any graph to apply filters.'
        });

    dc.renderAll();
});