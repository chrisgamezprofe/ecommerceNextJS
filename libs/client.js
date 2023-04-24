import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId:'wx3qgwur',
    dataset:'production',
    apiVersion:'2024-04-22',
    useCdn:true,
    token:process.env.PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor  = (source)=> builder.image(source)