var assert = require('assert');

var utils = require('../lib');
var Constructor = utils.Constructor;
var makeType = utils.makeType;
var subClass = utils.subClass;

var AlphaNumContainer = Constructor(function(char, num) {
  this.char = char;
  this.num = num;
});

var AlphaNumType = makeType(function(char, num) {
  this.char = char;
  this.num = num;
});

var AlphaNumSubtype = subClass(AlphaNumType, function(char, num) {
  this.char = char;
  this.num = num;
});

var GenericType = makeType();
var GenericSubType = subClass(GenericType);

describe('Constructor', function() {
  it('should create a new structure using a given constructor function', function() {
    var a1 = new AlphaNumContainer('a', 1);
    assert.equal(a1.char, 'a');
    assert.equal(a1.num, 1);
  });

  it('should throw when trying to create a new structure without a constructor function', function() {
    function callConstructor() { Constructor(); }
    assert.throws(callConstructor, /Constructor function argument must be non-null function/);
  });
});

describe('makeType', function() {
  it('should create a new type using a given constructor function', function() {
    var a1 = new AlphaNumType('a', 1);
    assert.equal(a1.char, 'a');
    assert.equal(a1.num, 1);
  });

  it('should create a new type using a default constructor function', function() {
    var generic = new GenericType('a');
    assert.equal(generic.value, 'a');
  });
});

describe('subClass', function() {
  it('should create a subclass', function() {
    var genericSub = new GenericSubType('a');
    assert.equal(genericSub.value, 'a');
    assert.equal(genericSub instanceof GenericType, true);
    assert.equal(genericSub instanceof GenericSubType, true);
  });

  it('should create a subclass of non-default constructor superclass', function() {
    var nonGenericSub = new AlphaNumSubtype('a', 1);
    assert.equal(nonGenericSub.char, 'a');
    assert.equal(nonGenericSub.num, 1);
    assert.equal(nonGenericSub instanceof AlphaNumType, true);
    assert.equal(nonGenericSub instanceof AlphaNumSubtype, true);
  });

  it('should create a subclass that improperly implements its superclass', function() {
    var BadSubType = subClass(GenericType, function(a) { this.a = a; });
    var badSub = new BadSubType('a');
    assert.equal(badSub.value, undefined);
    assert.equal(badSub.a, 'a');
    assert.equal(badSub instanceof GenericType, true);
    assert.equal(badSub instanceof BadSubType, true);
  });
});
