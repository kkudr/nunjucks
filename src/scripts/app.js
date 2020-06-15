var request = new XMLHttpRequest();
request.open("GET", "./js/sql.json", false);
request.send(null);


var productInformation = JSON.parse(request.responseText);

// productInformation.forEach(function(item, i, arr) {
//     var j = 0;
//     var itemDate = item.date;
//     console.log( i + ": " );
// function showProps(obj, objName) {
//     var result = "";
//     var j = 0;
//     for (var i in obj) {
//         if (obj.hasOwnProperty(i)) {
//             var productDate = new Date(obj[i].date);
//             var productDateFull = productDate.getDate() + '.' + productDate.getMonth() + '.' + productDate.getFullYear();
//             var test = new Date(productDate.getFullYear(), productDate.getMonth(), productDate.getDate());
//             if (productDateFull !== productDateFull)  {
//                 var productObj
//             }
//             result += objName + "." + i + " = " + test + "\n";
//         }
//     }
//     console.log(result);
//     return result;
// }
// showProps(productInformation, 'productInformation');

document.addEventListener('DOMContentLoaded', function(){
    function toggleProductDay(e) {
        if(e.target.classList.contains('open')){
            e.target.classList.remove('open')
        } else {
            e.target.classList.add('open');
        }
    }



    var productsContainer = document.querySelector('.products-container');
    productsContainer.addEventListener('click', toggleProductDay);
});