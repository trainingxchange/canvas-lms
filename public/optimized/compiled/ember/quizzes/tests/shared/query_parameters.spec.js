(function(){define(["../../shared/query_parameters"],function(e){var t;return module("QueryParameters"),t=function(e,t){return strictEqual(JSON.stringify(e),JSON.stringify(t))},test("#composeUrl: it adds a scalar parameter",function(){return equal(e.composeUrl("/items",{page:1}),"/items?page=1")}),test("#composeUrl: it adds an array parameter",function(){var t;return t=e.composeUrl("/items",{types:["fruit","vegetables"]}),equal(t,"/items?types[]=fruit&types[]=vegetables")}),test("#composeUrl: it adds a mix of scalar and array parameters",function(){var t;return t=e.composeUrl("/items",{page:1,types:["fruit","vegetables"]}),equal(t,"/items?page=1&types[]=fruit&types[]=vegetables")}),test("#extractParameters: it extracts nothing",function(){return t(e.extractParameters(""),{}),t(e.extractParameters("/items"),{}),t(e.extractParameters("/items?"),{}),t(e.extractParameters("/items?page"),{}),t(e.extractParameters("/items?page="),{}),t(e.extractParameters("/items?page=&"),{})}),test("#extractParameters: it extracts a scalar",function(){var r;return r=e.extractParameters("/items?page=1"),t(r,{page:"1"})}),test("#extractParameters: it extracts an array",function(){var r;return r=e.extractParameters("/items?types[]=fruit&types[]=vegetables"),t(r,{types:["fruit","vegetables"]})}),test("#extractParameters: it extracts a mix of scalars and arrays",function(){var r;return r=e.extractParameters("/items?page=1&types[]=fruit&types[]=vegetables"),t(r,{page:"1",types:["fruit","vegetables"]})}),test("#extractUrl: removes a single parameter",function(){var t;return t=e.extractUrl("/items?page=1"),strictEqual(t,"/items")}),test("#extractUrl: removes multiple parameters",function(){var t;return t=e.extractUrl("/items?page=1&page_size=20"),strictEqual(t,"/items")})})}).call(this);