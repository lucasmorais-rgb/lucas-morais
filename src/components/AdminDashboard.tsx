import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Calendar, 
  Search, 
  Download, 
  LogOut, 
  Filter,
  Eye,
  Mail,
  Phone,
  UserCheck,
  TrendingUp,
  BarChart3,
  Shield
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  hasAccess: boolean;
  lastActivity: string;
  goal: string;
  age: number;
  weight: number;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  // Dados simulados de usuários (em produção, viriam do banco de dados)
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria.silva@email.com',
      phone: '(11) 99999-1234',
      registrationDate: '2024-01-15',
      hasAccess: true,
      lastActivity: '2024-01-20',
      goal: 'lose_weight',
      age: 32,
      weight: 68
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao.santos@email.com',
      phone: '(11) 98888-5678',
      registrationDate: '2024-01-18',
      hasAccess: false,
      lastActivity: '2024-01-19',
      goal: 'gain_muscle',
      age: 28,
      weight: 75
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      phone: '(11) 97777-9012',
      registrationDate: '2024-01-20',
      hasAccess: true,
      lastActivity: '2024-01-21',
      goal: 'lose_fat_maintain_muscle',
      age: 35,
      weight: 62
    },
    {
      id: '4',
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      phone: '(11) 96666-3456',
      registrationDate: '2024-01-22',
      hasAccess: false,
      lastActivity: '2024-01-22',
      goal: 'maintain_weight',
      age: 41,
      weight: 80
    },
    {
      id: '5',
      name: 'Carla Mendes',
      email: 'carla.mendes@email.com',
      phone: '(11) 95555-7890',
      registrationDate: '2024-01-25',
      hasAccess: true,
      lastActivity: '2024-01-26',
      goal: 'lose_weight',
      age: 29,
      weight: 58
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [accessFilter, setAccessFilter] = useState<'all' | 'premium' | 'free'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filtrar usuários
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDate = !dateFilter || user.registrationDate.includes(dateFilter);
      
      const matchesAccess = accessFilter === 'all' || 
                           (accessFilter === 'premium' && user.hasAccess) ||
                           (accessFilter === 'free' && !user.hasAccess);

      return matchesSearch && matchesDate && matchesAccess;
    });
  }, [users, searchTerm, dateFilter, accessFilter]);

  // Estatísticas
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const premiumUsers = users.filter(u => u.hasAccess).length;
    const freeUsers = totalUsers - premiumUsers;
    const conversionRate = totalUsers > 0 ? (premiumUsers / totalUsers * 100) : 0;

    return { totalUsers, premiumUsers, freeUsers, conversionRate };
  }, [users]);

  // Exportar CSV
  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'Telefone', 'Data de Cadastro', 'Acesso Premium', 'Última Atividade', 'Objetivo', 'Idade', 'Peso'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.phone,
        user.registrationDate,
        user.hasAccess ? 'Sim' : 'Não',
        user.lastActivity,
        user.goal,
        user.age,
        user.weight
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `usuarios_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGoalLabel = (goal: string) => {
    const goals = {
      'lose_weight': 'Perder Peso',
      'gain_muscle': 'Ganhar Massa',
      'lose_fat_maintain_muscle': 'Definir Corpo',
      'maintain_weight': 'Manter Peso'
    };
    return goals[goal] || goal;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
                <p className="text-gray-300">Gestão de usuários - Seu Corpo Ideal</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 hover:bg-red-500/30 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Total de Usuários</h3>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
            <p className="text-gray-300 text-sm">Usuários cadastrados</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Usuários Premium</h3>
            </div>
            <div className="text-3xl font-bold text-green-400">{stats.premiumUsers}</div>
            <p className="text-gray-300 text-sm">Com acesso completo</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Usuários Gratuitos</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-400">{stats.freeUsers}</div>
            <p className="text-gray-300 text-sm">Acesso limitado</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Taxa de Conversão</h3>
            </div>
            <div className="text-3xl font-bold text-purple-400">{stats.conversionRate.toFixed(1)}%</div>
            <p className="text-gray-300 text-sm">Gratuito → Premium</p>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
              </div>

              <select
                value={accessFilter}
                onChange={(e) => setAccessFilter(e.target.value as any)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              >
                <option value="all">Todos os usuários</option>
                <option value="premium">Apenas Premium</option>
                <option value="free">Apenas Gratuitos</option>
              </select>

              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 hover:bg-green-500/30 transition-all"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Usuários */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-white">
              Lista de Usuários ({filteredUsers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-medium">Nome</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Email</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Telefone</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Data Cadastro</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className={`border-b border-white/10 hover:bg-white/5 transition-all ${index % 2 === 0 ? 'bg-white/2' : ''}`}>
                    <td className="p-4">
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-gray-400 text-sm">{getGoalLabel(user.goal)}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">
                      {new Date(user.registrationDate).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.hasAccess 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {user.hasAccess ? 'Premium' : 'Gratuito'}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Nenhum usuário encontrado com os filtros aplicados</p>
            </div>
          )}
        </div>

        {/* Modal de Detalhes do Usuário */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-2xl p-6 max-w-2xl w-full border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Detalhes do Usuário</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Nome Completo</label>
                    <p className="text-white font-medium">{selectedUser.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white">{selectedUser.email}</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Telefone</label>
                    <p className="text-white">{selectedUser.phone}</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Data de Cadastro</label>
                    <p className="text-white">{new Date(selectedUser.registrationDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Status da Conta</label>
                    <p className={`font-medium ${selectedUser.hasAccess ? 'text-green-400' : 'text-yellow-400'}`}>
                      {selectedUser.hasAccess ? 'Premium Ativo' : 'Conta Gratuita'}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Objetivo</label>
                    <p className="text-white">{getGoalLabel(selectedUser.goal)}</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Idade</label>
                    <p className="text-white">{selectedUser.age} anos</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Peso Atual</label>
                    <p className="text-white">{selectedUser.weight} kg</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                <h3 className="text-blue-300 font-medium mb-2">Última Atividade</h3>
                <p className="text-blue-200">{new Date(selectedUser.lastActivity).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};