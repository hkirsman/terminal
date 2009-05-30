if (Drupal.jsEnabled) {
  $(document).ready(function() {
      // Attach the terminal to the bottom
      $('html').append('<div id="terminal-container"></div>');
      var user = Drupal.settings['user'];
      var host = Drupal.settings['user'];
      var sitename = Drupal.settings['sitename'];
      var welcome_message = 'Welcome to ' + sitename + '!';
      var prompt = user + '@' + host + ' >';
      $('#terminal-container').height('200px');
      $('#terminal-container').terminal('index.php?q=terminal', {custom_prompt : prompt, hello_message : welcome_message});
  });
}
