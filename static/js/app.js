
// Go through JSON Data
d3.json("/data/samples.json").then(function(samples) {
    // console.log(samples); 
    var allSampleData = samples.samples.map(person => person);
    var sampleMetadata = samples.metadata.map(item => item); 

    for (var i = 0; i < allSampleData.length; i++) {
        d3.select("#selDataset").append("option").text(allSampleData[i].id)
    }

    d3.select("#selDataset").on("change", buildDashboard);
    d3.select("#selDataset").on("change", buildDemographics); 


    buildDashboard();

    buildDemographics(); 

    function buildDashboard() {

        var sampleSelection = d3.select("#selDataset").property("value");

        for (var i = 0; i < allSampleData.length; i++) {

            if (sampleSelection === allSampleData[i].id) {
                               
                var sampleValues = allSampleData[i].sample_values.slice(0, 10);
                var reversedSampleValues = sampleValues.reverse(); 
                var sampleOTUids = allSampleData[i].otu_ids.slice(0, 10);
                var reversedOTUs = sampleOTUids.reverse();
                
                var otuLabels = [];
                
                var hoverOTUlables = [];

                allSampleData[i].otu_labels.forEach((name) => hoverOTUlables.push(name))

                reversedOTUs.forEach((label) => otuLabels.push(`OTU ${label}`)) 

                var barTrace = {
                    type: 'bar',
                    x: sampleValues,
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

                var bubbleTrace = {

                    x: allSampleData[i].otu_ids,
                    y: allSampleData[i].sample_values,
                    text: allSampleData[i].otu_labels,
                    mode: 'markers',
                    marker: {
                      size: allSampleData[i].sample_values,
                      color: sampleOTUids,
                      opacity: 0.75, 
                      sizeref: 0.5,
                      sizemode: 'area'
                    }
                  };

            }
        }


        // Create the data array for the plot
        var barData = [barTrace]; 

        // Define the plot layout
        var barLayout = {
            title: `Subject ${sampleSelection} Top Ten OTU Counts`, 
            xaxis: {
                showticklabels: true,
                tickmode: 'auto'
            }
        }

        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bar", barData, barLayout);

        // Create the data array for the plot
        var bubbleData = [bubbleTrace]; 

        // Define the plot layout
        var bubbleLayout = {
            title: 'Bubble Chart Size Scaling',
            showlegend: false,
            height: 500,
            width: 900
          };
          
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // Plot the chart to a div tag with id "plot"
        Plotly.newPlot("bar", barData, barLayout);

    }

    function buildDemographics() {
        var sampleSelection = d3.select("#selDataset").property("value");
        var summaryTable = d3.select(".panel-body")
        
        summaryTable.html("")
    
        sampleMetadata.forEach((subject) => { 

            if (subject.id == sampleSelection) {

                console.log(subject.id, sampleSelection)
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