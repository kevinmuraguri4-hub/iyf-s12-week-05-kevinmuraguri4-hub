const header=document.getElementById("main-header"),contents=document.getElementsByClassName("content"),paragraphs=document.getElementsByTagName("p"),firstLink=document.querySelector(".nav-link"),allLinks=document.querySelectorAll(".nav-link");
console.log("getElementById:",header);console.log("getElementsByClassName:",contents);console.log("getElementsByTagName:",paragraphs);console.log("querySelector:",firstLink);console.log("querySelectorAll:",allLinks);
console.log("h1:",document.querySelector("h1"));console.log("contact form:",document.querySelector("#contact-form"));console.log("email input:",document.querySelector('input[type="email"]'));console.log("nav list items:",document.querySelectorAll(".nav-list li"));
const nav=document.querySelector("nav");if(nav){console.log("nav parent:",nav.parentElement);console.log("nav children:",nav.children);console.log("first child:",nav.firstElementChild);console.log("nav links:",nav.querySelectorAll("a"));}
const article=document.querySelector("article");if(article)console.log("article next sibling:",article.nextElementSibling);
const title=document.querySelector(".title");document.querySelector("#change-title")?.addEventListener("click",()=>{if(title)title.textContent="The title was changed with JavaScript";});
if(firstLink){console.log("first link href:",firstLink.getAttribute("href"));firstLink.dataset.lesson="week-5";}
const container=document.querySelector(".container");if(container)container.style.borderRadius="14px";
let paragraphNumber=0;const dynamicArea=document.querySelector("#dynamic-area");
document.querySelector("#add-paragraph")?.addEventListener("click",()=>{const p=document.createElement("p");p.textContent=`New paragraph ${++paragraphNumber}`;p.className="highlight";dynamicArea?.append(p);});
document.querySelector("#remove-paragraph")?.addEventListener("click",()=>dynamicArea?.lastElementChild?.remove());
const contactForm=document.querySelector("#contact-form");contactForm?.addEventListener("submit",event=>{event.preventDefault();const name=document.querySelector("#name").value.trim(),email=document.querySelector("#email").value.trim(),validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),feedback=document.querySelector("#form-feedback");if(name.length<2||!validEmail){feedback.textContent="Enter a name of at least 2 characters and a valid email.";feedback.className="error";return;}feedback.textContent="Form details look valid!";feedback.className="success";});
["grandparent","parent","child"].forEach(id=>document.getElementById(id)?.addEventListener("click",()=>console.log(`${id} received the click`)));
document.querySelector(".nav-list")?.addEventListener("click",event=>{const link=event.target.closest("a.nav-link");if(link)console.log("Delegated nav click:",link.textContent);});
document.addEventListener("keydown",event=>{if(event.key==="Escape"){document.querySelector("#name").value="";document.querySelector("#email").value="";}});
