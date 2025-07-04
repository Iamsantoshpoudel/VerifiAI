interface PhotoChatMessageProps {
  className?: string;
  massage?: string;
}

export const PhotoChatMessage: React.FC<PhotoChatMessageProps> = ({
  className,
  massage,
}) => {
  return (
    <div
      className={`absolute top-8 max-w-[30.5rem] py-6 px-8  text-black navbar ${className}  rounded-t-xl  font-code text-base lg:top-16 lg:right-[8.75rem] lg:max-w-[17.5rem]`}
    >
      {massage}
    </div>
  );
};
