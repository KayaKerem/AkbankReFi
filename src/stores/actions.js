
import axios from 'axios'



export function listenToProductList({ commit }) {
	//smartcontracttan gelicek

	let products = axios.get("http://127.0.0.1:5000/products").then((res) => {
		let a = res.data["data"];
		return a
	}).catch((res) => {
		let a = res.data["data"];
		return a
	});


	return commit('UPDATE_PRODUCT_LIST', products);


}


