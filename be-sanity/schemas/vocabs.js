export default{
    //this name is used in the query i.e "_type": "vocabs" to fetch the data from sanity
    name: 'vocabs',
    title: 'Vocabs', //document type name
    type: 'document', //vocabs document
    
    //fields available in 'vocabs' document
    fields: [
        {
            name: 'word', 
            title: 'Word',
            type: 'string' 
        },
        {
            name: 'meaning',
            title: 'Meaning',
            type: 'string' 
        },
        {
            name: 'sentence',
            title: 'Sentence',
            type: 'string'
        },
    ]
}