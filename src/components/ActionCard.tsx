import React, { ReactNode } from 'react';

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  className?: string;
}



const ActionCard = ({ icon, title, className = '' }: ActionCardProps) => {
  return (
    <div className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition ${className}`}>
      <div className="w-10 h-10 rounded-full p-2 bg-[#25BA88] flex items-center justify-center text-white mb-2">
        {icon}
      </div>
      <p className="font-medium text-[#828282] text-sm text-center">{title}</p>
    </div>
  );
};

export default ActionCard;