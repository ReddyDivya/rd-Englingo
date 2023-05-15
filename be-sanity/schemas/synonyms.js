export default {

    //this name is used in the query i.e "_type": "synonyms" to fetch the data from sanity
    name: 'synonyms',
    title: 'Synonyms', //document type name
    type: 'document', //sentences document

    //fields available in 'synonyms' document
    fields : [
        {
            name : 'word',
            title : 'Word',
            type: 'string',
        },
        {
            name : 'synonyms',
            title : 'Synonyms',
            type: 'string',
        },
        {
            name : 'sentence',
            title : 'Sentence',
            type: 'string',
        },
    ]
}