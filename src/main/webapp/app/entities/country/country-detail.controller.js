(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .controller('CountryDetailController', CountryDetailController);

    CountryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Country', 'Region'];

    function CountryDetailController($scope, $rootScope, $stateParams, entity, Country, Region) {
        var vm = this;
        vm.country = entity;
        
        var unsubscribe = $rootScope.$on('fy17Q1App:countryUpdate', function(event, result) {
            vm.country = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
