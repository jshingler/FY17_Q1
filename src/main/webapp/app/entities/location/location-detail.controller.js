(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .controller('LocationDetailController', LocationDetailController);

    LocationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Location', 'Country'];

    function LocationDetailController($scope, $rootScope, $stateParams, entity, Location, Country) {
        var vm = this;
        vm.location = entity;
        
        var unsubscribe = $rootScope.$on('fy17Q1App:locationUpdate', function(event, result) {
            vm.location = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
