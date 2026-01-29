import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Login() {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика авторизации
    console.log('Login with:', method, value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-2xl mb-4">
            <span className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text text-transparent">НГ</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">НовкиГрамм</h1>
          <p className="text-white/80 text-lg">Современный мессенджер</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Вход в аккаунт</h2>

          {/* Method Toggle */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setMethod('phone')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                method === 'phone'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon name="Smartphone" size={18} className="inline mr-2" />
              Телефон
            </button>
            <button
              onClick={() => setMethod('email')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                method === 'email'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon name="Mail" size={18} className="inline mr-2" />
              Email
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-input" className="block text-sm font-medium text-gray-700 mb-2">
                {method === 'phone' ? 'Номер телефона' : 'Адрес электронной почты'}
              </label>
              <input
                id="login-input"
                type={method === 'phone' ? 'tel' : 'email'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={method === 'phone' ? '+7 (999) 123-45-67' : 'example@mail.ru'}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-[1.02]"
            >
              Продолжить
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Нет аккаунта?{' '}
              <button className="text-purple-600 font-semibold hover:text-purple-700">
                Зарегистрироваться
              </button>
            </p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-white/90 hover:text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
        >
          <Icon name="ArrowLeft" size={20} />
          Вернуться на главную
        </button>
      </div>
    </div>
  );
}
