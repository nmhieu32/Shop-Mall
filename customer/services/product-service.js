class ProductService {
    getProductListAPI() {
        const promise = axios({
            url: "https://6858ec1a138a18086dfc4485.mockapi.io/Product",
            method: "GET"
        });
        return promise;
    }

    filterProduct(type,data) {
        if(type === "all") {
            return data;
        }

        let arrFilter = [];

        for(let i = 0; i < data.length; i++) {
            const product = data[i];
            if(product.type === type) {
                arrFilter.push(product);
            }
        }
        return arrFilter;
    }
}

export default ProductService;