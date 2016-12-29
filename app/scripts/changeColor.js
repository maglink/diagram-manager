var is = require('bpmn-js/lib/util/ModelUtil').is;
var BpmnRenderer = require('bpmn-js/lib/draw/BpmnRenderer');

var originalDrawShape = BpmnRenderer.prototype.drawShape;
BpmnRenderer.prototype.drawShape = function(parentGfx, element) {
    var originalEventHandler = this.handlers['bpmn:Event'];
    this.handlers['bpmn:Event'] = function(parentGfx, element, attrs) {
        if (is(element, 'bpmn:StartEvent')) {
            attrs.fill = 'limegreen';
        }
        if (is(element, 'bpmn:EndEvent')) {
            attrs.fill = 'red';
        }
        return originalEventHandler.call(this, parentGfx, element, attrs);
    };
    return originalDrawShape.call(this, parentGfx, element);
};
