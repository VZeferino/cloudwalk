"use client";

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="p-4 flex justify-end">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 border rounded text-sm font-medium"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default DarkModeToggle;
