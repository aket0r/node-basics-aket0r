const fs = require("fs");
const readline = require("readline");
const chalk = require("chalk").default;


class TerminalCmds {
    isDirectory(path) {
        fs.stat(path, (err, stats) => {
            if (err) {
                console.log(`${chalk.bgRed('[ERROR]')} ${err}`);
                throw err;
            }

            if (stats.isFile()) {
                this.readFile(path);
                console.log(`${chalk.bgMagentaBright('[REDIRECT]')} redirecting to readFile function...\n`);
            }
        });
    }

    readdir(path = 'C:/') {
        const res = this.isDirectory(path);

        fs.readdir(path, (err, files) => {
            if (err) {
                console.log(`${chalk.bgRed('[ERROR]')} ${err.message} | ${err.errno}`);
                return;
            }
            
            console.log(`\n${chalk.bgMagenta('[readdir]')}`, files);
        })
    }

    readFile(file) {
        fs.readFile(file, 'utf-8', function(err, data) {
            if (err) {
                console.log(`${chalk.bgRed('[ERROR]')} ${err.message} | ${err.errno}`);
                throw err;
            }

            console.log(`\n${chalk.bgMagenta('[readFile]')} ${data}`);
            return data;
        });
    }

    appendFile(file, text) {
        fs.appendFile(file, text, (err) => {
            if (err) {
                console.log(`${chalk.bgRed('[ERROR]')} ${err.message} | ${err.errno}`);
                throw err;
            }

            console.log(`\n${chalk.bgMagenta('[appendFile]')} The "${chalk.greenBright(text)}" was appended to ${chalk.greenBright(file)}!`);
        })
    }

    unlink(file) {
        fs.unlink(file, (err, res) => {
            if (err) {
                console.log(`${chalk.bgRed('[ERROR]')} ${err.message} | ${err.errno}`);
                throw err;
            }
            console.log(`\n${chalk.bgMagenta('[unlink]')} "${chalk.redBright(file)}" deleted successfully!`);
            return 'unlink: success!'
        })
    }
}

const terminal = new TerminalCmds;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter command here (or help): ', cmd => {
    if (cmd === 'help') {
        console.log(`Commands (4):
Command: ${chalk.greenBright('readdir')} [file] | ${chalk.magenta('Read directory (and show list of files)')} | Example: ${chalk.cyanBright('readdir C:/Documents/')}
Command: ${chalk.greenBright('readfile')} [file] | ${chalk.magenta('Read file')} | Example: ${chalk.cyanBright('readfile C:/Documents/file.txt')}
Command: ${chalk.greenBright('appendfile')}  [file] [text] | ${chalk.magenta('Add text to file')} | Example: ${chalk.cyanBright('appendfile C:/Documents/file.txt hello world')}
Command: ${chalk.greenBright('unlink')} [file] | ${chalk.magenta('Delete file/directory')} | Example: ${chalk.cyanBright('readdir C:/Documents/')}`);
        rl.close();
        return;
    }

    if (cmd.includes('readdir')) {
        const input = cmd.split('readdir')[1].trim();
        terminal.readdir(input);
        rl.close();
        return;
    }

    if (cmd.includes('readfile')) {
        const file = cmd.split(' ')[1];
        terminal.readFile(file);
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