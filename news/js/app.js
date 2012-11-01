// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('News', []);

  angular.module('News', []);

  angular.module('News').filter('feedInFolder', function() {
    return function(feeds, folderId) {
      var feed, result, _i, _len;
      result = [];
      for (_i = 0, _len = feeds.length; _i < _len; _i++) {
        feed = feeds[_i];
        if (feed.folder === folderId) {
          result.push(feed);
        }
      }
      return result;
    };
  });

  angular.module('News').filter('itemInFeed', [
    'FeedType', 'FeedModel', function(FeedType, FeedModel) {
      return function(items, typeAndId) {
        var feed, feedId, item, result, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref;
        result = [];
        if (typeAndId.type === FeedType.Subscriptions) {
          return items;
        }
        if (typeAndId.type === FeedType.Starred) {
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            item = items[_i];
            if (item.isImportant) {
              result.push(item);
            }
          }
        }
        if (typeAndId.type === FeedType.Shared) {
          return result;
        }
        if (typeAndId.type === FeedType.Folder) {
          for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
            item = items[_j];
            feedId = 0;
            _ref = FeedModel.getItems();
            for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
              feed = _ref[_k];
              if (feed.folder = typeAndId.id) {
                feedId = feed.id;
              }
            }
            if (item.feed === feedId) {
              result.push(item);
            }
          }
        }
        if (typeAndId.type === FeedType.Feed) {
          for (_l = 0, _len3 = items.length; _l < _len3; _l++) {
            item = items[_l];
            if (item.feed === typeAndId.id) {
              result.push(item);
            }
          }
        }
        return result;
      };
    }
  ]);

  angular.module('News').factory('FeedModel', [
    'Model', function(Model) {
      var FeedModel;
      FeedModel = (function(_super) {

        __extends(FeedModel, _super);

        function FeedModel() {
          FeedModel.__super__.constructor.call(this);
          this.add({
            id: 1,
            name: 'test',
            unreadCount: 5,
            folder: 0,
            icon: 'url(http://feeds.feedburner.com/favicon.ico);'
          });
          this.add({
            id: 2,
            name: 'sub',
            unreadCount: 5,
            folder: 1,
            icon: 'url(http://feeds.feedburner.com/favicon.ico);'
          });
        }

        return FeedModel;

      })(Model);
      return new FeedModel();
    }
  ]);

  angular.module('News').factory('ShowAll', function() {
    var showAll;
    return showAll = true;
  });

  angular.module('News').factory('FeedType', function() {
    var feedType;
    return feedType = {
      Feed: 0,
      Folder: 1,
      Starred: 2,
      Subscriptions: 3,
      Shared: 4
    };
  });

  angular.module('News').factory('FolderModel', [
    'Model', function(Model) {
      var FolderModel;
      FolderModel = (function(_super) {

        __extends(FolderModel, _super);

        function FolderModel() {
          return FolderModel.__super__.constructor.apply(this, arguments);
        }

        return FolderModel;

      })(Model);
      ({
        constructor: function() {
          constructor.__super__.constructor.call(this);
          return this.add({
            id: 1,
            type: 1,
            name: 'test',
            unreadCount: 5,
            open: true,
            hasChildren: true
          });
        }
      });
      return new FolderModel();
    }
  ]);

  angular.module('News').factory('ActiveFeed', function() {
    var activeFeed;
    return activeFeed = {
      id: 0,
      type: 3
    };
  });

  angular.module('News').factory('ItemModel', [
    'Model', function(Model) {
      var ItemModel;
      ItemModel = (function(_super) {

        __extends(ItemModel, _super);

        function ItemModel() {
          return ItemModel.__super__.constructor.apply(this, arguments);
        }

        return ItemModel;

      })(Model);
      ({
        constructor: function() {
          constructor.__super__.constructor.call(this);
          return this.add({
            id: 1,
            title: 'test',
            isImportant: true,
            isRead: false
          });
        }
      });
      return new ItemModel();
    }
  ]);

  angular.module('News').factory('Model', function() {
    var Model;
    return Model = (function() {

      function Model() {
        this._items = [];
        this._itemIds = {};
      }

      Model.prototype.add = function(item) {
        this._items.push(item);
        return this._itemIds[item.id] = item;
      };

      Model.prototype.update = function(item) {
        return this._items = item;
      };

      Model.prototype.removeById = function(id) {
        var counter, item, removeItemIndex, _i, _len, _ref;
        removeItemIndex = null;
        _ref = this.items;
        for (counter = _i = 0, _len = _ref.length; _i < _len; counter = ++_i) {
          item = _ref[counter];
          if (item.id === id) {
            removeItemIndex = counter;
          }
        }
        if (removeItemIndex !== null) {
          this.items.splice(removeItemId, 1);
          return delete this._itemIds[id];
        }
      };

      Model.prototype.getItemById = function(id) {
        return this._itemIds[id];
      };

      Model.prototype.getItems = function() {
        return this._items;
      };

      return Model;

    })();
  });

  angular.module('News').factory('Updater', ['$rootScope', function($rootScope) {}]);

  angular.module('News').factory('Controller', function() {
    var Controller;
    return Controller = (function() {

      function Controller() {}

      return Controller;

    })();
  });

  angular.module('News').controller('ItemController', [
    'Controller', '$scope', 'ItemModel', 'ActiveFeed', function(Controller, $scope, ItemModel, ActiveFeed) {
      var ItemController;
      ItemController = (function(_super) {

        __extends(ItemController, _super);

        function ItemController($scope, itemModel, activeFeed) {
          this.$scope = $scope;
          this.itemModel = itemModel;
          this.activeFeed = activeFeed;
          this.$scope.items = this.itemModel.getItems();
        }

        return ItemController;

      })(Controller);
      return new ItemController($scope, ItemModel, ActiveFeed);
    }
  ]);

  angular.module('News').controller('FeedController', [
    'Controller', '$scope', 'FeedModel', 'FeedType', 'FolderModel', 'ActiveFeed', function(Controller, $scope, FeedModel, FeedType, FolderModel, ActiveFeed) {
      var FeedController;
      FeedController = (function(_super) {

        __extends(FeedController, _super);

        function FeedController($scope, feedModel, folderModel, feedType, activeFeed) {
          var _this = this;
          this.$scope = $scope;
          this.feedModel = feedModel;
          this.folderModel = folderModel;
          this.activeFeed = activeFeed;
          this.$scope.feeds = this.feedModel.getItems();
          this.$scope.folders = this.folderModel.getItems();
          this.$scope.feedType = feedType;
          this.$scope.toggleFolder = function(folderId) {
            var folder;
            folder = _this.folderModel.getItemById(folderId);
            return folder.open = !folder.open;
          };
          this.$scope.isFeedActive = function(type, id) {
            if (type === _this.activeFeed.type && id === _this.activeFeed.id) {
              return true;
            } else {
              return false;
            }
          };
          this.$scope.loadFeed = function(type, id) {
            _this.activeFeed.id = id;
            return _this.activeFeed.type = type;
          };
        }

        return FeedController;

      })(Controller);
      return new FeedController($scope, FeedModel, FolderModel, FeedType, ActiveFeed);
    }
  ]);

  angular.module('News').controller('SettingsController', [
    'Controller', '$scope', 'ShowAll', function(Controller, $scope, ShowAll) {
      var SettingsController;
      SettingsController = (function(_super) {

        __extends(SettingsController, _super);

        function SettingsController($scope, showAll) {
          var _this = this;
          this.$scope = $scope;
          this.showAll = showAll;
          this.$scope.getShowAll = function() {
            return _this.showAll;
          };
          this.$scope.setShowAll = function(value) {
            return _this.showAll = value;
          };
        }

        return SettingsController;

      })(Controller);
      return new SettingsController($scope, ShowAll);
    }
  ]);

  angular.module('News').controller('SettingsController', [
    'Controller', '$scope', 'ShowAll', function(Controller, $scope, ShowAll) {
      var SettingsController;
      SettingsController = (function(_super) {

        __extends(SettingsController, _super);

        function SettingsController($scope, showAll) {
          var _this = this;
          this.$scope = $scope;
          this.showAll = showAll;
          this.$scope.getShowAll = function() {
            return _this.showAll;
          };
          this.$scope.setShowAll = function(value) {
            return _this.showAll = value;
          };
        }

        return SettingsController;

      })(Controller);
      return new SettingsController($scope, ShowAll);
    }
  ]);

}).call(this);
