// ── Stimulation Clicker Data — faithful to neal.fun wiki ──

export const NEWS_ITEMS = [
  '📰 BREAKING: si è scoperta una cosa incredibile in laboratorio 🔬',
  '🏎️ F1 Monaco: Stroll pole position con 0.003s di vantaggio',
  '🌍 Scienziati confermano: la Terra è ancora rotonda (per ora)',
  '💊 Studio Harvard: scrollare TikTok brucia 0.3 calorie l\'ora',
  '🐧 Pinguino avvistato a Torino, situazione monitorata',
  '📱 Apple annuncia iPhone 20: ora anche il back è touchscreen',
  '🧬 UniTo: scoperta cura per l\'ansia da esami (è la laurea), la rinuncia è gratuita',
  '🎬 Netflix aggiunge 500 nuove serie che non guarderai mai',
  '☕ Caffè italiano dichiarato patrimonio UNESCO dell\'umanità',
  '🌙 Luna in vendita su Amazon Prime: spedizione gratuita',
  '🦷 Dentista conferma: il filo interdentale serve davvero',
  '🍕 Napoli batte record: fregati 67 orologi in centro',
];

export const FAKE_NOTIFS = [
  { icon: '📱', text: 'Tua mamma ti ha taggata in una foto' },
  { icon: '❤️', text: '1,847 persone hanno messo like al tuo post' },
  { icon: '🏎️', text: 'LIVE: Qualifiche F1 Monaco — STR in POLE' },
  { icon: '🎶', text: 'Spotify: "your top song of the year is playing"' },
  { icon: '🔔', text: '47 nuovi messaggi non letti su WhatsApp' },
  { icon: '🧬', text: 'UniTo: Risultato esame disponibile!' },
  { icon: '🍕', text: 'Il tuo ordine Deliveroo è in arrivo — 3 min' },
  { icon: '👾', text: 'Il tuo streak Duolingo è in pericolo!' },
  { icon: '🎬', text: 'Netflix: hai 3 nuovi episodi da vedere' },
  { icon: '💌', text: 'Nuovo match su Tinder 👀' },
  { icon: '⚡', text: 'Amazon Lightning Deal termina tra 00:03!' },
  { icon: '🤯', text: 'BREAKING: è successa una cosa incredibile' },
];

export const DUOLINGO_QUESTIONS = [
  { q: 'Come si dice "gatto" in inglese?', opts: ['Dog', 'Cat', 'Bird', 'Fish'], correct: 1 },
  { q: 'Traduci: "I am happy"', opts: ['Sono stanco', 'Sono felice', 'Sono triste', 'Sono arrabbiato'], correct: 1 },
  { q: 'Come si dice "acqua" in francese?', opts: ['Eau', 'Feu', 'Air', 'Terre'], correct: 0 },
  { q: '"Danke" in che lingua è?', opts: ['Francese', 'Spagnolo', 'Tedesco', 'Portoghese'], correct: 2 },
  { q: 'Traduci: "Buenos días"', opts: ['Buona notte', 'Buongiorno', 'Buona sera', 'Arrivederci'], correct: 1 },
  { q: 'Come si dice "libro" in giapponese?', opts: ['本 (hon)', '車 (kuruma)', '犬 (inu)', '花 (hana)'], correct: 0 },
  { q: '"Merci" significa...', opts: ['Scusa', 'Per favore', 'Grazie', 'Prego'], correct: 2 },
  { q: 'Traduci: "Ich liebe dich"', opts: ['Ti odio', 'Buongiorno', 'Come stai?', 'Ti amo'], correct: 3 },
  { q: '"Hola" in che lingua è?', opts: ['Italiano', 'Spagnolo', 'Francese', 'Tedesco'], correct: 1 },
  { q: 'Come si dice "amico" in inglese?', opts: ['Enemy', 'Stranger', 'Friend', 'Brother'], correct: 2 },
];

export const EMAILS = [
  { from: '👵 Nonna Maria', subject: 'Auguri tesoro mio!!', body: 'Ciao amore della nonna, ti ho mandato 50€ sul conto. Comprami il pane quando passi. Baci nonna.', reply: 'Grazie nonna! ❤️ Ti voglio bene!' },
  { from: '🏎️ Scuderia Ferrari', subject: 'Hai vinto un giro in pista!', body: 'Congratulazioni! Sei stata selezionata per un giro a Maranello. Porta il casco.', reply: 'ARRIVO SUBITO 🏎️🔥' },
  { from: '🎓 Segreteria UniTo', subject: 'Aggiornamento carriera', body: 'Le comunichiamo che il suo libretto è stato aggiornato. Distinti saluti.', reply: 'Ricevuto, grazie.' },
  { from: '📦 Amazon', subject: 'Il tuo ordine è in arrivo!', body: 'Il tuo pacco sarà consegnato oggi tra le 14:00 e le 18:00.', reply: 'Perfetto, sarò a casa!' },
  { from: '🐱 Gattino Virtuale', subject: 'Miao miao miao', body: 'Il tuo gatto virtuale ha fame. Per favore nutrilo.', reply: '*dà croccantini* 🐟' },
];

export const COSMETICS = [
  { id: 'fedora', name: 'Fedora', cost: 500, emoji: '🎩', desc: 'M\'lady *si tocca la fedora*' },
  { id: 'sunglasses', name: 'Occhiali da Sole', cost: 750, emoji: '😎', desc: 'Fattene una ragione.' },
  { id: 'crown', name: 'Corona d\'Oro', cost: 2000, emoji: '👑', desc: 'Per la regina.' },
  { id: 'rainbow_trail', name: 'Scia Arcobaleno', cost: 3000, emoji: '🌈', desc: 'Scia arcobaleno al cursore.' },
  { id: 'slinky', name: 'Scia Molla', cost: 1500, emoji: '🪀', desc: 'Molla che segue il cursore.' },
  { id: 'cursor_fire', name: 'Cursore Fuoco', cost: 2500, emoji: '🔥', desc: 'Cursore infuocato!' },
  { id: 'cursor_star', name: 'Cursore Stella', cost: 1000, emoji: '⭐', desc: 'Cursore stellato.' },
  { id: 'neon_glow', name: 'Neon Glow', cost: 5000, emoji: '💜', desc: 'Tutto brilla di neon.' },
];

export const STOCK_TICKERS = [
  { id: 'STIM', name: 'StimCorp', basePrice: 100 },
  { id: 'DVD', name: 'DVD Inc.', basePrice: 50 },
  { id: 'LOFI', name: 'Lofi Co.', basePrice: 75 },
  { id: 'RAIN', name: 'RainTech', basePrice: 30 },
];

export const CRYPTO_TICKERS = [
  { id: 'BTC', name: 'Bitcoin', basePrice: 500 },
];

// DVD cost = round(3 * 1.5^n) where n = number already bought
export function dvdCost(owned) {
  return Math.round(3 * Math.pow(1.5, owned));
}

// Hydraulic speed cost escalation
export function hydraulicSpeedCost(timesBought) {
  return Math.round(500 * Math.pow(1.8, timesBought));
}

export const ALL_UPGRADES = [
  { id: 'dvd', name: 'DVD Rimbalzante', cost: 3, desc: 'Logo DVD che rimbalza!', spc: 0, sps: 0, emoji: '📀', unlockAt: 2, multi: true, spb: 1 },
  { id: 'tab_title', name: 'Titolo Tab', cost: 5, desc: 'Ottimo per la SEO', spc: 0, sps: 0, emoji: '🏷️', unlockAt: 2 },
  { id: 'amount_anim', name: 'Animazione Quantità', cost: 10, desc: 'Animazione sui click!', spc: 1, sps: 0, emoji: '✨', unlockAt: 2 },
  { id: 'sps_counter', name: 'Contatore SPS', cost: 25, desc: 'Vedi la tua stimolazione al secondo', spc: 0, sps: 0, emoji: '📊', unlockAt: 5 },
  { id: 'btn_upgrade', name: 'Upgrade Bottone', cost: 50, desc: 'Bottone più grande, rotondo e sonoro!', spc: 1, sps: 0, emoji: '🔵', unlockAt: 5 },
  { id: 'dvd_sound', name: 'Suono Rimbalzo DVD', cost: 75, desc: 'I DVD fanno rumore!', spc: 0, sps: 0, emoji: '🔊', unlockAt: 5, needs: 'dvd', spb: 5 },
  { id: 'subway', name: 'Subway Surfers', cost: 100, desc: 'Subway Surfers in basso a destra!', spc: 0, sps: 3, emoji: '🛹', unlockAt: 10 },
  { id: 'news', name: 'Ultime Notizie', cost: 100, desc: 'Rimani aggiornato sulle ultime news.', spc: 0, sps: 4, emoji: '📺', unlockAt: 10 },
  { id: 'critical', name: 'Colpi Critici', cost: 200, desc: '5% chance di colpo critico!', spc: 0, sps: 0, emoji: '💥', unlockAt: 25, needs: 'amount_anim' },
  { id: 'lofi', name: 'Lofi Beats', cost: 250, desc: 'Musica per studiare e rilassarsi.', spc: 0, sps: 10, emoji: '🎵', unlockAt: 25 },
  { id: 'rain', name: 'Suoni Pioggia', cost: 300, desc: 'Suoni della pioggia rilassanti.', spc: 0, sps: 15, emoji: '🌧️', unlockAt: 50 },
  { id: 'pinwheel', name: 'Girandola', cost: 700, desc: 'Girandola sul bottone!', spc: 0, sps: 20, emoji: '🌀', unlockAt: 50 },
  { id: 'hydraulic', name: 'Pressa Idraulica', cost: 1000, desc: 'Schiaccia le cose lentamente.', spc: 0, sps: 0, emoji: '🔩', unlockAt: 100 },
  { id: 'achieve', name: 'Achievement', cost: 1500, desc: 'Festeggia i tuoi traguardi.', spc: 0, sps: 0, emoji: '🏆', unlockAt: 100 },
  { id: 'thunder', name: 'Tuoni', cost: 2000, desc: 'Aggiungi tuoni ambientali.', spc: 0, sps: 8, emoji: '⛈️', unlockAt: 200, needs: 'rain' },
  { id: 'popcorn', name: 'Animazione Popcorn', cost: 3500, desc: 'Effetto popcorn sui click!', spc: 8, sps: 0, emoji: '🍿', unlockAt: 300, needs: 'amount_anim' },
  { id: 'slime', name: 'ASMR Slime', cost: 4000, desc: 'Guarda video ASMR di slime.', spc: 0, sps: 35, emoji: '🪷', unlockAt: 500 },
  { id: 'technicolor', name: 'Technicolor', cost: 5000, desc: 'Cambia colore al rimbalzo.', spc: 0, sps: 0, emoji: '🎨', unlockAt: 500, needs: 'dvd', spb: 10 },
  { id: 'mukbang', name: 'Mukbang', cost: 6000, desc: 'Guarda uno che mangia.', spc: 0, sps: 60, emoji: '🍜', unlockAt: 700 },
  { id: 'screen_time', name: 'Tempo Schermo', cost: 7500, desc: 'Gestisci le tue abitudini digitali.', spc: 0, sps: 0, emoji: '📱', unlockAt: 700 },
  { id: 'levels', name: 'Livelli', cost: 8000, desc: 'Guadagna esperienza e sali di livello.', spc: 0, sps: 0, emoji: '📈', unlockAt: 800 },
  { id: 'podcast', name: 'Podcast True Crime', cost: 10000, desc: 'Ascolta un omicidio.', spc: 0, sps: 100, emoji: '🎤', unlockAt: 1000 },
  { id: 'auto_hydraulic', name: 'Idraulica Automatica', cost: 15000, desc: 'La pressa gira in automatico.', spc: 0, sps: 0, emoji: '⚙️', unlockAt: 2000, needs: 'hydraulic' },
  { id: 'corner_hits', name: 'Angoli DVD', cost: 15000, desc: 'Gli angoli DVD danno 10x stimolazione.', spc: 0, sps: 0, emoji: '📐', unlockAt: 2000, needs: 'dvd' },
  { id: 'ui_upgrade', name: 'Upgrade UI', cost: 15000, desc: 'Colori brillanti. Più gradienti.', spc: 0, sps: 0, emoji: '🎆', unlockAt: 2000 },
  { id: 'item_shop', name: 'Negozio Oggetti', cost: 17500, desc: 'Compra oggetti cosmetici.', spc: 0, sps: 0, emoji: '🛍️', unlockAt: 3000 },
  { id: 'loot_boxes', name: 'Loot Box', cost: 20000, desc: 'Sorprese meccaniche.', spc: 0, sps: 0, emoji: '📦', unlockAt: 5000 },
  { id: 'btn_upgrade2', name: 'Upgrade Bottone II', cost: 25000, desc: 'Ogni click vale l\'1% del tuo SPS.', spc: 0, sps: 0, emoji: '🔷', unlockAt: 5000, needs: 'btn_upgrade' },
  { id: 'stock_market', name: 'Borsa Valori', cost: 25000, desc: 'Investi nel tuo futuro.', spc: 0, sps: 0, emoji: '📊', unlockAt: 5000 },
  { id: 'duolingo', name: 'Duolingo', cost: 25000, desc: 'Impara una nuova lingua, altrimenti...', spc: 0, sps: 0, emoji: '🦉', unlockAt: 5000 },
  { id: 'meditation', name: 'Meditazione', cost: 35000, desc: 'Rilassa la mente.', spc: 0, sps: 120, emoji: '🧘', unlockAt: 8000 },
  { id: 'email', name: 'Email', cost: 60000, desc: 'Prenditi una pausa e controlla la posta.', spc: 0, sps: 0, emoji: '📧', unlockAt: 15000 },
  { id: 'fitness', name: 'Personal Trainer', cost: 75000, desc: 'Mantieniti in forma davanti allo schermo.', spc: 0, sps: 100, emoji: '💪', unlockAt: 20000 },
  { id: 'crypto', name: 'Criptovalute', cost: 125000, desc: 'Aggiungi crypto al tuo portafoglio.', spc: 0, sps: 0, emoji: '₿', unlockAt: 40000, needs: 'stock_market' },
  { id: 'skywriter', name: 'Aereo Pubblicitario', cost: 180000, desc: 'Aggiungi banner pubblicitari.', spc: 0, sps: 700, emoji: '✈️', unlockAt: 60000 },
  { id: 'reaction_streamer', name: 'Streamer Reazioni', cost: 200000, desc: 'Una chat Twitch live guarda i tuoi click.', spc: 0, sps: 500, emoji: '📺', unlockAt: 80000 },
  { id: 'powerups', name: 'Potenziamenti', cost: 250000, desc: 'Potenziamenti casuali boostano la stim!', spc: 0, sps: 0, emoji: '⚡', unlockAt: 100000 },
  { id: 'tamagotchi', name: 'Tamagotchi', cost: 300000, desc: 'Adotta un animale virtuale.', spc: 0, sps: 0, emoji: '🐣', unlockAt: 100000 },
  { id: 'ocean', name: 'Vai all\'Oceano', cost: 2000000, desc: 'Ultimo Upgrade...', spc: 0, sps: 0, emoji: '🌊', unlockAt: 500000 }
];


export const ACHIEVEMENTS_DEF = [
  { id: 'first_click', name: 'Primo Click!', desc: 'Hai iniziato.', check: s => s.totalClicks >= 1 },
  { id: 'click_100', name: 'Cento Click', desc: '100 click sul bottone.', check: s => s.totalClicks >= 100 },
  { id: 'click_500', name: 'Cinquecento Click', desc: '500 click sul bottone.', check: s => s.totalClicks >= 500 },
  { id: 'click_1000', name: 'Mille Click', desc: '1.000 click sul bottone.', check: s => s.totalClicks >= 1000 },
  { id: 'stim_100k', name: 'Procrastinatore', desc: '100.000 stimolazione totale.', check: s => s.totalProduced >= 100000 },
  { id: 'stim_1m', name: 'iPad Kid', desc: '1.000.000 stimolazione.', check: s => s.totalProduced >= 1000000 },
  { id: 'dvd_5', name: 'Collezionista Dischi', desc: 'Compra 5 DVD rimbalzanti.', check: s => s.dvdCount >= 5 },
  { id: 'upgrade_15', name: 'Upgrader', desc: 'Acquista 15 upgrade.', check: s => s.upgradeCount >= 15 },
  { id: 'achieve_15', name: 'Cacciatore', desc: 'Sblocca 15 achievement.', check: s => s.achievementCount >= 15 },
  { id: 'achieve_unlock', name: 'Achievement Sbloccato', desc: 'Sblocca gli achievement.', check: s => s.boughtIds.includes('achieve') },
  { id: 'night_owl', name: 'Gufo Notturno', desc: 'Gioca di notte (19:00-6:30).', check: s => { const h = new Date().getHours(); return h >= 19 || h < 7; } },
  { id: 'screen_time_u', name: 'Abitudini Sane', desc: 'Sblocca il tempo schermo.', check: s => s.boughtIds.includes('screen_time') },
  { id: 'commuter', name: 'Pendolare', desc: '10 min di Subway Surfers.', check: s => s.subwayMinutes >= 10 },
  { id: 'level_10', name: 'Livello Su', desc: 'Raggiungi livello 10.', check: s => s.level >= 10 },
  { id: 'level_25', name: 'Livellatore', desc: 'Raggiungi livello 25.', check: s => s.level >= 25 },
  { id: 'level_50', name: 'Al Massimo', desc: 'Raggiungi livello 50.', check: s => s.level >= 50 },
  { id: 'loot_1', name: 'Trovatore Loot', desc: 'Apri una loot box.', check: s => s.lootOpened >= 1 },
  { id: 'loot_25', name: 'Accumulatore Loot', desc: 'Apri 25 loot box.', check: s => s.lootOpened >= 25 },
  { id: 'tube_rider', name: 'Surfista Metropolitano', desc: 'Subway Surfers a schermo intero.', check: s => s.boughtIds.includes('subway_fs') },
  { id: 'corner_100', name: 'Cacciatore di Angoli', desc: '100 angoli DVD colpiti.', check: s => s.cornerHits >= 100 },
  { id: 'day_trader', name: 'Day Trader', desc: 'Vendi un\'azione in profitto.', check: s => s.stockProfit > 0 },
  { id: 'gambler', name: 'Giocatore', desc: 'Vendi un\'azione in perdita.', check: s => s.stockLoss > 0 },
  { id: 'roaring_kitty', name: 'Roaring Kitty', desc: '100K stim dalle azioni.', check: s => s.totalStockGain >= 100000 },
  { id: 'hoot_hoot', name: 'Hoot Hoot', desc: 'Compra Duolingo.', check: s => s.boughtIds.includes('duolingo') },
  { id: 'owl_scholar', name: 'Studioso del Gufo', desc: '10 risposte Duolingo corrette.', check: s => s.duoCorrect >= 10 },
  { id: 'shopaholic', name: 'Shopping Compulsivo', desc: 'Compra tutti i cosmetici.', check: s => s.cosmeticsBought >= 8 },
  { id: 'casual_shopper', name: 'Shopper Casual', desc: 'Compra un cosmetico.', check: s => s.cosmeticsBought >= 1 },
  { id: 'cursor_coll', name: 'Collezionista Cursori', desc: 'Compra un cursore.', check: s => s.boughtCosmetics?.some(c => c.startsWith('cursor_')) },
  { id: 'grandchild', name: 'Nipote Affettuoso', desc: 'Rispondi alla nonna.', check: s => s.emailsReplied >= 1 },
  { id: 'wormhole', name: 'Visione Tunnel', desc: 'Sblocca il wormhole.', check: s => s.boughtIds.includes('subway_wormhole') },
  { id: 'decked_out', name: 'Completato', desc: 'Compra tutti gli upgrade.', check: s => s.upgradeCount >= 40 },
  { id: 'fedora', name: 'M\'Lady', desc: 'Tocca la fedora.', check: s => s.boughtCosmetics?.includes('fedora') },
  { id: 'completionist', name: 'Completionista', desc: 'Tutti gli achievement.', check: s => s.achievementCount >= 34 },
];

export const TWITCH_MESSAGES = [
  { user: 'xXSniperXx', msg: 'LUL', color: '#ff4444' },
  { user: 'lofi_girl_42', msg: 'vibes 🎵', color: '#44aaff' },
  { user: 'dvd_enjoyer', msg: 'CORNER HIT PogChamp', color: '#aa44ff' },
  { user: 'stimulation_fan', msg: 'CLICK HARDER', color: '#44ff44' },
  { user: 'chat_bot_9000', msg: 'Kappa Kappa Kappa', color: '#ffaa44' },
  { user: 'nonna_maria', msg: 'come funziona questo?', color: '#ff88cc' },
  { user: 'f1_fan_2026', msg: 'SUPER MAX MAX MAX', color: '#ff0000' },
  { user: 'brain_rot_ceo', msg: 'questo gioco è arte', color: '#00ffaa' },
  { user: 'pizza_lover_IT', msg: '🍕🍕🍕🍕', color: '#ffcc00' },
  { user: 'mod_hammer', msg: '!timeout dvd_enjoyer', color: '#00ff00' },
  { user: 'sub_alert', msg: '🎉 Nuovo sub!!!', color: '#ff00ff' },
  { user: 'lurker_supreme', msg: '...', color: '#888888' },
  { user: 'duolingo_owl', msg: 'HAI SBAGLIATO 🦉', color: '#58cc02' },
  { user: 'eliot_alderson', msg: 'Hello, Friend.', color: '#00aaff' },
];

export const SKYWRITER_ADS = [
  '🏆 You are the 1 millionth visitor! 🏆',
  '🔒 NordVPN — Sicurezza Online al 70% OFF',
  '🦭 Cubby Seal Pillow — Il cuscino più morbido!',
  '🧬 Iscriviti a Molecular Biotech — UniTo',
  '🏎️ Ferrari F1 — Passione Rossa',
];

export const FITNESS_EXERCISES = [
  { name: '💪 Push-ups', reps: '10 ripetizioni' },
  { name: '🦵 Squats', reps: '15 ripetizioni' },
  { name: '🧘 Plank', reps: '30 secondi' },
  { name: '🏃 Jumping Jacks', reps: '20 ripetizioni' },
  { name: '🙆 Stretching', reps: '10 secondi per lato' },
];
