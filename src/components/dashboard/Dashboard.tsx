
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Users, 
  TrendingUp, 
  Plus,
  Play,
  CheckCircle,
  Calendar,
  LogOut,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Dashboard = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    totalTasks: 0,
    todayPomodoros: 0,
    currentStreak: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser) return;

      try {
        // Fetch tasks
        const tasksQuery = query(
          collection(db, 'tasks'),
          where('userId', '==', currentUser.uid)
        );
        const tasksSnapshot = await getDocs(tasksQuery);
        const tasks = tasksSnapshot.docs.map(doc => doc.data());
        
        const completedTasks = tasks.filter(task => task.status === 'completed').length;
        
        // Fetch today's pomodoro sessions
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const pomodoroQuery = query(
          collection(db, 'pomodoro_sessions'),
          where('userId', '==', currentUser.uid),
          where('timestamp', '>=', today)
        );
        const pomodoroSnapshot = await getDocs(pomodoroQuery);
        
        setStats({
          tasksCompleted: completedTasks,
          totalTasks: tasks.length,
          todayPomodoros: pomodoroSnapshot.size,
          currentStreak: 5 // This would be calculated based on consecutive study days
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const progressPercentage = stats.totalTasks > 0 ? (stats.tasksCompleted / stats.totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2962FF]/5 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#2962FF] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Y</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Y-FMPC</span>
              </div>
              <Badge variant="secondary" className="bg-[#2962FF]/10 text-[#2962FF]">
                {userProfile?.filiere} - {userProfile?.annee}ème année
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {userProfile?.photoURL && (
                  <img 
                    src={userProfile.photoURL} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="font-medium text-gray-700">
                  {userProfile?.displayName}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour, {userProfile?.displayName} ! 👋
          </h1>
          <p className="text-gray-600">
            Prêt(e) à continuer vos études ? Voici un aperçu de vos progrès.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tâches complétées</CardTitle>
              <CheckCircle className="h-4 w-4 text-[#2962FF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.tasksCompleted}/{stats.totalTasks}</div>
              <Progress value={progressPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pomodoros aujourd'hui</CardTitle>
              <Clock className="h-4 w-4 text-[#2962FF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayPomodoros}</div>
              <p className="text-xs text-muted-foreground">sessions de 25min</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Série d'étude</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#2962FF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentStreak}</div>
              <p className="text-xs text-muted-foreground">jours consécutifs</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progression</CardTitle>
              <Calendar className="h-4 w-4 text-[#2962FF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
              <p className="text-xs text-muted-foreground">cette semaine</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => navigate('/tasks')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#2962FF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2962FF]/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-[#2962FF]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Mes tâches</CardTitle>
                  <CardDescription>Organiser et suivre vos révisions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une nouvelle tâche
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => navigate('/pomodoro')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#2962FF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2962FF]/20 transition-colors">
                  <Clock className="h-6 w-6 text-[#2962FF]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Timer Pomodoro</CardTitle>
                  <CardDescription>Sessions de concentration optimisée</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <Play className="h-4 w-4 mr-2" />
                Démarrer une session
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => navigate('/community')}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#2962FF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2962FF]/20 transition-colors">
                  <Users className="h-6 w-6 text-[#2962FF]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Communauté</CardTitle>
                  <CardDescription>Échanger avec vos collègues</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <Users className="h-4 w-4 mr-2" />
                Rejoindre les discussions
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
