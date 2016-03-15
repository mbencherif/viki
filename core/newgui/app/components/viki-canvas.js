import Ember from 'ember';

export default Ember.Component.extend({
    canvasState: Ember.inject.service(),
    jsplumb: Ember.inject.service(),
    moduleBag: Ember.inject.service(),

    dragOver(event) {
      event.preventDefault();
    },

    drop(event) {
        event.preventDefault();
        let moduleId = event.dataTransfer.getData("id");
        var module = this.get('moduleBag').getModuleById(moduleId);
        this.get('canvasState').addModuleToCanvas(module, event.originalEvent.pageX, event.originalEvent.pageY);
        this.rerender();
    },

    didRender() {
        let jsPlumb = this.get('jsplumb');
        this.get('canvasState').get('modules_in_canvas').forEach(function(module) {
            jsPlumb.jsPlumbifyModule(module);
        });
    }

});