
/**
 * The base DrupalTerminal namespace.
 */
(function ($) {
  DrupalTerminal = {
    visible: 0
  };

  $(document).ready(function() {
    $('body').append(Drupal.settings['terminal']['terminal']);
    // Corner recover icon
    var recover_text = '^---';

    var welcome_message = Drupal.settings['terminal']['welcome_message'];
    var prompt = Drupal.settings['terminal']['prompt'];

    $('#terminal-container .body').terminal(Drupal.settings.basePath + 'terminal/input', {custom_prompt : prompt, hello_message : welcome_message});

    // See whether or not we should display the terminal on page load.
    DrupalTerminal.visible = jQuery.cookie ? $.cookie('DrupalTerminal') : 0;
    if (DrupalTerminal.visible == 1) {
      $('#terminal-container .body').show();
      $('#terminal-container').height('200px');
    }
    else {
      $('#terminal-container .body').hide();
      $('#terminal-container').height('20px');
      $('#terminal-container .title').text('^---');
    }

    // Register the terminal events that happen on the title bar.
    $('#terminal-container .title').dblclick( function() {
      DrupalTerminal.toggle();
    });

    // We are also listening to the keyboard.
    if (window.addEventListener) {
      window.addEventListener("keydown", function(e) {
        // Key besides backspace
        if (e.keyCode == 192) {
          DrupalTerminal.toggle();
        }
      }, true);
    }
  });


  /**
   * Closes or displays the terminal depending on its current visibility.
   */
  DrupalTerminal.toggle = function() {
    if (DrupalTerminal.visible) {
      return DrupalTerminal.close();
    }
    else {
      return DrupalTerminal.open();
    }
  }

  /**
   * Opens the terminal.
   */
  DrupalTerminal.open = function() {
    $('#terminal-container .body').slideDown("slow", function() {
        $(this).show();
        $('#terminal-container').height('200px');
        $('#terminal-container .title').text('');
    });
    if (jQuery.cookie) {
      $.cookie('DrupalTerminal', 1);
    }
    return DrupalTerminal.visible = 1;
  };

  /**
   * Closes the terminal.
   */
  DrupalTerminal.close = function() {
    $('#terminal-container .body').slideUp("slow", function() {
        $('#terminal-container').height('20px');
        $('#terminal-container .title').text('^---');
        $(this).hide();
    });
    if (jQuery.cookie) {
      $.cookie('DrupalTerminal', 0);
    }
    return DrupalTerminal.visible = 0;
  };

})(jQuery);
