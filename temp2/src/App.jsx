import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Heart,
  Image,
  Music,
  Mail,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";
import memory1 from "./memories/memory1.jpg";
import memory2 from "./memories/memory2.jpg";
import memory3 from "./memories/memory3.jpg";
import memory4 from "./memories/memory4.jpg";

const memories = [
  {
    image: memory1,
    title: "Us 🫶",
    text: "One of those moments I wish I could experience again.",
  },
  {
    image: memory3,
    title: "That beautiful day ❤️",
    text: "A simple memory, but one I'll always keep close to my heart.",
  },
  {
    image: memory2,
    title: "Another favorite ❤️",
    text: "Because somehow, everything feels better when you're around.",
  },
];

const reasons = [
  "I love the way you care about me. ❤️",
  "You always know how to make me smile.",
  "You motivate me when I need it the most.",
  "I love all the little things that make you, you.",
  "And honestly... I just love having you in my life. 🫶",
];

function App() {
  const [screen, setScreen] = useState("welcome");
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const goToMenu = () => {
    setScreen("menu");
  };

  return (
    <main className="min-h-screen bg-[#fff7f8] text-gray-800 px-5 py-8 flex items-center justify-center overflow-hidden">

      <AnimatePresence mode="wait">

        {/* ================================================= */}
        {/* WELCOME */}
        {/* ================================================= */}

        {screen === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full max-w-md"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, -2, 2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto mb-8 w-28 h-28 rounded-[2rem] bg-pink-400 flex items-center justify-center shadow-xl shadow-pink-200"
            >
              <Gift
                size={58}
                strokeWidth={1.5}
                className="text-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-pink-400 font-medium mb-2">
                Hey you ❤️
              </p>

              <h1 className="text-3xl sm:text-4xl font-semibold">
                A little something for you
              </h1>

              <p className="mt-3 text-gray-500">
                I made this just for you.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToMenu}
              className="mt-8 px-8 py-3.5 rounded-full bg-pink-400 text-white font-medium shadow-lg shadow-pink-200 hover:bg-pink-500 transition"
            >
              Open Gift ❤️
            </motion.button>
          </motion.div>
        )}

        {/* ================================================= */}
        {/* MENU */}
        {/* ================================================= */}

        {screen === "menu" && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="inline-flex"
              >
                <Heart
                  size={30}
                  className="text-pink-400"
                  fill="currentColor"
                />
              </motion.div>

              <h1 className="text-2xl sm:text-3xl font-semibold mt-3">
                A little something for you
              </h1>

              <p className="text-gray-500 mt-2">
                Pick one ❤️
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <GiftCard
                icon={<Mail />}
                title="A Letter"
                onClick={() => setScreen("letter")}
              />

              <GiftCard
                icon={<Image />}
                title="A Memory"
                onClick={() => {
                  setMemoryIndex(0);
                  setScreen("memory");
                }}
              />

              <GiftCard
                icon={<Heart />}
                title="Why I Love You"
                onClick={() => setScreen("reasons")}
              />

              <GiftCard
                icon={<Music />}
                title="Our Song"
                onClick={() => setScreen("song")}
              />

            </div>

            <p className="text-center text-xs text-gray-400 mt-8">
              Made with a little bit of love ❤️
            </p>
          </motion.div>
        )}

        {/* ================================================= */}
        {/* LETTER */}
        {/* ================================================= */}

        {screen === "letter" && (
          <PageWrapper key="letter">

            <div className="bg-white rounded-[2rem] p-7 sm:p-9 shadow-xl shadow-pink-100 border border-pink-100">

              <TopBar
                icon={<Mail size={21} />}
                title="A Letter For You"
                onClose={goToMenu}
              />

              <div className="text-left space-y-5 text-gray-600 leading-7">

                <p className="text-gray-800 font-medium">
                  Hey Mrs Menka Suthar Asthana ❤️
                </p>

                <p>
                  Life bohot hi khubsurat lgne lg gyi h jb se tum aayi h life me
                  Mene kbhi bhi aisa feel noi kiya ki me akela hu,
                  Mene humesha yehi socha h ki mere pss ek aisi person h jo mujhe hrr moment pe sambhal skti h or mera dhyaan rkh skti h,
                  Mene hrr moment future ke or present ke tumhare sth imagine kiye h or future to tumhare sth hi spend krna h meri lovely wife ji ke sth ❤️
                </p>

                <p>
                  Tumhari presence ne mujhe ye sikhaya h ki life jb bikhri hui thi to ek person ki presence hi life ko swar skti h,
                  Or tumhari presence ne meri life ko bohot hi sukoon bhra bnaya h,
                  Mene aaj tk kbhi bhi kisi ke liye itna crave noi kiya jitna tumhare liye kiya h or humesha krta rehta hu,
                  Even abhi bhi jb ye likh rha hu tb bhi durr hu but tumhe face to face dekhne ke liye crave kr rha hu 🥺
                </p>

                <p>
                  Or bss last me itna hi kehna chahunga,
                  Aap ke sth dekha h mene apna sara jahan
                  Aap ke sth dekha h mene apna sara jahan
                  Jb tum durr hoti ho to adhura lgta h sara jahan,
                  Or jb tum pss hoti ho to phir jahan ki kisko pdi h ❤️
                  Miss You Soo Much Meri Lovely Minku Ji ❤️
                </p>

                <p>
                  Bohot hi accha lgta h jb me ye sochta hu ki mujhe ek dum perfect wife mili h,
                  Bohot hi lucky hu me iss case me 🥹❤️
                </p>

                <div className="pt-3 text-right">
                  <p>Yours always,</p>

                  <p className="font-semibold text-pink-400">
                    Mr Ansh Menka Suthar Asthana ❤️
                  </p>
                </div>

              </div>
            </div>

            <BackButton onClick={goToMenu} />
          </PageWrapper>
        )}

        {/* ================================================= */}
        {/* MEMORY */}
        {/* ================================================= */}

        {screen === "memory" && (
          <PageWrapper key="memory">

            <div className="bg-white rounded-[2rem] p-5 sm:p-7 shadow-xl shadow-pink-100 border border-pink-100">

              <TopBar
                icon={<Image size={21} />}
                title="A Memory"
                onClose={goToMenu}
              />

              <AnimatePresence mode="wait">

                <motion.div
                  key={memoryIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >

                  <div className="rounded-2xl overflow-hidden bg-pink-50 aspect-[4/5] relative flex items-center justify-center">
                    <img
                      src={memories[memoryIndex].image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-lg opacity-40 scale-110 pointer-events-none"
                    />
                    <img
                      src={memories[memoryIndex].image}
                      alt={memories[memoryIndex].title}
                      className="w-full h-full object-contain relative z-10 p-1"
                    />
                  </div>

                  <div className="text-center mt-5">

                    <h2 className="text-xl font-semibold">
                      {memories[memoryIndex].title}
                    </h2>

                    <p className="text-gray-500 text-sm mt-2 leading-6">
                      {memories[memoryIndex].text}
                    </p>

                  </div>

                </motion.div>

              </AnimatePresence>

              {/* Navigation */}

              <div className="flex items-center justify-between mt-6">

                <button
                  onClick={() =>
                    setMemoryIndex(
                      memoryIndex === 0
                        ? memories.length - 1
                        : memoryIndex - 1
                    )
                  }
                  className="w-10 h-10 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center hover:bg-pink-100 transition"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1.5">
                  {memories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setMemoryIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === memoryIndex
                          ? "w-6 bg-pink-400"
                          : "w-2 bg-pink-200"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setMemoryIndex(
                      memoryIndex === memories.length - 1
                        ? 0
                        : memoryIndex + 1
                    )
                  }
                  className="w-10 h-10 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center hover:bg-pink-100 transition"
                >
                  <ChevronRight size={20} />
                </button>

              </div>

            </div>

            <BackButton onClick={goToMenu} />

          </PageWrapper>
        )}

        {/* ================================================= */}
        {/* REASONS */}
        {/* ================================================= */}

        {screen === "reasons" && (
          <PageWrapper key="reasons">

            <div className="bg-white rounded-[2rem] p-7 sm:p-9 shadow-xl shadow-pink-100 border border-pink-100">

              <TopBar
                icon={<Heart size={21} />}
                title="Why I Love You"
                onClose={goToMenu}
              />

              <div className="space-y-3">

                {reasons.map((reason, index) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.12,
                    }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-[#fff7f8]"
                  >
                    <div className="w-8 h-8 shrink-0 rounded-full bg-pink-100 text-pink-400 flex items-center justify-center">
                      <Heart
                        size={15}
                        fill="currentColor"
                      />
                    </div>

                    <p className="text-gray-600 text-sm leading-6 pt-1">
                      {reason}
                    </p>
                  </motion.div>
                ))}

              </div>

              <div className="text-center mt-7">
                <Sparkles
                  size={22}
                  className="mx-auto text-pink-400"
                />

                <p className="text-sm text-gray-500 mt-2">
                  And there are probably a million more reasons. ❤️
                </p>
              </div>

            </div>

            <BackButton onClick={goToMenu} />

          </PageWrapper>
        )}

        {/* ================================================= */}
        {/* SONG */}
        {/* ================================================= */}

        {screen === "song" && (
          <PageWrapper key="song">

            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-pink-100 border border-pink-100">

              <TopBar
                icon={<Music size={21} />}
                title="Our Song"
                onClose={goToMenu}
              />

              <div className="text-center">

                {/* Song Cover Photo using memory4.jpg */}
                <div className="w-full max-w-sm mx-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-2 border-pink-100 relative group">
                  <img
                    src={memory4}
                    alt="Tera Hi Rahun - Our Song"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <h2 className="text-2xl font-semibold mt-5 text-gray-800">
                  Tera Hi Rahun ❤️
                </h2>

                <p className="text-pink-500 font-medium text-sm mt-1">
                  Gajendra Verma
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  A song that reminds me of you.
                </p>

                {/* Hidden YouTube Audio Stream (Video Hidden) */}
                {isPlaying && (
                  <iframe
                    src="https://www.youtube.com/embed/IsaOXzb4Uh0?autoplay=1&enablejsapi=1"
                    title="Tera Hi Rahun Audio"
                    className="w-0 h-0 opacity-0 pointer-events-none absolute -z-50"
                    allow="autoplay"
                  />
                )}

                {/* Audio Controls */}
                <div className="mt-6 flex flex-col items-center justify-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-pink-400 text-white flex items-center justify-center shadow-lg shadow-pink-200 hover:bg-pink-500 hover:scale-105 active:scale-95 transition"
                  >
                    {isPlaying ? (
                      <Pause size={24} fill="currentColor" />
                    ) : (
                      <Play size={24} fill="currentColor" className="ml-0.5" />
                    )}
                  </button>

                  <div className="inline-flex items-center gap-2 text-xs font-medium text-pink-500 bg-pink-50 px-4 py-2 rounded-full">
                    {isPlaying ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                        </span>
                        <span>Playing "Tera Hi Rahun" ❤️</span>
                      </>
                    ) : (
                      <span>Click play to listen ❤️</span>
                    )}
                  </div>
                </div>

              </div>

            </div>

            <BackButton onClick={goToMenu} />

          </PageWrapper>
        )}

        {/* ================================================= */}
        {/* FINAL */}
        {/* ================================================= */}

        {screen === "final" && (
          <motion.div
            key="final"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md"
          >

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <Heart
                size={55}
                className="mx-auto text-pink-400"
                fill="currentColor"
              />
            </motion.div>

            <h1 className="text-3xl font-semibold mt-7">
              That's all ❤️
            </h1>

            <p className="text-gray-500 mt-4 leading-7">
              I just wanted to make something small
              to remind you how special you are to me.
            </p>

            <p className="text-xl font-medium text-pink-400 mt-7">
              I love you. ❤️
            </p>

            <p className="text-sm text-gray-400 mt-3">
              — Ansh
            </p>

            <button
              onClick={goToMenu}
              className="mt-8 text-sm text-gray-400 hover:text-pink-400 transition"
            >
              See everything again
            </button>

          </motion.div>
        )}

      </AnimatePresence>

    </main>
  );
}


/* ================================================= */
/* GIFT CARD */
/* ================================================= */

function GiftCard({ icon, title, onClick }) {
  return (
    <motion.button
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.97,
      }}
      onClick={onClick}
      className="bg-white rounded-[1.7rem] p-6 shadow-sm border border-pink-100 flex flex-col items-center justify-center gap-3 min-h-[150px] hover:shadow-lg hover:shadow-pink-100 transition"
    >
      <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-400 flex items-center justify-center">
        {icon}
      </div>

      <span className="text-gray-700 font-medium text-sm">
        {title}
      </span>
    </motion.button>
  );
}


/* ================================================= */
/* PAGE WRAPPER */
/* ================================================= */

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      {children}
    </motion.div>
  );
}


/* ================================================= */
/* TOP BAR */
/* ================================================= */

function TopBar({ icon, title, onClose }) {
  return (
    <div className="flex items-center justify-between mb-7">

      <div className="flex items-center gap-2">
        <div className="text-pink-400">
          {icon}
        </div>

        <h2 className="text-xl font-semibold">
          {title}
        </h2>
      </div>

      <button
        onClick={onClose}
        className="w-9 h-9 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-pink-50 hover:text-pink-400 transition"
      >
        <X size={19} />
      </button>

    </div>
  );
}


/* ================================================= */
/* BACK BUTTON */
/* ================================================= */

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 mx-auto mt-6 text-sm text-gray-400 hover:text-pink-400 transition"
    >
      <ArrowLeft size={15} />
      Back to the gift
    </button>
  );
}

export default App;