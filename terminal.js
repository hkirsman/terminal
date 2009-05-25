if (Drupal.jsEnabled) {
  $(document).ready(function() {
      // Attach the terminal to the bottom
      $('html').append('<div id="terminal-container"></div>');
      var screen = '<div id="terminal-screen"></div>';
      $.get('terminal', function(data) {
        $('#terminal-container').append(screen).append(data);
        $('#terminal-screen').css({'position': 'fixed', 'bottom': 0, 'right': 0, 'z-index': 42, 'width': '50%', 'background-color': '#ddd', 'color': 'black', 'opacity': 0.7});
        $('#edit-terminal').css({'position': 'fixed', 'bottom': 0, 'z-index': 42, 'width': '50%'});
        jQConsole("#edit-terminal", "#terminal-screen");    
      });
  });
}
