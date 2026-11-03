import React from 'react';

interface TeamFlagProps {
  code: string;
  size?: number;
  className?: string;
}

export default function TeamFlag({ code, size = 24, className = '' }: TeamFlagProps) {
  const c = code.toUpperCase();

  switch (c) {
    case 'PAK':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`rounded-full shrink-0 shadow-2xs border border-white/20 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#0B513E" />
          <path d="M 0 0 L 8 0 L 8 32 L 0 32 Z" fill="#FFFFFF" />
          {/* Crescent */}
          <path
            d="M 21.5 10.5 C 17.5 10.5 14.5 13.5 14.5 17.5 C 14.5 21.5 17.5 24.5 21.5 24.5 C 22.8 24.5 24 24.1 25 23.5 C 22 23 19.8 20.5 19.8 17.5 C 19.8 14.5 22 12 25 11.5 C 24 10.9 22.8 10.5 21.5 10.5 Z"
            fill="#FFFFFF"
          />
          {/* Star */}
          <polygon
            points="23.5,13.5 24.2,15.2 26,15.2 24.5,16.3 25.1,18 23.5,17 21.9,18 22.5,16.3 21,15.2 22.8,15.2"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'NZ':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`rounded-full shrink-0 shadow-2xs border border-white/20 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#00247D" />
          {/* Union Jack mini corner */}
          <path d="M 0 0 L 16 0 L 16 16 L 0 16 Z" fill="#00247D" />
          <path d="M 0 0 L 16 16 M 16 0 L 0 16" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M 0 0 L 16 16 M 16 0 L 0 16" stroke="#CC142B" strokeWidth="1.2" />
          <path d="M 8 0 L 8 16 M 0 8 L 16 8" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M 8 0 L 8 16 M 0 8 L 16 8" stroke="#CC142B" strokeWidth="1.8" />
          {/* Southern Cross Red Stars with White Border */}
          <circle cx="24" cy="10" r="2" fill="#CC142B" stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="20" cy="18" r="1.8" fill="#CC142B" stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="26" cy="20" r="1.8" fill="#CC142B" stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="22" cy="25" r="2" fill="#CC142B" stroke="#FFFFFF" strokeWidth="0.8" />
        </svg>
      );

    case 'IND':
    case 'IND3':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`rounded-full shrink-0 shadow-2xs border border-white/20 ${className}`}
        >
          <clipPath id="circleClip">
            <circle cx="16" cy="16" r="16" />
          </clipPath>
          <g clipPath="url(#circleClip)">
            <rect x="0" y="0" width="32" height="10.6" fill="#FF9933" />
            <rect x="0" y="10.6" width="32" height="10.8" fill="#FFFFFF" />
            <rect x="0" y="21.4" width="32" height="10.6" fill="#128807" />
            {/* Ashoka Chakra */}
            <circle cx="16" cy="16" r="4" fill="none" stroke="#000080" strokeWidth="1" />
            <circle cx="16" cy="16" r="1" fill="#000080" />
            <path
              d="M 16 12 L 16 20 M 12 16 L 20 16 M 13.2 13.2 L 18.8 18.8 M 18.8 13.2 L 13.2 18.8"
              stroke="#000080"
              strokeWidth="0.6"
            />
          </g>
        </svg>
      );

    case 'AUS':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`rounded-full shrink-0 shadow-2xs border border-white/20 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#00008B" />
          {/* Commonwealth Star */}
          <polygon
            points="8,20 9,22.5 11.5,22.5 9.5,24 10.5,26.5 8,25 5.5,26.5 6.5,24 4.5,22.5 7,22.5"
            fill="#FFFFFF"
          />
          {/* Southern cross stars */}
          <circle cx="24" cy="8" r="1.5" fill="#FFFFFF" />
          <circle cx="20" cy="14" r="1.5" fill="#FFFFFF" />
          <circle cx="26" cy="16" r="1.5" fill="#FFFFFF" />
          <circle cx="21" cy="22" r="1.2" fill="#FFFFFF" />
          <circle cx="24" cy="25" r="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'ENG':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`rounded-full shrink-0 shadow-2xs border border-slate-200 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#FFFFFF" />
          <rect x="13.5" y="0" width="5" height="32" fill="#CC142B" />
          <rect x="0" y="13.5" width="32" height="5" fill="#CC142B" />
        </svg>
      );

    case 'SA':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`rounded-full shrink-0 shadow-2xs border border-white/20 ${className}`}
        >
          <clipPath id="saClip">
            <circle cx="16" cy="16" r="16" />
          </clipPath>
          <g clipPath="url(#saClip)">
            <rect x="0" y="0" width="32" height="16" fill="#DE3831" />
            <rect x="0" y="16" width="32" height="16" fill="#002395" />
            {/* Green Y and Black triangle */}
            <polygon points="0,0 14,16 0,32" fill="#000000" />
            <polygon points="0,0 3,0 16,15 32,15 32,17 16,17 3,32 0,32 13,16" fill="#FFB612" />
            <polygon points="0,3 13,16 0,29" fill="#000000" />
            <path
              d="M 0 0 L 16 16 L 32 16 L 32 16 M 0 32 L 16 16"
              stroke="#007A3D"
              strokeWidth="5"
              fill="none"
            />
          </g>
        </svg>
      );

    case 'BAN':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`rounded-full shrink-0 shadow-2xs border border-white/20 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#006A4E" />
          <circle cx="14" cy="16" r="8" fill="#F42A41" />
        </svg>
      );

    case 'SL':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          className={`rounded-full shrink-0 shadow-2xs border border-amber-400 ${className}`}
        >
          <circle cx="16" cy="16" r="16" fill="#FFBE00" />
          <circle cx="16" cy="16" r="14" fill="#8D153A" />
          <rect x="4" y="8" width="3" height="16" fill="#00534E" />
          <rect x="8" y="8" width="3" height="16" fill="#EB7400" />
          <circle cx="21" cy="16" r="4.5" fill="#FFBE00" />
        </svg>
      );

    default:
      return (
        <div
          style={{ width: size, height: size }}
          className={`rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300 shrink-0 ${className}`}
        >
          {code.slice(0, 3)}
        </div>
      );
  }
}

