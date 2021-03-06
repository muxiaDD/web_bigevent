tinymce.init({
    selector: '#mz-tinymce',
    language: 'zh_CN', //调用放在langs文件夹内的语言包
    height: 300,
    //plugins: ['table','preview' ], //选择需加载的插件
    plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern  autosave bdmap indent2em autoresize lineheight formatpainter axupimgs',
    toolbar1: 'code undo redo| forecolor backcolor bold italic underline strikethrough hr|' +
        '|alignleft aligncenter alignright alignjustify|table image media| insertdatetime preview fullscreen',
    min_height: 400,
    fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
    font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
    importcss_append: true,
    autosave_ask_before_unload: false,
    convert_urls: false,
    //图片上传操作
    images_upload_handler: function(blobInfo, succFun, failFun) {
        var xhr, formData;
        var file = blobInfo.blob(); //转化为易于理解的file对象
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        // image_upload_url 为定义的上传路径，查看 “application\cms\view\layouts\cms.html”
        var image_upload_url = "/api/upload/img_file";
        xhr.open('POST', image_upload_url);
        xhr.onload = function() {
            var json;
            if (xhr.status != 200) {
                failFun('HTTP Error: ' + xhr.status);
                return;
            }
            json = JSON.parse(xhr.responseText);

            if (!json || json.status != 1) {
                failFun('Invalid JSON: ' + xhr.responseText);
                return;
            }
            var fullImgUrl = json.data.full_url;
            succFun(fullImgUrl);
        };
        formData = new FormData();
        formData.append('file', file, file.name); //此处与源文档不一样
        xhr.send(formData);
    },
    //处理表单ajax提交不保存信息的情况
    setup: function(editor) {
        editor.on('change', function() { editor.save(); });
    },
});