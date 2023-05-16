//grammar
export default {
    name:'grammar',
    title:'Grammar',
    type:'document',
    fields:[
        {
            name:'heading',
            title:'Heading',
            type:'string'
        },
        {
            name:'notes',
            title:'Notes',
            type:'text'
        },
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