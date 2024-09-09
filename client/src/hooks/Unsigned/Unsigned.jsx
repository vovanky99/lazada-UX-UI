class Unsigned {
  toUnsignedZero(value) {
    return value < 0 || value === 'NaN' ? 0 : value;
  }
  toUnsignedCustom(value, param1, isMoreThan = true) {
    if (isMoreThan) {
      return value > param1 ? param1 : value;
    } else {
      return value < param1 ? param1 : value;
    }
  }
}

export default new Unsigned();
