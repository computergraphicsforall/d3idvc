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

function dataMappingGeoJson (data, properties, idMasterKey) {

    let dataMapping;

    try { 

        if (data.features.length > 0) {
        
            dataMapping = data.features.map(feature  => {

                let doc = {};
                doc[idMasterKey] = feature.properties[idMasterKey];
                
                let prop = {};
                if (properties.length == 0) {

                    let keysProperties = Object.keys(feature.properties);
                    keysProperties.splice(keysProperties.indexOf(idMasterKey), 1);

                    for (let p of keysProperties){
                        prop[p] = feature.properties[p];
                    }
                        
                } else {

                    let keysProperties = properties.splice(properties.indexOf(idMasterKey), 1);
                    for (let p of keysProperties){
                        prop[p] = feature.properties[p];
                    }
                }
                
                doc['properties'] = prop;
                return doc;
            });
            //console.log(dataMapping);       
            return dataMapping;

        } else {

            console.log('No data to mapping');
            
        }
        
    } catch (error) {

        console.log('Module: dataManipulation.js -> Function: dataMappingGeoJson. Error: ' + error);
        
    }
    
    
    
    

}

