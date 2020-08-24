
function createSVGViewbox(containerId, idSVGViewbox, aspectRatio, minX, minY, width, height) {

    try {

        let svg = d3.select(containerId)
            .append('svg')
            .attr('preserveAspectRatio', aspectRatio)
            .attr("viewBox", "" + minX + " " + minY + " " + (width) + " " + (height))
            .attr('id', idSVGViewbox);
        return svg;

        
    } catch (error) {

        console.log('Module: elements.js -> Function: createSVGViewbox. Error: ' + error );
        return null;        
    }  
}

function createPolygonMapMercatorProj(svgElement, data, centralPoint, scale, styleClass) {

    /**
     * if you want know all projections go to:
     * https://d3-wiki.readthedocs.io/zh_CN/master/Geo-Projections/
     **/

     try {

        let projection = d3.geoMercator().center(centralPoint).scale(scale);
        let path = d3.geoPath().projection(projection);
    
        svgElement.selectAll('path')
            .data(data.features).enter()
            .append('path')
            .attr('d', d => path(d))
            .attr('class', styleClass);
         
     } catch (error) {

        console.log('Module: elements.js -> Function: createPolygonMapMercatorProj. Error: ' + error );
         
     }
    
}

function createWorlMapMercatorProj(svgElement, data, styleClass) {

    /**
     * if you want know all projections go to:
     * https://d3-wiki.readthedocs.io/zh_CN/master/Geo-Projections/
     **/

     try {

        let projection = d3.geoMercator();
        let path = d3.geoPath().projection(projection);

        svgElement.selectAll('path')
            .data(data.features).enter()
            .append('path')
            .attr('d', d => path(d))
            .attr('class', styleClass);

     } catch (error) {

        console.log('Module: elements.js -> Function: createWorlMapMercatorProj. Error: ' + error );
         
     }
    
}

