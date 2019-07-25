/* eslint-disable */
// C端运行js，绕过eslint检测
import './style.css';
import utils from './comm';
(function(window) {


    var fullData;
    try{
      fullData = (new Function('return '+ INIT_DATA +';'))();
    } catch(e){
      console.log(e)
    }
  
  var web_handler = window.web_handler;

// 右键处理
    var mouse_winow = [
            {id: 'p', name: '粘贴(P)', key: 'Ctrl+V', menu_id: 'paste'}
        ],
        mouse_app_comm = [
            {id: 't', name: '剪切(T)', key: 'Ctrl+X', menu_id: 'cut'},
            {id: 'c', name: '复制(C)', key: 'Ctrl+C', menu_id: 'copy'},
            {id: 'd', name: '删除(D)', key: 'Del', menu_id: 'delete'},
            {id: 'm', name: '重命名(M)', key: 'F2', menu_id: 'rename'},
            {id: 'r', name: '属性(R)', key: '', menu_id: 'property'}
        ],
        mouse_rar_add = [
            {id: 'a', name: '添加到压缩文件...(A)', key: '', menu_id: 'zip_to'},
            {id: 'e', name: '添加到 __NAME__.rar(E)', key: '', menu_id: 'zip_to_file'}
        ],
        mouse_rar_open = [
            {id: 'a', name: '解压文件...(A)', key: '', menu_id: 'unzip_to'},
            {id: 'x', name: '解压到当前文件夹(X)...', key: '', menu_id: 'unzip_to_current'},
            {id: 'e', name: "解压到 __NAME__\\ (E)", key: '', menu_id: 'unzip_to_folder'}
        ];

        var myDownload = {
          findIconsItem: function(id) {  
              var collection = vm.blocks['download']
              if(collection['vScrollData']) return _.find(collection['vScrollData'], function(icon){return icon.id === id})
              if(collection['pageData']) return _.find(collection['pageData'], function(icon){return icon.id === id})

              return false;
          },
          findIconsSed: function() {
            return this.findIconsItem(vm.currentSelected)
          },
          shortcutStart: function(menu_id) { // 组合：快捷键启动
              var item = this.findIconsSed();
              if(item && menu_id) {
                  vm.menu.show = false;
                  utils.menuApp(item.id, menu_id);
              }
          },
          shortcutKeyStart: function(key) { // 单键：快捷键启动
              if(! key) {
                  return;
              }
  
              // var $key = $('#menu_' + key + ':visible');
              // if($key.length) {
              //     $key.trigger('click');
              // }
          },
          renameItem: function(app_id, menu_id) {
              // var new_icos = [],
              //     app_name = '';
  
              // for(var i = 0, len = vm.icos.length; i < len; i++) {
              //     new_icos.push(vm.icos[i]);
  
              //     if(new_icos[i].id === app_id) {
              //         new_icos[i].rename = true;
              //         app_name = new_icos[i].text;
              //     }
              //     else {
              //         new_icos[i].rename = false;
              //     }
              // }
              var item = this.findIconsItem(app_id);
              if(item) vm.currentRename = item.id
              else return utils.log('图标名称为空或没有可重命名的图标');
  
  
      
  
              var kname = /\.[^\.]+/.exec(item.text);
              setTimeout(function() {
                  var $textarea = $('#js-ico-' + app_id).find('textarea')[0];
                  var selecteIndex = kname && kname.index ? kname.index : item.text.length
                  $textarea.setSelectionRange(0, selecteIndex);
              　　$textarea.focus();
              }, 10);
          },
          selectIconsItem: function(id) {
              vm.currentSelected = id
          },
          replaceZipName: function(name, arr) {
              var _arr = [];
              
              if(name.length > 10) {
                  name = name.substr(0, 10) + '...';
              }
  
              for(var i = 0, len = arr.length; i < len; i++) {
                  _arr.push(arr[i]);
                  _arr[i].name = _arr[i].name.replace(/__NAME__/, name);
              }
  
              return _arr;
          },
          getWindowXY: function() {
              var $win = $('body');
  
              return {
                  w: $win.width(),
                  h: $win.height()
              };
          },
          getMenuXY: function() {
              var $menu = $('.m-menu');
  
              return {
                  w: $menu.width(),
                  h: $menu.height()
              };
          },
          setMenuXY: function(offset_x, offset_y) {
              var new_x = 0,
                  new_y = 0,
                  offset = 40,
                  menu = this.getMenuXY(),
                  win = this.getWindowXY();
              var off_h = win.h - menu.h,
                  off_w = win.w - menu.w;
              
              if((offset_y + menu.h) > win.h) {
                  new_y = offset_y - (offset_y + menu.h - win.h) + offset;
              }
              else {
                  new_y = offset_y;
              }
  
              if((offset_x + menu.w) > win.w) {
                  new_x = offset_x - menu.w;
              }
              else {
                  new_x = offset_x;
              }            
  
              return {
                  x: new_x,
                  y: new_y
              };
          }
      };
  
  // 快捷键监听
  var shortcut_opts = {disable_in_input: true};

  shortcut.add('Ctrl+V',function() {
      vm.menu.show = false;
      utils.menuApp('', 'paste');
  }, shortcut_opts);

  shortcut.add('Ctrl+X',function() {
    myDownload.shortcutStart('cut');
  }, shortcut_opts);

  shortcut.add('Ctrl+C',function() {
    myDownload.shortcutStart('copy');
  }, shortcut_opts);

  shortcut.add('Delete',function() {
    myDownload.shortcutStart('delete');
  }, shortcut_opts);

  shortcut.add('F2',function() {
      var item = myDownload.findIconsSed();
      if(item) {
          vm.menu.show = false;
          myDownload.renameItem(item.id, 'rename');
      }
  }, shortcut_opts);

  shortcut.add('A', function() { // 解压
    myDownload.shortcutKeyStart('a');
  }, shortcut_opts);
  shortcut.add('X', function() { // 解压
    myDownload.shortcutKeyStart('x');
  }, shortcut_opts);
  shortcut.add('E', function() { // 解压
    myDownload.shortcutKeyStart('e');
  }, shortcut_opts);
  shortcut.add('T', function() { // 剪切
    myDownload.shortcutKeyStart('t');
  }, shortcut_opts);
  shortcut.add('C', function() { // 复制
    myDownload.shortcutKeyStart('c');
  }, shortcut_opts);
  shortcut.add('D', function() { // 删除
    myDownload.shortcutKeyStart('d');
  }, shortcut_opts);
  shortcut.add('M', function() { // 重命名
    myDownload.shortcutKeyStart('m');
  }, shortcut_opts);
  shortcut.add('R', function() { // 属性
    myDownload.shortcutKeyStart('r');
  }, shortcut_opts);
  shortcut.add('P', function() { // 粘贴
    myDownload.shortcutKeyStart('p');
  }, shortcut_opts);

  // 传输数据时已url编码
var customLocalFiles = []
  function decodeData(iconsData){
   return _.map(iconsData, function(ele){
     if(ele.iconsType === 'customIconList' && ele.icon_type === '0' && ele.app_path) {
      customLocalFiles.push(ele)
     }
    ele = _.mapObject(ele, function(value, key){
      var ret = decodeURIComponent(value)
      

      // 处理嵌套数据
      if(typeof value === 'object'){
        ret = _.mapObject(value, function(_value, _key){
          return decodeURIComponent(_value)
        })
      }
      return ret
    })
      return ele
    })
  }
  // origin和download 为键名储存对象，方便原生方法更具键名操作数据 
  // 上端图标 允许重复，故复制唯一id为iconId
  var parseFullData = function(data){
    var ret = {}
    for(var i = 0; i< data.length; i++) {
      var iconSize = data[i]['iconSize'] ? data[i].iconSize.split('*')[0] : 48
      var listWrapWidth = data[i].width - 20; // 容器有20padding
      var rowNum = Math.floor(data[i].width / iconSize / 1.5) || 1
      var liWidth = Math.floor(listWrapWidth / rowNum)
      var listWidth = rowNum * liWidth

      data[i].liWidth = liWidth;
      data[i].title = decodeURIComponent(data[i].title);
      data[i].listWidth = listWidth;
      data[i].iconSize = iconSize;
      data[i].rowNum = rowNum;
      if(data[i].name === 'module-downloadArea')  data[i].skin = 101
      data[i].skinClass = 'skin-' + data[i].skin;
      data[i].currentPageNo = 1;
      data[i].icons = decodeData(data[i].icons)
      
      data[i] = handleBlockData(data[i]);
      
      var key = i;
      if(data[i].name === 'module-origin') key = 'origin'
      if(data[i].name === 'module-downloadArea') key = 'download'
      ret[key] = data[i]
      
    }
    return ret
  };
  // 
  function handleBlockData(currentData){
      // 算出固定大小每页能放下的个数
        var iconList = currentData.icons
        var iconsNum = iconList.length
        var liHeight = Number(currentData.iconSize) + 35 + 16
        var wpHeight = skinTypeNoTitle.indexOf(Number(currentData.skin)) < 0 ? currentData.height - 40 - 10  : currentData.height  - 10 //无标题皮肤高度 
        var colNum = Math.floor(wpHeight / liHeight) || 1// 每列的个数,list有10px的margin-top
        currentData.pageCounts = Math.ceil(iconsNum / (colNum * currentData.rowNum)) // 加上添加图标


      if(skinTypeSlide.indexOf(currentData.skin) >= 0){
        var countsPerPage = colNum * currentData.rowNum
        currentData.pageData = _.chunk(currentData.icons, countsPerPage)
      }else{
        currentData.vScrollData = currentData.icons
      }
    return currentData
  }
  var skinTypeSlide = [5, 6, 7, 8];
  var skinTypeNoTitle = [-1,3,6,7,8]; // -1表示无标题的模块
  var specIcons = ["计算机", "回收站", "控制面板", "网络", "桌面文件", "IE浏览器", "我的文档"]
    var vm = new Vue({
        el: '#js-template',
        data: {
            skinTypeSlide : skinTypeSlide,
            skinTypeNoTitle : skinTypeNoTitle,
            icos:[],
            currentSelected:'', //当前选择的桌标
            currentRename:'', //正在重命名的
            blocks: [],
            blockProp: [],
            listStyle: [],
            localIcons:[],
            menu: {
              show: false,
              style: {
                  top: 0,
                  left: 0
              },
              list: []
          }

        },
        methods: {
            // web_handler.startAppByConfig(id)  适用类型 iconType: gamemenu   游戏菜单应用  
            // web_handler.startAppByLocalId(id)  ??
            // web_handler.startAppByLocalPath(path)  适用类型 iconType: customIconList   自定义
            // web_handler.startAppByLocalName(name)  适用类型 iconType: windows Windows desktop 客户机桌标
            // web_handler.openUrl(url)  适用类型 iconType: builtIn 内置应用
            startApp: function(app) {
              switch (app.iconsType){
                case 'gamemenu':
                  web_handler.startAppByConfig(JSON.stringify(app))
                  break
                case 'windows':
                  web_handler.startAppByLocalName(app.name);  
                  break
                case 'builtIn':
                  web_handler.openUrl(app.url);  
                  break
                case 'desktop':
                  web_handler.startAppByLocalName(app.text);  
                  break
                case 'customIconList':
                  web_handler.startAppByLocalPath(app.app_path);  
                  break
                case 'self':
                  web_handler.on_click(String(app.id));
                  break
                default:
                  web_handler.startAppByLocalId(app.id);   
              }
              // try {
              //   if(typeof app.double_click === 'undefined'){
              //     if(specIcons.indexOf(app.text) > -1) web_handler.startAppByLocalName(app.text)
              //     else if(app.app_path){
              //       app.app_path = decodeURIComponent(app.app_path)
              //       if(app.app_path.indexOf('http://') > -1 || app.app_path.indexOf('https://') > -1) web_handler.openUrl(app.app_path)
              //       else {
                      
              //         web_handler.startAppByLocalPath(app.app_path)
              //       }
              //     } 
              //     else if(app.url)  web_handler.openUrl(app.url)
              //     else web_handler.startAppByLocalId(app.id)
                  
              //   }
              //   else web_handler.on_click(String(app.id));
                
              // } catch (e) {
              //   utils.log(e.message) 
              // }  

            },
            selectApp: function(item) {
              try{
                web_handler.ondragStart(JSON.stringify(item));
              } catch (e) { utils.log(e.message) }
            },

            showMenu: function(event) {
            

              var _this = this;

              this.menu.style.top = '-9999px';
              this.menu.style.left = '-9999px';
              this.menu.show = true;

              
              var new_offset = myDownload.setMenuXY(event.pageX, event.pageY);
              _this.menu.style.top = new_offset.y + 'px';
              _this.menu.style.left = new_offset.x + 'px';
                  

          },

          mouseDesktop: function(event) {
          //   if(event.button === 2) { // 右键
          //       this.menu.list = mouse_winow;
          //       this.showMenu(event);

          //       event.preventDefault();
          //       event.stopPropagation();
          //   }
          //   else {
          //       this.menu.show = false;
          //   }
          //   debugger

          //  // myDownload.selectIconsItem(0); // Cancel icon's selected status

          //   return false;
          // 鼠标点窗体，重置选中、重命名状态
          var self = this
          setTimeout(function(){
            self.currentSelected = '';
            self.currentRename = '';
            self.menu.show = false;
          }, 5)
          
        },

          selectMenuItem: function(menu_id) { // 选择右键菜单
              var item = myDownload.findIconsSed(),
                  app_id = '';

              if(item) {
                  app_id = item.id;
              }

              if(menu_id === 'rename') {
                myDownload.renameItem(app_id, menu_id);
              }
              else {
                  utils.menuApp(app_id, menu_id);
                  myDownload.selectIconsItem(0);
              }

              this.menu.show = false;
          },
          mouseApp: function(app_id, event) {
            if(event.button === 2) { // 右键
                var item = myDownload.findIconsItem(app_id);
                
                if(! item) {
                    utils.log('没有找到该图标id：' + app_id);
                    return;
                }

                if(item.zip_type === 0) { // 压缩
                    this.menu.list = utils.mergeArr(myDownload.replaceZipName(item.text, mouse_rar_add), mouse_app_comm);
                }
                else if(item.zip_type === 1) { // 解压
                    this.menu.list = utils.mergeArr(myDownload.replaceZipName(item.text, mouse_rar_open), mouse_app_comm);
                }
                else if(item.zip_type === 2) {
                    this.menu.list = mouse_app_comm;
                }

                myDownload.selectIconsItem(app_id);
                
                this.showMenu(event);
            }
            else if(event.button === 0) { // 左键
                this.menu.show = false;
                this.currentRename = '';
                myDownload.selectIconsItem(app_id);
            }

            event.stopPropagation();
        },
        renameItem: function(app_id, new_name) {
            myDownload.renameItem(0);

            utils.menuApp(app_id, 'rename', new_name);
        },
        renameEnterItem: function(event, app_id) {
            event.target.blur();
        },
        // showSlide: function(){
        //   var ret = [];
        //     for(var i = 0; i < BLOCK_SKIN.length; i ++){
        //       ret[i] = BLOCK_SKIN[i]
        //     }
        //     this.blockProp = ret;
        // },
        initData: function(){
          this.blocks = parseFullData(fullData)
        },
        getCustomLocalFiles(){
        
          if(customLocalFiles.length){
            _.each(customLocalFiles,function(ele){
              var iconPath
              if(ele.app_path.indexOf('http://') === 0 || ele.app_path.indexOf('https://') === 0){
                var urlArr = ele.app_path.split("/")
                iconPath = urlArr[0] + "//" + urlArr[2]
              }else{
                iconPath = web_handler.getFileIcon(decodeURIComponent(ele.app_path))
              }
                 
                
                for(var k in vm.blocks){
                  if(vm.blocks.hasOwnProperty(k) && k !== 'download' && k !== 'origin'){
                    if(vm.blocks[k] && vm.blocks[k]['vScrollData']) vm.$set(vm.blocks[k], 'vScrollData', _.each(vm.blocks[k]['vScrollData'], function(icon){
                      if(icon.id === ele.id){
                      icon.img = iconPath;
                    }}))
                    if(vm.blocks[k] && vm.blocks[k]['pageData']) vm.$set(vm.blocks[k], 'pageData', _.each(vm.blocks[k]['pageData'], function(icon){
                      if(icon.id === ele.id){
                      icon.img = iconPath;
                    }}))
                  }
                }

                
              })
          }
        }
        },
        mounted: function(){
          this.initData();
          setTimeout(()=>{
            this.getCustomLocalFiles()
          }, 1000)
          try{
            web_handler && web_handler.loadFinished(); // 加载完通知
          }catch(e){console.log(e)}
        }
    });

    
    window.AddButton = function(jsons) {
      
        if(typeof jsons === 'string') {
            jsons = (new Function('return '+ jsons +';'))();
        }
        var blockKey = jsons.new_item ? 'download':'origin'
        // 如果blocks中无原桌标或下载区，返回
        if(!vm.blocks[blockKey]) return;
        var iconsKey = vm.skinTypeSlide.indexOf(vm.blocks[blockKey].skin) >= 0 ? 'pageData' : 'vScrollData'
      // 添加唯一
        var handleData = vm.blocks[blockKey][iconsKey]
        var result = _.chain(handleData)
                      .union(jsons.add_button).uniq(function(item, key, id){
                        return item.id
                      })
                      .map(function(item){
                        item.iconId = item.id
                        item.iconType = 'self'
                        return item
                      })
                      .value()
        // 如果是原桌标，需要执行屏蔽功能
        if(blockKey === 'origin' && vm.blocks['origin']['forbidedIcons']){
          var remoteBanIds = _.pluck(vm.blocks['origin']['forbidedIcons'], 'id')
          var banedIds = _.union(['brower_menu','center_left_top'], remoteBanIds)
    
          result = _.filter(result, function(item){
            return banedIds.indexOf(item.id) < 0
          })

          // 根据name来屏蔽
          var banedNames = []
          var it
          for (var i = 0; i < vm.blocks['origin']['forbidedIcons'].length; i++) {
            it = vm.blocks['origin']['forbidedIcons'][i]
            banedNames.push(it.name || it.text || it.app_name || it.barIconValue) // 兼容后端数据（万一数据不统一）
          }

          result = _.filter(result, function(item){
            return banedNames.indexOf(item.text) < 0
          })
        }
        // 拼装成 父层加子层结构，与初始时保持结构一致
        var copyDataStructure = _.clone(vm.blocks[blockKey]);
        copyDataStructure['icons'] = result
        vm.$set(vm.blocks, blockKey, handleBlockData(copyDataStructure))
    };

 
    window.RemoveButton = function(id) {
      if(! id) {
          utils.log('ID不合法[window.RemoveButton].');
          return;
      }
      for(var k in vm.blocks){
        if(vm.blocks.hasOwnProperty(k) && (k === 'download' || k === 'origin')){
          if(vm.blocks[k]['vScrollData']) vm.$set(vm.blocks[k], 'vScrollData', _.filter(vm.blocks[k]['vScrollData'], function(icon){return icon.id !== id}))
          if(vm.blocks[k]['pageData']) vm.$set(vm.blocks[k], 'pageData', _.filter(vm.blocks[k]['pageData'], function(icon){return icon.id !== id}))
        }
      }
      
  };

  window.UpdateButton = function(jsons) {
      if(typeof jsons === 'string') {
          jsons = (new Function('return '+ jsons +';'))();
      }
      if(! jsons.update_item || jsons.update_item.img === '') { // 图片地址，为空则不更新图片
          return;
      }

      for(var k in vm.blocks){
        if(vm.blocks.hasOwnProperty(k) && (k === 'download' || k === 'origin')){
          if(vm.blocks[k]['vScrollData']) vm.$set(vm.blocks[k], 'vScrollData', _.each(vm.blocks[k]['vScrollData'], function(icon){
            if(icon.id === jsons.update_item.id){
            icon.text = jsons.update_item.text;
            icon.img = jsons.update_item.img;
          }}))
          if(vm.blocks[k]['pageData']) vm.$set(vm.blocks[k], 'pageData', _.each(vm.blocks[k]['pageData'], function(icon){
            if(icon.id === jsons.update_item.id){
            icon.text = jsons.update_item.text;
            icon.img = jsons.update_item.img;
          }}))
        }
      }
  };

  window.SetRename = function(id) {
      if(! id)  {
          return;
      }

      myDownload.renameItem(id, 'rename');
  };



    // 屏蔽按键
    document.onkeydown = function() {
        if(window.event.keyCode === 27 || window.event.keyCode === 116) { // ESC || F5
            // window.event.keyCode = 0;
            window.event.returnValue = false;
            return false;
        }
    };



    // // 屏蔽右键
    document.body.oncontextmenu=function(){return false;};
    document.body.ondragstart=function(){return false;};
    document.body.onselectstart=function(){return false;};
    document.body.onbeforecopy=function(){return false;};
    document.body.oncopy=function(){document.selection.empty();};

    

}(window));
