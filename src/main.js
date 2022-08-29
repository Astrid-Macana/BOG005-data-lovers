import athletes from "./data/athletes/athletes.js";
import { countryData, genderData, medalData, dataFilter, } from "./data.js";
import { percentage } from './data.js';


let optionsCountry = '<option selected value="all">Todos</option>';
for (const contry of countryData (athletes)) {
  optionsCountry += '<option value="' + contry + '">' + contry + "</option>";
}


document.getElementById("selectCountry").innerHTML = optionsCountry;

//CREAR SELECT DE FILTRO DE GENEROS
let optionsGender = '<option selected value="all">Todos</option>';
for (const gender of genderData (athletes)) {
  optionsGender += "<option value=" + gender + ">" + gender + "</option>";
}


document.getElementById("selectGender").innerHTML = optionsGender;

//CREAR SELECT DE FILTRO DE MEDALLAS
let optionsMedal = '<option selected value="all">Todos</option>';
for (const medal of medalData(athletes)) {
  optionsMedal += "<option value=" + medal + ">" + medal + "</option>";
}

document.getElementById("selectMedal").innerHTML = optionsMedal;

//BOTON DE FILTRO
document.getElementById("filters").addEventListener("click", filterByCGM);
function filterByCGM() {

  let country = document.getElementById("selectCountry").value;
  let gender = document.getElementById("selectGender").value;
  let medal = document.getElementById("selectMedal").value;
  let  atletheCount = document.getElementById("atletheCount");
  let data = dataFilter(athletes,country, gender, medal);
  let porWomennn=percentage(data);
  //console.log(data)
  let noencontrado = `
  <img src="/src/img/no-hay-resultados.png" alt="">
  `;
  //FROMA DE CREAR TABLAS

  let table =
    "<tr>" +
    "<th>Nombre</th>" +
    "<th>Genero</th>" +
    "<th>Deporte</th>" +
    "<th>País</th>" +
    "<th>Especialidad</th>" +
    "<th>Medalla</th>" +
    "</tr>";
  for (const reg of data) {
    //reg de registro
    let row = '<tr class="search"><td>';
    row += reg.name; //row = row + reg.name;
    row += "</td>";
    row += "<td>";
    row += reg.gender;
    row += "</td>";
    row += "<td>";
    row += reg.sport;
    row += "</td>";
    row += "<td>";
    row += reg.team;
    row += "</td>";
    row += "<td>";
    row += reg.event;
    row += "</td>";
    row += "<td>";
    row += reg.medal;
    row += "</td></tr>";
    table += row;
  }

  if(data.length>0){

    //mostrar pais y pocentaje de mujeres
    if(country!=="all"){
      document.getElementById("porcentajeWomen").innerHTML = porWomennn+"%"+"  "+"Femenino";
      document.getElementById("porcentajeMen").innerHTML =100-parseFloat(porWomennn)+"%"+"  "+"Masculino";
      document.getElementById("countryPorcentaje").innerHTML = country;
      
    }

    if(country==="all"){
      document.getElementById("porcentajeWomen").innerHTML = porWomennn+"%"+"  "+"Femenino";
      document.getElementById("porcentajeMen").innerHTML =100-parseFloat(porWomennn)+"%"+"  "+"Masculino";
      document.getElementById("countryPorcentaje").innerHTML = "Todos los paises";

    }

  document.getElementById("tbl").innerHTML = table;
  document.getElementById("table").style= " "; // show
  document.getElementById("search").value = "";
  atletheCount.innerHTML = data.length; // Pantalla muestra cantidad de atletas
  document.getElementById("noDatos").style.visibility = "hidden";

}else{
  document.getElementById("porcentajeWomen").innerHTML = "0"+"%"+"  "+"Femenino";
  document.getElementById("porcentajeMen").innerHTML = "0"+"%"+"  "+"Masculino";
  document.getElementById("countryPorcentaje").innerHTML = country;
  document.getElementById("table").style.display = "none";
  atletheCount.innerHTML = 0; // Pantalla muestra cantidad de atletas
  document.getElementById("noDatos").innerHTML = noencontrado;
  document.getElementById("noDatos").style.visibility = "visible"; // show

}

}
//FILTRO DE BUSQUEDA
document.addEventListener("keyup", (evt) => {
  //keyup, oprimir y soltar una tecla
  if (evt.target.matches("#search")) {
    // target referencia al objeto al cual se lanzo el evento
    document.querySelectorAll(".search").forEach((row) => {
      row.textContent.toLowerCase().includes(evt.target.value.toLowerCase()) //operador de sigo
        ? row.classList.remove("filter") //no oculta
        : row.classList.add("filter") //oculta


    });
  }
});

window.onload = filterByCGM; //carga la tabla al cargar la pagína por priemra vez
document.getElementById("pantallados").style.display = "none";

//pantalla uno

document.getElementById('infoAtletas').addEventListener('click',function(){
  document.getElementById("pantallaUno").style.display = "none";
  document.getElementById("pantallados" ).style.display = ''; // show
});

//Inicio de pantalla dos
document.getElementById('inicio').addEventListener('click',function(){
  document.getElementById("pantallados" ).style.display = "none"; // show
document.getElementById("pantallaUno").style.display = '';
});