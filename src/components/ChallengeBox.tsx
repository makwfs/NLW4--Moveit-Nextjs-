import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';


export function ChallengeBox() {
    const { activeChallenge, resetChallenge,completeChallenge } = useContext(ChallengeContext)
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded(){
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }


    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>{activeChallenge.amount}</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >Falhei
                    </button>
                        <button
                            type="button"
                            className={styles.challengeSuccedeButton}
                            onClick={handleChallengeSucceeded}
                        >Completei
                    </button>
                    </footer>
                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="level Up" />
                Avance de level completando desafios.
            </p>
                    </div>
                )}
        </div>
    )
}