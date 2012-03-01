(function (holder){
   
    var root = [];
    root.hash = {};
    root.refs = {};
    
    var lastId = 0;
    var hash = {};
    var all = {};
    function getId(path){
        return 'UTree_node:' + (hash[path] || (hash[path] = ++ lastId));
    }
    function read(record){
        var path = record[0];
        var parts = path.split('/');
        var id = getId(path);
        var newNode = [];
        newNode.hash = {};
        newNode.path = path;
        newNode.label = parts.pop();
        newNode.leaf = true;
        newNode.id = id;
        newNode.title = record[1];
        newNode.check = record[2];
        newNode.files = record[3];
        newNode.depds = record[4];
        newNode.refs = {};
        all[id] = newNode;
        var node = root;
        path = '';
        for (var i=0; i<parts.length; i++) {
            var part = parts[i];
            path += part + '/';
            var index1 = node.hash[part];
            if (index1) {
                node = node[index1 - 1];
            } else {
                var tmpNode = [];
                tmpNode.hash = {};
                tmpNode.path = path;
                tmpNode.label = part;
                if (part == '可选功能') {
                    tmpNode.expanded = 1;
                }
                tmpNode.depds = [];
                tmpNode.refs = {};
                tmpNode.id = 'UTree_node:' + getId(path);
                all[tmpNode.id] = tmpNode;
                tmpNode.parent = node;
                node.push(tmpNode);
                node.hash[part] = node.length;
                node = tmpNode;
            }
        }
        node.hash[newNode.label] = node.length;
        newNode.parent = node;
        node.push(newNode);
    }
    for (var i=0; i<records.length; i++) {
        read(records[i]);
    }
    function getContentsHTML(node){
        var buff = [];
        for (var i=0; i<node.length; i++) {
            buff[i] = getNodeHTML(node[i]);
        }
        return '<ul><li>' + buff.join('</li><li>') + '</li></ul>';
    }
    
    function getNodeHTML(node){
        var chk = node.check | 0;
        if (chk % 2) {
            node.checked = true;
        }
        if (chk > 1) {
            node.disabled = true;
        }
        var cls = 'UTree_node' +
            (node.disabled ? ' UTree_node-Disabled' : ' UTree_node-Enabled') +
            (node.leaf ? ' UTree_node-IsLeaf' : '') +
            (node.expanded ? ' UTree_node-Expanded' : ' UTree_node-Collapsed');
        return '<div' + (node.id ? ' id="' + node.id + '"' : '') + ' class="'+ cls + '"' + '>' +
            '<div class="UTree_node_plus UInlineBlock" onclick="window.theBuilder.plusClick(event, this);"></div>' +
            '<div class="UTree_node_checkbox UInlineBlock'+
            (node.checked ? ' UTree_node-Checked' : ' UTree_node-Unchecked') +
            '" onclick="window.theBuilder.checkBoxClick(event, this);"></div>' +
            '<span class="UTree_node_label" onclick="window.theBuilder.labelClick(event, this);">' + node.label + '</span>' +
            ( node.leaf ? '' : getContentsHTML(node) ) +
            '</div>';
    }
    function getTreeHTML(root){
        return '<div class="UTree">' +
        '<div class="UTree_node UTree_node-IsRoot UTree_node-Expanded">' +
        getContentsHTML(root) + '</div></div>';
    }
    holder.innerHTML = getTreeHTML(root);
    function isEmpty(hash){
        for (var k in hash) {
            if (hash.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
    function isFull(node){
        if (node.leaf) {
            return node.checked;
        }
        for (var i=0; i<node.length; i++) {
            if (!node[i].checked) {
                return false;
            }
        }
        return true;
    }

    window.theBuilder = {
        selectNode: function (node, refId){
            if (!refId) {
                node.checked = true;
                for (var i=0; i<node.length; i++) {
                    this.selectNode(node[i]);
                }
            } else {
                node.refs[refId] = 1;
            }
            if (!node.leaf && isFull(node)) {
                node.checked = true;
                node.mixed = false;
            } else {
                node.mixed = !node.checked && !isEmpty(node.refs);
            }
            this.updateNode(node);
            if (node.depds) {
                for (var j=0; j<node.depds.length; j++) {
                    var dNode = all[getId(node.depds[j])];
                    this.selectNode(dNode, node.id);
                }
            }
            var parent;
            while (parent = node.parent) {
                this.selectNode(parent, node.id);
                node = parent;
            }
        },
        updateNode: function (node){
            if (node === root) return;
            var el = document.getElementById(node.id).firstChild.nextSibling;
            if (node.mixed) {
                removeClass(el, 'UTree_node-Unchecked');
                removeClass(el, 'UTree_node-Checked');
                addClass(el, 'UTree_node-Mixed');
            } else if (node.checked) {
                removeClass(el, 'UTree_node-Unchecked');
                removeClass(el, 'UTree_node-Mixed');
                addClass(el, 'UTree_node-Checked');
            } else {
                removeClass(el, 'UTree_node-Checked');
                removeClass(el, 'UTree_node-Mixed');
                addClass(el, 'UTree_node-Unchecked')
            }
        },
        deselectNode: function (node, refId){
            if (!refId) {
                node.checked = false;
                for (var i=0; i<node.length; i++) {
                    this.deselectNode(node[i]);
                }
            } else {
                delete node.refs[refId];
            }
            if (!node.leaf) {
                node.checked = false;
            }
            node.mixed = !node.checked && !isEmpty(node.refs);
            this.updateNode(node);
            if (node.depds) {
                for (var j=0; j<node.depds.length; j++) {
                    var dNode = all[getId(node.depds[j])];
                    this.deselectNode(dNode, node.id);
                }
            }
            var parent;
            while (parent = node.parent) {
                this.deselectNode(parent, node.id);
                node = parent;
            }
        },
        checkBoxClick: function (evt, el){
            el = el.parentNode;
            var nodeId = el.id;
            var node = all[nodeId];
            if (node.disabled) {
                return;
            }
            if (!node.checked) {
                this.selectNode(node);
            } else {
                this.deselectNode(node);
            }
        },
        plusClick: function (evt, el){
            el = el.parentNode;
            if (hasClass(el, 'UTree_node-Collapsed')) {
                removeClass(el, 'UTree_node-Collapsed');
                addClass(el, 'UTree_node-Expanded');
            } else if (hasClass(el, 'UTree_node-Expanded')) {
                removeClass(el, 'UTree_node-Expanded');
                addClass(el, 'UTree_node-Collapsed');
            }
        },
        labelClick: function (evt, el){
            el = el.parentNode;
            this.checkBoxClick(evt, el.firstChild.nextSibling);
        },
        getSelectedFiles: function (){
            var files = [];
            var hash = {};
            function walk(node){
                if (!node) return;
                if (node.checked || node.mixed) {
                    if (node.depds) {
                        for (var k=0; k<node.depds.length; k++) {
                            walk(all[getId(node.depds[k])]);
                        }
                    }
                    if (node.files) {
                        files.push(node.files);
//                        alert(node.files)
//                        for (var j=0; j<node.files.length; j++) {
//                            var file = node.files[j];
//                            if (!hash[file]) {
//                                files.push(file);
//                                hash[file] = 1;
//                            }
//                        }
                    }
                }
                if (node.length) {
                    for (var i=0; i<node.length; i++) {
                        walk(node[i]);
                    }
                }
            }
            walk(root);
            return files;
        }
    };
    function hasClass(el, cls){
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    function addClass(el, cls){
        if (!hasClass(el, cls)) {
            el.className += ' ' + cls;
        }
    }
    function removeClass(el, cls){
        if (hasClass(el, cls)) {
            el.className = el.className.replace(new RegExp('\\s*' + cls + '\\s*', 'g'), ' ');
        }
    }
})(document.getElementById('tree'));