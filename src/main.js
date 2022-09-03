import athletes from "./data/athletes/athletes.js";
import { percentage, countryData, genderData, medalData, dataFilter, } from "./data.js";

//CREAR SELECT DE FILTRO DE PAISES
let optionsCountry = "<option value=\"all\">Todos</option>";
for (const country of countryData(athletes)) {
    optionsCountry += '<option value="' + country + '">' + country + "</option>";
}
document.getElementById("selectCountry").innerHTML = optionsCountry;

//CREAR SELECT DE FILTRO DE GENEROS
let optionsGender = '<option value="all">Todos</option>';
for (const gender of genderData(athletes)) {
    optionsGender += '<option value="' + gender + '">' + gender + "</option>";
}
document.getElementById("selectGender").innerHTML = optionsGender;

//CREAR SELECT DE FILTRO DE MEDALLAS
let optionsMedal = '<option value="all">Todos</option>';
for (const medal of medalData(athletes)) {
    optionsMedal += '<option value="' + medal + '">' + medal + "</option>";
}
document.getElementById("selectMedal").innerHTML = optionsMedal;

//ORDENAR DATA
document.getElementById("btn").addEventListener("click", orderByName);

function orderByName() {
    let btnValue = document.getElementById("btn").value;
    let order = ""; /*inicializo la variable */
    if (btnValue == "1") {
        order = "1";
        document.getElementById("btn").value = "2";
    } else {
        order = "2";
        document.getElementById("btn").value = "1";
    }
    filterByCGM(order);
}

//BOTON DE FILTRO
document.getElementById("filters").addEventListener("click", filterByCGM);

function filterByCGM(order) {
    let country = document.getElementById("selectCountry").value;
    let gender = document.getElementById("selectGender").value;
    let medal = document.getElementById("selectMedal").value;


    let atletheCount = document.getElementById("atletheCount");
    let arrayData = dataFilter(athletes, country, gender, medal);
    let porWomennn = percentage(arrayData);
    let noencontrado = `
  <img src="/src/img/no-hay-resultados.png" alt="">
  `;
    //FROMA DE CREAR TABLAS

    if (order == "1") {
        arrayData.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (order == "2") {
        arrayData.sort((a, b) => a.name.localeCompare(b.name)).reverse();
    }

    let table = "";

    for (const reg of arrayData) {
        let row = '<tr class="search"><td>';
        row += reg.name;
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
        row += "</td> </tr>";

        table += row;
    }

    if (arrayData.length > 0) {
        //mostrar pais y pocentaje de mujeres
        if (country !== "all") {
            document.getElementById("porcentajeWomen").innerHTML = porWomennn + "%" + "  " + " e Mujeres Participantes";
            document.getElementById("porcentajeMen").innerHTML = 100 - parseFloat(porWomennn) + "%" + "  " + " De Hombres Participantes";
            document.getElementById("countryPorcentaje").innerHTML = country;

        }

        if (country === "all") {
            document.getElementById("porcentajeWomen").innerHTML = porWomennn + "%" + "  " + " De Mujeres Participantes";
            document.getElementById("porcentajeMen").innerHTML = 100 - parseFloat(porWomennn) + "%" + "  " + " De Hombres Participantes";
            document.getElementById("countryPorcentaje").innerHTML = "Todos los Paises";

        }
        document.getElementById("table").style.display = "";

        document.getElementById("tbl").innerHTML = table;
        //document.getElementById("table").style = " "; // show
        document.getElementById("search").value = "";
        atletheCount.innerHTML = arrayData.length; // Pantalla muestra cantidad de atletas
        document.getElementById("noDatos").style.visibility = "hidden";

    } else {

        document.getElementById("table").style.display = "none";

        document.getElementById("porcentajeWomen").innerHTML = "0" + "%" + "  " + "De Mujeres Participantes";
        document.getElementById("porcentajeMen").innerHTML = "0" + "%" + "  " + " De Hombres Participantes";
        document.getElementById("countryPorcentaje").innerHTML = country;
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
                ?
                row.classList.remove("filter") //no oculta
                :
                row.classList.add("filter") //oculta


        });
    }
});

document.getElementById("pantallados").style.display = "none";

//pantalla uno

document.getElementById('infoAtletas').addEventListener('click', function() {
    document.getElementById("pantallaUno").style.display = "none";
    document.getElementById("pantallados").style.display = ''; // show
});

//Inicio de pantalla dos
document.getElementById('inicio').addEventListener('click', function() {
    document.getElementById("pantallados").style.display = "none"; // show
    document.getElementById("pantallaUno").style.display = '';
});

window.onload = filterByCGM("0");