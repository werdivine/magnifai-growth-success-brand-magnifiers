'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Check } from 'lucide-react';

interface ChatMessage {
    id: string;
    sender: 'ai' | 'user';
    text: string;
    timestamp: Date;
}

export default function WhatsAppChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [badgeActive, setBadgeActive] = useState(true);
    
    // Form stages: 'chat' | 'ask_name' | 'ask_phone' | 'completed'
    const [stage, setStage] = useState<'chat' | 'ask_name' | 'ask_phone' | 'completed'>('chat');
    const [userData, setUserData] = useState({ name: '', phone: '' });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial greeting
    useEffect(() => {
        setMessages([
            {
                id: '1',
                sender: 'ai',
                text: "Hi there! 👋 I'm the WeMagnifAI automation assistant. How can we speed up your business growth today?",
                timestamp: new Date()
            }
        ]);
    }, []);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleOptionClick = (optionText: string) => {
        // Clear badge on click
        setBadgeActive(false);

        // Add user response
        const userMsg: ChatMessage = {
            id: Math.random().toString(),
            sender: 'user',
            text: optionText,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Simulate AI response based on choice
        setTimeout(() => {
            setIsTyping(false);
            let responseText = '';
            
            if (optionText.includes('Audit')) {
                responseText = "Great! A website audit scans 47 critical points across SEO, speed, conversion rates, and GEO (Generative Engine Optimization). We can build your report in less than 24 hours.";
            } else if (optionText.includes('Telegram')) {
                responseText = "Excellent choice. Our Telegram Growth Engine scrapes target groups, scores leads, and automatically sends personalized DM sequences. It runs 24/7.";
            } else {
                responseText = "Understood. We construct custom Make.com scenarios, HubSpot integrations, and automated lead capture funnels to bridge your operations.";
            }

            setMessages(prev => [
                ...prev,
                {
                    id: Math.random().toString(),
                    sender: 'ai',
                    text: responseText + "\n\nLet's get started. What is your name?",
                    timestamp: new Date()
                }
            ]);
            setStage('ask_name');
        }, 1500);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const text = inputText.trim();
        setInputText('');

        // Add user msg
        setMessages(prev => [
            ...prev,
            {
                id: Math.random().toString(),
                sender: 'user',
                text,
                timestamp: new Date()
            }
        ]);

        if (stage === 'chat') {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [
                    ...prev,
                    {
                        id: Math.random().toString(),
                        sender: 'ai',
                        text: "I can help with that. To connect you with our lead engineers, what is your name?",
                        timestamp: new Date()
                    }
                ]);
                setStage('ask_name');
            }, 1200);
        } else if (stage === 'ask_name') {
            setUserData(prev => ({ ...prev, name: text }));
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [
                    ...prev,
                    {
                        id: Math.random().toString(),
                        sender: 'ai',
                        text: `Nice to meet you, ${text}! What is the best WhatsApp phone number to reach you?`,
                        timestamp: new Date()
                    }
                ]);
                setStage('ask_phone');
            }, 1200);
        } else if (stage === 'ask_phone') {
            setUserData(prev => ({ ...prev, phone: text }));
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [
                    ...prev,
                    {
                        id: Math.random().toString(),
                        sender: 'ai',
                        text: "Perfect. Click the button below to connect with us on WhatsApp instantly with your details prefilled!",
                        timestamp: new Date()
                    }
                ]);
                setStage('completed');
            }, 1200);
        }
    };

    const redirectToWhatsApp = () => {
        const messageText = `Hi WeMagnifAI, my name is ${userData.name}. I am looking to automate my business. Phone: ${userData.phone}. Let's build something.`;
        const encodedText = encodeURIComponent(messageText);
        window.open(`https://wa.me/15550199?text=${encodedText}`, '_blank');
    };

    return (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
            
            {/* FLOATING ACTION BUBBLE */}
            <motion.button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setBadgeActive(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4), inset 0 2px 2px rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    position: 'relative'
                }}
            >
                {isOpen ? (
                    <X size={26} color="#fff" />
                ) : (
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" style={{ color: '#fff' }}>
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.42 1.451 5.513 0 10.002-4.485 10.005-9.999.002-2.673-1.04-5.184-2.936-7.081-1.897-1.897-4.413-2.936-7.095-2.937-5.518 0-10.007 4.486-10.01 10.002-.001 1.93.504 3.812 1.464 5.418L1.761 21.03l4.886-1.282z" />
                    </svg>
                )}

                {/* Pulsing Badge */}
                {badgeActive && (
                    <span style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#ef4444',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 10px #ef4444'
                    }}>
                        1
                    </span>
                )}
            </motion.button>

            {/* EXPANDABLE CHAT DRAWER */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                        style={{
                            position: 'absolute',
                            bottom: '80px',
                            right: 0,
                            width: '360px',
                            height: '500px',
                            borderRadius: '24px',
                            background: 'rgba(10, 11, 28, 0.85)',
                            backdropFilter: 'blur(30px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Drawer Header */}
                        <div style={{
                            padding: '1.25rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.02)'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ color: '#fff' }}>
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.42 1.451 5.513 0 10.002-4.485 10.005-9.999.002-2.673-1.04-5.184-2.936-7.081-1.897-1.897-4.413-2.936-7.095-2.937-5.518 0-10.007 4.486-10.01 10.002-.001 1.93.504 3.812 1.464 5.418L1.761 21.03l4.886-1.282z" />
                                </svg>
                            </div>
                            <div>
                                <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800 }}>WeMagnifAI Growth Bot</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                                    <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Active agent · Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div style={{
                            flex: 1,
                            padding: '1.25rem',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    style={{
                                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '80%',
                                        background: msg.sender === 'user' ? '#128C7E' : 'rgba(255, 255, 255, 0.05)',
                                        border: msg.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.06)',
                                        borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                        padding: '0.85rem 1rem',
                                        color: '#fff',
                                        fontSize: '0.85rem',
                                        lineHeight: 1.5,
                                        whiteSpace: 'pre-wrap'
                                    }}
                                >
                                    {msg.text}
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div style={{
                                    alignSelf: 'flex-start',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '16px 16px 16px 4px',
                                    padding: '0.85rem 1rem',
                                    display: 'flex',
                                    gap: '4px',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pulse 1s infinite 0.1s' }} />
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pulse 1s infinite 0.2s' }} />
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pulse 1s infinite 0.3s' }} />
                                </div>
                            )}

                            {/* Option suggestions (only at stage 'chat') */}
                            {stage === 'chat' && !isTyping && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.5rem' }}>
                                    {[
                                        '🔍 Audit my website',
                                        '🚀 Automate Telegram leads',
                                        '🟠 Setup HubSpot scenarios'
                                    ].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleOptionClick(opt)}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                                borderRadius: '10px',
                                                padding: '8px 12px',
                                                color: '#c4b5fd',
                                                fontSize: '0.8rem',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                            }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input footer form */}
                        <div style={{
                            padding: '1rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                            background: 'rgba(255, 255, 255, 0.01)'
                        }}>
                            {stage === 'completed' ? (
                                <button
                                    onClick={redirectToWhatsApp}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                                        border: 'none',
                                        color: '#fff',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        fontWeight: 800,
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    Connect on WhatsApp Now
                                </button>
                            ) : (
                                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder={
                                            stage === 'ask_name' 
                                                ? 'Type your name...' 
                                                : stage === 'ask_phone' 
                                                    ? 'Type WhatsApp number...' 
                                                    : 'Type a message...'
                                        }
                                        style={{
                                            flex: 1,
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '12px',
                                            padding: '10px 16px',
                                            color: '#fff',
                                            fontSize: '0.85rem',
                                            outline: 'none'
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '12px',
                                            background: 'rgba(255, 255, 255, 0.08)',
                                            border: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: '#fff'
                                        }}
                                    >
                                        <Send size={16} />
                                    </button>
                                </form>
                            )}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
