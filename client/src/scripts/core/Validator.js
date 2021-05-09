import typeis from 'typeis.js';

/**
 * Validator
 *
 * Utility class to validate the configuration schema
 * of any configurable class, which needs a config Object
 * as a constructor parameter.
 *
 * @param {*} schema Object - configuration schema
 *
 * @method validate(config)
 */
class Validator {
  #entries;

  constructor(schema) {
    this.#entries = Object.keys(schema).map((entry) => {
      return {
        key: entry,
        check: (value) => {
          let typeName = schema[entry].type.name;
          if (typeName === 'Object') typeName = 'PlainObject';

          if (!typeis[`is${typeName}`](value))
            throw new Error(`${entry} must be of type ${typeName}`);
          if (schema[entry].validate) schema[entry].validate(value);
          return true;
        },
      };
    });
  }

  validate(config = {}) {
    if (!typeis.isPlainObject(config))
      throw new Error(`"config" is a plain Object!`);

    this.#entries.forEach((entry) => {
      if (!config.hasOwnProperty(entry.key))
        throw new Error(`"${entry.key}" parameter is missing!`);
      const target = config[entry.key];
      entry.check(target);
    });
    return true;
  }
}

export default Validator;
