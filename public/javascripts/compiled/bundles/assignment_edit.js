(function() {
  require(['compiled/models/Section', 'compiled/models/Assignment', 'compiled/views/assignments/EditHeaderView', 'compiled/views/assignments/EditView', 'compiled/collections/SectionCollection', 'compiled/models/DueDateList', 'compiled/views/assignments/DueDateList', 'compiled/views/assignments/DueDateOverride', 'compiled/views/assignments/AssignmentGroupSelector', 'compiled/views/assignments/GradingTypeSelector', 'compiled/views/assignments/GroupCategorySelector', 'compiled/views/assignments/PeerReviewsSelector', 'grading_standards', 'manage_groups'], function(Section, Assignment, EditHeaderView, EditView, SectionCollection, DueDateList, DueDateListView, OverrideView, AssignmentGroupSelector, GradingTypeSelector, GroupCategorySelector, PeerReviewsSelector) {
    var assignment, assignmentGroupSelector, dueDateList, editHeaderView, editView, gradingTypeSelector, groupCategorySelector, peerReviewsSelector, sectionList;

    ENV.ASSIGNMENT.assignment_overrides = ENV.ASSIGNMENT_OVERRIDES;
    assignment = new Assignment(ENV.ASSIGNMENT);
    assignment.urlRoot = ENV.URL_ROOT;
    sectionList = new SectionCollection(ENV.SECTION_LIST);
    dueDateList = new DueDateList(assignment.get('assignment_overrides'), sectionList, assignment);
    assignmentGroupSelector = new AssignmentGroupSelector({
      parentModel: assignment,
      assignmentGroups: (typeof ENV !== "undefined" && ENV !== null ? ENV.ASSIGNMENT_GROUPS : void 0) || []
    });
    gradingTypeSelector = new GradingTypeSelector({
      parentModel: assignment
    });
    groupCategorySelector = new GroupCategorySelector({
      parentModel: assignment,
      groupCategories: (typeof ENV !== "undefined" && ENV !== null ? ENV.GROUP_CATEGORIES : void 0) || []
    });
    peerReviewsSelector = new PeerReviewsSelector({
      parentModel: assignment
    });
    editHeaderView = new EditHeaderView({
      el: '#edit_assignment_header',
      model: assignment
    });
    editView = new EditView({
      el: '#edit_assignment_form',
      model: assignment,
      assignmentGroupSelector: assignmentGroupSelector,
      gradingTypeSelector: gradingTypeSelector,
      groupCategorySelector: groupCategorySelector,
      peerReviewsSelector: peerReviewsSelector,
      views: {
        'js-assignment-overrides': new OverrideView({
          model: dueDateList,
          views: {
            'due-date-overrides': new DueDateListView({
              model: dueDateList
            })
          }
        })
      }
    });
    editHeaderView.render();
    return editView.render();
  });

}).call(this);
