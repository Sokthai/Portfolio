import jsPDF from 'jspdf';

export function navbarHover(index){
    let nav = document.getElementsByClassName("navLink");
    
    for(let i = 0; i < nav.length; i++){
        nav[i].classList.remove("navActive");
    }

    nav[index].classList.add("navActive");
 
      collapseNavbar();
    

}

// export function move() {
//     let elem = document.getElementsByClassName("progress-bar");
//     let width = 1;
//     let perc = document.getElementsByClassName("percent");
    
//     for (let i = 0; i < elem.length; i++){
//       // let id = setInterval(frame, 10);
//       function frame() {
//         if (width > 100) {
//           // clearInterval(id);
//         } else {
//           width++; 
          
//           elem[i].style.width = width + '%'; 
//           perc[i].innerHTML = width-1;
//         }
//       }
//   }
// }

  
export function scrollfunc(){
  // let mobile = 0.57;
  // let large = 0.34; // >= 1400
  // let medium = 0.42; // 1400
  let small = 0.538; // <=900
  let x = small;
  let obj = document.getElementById("res");
  // let lan = document.getElementById("lantest").getBoundingClientRect();
  // console.log("this is lan test " + lan.top);
  let w = obj.clientHeight;
  // console.log("scroll is " + obj.scrollTop + " and w is goood " + w * x);
  if (obj.scrollTop > (w * x)){
    console.log(w * x);
  }
  
}



export function collapseNavbar() {
    let content = document.getElementById("myTopnav");
    // let navbar = document.getElementById("navbar");
    if (content.className === "topNav") { 
      content.className += " responsive";
    } else {
      content.className = "topNav";
    }


    
    // if (content.style.maxHeight){
    //   content.style.maxHeight = null;
    // } else {
    //   content.style.maxHeight = content.scrollHeight + "px";
    // } 



  }


export function savePDF(){
  let doc = new jsPDF();
  doc.text("my resume", 10, 10);
  doc.save("thai.pdf");
}

  // export function print() {
  //   const filename  = 'resumeThai.pdf';

  //   html2canvas(document.querySelector('#nodeToRenderAsPDF')).then(canvas => {
  //     let pdf = new jsPDF('p', 'mm', 'a4');
  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
  //     pdf.save(filename);
  //   });
  // }
