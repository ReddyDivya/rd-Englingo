//advanced english schema
export default{

    //this 'name' is used in the query i.e "_type": "Advanced" to fetch the data from sanity
    name: 'advanced',
    title: 'Advanced', //document type name
    type: 'document', //Advanced document

    //fields available in 'advanced' document
    fields : [
        {
            name : 'normalPhrase',
            title : 'Normal Phrase',
            type : 'string'
        },
        {
            name : 'advancedPhrase',
            title : 'Advanced Phrase',
            type : 'string'
        },
    ]
}