import TcpSocket from 'react-native-tcp-socket';
import { Buffer } from 'buffer';
import { EventEmitter } from 'expo-modules-core';

export enum AmplifierState {
    Connecting,
    Connected,
    Disconnected,
}

export interface IAmplifierController {
    state: AmplifierState,
    onConnect(callback: (data?: any) => void): void;
    onDisconnect(callback: (data?: any) => void): void;
    play(streamUrl: string): void;
    resume(): void;
    pause(): void;
    stop(): void;
    volumUp(): void;
    volumDown(): void;
}

export class MarantzController implements IAmplifierController {
    private static instance: MarantzController;

    private socket: TcpSocket.Socket | undefined;
    private playerId: string | undefined;
    private eventEmitter = new EventEmitter<Record<string, () => void>>();
    public state: AmplifierState = AmplifierState.Disconnected;

    public static getInstance() {
        if (!MarantzController.instance) {
            MarantzController.instance = new MarantzController();
        }

        return MarantzController.instance;
    }

    private notifyStateChange(state: AmplifierState) {
        this.eventEmitter.emit(state.toString());
    }

    onConnect(callback: (data?: any) => void) {
        this.eventEmitter.addListener(AmplifierState.Connected.toString(), callback);
    }

    offConnect(callback: (data?: any) => void) {
        this.eventEmitter.removeListener(AmplifierState.Connected.toString(), callback);
    }

    onDisconnect(callback: (data?: any) => void) {
        this.eventEmitter.addListener(AmplifierState.Disconnected.toString(), callback);
    }

    private constructor() {
        console.debug("new MarantzController");
    }

    destroy() {
        this.socket?.destroy();
    }

    tryConnect() {
        if (this.socket?.readyState == 'open')
            return true;

        if (this.socket?.readyState == undefined)
            this.init();
    }

    init() {
        this.playerId = '-2107673857';

        const options = {
            port: 1255,
            host: "192.168.1.60",
        };

        this.socket = TcpSocket.createConnection(options, () => {
            console.log(`socket created: ${options.host}:${options.port}`);
            this.notifyStateChange(AmplifierState.Connected);
        });

        this.socket.on('data', function (data) {
            var str = data instanceof Buffer
                ? Buffer.from(data.buffer).toString()
                : data;

            console.log('socket read: ', str);
        });

        this.socket.on('error', function (error) {
            console.warn('socket error: ', error);
        });

        this.socket.on('close', () => {
            console.warn('socket closed');
            this.notifyStateChange(AmplifierState.Disconnected);
        });

        return new Promise(async (resolve, reject) => {
            let retry = 3;

            while (true) {
                if (this.socket?.readyState == 'open') {
                    resolve(true);
                    break;
                }

                await new Promise(f => setTimeout(f, 1000));

                retry--;
            }

            reject(false);
        });
    }

    private commands = {
        PlayStream: "browse/play_stream",
        SetPlayState: "player/set_play_state",
        VolumUp: "player/volume_up",
        VolumDown: "player/volume_down",
    }

    private send(command: string, args: Record<string, string>[] | undefined) {
        console.log(`send ${command}`);
        console.log(`args ${args}`);

        if (this.socket?.readyState != 'open') {
            console.debug("socket is not connected");

            if (this.socket?.readyState == "opening")
                this.init();

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

export const storage = MarantzController.getInstance();