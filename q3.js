var _ = require('lodash');

var curriedSum = _.curry(function (a, b) {
    return a + b;
});

_.add = curriedSum;

console.log(curriedSum(10)(20));
console.log(_.add(10)(20));