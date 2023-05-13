/* sanity configuration */
import {createClient}  from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: "12bn7nhe",
  dataset: 'production',
  apiVersion: 'v2021-10-21',
  useCdn: true,
  //token is important for sending info from app to sanity document's fields in sanity
  token:'skBZ8NYhg85h1UnOiH2XBIjGFmusDv2ZamaN0Tc5OyScNNlCJMWJLmDLd9sp9GoTVZPDsUUjwgAV4EVQqzntPEOtUaV9RPQ1krskC9hsF5YvTMk8LQZVAsRV2WVt4VjLTzcljqRYcwE1VCKUAjgRok1Awt3vQwlgzxCT8ajhKkLRpsMeB1jk'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
