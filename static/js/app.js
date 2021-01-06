
// Go through JSON Data
d3.json("/data/samples.json").then(function(samples) {
    // console.log(samples); 
    var allSampleData = samples.samples.map(person => person);
    
    var sampleMetadata = samples.metadata.map(item => item); 
    console.log(allSampleData);

    for (var i = 0; i < allSampleData.length; i++) {
        d3.select("#selDataset").append("option").text(allSampleData[i].id)
    }

    buildDashboard();

    function buildDashboard() {

        var summaryTable = d3.select(".panel-body")
        summaryTable.html("")

        var sampleSelection = d3.select("#selDataset").property("value");
        
        var sampleMetadata = samples.metadata.map(person => person);

        for (var i = 0; i < allSampleData.length; i++) {

            if (sampleSelection === allSampleData[i].id) {
                summaryTable.append("p").append('strong').text(`ID: ${sampleSelection}`);
                summaryTable.append('p').append('strong').text(`Ethnicity: ${sampleMetadata[i].ethnicity}`);
                summaryTable.append('p').append('strong').text(`Gender: ${sampleMetadata[i].gender}`);
                summaryTable.append('p').append('strong').text(`Age: ${sampleMetadata[i].age}`);
                summaryTable.append('p').append('strong').text(`Location: ${sampleMetadata[i].location}`);
                summaryTable.append('p').append('strong').text(`BB Type: ${sampleMetadata[i].bbtype}`);
                summaryTable.append('p').append('strong').text(`wfreq: ${sampleMetadata[i].wfreq}`); 
                
                var sampleValues = allSampleData[i].sample_values.slice(0, 10);
                var reversedSampleValues = sampleValues.reverse(); 
                var sampleOTUids = allSampleData[i].otu_ids.slice(0, 10);
                var reversedOTUs = sampleOTUids.reverse();
                var reverseOTUsString = reversedOTUs.toString();
                
                var otuLabels = []; 

                reversedOTUs.forEach((label) => otuLabels.push(`OTU ${label}`)) 

                var trace1 = {
                    type: 'bar',
                    x: sampleValues,
                    y: otuLabels,
                    orientation: 'h'
                  };
            }
        }

        // Create the data array for the plot
        var data = [trace1]; 

        // Define the plot layout
        var layout = {
            title: `Subject ${sampleSelection} Top Ten OTU Counts`, 
            xaxis: {
                showticklabels: true,
                tickmode: 'auto'
            }
        }

        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bar", data, layout);

        
    }

    d3.select("#selDataset").on("change", buildDashboard); 

});