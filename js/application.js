// defines the Animal model
var Animal = Backbone.Model.extend({
  defaults: {
    name: 'Fido',
    color: 'black',
    sound: 'woof'
  },
  validate: function(attrs, options){
    if ( !attrs.name ){
        alert('Your animal must have a name!');
    }
    if ( attrs.name.length < 2 ){
        alert('Your animal\'s name must have more than one letter!');
    }
  },
  sleep: function(){
    alert(this.get('name') + ' is sleeping.');
  }
});

// defines an Animal collection
var AnimalCollection = Backbone.Collection.extend({
 model: Animal
});

// defines the Animal view
var AnimalView = Backbone.View.extend({
  tagName: 'li', // defaults to div if not specified
  className: 'animal', // optional, can also set multiple like 'animal dog'
  id: 'dogs', // also optional
  events: {
    'click .icon':          'open',
    'click .button.edit':   'openEditDialog',
    'click .button.delete': 'destroy'
  },
  // newTemplate: _.template('<%= name %> is <%= color %> and says <%= sound %>'), // inline template
  newTemplate: _.template($('#dogTemplate').html()), // external template
  initialize: function() {
    this.render(); // render is an optional function that defines the logic for rendering a template
  },
  render: function() {
    // the below line represents the code prior to adding the template
    // this.$el.html(this.model.get('name') + ' is ' + this.model.get('color') + ' and says ' + this.model.get('sound'));
    this.$el.html(this.newTemplate(this.model.toJSON())); // calls the template
  }
});
