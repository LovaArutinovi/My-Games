import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../components/atoms/Button";
import ButtonIcon from "../components/atoms/ButtonIcons";
import Text18 from "../components/atoms/Text18";
import Text24 from "../components/atoms/Text24";
import Text24Animated from "../components/atoms/Text24Animated";
import MainContainer from "../components/layout/MainContainer";
import Modal from "../components/templates/Modal";
import theme from "../styled/theme";
import { motion } from "framer-motion";
import Footer from "../components/templates/Footer";

interface isActive {
  active?: boolean;
}

interface randomWord {
  auth: string;
  word: string;
}

const randomWords = [
  { auth: "Dizaineri Gagi", word: "Gadasheneba" },
  { auth: "Dizaineri Gagi", word: "Inspiracia" },
  { auth: "Dizaineri Gagi", word: "Gadatvirtva" },
  { auth: "Keburia Native", word: "raunda mogwero vermivxvdi" },
  { auth: "Anz2", word: "Flower" },
  { auth: "Anz2", word: "Car" },
  { auth: "Anz2", word: "Rent" },
  { auth: "lova", word: "bike" },
  { auth: "lova", word: "exile" },
  { auth: "lova", word: "astonishing" },
  { auth: "lova", word: "valaivebt" },
  { auth: "lova", word: "mzadaa" },
  { auth: "lova", word: "shake" },
  { auth: "lova", word: "complex" },
  { auth: "lova", word: "pachkovich" },
  { auth: "lova", word: "chamerje" },
  { auth: "lova", word: "extreme" },
  { auth: "lova", word: "apology" },
  { auth: "lova", word: "taski washala" },
  { auth: "lova", word: "logo damixate" },
  { auth: "lova", word: "html magaria" },
  { auth: "lova", word: "wonder" },
  { auth: "lova", word: "anzerkus" },
  { auth: "lova", word: "gudvilshi gavidet" },
  { auth: "lova", word: "shax i mat" },
  { auth: "lova", word: "botasebi" },
  { auth: "lova", word: "panel" },
  { auth: "lova", word: "surgeon" },
  { auth: "lova", word: "bang" },
  { auth: "lova", word: "word" },
  { auth: "lova", word: "perform" },
  { auth: "lova", word: "healthy" },
  { auth: "lova", word: "sheet" },
  { auth: "lova", word: "diplomat" },
  { auth: "lova", word: "appeal" },
  { auth: "lova", word: "opposite" },
  { auth: "lova", word: "build" },
  { auth: "lova", word: "fraction" },
  { auth: "lova", word: "endorse" },
  { auth: "lova", word: "similar" },
  { auth: "lova", word: "translive" },
  { auth: "lova", word: "enami daamate" },
  { auth: "lova", word: "if if if" },
  { auth: "lova", word: "love" },
  { auth: "lova", word: "LOVA" },
  { auth: "lova", word: "money" },
  { auth: "lova", word: "wavage" },
  { auth: "lova", word: "so" },
  { auth: "lova", word: "pica tu lobiani" },
  { auth: "lova", word: "shaurma" },
  { auth: "lova", word: "tanjex" },
  { auth: "lova", word: "tope humanuria" },
  { auth: "lova", word: "Lemondo" },
  { auth: "lova", word: "eses" },
  { auth: "lova", word: "tkt dawva" },
];

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
  const [timeSpeed, setTimeSpeed] = useState<number>(1000);
  const [sound, setSound] = useState<number>(1);
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
  };
  // <<<<<

  // >>>>> Generate word
  const changeWord = () => {
    setRandomWord(randomWords[Math.floor(Math.random() * randomWords.length)]);
  };

  useEffect(() => {
    changeWord();
  }, [score]);
  // <<<<<

  // >>>>> sound off/on
  const soundOffOnn = () => {
    setSound(sound == 0 ? 1 : 0);
  };
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
              active={sound == 0 ? true : false}
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
        {isModalStartOpen && (
          <Modal
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
        {isGameOver && (
          <Modal
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
  opacity: ${(props) => (props.active ? ".2" : "1")};
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
`;
