import { Icon } from '@iconify/react';
import '@/assets/sass/custom/loader.scss'; // Si prefieres CSS-in-JS puedes usar styled-components

export const Loader = ({ size = 'medium', background = false }) => {
  const sizes = {
    small: '40px',
    medium: '60px',
    large: '80px'
  };

  return (
    <div 
      className={`loader-container ${background ? 'with-background' : ''}`}
      style={{ '--loader-size': sizes[size] }}
    >
      <div className="loader-spinner">
        <Icon 
          icon="svg-spinners:270-ring-with-bg" 
          className="loader-icon" 
        />
      </div>
    </div>
  );
};