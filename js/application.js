var Animal = Backbone.Model.extend({
  defaults: {
    name: 'Fido',
    color: 'black',
    sound: 'woof'
  },
  sleep: function(){
    alert(this.get('name') + ' is sleeping.');
  }
});