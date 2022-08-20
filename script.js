//>--> Hide and show the parameters box
let customParamRadio = document.getElementById("customPar");
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.checked = true;
let paramBox = document.getElementById("paramBox");
let jsonBox = document.getElementById("jsonBox");
customParamRadio.addEventListener("click", () => {
  paramBox.style.display = "block";
  jsonBox.style.display = "none";
});
jsonRadio.addEventListener("click", () => {
  paramBox.style.display = "none";
  jsonBox.style.display = "block";
});
//<--<

//>--> Hide and show the content box
let getRadio = document.getElementById("getRadio");
getRadio.checked= true;
let postRadio = document.getElementById("postRadio");
let contentBox = document.getElementById("contentBox");

getRadio.addEventListener("click", () => {
  contentLabel= document.getElementById("contentLabel").style.display="none";
  contentBox.style.display = "none";
});
postRadio.addEventListener("click", () => {
  contentLabel= document.getElementById("contentLabel").style.display="inline-block";
  contentBox.style.display = "block";
});
//<--<

//>--> add parameters when add button is clicked
addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let parametersdiv = document.getElementById("parametersDiv");
  parametersdiv.innerHTML += `<input type="text" id="Parameter${
    parametersdiv.children.length + 1
  }" name="Parameter${parametersdiv.children.length + 1}"
    class="w-fit inline-block bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    placeholder="parameter ${parametersdiv.children.length + 1}">`;
});
// <--<

// >--> remove parameters when remove button is clicked
removeParam = document.getElementById("removeParam");
removeParam.addEventListener("click", () => {
  let parametersdiv = document.getElementById("parametersDiv");
  let parametersArray = Array.from(parametersdiv.children);
  if (parametersArray.length > 1) {
    parametersdiv.innerHTML = ``;
    parametersArray.pop();
    for (parameter in parametersArray) {
      parameter = Number(parameter);
      parametersdiv.innerHTML += `<input type="text" id="Parameter${
        parameter + 1
      }" name="Parameter${parameter + 1}"
            class="w-fit m-1 inline-block bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="parameter ${parameter + 1}">`;
    }
  }
});
// <--<

// >--> Submit Button handling:

let submit = document.getElementById("submit");
submit.addEventListener("click", checkFields);
function checkFields() {
  const url = document.getElementById("url").value;
  const getRadio = document.getElementById("getRadio");
  const postRadio = document.getElementById("postRadio");

  if (url == "" || (getRadio.checked == false && postRadio.checked == false)) {
    document.getElementById("alert").style.display = "inline-block";
  } else {
    document.getElementById("alert").style.display = "none";
    collectValues(url);
  }
}
//
function collectValues(userUrl) {
  let responseBox = document.getElementById("responseBox");
  //
  let requestType = document.querySelector(
    "input[name='request-radio']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='content-radio']:checked"
  ).value;
  //check whether JSON or Custom Parameters is selected:

  if (contentType == "CustomPar") {
    let parametersdiv = document.getElementById("parametersDiv");
    let parametersArray = Array.from(parametersdiv.children);
    let userParameters = {};
    for (parameter of parametersArray) {
      let element =parameter.value.split(":");
      let key=element[0];
      let value=element[1];
      userParameters[key] = value;
    }
     data=JSON.stringify(userParameters);
  } else {
     data = document.getElementById("reqJson").value;
  }
  // check  requestType :

  fetchHandler(requestType,data,userUrl,responseBox);
}

function fetchHandler(requestType,data,userUrl,responseBox){
  if(requestType=="GET"){
    fetch(userUrl,{
      method:"GET",
    }).then( (response)=>{
      return response.text();
    }).then((text)=>{
       responseBox.value=text;
    })
  }
  else{
    fetch(userUrl,{
      method:"POST",
      body:data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then( (response)=>{
      return response.text();
    }).then((text)=>{
       responseBox.value=text;
    })
  }
}
