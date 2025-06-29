/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调 - 基于 rgb(0, 171, 85) 的绿色系（专业、自然、成长）
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#00ab55', // rgb(0, 171, 85) - 主品牌色
          600: '#009648',
          700: '#00803d',
          800: '#006b33',
          900: '#00562a',
          950: '#003d1f',
        },
        // 辅助色 - 温暖的米白色系（清新、自然）
        secondary: {
          50: '#fefefe',
          100: '#fdfdfd',
          200: '#f8f9fa',
          300: '#f1f3f4',
          400: '#e8eaed',
          500: '#dadce0',
          600: '#bdc1c6',
          700: '#9aa0a6',
          800: '#5f6368',
          900: '#3c4043',
          950: '#202124',
        },
        // 强调色 - 清新的蓝绿色系（智能、可信、清新）
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // 成功色 - 柔和绿色
        success: {
          50: '#f6fdf6',
          100: '#e8fce8',
          200: '#d1f7d1',
          300: '#a7eda7',
          400: '#75db75',
          500: '#4ade80',
          600: '#22c55e',
          700: '#16a34a',
          800: '#15803d',
          900: '#14532d',
          950: '#052e16',
        },
        // 警告色 - 柔和琥珀色
        warning: {
          50: '#fffcf5',
          100: '#fef7e6',
          200: '#fdecc8',
          300: '#fbdb9e',
          400: '#f8c572',
          500: '#f4a952',
          600: '#e88c30',
          700: '#d97706',
          800: '#b45309',
          900: '#92400e',
          950: '#451a03',
        },
        // 错误色 - 柔和红色
        error: {
          50: '#fef7f7',
          100: '#feebeb',
          200: '#fddcdc',
          300: '#fbbfbf',
          400: '#f79393',
          500: '#f06767',
          600: '#e53e3e',
          700: '#c53030',
          800: '#9c2626',
          900: '#7d1f1f',
          950: '#450a0a',
        },
        // 中性色系 - 清新的象牙白色系
        neutral: {
          50: '#fefefe',
          100: '#fcfcfc',
          200: '#f7f8f9',
          300: '#f0f2f5',
          400: '#e4e6ea',
          500: '#8a8d91',
          600: '#65676b',
          700: '#4b4f56',
          800: '#3a3b3c',
          900: '#242526',
          950: '#18191a',
        },
        // 清新色系 - 专为清新设计的浅色调
        fresh: {
          50: '#f8fffe',
          100: '#f0fdf9',
          200: '#e6fffa',
          300: '#d1fae5',
          400: '#a7f3d0',
          500: '#6ee7b7',
          600: '#34d399',
          700: '#10b981',
          800: '#059669',
          900: '#047857',
          950: '#064e3b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        japanese: ['Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(0, 171, 85, 0.15)',
        'glow-lg': '0 0 30px rgba(0, 171, 85, 0.2)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
