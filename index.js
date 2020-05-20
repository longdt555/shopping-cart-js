var user = [{
    id: 1,
    username: "huyen",
    balance: 9000000000
}]
var product = [{
    id: 1,
    name: "Cho",
    price: 1000
}, {
    id: 2,
    name: "Meo",
    price: 2000
}]
var cart = [{
    id: 1,
    userid: 1,
    productid: 1,
    quantity: 2
}, {
    id: 2,
    userid: 1,
    productid: 2,
    quantity: 2
}]
$(document).ready(function() {
    $("#username").text(user[0].username + "( " + user[0].balance + " )")
    $("span").text(getTotal())
    loadtable()
});

function getTotal() {
    var cart1 = []
    var total = 0
    var totalprice = 0
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].userid === 1) {
            cart1.push(cart)
            total += cart[i].quantity
            totalprice += cart[i].quantity * getPrice(cart[i].productid)
        }
    }
    return " Total: " + total + " products (" + totalprice + "VND)";
}

function getPrice(id) {
    var price = 0
    for (var i = 0; i < product.length; i++) {
        if (id === product[i].id) {
            price = product[i].price
        }
    }
    return price
}

function loadtable() {
    var html = ""
    for (var i = 0; i < product.length; i++) {
        html += "<div class='col'><div class='card h-100'><div class='card-body'><h4 class='card-title'><a>" + product[i].name + "</a></h4><h5>" + product[i].price + "</h5>Quantity<input type='number' class='form-control' id='quantity" + product[i].id + "' placeholder='Type quantity'/><button class='btn btn-info' style='float:right;margin-top: 20px;' onclick='addcart(" + product[i].id + ")'>Add to card</button></div></div></div>"
    }
    $("#product").html(html)

}

function addcart(id) {
    if (Number($("#quantity" + id).val()) < 1) {
        alert("Gia tri quantity lon hon hoac bang 1")
    } else {
        var cart2 = {
            id: getLargest() + 1,
            userid: 1,
            productid: id,
            quantity: Number($("#quantity" + id).val())
        }
        cart.push(cart2)
        $("span").text(getTotal())
    }

}

function getLargest() {
    let max = 0;
    cart.forEach(cart1 => {
        if (cart1.id > max) {
            max = cart1.id;
        }
    });
    return max;
}

function showcart() {
    $("#product").hide()
    getcart()
}

function getcart() { //
    var total = 0;
    var html = "<table class='table table-bordered table-striped'><thead class='thead-dark'><tr><th scope='col'>ID</th>" +
        "<th scope='col'>Product Name</th><th scope='col'>Price</th><th scope='col'>Quantity</th><th scope='col'>Total</th></tr></thead><tbody>"
    for (var i = 0; i < cart.length; i++) {
        var pro = getproduct(cart[i].productid);
        total += pro.price * cart[i].quantity;
        html += "<tr><td>" + cart[i].id + "</td><td>" + pro.name + "</td><td>" + pro.price + "</td><td>" + cart[i].quantity + "</td><td>" + pro.price * cart[i].quantity + "</td></tr>"
    }
    html += "<tr><th colspan='4'>Total</th><th>" + total + "</th></tr></tbody></table><div class='col-12'><button class='btn btn-info' style='float:right;margin-top: 20px;' onclick='thanhtoan(" + total + ")'>Thanh toan</button></div>"
    $("#cart").html(html)


}

function getproduct(id) {
    var pro
    for (var i = 0; i < product.length; i++) {
        if (id === product[i].id) {
            pro = product[i]
        }
    }
    return pro
}

function thanhtoan(total) {
    if (user[0].balance < total) {
        alert("Ban khong co du tien")
    } else {
        user[0].balance -= total
        cart = []
        alert("Thanh toan thanh cong!")
        $("#username").text(user[0].username + "( " + user[0].balance + " )")
        $("span").text(getTotal())
        $("#cart").html("")
        $("#product").show()
    }
}