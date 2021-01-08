# Biodiversity Dashboard

This project looks at belly-button biodiversity. A bar chart breaks down the top-ten bacteria found, and a bubble chart looks at all bacteria found. A demographics table is provided for reference. The dashboard is interactive in that a user can choose a participant ID, the data will update in the table and charts, and the charts provide additional info when hovered.

## Demographics table

The demographics table is built through a stand-alone function, and it loops through the metadata provided in the `.json` file, and an if-statement looks for the matching id and populates the table. The function also calls `buildDashboard();` to update charts.

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

## Bar and Bubble Charts 

Similar to the Demographics Table, the bar and bubble charts are built conditionally. Looping through `allSampleData`, I check for the matching ID and then build the charts with the corresponding data. I thought it would be helpful to have dynamic titles for the charts that update with the Subject ID number. 

        // BUILD DASHBOARD
        function buildDashboard() {

            // GET SAMPLE SELECTION VALUE
            var sampleSelection = d3.select("#selDataset").property("value");

            // LOOP THROUGH ALL SAMPLE DATA
            allSampleData.forEach((subject) => {

                // IF STATEMENT : CHECK FOR ID THAT MATCHES SAMPLE SELECTION, CONTINUE
                if (subject.id === sampleSelection) {

                ...

                }

            });        

        }