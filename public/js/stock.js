angular.module('stock').controller(stockController);

function stockController($http) {
    const stockCrtl = this;
    let stockList = [];
    let stockInput = {};

    function getStock(){
        $http.get('/stock').then((res) => {
            console.log(res);
            stockList = res;
        }).catch((error) => {
            console.log(error);
        });
    }

    function postStock() {
        $http.post('/stock', stockInput).then((res) => {
            console.log(res);
        }).catch((error) =>{
            console.log(error);
        });
    }

    function deleteStock(stock){
        $http.delete('/stock/stock._id').then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }

    function putStock(stock){
        $http.put('/stock', stock).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }
}
