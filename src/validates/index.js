import isPresent from '../shared/isPresent';
import I18n from '../services/I18n';

import presence from './presence';
import minLength from './minLength';
import maxLength from './maxLength';
import equals from './equals';
import serverErrors from './serverErrors';

export const VALIDATORS = {
  presence,
  minLength,
  maxLength,
  equals,
}

export class Validator {
  constructor(target, errors = {}) {
    this.$target = target;
    this.$errors = errors;
    this.$validations = [];

    Object.keys(VALIDATORS).forEach(key => {
      this[key] = (...args) => this.$validations.push([key, ...args]);
    });
  }

  check(field, validations) {
    validations.forEach((line) => {
      if (!Array.isArray(line)) line = [line];
      this.$validations.push([line[0], field, ...line.slice(1)]);
    });
  }

  applyServerError(err) {
    serverErrors(this.$target, this.$errors)(err);
    return this.messages;
  }

  get invalid() {
    return !this.valid;
  }

  get valid() {
    this.validate();
    return !isPresent(this.$errors);
  }

  get errors() {
    return { ...this.$errors };
  }

  get messages() {
    const data = {};
    const all = this.$errors;
    Object.keys(all).forEach(field => {
      const msg = this.errorMessage(field, all[field]);
      if (msg) data[field] = msg;
    });
    return data;
  }

  errorMessage(key, errors = []) {
    if (Array.isArray(errors)) errors = errors[0];
    if (!errors) return;
    return (
      I18n.t(['errors', key, errors]) ||
      I18n.t(['errors', key, 'base']) ||
      I18n.t(['errors', errors]) ||
      I18n.t(['errors', 'base']) ||
      'invalid'
    );
  }

  validate() {
    this.$errors = {};
    for (let i = 0; i < this.$validations.length; i++) {
      const [key, ...args] = this.$validations[i];
      VALIDATORS[key](this.$target, this.$errors)(...args);
    }
  }
}

const validate = (target, errors = {}) => {
  return new Validator(target, errors);
}

export default validate;
