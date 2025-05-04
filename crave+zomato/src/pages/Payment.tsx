import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMood } from '../context/MoodContext';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { moodBasedTheme } = useMood();
  const [step, setStep] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    setTimeout(() => {
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen ${moodBasedTheme.bgGradient} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${moodBasedTheme.cardBg} rounded-2xl ${moodBasedTheme.shadowColor} shadow-xl p-8`}
        >
          {!paymentSuccess ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Secure Payment</h2>
                <p className="mt-2 text-gray-600">Complete your order securely</p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <div className={`h-1 w-full ${step === 1 ? moodBasedTheme.buttonGradient : 'bg-gray-200'} rounded`} />
                </div>
              </div>

              <form onSubmit={handlePayment}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                      <CreditCard className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                        <Calendar className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                        <Lock className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 px-4 ${moodBasedTheme.buttonGradient} text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]`}
                  >
                    Pay ₹1,299
                  </button>
                </div>
              </form>

              <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                <Lock className="h-4 w-4 mr-2" />
                <span>Your payment info is secure</span>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600">
                Thank you for your order. Redirecting...
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;