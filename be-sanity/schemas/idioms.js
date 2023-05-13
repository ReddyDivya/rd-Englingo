export default{
    //this name is used in the query i.e "_type": "idioms" to fetch the data from sanity
    name: 'idioms',
    title: 'Idioms', //document type name
    type: 'document', //idioms document
    
    //fields available in 'idioms' document
    fields: [
        {
            name: 'idiom', 
            title: 'idiom',
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