grecaptcha.ready(function() {
    grecaptcha.execute('6LfAr2koAAAAAJtczSiaJ8X2l_I_DiCl6wTRSCMR', {action: 'homepage'})
    .then(function(token) {
      document.getElementById('captchaResponse').value = token;
    });
  });