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
        for (let i = 0; i < arrFilter.length - 1; i++) {
            for (let j = i + 1; j < arrFilter.length; j++) {
                if (value === "1") {
                    if (arrFilter[i].price > arrFilter[j].price) {
                        let temp = arrFilter[i];
                        arrFilter[i] = arrFilter[j];
                        arrFilter[j] = temp;
                    }
                }
                else if (value === "2") {
                    if (arrFilter[i].price < arrFilter[j].price) {
                        let temp = arrFilter[j];
                        arrFilter[j] = arrFilter[i];
                        arrFilter[i] = temp;
                    }
                }
            }
        }
        return arrFilter;
    }
}

export default ProductService;