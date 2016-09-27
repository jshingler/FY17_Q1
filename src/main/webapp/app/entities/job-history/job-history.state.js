(function() {
    'use strict';

    angular
        .module('fy17Q1App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('job-history', {
            parent: 'entity',
            url: '/job-history',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'JobHistories'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/job-history/job-histories.html',
                    controller: 'JobHistoryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('job-history-detail', {
            parent: 'entity',
            url: '/job-history/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'JobHistory'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/job-history/job-history-detail.html',
                    controller: 'JobHistoryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'JobHistory', function($stateParams, JobHistory) {
                    return JobHistory.get({id : $stateParams.id});
                }]
            }
        })
        .state('job-history.new', {
            parent: 'job-history',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-history/job-history-dialog.html',
                    controller: 'JobHistoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                startDate: null,
                                endDate: null,
                                language: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('job-history', null, { reload: true });
                }, function() {
                    $state.go('job-history');
                });
            }]
        })
        .state('job-history.edit', {
            parent: 'job-history',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-history/job-history-dialog.html',
                    controller: 'JobHistoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['JobHistory', function(JobHistory) {
                            return JobHistory.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('job-history', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('job-history.delete', {
            parent: 'job-history',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-history/job-history-delete-dialog.html',
                    controller: 'JobHistoryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['JobHistory', function(JobHistory) {
                            return JobHistory.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('job-history', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
