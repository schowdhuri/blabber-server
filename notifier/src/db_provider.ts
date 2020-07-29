import knex from "knex";

class DBProvider {
  private _tableName = "ofPubsubItem";
  private _nodeId = "blabber:devicetoken";
  private _knex: any;

  constructor() {
    this._knex = knex({
      client: "mysql",
      connection: {
        host: "db",
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      },
    });
  }

  async getDeviceToken(username: String): Promise<string | null> {
    const resultSet = await this._knex(this._tableName)
      .where({
        jid: username,
        nodeID: this._nodeId,
      })
      .select("payload");
    if (resultSet.length != 1) {
      return null;
    }
    const payload: string = resultSet[0]["payload"];
    if (!payload) {
      return null;
    }
    const matches = /<devicetoken>(.+)<\/devicetoken>/gi.exec(payload);
    if (!matches || matches.length !== 2) {
      return null;
    }
    return matches[1];
  }
}

export default new DBProvider();
