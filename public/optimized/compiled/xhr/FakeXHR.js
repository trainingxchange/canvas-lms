(function(){define(["jquery"],function(t){var e;return e=function(){function e(){this.readyState=0,this.timeout=0,this.withCredentials=!1}return e.prototype.setResponse=function(e){var s;this.readyState=4,this.responseText=e;try{this.response=t.parseJSON(e)}catch(r){return s=r,this.status=500,void(this.statusText="500 Internal Server Error")}return this.response.errors?(this.status=400,this.statusText="400 Bad Request"):(this.status=200,this.statusText="200 OK"),this.responseType="json"},e.prototype.abort=function(){},e.prototype.getAllResponseHeaders=function(){return this.responseText?"":null},e.prototype.getResponseHeader=function(){},e.prototype.open=function(){},e.prototype.overrideMimeType=function(){},e.prototype.send=function(){},e.prototype.setRequestHeader=function(){},e}()})}).call(this);