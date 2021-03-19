process.stdin.setEncoding('utf8');

process.stdin
    .on('data', (data) => {
        const result = data.trim().split('').reverse().join('');
        console.log(result);
    })
    .on('error', (err) => console.error(err));
