// $Id$

/**
 * The base DrupalTerminal namespace.
 */
DrupalTerminal = {
  visible: 0
};

if (Drupal.jsEnabled) {
  $(document).ready(function() {
    // Attach the terminal to the bottom, hidden by default
    $('html').append('<div id="terminal-container" style="display: none"></div>').append('<img id="terminal-corner" src="images/bar.png" />');

    // Corner recover icon
    $('#terminal-corner').text('^---');

    var user = Drupal.settings['terminal']['user'];
    var host = Drupal.settings['terminal']['server'];
    var sitename = Drupal.settings['terminal']['sitename'];
    var welcome_message = 'Welcome to ' + sitename + '!';
    var prompt = user + '@' + host + ' >';

    $('#terminal-container').terminal(Drupal.settings.basePath + '?q=terminal/input', {custom_prompt : prompt, hello_message : welcome_message});

    // See whether or not we should display the terminal on page load.
    DrupalTerminal.visible = jQuery.cookie ? $.cookie('DrupalTerminal') : 0;
    if (DrupalTerminal.visible == 1) {
      $('#terminal-container').show();
      $('#terminal-corner').hide();
    }
    else {
      $('#terminal-container').hide();
      $('#terminal-corner').show();
    }

    // Register the terminal events.
    $('#terminal-container').dblclick( function() {
      DrupalTerminal.close();
    });
    $('#terminal-corner').click( function() {
      DrupalTerminal.open();
    });
    if (window.addEventListener) {
      window.addEventListener("keydown", function(e) {
        if (e.keyCode == 192) {
          DrupalTerminal.toggle();
        }
      }, true);
    }
  });
}

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
  $('#terminal-container').slideDown("slow", function() {
    $('#terminal-corner').hide();
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
  $('#terminal-container').slideUp("slow", function() {
    $('#terminal-corner').show();
  });
  if (jQuery.cookie) {
    $.cookie('DrupalTerminal', 0);
  }
  return DrupalTerminal.visible = 0;
};
