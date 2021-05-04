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
}

export default Randomizer;
