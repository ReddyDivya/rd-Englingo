//picture-dictionary schema
export default{
    //this name is used in the query i.e "_type": "picture-dictionary" to fetch the data from sanity
    name: 'picture-dictionary',
    title: 'Picture Dictionary', //document type name
    type: 'document', //picture-dictionary document
    
    //fields available in 'picture-dictionary' document
    fields: [
        {
            name: 'imageUrl', 
            title: 'ImageUrl',
            type: 'image',
            options:{
                hotspot : true,
            },
        },
    ]
}