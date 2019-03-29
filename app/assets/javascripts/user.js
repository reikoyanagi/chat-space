$(document).on('turbolinks:load', function(){
  var search_user = $("#user-search-result");

  function appendUser(user){
    var html = `<div id="user-search-result">
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.user_name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
                  </div>
                </div>`
    search_user.append(html);
 }

function searchErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_user.append(html);
  }

  function deleteUser(user){
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user.userId}'>
                  <p class='chat-group-user__name'>${user.userName}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
   return html;
  }
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
         })
      .done(function(users) {
      $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
           appendUser(user);
         });
       }
        else {
         searchErrMsgToHTML("一致するユーザーが見つかりません");
        }
      })
      .fail(function() {
        alert('検索に失敗しました');
      })
    });
    $("#user-search-result").on("click",".user-search-add", function() {
      var data = $('a').data();
      var html = deleteUser(data);
      $('#collection_check_boxes').append(html);
        $("#user-search-result").remove();
      });
    $("#collection_check_boxes").on("click",".user-search-remove", function() {
      $("#collection_check_boxes").parent().remove();
    })
});


