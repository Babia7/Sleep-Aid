import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Moon, Sunrise, Coffee, Brain, Sun, Sunset, Clock, Eye, Smartphone } from 'lucide-react';
import { SleepStat } from '../types';
import { motion } from 'framer-motion';

const mockData: SleepStat[] = [
  { day: 'Mon', hours: 6.5, quality: 6 },
  { day: 'Tue', hours: 7.2, quality: 8 },
  { day: 'Wed', hours: 5.8, quality: 5 },
  { day: 'Thu', hours: 7.5, quality: 9 },
  { day: 'Fri', hours: 8.0, quality: 9 },
  { day: 'Sat', hours: 9.0, quality: 10 },
  { day: 'Sun', hours: 7.0, quality: 8 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

const Dashboard: React.FC = () => {
  // Simple calculation for "Process S" (Sleep Pressure) simulation
  const hoursAwake = 14; 
  const sleepPressure = Math.min((hoursAwake / 16) * 100, 100);

  return (
    <motion.div 
      className="space-y-6 pb-24 text-stone-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header variants={itemVariants} className="flex justify-between items-center mb-6 pt-4">
        <div>
          <h1 className="text-3xl font-serif font-medium text-stone-100">Rest Well</h1>
          <p className="text-stone-500 text-sm mt-1">Two-Process Sleep Model: Active</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-orange-900/20 border border-orange-900/50 flex items-center justify-center shadow-[0_0_15px_rgba(234,88,12,0.1)]">
          <Moon size={20} className="text-orange-400" />
        </div>
      </motion.header>

      {/* PROCESS S: Sleep Drive */}
      <motion.section variants={itemVariants} className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
        <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-medium text-stone-200 flex items-center gap-2">
                <Coffee className="text-stone-400" size={18} />
                Process S: Sleep Drive
            </h2>
            <span className="text-xs text-orange-400 font-mono">{Math.round(sleepPressure)}% ADENOSINE</span>
        </div>
        <div className="w-full bg-stone-800 rounded-full h-4 overflow-hidden relative">
             <motion.div 
                className="bg-gradient-to-r from-stone-600 via-orange-900 to-orange-600 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${sleepPressure}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
             ></motion.div>
        </div>
        <p className="text-xs text-stone-500 mt-3 leading-relaxed">
            Adenosine pressure is high. This is the chemical urge to sleep that builds up for every minute you are awake.
        </p>
      </motion.section>

      {/* PROCESS C: Circadian Rhythm */}
      <motion.section variants={itemVariants} className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl relative overflow-hidden group">
        <div className="absolute -right-12 -top-12 text-stone-800/20 group-hover:text-stone-800/40 transition-colors">
            <Sun size={140} />
        </div>
        
        <div className="flex justify-between items-end mb-6 relative z-10">
            <h2 className="text-lg font-medium text-stone-200 flex items-center gap-2">
                <Clock className="text-yellow-600" size={18} />
                Process C: Circadian Rhythm
            </h2>
        </div>

        {/* Visual Timeline */}
        <div className="relative mb-8 pt-4 pb-2">
            {/* Base Line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-stone-800 via-yellow-900/50 to-stone-800 absolute top-1/2 -translate-y-1/2"></div>
            
            <div className="flex justify-between relative text-[10px] text-stone-500 font-medium uppercase tracking-wider">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-stone-700"></div>
                    <span>Wake</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-600/50 shadow-[0_0_10px_rgba(202,138,4,0.3)]"></div>
                    <span>Noon</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                     <div className="relative">
                        <motion.div 
                          className="w-4 h-4 rounded-full bg-orange-500 border-2 border-stone-900 z-10 relative"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                        ></motion.div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-500/20 text-orange-200 text-[9px] py-0.5 px-2 rounded-full whitespace-nowrap border border-orange-500/30">
                            YOU ARE HERE
                        </div>
                     </div>
                    <span className="text-orange-300">Sunset</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-stone-700"></div>
                    <span>Sleep</span>
                </div>
            </div>
        </div>

        {/* Light Protocols */}
        <div className="space-y-4 relative z-10">
            <div className="flex gap-4 items-start p-3 rounded-xl bg-stone-950/30 border border-stone-800/50">
                 <div className="mt-1 bg-yellow-900/20 p-1.5 rounded-lg">
                    <Sunrise size={18} className="text-yellow-500" />
                 </div>
                 <div>
                    <h4 className="text-sm font-medium text-stone-200">Morning Anchor</h4>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        <span className="text-stone-300 font-medium">Why:</span> Viewing 100k lux (sunlight) within 60 mins of waking triggers a cortisol pulse. This starts a timer that releases melatonin ~16 hours later.
                    </p>
                 </div>
            </div>

            <div className="flex gap-4 items-start p-3 rounded-xl bg-stone-950/30 border border-stone-800/50">
                 <div className="mt-1 bg-orange-900/20 p-1.5 rounded-lg">
                    <Sunset size={18} className="text-orange-500" />
                 </div>
                 <div>
                    <h4 className="text-sm font-medium text-stone-200">Evening Protection</h4>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                         <span className="text-stone-300 font-medium">Why:</span> Viewing low-angle sun (sunset) lowers the sensitivity of your retinal ganglion cells, making late-night artificial light less damaging to your sleep.
                    </p>
                 </div>
            </div>
            
             <div className="flex gap-4 items-start p-3 rounded-xl bg-orange-900/10 border border-orange-900/30">
                 <div className="mt-1 bg-stone-800 p-1.5 rounded-lg">
                    <Eye size={18} className="text-orange-200" />
                 </div>
                 <div>
                    <h4 className="text-sm font-medium text-orange-200">Current Phase: Biological Darkness</h4>
                    <p className="text-xs text-orange-200/70 mt-1 leading-relaxed">
                        Your Suprachiasmatic Nucleus is now highly sensitive.
                        <br/>
                        <span className="block mt-1">• Keep lights below eye level.</span>
                        <span className="block">• Use red/amber hues (low Kelvin).</span>
                        <span className="block">• Avoid screens if possible.</span>
                    </p>
                 </div>
            </div>
        </div>
      </motion.section>

      {/* Screen Settings Reality */}
      <motion.section variants={itemVariants} className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
        <h2 className="text-lg font-medium text-stone-200 mb-4 flex items-center gap-2">
            <Smartphone className="text-stone-400" size={18} />
            Tech Hygiene: The Screen Myth
        </h2>
        <div className="grid grid-cols-1 gap-4">
            <div className="bg-stone-950/30 p-4 rounded-xl border border-stone-800/50">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-red-300 border border-red-900/50 bg-red-900/10 px-1.5 py-0.5 rounded tracking-wide">MYTH</span>
                    <h3 className="text-sm font-medium text-stone-300">"Night Shift Mode is enough."</h3>
                 </div>
                 <p className="text-xs text-stone-400 leading-relaxed">
                    Changing your screen to amber (Night Shift) removes some blue light, but the <strong>brightness intensity</strong> still suppresses melatonin. Your eyes count photons, regardless of color.
                 </p>
            </div>
            
            <div className="bg-stone-950/30 p-4 rounded-xl border border-stone-800/50">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-green-300 border border-green-900/50 bg-green-900/10 px-1.5 py-0.5 rounded tracking-wide">TRUTH</span>
                    <h3 className="text-sm font-medium text-stone-300">Dimness matters most.</h3>
                 </div>
                 <p className="text-xs text-stone-400 leading-relaxed">
                    You need to reduce the actual light output (Lux).
                    <br/>
                    <span className="text-orange-200 mt-2 block font-medium">Try "Reduce White Point"</span>
                    <span className="text-stone-500 block mt-1">Found in Accessibility settings on iOS/Android. This allows you to dim the screen below the standard 0% brightness slider.</span>
                 </p>
            </div>
        </div>
      </motion.section>

      {/* Sleep Quality Chart */}
      <motion.section variants={itemVariants} className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6">
        <h2 className="text-lg font-medium text-stone-200 mb-4 flex items-center gap-2">
            Sleep History
        </h2>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb923c" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#292524" />
              <XAxis dataKey="day" stroke="#78716c" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1c1917', border: '1px solid #44403c', borderRadius: '8px', color: '#e7e5e4' }}
              />
              <Area type="monotone" dataKey="quality" stroke="#fb923c" strokeWidth={2} fillOpacity={1} fill="url(#colorQuality)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      {/* Cognitive Science Tip */}
      <motion.section variants={itemVariants} className="bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700 rounded-2xl p-6 relative overflow-hidden group hover:border-orange-900/50 transition-colors">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
        <h2 className="text-lg font-medium text-orange-200 mb-3 flex items-center gap-2 relative z-10">
          <Brain size={18} />
          Protocol: Stimulus Control
        </h2>
        <p className="text-stone-300 text-sm leading-relaxed relative z-10 font-serif italic">
          "The Bed is for Sleep Only."
        </p>
        <p className="text-stone-400 text-xs mt-2 relative z-10">
          If you are awake for more than 20 minutes, leave the bedroom. Return only when sleepy. This breaks the brain's association between the bed and wakefulness.
        </p>
      </motion.section>
    </motion.div>
  );
};

export default Dashboard;