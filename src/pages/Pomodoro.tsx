
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Pomodoro = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Session finished
      if (!isBreak) {
        // Work session finished, start break
        setSessions(prev => prev + 1);
        setIsBreak(true);
        setTimeLeft(5 * 60); // 5 minute break
        logPomodoroSession();
      } else {
        // Break finished, start new work session
        setIsBreak(false);
        setTimeLeft(25 * 60); // 25 minute work session
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak]);

  const logPomodoroSession = async () => {
    if (!currentUser) return;

    try {
      await addDoc(collection(db, 'pomodoro_sessions'), {
        userId: currentUser.uid,
        timestamp: new Date(),
        duration: 25 * 60, // 25 minutes
        type: 'work'
      });
    } catch (error) {
      console.error('Error logging pomodoro session:', error);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2962FF]/5 to-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour au tableau de bord</span>
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Timer Pomodoro</h1>
          <p className="text-gray-600">Technique de concentration avec sessions de 25 minutes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Timer Card */}
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">
                {isBreak ? '☕ Pause' : '📚 Session de travail'}
              </CardTitle>
              <CardDescription>
                {isBreak ? 'Prenez une pause bien méritée' : 'Concentrez-vous sur vos études'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-mono font-bold text-[#2962FF]">
                {formatTime(timeLeft)}
              </div>
              
              <Progress value={progress} className="h-2" />
              
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={toggleTimer}
                  size="lg"
                  className="bg-[#2962FF] hover:bg-[#2962FF]/90"
                >
                  {isActive ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                  {isActive ? 'Pause' : 'Démarrer'}
                </Button>
                
                <Button 
                  onClick={resetTimer}
                  size="lg"
                  variant="outline"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-[#2962FF]" />
                <span>Statistiques d'aujourd'hui</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sessions complétées</span>
                <span className="text-2xl font-bold text-[#2962FF]">{sessions}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Temps total</span>
                <span className="text-2xl font-bold text-[#2962FF]">
                  {Math.floor(sessions * 25 / 60)}h {(sessions * 25) % 60}min
                </span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">💡 Conseil</h4>
                <p className="text-sm text-gray-600">
                  La technique Pomodoro recommande de prendre une pause de 15-30 minutes 
                  après 4 sessions de travail.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
