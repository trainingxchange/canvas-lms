(function() {
  require(['jquery', 'jquery.fancyplaceholder'], function($) {
    var $new_phone_form, $phone_select, $select_phone_form;

    $(".field-with-fancyplaceholder input").fancyPlaceholder();
    $("#login_form").find(":text:first").select();
    $select_phone_form = $("#select_phone_form");
    $new_phone_form = $("#new_phone_form");
    $phone_select = $select_phone_form.find("select");
    $phone_select.change(function(event) {
      if ($phone_select.val() === '{{id}}') {
        $select_phone_form.hide();
        return $new_phone_form.show();
      }
    });
    return $("#back_to_choose_number_link").click(function(event) {
      $new_phone_form.hide();
      $select_phone_form.show();
      $phone_select.find("option:first").attr("selected", "selected");
      return event.preventDefault();
    });
  });

}).call(this);
