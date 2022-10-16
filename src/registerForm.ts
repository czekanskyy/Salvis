interface CountryName {
  location: {
    country: {
      name: string;
    };
  };
}

interface CountryData {
  name: string;
  flag: string;
  phone: number;
}

const locateMe = async () => {
  try {
    // Get user's country data based on it's IP Address
    const res = await fetch(`https://api.ipregistry.co/?key=egj8f14wsd947qsm`);
    const data: CountryName = await res.json();
    return data.location.country.name;
  } catch (error) {
    console.error(error.message);
    return;
  }
};

// Get data of a country where user is located (based on IP)
const getUserCountryData = async () => {
  try {
    const countryName = await locateMe();

    // Throw Error if unable to get user country name
    if (!countryName) throw new Error("Sorry, we couldn't locate you.");

    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    const data = await res.json();

    // Select only usefull props of the fetched data
    const filteredData: CountryData = {
      name: data[0].name.common,
      flag: data[0].flags.svg,
      phone: Number(data[0].idd.root[1] + data[0].idd.suffixes[0]),
    };
    return filteredData;
  } catch (error) {
    console.error(error.message);
    return;
  }
};

// Get data of the served countries
const getServedCountriesData = async () => {
  try {
    const res = await fetch(`https://restcountries.com/v2/regionalbloc/eu`);
    const data = await res.json();

    // Select only usefull props of the fetched data
    const filteredData: CountryData[] = [];
    data.forEach((el: any) => {
      filteredData.push({
        name: el.name,
        flag: el.flag,
        phone: Number(el.callingCodes[0]),
      });
    });
    return filteredData;
  } catch (error) {
    console.error(error.message);
    return;
  }
};

// Display flag, area code & name a country where user is located
const setUserAreaCode = async (el: HTMLElement) => {
  const data = await getUserCountryData();

  el.innerHTML = '';
  el.insertAdjacentHTML(
    'beforeend',
    `
		<div class="selected-country" data-code="${data?.phone}">
		<img src="${data?.flag}" alt="${data?.name}" />
		<p>+${data?.phone}</p>
		</div>
		`
  );
};

// Set area code to selected one
const setSelectedAreaCode = (el: HTMLElement, parent: HTMLElement) => {
  const data: CountryData = {
    name: el.dataset.countryname!,
    flag: el.children[0].children[0].getAttribute('src')!,
    phone: Number(el.dataset.code!),
  };

  parent.innerHTML = '';
  parent.insertAdjacentHTML(
    'beforeend',
    `
		<div class="selected-country" data-code="${data?.phone}">
		<img src="${data?.flag}" alt="${data?.name}" />
		<p>+${data?.phone}</p>
		</div>
		`
  );
};

// Display flag, area code & name of served countries
const setServedAreaCodes = async (el: HTMLElement) => {
  const data = await getServedCountriesData();

  el.innerHTML = '';
  data?.forEach(country => {
    el.insertAdjacentHTML(
      'beforeend',
      `
			<p class="country" data-countryname="${country.name.toLowerCase()}" data-code="${country.phone}">
				<span class="data"><img src="${country.flag}" class="flag" /> +${country.phone}</span>
				<span class"country-name">${country.name}</span>
			</p>
			`
    );
  });
};

// Handle form submition (user registration)
const handleSubmit = () => {
  return;
};

export { handleSubmit, setUserAreaCode, setServedAreaCodes, setSelectedAreaCode };
