import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContextData{
    minutes: number;
    seconds:number;
    hasFinished:boolean;
    isActive:boolean;
    startCountdown:()=> void,
    resetCountdown:()=> void,
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)


export function CountdownProvider({ children}: CountdownProviderProps){
     
    let countdownTimeout: NodeJS.Timeout;

    const { startNewChallenge} = useContext(ChallengeContext);


    
    const [time, setTime] = useState(0.1 * 60);                 // Tempo do countdown
    const [isActive, setisActive] = useState(false);            // Estado, se está ativo ou não
    const [hasFinished, setHasFinished] = useState(false);     // Término do tempo

    const minutes = Math.floor(time / 60);                      //Math.floor --> Arredonda o número para baixo
    const seconds = time % 60;                                  // % --> Resto da Divisão

    function startCountdown() {
        setisActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setisActive(false);
        setHasFinished(false);
        setTime(0.1 * 60)
    }


    useEffect(() => {                                   // função de funcionamento do countdown
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if(isActive && time == 0){
            setHasFinished(true);
            setisActive(false);
            startNewChallenge();
        }
    }, [isActive, time])


    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}