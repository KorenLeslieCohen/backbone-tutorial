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

// dog = new Animal();
// dog.set('name','a',{validate: true});

// dog.on('error', function (model, error) {
//     console.log(error);
// });

var AnimalView = Backbone.View.extend({
  tagName: 'li',
  className: 'animal',
  id: 'dogs',
  events: {
    'click .icon':          'open',
    'click .button.edit':   'openEditDialog',
    'click .button.delete': 'destroy'
  },
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
  }
});
