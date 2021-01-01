import './sass/style.scss';
import { DataSlide } from './data-slide/data'

const BtnToggleMenu = document.getElementById('toggle-menu'),
      BtnHamburgerMenu = document.querySelector('.hamburger-menu'),
      NavHamburgerMenu = document.getElementById('nav'),
      BtnSlides = document.querySelectorAll('.btn-slider'),
      FeatureTitle = document.getElementById('features-title'),
      FeatureDesc = document.getElementById('features-desc'),
      FeatureImg = document.getElementById('features-image'),
      BtnToggleQuestions = document.querySelectorAll('.toggle-question'),
      EmailValue = document.getElementById('value-email'),
      BtnSubmitEmail = document.getElementById('btn-submit-email'),
      IconError = document.querySelector('.icon-error'),
      ErrorMsg = document.querySelector('.error-email'),
      LogoSvg = document.getElementById('logo-svg')

      

BtnToggleMenu.addEventListener('click', ()=>{
   console.log(LogoSvg)
    if (BtnHamburgerMenu.classList.contains('active')) {
       BtnHamburgerMenu.classList.remove('active') 
       BtnHamburgerMenu.classList.add('no-active')
       NavHamburgerMenu.classList.remove('show-menu')
       LogoSvg.classList.remove('logo-white')
    } else {
       BtnHamburgerMenu.classList.add('active')
       BtnHamburgerMenu.classList.remove('no-active')
       NavHamburgerMenu.classList.add('show-menu')
       LogoSvg.classList.add('logo-white')
    }
})

for(let BtnSlide of BtnSlides){
   BtnSlide.addEventListener('click', (e)=>{
      let slideItem = e.target.dataset.slide
      if (slideItem == 1) {
         FeatureTitle.textContent = DataSlide[0].title
         FeatureDesc.textContent = DataSlide[0].desc
         FeatureImg.src = DataSlide[0].img
         BtnSliders(0, 1, 2)
      } else if (slideItem == 2){
         FeatureTitle.textContent = DataSlide[1].title
         FeatureDesc.textContent = DataSlide[1].desc
         FeatureImg.src = DataSlide[1].img
         BtnSliders(1, 0, 2)
      } else{
         FeatureTitle.textContent = DataSlide[2].title
         FeatureDesc.textContent = DataSlide[2].desc
         FeatureImg.src = DataSlide[2].img
         BtnSliders(2, 0, 1)
      }
   })
}

const BtnSliders =(a, b, c)=>{
   BtnSlides[a].classList.add('btn-slide-active')
   BtnSlides[b].classList.remove('btn-slide-active')
   BtnSlides[c].classList.remove('btn-slide-active')
}

for (let BtnQuestion of BtnToggleQuestions){
   BtnQuestion.addEventListener('click', (e)=>{
      //btn-icon-active
      let ss = e.target.children[0]
      ss.classList.toggle('btn-span-active')

      //answer paragraph active toggle
      let getParent = e.target.parentElement
      let paragraphAnswer = getParent.children[1]
      paragraphAnswer.classList.toggle('answer-active')
   })
}

// HandleSubmitEmail
BtnSubmitEmail.addEventListener('click', ()=>{
   const Reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   let isEmail = Reg.test(EmailValue.value)
   console.log(isEmail)
   if (isEmail) {
      ErrorMsg.style.display = "none"
      BtnSubmitEmail.style.top = "0px"   
      IconError.style.visibility = "hidden"  
   } else {
      console.log(BtnSubmitEmail)
      ErrorMsg.style.display = "flex"
      BtnSubmitEmail.style.top = "15px"   
      IconError.style.visibility = "visible" 
   }
})