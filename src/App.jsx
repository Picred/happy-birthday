import React, { useState, useRef, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { Gift, Heart, Trash2, ArrowRight, ArrowLeft, BookOpen, HelpCircle, X, Sparkles, Star, Image as ImageIcon, AlertTriangle, Flame, Activity, Ghost } from 'lucide-react';
import StimulationClicker from './components/StimulationClicker';
import './index.css';

const questions = [
  {
    topic: "La Formula 1",
    question: "Chi è l'attuale campione del mondo di Formula 1?",
    options: [
      { main: "Lewis Hamilton", sub: "Il veterano sette volte campione" },
      { main: "Charles Leclerc", sub: "Il predestinato della Ferrari" },
      { main: "Max Verstappen", sub: "Super Max, ovviamente" },
      { main: "Lando Norris", sub: "Il giovane talento McLaren" }
    ],
    correctAnswer: 3,
    isSpinning: true
  },
  {
    topic: "La Musica",
    question: "Quale animale è nominato nel titolo di una delle canzoni più famose dei SOAD? ('____ Song')",
    options: [
      { main: "Monkey", sub: "La scimmia" },
      { main: "Spider", sub: "Il ragno" },
      { main: "Toxicity", sub: "Non è un animale (scherzo)" },
      { main: "Deer", sub: "Il cervo (Deer Dance/Song)" }
    ],
    correctAnswer: 3,
    isBlurry: true
  },
  {
    topic: "Serie TV",
    question: "Come si chiama il protagonista hacker interpretato da Rami Malek in Mr. Robot?",
    options: [
      { main: "Tyrell Wellick", sub: "Il manager spietato" },
      { main: "Elliot Alderson", sub: "L'hacker solitario" },
      { main: "Fernando Vera", sub: "L'antagonista locale" },
      { main: "Leon", sub: "L'amico fedele" }
    ],
    correctAnswer: 1,
    isInverted: true // NUOVA GAG: Rovescia lo schermo per questa domanda!
  },
  {
    topic: "Indie Pop",
    question: "Componi il titolo della canzone più famosa in assoluto dei The Neighbourhood: 'Sweater ___'",
    options: [
      { main: "Shirt", sub: "Maglietta" },
      { main: "Weather", sub: "Il clima perfetto per il maglione" },
      { main: "Pants", sub: "Pantaloni" },
      { main: "Tears", sub: "Lacrime" }
    ],
    correctAnswer: 1,
    isMirrored: true
  },
  {
    topic: "Scienza Vera",
    question: "Scherzi a parte, cos'è il DNA?",
    options: [
      { main: "法拉利 V12", sub: "Un nuovo modello sportivo" },
      { main: "Acido Desossiribonucleico", sub: "La molecola della vita" },
      { main: "ميتال الشعر", sub: "Una band rock anni '80" },
      { main: "科技初创公司", sub: "Il nome di un'azienda tech" }
    ],
    correctAnswer: 1,
    isTeleporting: true
  },
  {
    topic: "Ooooops",
    question: "Attenta! Quale di queste è la risposta giusta?",
    options: [
      { main: "Questa qui!", sub: "No è troppo facile" },
      { main: "Quella affianco", sub: "Assolutamente no" },
      { main: "Cliccami...", sub: "PROVACI" },
      { main: "Nessuna", sub: "Falso" }
    ],
    correctAnswer: 2,
    isTricky: true // Il bottone scappa!
  },
  {
    topic: "Biologia",
    question: "Qual è il nome scientifico del parassita che causa la malaria?",
    options: [
      { main: "大肠杆菌", sub: "Nel tuo intestino c'è di peggio" },
      { main: "Plasmodium falciparum", sub: "Sembra una formula magica" },
      { main: "المكورات العنقودية الذهبية", sub: "Dorato ma cattivo" },
      { main: "Токсоплазма гондии", sub: "Il preferito dei gatti" }
    ],
    correctAnswer: 1,
    isGiant: true
  },
  {
    topic: "Mr. Robot",
    question: "Qual è la famosa frase con cui Elliot inizia i suoi monologhi?",
    options: [
      { main: "Hello, World.", sub: "Classico dei programmatori" },
      { main: "Hello, Friend.", sub: "Parla con noi" },
      { main: "Wake up.", sub: "Matrix style" },
      { main: "I am fsociety.", sub: "Più avanti..." }
    ],
    correctAnswer: 1,
    isGlitching: true
  },
  {
    topic: "Test Logica",
    question: "Se un aereo cade esattamente al confine tra Italia e Francia, dove seppelliscono i sopravvissuti?",
    options: [
      { main: "في إيطاليا", sub: "Dalla parte di qua" },
      { main: "在法国", sub: "Dalla parte di là" },
      { main: "Nessuna delle due", sub: "Perché sono VIVI!" },
      { main: "В стране вылета", sub: "Dipende dalla compagnia" }
    ],
    correctAnswer: 2,
    isDisappearing: true // Le risposte sbagliate svaniscono se provi a cliccarle
  },
  {
    topic: "F1 Storia",
    question: "Quanti mondiali ha vinto Michael Schumacher nella sua carriera in F1?",
    options: [
      { main: "五 (5)", sub: "Quelli in Ferrari" },
      { main: "7", sub: "Il record storico" },
      { main: "ثمانية (8)", sub: "Magari..." },
      { main: "έξι (6)", sub: "Un po' meno" }
    ],
    correctAnswer: 1,
    isFakeDisabled: true
  },
  {
    topic: "Genetica Difficile",
    question: "Quale tra queste basi azotate NON si trova nel DNA ma nell'RNA?",
    options: [
      { main: "Adenina", sub: "A" },
      { main: "Guanina", sub: "G" },
      { main: "Citosina", sub: "C" },
      { main: "Uracile", sub: "Questa è tosta..." }
    ],
    correctAnswer: 3,
    isShrinking: true // Devi cliccarla 3 volte per selezionarla, e si rimpicciolisce
  },
  {
    topic: "Musica",
    question: "L'album Toxicity dei System of a Down in che anno è uscito?",
    options: [
      { main: "2001", sub: "Un anno molto particolare" },
      { main: "1999", sub: "Fine millennio" },
      { main: "2003", sub: "Un po' dopo" },
      { main: "1997", sub: "Troppo presto" }
    ],
    correctAnswer: 0,
    isFakeTimer: true
  },
  {
    topic: "The Neighbourhood",
    question: "Qual è il colore che domina da sempre l'estetica della band?",
    options: [
      { main: "أزرق سماوي", sub: "Troppo allegro" },
      { main: "Bianco e Nero", sub: "Monocromatici e tristi" },
      { main: "Красный огонь", sub: "Troppo rock" },
      { main: "深绿色", sub: "Senza motivo" }
    ],
    correctAnswer: 1,
    isInvisible: true
  },
  {
    topic: "Mr. Robot 2",
    question: "Qual è il nome della sorella di Elliot in Mr. Robot?",
    options: [
      { main: "Angela Moss", sub: "L'amica d'infanzia" },
      { main: "Shayla Nico", sub: "La vicina di casa" },
      { main: "Darlene Alderson", sub: "L'hacker esperta" },
      { main: "Joanna Wellick", sub: "La moglie di Tyrell" }
    ],
    correctAnswer: 2,
    isBouncing: true
  },
  {
    topic: "Ultima Domanda",
    question: "Chi è la persona migliore del mondo oggi?",
    options: [
      { main: "Tu", sub: "Ovviamente!" },
      { main: "Io", sub: "Che ho fatto questo sito" },
      { main: "Lewis Hamilton", sub: "Pur essendo in Ferrari" },
      { main: "Max Verstappen", sub: "Solo quando non urla" }
    ],
    correctAnswer: 0,
    isShaking: true // Le risposte sbagliate tremano tantissimo
  }
];

const WRONG_ALERTS = [
  "MA SEI SERIO?! Riprova!",
  "NO, DAI. PENSACI BENE.",
  "ERRORE FATALE! IMBARAZZANTE.",
  "CHE DELUSIONE! 🤦‍♂️",
  "RITENTA, SARAI PIÙ FORTUNATO.",
  "LA TUA IGNORANZA MI SPAVENTA!"
];

// Reusable Top Navbar
function Navbar({ onAction, title = "BirthdaySurprise", icon = <Gift size={16} fill="currentColor" /> }) {
  return (
    <header className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 w-full shadow-sm">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onAction('home')}>
        <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400">
          {icon}
        </div>
        <span className="font-bold text-slate-100 text-lg tracking-tight">{title}</span>
      </div>
      <div className="flex items-center gap-4 text-purple-400">
        <button onClick={() => alert("Cestino vuoto! Non si buttano via i ricordi oggi.")} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition">
          <Trash2 size={16} />
        </button>
        <button onClick={() => alert("Aggiunto ai preferiti! ❤️")} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition">
          <Heart size={16} fill="currentColor" />
        </button>
      </div>
    </header>
  );
}

// Memory Lane Page
function MemoryLane({ onClose }) {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center">
      <div className="w-full max-w-5xl bg-slate-900 min-h-screen flex flex-col items-center shadow-2xl">
        <Navbar onAction={onClose} title="Memory Lane" icon={<ImageIcon size={16} />} />
        <div className="p-10 flex flex-col items-center text-center flex-1 justify-center w-full">
          <div className="w-20 h-20 bg-purple-900/30 rounded-full flex items-center justify-center text-purple-400 mb-6 shadow-inner">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-100 mb-4">Memory Lane</h1>
          <p className="text-slate-400 mb-10 max-w-md">Qui andrebbe inserita una fantastica galleria fotografica dei vostri ricordi più belli! Per ora accontentati di questa pagina segnaposto. 😉</p>
          <button onClick={() => onClose('home')} className="btn-primary">
            <ArrowLeft size={18} /> Torna Indietro
          </button>
        </div>
      </div>
    </div>
  );
}

// View for individual bubble clicks
function BubbleView({ label, onClose }) {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center">
      <div className="w-full max-w-5xl bg-slate-900 min-h-screen flex flex-col items-center shadow-2xl">
        <Navbar onAction={onClose} title={`Story: ${label}`} />
        <div className="p-10 flex flex-col items-center text-center flex-1 justify-center w-full">
          <h1 className="text-5xl font-black text-purple-400 mb-4">#{label}</h1>
          <p className="text-slate-400 mb-8 max-w-md">Visualizzazione dettagliata del ricordo "{label}".</p>
          <button onClick={() => onClose('home')} className="btn-primary px-8">Chiudi</button>
        </div>
      </div>
    </div>
  );
}

// The epic new Final component
function MegaSurprise({ score, onClose }) {
  return (
    <div className="w-screen min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 text-center relative overflow-hidden m-0">
      <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={500} colors={['#ff0066', '#ffccdf', '#ffd700', '#ffffff']} />

      {/* Background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-slate-800 p-2 text-left rounded-[3rem] shadow-2xl shadow-purple-500/20 max-w-2xl w-full z-10 border border-slate-700"
      >
        <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-14 border border-slate-700 flex flex-col items-center text-center">

          <div className="w-full mb-8 flex justify-center mt-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 relative flex items-center justify-center"
            >
              <div className="absolute w-full h-full bg-gradient-to-br from-purple-600 to-pink-500 rounded-full blur-[20px] opacity-70"></div>
              <div className="relative w-28 h-28 bg-slate-800 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-700 z-10">
                <Gift size={56} className="text-purple-400" />
              </div>
            </motion.div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-100 mb-6 uppercase tracking-tight">
            MEGA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">SORPRESA</span>
          </h1>

          {/* The actual ticket/surprise */}
          <div className="bg-slate-800 p-6 rounded-2xl border-2 border-dashed border-purple-500/50 w-full mb-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-pink-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase shadow-sm">EVENTO SPECIALE</div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100 mb-2 mt-4">THE FIRST SPIN CEREMONY</h3>
            <p className="text-purple-400 font-black text-xl sm:text-2xl mb-4 uppercase">Pizza & qualcosa da bere 🍕🍻</p>
            <p className="text-slate-300 font-medium text-sm sm:text-base leading-relaxed">
              Hai superato il test! Visto che il regalo lo hai già <br />
              Questo ticket vale per quando avrai qualcosa per ascoltarlo: <br />
              (Fai lo screen, non dimenticartelo! Dimostra che hai superato il test!)
            </p>

            <div className="w-full h-px bg-slate-700 my-4"></div>
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mb-1 text-center">
              Completato: {new Date().toLocaleDateString('it-IT')} ore {new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">Validità: Boh, fino a quando non compri il lettore ♾️</p>
          </div>

          <button onClick={() => onClose('home')} className="btn-primary w-full shadow-purple-500/30 shadow-lg mb-4 h-14 text-lg">
            Riscuoti e Festeggia 🥳
          </button>
          <p className="text-purple-400 font-bold text-sm">P.S. Buon Compleanno! Ti voglio bene!</p>
        </div>
      </motion.div>
    </div>
  )
}

function WelcomePage({ onNavigate, completedGames, isMobile }) {
  const isF1Done = completedGames.includes('f1');
  const isMemoryDone = completedGames.includes('memory');
  const isBugDone = completedGames.includes('bug');
  const isQuizDone = completedGames.includes('quiz');
  const canPlayMemory = isF1Done;
  const canPlayBug = isF1Done && isMemoryDone;
  const canPlayQuiz = isF1Done && isMemoryDone && isBugDone;
  const doneCount = [isF1Done, isMemoryDone, isBugDone, isQuizDone].filter(Boolean).length;

  const steps = [
    {
      num: 1, label: 'F1 Reaction Test', emoji: '🏎️',
      desc: 'Testa i tuoi riflessi ai semafori del Gran Prix',
      done: isF1Done, unlocked: true, nav: 'f1-game',
      color: 'red',
    },
    {
      num: 2, label: 'Emoji Match', emoji: '🎭',
      desc: 'Trova le coppie delle tue emoji preferite',
      done: isMemoryDone, unlocked: canPlayMemory, nav: 'memory-game',
      color: 'emerald',
    },
    {
      num: 3, label: 'Vaccine Simulator', emoji: '🦠',
      desc: 'Elimina i virus in 15 secondi, Dottoressa!',
      done: isBugDone, unlocked: canPlayBug, nav: 'bug-game',
      color: 'cyan',
    },
    {
      num: 4, label: 'The Big Quiz 🏆', emoji: '❓',
      desc: 'Boss finale: 15 domande per sbloccare il tuo regalo',
      done: isQuizDone, unlocked: canPlayQuiz, nav: 'quiz',
      color: 'fuchsia',
    },
  ];

  const colorMap = {
    red: { ring: 'ring-red-500', bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/40', hover: 'hover:border-red-500/60' },
    emerald: { ring: 'ring-emerald-500', bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/40', hover: 'hover:border-emerald-500/60' },
    cyan: { ring: 'ring-cyan-500', bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500/40', hover: 'hover:border-cyan-500/60' },
    fuchsia: { ring: 'ring-fuchsia-500', bg: 'bg-fuchsia-500', text: 'text-fuchsia-400', border: 'border-fuchsia-500/40', hover: 'hover:border-fuchsia-500/60' },
  };

  return (
    <div className="w-screen min-h-screen bg-slate-950 flex flex-col items-center overflow-x-hidden m-0">
      <Navbar onAction={onNavigate} />

      <div className="w-full max-w-xl px-4 pt-10 pb-20 flex flex-col gap-8">

        {/* ── Compact Hero ── */}
        <div className="text-center">
          <span className="text-purple-400 text-xs font-bold tracking-[0.25em] uppercase block mb-3">🎉 IL TUO GIORNO SPECIALE</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
            Buon Compleanno,{' '}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 cursor-pointer"
              onClick={() => alert('🎉 Tanti Auguriiiii AMO!')}
            >
              Claudia
            </span>!
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Supera le 4 sfide in sequenza per sbloccare il regalo finale 🎁
          </p>
          <p className="text-red-400 text-md font-bold leading-relaxed mt-2 animate-pulse animate-duration-1000">
            Non aggiornare la pagina o perderai i progressi! ⚠️
          </p>
        </div>

        {/* ── Progress bar ── */}
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-700 shadow-[0_0_8px_rgba(217,70,239,0.5)]"
            style={{ width: `${(doneCount / 4) * 100}%` }}
          />
        </div>
        <p className="text-emerald-400 text-md text-center -mt-6">
          {doneCount === 4 ? '✅ Tutte le sfide completate! Se sei da Desktop, prova Stimulation Clicker!' : `Sfide completate: ${doneCount} / 4`}
        </p>

        {/* ── Step List ── */}
        <div className="flex flex-col gap-3">
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            const isActive = step.unlocked && !step.done;
            const isLocked = !step.unlocked;
            return (
              <div
                key={i}
                onClick={() => step.unlocked && !step.done && onNavigate(step.nav)}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${step.done
                  ? 'bg-emerald-900/10 border-emerald-500/30 opacity-60'
                  : isLocked
                    ? 'bg-slate-900/40 border-slate-800 opacity-40 grayscale cursor-not-allowed'
                    : `bg-slate-800/60 ${c.border} ${c.hover} cursor-pointer hover:bg-slate-800 active:scale-[0.98]`
                  }`}
              >
                {/* Step number / check */}
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-black transition-colors ${step.done ? 'bg-emerald-500 text-white' :
                  isLocked ? 'bg-slate-800 text-slate-600' :
                    `ring-2 ${c.ring} bg-transparent ${c.text}`
                  }`}>
                  {step.done ? '✓' : isLocked ? '🔒' : step.num}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm ${step.done ? 'text-emerald-400' : isLocked ? 'text-slate-600' : 'text-white'}`}>
                    {step.emoji} {step.label}
                    {step.done && <span className="ml-2 text-emerald-400 text-xs font-normal">COMPLETATO</span>}
                    {isLocked && <span className="ml-2 text-slate-600 text-xs font-normal">BLOCCATO</span>}
                  </p>
                  <p className={`text-xs mt-0.5 ${isLocked ? 'text-slate-700' : 'text-slate-400'}`}>{step.desc}</p>
                </div>

                {/* Arrow */}
                {isActive && <ArrowRight size={16} className={c.text} />}
              </div>
            );
          })}
        </div>

        {/* ── Single CTA ── */}
        <button
          onClick={() => canPlayQuiz ? onNavigate('quiz') : !isF1Done ? onNavigate('f1-game') : !isMemoryDone ? onNavigate('memory-game') : onNavigate('bug-game')}
          className="btn-primary w-full py-4 text-base bg-fuchsia-600 hover:bg-fuchsia-500 shadow-lg shadow-fuchsia-600/30 border-none"
        >
          <Sparkles size={18} />
          {canPlayQuiz ? '🏆 Rifai il quiz se vuoi' : doneCount === 0 ? 'Inizia la Prima Sfida 🏁' : `Continua → Sfida ${doneCount + 1}`}
        </button>
        {/* ── Stimulation Clicker Extra ── */}
        <div
          onClick={() => !isMobile && onNavigate('stim-clicker')}
          className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${isMobile
            ? 'border-slate-800 bg-slate-900/40 opacity-50 cursor-not-allowed'
            : 'border-purple-500/30 bg-purple-900/10 hover:bg-purple-900/20 hover:border-purple-400 cursor-pointer active:scale-[0.98]'
            }`}
        >
          <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xl ring-2 ${isMobile
            ? 'bg-slate-800 text-slate-600 ring-slate-700'
            : 'bg-purple-900/40 text-purple-400 ring-purple-500'
            }`}>
            {isMobile ? '🔒' : '🧠'}
          </div>
          <div className="flex-1">
            <p className={`font-bold text-sm ${isMobile ? 'text-slate-500' : 'text-white'}`}>
              Stimulation Clicker <span className={`${isMobile ? 'text-slate-600' : 'text-purple-400'} text-xs font-normal`}>EXTRA</span>
              {isMobile && <span className="ml-2 text-[10px] font-normal text-slate-600 underline">DESKTOP ONLY</span>}
            </p>
            <p className={`text-xs ${isMobile ? 'text-slate-700' : 'text-slate-400'}`}>Un clicker game caotico ispirato a neal.fun — upgrade shop, DVD, news ticker e brain rot!</p>
          </div>
          {!isMobile && <ArrowRight size={16} className="text-purple-400" />}
        </div>


        <p
          className="text-center text-xs text-slate-600 cursor-pointer hover:text-purple-400 transition-colors"
          onClick={() => alert('🍞 Fatto con voglia di pane 🍞')}
        >
          Made with <Heart size={10} className="inline text-fuchsia-600" fill="currentColor" /> for Claudia · 19/03/2026
        </p>
      </div>
    </div>
  )
}





// ---- SPECIAL FUN BUTTONS ----

// Scappa via dal mouse
function TrickyButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    // Small jumps so it stays completely inside the card
    const x = Math.random() * 100 - 50;
    const y = Math.random() * 60 - 30;
    setPosition({ x, y });
  };

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={handleMouseEnter}
      onClick={() => onSelect(idx)}
      className={`quiz-option group ${stateClasses} z-10 w-full col-span-1 md:col-span-1`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
        {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
        <span className="text-slate-500 text-xs">{opt.sub}</span>
      </div>
    </motion.button>
  );
}

// Scompare quando lo tocchi
function DisappearingButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <motion.button
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsVisible(false)}
      onMouseLeave={() => {
        setTimeout(() => setIsVisible(true), 1000); // Ritorna visibile dopo 1 secondo!
      }}
      onClick={() => isVisible && onSelect(idx)}
      className={`quiz-option group ${stateClasses} w-full flex items-start`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
        {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
        <span className="text-slate-500 text-xs">{opt.sub}</span>
      </div>
    </motion.button>
  );
}

// Devi cliccarlo più volte, diventa sempre più piccolo
function ShrinkingButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  const [clicks, setClicks] = useState(0);
  const requiredClicks = 3;

  const handleClick = () => {
    if (clicks + 1 >= requiredClicks) {
      onSelect(idx);
    } else {
      setClicks(c => c + 1);
    }
  };

  const currentScale = 1 - (clicks * 0.2); // Diventa piccolo del 20% ogni click
  // The scale transform shifts origin, so let's keep it clean
  return (
    <motion.div
      animate={{ scale: currentScale }}
      whileTap={{ scale: currentScale - 0.1 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="w-full flex-col origin-center"
    >
      <button onClick={handleClick} className={`quiz-option group ${stateClasses} w-full flex-col items-start`}>
        <div className="w-full flex text-left items-start gap-4">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
            {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
            <span className="text-slate-500 text-xs">{opt.sub}</span>
          </div>
        </div>
        {clicks > 0 && <span className="text-xs font-bold text-[#ff0066] mt-2 block w-full text-center animate-pulse">Clicca ancora! (Mancano {requiredClicks - clicks})</span>}
      </button>
    </motion.div>
  );
}

// Trema in modo esagerato per rendere il click snervante
function ShakingButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  const [isShaking, setIsShaking] = useState(false);

  return (
    <motion.button
      animate={isShaking ? { x: [-10, 10, -10, 10, -10, 10, 0], y: [-5, 5, -5, 5, -5, 5, 0] } : {}}
      transition={{ repeat: isShaking ? Infinity : 0, duration: 0.3 }}
      onMouseEnter={() => setIsShaking(true)}
      onMouseLeave={() => setIsShaking(false)}
      onClick={() => onSelect(idx)}
      className={`quiz-option group ${stateClasses} w-full flex items-start`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
        {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
        <span className="text-slate-500 text-xs">{opt.sub}</span>
      </div>
    </motion.button>
  );
}

// 1. Gira all'infinito
function SpinningButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  return (
    <motion.button
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      onClick={() => onSelect(idx)}
      className={`quiz-option group ${stateClasses} w-full flex items-start origin-center`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
        {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
        <span className="text-slate-500 text-xs">{opt.sub}</span>
      </div>
    </motion.button>
  );
}

// 2. Sfocato finché non ci passi sopra
function BlurryButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  return (
    <button
      onClick={() => onSelect(idx)}
      className={`quiz-option group ${stateClasses} w-full flex items-start blur-[6px] hover:blur-none transition-all duration-300`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
        {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
        <span className="text-slate-500 text-xs">{opt.sub}</span>
      </div>
    </button>
  );
}

// 3. Testo capovolto a specchio
function MirroredButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  return (
    <button
      onClick={() => onSelect(idx)}
      className={`quiz-option group ${stateClasses} w-full flex items-start`}
    >
      <div className="flex items-start w-full transform -scale-x-100 flex-row-reverse text-right gap-4">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
          {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
        </div>
        <div className="flex flex-col">
          <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
          <span className="text-slate-500 text-xs">{opt.sub}</span>
        </div>
      </div>
    </button>
  );
}

// 4. Si teletrasporta via a scatti
function TeleportingButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleHover = () => {
    // Very small, sporadic teleports to ensure it doesn't break out of the flex container
    setPosition({
      x: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 80 + 20),
      y: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 40 + 10)
    });
  };

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      onMouseEnter={handleHover}
      onClick={() => onSelect(idx)}
      className={`quiz-option group ${stateClasses} w-full flex items-start z-10`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
        {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
        <span className="text-slate-500 text-xs">{opt.sub}</span>
      </div>
    </motion.button>
  );
}

// 5. Diventa gigantesco e invadente on hover
function GiantButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  return (
    <button
      onClick={() => onSelect(idx)}
      className={`quiz-option group ${stateClasses} w-full flex items-start hover:scale-[1.5] hover:z-50 hover:bg-pink-100 transition-transform origin-center hover:shadow-2xl`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
        {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
        <span className="text-slate-500 text-xs">{opt.sub}</span>
      </div>
    </button>
  );
}

// 6. Glitch constante
function GlitchButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  return (
    <motion.button
      animate={{ x: [-2, 2, -3, 3, 0], y: [1, -1, 2, -2, 0], skewX: [-2, 2, -1, 0] }}
      transition={{ repeat: Infinity, duration: 0.2, repeatDelay: Math.random() * 2 }}
      onClick={() => onSelect(idx)}
      className={`quiz-option group ${stateClasses} w-full flex items-start`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
        {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
        <span className="text-slate-500 text-xs">{opt.sub}</span>
      </div>
    </motion.button>
  );
}

// 7. Sembra disabilitato finto
function FakeDisabledButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  return (
    <button
      onClick={() => onSelect(idx)}
      className={`quiz-option group ${stateClasses} w-full flex items-start opacity-30 saturate-0 cursor-not-allowed`}
      title="Non puoi cliccarmi ;)"
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
        {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
        <span className="text-slate-500 text-xs">{opt.sub}</span>
      </div>
    </button>
  );
}

// 8. Testo trasparente
function InvisibleButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  return (
    <button
      onClick={() => onSelect(idx)}
      className={`quiz-option group border-white !bg-white hover:border-pink-200 transition-none w-full flex items-start`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors border-white group-hover:border-pink-300 opacity-0 group-hover:opacity-100`}>
        {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
      </div>
      <div className="flex flex-col text-left text-white group-hover:text-slate-100 opacity-0 group-hover:opacity-100">
        <span className="font-bold text-sm mb-0.5">{opt.main}</span>
        <span className="text-xs group-hover:text-slate-500 text-white">{opt.sub}</span>
      </div>
    </button>
  );
}

// 9. Rimbalza su e giu
function BouncingButton({ idx, opt, stateClasses, radioColor, radioBg, onSelect }) {
  return (
    <motion.button
      animate={{ y: [-15, 15] }}
      transition={{ repeat: Infinity, duration: 0.4, repeatType: "mirror", ease: "easeInOut" }}
      onClick={() => onSelect(idx)}
      className={`quiz-option group ${stateClasses} w-full flex items-start z-10`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
        {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
        <span className="text-slate-500 text-xs">{opt.sub}</span>
      </div>
    </motion.button>
  );
}


function QuizPage({ onClose, onWin }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [score, setScore] = useState(0);

  // GAG: Nasty Popup on wrong
  const [showJumpScare, setShowJumpScare] = useState(false);
  const [scareText, setScareText] = useState("");

  const handleAnswerSelect = (index) => {
    const q = questions[currentQuestion];
    if (selectedAnswer === q.correctAnswer) return; // già indovinato

    if (index === q.correctAnswer) {
      setSelectedAnswer(index);
      if (wrongAnswers.length === 0) setScore(prev => prev + 1);
    } else {
      if (!wrongAnswers.includes(index)) {
        setWrongAnswers(prev => [...prev, index]);
        // Trigger JUMP SCARE
        const randomText = WRONG_ALERTS[Math.floor(Math.random() * WRONG_ALERTS.length)];
        setScareText(randomText);
        setShowJumpScare(true);
        setTimeout(() => setShowJumpScare(false), 1500); // sparisce dopo poco
      }
    }
  }

  const handleNext = () => {
    if (selectedAnswer !== questions[currentQuestion].correctAnswer) return;

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setWrongAnswers([]);
    } else {
      setShowSurprise(true);
      onWin();
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setWrongAnswers([]);
    } else {
      onClose('home');
    }
  }

  if (showSurprise) {
    return <MegaSurprise onClose={onClose} score={score} />;
  }

  const q = questions[currentQuestion];
  const progressPercent = Math.round(((currentQuestion + 1) / questions.length) * 100);

  // NUOVA GAG: Rovescia lo schermo per domande specifiche!
  const rotationClass = q.isInverted ? "rotate-180 transition-transform duration-1000 ease-in-out origin-center" : "transition-transform duration-1000 ease-in-out";

  return (
    <div className={`w-screen min-h-screen bg-black flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden m-0 ${rotationClass}`}>

      {/* JUMPSCARE OVERLAY */}
      <AnimatePresence>
        {showJumpScare && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1.2, rotate: 0 }}
            exit={{ opacity: 0, scale: 2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-red-900/40 backdrop-blur-md"
          >
            <div className="bg-slate-900 px-10 py-8 rounded-[3rem] shadow-[0_0_100px_rgba(239,68,68,0.6)] border-8 border-red-600 flex flex-col items-center text-center max-w-lg">
              <AlertTriangle size={80} className="text-red-500 mb-4 animate-bounce drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
              <h1 className="text-3xl font-black text-red-500 uppercase tracking-widest drop-shadow-md">{scareText}</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full min-h-screen flex flex-col items-center relative z-10">
        <header className="flex justify-between items-center px-4 py-4 mb-4 w-full">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onClose('home')}>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-fuchsia-400 shadow-sm border border-slate-700">
              <Sparkles size={16} fill="currentColor" />
            </div>
            <span className="font-bold text-slate-300 text-lg">Birthday Fun</span>
          </div>
          <button onClick={() => onClose('home')} className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-slate-700 transition border border-slate-700 shadow-sm">
            <X size={16} />
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center px-4 w-full pb-10">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`bg-slate-900 w-full max-w-3xl rounded-[2.5rem] shadow-[0_0_40px_rgba(168,85,247,0.1)] border border-slate-800 p-5 sm:p-12 mb-10 overflow-hidden relative ${q.isInverted ? 'border-4 border-fuchsia-500 bg-fuchsia-900/20 ring-8 ring-fuchsia-500/20 shadow-[0_0_50px_rgba(217,70,239,0.3)]' : ''}`}
          >
            {q.isInverted && <div className="absolute top-4 right-4 bg-fuchsia-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-[0_0_10px_rgba(217,70,239,0.8)]">UPSIDE DOWN MODE</div>}

            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-sm">THE BIRTHDAY QUIZ</p>
                <h3 className="text-slate-100 font-bold text-xl">Question {currentQuestion + 1} of {questions.length}</h3>
              </div>
              <span className="text-fuchsia-400 font-extrabold text-sm drop-shadow-sm">{progressPercent}%</span>
            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-6 shadow-inner">
              <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all duration-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]" style={{ width: `${progressPercent}%` }}></div>
            </div>

            <p className="text-slate-500 text-xs italic mb-10">"Sbaglia e verrai umiliata."</p>

            <div className="w-12 h-12 bg-purple-900/30 rounded-2xl flex items-center justify-center text-fuchsia-400 mx-auto mb-6 shadow-inner border border-purple-500/20">
              <Sparkles size={24} />
            </div>

            <h2 className="text-xl sm:text-4xl font-black text-center text-slate-100 mb-8 sm:mb-10 px-2 drop-shadow-md">
              {q.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 relative w-full overflow-hidden">
              {q.options.map((opt, idx) => {
                const isWrong = wrongAnswers.includes(idx);
                const isCorrect = selectedAnswer === q.correctAnswer && idx === q.correctAnswer;

                let stateClasses = 'border-slate-700 bg-slate-800 hover:border-purple-500/50 hover:bg-slate-800/80';
                let radioColor = 'border-slate-600 group-hover:border-purple-400';
                let radioBg = '';

                if (isCorrect) {
                  stateClasses = 'border-emerald-500 bg-emerald-900/20 ring-1 ring-emerald-500/50 relative z-20 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
                  radioColor = 'border-emerald-400';
                  radioBg = 'bg-emerald-400';
                } else if (isWrong) {
                  stateClasses = 'border-red-500/50 bg-red-900/20 opacity-60 pointer-events-none relative z-0';
                  radioColor = 'border-red-500';
                  radioBg = 'bg-red-500';
                } else if (selectedAnswer === q.correctAnswer) {
                  stateClasses = 'border-slate-100 opacity-50 pointer-events-none cursor-not-allowed';
                }

                const props = {
                  key: idx,
                  idx,
                  opt,
                  stateClasses,
                  radioColor,
                  radioBg,
                  onSelect: handleAnswerSelect
                };

                if (q.isTricky && idx === q.correctAnswer) {
                  return <TrickyButton {...props} />;
                }
                if (q.isDisappearing && idx !== q.correctAnswer) {
                  return <DisappearingButton {...props} />;
                }
                if (q.isShrinking && idx === q.correctAnswer && !isCorrect) {
                  return <ShrinkingButton {...props} />;
                }
                if (q.isShaking && idx !== q.correctAnswer) {
                  return <ShakingButton {...props} />;
                }
                if (q.isSpinning && idx === q.correctAnswer) {
                  return <SpinningButton {...props} />;
                }
                if (q.isBlurry && idx !== q.correctAnswer) {
                  return <BlurryButton {...props} />;
                }
                if (q.isMirrored && idx === q.correctAnswer) {
                  return <MirroredButton {...props} />;
                }
                if (q.isTeleporting && idx === q.correctAnswer) {
                  return <TeleportingButton {...props} />;
                }
                if (q.isGiant && idx !== q.correctAnswer) {
                  return <GiantButton {...props} />;
                }
                if (q.isGlitching && idx === q.correctAnswer) {
                  return <GlitchButton {...props} />;
                }
                if (q.isFakeDisabled && idx === q.correctAnswer) {
                  return <FakeDisabledButton {...props} />;
                }
                if (q.isFakeTimer && idx !== q.correctAnswer) {
                  // Let's use the invisible mechanic instead here for simplicity
                  return <InvisibleButton {...props} />;
                }
                if (q.isInvisible && idx !== q.correctAnswer) {
                  return <InvisibleButton {...props} />;
                }
                if (q.isBouncing && idx === q.correctAnswer) {
                  return <BouncingButton {...props} />;
                }

                return (
                  <motion.button
                    {...props}
                    onClick={() => handleAnswerSelect(idx)}
                    animate={isWrong ? { x: [-15, 15, -15, 15, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`quiz-option group ${stateClasses} w-full flex items-start`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${radioColor}`}>
                      {radioBg && <div className={`w-2.5 h-2.5 rounded-full ${radioBg}`}></div>}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-slate-100 font-bold text-sm mb-0.5">{opt.main}</span>
                      <span className="text-slate-500 text-xs">{opt.sub}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start border-t border-slate-800 pt-8 mt-10 relative z-20 bg-slate-900 gap-4 sm:gap-0 w-full">
              <button
                onClick={handleBack}
                className="text-fuchsia-500 hover:text-fuchsia-400 font-bold text-sm flex items-center justify-center gap-2 transition-colors px-4 py-2 w-full sm:w-auto"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswer !== q.correctAnswer}
                className={`btn-primary px-10 w-full sm:w-auto ${selectedAnswer !== q.correctAnswer ? 'opacity-50 cursor-not-allowed shadow-none' : ''}`}
              >
                Next Question <ArrowRight size={16} />
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}
// --- MINI GAMES ---

function F1ReactionGame({ onClose, onWin }) {
  const [gameState, setGameState] = useState('idle'); // idle, waiting, playing, finished, jumpstart
  const [lightsCount, setLightsCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);

  const startGame = () => {
    setGameState('waiting');
    setLightsCount(0);
    setReactionTime(null);
  };

  useEffect(() => {
    let interval;
    let timeout;
    if (gameState === 'waiting') {
      let count = 0;
      interval = setInterval(() => {
        count++;
        setLightsCount(count);
        if (count === 5) {
          clearInterval(interval);
          timeout = setTimeout(() => {
            setLightsCount(0);
            setGameState('playing');
            setStartTime(Date.now());
          }, Math.random() * 2000 + 1000); // 1-3 seconds
        }
      }, 1000);
    }
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [gameState]);

  const handleClick = () => {
    if (gameState === 'playing') {
      setReactionTime(Date.now() - startTime);
      setGameState('finished');
    } else if (gameState === 'waiting') {
      setGameState('jumpstart');
    }
  };

  return (
    <div className="w-screen min-h-screen bg-black flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden m-0">
      <Navbar onAction={onClose} />

      {/* Racing stripe bg deco */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-10 top-1/3 w-[2px] h-3/4 bg-gradient-to-b from-transparent via-red-800/30 to-transparent" />
        <div className="absolute left-6 top-1/3 w-[1px] h-3/4 bg-gradient-to-b from-transparent via-red-800/20 to-transparent" />
        <div className="absolute right-6 top-1/3 w-[1px] h-3/4 bg-gradient-to-b from-transparent via-red-800/20 to-transparent" />
        <div className="absolute -right-10 top-1/3 w-[2px] h-3/4 bg-gradient-to-b from-transparent via-red-800/30 to-transparent" />
      </div>

      {/* Clickable zone – only active while lights are on */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-2xl mt-8 gap-10 px-8"
        onClick={gameState === 'waiting' || gameState === 'playing' ? handleClick : undefined}
      >
        <div className="text-center">
          <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">SFIDA 1 di 4 · FORMULA 1</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-wider">F1 REACTION START</h1>
          <p className="text-slate-400 text-sm">
            {gameState === 'idle' ? 'Clicca su Inizia Gara per cominciare' : gameState === 'playing' ? '🟢 VIA! CLICCA ORA!' : 'Clicca sullo schermo appena le luci si spengono!'}
          </p>
        </div>

        {/* F1 Lights Display */}
        <div className="relative">
          <div className="absolute inset-0 bg-red-900/10 blur-[60px] rounded-full" />
          <div className="relative flex gap-3 sm:gap-5 p-5 sm:p-8 bg-slate-900/90 rounded-[2rem] border border-slate-800 shadow-2xl shadow-black/50 backdrop-blur-sm">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 transition-all duration-100 ${gameState === 'playing' ? 'bg-emerald-400 border-emerald-300 shadow-[0_0_30px_#4ade80]' :
                  gameState === 'waiting' && lightsCount >= i ? 'bg-red-500 border-red-400 shadow-[0_0_25px_#ef4444]' :
                    'bg-slate-800 border-slate-700'
                  }`} />
              </div>
            ))}
          </div>
        </div>

        {gameState === 'idle' && (
          <button onClick={(e) => { e.stopPropagation(); startGame(); }} className="btn-primary bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 text-white border-none text-lg px-12 py-4">
            🏎️ Inizia Gara
          </button>
        )}
        {gameState === 'waiting' && (
          <p className="text-slate-500 text-sm animate-pulse">☝️ Non cliccare ancora... aspetta le luci!</p>
        )}
        {gameState === 'jumpstart' && (
          <div className="text-center bg-red-950/40 border border-red-800 rounded-2xl p-6 w-full">
            <p className="text-red-400 font-black text-3xl mb-2">⛔ FALSA PARTENZA!</p>
            <p className="text-slate-400 text-sm mb-4">Hai anticipato i semafori, penalità 10 secondi!</p>
            <button onClick={(e) => { e.stopPropagation(); startGame(); }} className="btn-primary bg-red-600 hover:bg-red-500 border-none">Riprova</button>
          </div>
        )}
      </div>

      {/* Result screen – outside clickable zone */}
      {gameState === 'finished' && (
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 pb-16 px-8 text-center w-full max-w-lg">
          <div className="w-full bg-slate-900/80 border border-slate-800 rounded-[2rem] p-8 backdrop-blur-sm shadow-2xl">
            <p className="text-slate-400 text-sm mb-2">Il tuo tempo di reazione:</p>
            <p className="font-black drop-shadow-[0_0_20px_rgba(52,211,153,0.6)] mb-1" style={{ fontSize: '5rem', lineHeight: 1, color: reactionTime < 400 ? '#4ade80' : reactionTime < 600 ? '#facc15' : '#f87171' }}>
              {reactionTime}<span className="text-2xl ml-2 font-bold">ms</span>
            </p>
            <p className="text-slate-300 font-semibold text-lg mb-6">
              {reactionTime < 300 ? '🏆 Riflessi da Max Verstappen! ASSURDO!' : reactionTime < 400 ? '🏎️ Leclerc level. Sei velocissima!' : reactionTime < 700 ? '🏁 Ce la fai! Pronta per il prossimo!' : '🐢 Più lenta di una Safety Car...'}
            </p>
            {reactionTime < 700 ? (
              <button
                onClick={() => { onWin(); onClose('memory-game'); }}
                className="btn-primary bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30 w-full text-lg py-4"
              >
                Sfida Superata! ➡️ Prossima Sfida ✅
              </button>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <p className="text-red-400 text-sm font-bold">Devi fare meno di 700ms per passare!</p>
                <button onClick={startGame} className="btn-primary w-full">🔄 Riprova</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function EmojiMatchGame({ onClose, onWin }) {
  const baseEmojis = ['🎭', '🎬', '🎟️', '🎮', '🏎️', '🎸', '👾', '🔮'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffled = [...baseEmojis, ...baseEmojis].sort(() => Math.random() - 0.5).map((e, idx) => ({ id: idx, emoji: e }));
    setCards(shuffled);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      if (cards[newFlipped[0]].emoji === cards[newFlipped[1]].emoji) {
        setSolved(s => [...s, newFlipped[0], newFlipped[1]]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="w-screen min-h-screen bg-slate-950 flex flex-col items-center m-0 pb-20">
      <Navbar onAction={onClose} />
      <div className="text-center mt-10 mb-8 px-4">
        <span className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-3 block">SFIDA 2 di 4 · MEMORIA</span>
        <h1 className="text-4xl font-black text-white mb-2">EMOJI MATCH</h1>
        <div className="flex items-center justify-center gap-4 mt-2">
          <span className="text-slate-400 text-sm">Mosse:</span>
          <span className="text-fuchsia-400 font-black text-2xl">{moves}</span>
          {solved.length > 0 && <span className="text-emerald-400 text-sm font-bold">{solved.length / 2}/{cards.length / 2} coppie</span>}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-sm sm:max-w-lg mb-8 px-4">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || solved.includes(idx);
          const isSolved = solved.includes(idx);
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-4xl sm:text-5xl cursor-pointer transition-all duration-300 select-none ${isSolved ? 'bg-emerald-900/30 border-2 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]' :
                isFlipped ? 'bg-slate-800 border-2 border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.25)]' :
                  'bg-slate-800/60 border-2 border-slate-700 hover:border-purple-500/40 hover:bg-slate-800 active:scale-95'
                }`}
            >
              <motion.span
                animate={{ opacity: isFlipped ? 1 : 0, scale: isFlipped ? 1 : 0.3, rotateY: isFlipped ? 0 : 90 }}
                transition={{ duration: 0.25 }}
                className={isFlipped ? 'block' : 'hidden'}
              >
                {card.emoji}
              </motion.span>
              {!isFlipped && <span className="text-slate-700 text-3xl select-none">?</span>}
            </div>
          )
        })}
      </div>
      {solved.length === 16 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-slate-900 border border-emerald-500/50 rounded-[2rem] p-8 mx-4 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
        >
          <h2 className="text-5xl font-black text-emerald-400 mb-2">🎉 HAI VINTO!</h2>
          <p className="text-slate-300 mb-6">Completato in {moves} mosse!</p>
          <button onClick={() => { onWin(); onClose('bug-game'); }} className="btn-primary bg-emerald-600 hover:bg-emerald-500 text-lg px-10 py-4">
            Sfida Superata! ➡️ Prossima Sfida ✅
          </button>
        </motion.div>
      )}
    </div>
  )
}

function BugCatcherGame({ onClose, onWin }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [bugPos, setBugPos] = useState({ top: '50%', left: '50%' });
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setIsPlaying(true);
    moveBug();
  };

  const moveBug = () => {
    setBugPos({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`
    });
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const handleCatch = (e) => {
    e.stopPropagation();
    if (!isPlaying) return;
    setScore(s => s + 1);
    moveBug();
  };

  return (
    <div className="w-screen min-h-screen bg-slate-950 flex flex-col m-0 overflow-hidden relative" onClick={() => { if (isPlaying && score > 0) setScore(s => s - 1); }}>
      <div className="p-8 pb-0 relative z-10 w-full"><Navbar onAction={onClose} /></div>

      {/* Animated background grid pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(6,182,212,0.4) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="text-center mt-4 mb-4 relative z-10 pointer-events-none">
        <span className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-2 block">SFIDA 3 di 4 · BIOTECH</span>
        <h1 className="text-4xl font-black text-white mb-3">VACCINE SIMULATOR 🧬</h1>
        <div className="flex justify-center gap-4 sm:gap-8 font-bold text-xl">
          <div className="flex flex-col items-center">
            <span className="text-slate-500 text-xs uppercase tracking-widest mb-1">Score</span>
            <span className="text-purple-400 text-3xl font-black">{score}</span>
          </div>
          <div className="w-px bg-slate-800" />
          <div className="flex flex-col items-center">
            <span className="text-slate-500 text-xs uppercase tracking-widest mb-1">Tempo</span>
            <span className={`text-3xl font-black ${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`}>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {!isPlaying && timeLeft === 15 && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-cyan-500/30 p-8 rounded-[2rem] text-center max-w-sm shadow-[0_0_60px_rgba(6,182,212,0.15)]"
          >
            <div className="text-6xl mb-4">🦠</div>
            <h2 className="text-2xl font-black text-white mb-3">Vaccine Simulator</h2>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">Sei una Biotech Queen! Schiaccia tutti i virus 🦠 prima che scada il tempo.<br /><br />⚠️ Se clicchi a vuoto perdi un punto!</p>
            <button onClick={startGame} className="btn-primary w-full bg-cyan-600 hover:bg-cyan-500 border-none shadow-cyan-500/30 text-lg py-4">Inizia Ricerca 🔬</button>
          </motion.div>
        </div>
      )}

      {!isPlaying && timeLeft === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-purple-500/50 p-8 rounded-[2rem] text-center max-w-sm shadow-[0_0_40px_rgba(168,85,247,0.2)]"
          >
            <h2 className="text-4xl font-black text-white mb-1">RICERCA FINITA!</h2>
            <p className="text-slate-400 text-sm mb-4">Virus eliminati: <span className="text-fuchsia-400 font-black text-2xl">{score}</span></p>
            {score >= 8 ? (
              <>
                <p className="text-emerald-400 font-bold mb-6">Ottimo lavoro, Dottoressa! 💉 Il virus è sconfitto!</p>
                <button onClick={() => { onWin(); onClose('quiz'); }} className="btn-primary w-full bg-emerald-600 hover:bg-emerald-500 text-lg py-4">Sfida Superata! ➡️ Quiz Finale 🏆</button>
              </>
            ) : (
              <>
                <p className="text-red-400 text-sm font-bold mb-4">Ne servivano almeno 8! L'infezione continua...</p>
                <button onClick={startGame} className="btn-primary w-full mb-3">🔄 Riprova</button>
                <button onClick={() => onClose('home')} className="text-slate-400 hover:text-slate-300 text-sm w-full py-2">← Torna alla Home</button>
              </>
            )}
          </motion.div>
        </div>
      )}

      {isPlaying && (
        <motion.div
          onClick={handleCatch}
          animate={{ top: bugPos.top, left: bugPos.left }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="absolute text-6xl sm:text-7xl cursor-crosshair transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-75 select-none z-20"
          style={{ filter: 'drop-shadow(0 0 12px rgba(6,182,212,0.5))' }}
        >
          🦠
        </motion.div>
      )}
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // Store unlocked progress ('f1', 'memory', 'bug')
  const [completedGames, setCompletedGames] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentPage === 'home' && <WelcomePage onNavigate={setCurrentPage} completedGames={completedGames} isMobile={isMobile} />}
        {currentPage === 'quiz' && <QuizPage onClose={setCurrentPage} onWin={() => setCompletedGames(prev => [...new Set([...prev, 'quiz'])])} />}
        {currentPage === 'memory' && <MemoryLane onClose={setCurrentPage} />}
        {currentPage === 'f1-game' && <F1ReactionGame onClose={setCurrentPage} onWin={() => setCompletedGames(prev => [...new Set([...prev, 'f1'])])} />}
        {currentPage === 'bug-game' && <BugCatcherGame onClose={setCurrentPage} onWin={() => setCompletedGames(prev => [...new Set([...prev, 'bug'])])} />}
        {currentPage === 'memory-game' && <EmojiMatchGame onClose={setCurrentPage} onWin={() => setCompletedGames(prev => [...new Set([...prev, 'memory'])])} />}
        {currentPage === 'stim-clicker' && <StimulationClicker onClose={setCurrentPage} />}
        {currentPage.startsWith('bubble') && <BubbleView label={currentPage.split('-')[1]} onClose={setCurrentPage} />}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
