const LogoSpinner = () => {
   return (
      <div className="logo-spinner">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            width="120"
            height="120"
         >
            {/* TV Body */}
            <rect
               x="20"
               y="60"
               width="160"
               height="100"
               rx="15"
               fill="#E30613"
            />

            {/* Left Antenna */}
            <g className="antenna sway-left">
               <line
                  x1="100"
                  y1="60"
                  x2="70"
                  y2="20"
                  stroke="#E30613"
                  strokeWidth="8"
                  strokeLinecap="round"
               />
               <circle
                  className="signal"
                  cx="70"
                  cy="20"
                  r="3"
                  fill="#E30613"
               />
            </g>

            {/* Right Antenna */}
            <g className="antenna sway-right">
               <line
                  x1="100"
                  y1="60"
                  x2="130"
                  y2="20"
                  stroke="#E30613"
                  strokeWidth="8"
                  strokeLinecap="round"
               />
               <circle
                  className="signal"
                  cx="130"
                  cy="20"
                  r="3"
                  fill="#E30613"
               />
            </g>

            {/* Parrot Circle */}
            <circle cx="100" cy="110" r="35" fill="white" />

            {/* Rotating Parrot Placeholder (replace with actual path later) */}
            <path
               className="bird"
               d="M100 90c10 5 15 15 10 25s-15 15-25 10"
               fill="none"
               stroke="#E30613"
               strokeWidth="6"
               strokeLinecap="round"
            />
         </svg>
      </div>
   );
};

export default LogoSpinner;
