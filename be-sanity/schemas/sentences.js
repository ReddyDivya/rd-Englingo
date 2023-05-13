export default{
    //this name is used in the query i.e "_type": "sentences" to fetch the data from sanity
    name: 'sentences',
    title: 'Sentences', //document type name
    type: 'document', //sentences document
    
    //fields available in 'sentences' document
    fields: [
        {
            name: 'sentence',
            title: 'Sentence',
            type: 'string'
        },
    ]
}