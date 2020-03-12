import seedrandom from "seedrandom";

/**
 * Round a value to a given precision
 * @param {*} value - value to round
 * @param {*} precision - precision required
 * @return {Number} - rounded value
 */
const round = (value, precision = 1) => {
  return Math.round(value / precision) * precision;
};

/**
 * Helper class to share a same PRNG across each instance request
 */
class RandomHelper {
  constructor() {}

  /**
   * Get a random Integer between given values
   * @param {Number} start - number to start from, inclusive, if end is ommited then end become start and start become 0
   * @param {Number} end - number to end to, exclusive
   * @return {Number} - a random integer fitting boundaries
   */
  randomInt(start, end) {
    if (!this.hasPrng()) {
      return;
    }

    if (typeof end === "undefined") {
      end = start;
      start = 0;
    }

    return start + Math.floor(this._prng() * (end - start));
  }

  /**
   * Pick a random element out of an array
   * @param {Array} array - array to pick from
   * @return {Any} - An element of given array
   */
  randomArray(array = []) {
    if (!this.hasPrng()) {
      return;
    }

    return array[Math.floor(this._prng() * array.length)];
  }

  /**
   * Make sure that instance of RandomHelper has its PRNG inited
   */
  hasPrng() {
    if (typeof this._prng === "undefined") {
      console.error(
        "Instance of RandomHelper does not have it's PRNG defined yet, use this.initPrng()"
      );
      return false;
    } else {
      return true;
    }
  }

  /**
   * Init instance PRNG with given seed or current DOM state + Timestamp
   * @param {Any} seed - requested seed
   */
  initPrng(seed) {
    if (seed) {
      this._prng = new seedrandom(seed);
    } else {
      this._prng = new seedrandom();
    }
  }
}

export default {
  round,
  RandomHelper
};
