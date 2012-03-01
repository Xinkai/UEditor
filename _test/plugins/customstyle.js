/**
 *
 */
module( 'plugins.ccustomstyle' );

test( 'block的元素', function () {
        var editor = te.obj[0];
        editor.setContent( '<p>xxxx</p>' );
        var range = editor.selection.getRange();
        range.selectNode( editor.body.firstChild ).select();
        editor.execCommand( 'customstyle', {
                style:'border:1px solid #ccc',
                label:'aaa',
                tag:'h3'
        } );
        ua.manualDeleteFillData( editor.body );
        equal( editor.body.firstChild.getAttribute( 'label' ), 'aaa', '检查标签' );
        var hStyle = $( editor.body.firstChild );
        ok( hStyle.css( 'border-top-width' ) == '1px' && hStyle.css( 'border-bottom-width' ) == '1px' && hStyle.css( 'border-left-width' ) == '1px' && hStyle.css( 'border-right-width' ) == '1px', '检查边框宽' );
        ok( hStyle.css( 'border-top-style' ) == 'solid' && hStyle.css( 'border-bottom-style' ) == 'solid' && hStyle.css( 'border-left-style' ) == 'solid' && hStyle.css( 'border-right-style' ) == 'solid', '检查边框风格' );
        if ( ua.browser.ie )
                ok( hStyle.css( 'border-top-color' ) == '#ccc' && hStyle.css( 'border-bottom-color' ) == '#ccc' && hStyle.css( 'border-left-color' ) == '#ccc' && hStyle.css( 'border-right-color' ) == '#ccc', '检查边框颜色' );
        else
                ok( hStyle.css( 'border-top-color' ) == 'rgb(204, 204, 204)' && hStyle.css( 'border-bottom-color' ) == 'rgb(204, 204, 204)' && hStyle.css( 'border-left-color' ) == 'rgb(204, 204, 204)' && hStyle.css( 'border-right-color' ) == 'rgb(204, 204, 204)', '检查边框颜色' );
        range.selectNode( editor.body.firstChild ).select();
        editor.execCommand( 'customstyle', {
                style:'border:1px solid #ccc',
                label:'aaa',
                tag:'h3'
        } );
        ua.manualDeleteFillData( editor.body );
        /*trace 1732*/
        var p = editor.body.firstChild;
        equal( p.tagName.toLowerCase(), 'p', 'h3被去掉了' );
        equal( p.innerHTML, 'xxxx', '检查innerHTML' );
} );
