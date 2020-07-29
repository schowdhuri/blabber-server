import fcm from "node-gcm";

class PushProvider {
  private _sender: any;

  constructor() {
    this._sender = new fcm.Sender(process.env.FIREBASE_KEY);
  }

  async send(
    deviceToken: string,
    title: string,
    body: string,
    data: any
  ): Promise<any> {
    const message = new fcm.Message({
      data: data || {},
      notification: {
        title,
        icon: "ic_launcher",
        body,
      },
    });

    return new Promise((resolve, reject) => {
      this._sender.send(
        message,
        { registrationTokens: [deviceToken] },
        (err, response) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve(response);
        }
      );
    });
  }
}

export default new PushProvider();
