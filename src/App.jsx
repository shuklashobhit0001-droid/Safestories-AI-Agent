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



  return (
    <div className="container">
      <img src={IMAGE_URLS.logo} alt="SafeStories Logo" className="logo" />
      <img src={IMAGE_URLS.door} alt="Blue Door" className="blue-door" />
      
      <h1 className="title">Welcome to SafeStories AI Agent!</h1>
      <p className="subtitle">Always here for your Mental Health</p>
      
      <div className="center-content">
        <Loader />
        
        {conversationState === 'idle' && (
          <button className="start-call-btn" onClick={async () => {
            try {
              setConversationState('connecting');
              await conversation.startSession({ agentId: 'agent_8801kb75ybfsf0g9ptsv7cyz4c5t' });
            } catch (error) {
              console.error('Failed to start conversation:', error);
              setConversationState('idle');
            }
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15Z" fill="white"/>
              <path d="M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12H5C5 15.53 7.61 18.43 11 18.92V21H13V18.92C16.39 18.43 19 15.53 19 12H17Z" fill="white" opacity="0.4"/>
            </svg>
            Start a Call
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
        <button className="btn btn-home" onClick={() => window.open('https://www.safestories.in/', '_blank')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9.02 2.84L3.63 7.04C2.73 7.74 2 9.23 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29 21.19 7.74 20.2 7.05L14.02 2.72C12.62 1.74 10.37 1.79 9.02 2.84Z" fill="#6E6E6E"/>
          </svg>
          Home
        </button>
        
        <button className="btn btn-consultation" onClick={() => window.open('https://freeconsultation.dayschedule.com/free-consultation-safestories', '_blank')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M14.4183 5.48988C13.9422 5.40194 13.505 5.70573 13.4144 6.17041C13.3238 6.63509 13.6285 7.08878 14.0916 7.17972C15.4859 7.45153 16.5624 8.53079 16.8353 9.92983V9.93083C16.913 10.3336 17.2675 10.6264 17.6759 10.6264C17.7306 10.6264 17.7854 10.6214 17.8412 10.6114C18.3043 10.5184 18.609 10.0657 18.5184 9.60006C18.1111 7.51049 16.5027 5.8966 14.4183 5.48988Z" fill="#2D7579"/>
            <path opacity="0.4" d="M14.356 2.00793C14.1329 1.97595 13.9088 2.04191 13.7305 2.18381C13.5473 2.32771 13.4328 2.53557 13.4079 2.76841C13.3551 3.23908 13.6947 3.66479 14.1648 3.71776C17.4064 4.07951 19.926 6.60477 20.2905 9.85654C20.3393 10.2922 20.7048 10.621 21.141 10.621C21.1739 10.621 21.2058 10.619 21.2386 10.615C21.4667 10.59 21.6699 10.4771 21.8133 10.2972C21.9557 10.1174 22.0204 9.89351 21.9945 9.66467C21.5404 5.60746 18.4003 2.45862 14.356 2.00793Z" fill="#2D7579"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="#2D7579"/>
          </svg>
          Free Consultation
        </button>
        
        <button className="btn btn-schedule" onClick={() => setShowScheduleModal(true)}>
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 7.25696V14.9308C18 18.0698 16.0237 20.0001 12.8623 20.0001H5.12695C1.99554 20 0.000118438 18.0299 0 14.8702V7.25696H18ZM13.041 14.3907C12.5866 14.4007 12.2206 14.7804 12.2305 15.2404C12.2307 15.7002 12.5965 16.08 13.0508 16.09C13.5148 16.0898 13.8904 15.7101 13.8906 15.2404C13.8906 14.7715 13.515 14.3909 13.0508 14.3907H13.041ZM4.91016 14.38C4.45571 14.401 4.09961 14.7804 4.09961 15.2404C4.11956 15.7001 4.49503 16.061 4.94922 16.0402C5.39378 16.0212 5.74925 15.6408 5.72949 15.1808C5.71952 14.7309 5.35459 14.3801 4.91016 14.38ZM8.98047 14.38C8.52602 14.401 8.16992 14.7804 8.16992 15.2404C8.18987 15.7001 8.56532 16.061 9.01953 16.0402C9.4641 16.0212 9.81956 15.6408 9.7998 15.1808C9.78983 14.7309 9.42487 14.3801 8.98047 14.38ZM4.91992 10.7501C4.46564 10.7711 4.10962 11.1507 4.10938 11.6105C4.12913 12.0693 4.50472 12.431 4.95898 12.4103C5.40355 12.3913 5.75999 12.0109 5.74023 11.5499C5.73034 11.101 5.36446 10.7502 4.91992 10.7501ZM8.98047 10.7501C8.52618 10.7711 8.17017 11.1507 8.16992 11.6105C8.18968 12.0694 8.56519 12.4311 9.01953 12.4103C9.4641 12.3913 9.81956 12.0109 9.7998 11.5499C9.78991 11.101 9.42492 10.7502 8.98047 10.7501ZM13.0508 10.7609C12.5964 10.7709 12.2404 11.1408 12.2402 11.6007V11.6105C12.2501 12.0695 12.6257 12.4202 13.0801 12.4103C13.5246 12.4013 13.88 12.0207 13.8701 11.5607C13.8502 11.1199 13.4951 10.761 13.0508 10.7609Z" fill="#2D7579"/>
            <path opacity="0.4" d="M0.00341797 7.25687C0.016261 6.66987 0.0656573 5.50487 0.158522 5.12987C0.632726 3.02087 2.24304 1.68087 4.54491 1.48987H13.456C15.7381 1.69087 17.3682 3.03987 17.8424 5.12987C17.9343 5.49487 17.9837 6.66887 17.9965 7.25687H0.00341797Z" fill="#2D7579"/>
            <path d="M5.30489 4.59C5.73958 4.59 6.06559 4.261 6.06559 3.82V0.771C6.06559 0.33 5.73958 0 5.30489 0C4.8702 0 4.54419 0.33 4.54419 0.771V3.82C4.54419 4.261 4.8702 4.59 5.30489 4.59Z" fill="#2D7579"/>
            <path d="M12.6949 4.59C13.1197 4.59 13.4556 4.261 13.4556 3.82V0.771C13.4556 0.33 13.1197 0 12.6949 0C12.2602 0 11.9342 0.33 11.9342 0.771V3.82C11.9342 4.261 12.2602 4.59 12.6949 4.59Z" fill="#2D7579"/>
          </svg>
          Schedule a Session
        </button>
        
        <button className="btn btn-whatsapp" onClick={() => window.open('http://wa.me/917972979678?text=hi', '_blank')}>
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
  )
}

export default App
