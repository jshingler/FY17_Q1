(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .controller('JobHistoryDialogController', JobHistoryDialogController);

    JobHistoryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'JobHistory', 'Job', 'Department', 'Employee'];

    function JobHistoryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, JobHistory, Job, Department, Employee) {
        var vm = this;
        vm.jobHistory = entity;
        vm.jobs = Job.query({filter: 'jobhistory-is-null'});
        $q.all([vm.jobHistory.$promise, vm.jobs.$promise]).then(function() {
            if (!vm.jobHistory.job || !vm.jobHistory.job.id) {
                return $q.reject();
            }
            return Job.get({id : vm.jobHistory.job.id}).$promise;
        }).then(function(job) {
            vm.jobs.push(job);
        });
        vm.departments = Department.query({filter: 'jobhistory-is-null'});
        $q.all([vm.jobHistory.$promise, vm.departments.$promise]).then(function() {
            if (!vm.jobHistory.department || !vm.jobHistory.department.id) {
                return $q.reject();
            }
            return Department.get({id : vm.jobHistory.department.id}).$promise;
        }).then(function(department) {
            vm.departments.push(department);
        });
        vm.employees = Employee.query({filter: 'jobhistory-is-null'});
        $q.all([vm.jobHistory.$promise, vm.employees.$promise]).then(function() {
            if (!vm.jobHistory.employee || !vm.jobHistory.employee.id) {
                return $q.reject();
            }
            return Employee.get({id : vm.jobHistory.employee.id}).$promise;
        }).then(function(employee) {
            vm.employees.push(employee);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('fy17Q1App:jobHistoryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.jobHistory.id !== null) {
                JobHistory.update(vm.jobHistory, onSaveSuccess, onSaveError);
            } else {
                JobHistory.save(vm.jobHistory, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.startDate = false;
        vm.datePickerOpenStatus.endDate = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
