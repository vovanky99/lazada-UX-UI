class SessionStorageService {
  ls = window.sessionStorage;
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
  removeItem(key) {
    this.ls.removeItem(key);
    return true;
  }
}

export default new SessionStorageService();
