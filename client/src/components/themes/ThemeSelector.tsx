'use client'
import { Moon, Sun, Palette } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

const colorOptions: { name: string; value: ThemeColors }[] = [
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Violet', value: 'violet' },
  { name: 'Rose', value: 'rose' },
  { name: 'Orange', value: 'orange' },
  { name: 'Red', value: 'red' },
  { name: 'Zinc', value: 'zinc' },
  { name: 'Yellow', value: 'yellow' }
];

export default function ThemeSelector() {
  const { setTheme, theme } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Color mapping for preview swatches
  const getColorPreview = (colorName: string) => {
    const colorMap: Record<string, string> = {
      'blue': '#3b82f6',
      'green': '#22c55e',
      'violet': '#8b5cf6',
      'rose': '#f43f5e',
      'orange': '#f97316',
      'red': '#ef4444',
      'zinc': '#71717a',
      'yellow': '#eab308'
    };
    
    return colorMap[colorName] || '#3b82f6';
  };
  
  return (
    <div className="relative flex items-center gap-2" ref={dropdownRef}>
      {/* Light/Dark Mode Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-md focus-visible:ring-0 border border-input"
        onClick={() => {
          setTheme({
            mode: theme.mode === 'light' ? 'dark' : 'light',
            color: theme.color
          });
        }}
      >
        <Sun
          className={`h-[1.2rem] w-[1.2rem] transition-all text-foreground
            ${theme.mode === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}
        />
        <Moon
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all text-foreground
            ${theme.mode === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}
        />
        <span className="sr-only">Toggle theme</span>
      </Button>
      
      {/* Color Picker Button */}
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-md focus-visible:ring-0 border border-input"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select theme color</span>
        </Button>
        
        {/* Color Picker Dropdown */}
        {showColorPicker && (
          <div className="absolute top-full right-0 mt-2 p-3 bg-background border border-input rounded-md shadow-md z-50 w-[180px]">
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  className={`w-8 h-8 rounded-full border ${
                    theme.color === color.value ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{
                    backgroundColor: getColorPreview(color.value),
                  }}
                  onClick={() => {
                    setTheme({
                      mode: theme.mode,
                      color: color.value
                    });
                    setShowColorPicker(false);
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}