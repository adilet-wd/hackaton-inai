import { useState, useRef } from 'react';
import './Chat.scss'

interface  Message {
      type: 'user' | 'bot' | 'error';
      text:string;
}

export default function Chat() {
      const [messages, setMessages] = useState<Message[]>([]);
      const [inputMessage, setInputMessage] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const messagesEndRef = useRef(null);

      // Функция для отправки сообщения боту
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const sendMessage = async (e) => {
            e.preventDefault();
            if (!inputMessage.trim()) return;

            // Добавляем сообщение пользователя в чат
            const userMessage = { type: 'user', text: inputMessage };
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setMessages([...messages, userMessage]);
            setIsLoading(true);

            try {
                  // Отправляем запрос к API чат-бота
                  const response = await fetch('http://16.171.42.118:9000/aaa/', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ question: inputMessage }),
                  });

                  if (!response.ok) {
                        throw new Error('Ошибка сети');
                  }

                  const data = await response.json();

                  // Добавляем ответ бота в чат
                  const botMessage = { type: 'bot', text: data.answer };
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  setMessages(prev => [...prev, botMessage]);
            } catch (error) {
                  console.error('Ошибка:', error);
                  // Добавляем сообщение об ошибке в чат
                  const errorMessage = { type: 'error', text: 'Произошла ошибка при получении ответа.' };
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  setMessages(prev => [...prev, errorMessage]);
            } finally {
                  setIsLoading(false);
                  setInputMessage('');
            }
      };

      // // Прокрутка к последнему сообщению при добавлении нового
      // useEffect(() => {
      //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //       // @ts-expect-error
      //       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      // }, [messages]);

      return (
              <>
                    <div className="chat-bot max-w-4xl mx-auto mt-[2rem] px-4 ">
                          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                {/* Заголовок чата */}
                                <div className="bg-blue-600 text-white px-4 py-3">
                                      <h2 className="text-xl font-semibold">Чат с ботом</h2>
                                </div>

                                {/* Контейнер сообщений */}
                                <div className="p-4 h-96 overflow-y-auto bg-gray-50">
                                      {messages.length === 0 ? (
                                              <div className="flex items-center justify-center h-full">
                                                    <p className="text-gray-500">Задайте вопрос, чтобы начать общение с
                                                          ботом</p>
                                              </div>
                                      ) : (
                                              <div className="space-y-4 gap-3 flex flex-col">
                                                    {messages.map((msg, index) => (
                                                            <div
                                                                    key={index}
                                                                    className={`flex ${(msg.type !== 'user' ? 'justify-start'  : 'justify-end ')}`}
                                                            >
                                                                  <div
                                                                          className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                                                                                  msg.type === 'user'
                                                                                          ? 'bg-blue-600 text-white'
                                                                                          : msg.type === 'error'
                                                                                                  ? 'bg-red-500 text-white'
                                                                                                  : 'bg-gray-200 text-gray-800'
                                                                          }`}
                                                                  >
                                                                        <p>{msg.text}</p>
                                                                  </div>
                                                            </div>
                                                    ))}
                                                    {isLoading && (
                                                            <div className="flex justify-start">
                                                                  <div className="bg-gray-200 rounded-lg px-4 py-2 text-gray-800">
                                                                        <div className="flex items-center">
                                                                              <svg className="animate-spin h-5 w-5 mr-2 text-gray-600"
                                                                                   viewBox="0 0 24 24">
                                                                                    <circle className="opacity-25"
                                                                                            cx="12" cy="12" r="10"
                                                                                            stroke="currentColor"
                                                                                            strokeWidth="4"
                                                                                            fill="none"></circle>
                                                                                    <path className="opacity-75"
                                                                                          fill="currentColor"
                                                                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                              </svg>
                                                                              <span>Бот печатает...</span>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                    )}
                                                    <div ref={messagesEndRef}/>
                                              </div>
                                      )}
                                </div>

                                {/* Форма ввода */}
                                <div className="border-t border-gray-200 p-4 chat__border">
                                      <form onSubmit={sendMessage} className="flex">
                                            <input
                                                    type="text"
                                                    value={inputMessage}
                                                    onChange={(e) => setInputMessage(e.target.value)}
                                                    placeholder="Введите сообщение..."
                                                    className="chat__input flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    disabled={isLoading}
                                            />
                                            <button
                                                    type="submit"
                                                    className="background-blue bg-blue-600 text-white px-4 py-2 rounded-r-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                                    disabled={isLoading}
                                            >
                                                  {isLoading ? (
                                                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                                        stroke="currentColor" strokeWidth="4"
                                                                        fill="none"></circle>
                                                                <path className="opacity-75" fill="currentColor"
                                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                          </svg>
                                                  ) : 'Отправить'}
                                            </button>
                                      </form>
                                </div>
                          </div>
                    </div>
              </>
      );
}