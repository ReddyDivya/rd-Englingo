//Instead of very schema
export default{

    //this 'name' is used in the query i.e "_type": "very" to fetch the data from sanity
    name: 'very',
    title: 'Very', //document type name
    type:'document', //very document

    //fields available in 'very' document
    fields : [
        {
            name : 'word',
            title: 'Word',
            type: 'string'
        },
        {
            name : 'alternative',
            title: 'Alternative',
            type: 'string'
        },
    ]
}