// Capture Sample Selection ID

// Go through JSON Data
d3.json("/data/samples.json").then(function(samples) {
    // console.log(samples); 
    var sampleIDs = samples.samples.map(person => person.id); 
    var otuIDs = samples.samples.map(person => person.otu_ids); 

    for (var i = 0; i < sampleIDs.length; i++) {
        d3.select("#selDataset").append("option").text(sampleIDs[i])
    }

    buildDashboard();

    function buildDashboard() {

        var summaryTable = d3.select(".panel-body")
        summaryTable.html("")

        var sampleSelection = d3.select("#selDataset").property("value");
        
        var sampleMetadata = samples.metadata.map(person => person);

        var sampleData = samples.samples.map(data => data)
        console.log(sampleData);

        for (var i = 0; i < sampleIDs.length; i++) {

            if (sampleSelection === sampleIDs[i]) {
                summaryTable.append("p").append('strong').text(`ID: ${sampleSelection}`);
                summaryTable.append('p').append('strong').text(`Ethnicity: ${sampleMetadata[i].ethnicity}`);
                summaryTable.append('p').append('strong').text(`Gender: ${sampleMetadata[i].gender}`);
                summaryTable.append('p').append('strong').text(`Age: ${sampleMetadata[i].age}`);
                summaryTable.append('p').append('strong').text(`Location: ${sampleMetadata[i].location}`);
                summaryTable.append('p').append('strong').text(`BB Type: ${sampleMetadata[i].bbtype}`);
                summaryTable.append('p').append('strong').text(`wfreq: ${sampleMetadata[i].wfreq}`);

                console.log(sampleData[i].id); 

                var trace1 = {
                    x: sampleData[i].otu_ids,
                    y: sampleData[i].sample_values,
                    type: 'bar'
                }
            }
        }

        // var trace1 = {
        //     x: sampleData.sample_values, 
        //     y: sampleData.otu_ids,
        //     type: 'bar'
        // }

        // Create the data array for the plot
        var data = [trace1];

        // Define the plot layout
        var layout = {
        title: "Square Root of Cancer Survival by Organ",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Count" }
        };

        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bar", data, layout);

        
    }

    d3.select("#selDataset").on("change", buildDashboard); 

});