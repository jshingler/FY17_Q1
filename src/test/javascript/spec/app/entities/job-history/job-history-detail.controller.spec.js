'use strict';

describe('Controller Tests', function() {

    describe('JobHistory Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockJobHistory, MockJob, MockDepartment, MockEmployee;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockJobHistory = jasmine.createSpy('MockJobHistory');
            MockJob = jasmine.createSpy('MockJob');
            MockDepartment = jasmine.createSpy('MockDepartment');
            MockEmployee = jasmine.createSpy('MockEmployee');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'JobHistory': MockJobHistory,
                'Job': MockJob,
                'Department': MockDepartment,
                'Employee': MockEmployee
            };
            createController = function() {
                $injector.get('$controller')("JobHistoryDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'fy17Q1App:jobHistoryUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
