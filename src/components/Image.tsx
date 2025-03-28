
import { useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image = ({ src, alt, className = "" }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  const handleError = () => {
    setError(true);
    // Fallback to a placeholder image
    setIsLoaded(true);
  };
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}
      <img 
        src={error ? "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" : src} 
        alt={alt} 
        className={`transition-all duration-700 w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
      />
    </div>
  );
};

export default Image;
