(function(){define(["ember","vendor/d3.v3","../../../shared/seconds_to_time"],function(t,r,o){var e,i;return e=r.max,i=r.sum,t.ObjectController.extend({ratioFor:function(r){var o;return o=parseFloat(this.get("quiz.pointsPossible")),o>0?t.Util.round(this.get(r)/o*100,0):0},avgScoreRatio:function(){return this.ratioFor("avgScore")}.property("avgScore"),highScoreRatio:function(){return this.ratioFor("highScore")}.property("highScore"),lowScoreRatio:function(){return this.ratioFor("lowScore")}.property("lowScore"),formattedAvgDuration:function(){return o(this.get("avgDuration"))}.property("avgDuration"),scoreChartData:function(){var r,o,n,s,a,c;for(s=t.A(),n=this.get("submissionStatistics.scores")||{},r=e(t.keys(n).map(function(t){return parseInt(t,10)})),o=a=0,c=e([100,r]);c>=0?c>=a:a>=c;o=c>=0?++a:--a)s[o]=n[""+o]||0;return s[100]=i(s.splice(100,s.length)),s}.property("submissionStatistics")})})}).call(this);