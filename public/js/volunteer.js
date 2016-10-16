'use strict';

angular.module('Supermarket-Management-System').controller('VolunteerController', volunteerController);

function volunteerController($http) {
    const volunteerCtrl = this;
    volunteerCtrl.volunteer = {};
    volunteerCtrl.volunteerList = [];

    getVolunteer();

    function getVolunteer(){
        $http.get('/volunteer').then((res) => {
            console.log(res.data);
            volunteerCtrl.volunteerList = res.data;
        }).catch((error) => {
            console.log(error);
        });
    };

    volunteerCtrl.postVolunteer = () => {
        console.log(volunteerCtrl.volunteer);
        $http.post('/volunteer', volunteerCtrl.volunteer).then((res) => {
            console.log(res);
        }).catch((error) =>{
            console.log(error);
        });
    };

    volunteerCtrl.deleteVolunteer = (volunteer) => {
        $http.delete('/volunteer/' + volunteer._id).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    };

    volunteerCtrl.putVolunteer = (volunteer) => {
        $http.put('/volunteer', volunteer).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    };
}
