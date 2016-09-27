(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .controller('DepartmentController', DepartmentController);

    DepartmentController.$inject = ['$scope', '$state', 'Department', 'DepartmentSearch'];

    function DepartmentController ($scope, $state, Department, DepartmentSearch) {
        var vm = this;
        vm.departments = [];
        vm.loadAll = function() {
            Department.query(function(result) {
                vm.departments = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            DepartmentSearch.query({query: vm.searchQuery}, function(result) {
                vm.departments = result;
            });
        };
        vm.loadAll();
        
    }
})();
