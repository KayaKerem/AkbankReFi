const state = {
	isLoading: true,
	productList: [
		
	]
}

const mutations = {
	'UPDATE_PRODUCT_LIST' (state, productList) {
		state.productList = productList;
		if (productList.length > 1) {
			state.isLoading = false;
		}
		
	}
}

const actions = {

}

const getters = {
	products: (state) => {
		return state.productList;
	},
	isProductLoading: (state) => {
		return state.isLoading;
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}