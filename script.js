let tbody = document.querySelector('tbody');

//for happening onclick event
let addBtn = document.querySelector('.add');
let form = document.querySelector('.form-wrapper');
let saveBtn = document.querySelector('.save');
let cancelBtn = document.querySelector('.cancel');

//use id of elements, all elements want to go to DB through API
let mobileEle =document.querySelector('#mobile')
let priceEle =document.querySelector('#price')
let ramEle =document.querySelector('#ram')
let storageEle =document.querySelector('#storage')

let httpm = null;

addBtn.onclick = function(){
      httpm='POST'
    form.classList.add('active') //for add the classList inside form with active
}
cancelBtn.onclick = function(){
    form.classList.remove('active')
}



let url = 'http://localhost:80/mobiles';

let mobiles = [];

let id = null;

let data = {}

function getMobiles(){
    fetch(url)
    .then(response =>{response.json()})
    .then(data =>{
         mobiles=data;
         updateTable()
    })
}

function updteTable(){
      let data=""
    if(mobiles.length>0){
        for(i=1;i<mobiles.length;i++){
           data += `<tr id="${mobiles[i]['id']}">
                     <td>${mobiles[i]['name']}</td>
                     <td>${mobiles[i]['price']}</td>
                     <td>${mobiles[i]['ram']+"GB"}</td>
                     <td>${mobiles[i]['storage']+"GB"}</td>
                     <td><button class="btn btn-primary" onclick="editMobile(event)">Edit</button><td>
                     <td><button class="btn btn-warning" onclick="deleteMobile(event)">Delete</button><td>
                  </tr>`
        }
        tbody.innerHTML = data;
    }
}
updateTable();

function editMobile(e){
    form.classList.add('active')
    httpm='PUT'
   id = e.target.parentElement.parentElement.id 
  let selectedMobile = mobiles.filter((m)=>{return m['id']==id})[0];
  mobileEle.value = selectedMobile.name;
  priceEle.value = selectedMobile.price;
  ramEle.value = selectedMobile.ram;
  storageEle.value = selectedMobile.storage;

}

function deleteMobile(e){
    id = e.target.parentElement.parentElement.id
    fetch(url+"/"+id,{method:"DELETE"})
    .then(()=>{
        getMobiles();
    })

}

saveBtn.onclick = function(){
    data.name = mobileEle.value;
    data.price = priceEle.value;
    data.ram = ramEle.value;
    data.storage = storageEle.value;

    if(httpm == 'PUT'){
        data.id = id;  //new data create with new id(target id),which is assign to existing id variale(like id = e.target.pE.pE) 
    }
    fetch(url,{
        method:httpm,
        body:JSON.stringify(data),
        headers:{"contentType":"application/json"}
    })
    .then(()=>{
        clearForm();
        form.classList.remove('active')
        getMobiles();
    })
}

function clearFunction(){
    mobileEle.value = null;
    priceEle.value = null;
    ramEle.value = null;
    storageEle.value = null;
}