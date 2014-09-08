(function(){define(["ember","vendor/d3.v3"],function(t,r){return t.View.extend({radius:80,CIRCLE:2*Math.PI,FMT_PERCENT:r.format("%"),renderChart:function(){var t,e;return e=this.get("controller.correctResponseRatio"),this.arc=r.svg.arc().innerRadius(this.radius/2).outerRadius(this.radius/2.5).startAngle(0),this.svg=r.select(this.$("svg")[0]).attr("width",this.radius).attr("height",this.radius).append("g").attr("transform","translate("+this.radius/2+","+this.radius/2+")"),t=this.svg.append("path").datum({endAngle:this.CIRCLE}).attr("class","background").attr("d",this.arc),this.foreground=this.svg.append("path").datum({endAngle:this.CIRCLE*e}).attr("class","foreground").attr("d",this.arc),this.text=this.svg.append("text").attr("text-anchor","middle").attr("dy",".35em").text(this.FMT_PERCENT(e))}.on("didInsertElement"),removeChart:function(){return this.svg.remove()}.on("willDestroyElement")})})}).call(this);