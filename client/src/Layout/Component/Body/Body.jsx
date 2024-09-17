class body {
  bd = document.querySelector('body');
  overflow(type) {
    if (type) {
      this.bd.style.overflow = type;
    }
  }
}

export default new body();
