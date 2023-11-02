var os = require('os');
const dns = require('dns');  
const crypto = require('crypto');  

console.log("Hello World");


// console.log(["os.arch()",os.arch()]);
// console.log(["os.cpus()",os.cpus()]);
// console.log(["os.endianness()",	os.endianness()]);
// console.log(["os.freemem()",	os.freemem()]);
// console.log("os.loadavg(): ",os.loadavg());  
// console.log("os.platform(): ",os.platform());  
// console.log("os.release(): ",os.release());  
// console.log("os.tmpdir(): ",os.tmpdir());  
// console.log("os.totalmem(): ",os.totalmem());  
// console.log("os.type(): ",os.type());  
// console.log("os.uptime(): ",os.uptime());  

// setInterval(function() {  
//     console.log("setInterval: Hey! 1 millisecond completed!..");   
//    }, 2000);  


// setTimeout(function() {   
//     console.log("setTimeout: Hey! 1000 millisecond completed!..");  
//     }, 1000);  


    // var recursive = function () {  
    //     console.log("Hey! 1000 millisecond completed!..");   
    //     setTimeout(recursive,1000);  
    // }  
    // recursive();   


//     function welcome () {  
//   console.log("Welcome to JavaTpoint!");  
// }  
// var id1 = setTimeout(welcome,1000);  
// var id2 = setInterval(welcome,1000);  
// clearTimeout(id1);  


// try {  
//     const a = 1;  
//     const c = a + b;  
//   } catch (err) {  
//     console.log(err);  
//   }  


// const fs = require('fs');  
// function nodeStyleCallback(err, data) {  
//  if (err) {  
//    console.error('There was an error', err);  
//    return;  
//  }  
//  console.log(data);  
// }  
// fs.readFile('/some/file/that/does-not-exist', nodeStyleCallback);  
// fs.readFile('/some/file/that/does-exist', nodeStyleCallback);  


// dns.lookup('www.javatpoint.com', (err, addresses, family) => {  
//   console.log('addresses:', addresses);  
//   console.log('family:',family);  
// });  


// dns.resolve4('www.javatpoint.com', (err, addresses) => {  
//     if (err) throw err;  
//     console.log(`addresses: ${JSON.stringify(addresses)}`);  
//     addresses.forEach((a) => {  
//       dns.reverse(a, (err, hostnames) => {  
//         if (err) {  
//           throw err;  
//         }  
//         console.log(`reverse for ${a}: ${JSON.stringify(hostnames)}`);  
//       });  
//     });  
//   });  


// dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {  
//     console.log(hostname, service);  
//       // Prints: localhost  
//   });  


// HMAC


// const secret = 'manish';  
// const hash = crypto.createHmac('sha256', secret)  
//                    .update('Welcome Message')  
//                    .digest('hex');  
// console.log(hash);  



// const cipher = crypto.createCipher('aes192', 'a password');  
// var encrypted = cipher.update('Hello JavaTpoint', 'utf8', 'hex');  
// encrypted += cipher.final('hex');  
// console.log(encrypted);   


// const decipher = crypto.createDecipher('aes192', 'a password');  
// var decrypted = decipher.update(encrypted, 'hex', 'utf8');  
// decrypted += decipher.final('utf8');  
// console.log(decrypted);  