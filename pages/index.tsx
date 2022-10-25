import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "components/atoms/Button";
import ButtonIcon from "components/atoms/ButtonIcons";
import Text18 from "components/atoms/Text18";
import Text24 from "components/atoms/Text24";
import Text24Animated from "components/atoms/Text24Animated";
import MainContainer from "components/layout/MainContainer";
import theme from "styled/theme";
import { motion } from "framer-motion";
import Footer from "components/templates/Footer";
import { UseIsMobile } from "hooks/useIsMobile";
import Modal from "components/templates/Modal";
import MobileModal from "components/templates/MobileModal";
import { words } from "helpers/words";

interface isActive {
  active: boolean;
}

interface randomWord {
  auth: string;
  word: string;
}

export default function Home(): JSX.Element {
  // >>>>> states
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [randomWord, setRandomWord] = useState<randomWord>();
  const [isModalStartOpen, setIsModalStartOpen] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [time, setTime] = useState<number>(10);
  const [addAnimate, setAddAnimate] = useState<number>(0);
  const [sound, setSound] = useState<number>(1);
  const [randomWords, setRandomWords] = useState(words[0]);
  const timeSpeed = 1000;
  const isMobile = UseIsMobile(1024);
  // <<<<<
  // >>>>> input focus
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameStart) {
      inputRef?.current?.focus();
    }
  }, [gameStart]);
  // <<<<<

  // >>>>> timer
  useEffect(() => {
    if (gameStart) {
      if (time > 0) {
        const timer = setTimeout(
          () => setTime(time - 1),
          timeSpeed - level * 120
        );
        return () => clearTimeout(timer);
      } else {
        gameOver();
      }
    }
  });
  // <<<<<

  // >>>>> check is word correct
  const checkWord = () => {
    if (gameStart) {
      const value = inputRef?.current?.value;
      if (value == randomWord?.word) {
        const audio = new Audio(
          `${process.env.NEXT_PUBLIC_DOMAIN}/audio/score.mp3`
        );
        audio.volume = sound;
        audio.play();

        inputRef!.current!.value = "";
        setScore(score + 1);
        setTime(time + 2);
        setAddAnimate(addAnimate + 1);
        const scoreLevel = Math.floor(score / 10 + 1);
        if (level != scoreLevel) {
          setLevel(scoreLevel);

          for (let i = 0; i < 5; i++) {
            const audio1 = new Audio(
              `${process.env.NEXT_PUBLIC_DOMAIN}/audio/score.mp3`
            );
            audio.volume = sound;
            audio1.play();
          }
        }
      }
    }
  };
  // <<<<<

  // >>>>> gameOver
  const gameOver = () => {
    inputRef?.current?.blur();
    setIsGameOver(true);
    setGameStart(false);
  };
  // <<<<<

  // >>>>> restart Game
  const gameRestart = () => {
    inputRef!.current!.value = "";
    inputRef?.current?.focus();
    setTime(10);
    setScore(0);
    setLevel(1);
    setGameStart(true);
    changeWord();
  };
  // <<<<<
  // >>>>> change words level
  useEffect(() => {
    setRandomWords(level <= 5 && level >= 1 ? words[level - 1] : words[4]);
    console.log(randomWords);
  }, [level]);
  //  <<<<<
  ///// sort function ///////
  // const sort = () => {
  //   const sortedArray = {
  //     1: [],
  //     2: [],
  //     3: [],
  //     4: [],
  //     5: [],
  //   };

  //   words.map((el) => {
  //     switch (true) {
  //       case el.word.length <= 5: {
  //         sortedArray[1].push(el);
  //         break;
  //       }
  //       case el.word.length <= 7: {
  //         sortedArray[2].push(el);
  //         break;
  //       }
  //       case el.word.length <= 10: {
  //         sortedArray[3].push(el);
  //         break;
  //       }
  //       case el.word.length <= 13: {
  //         sortedArray[4].push(el);
  //         break;
  //       }
  //       default: {
  //         sortedArray[5].push(el);
  //       }
  //     }
  //   });
  //   console.log(sortedArray);
  // };
  // sort();
  // >>>>> Generate word
  const changeWord = () => {
    setRandomWord(randomWords[Math.floor(Math.random() * randomWords.length)]);
  };

  useEffect(() => {
    changeWord();
  }, [score]);
  // <<<<<
  const soundOffOnn = () => {
    setSound(sound === 0 ? 1 : 0);
  };
  // <<<<<

  // >>>>> start on enter click
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code == "Enter") {
      if (!gameStart) {
        setGameStart(true);
        if (isModalStartOpen) {
          setIsModalStartOpen(false);
        }
        if (isGameOver) {
          setIsGameOver(false);
          gameRestart();
        }
      }
    }
  };
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.onkeydown = handleKeyDown;
    }
  });
  // <<<<<
  return (
    <Wrapper>
      <TypeWord>
        {gameStart && (
          <audio
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/audio/brigada.mp3`}
            autoPlay
            loop
            style={{ height: 0 }}
            muted={sound ? false : true}
          />
        )}
        {isGameOver && (
          <audio
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/audio/fail.mp3`}
            autoPlay
            style={{ height: 0 }}
            muted={sound ? false : true}
          />
        )}

        <MainContainer>
          <TypeWordStats>
            <Text24Animated text="Score" count={score} animate={score} />
            <Text24Animated
              text="Time"
              count={time}
              animate={addAnimate}
              seconds
            />
            <Text24Animated text="Level" count={level} animate={level} />
          </TypeWordStats>
          <TypeWordStatsActions>
            <TypeWordRandomWordAuth>
              Author is: {randomWord?.auth}
            </TypeWordRandomWordAuth>
            <TypeWordRandomWord>{randomWord?.word}</TypeWordRandomWord>
            <TypeWordRandomWordInput onInput={checkWord} ref={inputRef} />
            <ButtonIcon
              onClick={() => {
                gameRestart();
              }}
            >
              Restart
            </ButtonIcon>

            <TypeWordSound
              onClick={soundOffOnn}
              active={!!sound}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                default: { duration: 0 },
              }}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_DOMAIN}/icons/sound.svg`}
                alt="sound"
              />
            </TypeWordSound>
          </TypeWordStatsActions>
        </MainContainer>
        {isMobile ? (
          <MobileModal
            closeFunction={(bool: boolean) => setIsModalStartOpen(bool)}
            isOpen={isModalStartOpen}
            onClose={() => {
              setIsModalStartOpen(false);
              setGameStart(true);
            }}
          >
            <ModalBody>
              <Text24 color={theme.colors.black}>Are you ready?</Text24>
              <Button
                onClick={() => {
                  setIsModalStartOpen(false);
                  setGameStart(true);
                }}
              >
                Start
              </Button>
            </ModalBody>
          </MobileModal>
        ) : (
          <Modal
            isOpen={isModalStartOpen}
            closeFunction={(bool: boolean) => setIsModalStartOpen(bool)}
            onClose={() => {
              setIsModalStartOpen(false);
              setGameStart(true);
            }}
          >
            <ModalBody>
              <Text24 color={theme.colors.black}>Are you ready?</Text24>
              <Button
                onClick={() => {
                  setIsModalStartOpen(false);
                  setGameStart(true);
                }}
              >
                Start
              </Button>
            </ModalBody>
          </Modal>
        )}
        {isMobile ? (
          <MobileModal
            isOpen={isGameOver}
            closeFunction={(bool: boolean) => setIsModalStartOpen(bool)}
            onClose={() => {
              setIsGameOver(false);
              gameRestart();
            }}
          >
            <ModalBody>
              <Text24 color={theme.colors.black}>
                Tyme is left but you are Yochagi
              </Text24>
              <ModalGameOverBody>
                <Text18 color={theme.colors.black}>Score: {score}</Text18>
                <Text18 color={theme.colors.black}>Level: {level}</Text18>
                <Text18 color={theme.colors.black}>
                  Word author: {randomWord?.auth}
                </Text18>
                <Text18 color={theme.colors.black}>
                  Word : {randomWord?.word}
                </Text18>
              </ModalGameOverBody>

              <Text18
                color={theme.colors.black}
                textStyles={{ marginBottom: 20 }}
              >
                Ar danebde, daarestarte 😎
              </Text18>
              <ButtonIcon
                onClick={() => {
                  setIsGameOver(false);
                  gameRestart();
                }}
              >
                Restart
              </ButtonIcon>
            </ModalBody>
          </MobileModal>
        ) : (
          <Modal
            isOpen={isGameOver}
            closeFunction={(bool: boolean) => setIsModalStartOpen(bool)}
            onClose={() => {
              setIsGameOver(false);
              gameRestart();
            }}
          >
            <ModalBody>
              <Text24 color={theme.colors.black}>
                Time is out but you are Yochagi
              </Text24>
              <ModalGameOverBody>
                <Text18 color={theme.colors.black}>Score: {score}</Text18>
                <Text18 color={theme.colors.black}>Level: {level}</Text18>
                <Text18 color={theme.colors.black}>
                  Word author: {randomWord?.auth}
                </Text18>
                <Text18 color={theme.colors.black}>
                  Word : {randomWord?.word}
                </Text18>
              </ModalGameOverBody>

              <Text18
                color={theme.colors.black}
                textStyles={{ marginBottom: 20 }}
              >
                Ar danebde, daarestarte 😎
              </Text18>
              <ButtonIcon
                onClick={() => {
                  setIsGameOver(false);
                  gameRestart();
                }}
              >
                Restart
              </ButtonIcon>
            </ModalBody>
          </Modal>
        )}
      </TypeWord>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TypeWord = styled.div``;

const TypeWordStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 200px;
`;
const TypeWordStatsActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TypeWordRandomWordAuth = styled.div`
  margin-bottom: 15px;

  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  font-family: ${theme.fonts.kdam};
`;
const TypeWordRandomWord = styled.div`
  margin-bottom: 60px;
  font-weight: 700;
  font-size: 36px;
  line-height: 55px;
  font-family: ${theme.fonts.kdam};

  color: ${theme.colors.gray};
  text-align: center;
  @media ${theme.breakpoints.xs} {
    font-size: 24px;
    line-height: 36px;
  }
`;
const TypeWordRandomWordInput = styled.input`
  margin-bottom: 30px;
  padding-bottom: 15px;
  width: 100%;
  max-width: 500px;

  font-weight: 700;
  font-size: 36px;
  line-height: 55px;
  text-align: center;
  color: ${theme.colors.white};
  font-family: ${theme.fonts.kdam};

  border: 0;
  border-bottom: 5px solid ${theme.colors.yellow};
  background: none;
  outline: none;

  @media ${theme.breakpoints.xs} {
    font-size: 24px;
    line-height: 36px;
  }
`;
const TypeWordSound = styled(motion.div)<isActive>`
  position: relative;
  margin-top: 40px;
  cursor: pointer;
  transition: all 0.5s;
  opacity: ${(props) => (props.active ? "1" : ".2")};
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 200px;
`;

const ModalGameOverBody = styled.div`
  margin: 20px 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  @media ${theme.breakpoints.xs} {
    margin: 20px 0 30px;
  }
`;
