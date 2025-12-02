import './App.css'
import { useState, useEffect } from 'react'
import { useConversation } from '@elevenlabs/react'
import { IMAGE_URLS } from './imageConfig'

function App() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showIndividualModal, setShowIndividualModal] = useState(false)
  const [showCouplesModal, setShowCouplesModal] = useState(false)
  const [showAdolescentModal, setShowAdolescentModal] = useState(false)
  
  const [conversationState, setConversationState] = useState('idle') // idle, connecting, connected
  
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs');
      setConversationState('connected');
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs');
      setConversationState('idle');
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      setConversationState('idle');
    }
  })

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const timeout = isMobile ? 6000 : 7000;
    
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, timeout);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className={`loader-container ${fadeOut ? 'fade-out' : ''}`}>
          <img src={IMAGE_URLS.loader} alt="SafeStories Loading" className="loader-gif" />
        </div>
      )}
      {!loading && (
    <div className="container">
      <img src={IMAGE_URLS.logo} alt="SafeStories Logo" className="logo" />
      <img src={IMAGE_URLS.door} alt="Blue Door" className="blue-door" />
      
      <h1 className="title">Welcome to SafeStories AI Agent!</h1>
      <p className="subtitle">Always here for your Mental Health</p>
      
      <div className="center-content">
        <img src="https://storage.googleapis.com/safetories-images/AI%20Animation%20SafeStories.gif" alt="AI Animation" className="our-value" />
        
        {conversationState === 'idle' && (
          <button className="start-call-btn" onClick={async () => {
            try {
              setConversationState('connecting');
              await conversation.startSession({ agentId: 'agent_6501kbcnx6kxfqq97w2ya3f1c5pd' });
            } catch (error) {
              console.error('Failed to start conversation:', error);
              setConversationState('idle');
            }
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15Z" fill="white"/>
              <path d="M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12H5C5 15.53 7.61 18.43 11 18.92V21H13V18.92C16.39 18.43 19 15.53 19 12H17Z" fill="white" opacity="0.4"/>
            </svg>
            Talk to us
          </button>
        )}
        
        {conversationState === 'connecting' && (
          <button className="start-call-btn connecting-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15Z" fill="white"/>
              <path d="M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12H5C5 15.53 7.61 18.43 11 18.92V21H13V18.92C16.39 18.43 19 15.53 19 12H17Z" fill="white" opacity="0.4"/>
            </svg>
            Connecting...
          </button>
        )}
        
        {conversationState === 'connected' && (
          <div className="conversation-controls">
            <button className="end-call-btn" onClick={async () => {
              await conversation.endSession();
              setConversationState('idle');
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15Z" fill="white"/>
                <path d="M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12H5C5 15.53 7.61 18.43 11 18.92V21H13V18.92C16.39 18.43 19 15.53 19 12H17Z" fill="white" opacity="0.4"/>
              </svg>
              End Conversation
            </button>
            <span className="agent-speaking">Agent is speaking...</span>
          </div>
        )}
      </div>
      
      <div className="action-buttons">
        <button className="btn btn-home" onClick={async () => {
          if (conversationState === 'connected' || conversationState === 'connecting') {
            await conversation.endSession();
            setConversationState('idle');
          }
          window.open('https://www.safestories.in/', '_blank');
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9.02 2.84L3.63 7.04C2.73 7.74 2 9.23 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29 21.19 7.74 20.2 7.05L14.02 2.72C12.62 1.74 10.37 1.79 9.02 2.84Z" fill="#6E6E6E"/>
          </svg>
          Home
        </button>
        
        <button className="btn btn-consultation" onClick={async () => {
          if (conversationState === 'connected' || conversationState === 'connecting') {
            await conversation.endSession();
            setConversationState('idle');
          }
          window.open('https://freeconsultation.dayschedule.com/free-consultation-safestories', '_blank');
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M16.0755 2H19.4615C20.8637 2 22 3.14585 22 4.55996V7.97452C22 9.38864 20.8637 10.5345 19.4615 10.5345H16.0755C14.6732 10.5345 13.537 9.38864 13.537 7.97452V4.55996C13.537 3.14585 14.6732 2 16.0755 2Z" fill="#130F26"/>
            <path d="M7.9248 13.4658C9.3269 13.466 10.4628 14.6114 10.4629 16.0254V19.4404C10.4627 20.8533 9.3268 21.9998 7.9248 22H4.53809C3.13615 21.9998 2.00021 20.8533 2 19.4404V16.0254C2.00005 14.6115 3.13605 13.4661 4.53809 13.4658H7.9248ZM19.4619 13.4658C20.864 13.4661 22 14.6115 22 16.0254V19.4404C21.9998 20.8533 20.8639 21.9998 19.4619 22H16.0752C14.6732 21.9998 13.5373 20.8533 13.5371 19.4404V16.0254C13.5372 14.6114 14.6731 13.466 16.0752 13.4658H19.4619ZM7.9248 2C9.3268 2.00017 10.4627 3.14575 10.4629 4.55957V7.97461C10.4628 9.38858 9.3269 10.534 7.9248 10.5342H4.53809C3.13605 10.5339 2.00005 9.38853 2 7.97461V4.55957C2.00021 3.14579 3.13615 2.00024 4.53809 2H7.9248Z" fill="#130F26"/>
          </svg>
          Free Consultation
        </button>
        
        <button className="btn btn-schedule" onClick={async () => {
          if (conversationState === 'connected' || conversationState === 'connecting') {
            await conversation.endSession();
            setConversationState('idle');
          }
          setShowScheduleModal(true);
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 9.25696V16.9308C21 20.0698 19.0237 22.0001 15.8623 22.0001H8.12695C4.99554 22 3.00012 20.0299 3 16.8702V9.25696H21ZM16.041 16.3907C15.5866 16.4007 15.2206 16.7804 15.2305 17.2404C15.2307 17.7002 15.5965 18.08 16.0508 18.09C16.5148 18.0898 16.8904 17.7101 16.8906 17.2404C16.8906 16.7715 16.515 16.3909 16.0508 16.3907H16.041ZM7.91016 16.38C7.45571 16.401 7.09961 16.7804 7.09961 17.2404C7.11956 17.7001 7.49503 18.061 7.94922 18.0402C8.39378 18.0212 8.74925 17.6408 8.72949 17.1808C8.71952 16.7309 8.35459 16.3801 7.91016 16.38ZM11.9805 16.38C11.526 16.401 11.1699 16.7804 11.1699 17.2404C11.1899 17.7001 11.5653 18.061 12.0195 18.0402C12.4641 18.0212 12.8196 17.6408 12.7998 17.1808C12.7898 16.7309 12.4249 16.3801 11.9805 16.38ZM7.91992 12.7501C7.46564 12.7711 7.10962 13.1507 7.10938 13.6105C7.12913 14.0693 7.50472 14.431 7.95898 14.4103C8.40355 14.3913 8.75999 14.0109 8.74023 13.5499C8.73034 13.101 8.36446 12.7502 7.91992 12.7501ZM11.9805 12.7501C11.5262 12.7711 11.1702 13.1507 11.1699 13.6105C11.1897 14.0694 11.5652 14.4311 12.0195 14.4103C12.4641 14.3913 12.8196 14.0109 12.7998 13.5499C12.7899 13.101 12.4249 12.7502 11.9805 12.7501ZM16.0508 12.7609C15.5964 12.7709 15.2404 13.1408 15.2402 13.6007V13.6105C15.2501 14.0695 15.6257 14.4202 16.0801 14.4103C16.5246 14.4013 16.88 14.0207 16.8701 13.5607C16.8502 13.1199 16.4951 12.761 16.0508 12.7609Z" fill="white"/>
            <path opacity="0.4" d="M3.00336 9.25687C3.0162 8.66987 3.0656 7.50487 3.15846 7.12987C3.63267 5.02087 5.24298 3.68087 7.54485 3.48987H16.4559C18.738 3.69087 20.3681 5.03987 20.8423 7.12987C20.9342 7.49487 20.9836 8.66887 20.9964 9.25687H3.00336Z" fill="white"/>
            <path d="M8.30486 6.59C8.73955 6.59 9.06556 6.261 9.06556 5.82V2.771C9.06556 2.33 8.73955 2 8.30486 2C7.87017 2 7.54416 2.33 7.54416 2.771V5.82C7.54416 6.261 7.87017 6.59 8.30486 6.59Z" fill="white"/>
            <path d="M15.6949 6.59C16.1197 6.59 16.4556 6.261 16.4556 5.82V2.771C16.4556 2.33 16.1197 2 15.6949 2C15.2603 2 14.9342 2.33 14.9342 2.771V5.82C14.9342 6.261 15.2603 6.59 15.6949 6.59Z" fill="white"/>
          </svg>
          Schedule a Session
        </button>
        
        <button className="btn btn-whatsapp" onClick={async () => {
          if (conversationState === 'connected' || conversationState === 'connecting') {
            await conversation.endSession();
            setConversationState('idle');
          }
          window.open('http://wa.me/917972979678?text=hi', '_blank');
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="white"/>
          </svg>
          Chat with us
        </button>
      </div>

      
      <footer className="footer">©️ 2025 SafeStories, SAFETY AND YOU WELLBEING CENTRE LLP. All Rights Reserved!</footer>

      {showAdolescentModal && (
        <div className="modal-overlay" onClick={() => setShowAdolescentModal(false)}>
          <div className="modal-content modal-therapists" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title-center">Adolescent Therapy (13+)</h2>
            
            <div className="therapist-card therapist-active" onClick={() => window.open('https://anjalipillai.dayschedule.com/adolescent-therapy-session-with-anjali', '_blank')}>
              <div className="therapist-avatar">
                <img src={IMAGE_URLS.anjali_pillai} alt="Anjali Pillai" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Anjali Pillai</h3>
                <p>Executive Psychologist | Online & In-person (Pune only) | ₹1700/session</p>
              </div>
            </div>

            <div className="therapist-card therapist-inactive" onClick={() => window.open('https://ishika.dayschedule.com/adolescent-session-ishika', '_blank')}>
              <div className="therapist-avatar therapist-avatar-alt">
                <img src={IMAGE_URLS.ishika_mahajan} alt="Ishika Mahajan" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Ishika Mahajan</h3>
                <p>Psychologist | Online & In-person (Pune only) | ₹1700/session</p>
              </div>
            </div>

            <div className="therapist-card therapist-inactive disabled">
              <div className="therapist-avatar therapist-avatar-alt">
                <img src={IMAGE_URLS.aastha_yagnik} alt="Aastha Yagnik" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Aastha Yagnik</h3>
                <p>Senior Psychotherapist | Online Only | ₹3000/session</p>
              </div>
            </div>

            <div className="therapist-card therapist-active disabled">
              <div className="therapist-avatar">
                <img src={IMAGE_URLS.indrayani_hinge} alt="Indrayani Hinge" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Indrayani Hinge</h3>
                <p>Jr. Psychologist | Online & In-person (Pune only) | ₹1200/session</p>
              </div>
            </div>

            <div className="therapist-card therapist-active disabled">
              <div className="therapist-avatar">
                <img src={IMAGE_URLS.ambika_vaidya} alt="Ambika Vaidya" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Ambika Vaidya</h3>
                <p>Jr. Psychologist | Online & In-person (Pune only) | ₹1200/session</p>
              </div>
            </div>

            <div className="therapist-card therapist-inactive disabled">
              <div className="therapist-avatar therapist-avatar-alt">
                <img src={IMAGE_URLS.muskan_negi} alt="Muskan Negi" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Muskan Negi</h3>
                <p>Jr. Psychologist | Online & In-person (Pune only) | ₹1200/session</p>
              </div>
            </div>

            <button className="go-back-btn" onClick={() => { setShowAdolescentModal(false); setShowScheduleModal(true); }}>Go Back</button>
          </div>
        </div>
      )}

      {showCouplesModal && (
        <div className="modal-overlay" onClick={() => setShowCouplesModal(false)}>
          <div className="modal-content modal-therapists" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title-center">Couples Therapy</h2>
            
            <div className="therapist-card therapist-single" onClick={() => window.open('https://ishika.dayschedule.com/couple-therapy-ishika', '_blank')}>
              <div className="therapist-avatar therapist-avatar-alt">
                <img src={IMAGE_URLS.ishika_mahajan} alt="Ishika Mahajan" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Ishika Mahajan</h3>
                <p>Psychologist | Online & In-person (Pune only) | ₹2500/session</p>
              </div>
            </div>

            <button className="go-back-btn" onClick={() => { setShowCouplesModal(false); setShowScheduleModal(true); }}>Go Back</button>
          </div>
        </div>
      )}

      {showIndividualModal && (
        <div className="modal-overlay" onClick={() => setShowIndividualModal(false)}>
          <div className="modal-content modal-therapists" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title-center">Individual Therapy (18+)</h2>
            
            <div className="therapist-card therapist-active" onClick={() => window.open('https://anjalipillai.dayschedule.com/individual-session-with-anjalipillai', '_blank')}>
              <div className="therapist-avatar">
                <img src={IMAGE_URLS.anjali_pillai} alt="Anjali Pillai" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Anjali Pillai</h3>
                <p>Executive Psychologist | Online & In-person (Pune only) | ₹1700/session</p>
              </div>
            </div>

            <div className="therapist-card therapist-inactive" onClick={() => window.open('https://ishika.dayschedule.com/session-with-ishika', '_blank')}>
              <div className="therapist-avatar therapist-avatar-alt">
                <img src={IMAGE_URLS.ishika_mahajan} alt="Ishika Mahajan" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Ishika Mahajan</h3>
                <p>Psychologist | Online & In-person (Pune only) | ₹1700/session</p>
              </div>
            </div>

            <div className="therapist-card therapist-inactive disabled">
              <div className="therapist-avatar therapist-avatar-alt">
                <img src={IMAGE_URLS.aastha_yagnik} alt="Aastha Yagnik" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Aastha Yagnik</h3>
                <p>Senior Psychotherapist | Online Only | ₹3000/session</p>
              </div>
            </div>

            <div className="therapist-card therapist-active disabled">
              <div className="therapist-avatar">
                <img src={IMAGE_URLS.indrayani_hinge} alt="Indrayani Hinge" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Indrayani Hinge</h3>
                <p>Jr. Psychologist | Online & In-person (Pune only) | ₹1200/session</p>
              </div>
            </div>

            <div className="therapist-card therapist-active disabled">
              <div className="therapist-avatar">
                <img src={IMAGE_URLS.ambika_vaidya} alt="Ambika Vaidya" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Ambika Vaidya</h3>
                <p>Jr. Psychologist | Online & In-person (Pune only) | ₹1200/session</p>
              </div>
            </div>

            <div className="therapist-card therapist-inactive disabled">
              <div className="therapist-avatar therapist-avatar-alt">
                <img src={IMAGE_URLS.muskan_negi} alt="Muskan Negi" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="therapist-info">
                <h3>Muskan Negi</h3>
                <p>Jr. Psychologist | Online & In-person (Pune only) | ₹1200/session</p>
              </div>
            </div>

            <button className="go-back-btn" onClick={() => { setShowIndividualModal(false); setShowScheduleModal(true); }}>Go Back</button>
          </div>
        </div>
      )}

      {showScheduleModal && (
        <div className="modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowScheduleModal(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="#2D7579" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <h2 className="modal-title">Select Therapy Type</h2>
            
            <div className="therapy-option therapy-individual" onClick={() => { setShowScheduleModal(false); setShowIndividualModal(true); }}>
              <div className="therapy-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z" fill="white" opacity="0.4"/>
                  <path d="M20 22C13.3726 22 8 24.6863 8 28V30C8 31.1046 8.89543 32 10 32H30C31.1046 32 32 31.1046 32 30V28C32 24.6863 26.6274 22 20 22Z" fill="white"/>
                </svg>
              </div>
              <div className="therapy-text">
                <h3>Individual Therapy (18+)</h3>
                <p>Focused on personal growth and emotional wellbeing</p>
              </div>
            </div>

            <div className="therapy-option therapy-couples" onClick={() => { setShowScheduleModal(false); setShowCouplesModal(true); }}>
              <div className="therapy-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M14 20C16.7614 20 19 17.7614 19 15C19 12.2386 16.7614 10 14 10C11.2386 10 9 12.2386 9 15C9 17.7614 11.2386 20 14 20Z" fill="#130F26" opacity="0.4"/>
                  <path d="M14 22C9.58172 22 6 24.6863 6 28V29C6 29.5523 6.44772 30 7 30H21C21.5523 30 22 29.5523 22 29V28C22 24.6863 18.4183 22 14 22Z" fill="#130F26"/>
                  <path d="M26 20C28.7614 20 31 17.7614 31 15C31 12.2386 28.7614 10 26 10C23.2386 10 21 12.2386 21 15C21 17.7614 23.2386 20 26 20Z" fill="#130F26" opacity="0.4"/>
                  <path d="M26 22C21.5817 22 18 24.6863 18 28V29C18 29.5523 18.4477 30 19 30H33C33.5523 30 34 29.5523 34 29V28C34 24.6863 30.4183 22 26 22Z" fill="#130F26"/>
                </svg>
              </div>
              <div className="therapy-text">
                <h3>Couples Therapy</h3>
                <p>Focused to help partners improve communication, resolve conflicts, and strengthen their relationship</p>
              </div>
            </div>

            <div className="therapy-option therapy-adolescent" onClick={() => { setShowScheduleModal(false); setShowAdolescentModal(true); }}>
              <div className="therapy-icon">
                <svg width="40" height="40" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36.6052 4.40467C35.751 3.53172 34.4869 3.20884 33.3081 3.55051L5.82103 11.4925C4.57736 11.8376 3.69586 12.8233 3.4584 14.0738C3.21582 15.3483 4.06315 16.9678 5.17015 17.6443L13.7648 22.8923C14.6463 23.4321 15.784 23.2971 16.5135 22.566L26.3552 12.7243C26.8506 12.21 27.6706 12.21 28.166 12.7243C28.6614 13.218 28.6614 14.0226 28.166 14.5351L18.3072 24.3768C17.5761 25.108 17.4394 26.2423 17.9775 27.1255L23.2289 35.7526C23.8439 36.7759 24.9031 37.3584 26.0648 37.3584C26.2014 37.3584 26.3552 37.3584 26.4919 37.3396C27.8244 37.1705 28.8835 36.2634 29.2764 34.9821L37.4252 7.70176C37.7839 6.54009 37.4594 5.27592 36.6052 4.40467Z" fill="#130F26"/>
                  <path opacity="0.4" d="M14.3338 32.7007C14.8343 32.2022 15.6459 32.2021 16.1463 32.7007C16.6451 33.2012 16.6451 34.0136 16.1463 34.5142L13.8123 36.8452C13.5629 37.0963 13.235 37.2212 12.907 37.2212C12.5791 37.2212 12.2512 37.0963 12.0018 36.8452C11.5014 36.3447 11.5013 35.5352 12.0018 35.0347L14.3338 32.7007ZM12.9949 26.23C13.4955 25.7312 14.3069 25.7312 14.8074 26.23C15.3062 26.7305 15.3062 27.5419 14.8074 28.0425L12.4734 30.3745C12.2241 30.6255 11.8961 30.7505 11.5682 30.7505C11.2402 30.7505 10.9123 30.6256 10.6629 30.3745C10.1624 29.874 10.1626 29.0645 10.6629 28.564L12.9949 26.23ZM6.56915 24.1929C7.06963 23.6941 7.8811 23.6942 8.38165 24.1929C8.88049 24.6934 8.88049 25.5048 8.38165 26.0054L6.04865 28.3374C5.79934 28.5884 5.47123 28.7133 5.14337 28.7134C4.81537 28.7134 4.48654 28.5885 4.23712 28.3374C3.73689 27.837 3.737 27.0274 4.23712 26.5269L6.56915 24.1929Z" fill="#130F26"/>
                </svg>
              </div>
              <div className="therapy-text">
                <h3>Adolescent Therapy (13+)</h3>
                <p>Focused to support teens dealing with academic pressure, emotional challenges, and behavioral concerns.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    )}
    </>
  )
}

export default App
