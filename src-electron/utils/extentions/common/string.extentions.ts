
String.prototype.isBlank = function () {
  if (this.length === 0) {
    return true;
  }
  if (this.trim().length === 0) {
    return true;
  }
  return false;
};
String.prototype.isNotBlank = function () {
  return !this.isBlank();
};
String.prototype.isNumber = function () {
  return !isNaN(Number(this));
};
String.prototype.isBoolean = function () {
  return this === 'true' || this === 'false';
};
String.prototype.substringAfter = function (delimiter: string) {
  if (delimiter.length === 0) {
    return this.toString();
  }
  const index = this.indexOf(delimiter);
  if (index === -1) {
    return this.toString();
  }
  return this.substring(index + delimiter.length);
};

String.prototype.substringAfterLast = function (delimiter: string) {
  if (delimiter.length === 0) {
    return this.toString();
  }
  const index = this.lastIndexOf(delimiter);
  if (index === -1) {
    return this.toString();
  }
  return this.substring(index + delimiter.length);
}

String.prototype.substringBefore = function (delimiter: string) {
  if (delimiter.length === 0) {
    return '';
  }
  const index = this.indexOf(delimiter);
  if (index === -1) {
    return this.toString();
  }
  return this.substring(0, index);
};

String.prototype.substringBeforeLast = function (delimiter: string) {
  if (delimiter.length === 0) {
    return '';
  }
  const index = this.lastIndexOf(delimiter);
  if (index === -1) {
    return this.toString();
  }
  return this.substring(0, index);
}

String.prototype.onlyNumbers = function () {
  return this.replace(/[^0-9]/g, '');
};

String.prototype.toNumber = function () {
  // replace except number, +, -
  const text: string | String = this.replace(/[^0-9\+\-]/g, '');
  if (text.isNotBlank()) {
    return Number(text);
  }
};
String.prototype.toBoolean = function () {
  return this.isBoolean() ? this === 'true' : undefined;
};
