define("translations/site_admin",["i18nObj","jquery"],function(e,t){t.extend(!0,e,{translations:{ar:{site_admin:{columns:{date:"التاريخ",value:"القيمة"},links:{over_time:"بمرور الوقت"},status:{loading:"جارٍ التحميل..."},titles:{value_over_time:"%{value} بمرور الوقت"}}},de:{site_admin:{columns:{date:"Datum",value:"Wert"},links:{over_time:"im Verlauf der Zeit"},status:{loading:"Ladevorgang läuft..."},titles:{value_over_time:"%{value} Im Verlauf der Zeit"}}},"en-AU":{site_admin:{columns:{date:"Date",value:"Value"},links:{over_time:"over time"},status:{loading:"loading..."},titles:{value_over_time:"%{value} Over Time"}}},"en-GB":{site_admin:{columns:{date:"Date",value:"Value"},links:{over_time:"over time"},status:{loading:"loading..."},titles:{value_over_time:"%{value} Over time"}}},es:{site_admin:{columns:{date:"Fecha",value:"Valor"},links:{over_time:"en el tiempo"},status:{loading:"cargando..."},titles:{value_over_time:"%{value} en el tiempo"}}},"fa-IR":{site_admin:{columns:{date:"تاریخ",value:"مقدار"},links:{over_time:"در طول زمان"},status:{loading:"درحال بارگذاری..."},titles:{value_over_time:"%{value} در طول زمان"}}},fr:{site_admin:{columns:{date:"Date",value:"Valeur"},links:{over_time:"sur la durée"},status:{loading:"chargement..."},titles:{value_over_time:"%{value} sur la durée"}}},ja:{site_admin:{columns:{date:"日付",value:"値"},links:{over_time:"経時変化"},status:{loading:"読み込んでいます..."},titles:{value_over_time:"%{value} 経時変化"}}},ko:{site_admin:{columns:{date:"날짜",value:"값"},links:{over_time:"시간 외"},status:{loading:"로드 중..."},titles:{value_over_time:"%{value} 시간 외"}}},nb:{site_admin:{columns:{date:"Dato",value:"Verdi"},links:{over_time:"over tid"},status:{loading:"laster..."},titles:{value_over_time:"%{value} over tid"}}},nl:{site_admin:{columns:{date:"Datum",value:"Waarde"},links:{over_time:"na verloop van tijd"},status:{loading:"laden..."},titles:{value_over_time:"%{value} te laat"}}},pl:{site_admin:{columns:{date:"Data",value:"Wartość"},links:{over_time:"z okresu"},status:{loading:"trwa ładowanie..."},titles:{value_over_time:"%{value} po czasie"}}},pt:{site_admin:{columns:{date:"Data",value:"Valor"},links:{over_time:"ao longo do tempo"},status:{loading:"carregando..."},titles:{value_over_time:"%{value} Ao longo do tempo"}}},"pt-BR":{site_admin:{columns:{date:"Data",value:"Valor"},links:{over_time:"ao longo do tempo"},status:{loading:"carregando..."},titles:{value_over_time:"%{value} Ao longo do tempo"}}},ru:{site_admin:{columns:{date:"Дата",value:"Значение"},links:{over_time:"за время"},status:{loading:"загрузка..."},titles:{value_over_time:"%{value} за время"}}},tr:{site_admin:{columns:{date:"Tarih",value:"Değer"},links:{over_time:"zamanla"},status:{loading:"yükleniyor..."},titles:{value_over_time:"%{value} Zaman İçinde"}}},zh:{site_admin:{columns:{date:"日期",value:"值"},links:{over_time:"超时"},status:{loading:"正在加载..."},titles:{value_over_time:"%{value} 超时"}}}}})}),define("site_admin",["i18n!site_admin","jquery","jquery.ajaxJSON","jqueryui/dialog","jquery.instructure_misc_helpers"],function(e,t){t(document).ready(function(){function a(a,i){t("#over_time_dialog").dialog({width:630,height:330}).dialog("option","title",e.t("titles.value_over_time","%{value} Over Time",{value:i}));var l=new google.visualization.DataTable;l.addColumn("date",e.t("columns.date","Date")),l.addColumn("number",i||e.t("columns.value","Value")),l.addColumn("string","title1"),l.addColumn("string","text1");var o=[];t.each(a,function(){var e=new Date;e.setTime(this[0]),o.push([e,this[1],void 0,void 0])}),l.addRows(o);var n=new google.visualization.AnnotatedTimeLine(document.getElementById("over_time"));n.draw(l,{displayAnnotations:!1})}t(".over_time_link").live("click",function(i){i.preventDefault();var l=t(this).attr("data-name"),o=t.replaceTags(t(".over_time_url").attr("href"),"attribute",t(this).attr("data-key"));o=t.replaceTags(o,"category",t(this).attr("data-category"));var n=t(this);n.text(e.t("status.loading","loading...")),t.ajaxJSON(o,"GET",{},function(i){n.text(e.t("links.over_time","over time")),t("#over_time_dialog .csv_url").attr("href",o+".csv"),a(i,l)},function(){n.text("error")})})})}),function(){require(["site_admin"])}.call(this),define("compiled/bundles/site_admin",function(){});