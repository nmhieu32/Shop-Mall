import ProductService from "../services/product-service.js";
import Product from "../model/product.js";
import Validation from "../model/validation.js";

const product = new Product();
const service = new ProductService();
const validation = new Validation();

export const getEle = (id) => {
    return document.getElementById(id);
}

// Request để nhận danh sách sản phẩm
const getProduct = () => {
    const promise = service.getListProductAPI();
    getEle("loader").style.display = "block"; // Hiện loader
    promise
        .then((result) => {
            getEle("loader").style.display = "none"; // Ẩn loader
            renderListProduct(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

// Render Product
const renderListProduct = (data) => {
    let contentHTML = "";

    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        contentHTML += `
            <tr>
                <th>${i + 1}</th>
                <th>${product.name}</th>
                <th>${product.price}</th>
                <th><img src="${product.img}" width="100" /></th>
                <th>${product.desc}</th>
                <th>
                    <button class="btn btn-info updateProduct" onclick="onEditroduct(${product.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                    <button class="btn btn-danger" onclick="onDeleteProduct(${product.id})">Delete</button>
                </th>
            </tr>
        `;
    }
    getEle("tablePhone").innerHTML = contentHTML;
};

getProduct();

// Delete Product
const onDeleteProduct = (id) => {
    const promise = service.deleteProductAPI(id);

    promise
        .then((result) => {
            alert(`Delete ${result.data.name} success !`);
            getProduct();
        })
        .catch((error) => {
            console.log(error);
        });
};

window.onDeleteProduct = onDeleteProduct;

// Lấy giá trị từ người dùng nhập
const getValue = () => {
    const name = getEle("name").value;
    const price = getEle("price").value;
    const screen = getEle("screen").value;
    const backCam = getEle("backCam").value;
    const frontCam = getEle("frontCam").value;
    const img = getEle("img").value;
    const desc = getEle("desc").value;
    const type = getEle("type").value;

    let isValid = true;

    isValid &= validation.checkEmpty(name, "tbname", "(*) Vui lòng nhập Tên")&& validation.checkLength(name, "tbname", "(*) Vui lòng nhập đúng độ dài kí tự từ 5 - 50 ký tự " ,5 , 50);

    isValid &= validation.checkEmpty(price, "tbprice", "(*) Vui lòng nhập Giá") && validation.checkNumber(price, "tbprice", "(*) Vui lòng nhập đúng định dạng Số")&& validation.checkLength(price, "tbprice", "(*) Vui lòng nhập đúng độ dài kí tự từ 3 - 6 ký tự " ,3 , 6);

    isValid &= validation.checkEmpty(screen, "tbscreen", "(*) Vui lòng nhập kích thước màn hình") && validation.checkLength(screen, "tbscreen", "(*) Vui lòng nhập đúng độ dài kí tự từ 3 - 10 ký tự " ,3 , 10);

    isValid &= validation.checkEmpty(backCam, "tbbackCam", "(*) Vui lòng nhập thông số camera sau")&& validation.checkLength(backCam, "tbbackCam", "(*) Vui lòng nhập đúng độ dài kí tự từ 5 - 50 ký tự " ,5 , 50);

    isValid &= validation.checkEmpty(frontCam, "tbfrontCam", "(*) Vui lòng nhập thông số camera trước") && validation.checkLength(frontCam, "tbfrontCam", "(*) Vui lòng nhập đúng độ dài kí tự từ 5 - 20 ký tự " ,5 , 20);

    isValid &= validation.checkEmpty(img, "tbimg", "(*) Vui lòng nhập hình ảnh");

    isValid &= validation.checkEmpty(desc, "tbdesc", "(*) Vui lòng nhập mô tả")&& validation.checkLength(desc, "tbdesc", "(*) Vui lòng nhập đúng độ dài kí tự từ 3 - 100 ký tự " ,3 , 100);

    isValid &= validation.checkSelect("type", "tbtype", "(*) Vui lòng chọn dòng máy");

    if (!isValid) return;

    const product = new Product("", name, price, screen, backCam, frontCam, img, desc, type);

    return product;
};

/**
 * Reset Form
 */
const resetForm = () => {
    getEle("formPhone").reset();
}

// Open Model
getEle("addPhoneForm").onclick = () => {

    // thay đổi tiêu đề khi mở form
    getEle("header-title").innerHTML = "Add Phone";
    // Hiện nút Thêm
    getEle("btnAddPhone").style.display = "block";
    // ẩn nút Cập nhật
    getEle("btnUpdate").style.display = "none";
    // clear Form
    resetForm();

    // clear error
    clearError();
}

// Add Product
getEle("btnAddPhone").onclick = () => {
    const product = getValue();

    if (!product) return;

    const promise = service.addProductAPI(product);
    promise
        .then((result) => {
            alert(`Add product ${result.data.name} success`);
            getEle("btnClose").click();
            getProduct();
        })
        .catch((error) => {
            console.log(error);
        });
}

// Edit product
const onEditroduct = (id) => {
    const promise = service.getProductByID(id);
    promise
        .then((result) => {
            const product = result.data;
            getEle("idProduct").value = product.id;
            getEle("name").value = product.name;
            getEle("price").value = product.price;
            getEle("screen").value = product.screen;
            getEle("backCam").value = product.backCamera;
            getEle("frontCam").value = product.frontCamera;
            getEle("img").value = product.img;
            getEle("desc").value = product.desc;
            product.type === "1" ? "Apple" : "Samsung";
            getEle("type").value = product.type;

        })
        .catch((error) => {
            console.log(error);
        });

    // thay đổi tiêu đề khi mở form
    getEle("header-title").innerHTML = "Update Phone";

    // Hiện nút Cập nhật
    getEle("btnUpdate").style.display = "block";

    // Ẩn nút Thêm
    getEle("btnAddPhone").style.display = "none";

    // clear thông báo lỗi
    clearError();

};
window.onEditroduct = onEditroduct;

// Cập nhật sản phẩm
getEle("btnUpdate").onclick = () => {

    const product = getValue();
    product.id = getEle("idProduct").value;

    const promise = service.updateProductAPI(product);
    promise
        .then((result) => {
            alert(`Update product ${result.data.name} success`);
            getEle("btnClose").click();
            getProduct();
        })
        .catch((error) => {
            console.log(error);
        });
}

/**
 * Tim kiếm sản phẩm
 */
getEle("keyword").addEventListener("keyup", () => {
    const keyword = getEle("keyword").value;
    const promise = service.getListProductAPI();
    promise
        .then((result) => {
            const findProduct = service.searchProduct(keyword, result.data);
            renderListProduct(findProduct);
        })
        .catch((error) => {
            console.log(error);
        });
})

/**
 * Filter Product
 */
getEle("filter").addEventListener("change", () => {
    const value = getEle("filter").value;

    const promise = service.getListProductAPI();
    promise
        .then((result) => {
            const filter = service.filterProduct(result.data, value);
            renderListProduct(filter);
        })
        .catch((error) => {
            console.log(error);
        });
})

const clearError = () => {
    const error = document.querySelectorAll(".sp-thongbao");
    error.forEach(span => {
        span.innerHTML="";
    });
};