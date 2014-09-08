(function(){var e=[].slice;define(["i18n!media_comments","underscore","vendor/jquery.ba-tinypubsub","vendor/mediaelement-and-player","jquery","compiled/util/kalturaAnalytics"],function(t,a,i,n,d,o){var r,l,s,c,u,m;return l=550,r=448,d.extend(n.MediaElementDefaults,{pluginPath:"/images/mediaelement/",defaultVideoWidth:l,defaultVideoHeight:r}),INST.enableHtml5FirstVideos||(n.MepDefaults.mode="auto_plugin"),n.MepDefaults.success=function(e){return o(this.mediaCommentId,e,INST.kalturaSettings),e.play()},n.MepDefaults.features.push("googleanalytics"),m=n.MepDefaults.features.indexOf("tracks")+1,n.MepDefaults.features.splice(m,0,"speed"),c=function(e){var t;return t=new d.Deferred,d.getJSON("/media_objects/"+e+"/info",function(e){var i,d,o,r;return d=function(){var t,a,n,d;for(n=e.media_sources,d=[],t=0,a=n.length;a>t;t++)i=n[t],"audio/mp3"!==i.content_type&&d.push("<source type='"+i.content_type+"' src='"+i.url+"' />");return d}(),o=a.map(e.media_tracks,function(e){var t;return t=n.language.codes[e.locale]||e.locale,"<track kind='"+e.kind+"' label='"+t+"' src='"+e.url+"' srclang='"+e.locale+"' />"}),r=a.map(e.media_sources,function(e){return e.content_type}),t.resolve({sources:d,tracks:o,types:r,can_add_captions:e.can_add_captions})}),t},s=function(e){var t,a,i,o,r,l,s,c,u;return r=e.sourcesAndTracks,o=e.mediaType,a=e.height,c=e.width,i=e.mediaPlayerOptions,s="video"===o?"video":"audio",l=r.sources.concat(r.tracks).join(""),t=function(e){return d("<"+e+" "+("video"===o?"width='"+c+"' height='"+a+"'":"")+" controls>"+l+"</"+e+">")},u=function(){var e,a;return e=d.extend({mode:"auto"},n.MediaElementDefaults,n.MepDefaults,i),a=n.HtmlMediaElementShim.determinePlayback(t("audio")[0],e,n.MediaFeatures.supportsMediaTag,!0,null),"native"!==a.method},"audio"===o&&r.types[0].match(/^video\//)&&u()&&(s="video",i.mode="auto_plugin",i.isVideo=!1,i.videoHeight=a=30),t(s)},u={create:function(e,t,a,n){var o;return d("#media_recorder_container").removeAttr("id"),this.attr("id","media_recorder_container"),i.unsubscribe("media_comment_created"),i.subscribe("media_comment_created",function(e){return t(e.id,e.mediaType)}),o={modal:!1,defaultTitle:n},d.isFunction(a)&&(o.close=a.bind(this)),d.mediaComment.init(e,o)},show_inline:function(e,a,i){var n,o,r,u,m;return null==a&&(a="video"),n=d(this).closest(".instructure_file_link_holder").andSelf().first(),n.text(t.t("loading","Loading media...")),m=function(e){var i,d;return d=Math.min(n.closest("div,p,table").width()||l,l),i=Math.round(d/336*240),c(e).done(function(o){var r,l,c;return o.sources.length?(l={can_add_captions:o.can_add_captions,mediaCommentId:e,googleAnalyticsTitle:e},r=s({sourcesAndTracks:o,mediaPlayerOptions:l,mediaType:a,height:i,width:d}),r.appendTo(n.html("")),c=new MediaElementPlayer(r,l),r.data("mediaelementplayer",c)):n.text(t.t("media_still_converting","Media is currently being converted, please try again in a little bit."))})},"maybe"===e?(o=i.replace(/\/download.*/,""),r=function(){return n.text(t.t("messages.file_failed_to_load","This media file failed to load"))},u=function(e){var t;return"maybe"!==(null!=(t=e.attachment)?t.media_entry_id:void 0)?(n.text(""),m(e.attachment.media_entry_id)):r()},d.ajaxJSON(o,"GET",{},u,r)):m(e)},show:function(e,a){var i,n,o,r,u,m;return n=d(this),(o=n.data("media_comment_dialog"))?o.dialog("open"):(u=35,a=a||"video",r="video"===a?426:180,m="video"===a?l:400,i=d('<div style="overflow: hidden; padding: 0;" />'),"audio"===a&&i.css("padding-top","120px"),i.dialog({title:t.t("titles.play_comment","Play Media Comment"),width:m,height:r,modal:!1,resizable:!1,close:function(){return n.data("mediaelementplayer").pause()}}),i.disableWhileLoading(c(e).done(function(d){var o,l;return d.sources.length?(l={can_add_captions:d.can_add_captions,mediaCommentId:e,googleAnalyticsTitle:e},o=s({sourcesAndTracks:d,mediaPlayerOptions:l,mediaType:a,height:r-u,width:m}),o.appendTo(i.html("")),n.data({mediaelementplayer:new MediaElementPlayer(o,l),media_comment_dialog:i})):i.text(t.t("media_still_converting","Media is currently being converted, please try again in a little bit."))})))}},d.fn.mediaComment=function(){var t,a;return t=arguments[0],a=2<=arguments.length?e.call(arguments,1):[],INST.kalturaSettings?(u[t].apply(this,a),this):console.log("Kaltura has not been enabled for this account")}})}).call(this);