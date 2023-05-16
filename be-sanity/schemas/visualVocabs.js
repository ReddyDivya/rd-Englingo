//visual Vocabs english schema
export default{

    //this 'name' is used in the query i.e "_type": "visualVocabs" to fetch the data from sanity
    name: 'visualVocabs',
    title: 'Visual Vocabs', //document type name
    type: 'document', //visualVocabs document

    //fields available in 'visualVocabs' document
    fields : [
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