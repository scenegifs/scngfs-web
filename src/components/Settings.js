const DEBUG = false

const production = {
  debug: DEBUG,
  GA_ID: 'UA-137847811-1',
  auth_token: '131127a9895ffb3748676b10322f9cf5',
  service_url: 'https://scngfs.xyz',
  catalog: 'seinfeld',
  catalogs: {
    'office': 'The Office',
    'seinfeld': 'Seinfeld',
    'pandr': 'Parks and Recreation',
    'randm': 'Rick and Morty',
    'lebowski': 'The big Lebowski',
    'newsradio': 'News Radio',
    'napoleond': 'Napoleon Dynamite',
    'idiocracy': 'Idiocracy'
  }
}

const debug = {
  ...production,
  service_url: 'http://localhost:8000',
  catalog: 'seinfeld'
}

export default DEBUG ? debug : production
