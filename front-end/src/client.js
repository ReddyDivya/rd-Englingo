/* sanity configuration */
import {createClient}  from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '12bn7nhe',
  dataset: 'production',
  apiVersion: 'v2021-10-21',
  useCdn: true,
  //token is important for sending info from app to sanity document's fields in sanity
  token:'sk6I1GcBIAuk5gHJIqohxejiW3sjz7xw3rJiaXJtnocOYNyzHDTrEuwtpoNsFEmYBioAuclFV8BkBmvI8uGWG7ZmwnbjtJl8uswck6i8oJf7SxOLSF3zPXVopCrDL6UYOV1dm0O0u5TZqaJ9rKInJqLYng9fNqxdGn7BIkPffX0rh9Fpx3Um'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
