/* sanity configuration */
import {createClient}  from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: "",
  dataset: '',
  apiVersion: '',
  useCdn: true,
  //token is important for sending info from app to sanity document's fields in sanity
  token:''
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
