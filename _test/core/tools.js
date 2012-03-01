(function() {
    function mySetup() {
        var div = document.body.appendChild( document.createElement( 'div' ) );
        div.id = 'test';

        var utils = baidu.editor.utils;
//        var editor = new baidu.editor.Editor({'UEDITOR_HOME_URL':'../../../'});
        var editor = new baidu.editor.Editor( {'plugins':['autofloat','basestyle'],'UEDITOR_HOME_URL':'../../../'} );
//                utils.loadJsFile(document,editor.options.UEDITOR_HOME_URL+"_src/ui/ui.js");
//        utils.loadJsFile(document,editor.options.UEDITOR_HOME_URL+"_src/plugins/autofloat/autofloat.js");
        editor.render( div );
        te.dom.push( div );
        te.obj.push( utils );
        te.obj.push( editor );
//        document.body.appendChild(div);
    }

    var s = QUnit.testStart;
    QUnit.testStart = function() {
        s.apply( this, arguments );
        mySetup();
    };
})()