(function() {
    function mySetup() {
        var div = document.body.appendChild( document.createElement( 'div' ) );
        div.id = 'test';
        te.dom.push( div );
    }

    var s = QUnit.testStart;
    QUnit.testStart = function() {
        s.apply( this, arguments );
        mySetup();
    };
})();