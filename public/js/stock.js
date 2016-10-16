'use strict';

angular.module('Supermarket-Management-System').controller('StockController', stockController);

function stockController($http) {
    const stockCrtl = this;
    stockCrtl.stock = {};
    stockCrtl.stockList = [];
    
    getStock();

    function getStock(){
        $http.get('/stock').then((res) => {
            console.log(res.data);
            stockCrtl.stockList = res.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    stockCrtl.postStock = () => {
        console.log(stockCrtl.stock);
        $http.post('/stock', stockCrtl.stock).then((res) => {
            console.log(res);
            getStock();
        }).catch((error) =>{
            console.log(error);
        });
    }

    stockCrtl.deleteStock = (stock) => {
        
        $http.delete('/stock/' + stock._id).then((res) => {
            console.log(res);
            getStock();
        }).catch((error) => {
            console.log(error);
        });
    }

    stockCrtl.putStock = (stock) => {
        $http.put('/stock', stock).then((res) => {
            console.log(res);
            getStock();
        }).catch((error) => {
            console.log(error);
        });
    }
}
