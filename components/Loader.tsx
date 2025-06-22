
export default function Loader() {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen">
        <style>{`
          .absolute {
            position: absolute;
          }
          .inline-block {
            display: inline-block;
          }
          .loader {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 0.25rem;
            max-width: 100%;
          }
          .letter {
            transform-origin: center;
          }
          .letter-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0.1rem;
          }
          .dash {
            animation: dashArray 2s ease-in-out infinite,
              dashOffset 2s linear infinite;
          }
          .spin {
            animation: spinDashArray 2s ease-in-out infinite,
              spin 8s ease-in-out infinite,
              dashOffset 2s linear infinite;
            transform-origin: center;
          }
          @keyframes dashArray {
            0% {
              stroke-dasharray: 0 1 359 0;
            }
            50% {
              stroke-dasharray: 0 359 1 0;
            }
            100% {
              stroke-dasharray: 359 1 0 0;
            }
          }
          @keyframes spinDashArray {
            0% {
              stroke-dasharray: 270 90;
            }
            50% {
              stroke-dasharray: 0 360;
            }
            100% {
              stroke-dasharray: 270 90;
            }
          }
          @keyframes dashOffset {
            0% {
              stroke-dashoffset: 365;
            }
            100% {
              stroke-dashoffset: 5;
            }
          }
          @keyframes spin {
            0% {
              rotate: 0deg;
            }
            12.5%,
            25% {
              rotate: 270deg;
            }
            37.5%,
            50% {
              rotate: 540deg;
            }
            62.5%,
            75% {
              rotate: 810deg;
            }
            87.5%,
            100% {
              rotate: 1080deg;
            }
          }
          @media (max-width: 640px) {
            .letter-size {
              width: 40px;
              height: 40px;
            }
          }
          @media (max-width: 400px) {
            .letter-size {
              width: 32px;
              height: 32px;
            }
          }
        `}</style>
        
        <div className="loader">
          <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
            <defs xmlns="http://www.w3.org/2000/svg">
              {/* Primary gradient */}
              <linearGradient gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0" id="primary">
                <stop stopColor="#048BA8"></stop>
                <stop stopColor="#0B2545" offset="1"></stop>
                <animateTransform repeatCount="indefinite" dur="4s" values="0 32 32;360 32 32" type="rotate" attributeName="gradientTransform"></animateTransform>
              </linearGradient>
              
              {/* Secondary gradient for O */}
              <linearGradient gradientUnits="userSpaceOnUse" y2="0" x2="0" y1="64" x1="0" id="secondary">
                <stop stopColor="#1B065E"></stop>
                <stop stopColor="#0B2545" offset="1"></stop>
                <animateTransform repeatCount="indefinite" keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1" keyTimes="0; 0.25; 0.5; 0.75; 1" dur="6s" values="0 32 32;-270 32 32;-540 32 32;-810 32 32;-1080 32 32" type="rotate" attributeName="gradientTransform"></animateTransform>
              </linearGradient>
            </defs>
          </svg>
          
          {/* P */}
          <div className="letter-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="letter letter-size w-12 h-12 sm:w-14 sm:h-14">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="8" stroke="url(#primary)" d="M 14,8 H 40 C 48,8 54,14 54,22 C 54,30 48,36 40,36 H 14 V 8 Z M 14,36 V 56" className="dash" pathLength="360"></path>
            </svg>
          </div>
          
          {/* O */}
          <div className="letter-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="letter letter-size w-12 h-12 sm:w-14 sm:h-14">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="8" stroke="url(#secondary)" d="M 32 32 m 0 -24 a 24 24 0 1 1 0 48 a 24 24 0 1 1 0 -48" className="spin" pathLength="360"></path>
            </svg>
          </div>
          
          {/* U */}
          <div className="letter-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="letter letter-size w-12 h-12 sm:w-14 sm:h-14">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="8" stroke="url(#primary)" d="M 14,8 V 40 C 14,48 20,56 32,56 C 44,56 50,48 50,40 V 8" className="dash" pathLength="360"></path>
            </svg>
          </div>
          
          {/* D */}
          <div className="letter-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="letter letter-size w-12 h-12 sm:w-14 sm:h-14">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="8" stroke="url(#primary)" d="M 14,8 H 32 C 46,8 54,16 54,32 C 54,48 46,56 32,56 H 14 V 8" className="dash" pathLength="360"></path>
            </svg>
          </div>
          
          {/* E */}
          <div className="letter-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="letter letter-size w-12 h-12 sm:w-14 sm:h-14">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="8" stroke="url(#primary)" d="M 50,8 H 14 V 56 H 50 M 14,32 H 40" className="dash" pathLength="360"></path>
            </svg>
          </div>
          
          {/* L */}
          <div className="letter-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" className="letter letter-size w-12 h-12 sm:w-14 sm:h-14">
              <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="8" stroke="url(#primary)" d="M 14,8 V 56 H 50" className="dash" pathLength="360"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }