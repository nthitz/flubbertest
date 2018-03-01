import * as d3 from 'd3';
import * as flubberNPM from 'flubber';

function init(_flubber, selection) {
  var pathStrings = d3.select(selection).selectAll("path").nodes().map(d => d.getAttribute('d'))

  // Remove all the paths except the first
  d3.select(selection).selectAll("path")
    .filter(function(d, i) { return i; })
    .remove();

  d3.select(selection).select("path")
    .style("display", "block")
    .call(animate);
  console.log(pathStrings);
  function animate(sel) {
    var start = pathStrings.shift(),
        end = pathStrings[0];

    pathStrings.push(start);

    sel
      .datum({ start, end })
      .transition()
      .duration(1500)
      .attrTween("d", function(d){
        return _flubber.interpolate(d.start, d.end)
      })
      .on("end", function() {
        sel.call(animate);
      });
  }
}
document.addEventListener("DOMContentLoaded", function(event) {
  init(flubberNPM, '#npm');
  init(flubber, '#script'); // eslint-disable-line no-undef
})
