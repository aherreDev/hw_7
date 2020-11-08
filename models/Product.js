class Product{
  constructor(code, name, description, amount, price){
    let canContinue = this._productParams(code, name, description, amount, price)
    if(!canContinue) throw "Invalid product params"
    this.code = code
    this.name = name
    this.description = description
    this.amount = amount
    this.price = price
    this.totalPrice = price * amount
    this.siguiente = null
  }
  _productParams(code, name, description, amount, price){
    return code && name && description && amount && price
  }
}
export default Product
