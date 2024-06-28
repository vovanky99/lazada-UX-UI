class LocalStorageService {
  ls = window.localStorage;
  setItem(key, value) {
    const Value = JSON.stringify(value);
    this.ls.setItem(key, Value);
    return true;
  }
  getItem(key) {
    const value = this.ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
}

export default new LocalStorageService();
