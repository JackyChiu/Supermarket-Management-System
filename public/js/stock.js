'use strict';

angular.module('Supermarket-Management-System').controller('StockController', stockController);

function stockController($http) {
    const stockCtrl = this;
    stockCtrl.stock = {};
    stockCtrl.stockList = [];

    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    getStock();

    function getStock() {
        $http.get('/stock').then((res) => {
            console.log(res.data);
            stockCtrl.stockList = res.data;
            drawChart();
        }).catch((error) => {
            console.log(error);
        });
    }

    stockCtrl.postStock = () => {
        console.log(stockCtrl.stock);
        $http.post('/stock', stockCtrl.stock).then((res) => {
            console.log(res);
            stockCtrl.stock = {};
            getStock();
        }).catch((error) => {
            console.log(error);
        });
    };

    stockCtrl.deleteStock = (stock) => {
        $http.delete('/stock/' + stock._id).then((res) => {
            console.log(res);
            getStock();
        }).catch((error) => {
            console.log(error);
        });
    };

    stockCtrl.addStock = (stock) => {
        stock.quantity += 1;
        $http.put('/stock', stock).then((res) => {
            console.log(res);
            getStock();
        }).catch((error) => {
            console.log(error);
        });
    };

    stockCtrl.minusStock = (stock) => {
        stock.quantity -= 1;
        $http.put('/stock', stock).then((res) => {
            console.log(res);
            getStock();
        }).catch((error) => {
            console.log(error);
        });
    };

    function drawChart() {
        let mostPopular = [];
        mostPopular.push(stockCtrl.stockList[0]);
        mostPopular.push(stockCtrl.stockList[1]);
        mostPopular.push(stockCtrl.stockList[2]);
        mostPopular.push(stockCtrl.stockList[3]);
        mostPopular.push(stockCtrl.stockList[4]);
        for (let i = 5; i < stockCtrl.stockList.length; i++) {
            for (let j = 0; j < mostPopular.length; j++) {
                if (stockCtrl.stockList[i].orders > mostPopular[j].orders) {
                    mostPopular[j] = stockCtrl.stockList[i];
                    j = mostPopular.length;
                }
            }
        }
        var data = google.visualization.arrayToDataTable([
            ['Item', 'Sold number'],
            [mostPopular[0].product, mostPopular[0].orders],
            [mostPopular[1].product, mostPopular[1].orders],
            [mostPopular[2].product, mostPopular[2].orders],
            [mostPopular[3].product, mostPopular[3].orders],
            [mostPopular[4].product, mostPopular[4].orders]
        ]);

        var options = {
            title: 'Popular Item',
			titleTextStyle: {	
				color: 'black',
				fontName: 'Arial',
				fontSize: 30,
				bold: false
			},
			legend: {textStyle: {fontSize: 20}}
        };
        var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
        chart.draw(data, options);
    }

}
