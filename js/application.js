// Animal model
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

// Animal view
var AnimalView = Backbone.View.extend({
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
var AnimalCollection = Backbone.Collection.extend({
  model: Animal
});

// adding individual models to collection
var chihuahua = new Animal({name: 'Sugar', color: 'black', sound: 'woof'});
var chihuahuaView = new AnimalView({model: chihuahua});
var animalCollection = new AnimalCollection(); // only need to create the collection once
animalCollection.add(chihuahua);

var pug = new Animal({name: 'Gizmo', color: 'tan', sound: 'woof'});
var pugView = new AnimalView({model: pug});
animalCollection.add(pug); // can now directly add to animalCollection

// adding multiple models to collection (this will override the above AnimalCollection)
var animalCollection = new AnimalCollection([
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
var AnimalsView = Backbone.View.extend({ // calling this AnimalsView to distinguish as the view for the collection
  tagName: 'ul',
  initialize: function(){
    this.collection;
  },
  render: function(){
    this.collection.each(function(Animal){
      var animalView = new AnimalView({model: Animal});
      $(document.body).append(animalView.el);
    });
  }
});

// creates view for collection and renders collection
var animalsView = new AnimalsView({collection: animalCollection});
animalsView.render();



