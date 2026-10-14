$(function () {
 let portfolio = {profile:null,entries:[]};
 const labels = {skills:'Skills',education:'Education',experience:'Experience',projects:'Projects'};
 function message(text, error=false) { $('#message').text(text).toggleClass('error',error); }
 function request(options, after) {
  $.ajax(options).done(function(data) { if(after) after(data); }).fail(function(xhr) { message(xhr.responseJSON?.message || 'Could not connect to the server.',true); });
 }
 function load() {
  request({url:'/api/portfolio',dataType:'json'},function(data) {
   portfolio=data;
   const p=data.profile;
   $('#name').text(p?.name || 'Make this space yours.');
   $('#role').text(p?.title || 'Your profile, your work.');
   $('#bio').text(p?.bio || 'Start by adding your profile. Then add your skills, education, experience and projects below.');
   $('#email').text(p?.email || '').attr('href',p ? 'mailto:'+p.email : null);
   $('#avatar').empty();
   if(p?.image) $('<img>').attr({src:p.image,alt:'Profile photo'}).appendTo('#avatar');
   else $('#avatar').text(p ? p.name.split(/\s+/).slice(0,2).map(n=>n[0]).join('').toUpperCase() : 'MT');
   $('#edit-profile').text(p ? 'Edit profile' : 'Add profile');
   $('#sections').empty();
   Object.entries(labels).forEach(function([category,label]) {
    const section=$('<section>').addClass('portfolio-section');
    const head=$('<div>').addClass('section-head').append($('<h2>').text(label));
    $('<button>').text('+ Add').attr('aria-label','Add '+label).on('click',()=>openEntry({category})).appendTo(head);
    section.append(head);
    const entries=data.entries.filter(e=>e.category===category);
    const cards=$('<div>').addClass('cards');
    entries.forEach(function(e) {
     const card=$('<article>').addClass('card').append($('<h3>').text(e.title),$('<p>').text(e.detail));
     const actions=$('<div>').addClass('actions');
     $('<button>').addClass('secondary').text('Edit').on('click',()=>openEntry(e)).appendTo(actions);
     $('<button>').addClass('danger').text('Delete').on('click',function() {
      if(confirm('Delete this entry?')) request({url:'/api/entries/'+e.id,method:'DELETE'},saved);
     }).appendTo(actions);
     card.append(actions).appendTo(cards);
    });
    section.append(entries.length ? cards : $('<p>').addClass('empty').text('No '+label.toLowerCase()+' added yet.')).appendTo('#sections');
   });
   if(!p) $('#profile-editor').prop('hidden',false);
  });
 }
 function saved(data) {message(data.message);load();}
 function openEntry(entry) {
  const form=$('#entry-form')[0];form.reset();
  ['id','category','title','detail'].forEach(key=>{form.elements[key].value=entry[key] || '';});
  $('#entry-heading').text(entry.id ? 'Edit entry' : 'Add entry');
  $('#entry-editor').prop('hidden',false)[0].scrollIntoView({behavior:'smooth',block:'start'});
  form.elements.title.focus();
 }
 $('#edit-profile').on('click',function() {
  const form=$('#profile-form')[0];
  ['name','title','email','bio'].forEach(key=>{form.elements[key].value=portfolio.profile?.[key] || '';});
  $('#profile-editor').prop('hidden',false);form.elements.name.focus();
 });
 $('#close-profile').on('click',()=>$('#profile-editor').prop('hidden',true));
 $('#cancel-entry').on('click',()=>$('#entry-editor').prop('hidden',true));
 $('#profile-form').on('submit',function(event) {
  event.preventDefault();const body=Object.fromEntries(new FormData(this));
  request({url:'/api/profile',method:'PUT',contentType:'application/json',data:JSON.stringify(body)},function(data){$('#profile-editor').prop('hidden',true);saved(data);});
 });
 $('#entry-form').on('submit',function(event) {
  event.preventDefault();const body=Object.fromEntries(new FormData(this));
  request({url:'/api/entries'+(body.id ? '/'+body.id : ''),method:body.id ? 'PUT':'POST',contentType:'application/json',data:JSON.stringify(body)},function(data){$('#entry-editor').prop('hidden',true);saved(data);});
 });
 $('#photo-form').on('submit',function(event) {
  event.preventDefault();
  request({url:'/api/profile/image',method:'POST',data:new FormData(this),processData:false,contentType:false},saved);
 });
 $('#remove-photo').on('click',()=>request({url:'/api/profile/image',method:'DELETE'},saved));
 $('#delete-profile').on('click',function() {
  if(confirm('Delete your profile and photo? Section entries will remain.')) request({url:'/api/profile',method:'DELETE'},function(data){$('#profile-form')[0].reset();saved(data);});
 });
 load();
});
