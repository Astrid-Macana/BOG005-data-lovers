export const dataFilter = (athletes, country, gender, medal) => {
    let filterCountry = athletes.athletes;
    let filterGender = filterCountry;
    let filterMedal = filterGender;
    if (country != "all") {
        filterCountry = filterCountry.filter((athletes) =>
            athletes.team.includes(country)
        );
        filterGender = filterCountry;
        filterMedal = filterGender;
    }
    if (gender != "all") {
        filterGender = filterGender.filter((athletes) =>
            athletes.gender.includes(gender)
        );
        filterMedal = filterGender;
    }
    if (medal != "all") {
        filterMedal = filterMedal.filter((athletes) =>
            athletes.medal.includes(medal)
        );
    }

    return filterMedal;

}

export const countryData = (athletes) => {
    let countriesArray = [];
    for (const country of(athletes.athletes)) {
        countriesArray.push(country.team);
    }
    return countriesArray
        .filter((country, pos) => {
            return countriesArray.indexOf(country) == pos;
        })
        .sort(); //permite organizar de menor a mayor un array
};

export const genderData = (athletes) => {
    let gendersArray = [];
    for (const gender of athletes.athletes) {
        gendersArray.push(gender.gender);
    }

    return gendersArray
        .filter((gender, pos) => {
            return gendersArray.indexOf(gender) == pos;
        })
        .sort(); //permite organizar de menor a mayor un array
};

export const medalData = (athletes) => {
    let medalsArray = [];
    for (const medal of athletes.athletes) {
        medalsArray.push(medal.medal);
    }
    return medalsArray
        .filter((medal, pos) => {
            return medalsArray.indexOf(medal) == pos;
        })
        .sort(); //permite organizar de menor a mayor un array
};


// funcion calcular
export const percentage = (dataaa) => {

    let auxWomen = 0;
    dataaa.map((index) => {
        if (index.gender === "F") {
            auxWomen++;
        }
    })

    let porWomen = (auxWomen * 100) / dataaa.length;
    let result = Number(porWomen.toFixed(2));

    return result;
};