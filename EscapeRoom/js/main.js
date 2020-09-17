//Almost pure css - js used only to detect the clicks!!!

$('body').on('click', '.door', function(e) {
  e.preventDefault();
  var timed = false;

  if (timed === false) {
    timed = true;
    $(this).addClass('open');
    setTimeout(function closeDoor() {
      $('.door').removeClass('open');
      timed = false;
    }, 3000);
  } else {
    null;
  }

});

