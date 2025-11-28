import './App.css'
import { useState, useEffect } from 'react'
import { useConversation } from '@elevenlabs/react'
import Loader from './Loader'
import { IMAGE_URLS } from './imageConfig'

function App() {
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
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js';
    script.id = 'aisensy-wa-widget';
    script.setAttribute('widget-id', 'aaarap');
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('aisensy-wa-widget');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [])

  return (
    <div className="container">
      <img src={IMAGE_URLS.logo} alt="SafeStories Logo" className="logo" />
      <img src={IMAGE_URLS.door} alt="Blue Door" className="blue-door" />
      
      <h1 className="title">Welcome to SafeStories AI Agent!</h1>
      <p className="subtitle">Co-create your well-being journey with us</p>
      
      <div className="center-content">
        <Loader />
        
        {conversationState === 'idle' && (
          <button className="start-call-btn" onClick={async () => {
            try {
              setConversationState('connecting');
              await conversation.startSession({ agentId: 'agent_0701kazhwzywftzbf33rq27eaa36' });
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
        <button className="btn btn-schedule" onClick={() => setShowScheduleModal(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Schedule a Session
        </button>
        
        <button className="btn btn-consultation" onClick={() => window.open('https://freeconsultation.dayschedule.com/free-consultation-safestories', '_blank')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z" stroke="black" strokeWidth="1.5" strokeMiterlimit="10"/>
          </svg>
          Book a Free Consultation
        </button>
        
        <button className="btn btn-home" onClick={() => window.open('https://www.safestories.in/', '_blank')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9.02 2.84L3.63 7.04C2.73 7.74 2 9.23 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29 21.19 7.74 20.2 7.05L14.02 2.72C12.62 1.74 10.37 1.79 9.02 2.84Z" fill="#6E6E6E"/>
          </svg>
          Home
        </button>
      </div>
      
      <button className="chat-with-us-btn" onClick={() => window.open('https://wa.me/your-number', '_blank')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="white"/>
        </svg>
        Chat with us
      </button>
      
      <footer className="footer">All Rights Reserved. 2025 SafeStories.</footer>

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
  )
}

export default App
