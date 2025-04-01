

import React, { ReactNode } from 'react';

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  className?: string;
}



const ActionCard = ({ icon, title, className = '' }: ActionCardProps) => {
  return (
    <div className={`flex flex-col items-center p-4 rounded-lg  transition ${className}`}>
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-green-600 mb-2">
        {icon}
      </div>
      <p className="font-medium text-gray-800 text-sm text-center">{title}</p>
    </div>
  );
};

export default ActionCard;