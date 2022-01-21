# NgUnsplashBrowser

NgUnsplashBrowser is a simple Angular web application to demonstrate the use of the 
[unsplash](https://unsplash.com) API.

## Getting started

To prevent your unsplash developer access key from leaking it is defined in the 
`unsplash-config.ts` file which is excluded from the git repository via `.gitignore`. Create 
`unsplash-config.ts` in the `src/app/services/unsplash` directory. The unsplash-config.ts file 
has the following format:
```typescript
export const UnsplashConfig = {
  accessKey: '<unsplash-access-key>'
}
```

To start the application in development mode run `npm start`. The application will be served on 
`http://localhost:4400`.
