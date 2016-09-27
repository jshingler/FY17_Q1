(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .controller('DepartmentDetailController', DepartmentDetailController);

    DepartmentDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Department', 'Location', 'Employee'];

    function DepartmentDetailController($scope, $rootScope, $stateParams, entity, Department, Location, Employee) {
        var vm = this;
        vm.department = entity;
        
        var unsubscribe = $rootScope.$on('fy17Q1App:departmentUpdate', function(event, result) {
            vm.department = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
