var $ = require('jquery');
var Modeler = require('bpmn-js/lib/Modeler');
var _ = require('lodash');

var modeler = new Modeler({container: '#canvas'});

var newDiagram;

$.get("https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/modeler/resources/newDiagram.bpmn", function(data){
    newDiagram = data;
    createDiagram();
});

function createDiagram() {
    openDiagram(newDiagram);
}

function openDiagram(data) {
    modeler.importXML(data, function (err) {
        if (!err) {
            modeler.get('canvas').zoom('fit-viewport');
        } else {
            alert('something went wrong:', err);
        }
    });
}

function saveDiagram(done) {
    modeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml);
    });
}

$('#create').click(function(){
    createDiagram();
    return false;
});

if (!window.FileReader) {
    alert('The File APIs are not fully supported by your browser.');
} else {
    $('#upload').change(function(){
        var file = $('#upload').get(0).files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function () {
                openDiagram(reader.result);
            };
            reader.readAsText(file);
        }
    });
}

var exportArtifacts = _.debounce(function() {
    saveDiagram(function(err, xml) {
        if(err) {
            return;
        }
        var encodedData = encodeURIComponent(xml);
        $('#download').attr({
            'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
            'download': 'diagram.bpmn'
        });
    });
}, 500);

modeler.on('commandStack.changed', exportArtifacts);