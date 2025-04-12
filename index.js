const fs = require("fs");
const readline = require("readline");
const chalk = require("chalk").default;

class TerminalCmds {
    readdir(path = 'C:/') {
        fs.readdir(path, (err, files) => {
            if (err) {
                console.log(`${chalk.bgRed('[ERROR]')} ${err}`);
                throw err;
            }

            console.log(`${chalk.bgGreen('[readdir]')} ${chalk.cyan(files)}`);
        })
    }

    readFile(file, isOpen = false) {
        fs.readFile(file, 'utf-8', function(err, data) {
            if (err) {
                console.log(`${chalk.bgRed('[ERROR]')} ${err}`);
                throw err;
            }

            console.log(`${chalk.bgGreen('[readFile]')} ${chalk.cyan(data)}`);
            return data;
        });
    }

    appendFile(file, text) {
        fs.appendFile(file, text, (err) => {
            if (err) {
                console.log(`${chalk.bgRed('[ERROR]')} ${err}`);
                throw err;
            }

            console.log(`${chalk.bgGreen('[appendFile]')} The "${chalk.greenBright(text)}" was appended to ${chalk.greenBright(file)}!`);
        })
    }

    unlink(file) {
        fs.unlink(file, (err, res) => {
            if (err) {
                console.log(`${chalk.bgRed('[ERROR]')} ${err}`);
                throw err;
            }
            console.log(res || `[${chalk.bgGreen('[unlink]')}] "${chalk.redBright(file)}" deleted successfully!`);
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
        console.log(`Commands (4):
Command: ${chalk.greenBright('readdir')} [file] | ${chalk.magenta('Read directory (and show list of files)')} | Example: ${chalk.cyanBright('readdir C:/Documents/')}
Command: ${chalk.greenBright('readfile')} [file] [false/true] | ${chalk.magenta('Open or read file')} | Example: ${chalk.cyanBright('readfile C:/Documents/file.txt false')}
Command: ${chalk.greenBright('appendfile')}  [file] [text] | ${chalk.magenta('Add text to file')} | Example: ${chalk.cyanBright('appendfile C:/Documents/file.txt hello world')}
Command: ${chalk.greenBright('unlink')} [file] | ${chalk.magenta('Delete file/directory')} | Example: ${chalk.cyanBright('readdir C:/Documents/')}`);
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

    if (cmd.includes('appendfile')) {
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