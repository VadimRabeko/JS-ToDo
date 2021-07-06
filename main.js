'use strict';

let form = document.querySelector('form');
let mI = document.getElementById('mainInput');
let arr = [];
let isButton = false;
let div = document.createElement('div');
div.setAttribute('class', 'wrapper');
form.append(div);

function createButton() {
  div.insertAdjacentHTML(
    'beforebegin',
    '<div><button>Show "In progress"</button><button>Show "Done"</button><button>Show All</button></div>'
  );

  let filterBtns = form.querySelectorAll('button');
  for (let n = 0; n < filterBtns.length; n++) {
    filterBtns[n].setAttribute('class', `filterBtn${n + 1}`);
  }
  let filBtn1 = form.querySelector('.filterBtn1');
  let filBtn2 = form.querySelector('.filterBtn2');
  let filBtn3 = form.querySelector('.filterBtn3');

  filBtn1.addEventListener('click', (e) => {
    e.preventDefault();
    let progArr1 = arr.filter((f) => f.getAttribute('id') === 'inProg');
    let doneArr1 = arr.filter((f) => f.getAttribute('id') === 'done');
    for (let l = 0; l < progArr1.length; l++) {
      div.append(progArr1[l]);
    }
    for (let l = 0; l < doneArr1.length; l++) {
      doneArr1[l].remove();
    }
  });

  filBtn2.addEventListener('click', (e) => {
    e.preventDefault();
    let doneArr2 = arr.filter((f) => f.getAttribute('id') === 'done');
    let progArr2 = arr.filter((f) => f.getAttribute('id') === 'inProg');
    for (let l = 0; l < doneArr2.length; l++) {
      div.append(doneArr2[l]);
    }
    for (let l = 0; l < progArr2.length; l++) {
      progArr2[l].remove();
    }
  });

  filBtn3.addEventListener('click', (e) => {
    e.preventDefault();
    arr.forEach((e) => {
      div.append(e);
    });
  });

  isButton = true;
}

function btnDone(k) {
  k.querySelector('.btn1').addEventListener('click', (e) => {
    e.preventDefault();
    if (k.getAttribute('id') === 'inProg') {
      k.setAttribute('id', 'done');
    } else {
      k.setAttribute('id', 'inProg');
    }
  });
}

function btnDel(k) {
  k.querySelector('.btn2').addEventListener('click', (e) => {
    e.preventDefault();
    k.setAttribute('del', 'del');
    let foo = () => {
      for (let q of arr) {
        if (q.hasAttribute('del')) {
          return q;
        }
      }
    };
    let idArr = arr.indexOf(foo());
    arr.splice(idArr, 1);
    k.remove();
    if (!arr[0]) {
      console.log('+++');
      location.href = location.href;
    }
  });
}

function setTask() {
  arr.forEach((e) => {
    div.append(e);
  });
}

function getTask(e) {
  if (e.code === 'Enter') {
    if (mI.value != '') {
      e.preventDefault();
      if (!isButton) {
        createButton();
      }

      let val = mI.value;
      mI.value = '';
      let task = document.createElement('div');

      task.setAttribute('class', 'mD');
      task.setAttribute('id', 'inProg');
      task.insertAdjacentHTML(
        'afterbegin',
        '<p></p><div><button></button><button></button></div>'
      );

      let p = task.querySelector('p');
      p.innerHTML = val;

      let btn = task.querySelectorAll('button');
      for (let i = 0; i < btn.length; i++) {
        btn[i].setAttribute('class', `btn${i + 1}`);
      }
      btnDone(task);
      btnDel(task);

      arr.push(task);
      setTask();
    } else {
      e.preventDefault();
      mI.focus();
    }
  }
}

let gbFun = () => {
  arr.forEach((e) => {
    div.append(e);
  });
  localStorage.setItem(`tasks`, JSON.stringify(div.innerHTML));
};

let getOld = () => {
  let old = JSON.parse(localStorage.getItem('tasks'));
  if (old) {
    createButton();
    div.innerHTML = old;
    let divVal = document.querySelectorAll('.mD');
    divVal.forEach((e) => {
      btnDone(e);
      btnDel(e);
      arr.push(e);
    });
    setTask();
  }
};

mI.addEventListener('keydown', getTask);
window.onbeforeunload = gbFun;
window.onload = getOld;
