(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .controller('LocationDialogController', LocationDialogController);

    LocationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Location', 'Country'];

    function LocationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Location, Country) {
        var vm = this;
        vm.location = entity;
        vm.countrys = Country.query({filter: 'location-is-null'});
        $q.all([vm.location.$promise, vm.countrys.$promise]).then(function() {
            if (!vm.location.country || !vm.location.country.id) {
                return $q.reject();
            }
            return Country.get({id : vm.location.country.id}).$promise;
        }).then(function(country) {
            vm.countries.push(country);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('fy17Q1App:locationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.location.id !== null) {
                Location.update(vm.location, onSaveSuccess, onSaveError);
            } else {
                Location.save(vm.location, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
