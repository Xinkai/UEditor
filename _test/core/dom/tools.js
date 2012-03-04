(function() {
    function mySetup() {
        var div = document.body.appendChild( document.createElement( 'div' ) );
        div.id = 'test';

        var iframe = document.createElement( 'iframe' );
        document.body.appendChild( iframe );
        iframe.id = 'iframe';
        te.dom.push( div );
        te.dom.push( iframe );
        var range = new baidu.editor.dom.Range( document );
        var domUtils = baidu.editor.dom.domUtils;
        te.obj.push( range );
        te.obj.push( domUtils );
//        te.obj.push(Selection);
//        document.body.appendChild(div);
    }

    var s = QUnit.testStart;
    QUnit.testStart = function() {
        s.apply( this, arguments );
        mySetup();
    };
})()
