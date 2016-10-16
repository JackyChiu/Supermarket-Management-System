'use strict';

angular.module('Supermarket-Management-System').controller('VolunteerController', volunteerController);

function volunteerController($http) {
    const volunteerCrtl = this;
    volunteerCrtl.volunteer = {};
    volunteerCrtl.volunteerList = [];

    getVolunteer();

    function getVolunteer(){
        $http.get('/volunteer').then((res) => {
            console.log(res.data);
            volunteerCrtl.volunteerList = res.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    stockCrtl.postVolunteer = () => {
        console.log(volunteerCrtl.volunteer);
        $http.post('/stock', volunteerCrtl.volunteer).then((res) => {
            console.log(res);
        }).catch((error) =>{
            console.log(error);
        });
    }

    stockCrtl.deleteVolunteer = (volunteer) => {
        $http.delete('/volunteer/' + volunteer._id).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }

    stockCrtl.putVolunteer = (volunteer) => {
        $http.put('/volunteer', volunteer).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }
}
