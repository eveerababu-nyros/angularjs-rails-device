angular.module('sessionService', [])
    .factory('Session', function($location, $http, $q) {
        // Redirect to the given url (defaults to '/')
        function redirect(url) {
            url = url || '/user/login';
            $location.path(url);
        }
        var service = {
            login: function(email, password) {
                return $http.post('/api/sessions', {user: {email: email, password: password} })
                    .then(function(response) {
                        service.currentUser = response.data.user;
                        if (service.isAuthenticated()) {
                            //$location.path(response.data.redirect);
														//console.log(response);
														//alert("success");
                            $location.path('/projects');
                        }
                    });
            },

            logout: function(redirectTo) {
                $http.delete('/api/sessions').then(function(response) {
                    $http.defaults.headers.common['X-CSRF-Token'] = response.data.csrfToken;
                    service.currentUser = null;
                    redirect(redirectTo);
                });
            },

            register: function(email, password, confirm_password) {
                alert(password)
                return $http.post('/api/users', {user: {email: email, password: password, password_confirmation: confirm_password} })
                .then(function(response) {
                    alert(response);
                    service.currentUser = response.data;
                    if (service.isAuthenticated()) {
                        $location.path('/projects');
                    }
                });
            },
            requestCurrentUser: function() {
                if (service.isAuthenticated()) {
                    return $q.when(service.currentUser);
                } else {
                    return $http.get('/api/users').then(function(response) {
                        service.currentUser = response.data.user;
                        return service.currentUser;
                    });
                }
            },

            currentUser: null,

            isAuthenticated: function(){
                return !!service.currentUser;
            }
        };
        return service;
    });
