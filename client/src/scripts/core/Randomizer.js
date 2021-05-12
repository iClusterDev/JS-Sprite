/**
 * Randomizer (static)
 *
 * Utility class to perform basic
 * randomizations.
 *
 * @method id()
 */
class Randomizer {
  static id() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  static integerBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export default Randomizer;
