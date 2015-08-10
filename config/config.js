app.controller('GitLabCtrl', ['$scope', function ($scope){

    $scope.config = $scope.providerConfig();
    $scope.config.cache = $scope.config.cache || false;

    $scope.addWebhooks = function(){
        $scope.loadingWebhooks = true;
        $.ajax($scope.api_root + 'gitlab/hook', {
            type: 'POST',
            success: function(){
                $scope.loadingWebhooks = false;
                $scope.success('Set gitlab webhooks', true);
            },
            error: function(){
                $scope.loadingWebhooks = false;
                $scope.error('Failed to set gitlab webhooks', true);
            }
        });
    };

    $scope.deleteWebhooks = function(){
        $scope.loadingWebhooks = true;
        $.ajax($scope.api_root + 'gitlab/hook', {
            type: 'DELETE',
            success: function(data){
                $scope.loadingWebhooks = false;
                $scope.success(data, true);
            },
            error: function(){
                $scope.loadingWebhooks = false;
                $scope.error('Failed to remove gitlab webhooks', true);
            }
        });
    };

    $scope.save = function(){
        this.providerConfig(this.config);
    };
}]);
