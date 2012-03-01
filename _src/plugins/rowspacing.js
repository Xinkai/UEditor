///import core
///import commands\paragraph.js
///commands 段间距
///commandsName  RowSpacing
///commandsTitle  段间距
/**
 * @description 设置行距
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     rowspacing设置行间距
 * @param   {String}   value              值，以px为单位
 * @author zhanyi
 */
UE.commands['rowspacing'] =  {
    execCommand : function( cmdName,value ) {
        this.execCommand('paragraph','p',{style:'margin:'+value + 'px 0'});
        return true;
    },
    queryCommandValue : function() {
        var pN = utils.findNode(this.selection.getStartElementPath(),null,function(node){return domUtils.isBlockElm(node) }),
            value;
        //trace:1026
        if(pN){
            value = domUtils.getComputedStyle(pN,'margin-top').replace(/[^\d]/g,'');
            return !value ? 0 : value;
        }
        return 0;

    },
    queryCommandState : function(){
        return this.highlight ? -1 :0;
    }
};

