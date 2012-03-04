///import core
///commands 自动排版
///commandsName  autotypeset
///commandsTitle  自动排版
/**
 * 自动排版
 * @function
 * @name baidu.editor.execCommands
 */

UE.plugins['autotypeset'] = function(){
    var me = this,
        opt = me.options.autotypeset,
        remainClass = {
            'selectTdClass':1,
            'pagebreak':1,
            'anchorclass':1
        },
        remainTag = {
            'li':1
        };
    function isLine(node,notEmpty){
        return node && node.parentNode && node.tagName == 'P' && ( notEmpty ? !domUtils.isEmptyBlock(node) : domUtils.isEmptyBlock(node))
    }

    function removeNotAttributeSpan(node){
        if(!node.style.cssText){
            domUtils.removeAttributes(node,['style']);
            if(node.tagName.toLowerCase() == 'span' && domUtils.hasNoAttributes(node)){
                domUtils.remove(node,true)
            }
        }
    }
    function autotype(type,html){
        var cont;
        if(html){
            if(!opt.pasteFilter)return;
            cont = me.document.createElement('div');
            cont.innerHTML = html.html;
        }else{
            cont = me.document.body;
        }
        var nodes = domUtils.getElementsByTagName(cont,'*'),
            highlightCont;

          // 行首缩进，段落方向，段间距，段内间距
        for(var i=0,ci;ci=nodes[i++];){
             //font-size
            if(opt.clearFontSize && ci.style.fontSize){
                ci.style.fontSize = '';
                removeNotAttributeSpan(ci)

            }
            //font-family
            if(opt.clearFontFamily && ci.style.fontFamily){
                ci.style.fontFamily = '';
                removeNotAttributeSpan(ci)
            }

            if(isLine(ci)){
                //合并空行
                if(opt.mergeEmptyline ){
                    var next = ci.nextSibling;
                    while(isLine(next)){
                        ci = next;
                        next = ci.nextSibling;
                        domUtils.remove(ci);
                    }

                }
                 //去掉空行，保留占位的空行
                if(opt.removeEmptyline && ci.parentNode && !remainTag[ci.parentNode.tagName.toLowerCase()] && domUtils.isEmptyNode(ci)){
                    domUtils.remove(ci);
                    continue;

                }

            }
            if(isLine(ci,true) ){
                if(opt.indent)
                    ci.style.textIndent = opt.indentValue;
                if(opt.textAlign)
                    ci.style.textAlign = opt.textAlign;
                if(opt.lineHeight)
                    ci.style.lineHeight = opt.lineHeight + '%';
                if(opt.rowSpacing)
                    ci.style.margin = opt.rowSpacing + 'px 0'

            }

            //去掉class,保留的class不去掉
            if(opt.removeClass && ci.className && !remainClass[ci.className.toLowerCase()]){
                if(!highlightCont && ci.tagName == 'DIV' && ci.getAttribute('highlighter')){
                    highlightCont = ci;
                }

                if(highlightCont && highlightCont.contains(ci)){
                     continue;
                }
                domUtils.removeAttributes(ci,['class'])
            }

            //表情不处理
            if(opt.imageBlockLine && ci.tagName.toLowerCase() == 'img' && !ci.getAttribute('emotion')){
                var range = me.selection.getRange();
                range.selectNode(ci).select();
                me.execCommand('imagefloat',opt.imageBlockLine);
            }

            //去掉冗余的标签
            if(opt.removeEmptyNode){
                if(opt.removeTagNames[ci.tagName.toLowerCase()] && domUtils.hasNoAttributes(ci) && domUtils.isEmptyBlock(ci)){
                    domUtils.remove(ci)
                }
            }
        }
        if(html)
            html.html = cont.innerHTML
    }

    if(opt.pasteFilter){
        me.addListener('beforepaste',autotype);
    }

    me.commands['autotypeset'] = {
        execCommand:function () {
            var range = me.selection.getRange(),
                bk = range.createBookmark();
            autotype();
            range.moveToBookmark(bk).select();
        }
    };

};

