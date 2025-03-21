
import React, { useState } from 'react';
import { useSchedule } from '../contexts/ScheduleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const LoginForm = () => {
  const { user, login, logout } = useSchedule();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(username, password);
    if (success) {
      setOpen(false);
      setUsername('');
      setPassword('');
      toast.success('Login realizado com sucesso!');
    } else {
      setError('Credenciais inválidas');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          {user ? (
            <>
              <User size={16} className="text-green-500" />
              <span className="hidden md:inline">{user.username}</span>
              <span className="md:hidden">Admin</span>
            </>
          ) : (
            <>
              <User size={16} />
              <span className="hidden md:inline">Entrar</span>
            </>
          )}
        </Button>
      </DialogTrigger>
      
      {!user ? (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login Administrativo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Nome de usuário"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Senha"
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-500 font-medium">{error}</div>
            )}
            <div className="flex justify-end">
              <Button type="submit">Entrar</Button>
            </div>
          </form>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Perfil de Administrador</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Logado como <strong>{user.username}</strong> (Administrador)</p>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Sair
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default LoginForm;
