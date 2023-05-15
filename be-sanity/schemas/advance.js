//advance english schema
export default{

    //this 'name' is used in the query i.e "_type": "advance" to fetch the data from sanity
    name: 'advance',
    title: 'Advance', //document type name
    type: 'document', //advance document

    //fields available in 'advance' document
    fields : [
        {
            name : 'normalPhrase',
            title : 'Normal Phrase',
            type : 'string'
        },
        {
            name : 'advancePhrase',
            title : 'Advance Phrase',
            type : 'string'
        },
        {
            name : 'sentence',
            title : 'Sentence',
            type : 'string'
        },
    ]
}