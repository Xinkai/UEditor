
UE.commands['snapscreen'] = {
    execCommand: function(){
        var me = this,
            editorOptions = me.options;
        
        if(!browser.ie){
                alert(editorOptions.messages.snapScreenNotIETip);
                return;
        }

        var onSuccess = function(rs){
            rs = eval("("+ rs +")");
            if(rs.state != 'SUCCESS'){
                alert(rs.state);
                return;
            }
            editor.execCommand('insertimage', {
                src: (editorOptions.snapscreenImgIsUseImagePath ? editorOptions.imagePath : '') + rs.url,
                floatStyle: editorOptions.snapscreenImgAlign
            });
        };
        var onStartUpload = function(){
            //开始截图上传
        };
        var onError = function(){
            alert(editorOptions.messages.snapScreenMsg);
        };
        try{
            var nativeObj = new ActiveXObject('Snapsie.CoSnapsie');
            nativeObj.saveSnapshot(editorOptions.snapscreenHost, editorOptions.snapscreenServerFile, editorOptions.snapscreenServerPort, onStartUpload,onSuccess,onError);
        }catch(e){
            me.snapscreenInstall.open();
        }
    },
    queryCommandState: function(){
        return this.highlight ? -1 :0;
    }
};
