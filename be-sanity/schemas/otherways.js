//other ways english schema
export default{

    //this 'name' is used in the query i.e "_type": "otherways" to fetch the data from sanity
    name: 'otherways',
    title: 'Other ways', //document type name
    type: 'document', //otherways document

    //fields available in 'otherways' document
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