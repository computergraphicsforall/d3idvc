
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

function addChoroplethLayerOnMap (svgElement, geoData, choroData, color, kColors, idMasterKey, property, centralPoint, scale, svgClass, pathClass, hoverEfect) {

    let colorPalette;

    switch(color) {

        case 1: 
            colorPalette = d3.schemeBlues[kColors];
        break;

        case 2:
            colorPalette = d3.schemeGreens[kColors];
        break;
    }
    
    let dataDomain = d3.extent(choroData, d => extractDomainValues(d, property))
    let colorScale = d3.scaleQuantize().domain(dataDomain).range(colorPalette);
    
    let projection = d3.geoMercator().center(centralPoint).scale(scale);

    let path = d3.geoPath().projection(projection);
    let svg = d3.select(svgElement);
    svg.append('g')
        .attr('class', svgClass)
        .selectAll('path')
        .data(geoData.features).enter()
        .append('path')
        .attr('d', path)
        .attr('class', pathClass)
        .attr('fill', d => colorScale(getColorByChoroplethData(d, choroData, idMasterKey, property)))
        .on('mouseover', addEventMouseOver)
        .on('mouseleave', addEventMouseLeave);

    choroplethLegend(colorScale);

}

function extractDomainValues (element, property) {

    return element.properties[property];
}

function getColorByChoroplethData(element, choroData, idKeyMaster, property) {

    let color;

    for (var i = 0; i < choroData.length; i++) {

        if (element.properties[idKeyMaster] === choroData[i][idKeyMaster]) {
            
            color = choroData[i].properties[property];
            
            break;
        }
    }
    //console.log(color);
    return color;
}

function choroplethLegend(colorScale) {

    let svg = d3.select('svg');
    let labels = colorScale.ticks();

    console.log(labels);

    svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(20, 90)')
    
    let legend = d3.legendColor();
    legend.labels ( d => {return labels[d.i]})
        .shapePadding(4)
        .title('Incidentes')
        .scale(colorScale).cells();

    svg.select('.legend').call(legend);
}

function addEventMouseOver (d) {

    let pol = d3.select(this).attr('class');
    d3.selectAll('.' + pol)
        .transition()
        .duration(200)
        .style('opacity', .7)
        .style('stroke', 'transparent')
    
    d3.select(this)
        .transition()
        .duration(200)
        .style('opacity', 1)
        .style('stroke', 'black')
}

function addEventMouseLeave(d) {

    let pol = d3.select(this).attr('class');
    d3.selectAll('.' + pol)
        .transition()
        .duration(200)
        .style('opacity', 1)
        .style('stroke', 'transparent')
    
    d3.select(this)
        .transition()
        .duration(200)
        .style('stroke', 'transparent')
}