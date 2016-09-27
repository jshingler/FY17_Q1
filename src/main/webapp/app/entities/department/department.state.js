(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('department', {
            parent: 'entity',
            url: '/department',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Departments'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/departments.html',
                    controller: 'DepartmentController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('department-detail', {
            parent: 'entity',
            url: '/department/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Department'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/department-detail.html',
                    controller: 'DepartmentDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Department', function($stateParams, Department) {
                    return Department.get({id : $stateParams.id});
                }]
            }
        })
        .state('department.new', {
            parent: 'department',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-dialog.html',
                    controller: 'DepartmentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                departmentId: null,
                                departmentName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('department', null, { reload: true });
                }, function() {
                    $state.go('department');
                });
            }]
        })
        .state('department.edit', {
            parent: 'department',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-dialog.html',
                    controller: 'DepartmentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('department', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('department.delete', {
            parent: 'department',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/department-delete-dialog.html',
                    controller: 'DepartmentDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('department', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
