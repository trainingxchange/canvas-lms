(function(){require(["i18n!rubrics.show","jquery","jquery.instructure_misc_plugins"],function(r,i){return i(document).ready(function(){return i("#right-side .edit_rubric_link").click(function(r){return r.preventDefault(),i(".rubric:visible:first .edit_rubric_link").click()}),i("#right-side .delete_rubric_link").click(function(e){var t;return e.preventDefault(),t=function(){return location.href=i(".rubrics_url").attr("href")},t.confirmationMessage=r.t("prompts.are_you_sure_delete","Are you sure you want to delete this rubric? Any course currently associated with this rubric will still have access to it, but, no new courses will be able to use it."),i(".rubric:visible:first .delete_rubric_link").triggerHandler("click",t)}),i(document).fragmentChange(function(r,e){return"#edit"===e?i("#right-side .edit_rubric_link").click():void 0})})})}).call(this);