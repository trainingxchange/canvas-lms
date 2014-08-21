(function() {
  define(['jquery', 'compiled/widget/CustomList', 'jst/courseList/wrapper', 'jst/courseList/content', 'vendor/jquery.ba-tinypubsub'], function(jQuery, CustomList, wrapper, content) {
    var $;

    $ = jQuery;
    return {
      init: function() {
        return jQuery(function() {
          var $menu, $menuDrop, $menuTitle, loadCourses;

          $menu = jQuery('#menu_enrollments');
          $menuDrop = $menu.closest('.menu-item-drop');
          $menuTitle = $menuDrop.prev('.menu-item-title');
          if ($menu.length === 0) {
            return;
          }
          jQuery.subscribe('menu/hovered', loadCourses = function(elem) {
            var autoOpen;

            if (!$(elem).find($menu).find('.customListOpen').length) {
              return;
            }
            jQuery.unsubscribe('menu/hovered', loadCourses);
            autoOpen = false;
            $menu.delegate('.customListOpen', 'click', function() {
              return autoOpen = true;
            });
            return jQuery.getJSON('/all_menu_courses', function(enrollments) {
              var courseList;

              return courseList = new CustomList('#menu_enrollments', enrollments, {
                appendTarget: '#menu_enrollments .menu-item-customize',
                autoOpen: autoOpen,
                wrapper: wrapper,
                content: content,
                onToggle: function(state) {
                  return $menuDrop.toggleClass('menuCustomListEditing', state);
                }
              });
            });
          });
          return $menuTitle.click(function(e) {
            if (e.metaKey || e.ctrlKey) {
              return;
            }
            e.preventDefault();
            return $menuTitle.focus();
          });
        });
      }
    };
  });

}).call(this);
