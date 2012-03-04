/**

 */
(function() {
    function mySetup() {
        var div = document.body.appendChild( document.createElement( 'div' ) );
        $( div ).css( 'width', '500px' ).css( 'height', '500px' ).css( 'border', '1px solid #ccc' );
       
        var editor = new baidu.editor.Editor();
        editor.render( div );
        var range = new baidu.editor.dom.Range( editor.document );
        te.obj.push( editor );
        te.obj.push( range );
        te.dom.push( div );
    }

    var s = QUnit.testStart;
    QUnit.testStart = function() {
        s.apply( this, arguments );
        mySetup();
    };
})();