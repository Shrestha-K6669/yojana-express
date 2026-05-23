$(document).ready(function(){
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/*
  $("#page").on('submit',function(e){
e.preventDefault();
var page=$('#page1').val();
var data1={  page 
}
//console.log(data1)

axios.post('/lawsPage', data1).then(s=>{
  res.render('law/lawList',{
    data:s,
    message: "getting records of Laws.",
    law_types:s.law_types,
    laws:s.laws
})
})
.catch(function (error) {
  console.log( "error"+error+"occurred");de
});

    })

  */

  }) //document ready method end

  

function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

function myFunc(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show"; 
    x.previousElementSibling.className += " w3-red";
  } else { 
    x.className = x.className.replace(" w3-show", "");
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace(" w3-red", "");
  }
}

/*
$("#profileForm").on('submit',function(event){
event.preventDefault();
var reln=$('#reln').val();
var house_num=$('#profile_housenum').val();
var tole=$('#profile_tole').val();
var name_eng=$('#name_eng').val();
var name_nep=$('#name_nep').val();
var gender=$('#gender').val();
var dob=$('#dob').val();
var ctz_no=$('#ctz_no').val();
var data1={
  reln,
  house_num,
  tole,
  name_eng,
  name_nep,
  gender,
  dob,
  ctz_no  
}
//console.log(data1)

axios.post('/addProfile', data1)
.then(function (response) {
  console.log(response);
  document.getElementById('idProfileForm').style.display='none';
  alert("profile information added successfully.")
  
})
.catch(function (error) {
  console.log(error);
});

    })
*/
  