const defaultState = {
    products: [],
    singleProduct: {},
}

const productsReducer = (state = defaultState, action) => {
    switch (action.type) {
    case 'GET_PRODUCTS':
      return {...state, products: action.products}
    case 'SELECT_PRODUCT':
      return {...state, singleProduct: action.singleProduct}
    default:
      return state;
    }
  }
export default productsReducer