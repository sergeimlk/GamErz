export default class Logger {
  static info(msg: string) {
    console.info(`[INFO] ${new Date().toLocaleString("fr-FR")} ${msg}`);
  }

  static error(msg: any) {
    console.info(`[ERROR] ${new Date().toLocaleString("fr-FR")} ${msg}`);
  }
}
