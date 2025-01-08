import TcpSocket from 'react-native-tcp-socket';
import { Buffer } from 'buffer';

export default class MarantzController {
    private socket: TcpSocket.Socket | undefined;
    private playerId: string | undefined;
    private isConnected: boolean = false;

    constructor() {
        console.log("new MarantzController");
    }

    destroy() {
        this.socket?.destroy();
    }

    init() {
        this.playerId = '-2107673857';

        const options = {
            port: 1255,
            host: "192.168.1.60",
            //localAddress: '127.0.0.1',
            //reuseAddress: true,
            // interface: "wifi",
        };

        this.socket = TcpSocket.createConnection(options, () => {
            console.log(`TcpSocket.createConnection success ${options.host}:${options.port}}`);
            this.isConnected = true;
        });

        this.socket.on('data', function (data) {
            var str = data instanceof Buffer
                ?
                Buffer.from(data.buffer).toString()
                //new TextDecoder().decode(data) 
                : data;
            if (data instanceof Buffer)
                console.log("test buffer")
            else
                console.log("test str")
            console.log('message was received', str);
        });

        this.socket.on('error', function (error) {
            console.log(error);
        });

        this.socket.on('close', function () {
            console.log('Connection closed!');
        });
    }

    private commands = {
        PlayStream: "browse/play_stream",
        SetPlayState: "player/set_play_state",
        VolumUp: "player/volume_up",
        VolumDown: "player/volume_down",
    }

    private send(command: string, args: Record<string, string>[] | undefined) {
        if (!this.isConnected) {
            console.debug("Not connected");
            return;
        }

        var cmd = `heos://${command}?pid=${this.playerId}`;

        if (args) {
            cmd += args.map(kvp => Object.entries(kvp).map(([key, value]) => `&${key}=${value}`)
                .join())
                .join();
        }

        cmd += '\r\n';

        console.log(`sending: ${cmd}`);

        this.socket?.write(cmd);
    }

    public play(url: string) {
        console.log("PLAY:" + url)
        this.send(this.commands.PlayStream, [{ "url": url }]);
    }

    private setPlayState(state: string) {
        this.send(this.commands.SetPlayState, [{ "state": state }]);
    }

    public resume() {
        this.setPlayState('play');
    }

    public pause() {
        this.setPlayState('pause');
    }

    public stop() {
        this.setPlayState('stop');
    }

    public volumUp() {
        this.send(this.commands.VolumUp, [{ "step": "5" }]);
    }

    public volumDown() {
        this.send(this.commands.VolumDown, [{ "step": "5" }]);
    }
}

