'use strict';

// declaring a module that contains angular datepicker as dependency
var myAppModule = angular.module('myApp', [
  '720kb.datepicker'
 ]);

var GREETING_REGEXP = /^[А-Я][а-я\s]{3,}$/; // regexp for validating greeting text
var DATE_REGEXP = /^\d{4}\/\d{1,2}\/\d{1,2}$/; // regexp for validation date in YYYY/MM/DD format

//declaring controller for the form 
myAppModule.controller('formController',['$scope', function($scope) { 

	//declaring default values
	$scope.userName = "Peter Parker";
	$scope.ageNumber = 21;
	$scope.date = "2016/01/12";
	$scope.greetingField = "Привет";
	$scope.submittedInformation = {};

	// actions after form submitting
	$scope.submit = function() { 
		if ($scope.myForm.$valid) { // if form is valid
			$scope.submittedInformation = { 
				userName : $scope.userName,
				ageNumber : $scope.ageNumber,
				date : $scope.date,
				greetingText : $scope.greetingField
			}
		} else { // otherwise
			$scope.submittedInformation = "Your form is not valid"
		}
	}
}]);


myAppModule.directive('greetingvalidator', function ($compile) { // declaring directive for greeting text validating 
	return {
		restrict: 'A', // allowed to use only as a attribute
	    require: 'ngModel', // required ngModel attribute
	    link: function(scope, element, attrs, ctrl) {

	    	// alert message if text isn't valid
	    	var template = '<span ng-show="myForm.greetingField.$error.greetingvalidator">The value is not valid!</span>';
			var validMessage = $compile(template)(scope);
			element.after(validMessage);	

	        ctrl.$validators.greetingvalidator = function(modelValue, viewValue) {
		        if (ctrl.$isEmpty(viewValue)) {
		          // consider empty view value to be invalid
		          return false;
		        }

		        if (GREETING_REGEXP.test(viewValue)) {
		          // it is valid
		          return true;
		        }

		        // it is invalid
		        return false;
	        };
	    }
    };
});

myAppModule.directive('datevalidator', function ($compile) { // declaring directive for date validating
	return {
		restrict: 'A', // allowed to use only as a attribute
	    require: 'ngModel', // required ngModel attribute
	    link: function(scope, element, attrs, ctrl) {

		    // alert message if text isn't valid
		    var template = '<span ng-show="myForm.date.$error.datevalidator">The value is not valid!</span>';
			var validMessage = $compile(template)(scope);
			element.after(validMessage);	

		    ctrl.$validators.datevalidator = function(modelValue, viewValue) {
		        if (ctrl.$isEmpty(viewValue)) {
		          // consider empty view value to be invalid
		          return false;
		        }

		        if (DATE_REGEXP.test(viewValue)) {
		          // it is valid
		          return true;
		        }

		        // it is invalid
		        return false;
		      };
		    }
    };
});