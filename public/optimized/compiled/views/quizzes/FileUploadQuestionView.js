(function(){var e=function(e,t){return function(){return e.apply(t,arguments)}},t={}.hasOwnProperty,i=function(e,i){function o(){this.constructor=e}for(var s in i)t.call(i,s)&&(e[s]=i[s]);return o.prototype=i.prototype,e.prototype=new o,e.__super__=i.prototype,e};define(["Backbone","jquery","jst/quizzes/fileUploadQuestionState","jst/quizzes/fileUploadedOrRemoved","underscore","jquery.instructure_forms","jquery.disableWhileLoading"],function(t,o,s,r,l){var n,a,p;return a=t.View,n=function(t){function n(){return this.deleteAttachment=e(this.deleteAttachment,this),this.processAttachment=e(this.processAttachment,this),this.removeFileStatusMessage=e(this.removeFileStatusMessage,this),this.render=e(this.render,this),this.openFileBrowser=e(this.openFileBrowser,this),this.checkForFileChange=e(this.checkForFileChange,this),p=n.__super__.constructor.apply(this,arguments)}return i(n,t),n.prototype.els={".file-upload":"$fileUpload",".file-upload-btn":"$fileDialogButton",".attachment-id":"$attachmentID",".file-upload-box":"$fileUploadBox"},n.prototype.events={"change input[type=file]":"checkForFileChange","click .file-upload-btn":"openFileBrowser","click .delete-attachment":"deleteAttachment"},n.prototype.checkForFileChange=function(e){var t,i;return e.preventDefault(),e.stopPropagation(),(i=this.$fileUpload.val())?(this.removeFileStatusMessage(),this.model.set("file",this.$fileUpload[0]),t=this.model.save(null,{success:this.processAttachment}),this.$fileUploadBox.disableWhileLoading(t)):void 0},n.prototype.openFileBrowser=function(e){return e.preventDefault(),this.$fileUpload.click()},n.prototype.render=function(){var e;return n.__super__.render.apply(this,arguments),e=!!o.browser.msie,this.$fileUploadBox.html(s(l.extend({},this.model.present(),{isIE:e}))),this.$fileUpload=this.$(".file-upload"),this},n.prototype.removeFileStatusMessage=function(){return this.$fileUploadBox.siblings(".file-status").remove()},n.prototype.processAttachment=function(){return this.$attachmentID.val(this.model.id).trigger("change"),this.$fileUploadBox.addClass("file-upload-box-with-file"),this.render(),this.$fileUploadBox.parent().append(r(l.extend({},this.model.present(),{fileUploaded:!0})))},n.prototype.deleteAttachment=function(e){var t;return e.preventDefault(),this.$attachmentID.val("").trigger("change"),this.$fileUploadBox.removeClass("file-upload-box-with-file"),t=this.model.present(),this.model.clear(),this.removeFileStatusMessage(),this.render(),this.$fileUploadBox.parent().append(r(t))},n}(a)})}).call(this);