import { Environment } from 'src/app/shared/models/environment.model';

// export const environment: Environment = {
//   apiUrl: 'http://16.171.151.92/api/data',
//   production: true,
//   defaultLanguage: 'en',
//   apiBaseUrl: 'http://localhost:3000',
//   imageBaseUrl: 'http://localhost:3000/uploads/',
// };
export const environment: Environment = {
  apiUrl: 'https://my-app-label-unique.eastus.azurecontainer.io:3000',
  production: true,
  defaultLanguage: 'en',
  apiBaseUrl: 'https://my-app-label-unique.eastus.azurecontainer.io:3000',
  imageBaseUrl: 'https://my-app-label-unique.eastus.azurecontainer.io/uploads/',
};
