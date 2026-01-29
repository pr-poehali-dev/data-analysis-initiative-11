import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: 'Анна Смирнова',
    avatar: '👩',
    lastMessage: 'Привет! Как дела?',
    time: '14:23',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Дмитрий Петров',
    avatar: '👨',
    lastMessage: 'Спасибо за помощь!',
    time: '13:45',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'Елена Кузнецова',
    avatar: '👩‍💼',
    lastMessage: 'Отправила документы',
    time: 'Вчера',
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: 'Игорь Волков',
    avatar: '👨‍💻',
    lastMessage: 'Посмотри ссылку',
    time: 'Вчера',
    unread: 1,
    online: false,
  },
  {
    id: 5,
    name: 'Мария Новикова',
    avatar: '👩‍🎨',
    lastMessage: 'Отлично!',
    time: 'Пн',
    unread: 0,
    online: false,
  },
];

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела?', time: '14:20', isOwn: false },
  { id: 2, text: 'Привет! Всё отлично, спасибо!', time: '14:21', isOwn: true },
  { id: 3, text: 'Что нового?', time: '14:23', isOwn: false },
];

export default function Messenger() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0]);
  const [messages] = useState<Message[]>(mockMessages);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      console.log('Send message:', messageText);
      setMessageText('');
    }
  };

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar with contacts */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              НовкиГрамм
            </h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon name="Settings" size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск контактов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Contacts list */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                selectedContact?.id === contact.id ? 'bg-purple-50' : ''
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl">
                  {contact.avatar}
                </div>
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900 truncate">{contact.name}</span>
                  <span className="text-xs text-gray-500 ml-2">{contact.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
              </div>
              
              {contact.unread > 0 && (
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {contact.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl">
                  {selectedContact.avatar}
                </div>
                {selectedContact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{selectedContact.name}</h2>
                <p className="text-sm text-gray-500">
                  {selectedContact.online ? 'онлайн' : 'был(а) недавно'}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Icon name="Phone" size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Icon name="Video" size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Icon name="MoreVertical" size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-4 py-2 rounded-2xl ${
                    message.isOwn
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <p>{message.text}</p>
                  <span
                    className={`text-xs mt-1 block ${
                      message.isOwn ? 'text-white/70' : 'text-gray-500'
                    }`}
                  >
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <button
                type="button"
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon name="Paperclip" size={20} className="text-gray-600" />
              </button>
              
              <input
                type="text"
                placeholder="Напишите сообщение..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              <button
                type="button"
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon name="Smile" size={20} className="text-gray-600" />
              </button>
              
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Icon name="Send" size={20} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={40} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Выберите чат
            </h2>
            <p className="text-gray-600">
              Выберите контакт из списка, чтобы начать общение
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
