// $Id$

if (Drupal.jsEnabled) {
  $(document).ready(function() {
      // Attach the terminal to the bottom, hidden by default
      $('html').append('<div id="terminal-container" style="display: none"></div>').append('<div id="terminal-corner">');

      // Corner recover icon
      $('#terminal-corner').css({
        'position': 'fixed',
        'left': 0,
        'bottom': 0,
        'color': 'white',
        'background-color': 'black',
        'display': 'none',
        'padding': '3px'}).text('>_');

      var user = Drupal.settings['user'];
      var host = Drupal.settings['user'];
      var sitename = Drupal.settings['sitename'];
      var welcome_message = 'Welcome to ' + sitename + '!';
      var prompt = user + '@' + host + ' >';

      $('#terminal-container').height('200px');
      $('#terminal-container').terminal('index.php?q=terminal/input', {custom_prompt : prompt, hello_message : welcome_message});

      $.get('index.php?q=terminal/state', function(state) {
        if ('visible' == state) {
          $('#terminal-container').show();
        }
        else {
          $('#terminal-corner').show();
        }
      });


      // Attach click events
      DrupalTerminal.toggle();
  });
}

DrupalTerminal = new Object;

DrupalTerminal.toggle = function () {
  $('#terminal-container').dblclick( function() {
      $(this).toggle("slow", function() {
        $('#terminal-corner').show();
        DrupalTerminal.set('hidden');
        });
      });
  $('#terminal-corner').click( function() {
      $('#terminal-container').toggle("slow", function() {
        $('#terminal-corner').hide();
        DrupalTerminal.set('visible');
        });
      });
}

/**
 * Set the terminal state via callback
 */
DrupalTerminal.set = function(state) {
  $.get('index.php?q=terminal/state/' + state);
}

/**
 * Fetch the terminal state.
 */
DrupalTerminal.get = function() {
  $.get('index.php?q=terminal/state', function(state) {
  });
}
