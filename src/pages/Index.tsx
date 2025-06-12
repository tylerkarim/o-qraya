
import { useAuth } from '@/contexts/AuthContext';
import Landing from '@/components/Landing';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Dashboard /> : <Landing />;
};

export default Index;
