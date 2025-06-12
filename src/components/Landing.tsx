
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, BookOpen, Clock, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2962FF]/5 to-white">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="h-8 w-8 text-[#2962FF] fill-current" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900">O-qraya</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="border-[#2962FF] text-[#2962FF] hover:bg-[#2962FF] hover:text-white"
          >
            Se connecter
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Étudiez plus 
            <span className="text-[#2962FF]"> intelligemment</span>,<br />
            pas plus durement
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            L'application dédiée aux étudiants de la FMPC pour optimiser leur apprentissage 
            avec des outils modernes et une communauté active.
          </p>

          <Button 
            size="lg" 
            onClick={() => navigate('/register')}
            className="bg-[#2962FF] hover:bg-[#2962FF]/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Commencer
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[#2962FF]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-[#2962FF]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Gestion des tâches</h3>
            <p className="text-sm text-gray-600">Organisez vos révisions par semaine avec un suivi de progression</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[#2962FF]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-[#2962FF]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Timer Pomodoro</h3>
            <p className="text-sm text-gray-600">Technique de concentration avec sessions personnalisables</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[#2962FF]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-[#2962FF]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Communauté FMPC</h3>
            <p className="text-sm text-gray-600">Échangez avec vos collègues par année et filière</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-[#2962FF]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-[#2962FF]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Suivi des progrès</h3>
            <p className="text-sm text-gray-600">Visualisez vos performances et gardez votre motivation</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
