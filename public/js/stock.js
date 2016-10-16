'use strict';

angular.module('Supermarket-Management-System').controller('StockController', stockController);

function stockController($http) {
    const stockCtrl = this;
    stockCtrl.stock = {};
    stockCtrl.stockList = [];

    getStock();

    function getStock(){
        $http.get('/stock').then((res) => {
            console.log(res.data);
            stockCtrl.stockList = res.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    stockCtrl.postStock = () => {
        console.log(stockCtrl.stock);
        $http.post('/stock', stockCtrl.stock).then((res) => {
            console.log(res);
        }).catch((error) =>{
            console.log(error);
        });
    }

    stockCtrl.deleteStock = (stock) => {
        $http.delete('/stock/' + stock._id).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }

    stockCtrl.putStock = (stock) => {
        $http.put('/stock', stock).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }
	
	
}
