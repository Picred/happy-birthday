import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gift, Heart, Trash2, ArrowRight, ArrowLeft, BookOpen, HelpCircle, X, Sparkles, Star, Image as ImageIcon, AlertTriangle, Flame, Activity, Ghost, TrendingUp, TrendingDown } from 'lucide-react';
import Confetti from 'react-confetti';
import {
  ALL_UPGRADES, ACHIEVEMENTS_DEF, NEWS_ITEMS, FAKE_NOTIFS, DUOLINGO_QUESTIONS,
  EMAILS, COSMETICS, STOCK_TICKERS, CRYPTO_TICKERS, dvdCost, hydraulicSpeedCost,
  FITNESS_EXERCISES, TWITCH_MESSAGES, SKYWRITER_ADS
} from './stimData';

function DVDLogo({ color }) {
  return (
    <div style={{ width: 100, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 500 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path fill={color} d="M469.9 212.1h-14.7l-.4 2.2h6.2l-2.2 17.3h2.6l2.3-17.3h5.7zM480.1 224.9l-3.1-12.8h-1.8l-6.7 19.5h2.2l5.4-15.1 3.1 15.1 8-15.1v15.1h2.6v-19.5h-2.6zM76.2 282.1 59 249.7H44.3l27.1 49.7h8.4l27.5-49.7H92.2zM141 275.4v24h13.3v-49.7H141zM285 299.4h36.8V291h-23v-13.3h21.7v-8.5h-21.7v-11h23v-8.5H285zM472 188.1c0-18.6-105.6-33.7-236-33.7S0 169.5 0 188.1s105.7 33.7 236 33.7 236-15 236-33.7zm-298.7.5c0-6.2 24.2-11.1 54.1-11.1s54 5 54 11-24.1 11.1-54 11.1-54-5-54-11zM392.3 249.5c-19.3 0-35 11.1-35 24.8s15.7 24.8 35 24.8 35-11 35-24.8c0-13.7-15.7-24.8-35-24.8zm0 40.6c-11.5 0-20.8-7-20.8-15.8 0-8.7 9.3-15.7 20.8-15.7s20.8 7 20.8 15.7-9.3 15.8-20.8 15.8zM214.8 249.7h-21v49.7h21s33.4 0 33.4-24.6-33.4-25-33.4-25zm-7 41.2v-32.7s26.2-1.7 26.2 16.5c0 18.1-26.1 16.2-26.1 16.2zM192 54.3a78 78 0 0 0-4-26.2h1.7L234.5 154 344.5 28h59.3S450 26.8 450 56.5s-38.4 41.2-63 41.2h-10.6l13.8-59.4h-48.3l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4C500 1.3 418.9.6 418.9.6h-102l-64.7 81.6L227 .6H43l-6.7 27.5h61.5c8.7.2 44 2.4 44 28.4 0 29.7-38.4 41.2-62.9 41.2H68.3L82 38.3H33.7l-20.4 86.4h65.8c63 0 112.8-34.6 112.8-70.4z" />
      </svg>
    </div>
  );
}



// DVDs Hook
function useDVDs(count, onBounce, speedMult = 1) {
  const [dvds, setDvds] = useState([]);
  const onBounceRef = useRef(onBounce);
  onBounceRef.current = onBounce;

  useEffect(() => {
    if (count === 0) { setDvds([]); return; }
    setDvds(prev => {
      if (prev.length === count) return prev;
      return Array.from({ length: count }, (_, i) => {
        if (prev[i]) return prev[i];
        return {
          id: i, x: Math.random() * 80 + 5, y: Math.random() * 80 + 5,
          dx: (Math.random() > 0.5 ? 1 : -1) * (0.15 + Math.random() * 0.1),
          dy: (Math.random() > 0.5 ? 1 : -1) * (0.15 + Math.random() * 0.1),
          color: `hsl(${Math.floor(Math.random() * 360)},80%,65%)`,
        };
      });
    });
  }, [count]);

  useEffect(() => {
    if (dvds.length === 0) return;
    const raf = setInterval(() => {
      let hitsToProcess = [];
      setDvds(prev => prev.map(d => {
        let { x, y, dx, dy, color } = d;
        x += dx * speedMult; y += dy * speedMult;
        let hit = false;
        let cornerHit = false;
        if (x <= 0 || x >= 90) { dx = -dx; hit = true; }
        if (y <= 0 || y >= 90) { dy = -dy; hit = true; }

        // Simple corner hit detection
        if ((x <= 0 || x >= 90) && (y <= 0 || y >= 90)) {
          cornerHit = true;
        }

        x = Math.max(0, Math.min(90, x));
        y = Math.max(0, Math.min(90, y));
        if (hit) {
          color = `hsl(${Math.floor(Math.random() * 360)},80%,65%)`;
          hitsToProcess.push(cornerHit);
        }
        return { ...d, x, y, dx, dy, color };
      }));

      hitsToProcess.forEach(c => onBounceRef.current(c));
    }, 16);
    return () => clearInterval(raf);
  }, [dvds.length, speedMult]);

  return dvds;
}

// Optimized DVD Layer that doesn't re-render the whole app
const DVDLayer = React.memo(({ count, onBounce, speedMult }) => {
  const dvds = useDVDs(count, onBounce, speedMult);
  return (
    <>
      {dvds.map(d => (
        <div key={d.id} className="fixed pointer-events-none z-0"
          style={{ left: `${d.x}%`, top: `${d.y}%`, willChange: 'left, top' }}>
          <DVDLogo color={d.color} />
        </div>
      ))}
    </>
  );
});

// Helper to format screen time
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// MAKE SURE TO EXPORT THE CORE COMPONENT HERE, SO WE CAN RENDER IT
export default function StimulationClicker({ onClose }) {
  // CORE STATE
  const [stim, setStim] = useState(0);
  const [totalProd, setTotalProd] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [spc, setSpc] = useState(1);
  const [sps, setSps] = useState(0);
  const [spb, setSpb] = useState(0);

  const [boughtIds, setBoughtIds] = useState([]);
  const [boughtCosmetics, setBoughtCosmetics] = useState([]);
  const [equipedCosmetic, setEquipedCosmetic] = useState(null);
  const [upgradeCount, setUpgradeCount] = useState(0);

  // STOCKS STATE
  const [stocks, setStocks] = useState(
    [...STOCK_TICKERS, ...CRYPTO_TICKERS].map(t => ({ ...t, currentPrice: t.basePrice, owned: 0, history: [t.basePrice] }))
  );
  const [dvdCount, setDvdCount] = useState(0);
  const [floaters, setFloaters] = useState([]);
  const [fakeNotifs, setFakeNotifs] = useState([]);
  const [airplanes, setAirplanes] = useState([]);

  // ACHIEVEMENTS & STATS
  const [achievements, setAchievements] = useState([]);
  const [achieveToast, setAchieveToast] = useState(null);
  const [level, setLevel] = useState(1);
  const [cornerHits, setCornerHits] = useState(0);

  // UI & EVENTS
  const [hydraulicSquish, setHydraulicSquish] = useState(false);
  const [hydraulicReady, setHydraulicReady] = useState(true);
  const [lootBox, setLootBox] = useState(null);
  const [screenTime, setScreenTime] = useState(0);
  const [duoQuestion, setDuoQuestion] = useState(null);

  const [nextId2] = useState({ current: 0 });
  const [powerupFlash, setPowerupFlash] = useState(null); // { text, emoji }
  const [showFitness, setShowFitness] = useState(false);
  const [fitnessExercise, setFitnessExercise] = useState(null);
  const [twitchMessages, setTwitchMessages] = useState([]);
  const [skywriterText, setSkywriterText] = useState('');
  const [tamagotchiHunger, setTamagotchiHunger] = useState(100);
  const [tamagotchiAction, setTamagotchiAction] = useState(null); // 'eating' | null

  const nextId = useRef(0);

  // DERIVED FLAGS
  const has = (id) => boughtIds.includes(id);
  const hasSpsCounter = has('sps_counter');
  const hasNews = has('news');
  const hasSubway = has('subway');
  const hasAchieve = has('achieve');
  const hasCritical = has('critical');
  const hasHydraulic = has('hydraulic');
  const uiUpgrade = has('ui_upgrade');
  const hasReactionStreamer = has('reaction_streamer');

  // DVD LOGIC
  const handleDvdBounce = useCallback((isCorner) => {
    if (isCorner) setCornerHits(c => c + 1);

    let bounceGain = spb;
    if (isCorner && has('corner_hits')) {
      bounceGain *= 10;
    }

    if (bounceGain > 0) {
      setStim(s => s + bounceGain);
      setTotalProd(t => t + bounceGain);
    }
  }, [spb, boughtIds]);

  const dvdSpeed = has('dvd_speed2') ? 2 : 1;

  // VISIBLE UPGRADES (max 5)
  const visibleUpgrades = ALL_UPGRADES.filter(u => {
    if (totalProd < u.unlockAt) return false;
    if (u.needs && !has(u.needs)) return false;
    if (u.multi) return true; // DVD
    return !has(u.id);
  }).slice(0, 5);

  // TICKERS & LOOPS
  const spsRef = useRef(0);
  spsRef.current = sps;

  // Game Pause logic
  const isPaused = duoQuestion !== null;

  useEffect(() => {
    const interval = setInterval(() => {
      // Do not produce if paused
      if (spsRef.current <= 0 || duoQuestion !== null) return;
      setStim(s => s + spsRef.current / 10);
      setTotalProd(t => t + spsRef.current / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [duoQuestion]);

  // Screen Time
  useEffect(() => {
    if (!has('screen_time')) return;
    const interval = setInterval(() => setScreenTime(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [boughtIds]);

  // Tab Title
  useEffect(() => {
    if (has('tab_title')) {
      document.title = 'Stimulation Clicker';
    }
    return () => { document.title = 'Vite + React'; };
  }, [boughtIds]);

  // Loot Box Spawner
  useEffect(() => {
    if (!has('loot_boxes')) return;
    const interval = setInterval(() => {
      if (!lootBox && Math.random() < 0.3) {
        setLootBox({
          id: Date.now(),
          x: 10 + Math.random() * 80,
          y: 20 + Math.random() * 60,
          reward: Math.floor(Math.random() * 5000) + 1000
        });
        // Auto-despawn after 5 seconds if not clicked
        setTimeout(() => setLootBox(null), 5000);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [boughtIds, lootBox]);

  // Duolingo Spawner
  useEffect(() => {
    if (!has('duolingo')) return;
    const interval = setInterval(() => {
      if (!duoQuestion && Math.random() < 0.3) {
        setDuoQuestion(DUOLINGO_QUESTIONS[Math.floor(Math.random() * DUOLINGO_QUESTIONS.length)]);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [boughtIds, duoQuestion]);

  // Achievement Checker
  useEffect(() => {
    if (!hasAchieve) return;
    const state = { totalClicks, totalProduced: totalProd, boughtIds, upgradeCount };
    ACHIEVEMENTS_DEF.forEach(a => {
      if (!achievements.includes(a.id) && a.check(state)) {
        setAchievements(prev => [...prev, a.id]);
        setAchieveToast(a);
        setTimeout(() => setAchieveToast(null), 3000);
      }
    });
  }, [totalClicks, totalProd, boughtIds, upgradeCount, hasAchieve, achievements]);

  // Stock Market Fluctuation logic
  useEffect(() => {
    if (!has('stock_market')) return;
    const interval = setInterval(() => {
      setStocks(prev => prev.map(s => {
        const changePercent = (Math.random() - 0.48) * 0.15; // slightly skewed positive or negative randomly
        let newPrice = s.currentPrice * (1 + changePercent);
        newPrice = Math.max(1, Math.floor(newPrice)); // Never below 1

        const newHistory = [...s.history, newPrice].slice(-10); // keep last 10 prices for trend
        return { ...s, currentPrice: newPrice, history: newHistory };
      }));
    }, 5000); // Fluctuates every 5 seconds
    return () => clearInterval(interval);
  }, [boughtIds]);

  // Thunder sounds logic
  useEffect(() => {
    if (!has('thunder')) return;
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        // Play a random thunder sound
        const audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'); // Fallback placeholder sound if no thunder is easily linkable, though realistic we'd want a real thunder wav (placeholder for now to show it "does" something)
        // A better approach for the user: Just visually flash the screen to indicate thunder, since audio requires interact.
        const flash = document.createElement('div');
        flash.className = 'fixed inset-0 bg-white z-[999] opacity-0 pointer-events-none transition-opacity duration-75';
        document.body.appendChild(flash);

        setTimeout(() => { flash.style.opacity = '0.8'; }, 10);
        setTimeout(() => {
          flash.style.opacity = '0';
          setTimeout(() => flash.remove(), 200);
        }, 100);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [boughtIds]);

  // Email Notifs Loop
  useEffect(() => {
    if (!has('email')) return;
    const interval = setInterval(() => {
      if (Math.random() < 0.4) {
        const id = Date.now();
        const eml = EMAILS[Math.floor(Math.random() * EMAILS.length)];
        setFakeNotifs(prev => [...prev.slice(-2), { id, ...eml }]);
        setTimeout(() => setFakeNotifs(curr => curr.filter(n => n.id !== id)), 8000);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [boughtIds]);

  // Skywriter Loop — immediate first plane on purchase
  useEffect(() => {
    if (!has('skywriter')) return;
    // Spawn one plane immediately
    const firstId = Date.now();
    const adText = SKYWRITER_ADS[Math.floor(Math.random() * SKYWRITER_ADS.length)];
    setSkywriterText(adText);
    setAirplanes(prev => [...prev, firstId]);
    setTimeout(() => setAirplanes(prev => prev.filter(x => x !== firstId)), 15000);

    const interval = setInterval(() => {
      if (Math.random() < 0.6) {
        const id = Date.now();
        const ad = SKYWRITER_ADS[Math.floor(Math.random() * SKYWRITER_ADS.length)];
        setSkywriterText(ad);
        setAirplanes(prev => [...prev, id]);
        setTimeout(() => setAirplanes(prev => prev.filter(x => x !== id)), 15000);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [boughtIds]);

  // Fitness Instructor popup
  useEffect(() => {
    if (!has('fitness')) return;
    // Show immediately
    const first = FITNESS_EXERCISES[Math.floor(Math.random() * FITNESS_EXERCISES.length)];
    setFitnessExercise(first);
    setShowFitness(true);
    setTimeout(() => setShowFitness(false), 8000);

    const interval = setInterval(() => {
      const ex = FITNESS_EXERCISES[Math.floor(Math.random() * FITNESS_EXERCISES.length)];
      setFitnessExercise(ex);
      setShowFitness(true);
      setTimeout(() => setShowFitness(false), 8000);
    }, 60000); // every minute
    return () => clearInterval(interval);
  }, [boughtIds]);

  // Reaction Streamer (Twitch chat overlay)
  useEffect(() => {
    if (!has('reaction_streamer')) return;
    // Add messages one by one
    const interval = setInterval(() => {
      const msg = TWITCH_MESSAGES[Math.floor(Math.random() * TWITCH_MESSAGES.length)];
      setTwitchMessages(prev => [...prev.slice(-6), { ...msg, id: Date.now() }]);
    }, 1500);
    return () => clearInterval(interval);
  }, [boughtIds]);

  // Powerup Flash (In-Game Currency)
  useEffect(() => {
    if (!has('powerups')) return;
    const interval = setInterval(() => {
      if (Math.random() < 0.4) {
        const gains = ['+500 STIM!', '2X STIM COMBO!', '⚡ POWER UP!', '🎯 PRECISION BOOST!', '🔥 HOT STREAK!'];
        const pick = gains[Math.floor(Math.random() * gains.length)];
        setPowerupFlash(pick);
        const bonus = Math.floor(sps * 2);
        setStim(s => s + bonus);
        setTotalProd(t => t + bonus);
        setTimeout(() => setPowerupFlash(null), 2500);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [boughtIds, sps]);

  // Email Notifs Loop — immediate on purchase
  useEffect(() => {
    if (!has('email')) return;
    // Trigger one immediately
    const id0 = Date.now();
    const eml0 = EMAILS[Math.floor(Math.random() * EMAILS.length)];
    setFakeNotifs([{ id: id0, ...eml0 }]);
    setTimeout(() => setFakeNotifs(curr => curr.filter(n => n.id !== id0)), 8000);

    const interval = setInterval(() => {
      if (Math.random() < 0.6) {
        const id = Date.now();
        const eml = EMAILS[Math.floor(Math.random() * EMAILS.length)];
        setFakeNotifs(prev => [...prev.slice(-2), { id, ...eml }]);
        setTimeout(() => setFakeNotifs(curr => curr.filter(n => n.id !== id)), 8000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [boughtIds]);

  // Tamagotchi hunger
  useEffect(() => {
    if (!has('tamagotchi')) return;
    const interval = setInterval(() => {
      setTamagotchiHunger(h => Math.max(0, h - 5));
    }, 10000); // Loses 5 hunger every 10 seconds
    return () => clearInterval(interval);
  }, [boughtIds]);

  const feedTamagotchi = () => {
    if (!has('tamagotchi') || stim < 100) return;
    setStim(s => s - 100);
    setTamagotchiHunger(h => Math.min(100, h + 30));
    setTamagotchiAction('eating');
    setTimeout(() => setTamagotchiAction(null), 1500);
  };

  useEffect(() => {
    if (!hasHydraulic || duoQuestion !== null || !has('auto_hydraulic')) return;
    const speed = 2000;
    const interval = setInterval(() => {
      setHydraulicSquish(true);
      setHydraulicReady(false);
      setStim(s => s + 1000);
      setTotalProd(t => t + 1000);
      setTimeout(() => setHydraulicSquish(false), 600);
      setTimeout(() => setHydraulicReady(true), speed);
    }, speed);
    return () => clearInterval(interval);
  }, [hasHydraulic, boughtIds, duoQuestion]);

  const handleHydraulicClick = (e) => {
    if (e) e.stopPropagation();
    if (hydraulicSquish || isPaused || !hydraulicReady || has('auto_hydraulic')) return;

    setHydraulicSquish(true);
    setHydraulicReady(false);
    setStim(s => s + 1000);
    setTotalProd(t => t + 1000);

    setTimeout(() => setHydraulicSquish(false), 600);
    // Cooldown is 8 seconds (base speed)
    setTimeout(() => setHydraulicReady(true), 8000);
  };

  // CLICK ACTION
  const addFloater = (x, y, gain, isCrit, isPopcorn = false) => {
    const id = nextId.current++;
    const rot = isPopcorn ? (Math.random() > 0.5 ? 90 : -90) : 0;
    setFloaters(f => [...f.slice(-30), { id, x, y, val: gain, isCrit, isPopcorn, rot }]);
    setTimeout(() => setFloaters(f => f.filter(fl => fl.id !== id)), 900);
  };

  const handleClick = (e) => {
    if (e) e.stopPropagation();
    if (isPaused) return; // Cannot click while duolingo active

    let gain = spc;
    const isCrit = hasCritical && Math.random() < 0.05;
    if (isCrit) {
      gain *= (6 + Math.random() * 3); // 6-9x multiplier
    }

    // btn_upgrade2: Each click gives 1% of your SPS
    if (has('btn_upgrade2')) {
      gain += (sps * 0.01);
    }

    gain = Math.floor(gain);

    if (e) {
      const jitterX = (Math.random() - 0.5) * 40;
      const isPopcorn = has('popcorn') && Math.random() < 0.3;
      addFloater(e.clientX + jitterX, e.clientY - 20, gain, isCrit, isPopcorn);
    }

    setStim(s => s + gain);
    setTotalProd(t => {
      const newT = t + gain;
      if (has('levels')) {
        const newLevel = Math.floor(Math.sqrt(newT / 500)) + 1;
        if (newLevel > level) setLevel(newLevel);
      }
      return newT;
    });
    setTotalClicks(c => c + 1);
  };

  const openLootBox = () => {
    if (!lootBox) return;
    setStim(s => s + lootBox.reward);
    setTotalProd(t => t + lootBox.reward);
    setLootBox(null);
  };

  const handleBuyStock = (id, amount) => {
    setStocks(prev => prev.map(s => {
      if (s.id === id) {
        const cost = s.currentPrice * amount;
        if (stim >= cost) {
          setStim(curr => curr - cost);
          return { ...s, owned: s.owned + amount };
        }
      }
      return s;
    }));
  };

  const handleSellStock = (id, amount) => {
    setStocks(prev => prev.map(s => {
      if (s.id === id && s.owned >= amount) {
        const gain = s.currentPrice * amount;
        setStim(curr => curr + gain);
        setTotalProd(curr => curr + gain);
        return { ...s, owned: s.owned - amount };
      }
      return s;
    }));
  };


  const buyUpgrade = (upg) => {
    let actualCost = upg.cost;
    if (upg.id === 'dvd') actualCost = dvdCost(dvdCount);

    if (stim < actualCost) return;

    setStim(s => s - actualCost);
    setSpc(s => s + (upg.spc || 0));
    setSps(s => s + (upg.sps || 0));
    if (upg.spb) setSpb(s => s + upg.spb);

    if (upg.id === 'dvd') {
      setDvdCount(c => c + 1);
    } else {
      setBoughtIds(prev => [...prev, upg.id]);
    }
    setUpgradeCount(c => c + 1);
  };

  const bgStyle = uiUpgrade
    ? { background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }
    : { background: '#ffffff', color: '#000000' };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center overflow-hidden relative select-none font-sans transition-colors duration-1000 pointer-events-none" style={bgStyle}>

      {/* BACKGROUND ELEMENTS */}
      {/* Thunder flash (no rain animation) */}
      {has('thunder') && (
        <motion.div animate={{ opacity: [0, 0, 0.6, 0, 0, 0, 0.3, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }} className="fixed inset-0 bg-white pointer-events-none z-0 mix-blend-overlay" />
      )}

      {/* DVDs (Isolated Component) */}
      <DVDLayer count={dvdCount} onBounce={handleDvdBounce} speedMult={dvdSpeed} />

      {/* Click Floaters */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {floaters.map(f => (
          <motion.span key={f.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -60, scale: f.isCrit ? 1.8 : 1.2, rotate: f.rot }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
              position: 'absolute', left: f.x, top: f.y,
              color: f.isCrit ? '#ef4444' : '#666',
              fontWeight: 700,
              fontSize: f.isCrit || f.isPopcorn ? '1.4rem' : '1rem',
              pointerEvents: 'none'
            }}
          >
            {f.isPopcorn ? '🍿' : (f.isCrit ? `💥 CRIT!` : `+${f.val}`)}
          </motion.span>
        ))}
      </div>

      {/* TOP NAVBAR & NEWS */}
      {hasNews && (
        <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 text-black text-sm py-1 overflow-hidden flex items-center">
          <span className="relative z-10 bg-black text-white px-2 py-0.5 font-bold ml-2 shrink-0">BREAKING NEWS</span>
          <div className="overflow-hidden flex-1 relative h-5 ml-2">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="whitespace-nowrap absolute flex gap-4"
            >
              <span className="pr-4">{[...NEWS_ITEMS].join('   ·   ')}</span>
              <span className="pr-4">{[...NEWS_ITEMS].join('   ·   ')}</span>
            </motion.div>
          </div>
        </div>
      )}

      {/* Close button top right */}
      <div className="absolute top-4 right-4 z-50">
        <button onClick={() => onClose('home')} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition shadow">
          <X size={20} />
        </button>
      </div>

      {has('screen_time') && (
        <div className="fixed top-[60px] left-4 z-50 text-white font-mono text-sm bg-black px-3 py-1.5 rounded-md border border-gray-700 shadow-md pointer-events-none">
          Screen Time: {formatTime(screenTime)}
        </div>
      )}

      {/* ADMIN CHEAT BUTTON FOR TESTING */}
      <button
        onClick={() => {
          setStim(s => s + 10000000);
          setTotalProd(t => t + 10000000);
        }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-sm shadow-xl border border-red-900 opacity-50 hover:opacity-100 pointer-events-auto"
      >
        ADMIN +10M
      </button>

      {/* ----------------------------------------------------------------------- */}
      {/* 3. FIXED OVERLAYS (Ensures no "compenetrazione" with center content)     */}
      {/* ----------------------------------------------------------------------- */}

      {/* Skywriter Airplanes */}
      {airplanes.map(a => (
        <motion.div key={a}
          initial={{ x: '-100vw' }}
          animate={{ x: '100vw' }}
          transition={{ duration: 15, ease: 'linear' }}
          className="fixed top-[10%] left-0 z-[100] opacity-70 pointer-events-none whitespace-nowrap flex items-center"
        >
          <span className="text-6xl drop-shadow-md">✈️</span>
          <span className="text-2xl ml-4 font-black tracking-widest text-black drop-shadow-lg bg-white/80 px-4 py-1 rounded-full">{skywriterText || 'BUY MORE STIM'}</span>
        </motion.div>
      ))}

      {/* Fitness Instructor Popup */}
      <AnimatePresence>
        {showFitness && fitnessExercise && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[80] bg-white border-2 border-green-500 rounded-2xl p-4 shadow-2xl pointer-events-auto min-w-[240px] text-center"
          >
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">💪 PERSONAL TRAINER</p>
            <p className="text-2xl font-black text-black">{fitnessExercise.name}</p>
            <p className="text-gray-500 text-sm mt-1">{fitnessExercise.reps}</p>
            <button onClick={() => setShowFitness(false)} className="mt-3 text-xs text-gray-400 hover:text-gray-600">Done ✓</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Twitch Chat Overlay (Reaction Streamer) */}
      {hasReactionStreamer && twitchMessages.length > 0 && (
        <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-1 pointer-events-none w-52">
          <div className="bg-[#1a1a2e]/90 rounded-t-lg px-3 py-1 text-purple-400 font-black text-xs tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE CHAT
          </div>
          <div className="bg-[#0f0f1a]/90 rounded-b-lg p-2 flex flex-col gap-1">
            <AnimatePresence>
              {twitchMessages.map(m => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-mono"
                >
                  <span style={{ color: m.color }} className="font-bold">{m.user}: </span>
                  <span className="text-gray-300">{m.msg}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Powerup Flash */}
      <AnimatePresence>
        {powerupFlash && (
          <motion.div
            initial={{ opacity: 0, scale: 1.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] pointer-events-none"
          >
            <div className="bg-yellow-400 text-black font-black text-2xl px-8 py-4 rounded-2xl shadow-2xl shadow-yellow-500/50 border-4 border-yellow-600 tracking-wider text-center">
              {powerupFlash}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tamagotchi Pet */}
      {has('tamagotchi') && (
        <div className="hidden sm:block fixed bottom-4 right-4 z-50 pointer-events-auto w-40 bg-[#f9f0e3] border-4 border-[#8b6914] rounded-3xl p-3 shadow-2xl text-center cursor-pointer select-none"
          onClick={feedTamagotchi}
          title="Clicca per nutrire il tuo pet! (-100 stim)"
        >
          <p className="text-[10px] font-bold text-[#8b6914] uppercase tracking-widest mb-1">🐣 Tamagotchi</p>
          <div className="text-5xl mb-1 transition-all duration-300">
            {tamagotchiAction === 'eating' ? '😋' : tamagotchiHunger > 60 ? '😊' : tamagotchiHunger > 30 ? '😐' : '😢'}
          </div>
          <div className="w-full bg-[#d4a853]/30 rounded-full h-2 mb-1">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${tamagotchiHunger}%`,
                backgroundColor: tamagotchiHunger > 60 ? '#4ade80' : tamagotchiHunger > 30 ? '#facc15' : '#ef4444'
              }}
            />
          </div>
          <p className="text-[9px] text-[#8b6914]">
            {tamagotchiAction === 'eating' ? 'Om nom nom!' : tamagotchiHunger > 60 ? 'Felice!' : tamagotchiHunger > 30 ? 'Ho fame...' : 'AFFAMATO! Cliccami!'}
          </p>
          <p className="text-[8px] text-gray-400 mt-1">Tocca per nutrire</p>
        </div>
      )}

      {/* Hydraulic Press (Top-Right-ish) */}
      {has('hydraulic') && (
        <div
          onClick={handleHydraulicClick}
          className={`hidden lg:flex fixed top-24 right-[340px] flex-col items-center z-40 pointer-events-auto shadow-2xl rounded-xl border-4 border-black bg-black overflow-hidden w-[320px] h-[180px] ${!has('auto_hydraulic') && hydraulicReady && !isPaused ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : 'opacity-80 grayscale-[30%]'}`}
        >
          {/* Loading bar when not ready & manual */}
          {!has('auto_hydraulic') && (!hydraulicReady || hydraulicSquish) && (
            <div className="absolute bottom-0 left-0 h-2 bg-yellow-500 z-50 origin-left"
              style={{ animation: 'hydraulic_cooldown 8s linear forwards' }}
            />
          )}

          <div className="relative w-full h-full flex">
            {/* Reaction Girl (Left Split) */}
            <div className="w-[35%] h-full bg-[#f64d2a] relative z-10 flex flex-col justify-end items-center overflow-hidden">
              <div className="w-[72px] h-[72px] bg-amber-200 rounded-full absolute bottom-6 border-2 border-black flex items-center justify-center -left-6">
                <div className="text-4xl relative top-2 -right-4">😲</div>
              </div>
              <div className="w-28 h-24 bg-black rounded-t-full absolute -bottom-4 -left-6" />
            </div>

            {/* Huge Yellow Arrow pointing right */}
            <div className="absolute left-[20%] top-1/2 -translate-y-[40%] text-yellow-400 text-8xl z-20 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ filter: 'drop-shadow(2px 2px 0px #000)' }}>
              ➔
            </div>

            {/* Press Area (Right Split) */}
            <div className="w-[65%] h-full relative bg-white overflow-hidden flex flex-col items-center">
              <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0wIDIwaDQwdjJWMHoiIGZpbGw9IiNjY2MiLz48cGF0aCBkPSJNMjAgMjBWMGgydjIweiIgZmlsbD0iI2NjYyIvPjwvc3ZnPg==')]" />
              <motion.div
                animate={{ y: hydraulicSquish ? 80 : 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className="w-32 h-10 absolute top-0 z-20 shadow-md border-b-[3px] border-black"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fbbf24 0, #fbbf24 16px, #111827 16px, #111827 32px)' }}
              />
              <div className="absolute bottom-8 w-full flex justify-center z-10">
                <motion.div animate={{ scaleY: hydraulicSquish ? 0.2 : 1, scaleX: hydraulicSquish ? 1.4 : 1, y: hydraulicSquish ? 50 : 0 }} transition={{ duration: 0.5, ease: "easeIn" }} className="flex flex-col items-center origin-bottom">
                  <div className="w-6 h-3 bg-red-600 rounded-t-sm" />
                  <div className="w-8 h-8 bg-black opacity-80 rounded-t-md" />
                  <div className="w-14 h-24 bg-[#111] rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner border border-gray-800">
                    <div className="w-full h-10 bg-[#f40009] absolute flex items-center justify-center">
                      <span className="text-white text-[10px] italic font-serif font-black transform -skew-x-12">Coca-Cola</span>
                    </div>
                    <div className="absolute left-1 top-1 bottom-1 w-[6px] bg-white opacity-20 rounded-full" />
                  </div>
                </motion.div>
              </div>
              <div className="w-full h-8 absolute bottom-0 z-20 shadow-md border-t-[3px] border-black" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fbbf24 0, #fbbf24 16px, #111827 16px, #111827 32px)' }} />
            </div>
          </div>

          <AnimatePresence>
            {hydraulicSquish && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 1, y: -40, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-[40%] text-green-400 font-extrabold text-3xl z-40"
                style={{ WebkitTextStroke: '1px black', textShadow: '0 4px 4px rgba(0,0,0,0.8)' }}
              >
                +1000
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* STONKS PANEL (Top-Right) */}
      {has('stock_market') && (
        <div className="hidden sm:block fixed top-24 right-4 bg-[#0a0a0a] border border-gray-800 p-3 rounded-xl w-72 sm:w-80 max-w-[90vw] shadow-2xl z-40 font-mono text-[10px] text-green-400 pointer-events-auto">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
            <span className="font-bold tracking-widest text-xs">📈 STIM-DAQ TERMINAL</span>
            <span className="text-gray-500">{new Date().toLocaleTimeString()}</span>
          </div>

          <div className="flex flex-col gap-2">
            {stocks.filter(s => has('crypto') || STOCK_TICKERS.some(st => st.id === s.id)).map(s => {
              const prevPrice = s.history[s.history.length - 2] || s.currentPrice;
              const isUp = s.currentPrice >= prevPrice;
              return (
                <div key={s.id} className="flex items-center justify-between hover:bg-white/5 p-1 rounded transition-colors group">
                  <div className="flex items-center gap-2 w-24">
                    <span className="font-bold">{s.id}</span>
                    <span className="text-gray-500 text-[8px]">{s.owned} owned</span>
                  </div>
                  <div className={`flex items-center gap-1 w-16 justify-end ${isUp ? 'text-green-400' : 'text-red-500'}`}>
                    <span>{s.currentPrice.toLocaleString()}</span>
                    {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  </div>
                  <div className="flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleBuyStock(s.id, 1)} disabled={stim < s.currentPrice} className="px-2 py-0.5 bg-green-900/40 text-green-400 border border-green-800 rounded hover:bg-green-800 hover:text-white disabled:opacity-30 transition-colors">BUY</button>
                    <button onClick={() => handleSellStock(s.id, 1)} disabled={s.owned < 1} className="px-2 py-0.5 bg-red-900/40 text-red-400 border border-red-800 rounded hover:bg-red-800 hover:text-white disabled:opacity-30 transition-colors">SELL</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 text-right border-t border-gray-800 pt-2 text-gray-500">
            Available Funds: <span className="text-white">{Math.floor(stim).toLocaleString()} stim</span>
          </div>
        </div>
      )}

      {/* EMAIL TOASTS (Top Center) */}
      {fakeNotifs.length > 0 && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 pointer-events-none">
          <AnimatePresence>
            {fakeNotifs.map(n => (
              <motion.div key={n.id} initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white border shadow-2xl rounded-xl p-3 w-80 pointer-events-auto">
                <div className="flex items-center gap-2 border-b pb-2 mb-2">
                  <span className="text-xl">📧</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-800 truncate">{n.from}</p>
                    <p className="text-[10px] text-gray-500 truncate">{n.subject}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-700 italic">{n.body}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Media Stacks (Fixed corners) */}
      <div className="hidden sm:flex fixed top-20 left-4 flex-col gap-3 z-30 pointer-events-auto">
        {has('podcast') && (
          <div className="w-[280px] h-[157px] shadow-md border border-gray-300 rounded-lg overflow-hidden bg-black flex items-center justify-center relative">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/SUECfaeM0OA?autoplay=1&controls=0&mute=0" title="Podcast" frameBorder="0" allow="autoplay; encrypted-media; picture-in-picture" />
            <div className="absolute inset-0 z-10 hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}
        {has('slime') && (
          <div className="w-[280px] h-[157px] shadow-md border border-gray-300 rounded-lg overflow-hidden bg-black">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/lcPTDc9vHkE?autoplay=1&controls=0&loop=1&playlist=lcPTDc9vHkE" title="Slime ASMR" frameBorder="0" allow="autoplay; encrypted-media" />
          </div>
        )}
        {has('mukbang') && (
          <div className="w-[280px] h-[157px] shadow-md border border-gray-300 rounded-lg overflow-hidden bg-black flex items-center justify-center relative">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/-sjI6xECTYo?autoplay=1&controls=0&mute=0" title="Mukbang" frameBorder="0" allow="autoplay; encrypted-media; picture-in-picture" />
            <div className="absolute inset-0 z-10 hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}
      </div>

      <div className="hidden sm:flex fixed bottom-4 right-4 items-end gap-4 z-30 pointer-events-auto text-black">
        {has('lofi') && (
          <div className="w-[300px] h-[168px] rounded-lg overflow-hidden shadow-md border border-gray-300 bg-black">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&controls=0&playsinline=1" title="Lofi Girl" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        )}
        {hasSubway && (
          <div className="w-[150px] h-[300px] rounded-lg overflow-hidden shadow-md border border-gray-300 bg-black">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/zZ7AimPACzc?autoplay=1&controls=0&loop=1&playlist=zZ7AimPACzc&playsinline=1" title="Subway Surfers Gameplay" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
          </div>
        )}
      </div>

      {/* Achievements Panel */}
      {hasAchieve && (
        <div className="fixed bottom-4 left-4 bg-white border border-gray-200 p-4 rounded-xl w-64 max-h-[30vh] overflow-y-auto hidden md:block z-50 shadow-xl">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-2 sticky top-0 bg-white/90 backdrop-blur-sm py-1 z-10">🏆 Achievements ({achievements.length}/{ACHIEVEMENTS_DEF.length})</p>
          <div className="flex flex-col gap-3 mt-2">
            {ACHIEVEMENTS_DEF.map(a => {
              const unlocked = achievements.includes(a.id);
              return (
                <div key={a.id} className={`flex items-start gap-2 py-1 transition-colors ${unlocked ? 'text-yellow-600' : 'text-gray-400'}`}>
                  <span className="text-lg">{unlocked ? '✅' : '🔒'}</span>
                  <div className="flex-1">
                    <span className={`font-bold block text-sm ${unlocked ? 'opacity-100' : 'opacity-60'}`}>{a.name}</span>
                    <span className={`text-xs block mt-0.5 leading-tight ${unlocked ? 'text-gray-600' : 'text-gray-400 opacity-50'}`}>{a.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------------- */}
      {/* 4. MAIN CENTER CONTENT                                                   */}
      {/* ----------------------------------------------------------------------- */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 mt-[-10vh] pointer-events-auto">


        {/* The Button */}
        <div className="relative z-20 flex items-center justify-center">
          <motion.button
            onClick={handleClick}
            animate={{ y: [0, -3, 0], rotate: has('pinwheel') ? [0, 360] : 0 }}
            transition={{
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              rotate: has('pinwheel') ? { repeat: Infinity, duration: 4, ease: "linear" } : {}
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-white border text-black rounded-lg px-6 py-2 text-xl hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-sm cursor-pointer font-sans relative ${equipedCosmetic === 'neon_glow' ? 'shadow-[0_0_20px_rgba(168,85,247,0.8)] border-purple-500' : ''}`}
            style={{ borderColor: equipedCosmetic === 'neon_glow' ? '#a855f7' : '#ccc', transformOrigin: 'center center' }}
          >
            {has('btn_upgrade') ? 'CLICCA QUI!' : 'Clicca qui'}
            {equipedCosmetic === 'fedora' && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl pointer-events-none drop-shadow-md">🎩</span>}
            {equipedCosmetic === 'sunglasses' && <span className="absolute top-1 left-1/2 -translate-x-1/2 text-xl pointer-events-none drop-shadow-md z-10 z-[100]">😎</span>}
            {equipedCosmetic === 'crown' && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl pointer-events-none drop-shadow-md z-[100] rotate-12">👑</span>}
          </motion.button>
        </div>

        {/* Score & Levels */}
        <div className="text-center z-20 flex flex-col items-center">
          <p className="text-xl font-bold text-black">
            {Math.floor(stim).toLocaleString('it-IT')} stimolazione
          </p>
          {hasSpsCounter && (
            <p className="text-gray-500 text-sm mt-1">
              {sps.toFixed(1)} SPS
            </p>
          )}

          {/* Level Bar */}
          {has('levels') && (
            <div className="mt-4 w-64 bg-gray-200 rounded-full h-4 relative border border-gray-300 shadow-inner overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300 relative"
                style={{ width: `${Math.min(100, ((totalProd - (Math.pow(level - 1, 2) * 500)) / ((Math.pow(level, 2) * 500) - (Math.pow(level - 1, 2) * 500))) * 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)', backgroundSize: '1rem 1rem' }} />
              </div>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-800 drop-shadow-sm">Livello {level}</span>
            </div>
          )}

          {/* Passive Badges (Meditation, Fitness, etc) */}
          <div className="flex gap-2 mt-4 text-2xl drop-shadow-sm h-[32px]">
            {has('meditation') && <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>🧘</motion.span>}
            {has('fitness') && <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>💪</motion.span>}
            {has('tamagotchi') && <motion.span animate={{ rotate: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 2 }}>🐣</motion.span>}
          </div>
        </div>

        {/* Upgrades Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 z-20 max-w-2xl px-4">
          {visibleUpgrades.map(u => {
            let actualCost = u.cost;
            if (u.id === 'dvd') actualCost = dvdCost(dvdCount);
            const canAfford = stim >= actualCost;

            return (
              <div key={u.id + upgradeCount} className="relative group cursor-pointer" onClick={() => buyUpgrade(u)}>
                <button
                  disabled={!canAfford}
                  className={`w-[4.5rem] h-[4.5rem] flex items-center justify-center text-4xl transition-all bg-white border rounded-2xl ${canAfford
                    ? 'border-gray-300 hover:border-black active:scale-95 text-black'
                    : 'border-gray-200 opacity-30 cursor-not-allowed grayscale'
                    }`}
                  style={{ boxShadow: canAfford ? '0 2px 5px rgba(0,0,0,0.05)' : 'none' }}
                >
                  {u.emoji}
                </button>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-white border border-gray-200 shadow-xl rounded-lg p-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-center">
                  <p className="font-bold text-black text-sm">{u.name}</p>
                  <p className="text-gray-500 text-xs mt-1 mb-2">{u.desc}</p>
                  <p className="font-bold text-black text-sm bg-gray-100 rounded inline-block px-2 py-1">{actualCost.toLocaleString()} stim</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Item Shop (Cosmetics) */}
        {has('item_shop') && (
          <div className="mt-8 bg-white/90 backdrop-blur-md border border-gray-300 rounded-2xl p-4 shadow-xl max-w-2xl w-full text-black">
            <h3 className="font-bold text-lg mb-4 text-center border-b pb-2">🛍️ Negozio Cosmetici</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {COSMETICS.map(c => {
                const isOwned = boughtCosmetics.includes(c.id);
                const canAfford = stim >= c.cost && !isOwned;
                const isEquiped = equipedCosmetic === c.id;
                return (
                  <div key={c.id} className="relative group">
                    <button
                      onClick={() => {
                        if (!isOwned && stim >= c.cost) {
                          setStim(s => s - c.cost);
                          setBoughtCosmetics(prev => [...prev, c.id]);
                          setEquipedCosmetic(c.id);
                        } else if (isOwned) {
                          setEquipedCosmetic(isEquiped ? null : c.id);
                        }
                      }}
                      disabled={!canAfford && !isOwned}
                      className={`w-14 h-14 flex items-center justify-center rounded-lg border-2 transition-all text-2xl relative
                         ${isOwned
                          ? (isEquiped ? 'border-green-500 bg-green-100 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'border-gray-400 bg-gray-50 hover:bg-gray-200 cursor-pointer')
                          : (canAfford ? 'border-gray-300 bg-white hover:border-black cursor-pointer' : 'border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed')}
                       `}
                    >
                      {c.emoji}
                      {isEquiped && <span className="absolute -top-2 -right-2 text-xs bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">✓</span>}
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 bg-gray-900 text-white shadow-xl rounded p-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-center text-xs">
                      <p className="font-bold mb-1 text-sm">{c.name}</p>
                      <p className="text-gray-300 mb-2 italic text-[10px]">{c.desc}</p>
                      {isOwned
                        ? <span className="text-green-400 font-bold bg-gray-800 px-2 py-1 rounded">{isEquiped ? 'RIMUOVI' : 'INDOSSA'}</span>
                        : <span className="font-mono bg-gray-800 px-2 py-1 rounded">{c.cost} stim</span>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>


      {/* Loot Box Overlay */}
      <AnimatePresence>
        {lootBox && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={openLootBox}
            className="absolute z-40 cursor-pointer hover:scale-110 active:scale-95 transition-transform pointer-events-auto"
            style={{ left: `${lootBox.x}%`, top: `${lootBox.y}%` }}
          >
            <div className="text-5xl drop-shadow-[0_0_15px_rgba(234,179,8,1)] animate-bounce">
              🎁
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Duolingo Question Modal */}
      <AnimatePresence>
        {duoQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="bg-white text-slate-900 p-8 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden border-b-8 border-slate-200">
              <div className="absolute -top-10 -right-10 text-9xl opacity-10">🦉</div>
              <h3 className="text-2xl font-black text-green-500 mb-6 flex items-center gap-3">
                <span className="text-4xl text-green-500">🦉</span> È ora di una lezioncina!
              </h3>
              <p className="text-lg font-bold text-slate-700 mb-6">Traducilo: <span className="text-slate-900 block mt-2 text-2xl">{duoQuestion.q}</span></p>
              <div className="flex flex-col gap-3">
                {duoQuestion.opts && duoQuestion.opts.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (i === duoQuestion.correct) {
                        setDuoQuestion(null);
                      } else {
                        alert("Sbagliato! Il gufo è deluso. (Riprova)");
                      }
                    }}
                    className="py-4 px-6 text-left rounded-2xl border-2 border-slate-200 font-bold text-slate-700 hover:border-green-400 hover:bg-green-50 active:translate-y-1 transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement TOAST popup */}
      <AnimatePresence>
        {achieveToast && hasAchieve && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 right-1/2 translate-x-1/2 z-50 bg-white border border-gray-200 text-black rounded-lg px-4 py-2 shadow-xl flex items-center gap-3"
          >
            <span className="text-3xl">🏆</span>
            <div>
              <p className="font-bold text-xs uppercase tracking-widest text-gray-500">Achievement Sbloccato!</p>
              <p className="font-bold text-sm">{achieveToast.name}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
