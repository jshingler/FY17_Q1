(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .controller('JobDialogController', JobDialogController);

    JobDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Job', 'Employee', 'Task'];

    function JobDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Job, Employee, Task) {
        var vm = this;
        vm.job = entity;
        vm.employees = Employee.query();
        vm.tasks = Task.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('fy17Q1App:jobUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.job.id !== null) {
                Job.update(vm.job, onSaveSuccess, onSaveError);
            } else {
                Job.save(vm.job, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
