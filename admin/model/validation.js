import { getEle } from "./../controller/main.js"

class Validation {
    // hàm kiểm tra rỗng
    checkEmpty(value, idNoti, mes) {
        if (value === "") {
            getEle(idNoti).innerHTML = mes;
            getEle(idNoti).style.display = "block";
            return false;
        }
        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true;
    }
    // kiểm tra select
    checkSelect(idSelect, idNoti, mes) {
        if (getEle(idSelect).selectedIndex === 0) {

            getEle(idNoti).innerHTML = mes;
            getEle(idNoti).style.display = "block";
            return false;
        }
        getEle(idNoti).innerHTML = "";
        getEle(idNoti).style.display = "none";
        return true;
    }

    // check số
    checkNumber(value, idNoti, mes) {
        const letter = /^[0-9]+$/;

        if (value.match(letter)) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mes;

        getEle(idNoti).style.display = "block";

        return false;
    }

    // check độ dài
    checkLength(value, idNoti, mes, min, max) {
        if (value.trim().length >= min && value.trim().length <= max) {
            getEle(idNoti).innerHTML = "";
            getEle(idNoti).style.display = "none";
            return true;
        }
        getEle(idNoti).innerHTML = mes;

        getEle(idNoti).style.display = "block";

        return false;
    }
}

export default Validation;