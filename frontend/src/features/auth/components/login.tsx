import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, PlusCircle, Loader2 } from 'lucide-react';
import useLogin from '../hooks/useLogin';

const LoginPage = () => {
  const { loading, handleChange, handleSubmit } = useLogin();
  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-6 space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              TaskMaster
            </h2>
            <p className="text-gray-400 text-xs">Tekrar hoşgeldiniz! Görevlerinizi yönetmek için giriş yapınız.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Email
              </Label>
              <Input
                id='passwordHash'
                name="email"
                type="email"
                placeholder="Enter your email"
                className="bg-black/20 text-white border-zinc-500/30 placeholder:text-gray-500 focus:ring-zinc-500 focus:border-zinc-500"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Parola
              </Label>
              <Input
                id='passwordHash'
                name='passwordHash'
                type="password"
                placeholder="Enter your password"
                className="bg-black/20 text-white border-zinc-500/30 placeholder:text-gray-500 focus:ring-zinc-500 focus:border-zinc-500"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              type='submit'
              variant="default"
              disabled={loading}
              className={cn(
                "w-full sm:w-auto bg-blue-500/90 text-white hover:bg-blue-500 transition-colors duration-300",
                "shadow-lg hover:shadow-blue-500/20"
              )}
            >
              Giriş
              {
                loading ? <Loader2 className='animate-spin' /> : <LogIn />
              }
            </Button>
            <Button
              type='button'
              variant="outline"
              className={cn(
                "w-full sm:w-auto text-gray-300 hover:text-white hover:bg-zinc-500/20 border-zinc-500/30",
                "transition-colors duration-300"
              )}
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              Kayıt Ol
            </Button>
          </div>

          <div className="text-center text-gray-400 text-sm">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Şifremi unuttum?
            </a>
          </div>
        </motion.div>
      </div>
    </form>
  );
};

export default LoginPage;

