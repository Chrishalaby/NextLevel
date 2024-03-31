import { Environment } from 'src/app/shared/models/environment.model';

export const environment: Environment = {
  apiUrl: 'http://16.171.151.92/api/data',
  production: true,
  defaultLanguage: 'en',
  apiBaseUrl: 'http://localhost:3000',
  imageBaseUrl: 'http://localhost:3000/uploads/',
};
// export const environment: Environment = {
//   apiUrl: 'https://fithub.azurewebsites.net/',
//   production: true,
//   defaultLanguage: 'en',
//   apiBaseUrl: 'https://fithub.azurewebsites.net',
//   imageBaseUrl: 'http://my-app-label-unique.eastus.azurecontainer.io/uploads/',
// };
