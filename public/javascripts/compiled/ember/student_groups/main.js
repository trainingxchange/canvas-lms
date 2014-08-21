(function() {
  define(["ember", "compiled/ember/student_groups/config/app", "compiled/ember/student_groups/config/routes", "compiled/ember/student_groups/adapters/group_adapter", "compiled/ember/student_groups/adapters/membership_adapter", "compiled/ember/student_groups/controllers/group_controller", "compiled/ember/student_groups/controllers/new_group_controller", "compiled/ember/student_groups/controllers/student_groups_controller", "compiled/ember/student_groups/controllers/user_controller", "compiled/ember/student_groups/controllers/users_controller", "compiled/ember/student_groups/models/group", "compiled/ember/student_groups/models/membership", "compiled/ember/student_groups/routes/student_groups_route", "compiled/ember/student_groups/serializers/application_serializer", "compiled/ember/student_groups/templates/application", "compiled/ember/student_groups/templates/new_group", "compiled/ember/student_groups/templates/student_groups"], function(Ember, App, routes, GroupAdapter, MembershipAdapter, GroupController, NewGroupController, StudentGroupsController, UserController, UsersController, Group, Membership, StudentGroupsRoute, ApplicationSerializer) {
    App.initializer({
      name: 'routes',
      initialize: function(container, application) {
        return application.Router.map(routes);
      }
    });
    return App.reopen({
      GroupAdapter: GroupAdapter,
      MembershipAdapter: MembershipAdapter,
      GroupController: GroupController,
      NewGroupController: NewGroupController,
      StudentGroupsController: StudentGroupsController,
      UserController: UserController,
      UsersController: UsersController,
      Group: Group,
      Membership: Membership,
      StudentGroupsRoute: StudentGroupsRoute,
      ApplicationSerializer: ApplicationSerializer
    });
  });

}).call(this);
