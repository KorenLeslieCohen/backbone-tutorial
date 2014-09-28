// defines the namespace
window.Tutorial = {  // top level namespace is declared on the window
  Models: {},
  Collections: {},
  Views: {}
};

// Animal model
Tutorial.Models.Animal = Backbone.Model.extend({
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

// Animal view
Tutorial.Views.Animal = Backbone.View.extend({
  tagName: 'li', // defaults to div if not specified
  className: 'animal', // optional, can also set multiple like 'animal dog'
  id: 'dogs', // also optional
  events: {
    'click':         'alertTest',
    'click .edit':   'editAnimal',
    'click .delete': 'destroyAnimal'
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

// Animal collection
Tutorial.Collections.Animal = Backbone.Collection.extend({
  model: Tutorial.Models.Animal
});

// adding individual models to collection
var chihuahua = new Tutorial.Models.Animal({name: 'Sugar', color: 'black', sound: 'woof'});
var chihuahuaView = new Tutorial.Views.Animal({model: chihuahua});
var animalCollection = new Tutorial.Collections.Animal(); // only need to create the collection once
animalCollection.add(chihuahua);

var pug = new Tutorial.Models.Animal({name: 'Gizmo', color: 'tan', sound: 'woof'});
var pugView = new Tutorial.Views.Animal({model: pug});
animalCollection.add(pug); // can now directly add to animalCollection

// adding multiple models to collection (this will override the above Tutorial.Collections.Animal)
var animalCollection = new Tutorial.Collections.Animal([
  {
    name: 'Sugar',
    color: 'black',
    sound: 'woof'
  },
  {
    name: 'Gizmo',
    color: 'tan',
    sound: 'woof'
  },
  {
    name: 'Biscuit',
    color: 'brown',
    sound: 'arf'
  }
]);

// View for all animals (collection)
Tutorial.Views.Animals = Backbone.View.extend({ // plural to distinguish as the view for the collection
  tagName: 'ul',
  initialize: function(){
    this.collection;
  },
  render: function(){
    this.collection.each(function(Animal){
      var animalView = new Tutorial.Views.Animal({model: Animal});
      $(document.body).append(animalView.el);
    });
  }
});

// creates view for collection and renders collection
var animalsView = new Tutorial.Views.Animals({collection: animalCollection});
animalsView.render();