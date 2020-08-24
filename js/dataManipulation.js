/**
 *  Function to read data in csv or json extension that will later be drawn
 * @param {File} path data file path
 * @return {Promise} qwdataRead with the structure of a json or geojson file
 * @error error by console on data loading
 */
function dataLoad (path) {

    if (path.endsWith('.csv') || path.endsWith('.CSV')) {
         
        return d3.csv(path);

    } else if (path.endsWith('.json') || path.endsWith('.JSON')) {
         
        return d3.json(path);
    }  
}


