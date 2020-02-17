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
    var order = [];
    var times = [];
    var dict = {}
    console.log(list);
    list.forEach(element => {
        dict[element[0]] = element[1].split(" ")[0];
        times.push(element[0]);
    })
    console.log(dict);
    times.sort(function(a, b){return a-b});
    console.log(times);
    times.forEach(element => {
        order.push(dict[element]);
    })
    console.log(order);
    return order;
}