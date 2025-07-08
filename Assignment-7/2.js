// Import default and named exports
import User from './user.js';
import { validateEmail } from './user.js';

const user = new User('Alice');
console.log(user.getInfo());

const email = 'alice@example.com';
console.log(`Is "${email}" valid?`, validateEmail(email));
