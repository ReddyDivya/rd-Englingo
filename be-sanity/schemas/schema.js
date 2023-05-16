// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import vocabs from './vocabs';
import idioms from './idioms';
import sentences from './sentences';
import very from './very';
import advanced from './advanced';
import synonyms from './synonyms';
import otherways from './otherways';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([vocabs, idioms, sentences, very, advanced, synonyms, otherways
    /* Your types here! */
  ]),
})