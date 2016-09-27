(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .controller('CountryDialogController', CountryDialogController);

    CountryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Country', 'Region'];

    function CountryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Country, Region) {
        var vm = this;
        vm.country = entity;
        vm.regions = Region.query({filter: 'country-is-null'});
        $q.all([vm.country.$promise, vm.regions.$promise]).then(function() {
            if (!vm.country.region || !vm.country.region.id) {
                return $q.reject();
            }
            return Region.get({id : vm.country.region.id}).$promise;
        }).then(function(region) {
            vm.regions.push(region);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('fy17Q1App:countryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.country.id !== null) {
                Country.update(vm.country, onSaveSuccess, onSaveError);
            } else {
                Country.save(vm.country, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
