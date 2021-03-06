var foundMemberId,token, test;
var renewMember = new Member();
var member = new Member();

$(document).ready(function(){
  if (window.location.pathname === '/admin/renew'){
    $('.renew').show();
    loadMember();
    showRenewals();
  }
  else if (window.location.pathname === '/admin/members/new'){
    $('.new').show();
    role();
    showNewMembers();
    scan();
  }
  else{
    trainMember();
    makeExpert();
  }
});

function trainMember(){
  $('.train').confirm({
    text: "Would you like to fully approve this member to use this workshop?",
    title: "Confirmation required",
    confirm: function(button){
      var shopID = $('.train').attr('id');
      var memberID = $('.memberPage').attr('id');
      $.ajax({
        url: '/workshops/' + shopID + '/train.json',
        type: 'POST',
        data: { member_id: memberID },
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        success: function(data){
          $('.train').attr('href', '/workshops/' + shopID + '/members/' + memberID);
          $('.train').text("MAKE EXPERT");
          $('.train').attr('class', 'btn btn-info expert');
          makeExpert();
        }
      });
    },
    cancel: function(button){
      var url = $('.train').attr('href');
      var memberID = $('.memberPage').attr('id');
      window.location.href = url;
    },
    confirmButton: "Yes",
    cancelButton: "No - Select certain skills",
    confirmButtonClass: "btn-danger",
    cancelButtonClass: "btn-default",
    dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
  })
}

function makeExpert(){
  var count = 0;
  $('.expert').confirm({
    text: "Make this member an expert in this shop? This will give full training permissions to this member.",
    title: "Confirmation required",
    confirm: function(button){
      count++;
      if (count > 1){
        return;
      }
      var shopID = $('.expert').attr('id');
      var memberID = $('.memberPage').attr('id');
      $.ajax({
        url: '/workshops/' + shopID + '/expert.json',
        type: 'POST',
        data: { member_id: memberID },
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        success: function(data){
          $('.expert').hide();
        }
      });
    },
    cancel: function(button){
      var url = $('.expert').attr('href');
      var memberID = $('.memberPage').attr('id');
      window.location.href = url;
    },
    confirmButton: "Yes",
    cancelButton: "No",
    confirmButtonClass: "btn-danger",
    cancelButtonClass: "btn-default",
    dialogClass: "modal-dialog modal-lg" // Bootstrap classes for large modal
  })
}

function scan() {
  if (typeof io != 'undefined'){
    var socket = io.connect('http://localhost:4000');
    socket.on('regMember', function (data) {
      $('#member_cardID').val(data.cardID);
    });
  }
}

function role() {
  $('.role').on('change', function() {
    var role = $('#member_role').val();
    //require new login credentials if new member role is admin or officer
    if (role === 'admin' || role === 'officer'){
      $('.login').show();
    } else {
      $('.login').hide();
    }
  })
};

function clearForm(form) {
  // iterate over all of the inputs for the form element that was passed in
  $(':input', form).each(function() {
    var type = this.type;
    var tag = this.tagName.toLowerCase(); // normalize case
    // it's ok to reset the value attr of text inputs, password inputs, and textareas
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = "";
    // checkboxes and radios need to have their checked state cleared but should *not* have their 'value' changed
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    // select elements need to have their 'selectedIndex' property set to 0
    else if (tag == 'select')
      this.selectedIndex = 0;
  });
};

function loadMember() {
  $('.member').on('change', function(){
    var member_fullname = $('#member_fullname').val();
    var token = $('input[name=authenticity_token]').val();
		//post to members#search_by to retrieve member info
    $.post('/members/search_by.json', { field: 'fullname', value: member_fullname, authenticity_token: token }, function(data){
      if (data.length === 1){
        renewMember = new Member(data[0]._id.$oid, data[0].fullname,  data[0].expirationTime)
				foundMemberId = renewMember.id;
        $('.member-name').text('Member Name: ' + renewMember.fullname);
        $('.member-expTime').text('Membership expires on ' + renewMember.formatExpTime());
      }
      else if (data.length > 1){
        alert('Multiple members found')
      }
    });
  });
}

//update member on submit and append updated member to bottom of page.
function showRenewals() {
	$('input[type="submit"][value="Renew Member"]').click(function(event){
    event.preventDefault();
		if (typeof foundMemberId != 'undefined'){
      token = $('input[name=authenticity_token]').val();
			var months = $('input[name="member[expirationTime]"]').val();
			$.ajax({
				url: '/admin/members/' + foundMemberId + '.json',
				type: 'PUT',
				data: {member: {expirationTime: months}, authenticity_token: token },
				success: function(data) {
					renewMember.expirationTime = data["expirationTime"]
					alert(renewMember.fullname + ' updated. New expiration: ' + renewMember.formatExpTime());
					$('.renewedMembers').show();
					$('.renewedMembers').append("<li> Name: <strong>" + renewMember.fullname + "</strong> <ul>Renewed for: <strong> " + months + " months </strong></ul><ul> New Expiration Date: <strong>" + renewMember.formatExpTime() + "</strong> </ul></li>")
					//reset form after renewMember
					clearForm($('.renew'));
					$('.member-name').text('');
					$('.member-expTime').text('');
				}
			});
		}
		else {
			alert("You must select a member first")
		}
	});
}

function showNewMembers() {
  $('input[type="submit"][value="Create Member"]').click(function(event) {
    member.fullname = $('#member_fullname').val();
    member.cardID = $('#member_cardID').val();
    member.role = $('#member_role').val();
    member.expirationTime = $('#member_expirationTime').val();
    token = $('input[name=authenticity_token]').val();
    $.ajax({
      url: '/admin/members.json',
      type: 'POST',
      data: {member: member, authenticity_token: token },
      success: function(data){
        member.expirationTime = data.expirationTime;
        $('.newMembers').show();
        $('.newMembers').append("<li> Name: <strong>" + member.fullname + "</strong><ul> Expiration Date: <strong>" + member.formatExpTime() + "</strong> </ul></li>")
      }
    });
    event.preventDefault();
  });
}
