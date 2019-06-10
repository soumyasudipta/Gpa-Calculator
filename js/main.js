jQuery(document).ready(function ($) {

  // Header fixed and Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });
});

//Grades Setter
function gradeSetter(selectG){
  var minG = 0,
      maxG = 7,
      gradesChar = ['N','F','E','D','C','B','A','S'],
      gradesNum = [0,0,5,6,7,8,9,10];
  for(var i = 0; i<selectG.length; i++){
    for (var  j= maxG; j>=minG; j--){
      var opt = document.createElement('option');
      opt.value = gradesNum[j];
      opt.innerHTML = gradesChar[j];
      selectG[i].appendChild(opt);
    }
  }
}

//Course Setter
function pointSetter(selectC){
  var minC = 1,
      maxC = 5;
  for(var i = 0; i<selectC.length; i++){
    for (var j = maxC; j>=minC; j--){
      var opt = document.createElement('option');
      opt.value = j;
      opt.innerHTML = j;
      selectC[i].appendChild(opt);
    }
  }   
}

//Calling Functions
pointSetter(document.querySelectorAll(".credit"));
gradeSetter(document.querySelectorAll(".grade"));

//Calculate GPA
function displayGPA() {
 var credits = document.querySelectorAll('.credit'),
     grades = document.querySelectorAll('.grade'),
     studentScore = 0,
     totalCredits = 0,
     calculate = 0;

  for (var i = 0; i < credits.length; i++) {
          totalCredits += Number(credits[i].value);
          studentScore += Number((credits[i].value)*(grades[i].value));
  }

  calculate = studentScore/totalCredits;

  document.getElementById('errormsg1').innerHTML = "";

  try{
      if(totalCredits === 0) throw "Select Credits";
      if(studentScore === 0) throw "Select a Grade";
  }
  catch(err){
      document.getElementById('errormsg1').innerHTML = err;
  }

  if(isNaN(calculate))
      document.getElementById('GPA').innerHTML = "";
  else
      document.getElementById('GPA').innerHTML = "Your GPA is : " + calculate.toPrecision(3);
}

//Calculate CGPA
function displayCGPA(){
  var GPA = document.querySelectorAll(".perSemGPA"),
      credits = document.querySelectorAll(".perSemCredits"),
      studentScore = 0,
      totalCredits = 0,
      totalGPA = 0,
      calculate = 0;

      for(var i = 0; i < 8; i++){
          if((Number(GPA[i].value)>=0 && Number(GPA[i].value)<=10) && ((Number(credits[i].value)>=17 && Number(credits[i].value)<=27)||Number(credits[i].value)==0)){
              studentScore += Number((GPA[i].value)*(credits[i].value));
              totalCredits += Number(credits[i].value);
              totalGPA += Number(GPA[i].value);
          }
          else{
              try{
                  if(Number(GPA[i].value)<0 || Number(GPA[i].value)>10) throw "Enter Valid GPA";
                  if(Number(credits[i].value)<17 || Number(credits[i].value)>27) throw "Enter Valid Credits";
              }
              catch(err){
                  document.getElementById('errormsg2').innerHTML = err;
              }
              return;
          }
      }

      calculate = studentScore/totalCredits;

      document.getElementById('errormsg2').innerHTML = "";

      try{
          if(totalGPA === 0) throw "Enter Your GPA";
          if(totalCredits === 0) throw "Enter Credits";
      }
      catch(err){
          document.getElementById('errormsg2').innerHTML = err;
      }

      if(isNaN(totalGPA)||isNaN(totalCredits)||totalGPA == 0 || totalCredits == 0)
          document.getElementById('CGPA').innerHTML = "";
      else
          document.getElementById('CGPA').innerHTML = "Your CGPA is : " + calculate.toPrecision(3);
} 

//Resetter
function reseterGPAcalc(){
  selectReseter = document.getElementsByTagName("select");
  
  for(var i = 0; i < selectReseter.length; i++) {
      selectReseter[i].selectedIndex =0;
  }  
}

function reseterCGPAcalc(){
  selectReseter = document.getElementsByTagName("input");
  
  for(var i = 0; i < selectReseter.length; i++) {
      selectReseter[i].value="";
  }  
}
