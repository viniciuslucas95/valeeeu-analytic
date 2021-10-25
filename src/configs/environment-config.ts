import dotenv from 'dotenv';

dotenv.config();

export class EnvironmentConfig {
  private static readonly env = process.env;
  static readonly serverPort = this.env.SERVER_PORT ?? 4000;
  static readonly postgresqlUser = this.env.POSTGRESQL_USER ?? 'analytic';
  static readonly postgresqlPassword =
    this.env.POSTGRESQL_PASSWORD ?? 'analytic';
  static readonly postgresqlDatabase =
    this.env.POSTGRESQL_DATABASE ?? 'analytic';
  static readonly postgresqlHost =
    this.env.POSTGRESQL_HOST ?? 'valeeeu_dev_postgresql';
}
