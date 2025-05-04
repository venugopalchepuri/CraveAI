import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { useMood } from '../context/MoodContext';
import { useRestaurants } from '../context/RestaurantContext';
import { motion, AnimatePresence } from 'framer-motion';

const CraveAIGenie: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: 'Hi there! I\'m your CraveAI Genie. Tell me how you\'re feeling or what you\'re in the mood for, and I\'ll suggest the perfect food for you!', sender: 'bot' },
  ]);
  const { currentMood, setMood } = useMood();
  const { recommendedDishes } = useRestaurants();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleGenie = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { text: input, sender: 'user' }]);

    // Process the input to detect mood and food preferences
    setTimeout(() => {
      const userInput = input.toLowerCase();
      let response = '';
      let detectedMood: any = null;

      // Simple NLP to detect mood
      if (userInput.includes('sad') || userInput.includes('depressed') || userInput.includes('down')) {
        detectedMood = 'sad';
        response = "I sense you're feeling down. How about some comfort food? ";
      } else if (userInput.includes('happy') || userInput.includes('excited') || userInput.includes('joy')) {
        detectedMood = 'happy';
        response = "You seem happy! Let's celebrate with something delicious! ";
      } else if (userInput.includes('stressed') || userInput.includes('anxious') || userInput.includes('worried')) {
        detectedMood = 'stressed';
        response = "Sounds like you're stressed. I'll suggest something to help you relax. ";
      } else if (userInput.includes('relaxed') || userInput.includes('calm') || userInput.includes('peaceful')) {
        detectedMood = 'relaxed';
        response = "Enjoying a relaxed mood? Let's find something to maintain that vibe. ";
      } else if (userInput.includes('hungry') || userInput.includes('starving')) {
        detectedMood = 'hungry';
        response = "You're hungry! Let's find something satisfying right away. ";
      } else {
        response = "Based on what you've told me, ";
      }

      // Update mood if detected
      if (detectedMood) {
        setMood(detectedMood);
      }

      // Recommend dishes based on current mood (which might have just been updated)
      if (recommendedDishes.length > 0) {
        const topDish = recommendedDishes[0];
        response += `I recommend trying ${topDish.name}. It's perfect for your current mood and has a high crave score!`;
      } else {
        response += "I recommend trying something that matches your current mood. Check out our recommendations on the home page!";
      }

      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 1000);

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleGenie}
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors z-30"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-30 overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 150px)' }}
          >
            <div className="bg-orange-500 text-white p-4">
              <h3 className="font-semibold">CraveAI Genie</h3>
              <p className="text-sm text-orange-100">Your personal food mood assistant</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '300px' }}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'user'
                        ? 'bg-orange-500 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-3 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tell me how you're feeling..."
                className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                onClick={handleSend}
                className="bg-orange-500 text-white p-2 rounded-r-lg hover:bg-orange-600"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CraveAIGenie;