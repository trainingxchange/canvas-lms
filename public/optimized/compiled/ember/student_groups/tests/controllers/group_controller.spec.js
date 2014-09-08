(function(){define(["../start_app","ember","ic-ajax","../../controllers/group_controller","../../controllers/student_groups_controller","helpers/fakeENV"],function(e,t,r,n,s,o){var u,c;return u=null,c=t.run,module("group_controller",{setup:function(){var t=this;return o.setup(),u=e(),c(function(){return t.sgc=s.create()}),c(function(){return t.gc=n.create({parentController:t.sgc,showBody:!1})}),c(function(){return t.group={id:1,name:"one",group_category_id:2,users:[{id:1,name:"steve"},{id:2,name:"cliff"},{id:3,name:"walt"},{id:4,name:"pinkman"}]},t.gc.set("content",t.group),t.gc.set("group",t.group)})},teardown:function(){var e=this;return c(function(){return o.teardown(),e.gc.destroy(),e.sgc.destroy()}),t.run(u,"destroy")}}),test("should show body while searching",function(){return equal(this.gc.get("showBody"),!1),this.sgc.set("filterText","abc"),equal(this.gc.get("showBody"),!0)}),test("member count should sum the users",function(){return equal(this.gc.get("memberCount"),this.group.users.length)}),asyncTest("toggleBody should change show body if the group has members",function(){return expect(1),t.run(this,function(){return start(),this.gc.send("toggleBody"),equal(this.gc.get("showBody"),!0)})}),test("leave should remove the current user from the group",function(){return ENV.current_user_id=1,r.defineFixture("/api/v1/groups/1/memberships/self",{response:{id:"1"},textStatus:"success",jqXHR:{}}),this.gc.send("leave",this.group),equal(this.gc.get("users").length,3)})})}).call(this);