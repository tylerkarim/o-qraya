
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, ArrowLeft, BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  const communityGroups = [
    {
      id: 1,
      name: 'Médecine 1ère année',
      description: 'Groupe d\'entraide pour les étudiants de 1ère année médecine',
      members: 234,
      lastActivity: '2 min',
      category: 'medecine'
    },
    {
      id: 2,
      name: 'Pharmacie 2ème année',
      description: 'Partage de ressources et discussions pour la 2ème année pharmacie',
      members: 156,
      lastActivity: '15 min',
      category: 'pharmacie'
    },
    {
      id: 3,
      name: 'Révisions Anatomie',
      description: 'Groupe spécialisé dans les révisions d\'anatomie',
      members: 89,
      lastActivity: '1h',
      category: 'matiere'
    },
    {
      id: 4,
      name: 'Médecine 3ème année',
      description: 'Communauté des étudiants de 3ème année médecine',
      members: 198,
      lastActivity: '30 min',
      category: 'medecine'
    },
    {
      id: 5,
      name: 'Physiologie FMPC',
      description: 'Discussions et exercices de physiologie',
      members: 145,
      lastActivity: '45 min',
      category: 'matiere'
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: 'Session Pomodoro Groupe',
      description: 'Sessions d\'étude collective avec timer partagé',
      participants: 12,
      nextSession: 'Aujourd\'hui 15h00'
    },
    {
      id: 2,
      name: 'Quiz Anatomie',
      description: 'Quiz hebdomadaire d\'anatomie en groupe',
      participants: 8,
      nextSession: 'Demain 14h00'
    },
    {
      id: 3,
      name: 'Révisions Biochimie',
      description: 'Révisions collaboratives de biochimie',
      participants: 15,
      nextSession: 'Vendredi 16h30'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2962FF]/5 to-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour au tableau de bord</span>
          </Button>
          <Badge variant="secondary" className="bg-[#2962FF]/10 text-[#2962FF]">
            {userProfile?.filiere} - {userProfile?.annee}ème année
          </Badge>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Communauté FMPC</h1>
          <p className="text-gray-600">Échangez avec vos collègues et rejoignez des groupes d'étude</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Community Groups */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Groupes de discussion</h2>
              <Button variant="outline" size="sm">
                Créer un groupe
              </Button>
            </div>
            
            <div className="space-y-4">
              {communityGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {group.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{group.members} membres</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Actif il y a {group.lastActivity}</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-[#2962FF] hover:bg-[#2962FF]/90">
                        Rejoindre
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Study Groups Sidebar */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Groupes d'étude</h2>
            
            <div className="space-y-4">
              {studyGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-base">{group.name}</CardTitle>
                    <CardDescription className="text-sm">{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Participants</span>
                        <span className="font-medium">{group.participants}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Prochaine session</span>
                        <span className="font-medium text-[#2962FF]">{group.nextSession}</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Rejoindre
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-[#2962FF]/5 border-[#2962FF]/20">
              <CardHeader>
                <CardTitle className="text-base text-[#2962FF]">💡 Astuce</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">
                  Rejoignez des groupes d'étude pour rester motivé et améliorer vos résultats grâce à l'apprentissage collaboratif.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
