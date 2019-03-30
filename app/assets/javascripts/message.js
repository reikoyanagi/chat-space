$(document).on('turbolinks:load', function() {
  function buildHTML(message){

    var image = message.image == null ? "" : message.image
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message" data-message-id="${message.id}">
                    <div class="upper-message__user-name">
                    ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                    ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                    ${message.text}
                    </p>
                    <img class="lower-message__image" src="${image}" alt="">
                  </div>
                </div>`
    return html;
  }
  function scroll_view(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      url: location.href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      scroll_view();
      $('.form__message').val('')
      $('.new_message')[0].reset();

    })
    .fail(function(){
      alert('error');
    })
  })
    // 自動更新

$(function() {
  var id = $('.messages .message:last-child').data('message-id');
  var interval = setInterval(function(){
  var insertHTML = '';
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {

    $.ajax({
      url: location.href,
      dataType: 'json'
    })

  .done(function(data){
    data.forEach(function(message){
    if (message.id > id) {
    insertHTML += buildHTML(message);
    }
  });
    $('.messages').append(insertHTML);
    scroll_view();

    })
  .fail(function(data){
    alert('自動更新できません。更新するにはページを再度読み込んでください。');
    });
    } else {
      clearInterval(interval);
    }
    id = $('.messages .message:last-child').data('message-id');
      }, 5000);
   });
});


