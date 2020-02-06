var maxPlacement = 0;

function getAvg(list) {
    var sum = 0;
    var count = 0;
    for (var i = 1; i < list.length; i++) {
        sum += list[i];
        count++;
    }
    return sum / count;
}

function getOrder(list) {
    order = [];
    list.sort();
    list.forEach(element => {
        order.push(element[1].split(" ")[0]);
    })
    return order;
}