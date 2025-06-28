class ProductService {
    getListProductAPI() {
        const promise = axios({
            url: "https://6858ec1a138a18086dfc4485.mockapi.io/Product",
            method: "GET",
        });
        return promise;
    }

    deleteProductAPI(id) {
        const promise = axios({
            url: `https://6858ec1a138a18086dfc4485.mockapi.io/Product/${id}`,
            method: "DELETE",
        });
        return promise;
    }

    addProductAPI(product) {
        const promise = axios({
            url: "https://6858ec1a138a18086dfc4485.mockapi.io/Product",
            method: "POST",
            data: product
        });
        return promise;
    }

    getProductByID(id) {
        const promise = axios({
            url: `https://6858ec1a138a18086dfc4485.mockapi.io/Product/${id}`,
            method: "GET"
        });
        return promise;
    }

    updateProductAPI(product) {
        const promise = axios({
            url: `https://6858ec1a138a18086dfc4485.mockapi.io/Product/${product.id}`,
            method: "PUT",
            data: product,
        });
        return promise;
    }

    searchProduct(keyword, data) {
        let findProduct = [];

        for (let i = 0; i < data.length; i++) {
            const product = data[i];
            // chuyển product.name thành viết thường
            const nameLowerCase = product.name.toLowerCase();

            // chuyển keyword thành chữ thường
            const keywordLowerCase = keyword.toLowerCase();

            const index = nameLowerCase.indexOf(keywordLowerCase);

            if (index != -1) {
                findProduct.push(product);
            }
        }
        return findProduct;
    }

    filterProduct(data, value) {
        // clone mảng để ko thay đổi mảng gốc
        let arrFilter = [...data];
        arrFilter.sort((a, b)=>{
            return value === "1" ? a.price - b.price : b.price - a.price;   
        });
        return arrFilter;
    }
}

export default ProductService;