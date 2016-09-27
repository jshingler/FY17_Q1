(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .controller('RegionDetailController', RegionDetailController);

    RegionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Region'];

    function RegionDetailController($scope, $rootScope, $stateParams, entity, Region) {
        var vm = this;
        vm.region = entity;
        
        var unsubscribe = $rootScope.$on('fy17Q1App:regionUpdate', function(event, result) {
            vm.region = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
