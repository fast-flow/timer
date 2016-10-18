// https://github.com/maximobelen/class-stuff
// @1.0.1
var regularExp1 = '(\\s|^)',
regularExp2 = '(\\s|$)';

function ClassStuff () {
  'use strict';
  if (!(this instanceof ClassStuff)) {
    return new ClassStuff();
  }
}

ClassStuff.prototype.addClass = function (element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    if (!hasClass(element, className)) {
      element.className += " " + className;
    }
  }
};

ClassStuff.prototype.removeClass = function (element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    if (hasClass(element, className)) {
      var regClass = new RegExp(regularExp1 + className + regularExp2);
      element.className = element.className.replace(regClass, ' ');
    }
  }
};

ClassStuff.prototype.hasClass = function (element, className) {
  if (element.classList) {
    return element.classList.contains(className);
  } else {
    return !!element.className.match(new RegExp(regularExp1 + className + regularExp2));
  }
};

module.exports = ClassStuff();
