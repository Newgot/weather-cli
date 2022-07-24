import chalk from 'chalk'
import dedent from 'dedent-js';

export const printError = (err) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + err);
}

export const printSucces = (msg) => {
    console.log(chalk.bgGreen(' SUSSES ') + ' ' + msg);
}
export const printHelp = () => {
    console.log(
        dedent `${chalk.bgCyan(' HELP ')}
        Бех параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [APY_KEY] для cохранения токена
    `);
}