class CardList {
  constructor(container) {
    this.container = container;
    
    this._callBack = null;

    this.addCard = this.addCard.bind(this);
    this.render = this.render.bind(this);
  }
  
  handleCard(fn) {
    this._callBack = fn;
  }
  
  _initialCallBack(cardData) {
    return typeof this._callBack === "function" && this._callBack(cardData);
  }
  
  addCard(cardData) {
    this.container.appendChild(this._initialCallBack(cardData));
  }
  
  render(array) {
    array.forEach((item) => {
      this.addCard(item);
    });
  }
}