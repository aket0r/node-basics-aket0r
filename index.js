const fs = require("fs");
const readline = require("readline");


class TerminalCmds {
    readdir(path = 'C:/') {
        fs.readdir(path, (err, files) => {
            if (err) throw err;

            console.log(files);
        })
    }

    readFile(file, isOpen = false) {
        fs.readFile(file, 'utf-8', function(err, data) {
            if (err) throw err;

            console.log(data);
            return data;
        });
    }

    appendFile(file, text) {
        fs.appendFile(file, text, (err) => {
            if (err) throw err;

            console.log(`The "${text}" was appended to ${file}!`);
        })
    }

    unlink(file) {
        fs.unlink(file, (err, res) => {
            if (err) throw err;
            console.log(res || `"${file}" deleted!`);
            return 'unlink: success!'
        })
    }
}

const terminal = new TerminalCmds;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter some command (or help): ', cmd => {
    if (cmd === 'help') {
        console.log(`You can use commands "read", "readFile", "appendFile", "unlink".`);
        rl.close();
        return;
    }

    if (cmd.includes('readdir')) {
        const input = cmd.split('readdir')[1];
        const [text, rawPath] = input.split(' ');
        const cleanedPath = rawPath.trim().replace(/^["']|["']$/g, '');
        terminal.readdir(cleanedPath);
        rl.close();
        return;
    }

    if (cmd.includes('readfile')) {
        const file = cmd.split(' ')[1];
        const open = cmd.split(' ')[2];
        terminal.readFile(file, open);
        rl.close();
        return;
    }

    if (cmd.includes('appendFile')) {
        const file = cmd.split(' ')[1];
        const text = cmd.split(file)[1];
        terminal.appendFile(file, text.trim());
        rl.close();
        return;
    }

    if (cmd.includes('unlink')) {
        const path = cmd.split('unlink')[1].trim().replace(/^["']|["']$/g, '');
        terminal.unlink(path);
        rl.close();
        return;
    }

    console.log('Cannot read command "' + cmd + '". Use "help"');
    rl.close();
})