
// FETCH JSON
d3.json("./data/samples.json").then(function(samples) {

    // GET ALL SAMPLE DATA AND METADATA
    var allSampleData = samples.samples.map(person => person);
    var sampleMetadata = samples.metadata.map(item => item); 

    // SAMPLE SELECTIONS - APPEND IDS AS OPTIONS
    allSampleData.forEach((selection) => d3.select("#selDataset").append("option").text(selection.id))

    // EVENT - CHANGE CHARTS AND DEMOGRAPHICS TABLE
    d3.select("#selDataset").on("change", buildDashboard);
    d3.select("#selDataset").on("change", buildDemographics); 

    // INITIALIZE DASHBOARD AND DEMOGRAPHICS TABLE
    buildDashboard();
    buildDemographics();

    // BUILD DASHBOARD
    function buildDashboard() {

        // GET SAMPLE SELECTION VALUE
        var sampleSelection = d3.select("#selDataset").property("value");

        // LOOP THROUGH ALL SAMPLE DATA
        allSampleData.forEach((subject) => {

            // IF STATEMENT : CHECK FOR ID THAT MATCHES SAMPLE SELECTION, CONTINUE
            if (subject.id === sampleSelection) {

                // GET FIRST TEN SAMPLE VALUES AND REVERSE THEIR ORDER - BAR CHART
                var sampleValues = subject.sample_values.slice(0, 10);
                var reversedSampleValues = sampleValues.reverse();

                // GET FIRST TEN SAMPLE OTU IDS AND REVERSE THEIR ORDER - BAR CHART
                var sampleOTUids = subject.otu_ids.slice(0, 10);
                var reversedSamples = sampleOTUids.reverse(); 

                // CREATE EMPTY ARRAYS FOR OTU LABELS AND HOVER INFO - BAR CHART
                var otuLabels = [];
                var hoverOTUlables = [];

                // PUSH OTU LABELS AND IDS AS STRINGS TO POPULATE Y-AXIS
                subject.otu_labels.forEach((name) => hoverOTUlables.push(name))
                reversedSamples.forEach((label) => otuLabels.push(`OTU ${label}`))

                // BAR CHART TRACE
                var barTrace = {
                    type: 'bar',
                    x: reversedSampleValues,
                    y: otuLabels,
                    orientation: 'h',
                    opacity: 0.5,
                    text: hoverOTUlables, 
                    marker: {
                        line: {
                            color: 'rgb(8,48,107)',
                            width: 1.5 
                        }
                    }
                };

                // BUBBLE CHART TRACE
                var bubbleTrace = {

                    x: subject.otu_ids,
                    y: subject.sample_values,
                    text: subject.otu_labels,
                    mode: 'markers',
                    marker: {
                      size: subject.sample_values,
                      color: sampleOTUids,
                      opacity: 0.75, 
                      sizeref: 0.5,
                      sizemode: 'area'
                    }
                };

                // BAR CHART DATA AND LAYOUT
                var barData = [barTrace]; 
                var barLayout = {
                    title: `Subject ${sampleSelection} Top Ten OTU Counts`, 
                    xaxis: {
                        showticklabels: true,
                        tickmode: 'auto'
                    }
                }

                // PLOT BAR CHART
                Plotly.newPlot("bar", barData, barLayout);

                // BUBBLE CHART DATA AND LAYOUT
                var bubbleData = [bubbleTrace]; 
                var bubbleLayout = {
                    title: `Subject ${subject.id} Culture Counts by OTU ID`,
                    showlegend: false,
                    height: 500,
                    width: 900
                };
                
                // PLOT BUBBLE CHART
                Plotly.newPlot('bubble', bubbleData, bubbleLayout);

            }

        });        

    }

    // BUILD DEMOGRAPHICS TABLE 
    function buildDemographics() {

        // SET VARIABLES FOR SAMPLE SELECTION AND SUMMARY TABLE
        var sampleSelection = d3.select("#selDataset").property("value");
        var summaryTable = d3.select(".panel-body")
        
        // CLEAR TABLE HTML
        summaryTable.html("")

        // CALL TO REBUILD DASHBOARD
        buildDashboard();

        // LOOP THROUGH METADATA AND APPEND INFORMATION TO DEMOGRAPHICS TABLE
        sampleMetadata.forEach((subject) => { 

            if (subject.id == sampleSelection) {

                summaryTable.append("p").append('strong').text(`ID: ${subject.id}`);
                summaryTable.append('p').append('strong').text(`Ethnicity: ${subject.ethnicity}`);
                summaryTable.append('p').append('strong').text(`Gender: ${subject.gender}`);
                summaryTable.append('p').append('strong').text(`Age: ${subject.age}`);
                summaryTable.append('p').append('strong').text(`Location: ${subject.location}`);
                summaryTable.append('p').append('strong').text(`BB Type: ${subject.bbtype}`);
                summaryTable.append('p').append('strong').text(`wfreq: ${subject.wfreq}`);
            }
        }); 
    }; 
});