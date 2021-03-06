(function() {
  require(['jquery', 'underscore', 'compiled/models/Role', 'compiled/models/Account', 'compiled/collections/RolesCollection', 'compiled/views/roles/RolesOverrideIndexView', 'compiled/views/roles/AccountRolesView', 'compiled/views/roles/CourseRolesView', 'compiled/views/roles/ManageRolesView', 'compiled/views/roles/NewRoleView'], function($, _, Role, Account, RolesCollection, RolesOverrideIndexView, AccountRolesView, CourseRolesView, ManageRolesView, NewRoleView) {
    var account_permissions, account_roles, course_permissions, course_role_types, course_roles, rolesOverrideIndexView;

    account_roles = new RolesCollection(ENV.ACCOUNT_ROLES);
    course_roles = new RolesCollection(ENV.COURSE_ROLES);
    course_permissions = ENV.COURSE_PERMISSIONS;
    account_permissions = ENV.ACCOUNT_PERMISSIONS;
    course_role_types = [];
    _.each(ENV.COURSE_ROLES, function(role) {
      if (role.role === role.base_role_type) {
        return course_role_types.push({
          value: role.base_role_type,
          label: role.label
        });
      }
    });
    rolesOverrideIndexView = new RolesOverrideIndexView({
      el: '#content',
      showCourseRoles: !ENV.IS_SITE_ADMIN,
      views: {
        'account-roles': new AccountRolesView({
          views: {
            '#account_roles': new ManageRolesView({
              collection: account_roles,
              permission_groups: account_permissions
            }),
            'new-role': new NewRoleView({
              base_role_types: [
                {
                  value: 'AccountMembership',
                  label: 'AccountMembership'
                }
              ],
              admin_roles: true,
              collection: account_roles
            })
          }
        }),
        'course-roles': new CourseRolesView({
          views: {
            '#course_roles': new ManageRolesView({
              collection: course_roles,
              permission_groups: course_permissions
            }),
            'new-role': new NewRoleView({
              base_role_types: course_role_types,
              collection: course_roles
            })
          }
        })
      }
    });
    rolesOverrideIndexView.render();
    $('#section-tabs .permissions').addClass('active');
    $(document).on('click', function(event) {
      var container;

      container = $('.btn-group');
      if (container.has(event.target).length === 0 && !$(event.target).hasClass('.btn')) {
        return container.removeClass('open');
      }
    });
    return $(document).on('click', '.btn', function(event) {
      var previous_state,
        _this = this;

      event.preventDefault();
      previous_state = $(this).parent().hasClass('open');
      $('.btn-group').removeClass('open');
      if (previous_state === false && !$(this).attr('disabled')) {
        $(this).parent().addClass('open');
        $(this).siblings('.dropdown-menu').find('input').first().focus();
      }
      return $(document).on('keyup', function(event) {
        if (event.keyCode === 27) {
          $('.btn-group').removeClass('open');
          return $(_this).focus();
        }
      });
    });
  });

}).call(this);
