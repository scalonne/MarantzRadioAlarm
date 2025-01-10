import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { MarantzController } from '../services/MarantzController';

type MarantzContextType = {
    controller: MarantzController;
    selectedRadioUrl: string | null;
    setSelectedRadioUrl: (radio: string) => void;
};

const MarantzContext = createContext<MarantzContextType | null>(null);

export const MarantzProvider = ({ children }: { children: any }) => {
    const marantz = useRef(new MarantzController());
    const [selectedRadioUrl, setSelectedRadioUrl] = useState<string | null>(null);

    useEffect(() => {
        marantz.current.init();
        console.log("Socket initialized");

        return () => {
            marantz.current.destroy();
            console.log("Socket disconnected");
        };
    }, [marantz]);

    return (
        <MarantzContext.Provider value={{ controller: marantz.current, selectedRadioUrl, setSelectedRadioUrl }}>
            {children}
        </MarantzContext.Provider>
    );
};

export const useMarantz = () => {
    const context = useContext(MarantzContext);
    if (!context) throw new Error("useMarantz must be used within a MarantzProvider");
    return context;
};

export const playRadioAtAlarm = () => {
    const { controller } = useMarantz(); // Accès au MarantzController depuis le contexte

    if (controller) {
        controller.play('http://direct.fipradio.fr/live/fip-hifi.aac');
    } else {
        console.error('MarantzController non initialisé.');
    }
};