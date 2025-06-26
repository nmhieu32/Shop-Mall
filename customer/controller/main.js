import ProductService from "../services/product-service.js";

const service = new ProductService;

const getEle = (id) => document.getElementById(id);

// render Product
const renderProduct = (data) => {
    let contentHTML = "";
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        contentHTML += `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <img src="${product.img}" class="card-img-top" style="object-fit: cover; height: 350px;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-primary fw-bold">${product.name}</h5>
                        <p class="card-text text-muted small">${product.desc}</p>
                    <div class="mb-3">
                        <span class="text-warning">★★★★★</span>
                        <span class="text-muted small">(128 đánh giá)</span>
                    </div>
                        <p class="fw-bold fs-5 text-danger mb-3">${product.price} $</p>

                        <button class="btn btn-outline-primary mt-auto rounded-pill" onclick="addToCart()">Add to cart</button>
                    </div>
                </div>
            </div>
        `;
    }
    getEle("phoneList").innerHTML = contentHTML;
};

// Request => getProduct
const getProduct = () => {
    const promise = service.getProductListAPI();

    promise
        .then((result) => {
            renderProduct(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
};
getProduct();

// Filter product
getEle("selectList").addEventListener("change", () => {
    const type = getEle("selectList").value;

    const promise = service.getProductListAPI();

    promise
        .then((result) => {
            const product = result.data;
            const arrFilter = service.filterProduct(type, product);
            renderProduct(arrFilter);
        })
        .catch((error) => {
            console.log(error);
        });
});
