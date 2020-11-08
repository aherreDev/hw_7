import Product from './Product.js'

class Inventory{
  constructor(){
    this.totalProductos = 0
    this.inicio = null
  }
    /********************/
   /* HOMEWORK METHODS */
  /********************/

  newAddProduct(productParams){
    this.totalProductos++
    let newProduct = new Product(...productParams);
    if(!this.inicio){
      this.inicio = newProduct
      return [newProduct]
    }
    let aux = this.inicio
    // ? This array is just for UI
    let productsArray = [];
    while(aux){
      if(aux.siguiente){
        // ? This push is just for the UI
        productsArray.push(aux)
        aux = aux.siguiente
      }else{
        productsArray.push(aux, newProduct)
        aux.siguiente = newProduct
        aux = null
      }
    }
    return productsArray
  }

  newAddProductBegining(productParams){
    this.totalProductos++
    let newProduct = new Product(...productParams)
    if(!this.inicio){
      this.inicio = newProduct
      return [newProduct]
    }
    newProduct.siguiente = this.inicio
    this.inicio = newProduct
    return this._getProductsList()
  }

  newDeleteProduct(productCode){
    let deletedProduct
    if(this.inicio.code === productCode) {
      deletedProduct = this.inicio
      this.inicio = null
      return [[], deletedProduct]
    }
    let aux = this.inicio
    let finishSearch = false
    while(!finishSearch){
      if(aux.siguiente){
        if(aux.siguiente.code === productCode){
          this.totalProductos--
          deletedProduct = aux.siguiente
          aux.siguiente = aux.siguiente.siguiente
          finishSearch = true
        }else{
          aux = aux.siguiente
        }
      }else{
        finishSearch = true
        deletedProduct = null
      }
    }
    return [this._getProductsList(), deletedProduct]
  }
  newDeleteProductBegining(){
    this.totalProductos--
    let deletedProduct
    if(!this.inicio){
      deletedProduct = null
    }else if(!this.inicio.siguiente){
      deletedProduct = this.inicio
      this.inicio = null
    }else{
      deletedProduct = this.inicio
      this.inicio = this.inicio.siguiente
    }

    return [this._getProductsList(), deletedProduct]
  }

  newSearchProduct(productCode){
    let targetProduct
    if(this.inicio.code === productCode) {
      targetProduct = this.inicio
      return [targetProduct]
    }
    let aux = this.inicio
    let finishSearch = false
    while(!finishSearch){
      if(aux.siguiente){
        if(aux.siguiente.code === productCode){
          targetProduct = aux.siguiente
          finishSearch = true
        }else{
          aux = aux.siguiente
        }
      }else{
        finishSearch = true
        targetProduct = []
      }
    }
    return [targetProduct]
  }

  newSortProducts(asc){
    //debugger
    if(asc) return this._getProductsList()
    if(!this.inicio) return []
    if(!this.inicio.siguiente) return [this.inicio]
    return this._getReverseProductList(this.inicio);
  }

  newAddProductByPosition(productParams,position){
    position = Number(position)
    this.totalProductos++
    let newProduct = new Product(...productParams);
    if(!this.inicio){
      this.inicio = newProduct
    }
    let aux = this.inicio
    let currentPosition = 1

    let finishSearch = false
    while(!finishSearch){
      if(currentPosition ===  position - 1){
        newProduct.siguiente = aux.siguiente
        aux.siguiente = newProduct
        finishSearch = true
      }else{
        currentPosition++
        if(aux.siguiente){
          aux = aux.siguiente
        }else{
          aux = null
          finishSearch = true
        }
      }
    }

    return this._getProductsList()
  }

  //////////////
  /* PRIVATE */
  ////////////
  _getProductsList(){
    if(!this.inicio) return []
    if(!this.inicio.siguiente) return [this.inicio]
    let aux = this.inicio
    // ? This array is just for UI
    let productsArray = [];
    while(aux){
      if(aux.siguiente){
        // ? This push is just for the UI
        productsArray.push(aux)
        aux = aux.siguiente
      }else{
        // ? This push is just for the UI
        productsArray.push(aux)
        aux = null
      }
    }
    return productsArray
  }
  _getReverseProductList(aux){
    if(aux.siguiente){
      console.log('Siguiente');
      console.log(aux)
      let results = this._getReverseProductList(aux.siguiente)
      results[results.length] = aux
      return results
    }else{
      console.log('last')
      console.log(aux)
      return [aux]
    }
  }
}

export default new Inventory();
