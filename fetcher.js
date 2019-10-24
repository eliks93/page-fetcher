const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const path = process.argv[3];
const stdin = process.stdin;
const url = process.argv[2];
stdin.setRawMode(true);
stdin.setEncoding('utf8');

request(url, (error, response, body) => {
  if (!error) {
    let html =  body;
    fs.access(path, fs.F_OK, (err) => {
      if (err) {
        fs.writeFile(path, html, function(err) {
          if (!err) {
            console.log('Saved!');
            rl.close();
          } else {
            console.log('Invalid Path');
            rl.close();
          }
        });
        return;
      }
      rl.question('File exists, do you want to overwrite?', (data) => {
        if (data === 'Y') {
          fs.writeFile(path, html, function(err) {
            if (err) throw err;
            console.log('Overwritten!');
            rl.close();
          });
        } else {
          rl.close();
        }
      });
    });
  } else {
    console.log('Please enter a valid address');
    rl.close();
  }
});