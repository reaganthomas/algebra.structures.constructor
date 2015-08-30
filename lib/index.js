(function() {
  'use strict';

  /**
    Constructor

    Constructs a structure based on the supplied constructor function.
    An Error is thrown should no constructor function be supplied.
  **/
  var Constructor = function(constructorFunction) {
    if(!constructorFunction) throw new Error('Constructor function argument must be non-null function');

    var Structure = function() {
      if(!(this instanceof Structure)) {
        var instance = new Structure();
        constructorFunction.apply(instance, arguments);
        return instance;
      }
      constructorFunction.apply(this, arguments);
    };

    return Structure;
  };

  /**
    makeType

    Constructs a structure based on the supplied constructor function.
    If no constructor function is passed the default for a simple container is used.
  **/
  var makeType = function(constructorFunction) {
    constructorFunction = constructorFunction ||
      function defaultConstructor(value) { this.value = value; };

    return Constructor(constructorFunction);
  };

  /**
    subClass

    Constructs a structure "subclassed" from a "super class".
    Note: the constructor function passed in should match the
    constructor of the superclass.
  **/
  var subClass = function(Superclass, constructorFunction) {
    var instance = makeType(constructorFunction);
    instance.prototype = new Superclass();
    instance.prototype.constructor = constructorFunction;

    return instance;
  };

  module.exports = {
    Constructor: Constructor,
    makeType:    makeType,
    subClass:    subClass
  };
})();
