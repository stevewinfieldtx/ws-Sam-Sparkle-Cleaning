const widget   = document.getElementById('widget');
const openers  = document.querySelectorAll('.open-widget');
const closer   = document.querySelector('.widget__close');
const form     = document.getElementById('bookingForm');
const output   = form.querySelector('output');

function toggle(show){
  widget.classList.toggle('hidden',!show);
}
openers.forEach(el=>el.addEventListener('click',()=>toggle(true)));
closer.addEventListener('click',()=>toggle(false));
widget.addEventListener('click',e=>{
  if(e.target===widget) toggle(false);
});

function calc(){
  const base  = parseInt(form.size.value,10);
  const mult  = parseFloat(form.type.value);
  if(!base||!mult) return output.value='';
  const total = Math.round(base * mult);
  output.value=`Total: $${total} (incl. tax & tip)`;
}
form.size.addEventListener('change',calc);
form.type.addEventListener('change',calc);

form.addEventListener('submit',e=>{
  e.preventDefault();
  const url = new URL('https://calendly.com/samanthacleans/book');
  url.searchParams.set('zip',form.zip.value);
  url.searchParams.set('size',form.size.selectedOptions[0].text);
  url.searchParams.set('type',form.type.selectedOptions[0].text);
  window.open(url,'_blank');
  toggle(false);
});