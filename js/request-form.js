(()=>{
const form=document.querySelector('#request-form');if(!form)return;
const error=document.querySelector('#request-error');
const uploads=[...form.querySelectorAll('input[type=file]')];
const allowed=['image/jpeg','image/png','image/webp'];
const limit=10*1024*1024;
function validatePhotos(){
 const files=uploads.flatMap(input=>[...input.files]);
 if(files.some(file=>!allowed.includes(file.type)))return 'Please choose JPG, PNG or WebP photos.';
 if(files.reduce((total,file)=>total+file.size,0)>limit)return 'Your photos exceed 10 MB in total. Choose smaller photos or email them to info@rjmdigital.ca.';
 return '';
}
function showError(message){error.textContent=message;error.hidden=!message;}

const service=new URLSearchParams(location.search).get('service');
if([...form.elements.service.options].some(option=>option.value===service))form.elements.service.value=service;
form.elements._next.value=new URL('request-confirmation.html',location.href).href;
for(const input of uploads){
 let previewURL;
 input.addEventListener('change',()=>{
  const preview=input.parentElement.querySelector('.upload-preview');
  if(previewURL)URL.revokeObjectURL(previewURL);
  preview.removeAttribute('src');preview.hidden=true;
  const file=input.files[0];
  if(file&&allowed.includes(file.type)){previewURL=URL.createObjectURL(file);preview.src=previewURL;preview.hidden=false;}
  showError(validatePhotos());
 });
}
form.addEventListener('submit',event=>{
 const message=validatePhotos();
 if(message){event.preventDefault();showError(message);error.focus();return;}
 showError('');
 // Standard multipart POST allows FormSubmit to receive actual photo files.
 // The provider redirects only after processing; no client-side success claim.
});
})();
