import PocketBase from 'pocketbase';

const pocketbaseUrl = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';

const pb = new PocketBase(pocketbaseUrl);

export default pb;
