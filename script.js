/* ================= PAGE SWITCH ================= */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.style.display='none');
  document.getElementById(id).style.display='block';

  if(id==='landing') loadLandingImages();
  if(id==='dashboard') loadDashboard();
}

/* ================= SIGNUP ================= */
function signup(){
  const u=suUser.value.trim(), p=suPass.value.trim();
  if(!u||!p) return alert("Fill all fields");
  if(localStorage.getItem(u)) return alert("User exists");

  localStorage.setItem(u,JSON.stringify({password:p,images:[]})); 
  alert("Account created");
  showPage('login');
}

/* ================= LOGIN ================= */
function login(){
  const u=liUser.value.trim(), p=liPass.value.trim();
  const data=JSON.parse(localStorage.getItem(u));
  if(data&&data.password===p){
    localStorage.setItem("currentUser",u);
    showPage('dashboard');
  }else alert("Invalid login");
}

/* ================= LOGOUT ================= */
function logout(){
  localStorage.removeItem("currentUser");
  showPage('landing');
}

/* ================= UPLOAD ================= */
function uploadImage(){
  const file=imageInput.files[0];
  const user=localStorage.getItem("currentUser");
  if(!file||!user) return;

  const r=new FileReader();
  r.onload=()=>{
    const data=JSON.parse(localStorage.getItem(user));
    data.images.push(r.result);
    localStorage.setItem(user,JSON.stringify(data));
    loadDashboard();
  };
  r.readAsDataURL(file);
}

/* ================= DASHBOARD ================= */
function loadDashboard(){
  const user=localStorage.getItem("currentUser");
  if(!user){showPage('login');return;}

  const data=JSON.parse(localStorage.getItem(user));
  userGallery.innerHTML="";
  data.images.forEach(i=>userGallery.innerHTML+=`<img src="${i}">`);
  profileLink.innerHTML=
    `<a href="#" onclick="openPublic('${user}')">View Public Profile</a>`;
}

/* ================= LANDING ================= */
function loadLandingImages(){
  landingGallery.innerHTML="";
  for(let k in localStorage){
    try{
      const d=JSON.parse(localStorage.getItem(k));
      d?.images?.forEach(i=>landingGallery.innerHTML+=`<img src="${i}">`);
    }catch{}
  }
}

/* ================= PUBLIC PROFILE ================= */
function openPublic(user){
  const d=JSON.parse(localStorage.getItem(user));
  publicName.innerText=user+"'s Gallery";
  publicGallery.innerHTML="";
  d.images.forEach(i=>publicGallery.innerHTML+=`<img src="${i}">`);
  showPage('publicProfile');
}

/* ================= DEFAULT PAGE ================= */
showPage('landing');
