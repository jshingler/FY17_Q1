(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$scope', '$state', 'Task', 'TaskSearch'];

    function TaskController ($scope, $state, Task, TaskSearch) {
        var vm = this;
        vm.tasks = [];
        vm.loadAll = function() {
            Task.query(function(result) {
                vm.tasks = result;
            });
        };

        vm.search = function () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            TaskSearch.query({query: vm.searchQuery}, function(result) {
                vm.tasks = result;
            });
        };
        vm.loadAll();
        
    }
})();
