angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPlatform) {


    var branchUniversalObj = null;
    $ionicPlatform.ready()
        .then(createUniversalObject)

    function createUniversalObject() {
        Branch.createBranchUniversalObject({
            canonicalIdentifier: 'monster/12345'
        }).then(function(newBranchUniversalObj) {
            branchUniversalObj = newBranchUniversalObj;
            console.log(newBranchUniversalObj);
        }).catch(onErrorBranch)

        function onErrorBranch(error) {
            console.error(error)
                // body...
        }
    }


    $scope.shareLink = function() {

        $ionicPlatform.ready()
            .then(createBranchObject)
            .then(createLink)
            .then(onCreateLink)
            .catch(onErrorBranch)


        function createBranchObject() {

            return Branch.createBranchUniversalObject({
                canonicalIdentifier: 'chats/1',
                title: 'Meet Mr. Squiggles',
                contentDescription: 'Your friend Josh has invited you to meet his awesome monster, Mr. Squiggles!',
                contentImageUrl: 'http://ichef-1.bbci.co.uk/news/660/cpsprodpb/0158/production/_86544300_09d649a9-efc7-4046-b26d-d6a0ab53538f.jpg',
                contentMetadata: {
                    'state': 'tab.chat-detail',
                    'chatId': '1',
                    isDeep: 'true'
                }
            })
        }

        function createLink(newBranchUniversalObj) {
            return newBranchUniversalObj.generateShortUrl({
                // put your link properties here
                "feature": "sharing",
                "channel": "whatsapp"
            }, {

                "$deeplink_path": "chats/2",
                "$desktop_url": "http://google.com",
            })
        }

        function onCreateLink(link) {
            console.log('onCreateLink', link, link.url);
        }

        function onErrorBranch(error) {
            console.error(error)
                // body...
        }


    }

})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
