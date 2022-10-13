import './styles/index.scss';

interface CountryData {
  name: string;
  flag: string;
  phone: number;
}

interface CountryResponse {
  name: string;
  flags: {
    svg: string;
  };
  callingCodes: string[];
}

interface LocationData {
  name: string;
  flag: string;
  phone: number;
}

const nav: HTMLDivElement = document.querySelector('.nav__links')!;
const logo: HTMLDivElement = document.querySelector('.nav__logo')!;
const countryCodeBtn: HTMLButtonElement = document.querySelector('.btn--select')!;
const countryCodeOptions: HTMLDivElement = document.querySelector('.options')!;
const countrySearch: HTMLInputElement = document.querySelector('#phone-search')!;
const currentPhone: HTMLButtonElement = document.querySelector('#select')!;

// Nav functionality

logo.addEventListener('click', () => document.querySelector('.hero')?.scrollIntoView({ behavior: 'smooth' }));

nav.addEventListener('click', e => {
  const target = e.target as HTMLAnchorElement;
  // console.log(target?.classList.contains('nav__link'));
  if (!target?.classList.contains('nav__link')) return;
  e.preventDefault();
  const href = target.getAttribute('href')!;
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
});

// Get country data
const getCountryData = async () => {
  try {
    const req = await fetch(`https://restcountries.com/v2/regionalbloc/eu`);
    const res: CountryResponse[] = await req.json();
    const data: CountryData[] = [];
    res.forEach(c => {
      const obj = {
        name: c.name,
        flag: c.flags.svg,
        phone: Number(c.callingCodes[0]),
      };
      data.push(obj);
    });
    return data;
  } catch (error) {
    console.error(error.message);
    return;
  }
};

const getCurrentCountry = async () => {
  try {
    const preReq = await fetch(`https://api.ipregistry.co/?key=egj8f14wsd947qsm`);
    const preRes: {
      location: {
        country: {
          name: string;
        };
      };
    } = await preReq.json();
    const countryName = preRes.location.country.name;
    console.log(countryName);
    const req = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    const res = await req.json();
    const data: LocationData = {
      name: res[0].name.common,
      flag: res[0].flags.svg,
      phone: Number(res[0].idd.root[1] + res[0].idd.suffixes[0]),
    };
    return data;
  } catch (error) {
    console.error(error.message);
    return;
  }
};

// Show / Hide country codes (phone) select menu
const showCountryCodes = function () {
  countryCodeOptions.classList.remove('hidden');
  setTimeout(() => {
    countryCodeOptions.classList.add('fade');
  }, 10);
  document.body.classList.add('no-scroll');
};
const hideCountryCodes = function () {
  countryCodeOptions.classList.remove('fade');
  setTimeout(() => {
    countryCodeOptions.classList.add('hidden');
  }, 250);
  document.body.classList.remove('no-scroll');
};

countryCodeBtn.addEventListener('click', e => {
  e.preventDefault();
  countryCodeOptions.classList.contains('hidden') ? showCountryCodes() : hideCountryCodes();
});

// Insert HTML code into country code select
// countryCodes.

// Search input
countrySearch.addEventListener('input', e => {
  const target = e.target as HTMLInputElement;
  const text = target.value;
  console.log(text);
});

const countryData: CountryData[] | undefined = await getCountryData();
// console.table(countryData);

countryData?.forEach(data =>
  countryCodeOptions.insertAdjacentHTML(
    'beforeend',
    `
<p class="country" data-countryname="${data.name.toLowerCase()}" value="${data.phone}">
	<span class="data"><img src="${data.flag}" class="flag" /> +${data.phone}</span>
	<span class"country-name">${data.name}</span>
</p>
`
  )
);

const userLocation = await getCurrentCountry();
console.log(userLocation);

currentPhone.innerHTML = '';
currentPhone.insertAdjacentHTML(
  'beforeend',
  `
	<div class="selected-country" data-code="${userLocation?.phone}">
		<img src="${userLocation?.flag}" alt="${userLocation?.name}" />
		<p>+${userLocation?.phone}</p>
	</div>
`
);
