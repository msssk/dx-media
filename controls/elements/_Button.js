define([
	"dojo/_base/declare",
	"./_Base",
	"dx-alias/string",
	"dx-alias/topic",
	"dx-alias/dom",
	"dx-alias/log"
], function(declare, _Base, string, topic, dom, logger){

	var log = logger('_BT', 0);

	var _groups = {};
	var _widgets = {};
	var addRadio = function(w){
		if(!_groups[w.radioGroup]) _groups[w.radioGroup] = {};
		var name = string.last(w.declaredClass);
		_groups[w.radioGroup][name] = w;
		_widgets[name] = w;
	}
	topic.sub('/dx/button/on/select', function(w){
		if(!_groups) return;
		var g = _groups[w.radioGroup];
		for(var nm in g) g[nm].select(g[nm].id == w.id);
	});


	return declare('dx-media.controls.elements._Button', [_Base], {

		templateString:'<div class="dxButton ${buttonClass}" data-dojo-attach-event="onclick:onClick">${innerTemplate}</div>',
		innerTemplate:'',
		buttonClass:'',		// set by child class
		templateStyle:'', 	// retrieved from Controls
		radioGroup:'',

		postMixInProperties: function(){
			this.innerTemplate = this.innerTemplate.replace('${iconClass}', this.iconClass);
			this.templateString = this.templateString.replace('${innerTemplate}', this.innerTemplate);
		},


		postCreate: function(){
			if(this.radioGroup){
				addRadio(this);
			}
			this.inherited(arguments);
		},

		startup: function(){
			var p = this.getParent();
			if(p) this.templateStyle = p.templateStyle;
			this.inherited(arguments);
		},

		select: function(/*Boolean?*/selected){
			if(selected === undefined) selected = true;
			dom.css(this.domNode, 'dxSelected', selected);
		},

		onClick: function(){
			// overwrite or connect to me!
		}
	});

});
