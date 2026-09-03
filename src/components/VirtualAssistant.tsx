import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, ChevronDown } from 'lucide-react';
import { ChatMessage } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';

export const VirtualAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const { isRTL } = useAccessibility();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: isRTL
        ? 'مرحباً بك في المساعد الافتراضي لدائرة الموارد البشرية. كيف يمكنني مساعدتك اليوم؟'
        : 'Welcome to the Department of Human Resources Virtual Assistant. How can I assist you with services, vacancies, or civil service regulations today?',
      timestamp: 'Just now',
      options: isRTL
        ? ['تصفح الشواغر الوظيفية', 'بوابة الخدمة الذاتية', 'التعاميم والقرارات', 'البرامج التدريبية']
        : ['Browse Job Vacancies', 'Employee Self-Service', 'Official Circulars', 'Training Programs'],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Generate responsive assistant answer
    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('vacancy') || lower.includes('job') || lower.includes('شواغر') || lower.includes('وظائف')) {
        botResponse = isRTL
          ? 'تتوفر حالياً شواغر جديدة للكفاءات الوطنية في مجالات الهندسة، الإدارة، وتقنية المعلومات. يمكنك استخدام بوابة التوظيف الموحدة لتقديم طلبك مباشرة.'
          : 'Active vacancies for UAE National candidates are currently open in engineering, administrative governance, and AI data systems. You can browse and apply through the Quick Access Job Seeker portal.';
      } else if (lower.includes('leave') || lower.includes('self-service') || lower.includes('إجازات') || lower.includes('خدمة ذاتية')) {
        botResponse = isRTL
          ? 'يمكن للموظفين التقديم على كافة أنواع الإجازات السنوية والمرضية والاضطرارية ومتابعة الموافقات عبر بوابة الخدمة الذاتية الذكية.'
          : 'Employees can submit annual, sick, or compassionate leaves and track approval statuses directly via the Employee Self-Service Portal.';
      } else if (lower.includes('training') || lower.includes('course') || lower.includes('تدريب')) {
        botResponse = isRTL
          ? 'تقدم أكاديمية الشارقة للكفاءات دورات تدريبية معتمدة وورش عمل قيادية للكوادر الحكومية على مدار العام.'
          : 'Sharjah Competency Excellence Academy offers certified executive leadership workshops and digital competency courses for public sector employees.';
      } else {
        botResponse = isRTL
          ? 'شكراً لتواصلك مع دائرة الموارد البشرية. تم تسجيل استفسارك وسيقوم فريق الدعم بمتابعة طلبك، أو يمكنك استخدام روابط الوصول السريع بالأعلى.'
          : 'Thank you for contacting the Department of Human Resources. Your inquiry has been routed to our service center. You may also access our direct portals in the Quick Access section.';
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botResponse,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Floating Prompt Bubble matching design image */}
      {!isOpen && (
        <div className="flex items-center gap-2 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200/90 shadow-lg text-slate-800 text-xs font-semibold hover:border-teal-500 hover:text-teal-900 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left">
              <span className="font-bold block text-[11px] text-slate-900">Virtual Assistant</span>
              <span className="text-[10px] text-slate-500 font-normal">
                {isRTL ? 'كيف يمكنني مساعدتك اليوم؟' : 'How can I help you today?'}
              </span>
            </div>
          </button>
          
          <button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-700 via-teal-600 to-amber-500 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
            aria-label="Open Virtual Assistant"
          >
            <MessageSquare className="w-5 h-5 fill-white/20" />
          </button>
        </div>
      )}

      {/* Expanded Chat Drawer / Window */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[500px] max-h-[80vh] bg-white rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight">
                  {isRTL ? 'المساعد الافتراضي الحكومي' : 'Virtual Assistant'}
                </h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {isRTL ? 'متصل للمساعدة الفورية' : 'Online • Instant Support'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/70">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-teal-700 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {msg.options && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1">
                      <span className="text-[10px] text-slate-400 font-semibold block">Suggested:</span>
                      <div className="flex flex-wrap gap-1">
                        {msg.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleSendMessage(opt)}
                            className="text-[10px] py-1 px-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-medium transition-colors border border-teal-100"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isRTL ? 'اكتب استفسارك هنا...' : 'Ask a question...'}
              className="flex-1 text-xs px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:bg-white text-slate-900"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
