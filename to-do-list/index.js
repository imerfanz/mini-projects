function main() {
  const myTask = document.getElementById("task");
  const adderBtn = document.getElementById("adderBtn");
  const myLi = document.getElementById("taskLi");
  let content;

  //adding locals

  if (!localStorage.getItem("tasks")) {
    let a = [];
    localStorage.setItem("tasks", JSON.stringify(a));
  }

  if (!localStorage.getItem("checked")) {
    let a = [];
    localStorage.setItem("checked", JSON.stringify(a));
  }

  //downloading tasks

  if (JSON.parse(localStorage.getItem("tasks")).length != 0) {
    let ma = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < ma.length; i++) {
      content =
        content +
        `<li name="" class="cards" draggable="true"><input type="checkbox"> <p class ="valP">${
          ma[i]
        }</p><button class="rmvButton" value="${ma[i]}">X</button>
        <p class ="TOrder"> ${ma.indexOf(ma[i]) + 1}</p></li>`;
      myLi.innerHTML =
        content +
        `<li><button id='clearLocal'>Remove All tasks</button><p id='percent'>${Math.round(completeTsk() / ma.length * 100)}% is done ...</p><p id='reportP'>${completeTsk()} Completed ${ma.length - completeTsk()} Remaining</p></li>`;
    }
  } else {
    myLi.innerHTML = `<p style="color:white; font-size:26px; margin-top:50px; margin-left:100px;"><i>There is no task RN!</i></p>`;
  }

  

  function refresh(){
  if (JSON.parse(localStorage.getItem("tasks")).length != 0) {
    for (let i = 0; i < ma.length; i++) {
      content =
        content +
        `<li name="" class="cards" draggable="true"><input type="checkbox"> <p class ="valP">${
          ma[i]
        }</p><button class="rmvButton" value="${ma[i]}">X</button>
        <p class ="TOrder"> ${ma.indexOf(ma[i]) + 1}</p></li>`;
      myLi.innerHTML =
        content +
        `<li><button id='clearLocal'>Remove All tasks</button><p id='percent'>${Math.round(completeTsk() / ma.length * 100)}% is done ...</p><p id='reportP'>${completeTsk()} Completed ${ma.length - completeTsk()} Remaining</p></li>`;
    }
  } else {
    myLi.innerHTML = `<p style="color:white; font-size:26px; margin-top:50px; margin-left:100px;"><i>There is no task RN!</i></p>`;
  }}



  //declare some stuff

  let myChBxs = document.querySelectorAll(" li > input");
  let valps = document.querySelectorAll(".valP");
  let reportP = document.getElementById("reportP");
  let percent = document.getElementById("percent");

   // loading the tasks
   function loadIng() {
    let myTsks = document.querySelectorAll(" .cards ");
    let myTNum = myTsks.length;
    let i = 0;

    setInterval(() => {
      if (i < myTNum) {
        myTsks[i].style.overflow = "visible";
        myTsks[i].style.width = "500px";
        i++;
      }
    }, 50);
  }

  loadIng();

  //saving tasks

  function saver() {
    let ar = JSON.parse(localStorage.getItem("tasks"));
    let mV = myTask.value;
    if(ar.includes(mV)){
      window.alert(mV + "is listed already!");
    }else{
    ar.push(mV.trim());
    localStorage.setItem("tasks", JSON.stringify(ar));
    myTask.value = "";
location.reload();}
  }

  adderBtn.addEventListener("click", saver);

  //dragging

  let cards = document.querySelectorAll("ul > .cards");

  cards.forEach((element) => {
    element.addEventListener("dragstart", () => {
      element.classList.add("dragged");
    });
    element.addEventListener("dragend", () => {
      element.classList.remove("dragged");
    });
    element.addEventListener("dragover", (e) => {
      if (
        !e.target.classList.contains("dragged") &&
        e.target.classList.contains("cards")
      ) {
        let ma = JSON.parse(localStorage.getItem("tasks"));
        let fElement = document.querySelector(".dragged");
        let sElement = e.target;
        let fIndex = ma.indexOf(fElement.querySelector(".valP").innerHTML);
        let sIndex = ma.indexOf(sElement.querySelector(".valP").innerHTML);
        ma.splice(fIndex, 1, sElement.querySelector(".valP").innerHTML);
        ma.splice(sIndex, 1, fElement.querySelector(".valP").innerHTML);
        console.log(ma);
        localStorage.setItem("tasks", JSON.stringify(ma));
        location.reload();
      }
    });
  });

  //calculating

  document.body.addEventListener("click" , () =>{

    let ma = JSON.parse(localStorage.getItem("tasks"));
  
    percent.innerHTML = `${Math.round(completeTsk() / ma.length * 100)}% is done ...`;
    
    reportP.innerHTML = `${completeTsk()} Completed ${ma.length - completeTsk()} Remaining`;
  })

  function completeTsk() {
    let a = JSON.parse(localStorage.getItem("checked")).length;

    return a;
  }



  //removing

  document.getElementById("clearLocal").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });

  let rmvBtn = document.querySelectorAll(".rmvButton");

  rmvBtn.forEach((element) => {
    let myVal = element.value;
    element.addEventListener("click", () => {
      let rA = JSON.parse(localStorage.getItem("tasks"));
      let rNum = rA.indexOf(myVal);
      let rmved = rA.splice(rNum, 1);
      localStorage.setItem("tasks", JSON.stringify(rA));
      window.alert(rmved + " is removed!");
      location.reload();
    });
  });

 

  //loading checks

  async function letsCheck() {
    let myArr = JSON.parse(localStorage.getItem("checked"));
    let i = 0;
    setInterval(() => {
      if (i < myArr.length) {
        let mytxt = myArr[i];

        valps.forEach((element) => {
          if (element.innerText == mytxt) {
            element.parentElement
              .querySelector("input")
              .setAttribute("checked", true);
            element.classList.add("DoneTask");
            i++;
          }
        });
      }
    }, 550);
  }

  letsCheck();

  //checking tasks!

  myChBxs.forEach((element) => {
    let theT = element.parentElement.querySelector("p").innerText;
    element.addEventListener("click", () => {
      let myArr = JSON.parse(localStorage.getItem("checked"));
      if (!element.getAttribute("checked")) {
        console.log(theT);
        element.setAttribute("checked", true);
        element.parentElement.querySelector("p").classList.add("DoneTask");
        myArr.push(theT);
        localStorage.setItem("checked", JSON.stringify(myArr));
      } else {
        element.removeAttribute("checked");
        console.log("removed");
        element.parentElement.querySelector("p").classList.remove("DoneTask");
        myArr.splice(myArr.indexOf(theT), 1);
        localStorage.setItem("checked", JSON.stringify(myArr));
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", main);
