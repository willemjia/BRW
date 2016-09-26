/**
 * Created by willem on 2016/9/13.
 */
angular.module('ionicAppUpdate', ['ionic', 'ngCordova'])
  .factory('appUpdate', ['$timeout', '$rootScope', '$cordovaAppVersion', '$cordovaNetwork', '$ionicPopup', '$ionicLoading', '$cordovaFileTransfer', '$cordovaFileOpener2','$cordovaDevice','$cordovaInAppBrowser', '$http', function ($timeout, $rootScope, $cordovaAppVersion, $cordovaNetwork, $ionicPopup, $ionicLoading, $cordovaFileTransfer, $cordovaFileOpener2, $cordovaDevice,$cordovaInAppBrowser,$http) {
    //获取服务器端版本信息
      var toUpdate = function (wwwVersion,appName,isAlert) {
        $http.get('http://10.25.37.164:8899/AppStore/update/getUpdateStatus/'+appName).then(
        function(resp){
        /*var resp={
          versionId:'0.0.2.0',
          //versionId:'0.0.1.1',
          apkSize:'2.6M',
          ipaSize:'2.6M',
          description:'修改了更新功能',
          androidDownloadUrl:'http://10.25.37.164:8899/file/apk/BM2-I.apk',
          iosDownloadUrl:'http://10.25.37.164:8899/file/apk/BM2-I.apk'
        };*/
        checkUpdate(resp.data,wwwVersion,isAlert);
        },function(error,status){
          alert(status+':'+error);
        });
      };

    //检查更新
    var checkUpdate = function (data,nowWwwVersion,isAlert) {
      var versions=data.versionId.split('.');
      var newVersion=versions[0]+'.'+versions[1]+'.'+versions[2];//服务器app版本
      var type = $cordovaNetwork.getNetwork();
      //获取本地APP版本
      $cordovaAppVersion.getVersionNumber().then(function (version) {
        var nowVersion=version+'.'+nowWwwVersion;
        if(nowVersion!=data.versionId){
          var size=null;
          $cordovaDevice.getPlatform()=='iOS'?size=data.ipaSize : size=data.apkSize;

          if (type === 'wifi') {
            $ionicPopup.confirm({
              title: '版本更新',
              template: '新版本:'+data.versionId+'<br>更新内容:'+data.description+'<br>下载文件大小:'+size,
              cancelText: '取消',
              okText: '升级'
            }).then(function (res) {
              if (res) {
                version != newVersion ? updateForAndroid(data) : updateWWW();
              }
            });
          }else {
            $ionicPopup.confirm({
              title: '建议您在WIFI条件下进行升级，是否确认升级？',
              template: '新版本:'+data.versionId+'<br>更新内容:'+data.description+'<br>下载文件大小:'+size,
              cancelText: '取消',
              okText: '升级'
            }).then(function (res) {
              if (res) {
                version != newVersion ? updateForAndroid(data) : updateWWW();
              }
            });
          }
        }else{
          if(isAlert){
            $ionicPopup.alert(
              {
                title: '提示',
                template: '已是最新版本'
              }
            )
          }
        }
        });
      // 无网络时
      $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
        $ionicLoading.show({
          template: '网络异常，不能连接到服务器！'
        });
        $timeout(function () {
          $ionicLoading.hide()
        }, 2000);
      })
    };

    //app外壳更新
    function updateForAndroid(data) {
      //ios更新
      if($cordovaDevice.getPlatform()=='iOS') {
        $cordovaInAppBrowser.open(data.iosDownloadUrl, '_system', {location: 'yes', clearcache: 'yes', toolbar: 'yes'});
        return;
      };

        $ionicLoading.show({
        template: "已经下载：0%"
      });
      var targetPath = "cdvfile://localhost/temporary/path/to/ionic.apk";//移动端保存地址
      var trustHosts = true;
      var options = {};
      $cordovaFileTransfer.download(data.androidDownloadUrl, targetPath, options, trustHosts).then(
        function (result) {
        $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
        ).then(function () {
          // 成功
        }, function (err) {
          console.log(err);
        });
        $ionicLoading.hide();
      },
        function (err) {
        $ionicLoading.show({
          template: "下载失败"
        });
        alert(err.exception);
        $ionicLoading.hide();
      },
        function (progress) {
        $timeout(function () {
          var downloadProgress = (progress.loaded / progress.total) * 100;
          $ionicLoading.show({
            template: "已经下载：" + Math.floor(downloadProgress) + "%"
          });
          if (downloadProgress > 99) {
            $ionicLoading.hide();
          }
        });
      });

    }
    //app内更新
    function updateWWW(){
      /*chcp.fetchUpdate(function(error, data){
        if (error) {
          console.log('Failed to load the update with error code: ' + error.code);
          console.log(error.description);
          return;
        } else {
          chcp.installUpdate(function(error){
            if (error) {
              console.log('Failed to install the update with error code: ' + error.code);
              console.log(error.description);
            } else {
              console.log('Update installed!');
            }
          });
        }
      });*/
    }
    return {
      toUpdate: toUpdate
    };
  }]);

