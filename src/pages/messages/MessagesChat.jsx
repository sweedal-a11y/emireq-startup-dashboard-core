import React, { useState, useRef, useEffect } from 'react';
import './MessagesChat.css';

export default function MessagesChat({ sidebarCollapsed = false }) {
  const [conversations] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      organization: 'Growth Equity Fund',
      avatar: '/assets/profile-avatar.svg',
      lastMessage: 'Thanks for sharing the upd...',
      time: 'Today',
      isOnline: true,
      unread: 0
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      organization: 'Tech Venture',
      avatar: '/assets/profile-avatar.svg',
      lastMessage: 'Thanks for sharing the upd...',
      time: '09:15 AM',
      isOnline: true,
      unread: 0
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      organization: 'Growth Equity Fund',
      avatar: '/assets/profile-avatar.svg',
      lastMessage: 'Thanks for sharing the upd...',
      time: 'Today',
      isOnline: true,
      unread: 0
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      organization: 'Seed Stage Partners',
      avatar: '/assets/profile-avatar.svg',
      lastMessage: 'Thanks for sharing the upd...',
      time: '2 days ago',
      isOnline: true,
      unread: 0
    },
    {
      id: 5,
      name: 'Sarah Johnson',
      organization: 'Tech Venture',
      avatar: '/assets/profile-avatar.svg',
      lastMessage: 'Thanks for sharing the upd...',
      time: '2 days ago',
      isOnline: true,
      unread: 0
    },
    {
      id: 6,
      name: 'Sarah Johnson',
      organization: 'Tech Venture',
      avatar: '/assets/profile-avatar.svg',
      lastMessage: 'Thanks for sharing the upd...',
      time: '2 days ago',
      isOnline: true,
      unread: 0
    }
  ]);

  // Initialize with the first conversation selected
  const [selectedConversation, setSelectedConversation] = useState(null);
  
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0]);
    }
  }, [conversations, selectedConversation]);

  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! I reviewed your pitch deck and I am impressed with your traction.',
      sender: 'sarah',
      timestamp: '10:15 AM',
      read: true
    },
    {
      id: 2,
      text: 'Thank you! We are excited about the opportunity to discuss further.',
      sender: 'me',
      timestamp: '10:20 AM',
      read: true
    },
    {
      id: 3,
      text: 'I would love to schedule a call to discuss your metrics in more detail.',
      sender: 'sarah',
      timestamp: '10:30 AM',
      read: true
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageInput,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStartNewConversation = () => {
    console.log('Start new conversation');
  };

  const handleAttachFile = () => {
    console.log('Attach file');
  };

  const handleAddImage = () => {
    console.log('Add image');
  };

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleCall = () => {
    console.log('Initiating call');
  };

  const handleVideoCall = () => {
    console.log('Initiating video call');
  };

  const handleShowInfo = () => {
    setShowContactDetails(!showContactDetails);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className={`messages-chat ${sidebarCollapsed ? 'messages-chat--sidebar-collapsed' : 'messages-chat--sidebar-expanded'}`}>
      {/* Left Panel - Conversation List */}
      <div className="messages-chat-sidebar">
        <div className="messages-chat-sidebar-header">
          <div className="messages-search-container">
            <svg className="messages-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              className="messages-search-input"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoComplete="off"
            />
            {searchQuery && (
              <button 
                className="messages-search-clear" 
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="messages-conversations">
          {/* Recent Section */}
          <div className="messages-section">{searchQuery && (
              <div className="messages-search-results-count">
                {filteredConversations.length} {filteredConversations.length === 1 ? 'result' : 'results'} found
              </div>
            )}
            <div className="messages-section-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="messages-section-title">Recent</h3>
            </div>
            {filteredConversations.length === 0 && searchQuery ? (
              <div className="messages-no-results">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className="messages-no-results-text">No conversations found</p>
                <p className="messages-no-results-hint">Try searching with different keywords</p>
              </div>
            ) : searchQuery ? (
              filteredConversations.map(conversation => (
                <div
                  key={conversation.id}
                  className={`messages-conversation-item ${selectedConversation?.id === conversation.id ? 'messages-conversation-item--active' : ''}`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="messages-conversation-avatar">
                    <img src={conversation.avatar} alt={conversation.name} />
                    {conversation.isOnline && <div className="messages-online-indicator"></div>}
                  </div>
                  <div className="messages-conversation-content">
                    <div className="messages-conversation-header">
                      <span className="messages-conversation-name">{conversation.name}</span>
                      <span className="messages-conversation-time">{conversation.time}</span>
                    </div>
                    <div className="messages-conversation-info">
                      <span className="messages-conversation-org">{conversation.organization}</span>
                    </div>
                    <div className="messages-conversation-preview">
                      {conversation.lastMessage}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredConversations.slice(0, 3).map(conversation => (
                <div
                  key={conversation.id}
                  className={`messages-conversation-item ${selectedConversation?.id === conversation.id ? 'messages-conversation-item--active' : ''}`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="messages-conversation-avatar">
                    <img src={conversation.avatar} alt={conversation.name} />
                    {conversation.isOnline && <div className="messages-online-indicator"></div>}
                  </div>
                  <div className="messages-conversation-content">
                    <div className="messages-conversation-header">
                      <span className="messages-conversation-name">{conversation.name}</span>
                      <span className="messages-conversation-time">{conversation.time}</span>
                    </div>
                    <div className="messages-conversation-info">
                      <span className="messages-conversation-org">{conversation.organization}</span>
                    </div>
                    <div className="messages-conversation-preview">
                      {conversation.lastMessage}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* All Messages Section - Only show when not searching */}
          {!searchQuery && (
            <div className="messages-section">
              <div className="messages-section-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="messages-section-title">All Message</h3>
              </div>
              {filteredConversations.slice(3).map(conversation => (
              <div
                key={conversation.id}
                className={`messages-conversation-item ${selectedConversation?.id === conversation.id ? 'messages-conversation-item--active' : ''}`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="messages-conversation-avatar">
                  <img src={conversation.avatar} alt={conversation.name} />
                  {conversation.isOnline && <div className="messages-online-indicator"></div>}
                </div>
                <div className="messages-conversation-content">
                  <div className="messages-conversation-header">
                    <span className="messages-conversation-name">{conversation.name}</span>
                    <span className="messages-conversation-time">{conversation.time}</span>
                  </div>
                  <div className="messages-conversation-info">
                    <span className="messages-conversation-org">{conversation.organization}</span>
                  </div>
                  <div className="messages-conversation-preview">
                    {conversation.lastMessage}
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Panel - Chat Area */}
      <div className="messages-chat-main">
        {!selectedConversation ? (
          <div className="messages-empty-state">
            <div className="messages-empty-icon">
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 48C0 21.4903 21.4903 0 48 0C74.5097 0 96 21.4903 96 48C96 74.5097 74.5097 96 48 96C21.4903 96 0 74.5097 0 48Z" fill="#F1F5F9"/>
                <path d="M40.0001 48H40.0201M48.0001 48H48.0201M56.0001 48H56.0201M66.0001 48C66.0001 56.836 57.9401 64 48.0001 64C45.0573 64.01 42.1496 63.3615 39.4901 62.102L30.0001 64L32.7901 56.56C31.0241 54.084 30.0001 51.148 30.0001 48C30.0001 39.164 38.0601 32 48.0001 32C57.9401 32 66.0001 39.164 66.0001 48Z" stroke="#43536D" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="messages-empty-title">No Conversation Selected</h2>
            <p className="messages-empty-subtitle">
              Select a conversation from the left to start chatting with investors
            </p>
            <button className="messages-start-btn" onClick={handleStartNewConversation}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Start New Conversation
            </button>
          </div>
        ) : (
          <>
            <div className="messages-chat-header">
              <div className="messages-chat-participant">
                <div className="messages-chat-avatar">
                  <span className="messages-chat-initials">{getInitials(selectedConversation.name)}</span>
                  {selectedConversation.isOnline && <div className="messages-online-dot"></div>}
                </div>
                <div className="messages-chat-info">
                  <h3 className="messages-chat-name">{selectedConversation.name}</h3>
                  <p className="messages-chat-org">{selectedConversation.organization}</p>
                </div>
              </div>
              <div className="messages-chat-actions">
                <button className="messages-action-btn" onClick={handleCall} aria-label="Call">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="messages-action-btn" onClick={handleVideoCall} aria-label="Video Call">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="messages-action-btn" onClick={handleShowInfo} aria-label="Info">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="messages-chat-thread">
              {messages.map(message => (
                <div key={message.id} className={`messages-message ${message.sender === 'me' ? 'messages-message--outgoing' : 'messages-message--incoming'}`}>
                  {message.sender !== 'me' && (
                    <div className="messages-message-avatar">
                      <span className="messages-avatar-initials">{getInitials(selectedConversation.name)}</span>
                    </div>
                  )}
                  <div className="messages-message-content">
                    <div className="messages-message-bubble">
                      {message.text}
                    </div>
                    <div className="messages-message-time">
                      {message.timestamp}
                      {message.sender === 'me' && message.read && (
                        <svg className="messages-read-indicator" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 6L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="messages-composer">
              <div className="messages-composer-input-container">
                <button className="messages-attachment-btn" onClick={handleAttachFile} aria-label="Attach file">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.4399 11.05L12.2499 20.24C11.1241 21.3658 9.59713 21.9983 8.00495 21.9983C6.41277 21.9983 4.88579 21.3658 3.75995 20.24C2.63411 19.1142 2.00162 17.5872 2.00162 15.995C2.00162 14.4028 2.63411 12.8758 3.75995 11.75L12.3299 3.18C13.0805 2.42944 14.099 2.00526 15.1599 2.00526C16.2208 2.00526 17.2393 2.42944 17.9899 3.18C18.7405 3.93056 19.1647 4.94908 19.1647 6.01C19.1647 7.07092 18.7405 8.08944 17.9899 8.84L9.40995 17.41C9.03467 17.7853 8.52542 17.9974 7.99495 17.9974C7.46448 17.9974 6.95523 17.7853 6.57995 17.41C6.20467 17.0347 5.99257 16.5255 5.99257 15.995C5.99257 15.4645 6.20467 14.9553 6.57995 14.58L15.0699 6.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="messages-image-btn" onClick={handleAddImage} aria-label="Add image">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <textarea
                  ref={inputRef}
                  className="messages-composer-input"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="1"
                />
                <button className="messages-emoji-btn" onClick={handleEmojiClick} aria-label="Add emoji">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="9" r="1" fill="currentColor"/>
                    <circle cx="15" cy="9" r="1" fill="currentColor"/>
                  </svg>
                </button>
                <button
                  className="messages-send-btn"
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  aria-label="Send message"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="messages-composer-help">
                Press Enter to send, Shift + Enter for new line
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right Panel - Contact Details Sidebar */}
      {selectedConversation && showContactDetails && (
        <div className="messages-details-sidebar">
          <div className="messages-contact-card">
            <h3 className="messages-contact-title">Founder Contact</h3>
            <div className="messages-contact-header">
              <img src={selectedConversation.avatar} alt={selectedConversation.name} className="messages-contact-avatar-large" />
              <h3 className="messages-contact-name">{selectedConversation.name}</h3>
              <div className="messages-contact-actions">
                <button className="messages-contact-action" aria-label="Edit">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="messages-contact-action" aria-label="Email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="messages-contact-action" onClick={handleCall} aria-label="Call">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="messages-contact-action" aria-label="Open">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="messages-contact-action" aria-label="More">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                    <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
                    <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="messages-contact-info">
              <div className="messages-info-field">
                <span className="messages-info-label">Gender</span>
                <span className="messages-info-value">Female</span>
              </div>
              <div className="messages-info-field">
                <span className="messages-info-label">Contact</span>
                <span className="messages-info-value">+1-555-123-4567</span>
              </div>
              <div className="messages-info-field">
                <span className="messages-info-label">Email ID</span>
                <a href="mailto:sarahjohnson@mail.com" className="messages-info-link">sarahjohnson@mail.com</a>
              </div>
              <div className="messages-info-field messages-info-field--address">
                <span className="messages-info-label">Address</span>
                <span className="messages-info-value">
                  123 Maplewood Drive, Apt 4B<br />
                  Springfield, IL 62704,<br />
                  United States
                </span>
              </div>
            </div>
          </div>

          <div className="messages-investment-card">
            <h4 className="messages-investment-title">Investment Profile</h4>
            <div className="messages-investment-info">
              <div className="messages-investment-row">
                <div className="messages-investment-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="messages-investment-content">
                  <span className="messages-investment-label">Investment Range</span>
                  <span className="messages-investment-value">$2M – $10M</span>
                </div>
              </div>
              <div className="messages-investment-row">
                <div className="messages-investment-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  </svg>
                </div>
                <div className="messages-investment-content">
                  <span className="messages-investment-label">Stage</span>
                  <span className="messages-investment-value">Series A–B</span>
                </div>
              </div>
              <div className="messages-investment-row">
                <div className="messages-investment-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="messages-investment-content">
                  <span className="messages-investment-label">Geographic Focus</span>
                  <span className="messages-investment-value">North America</span>
                </div>
              </div>
              <div className="messages-investment-row">
                <div className="messages-investment-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="messages-investment-content">
                  <span className="messages-investment-label">Investment Focus</span>
                  <div className="messages-focus-tags">
                    <span className="messages-focus-tag">SaaS</span>
                    <span className="messages-focus-tag">FinTech</span>
                    <span className="messages-focus-tag">B2B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}