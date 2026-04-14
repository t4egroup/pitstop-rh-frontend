interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  white?: boolean;
}

const Logo = ({ size = "md", showTagline = false, white = false }: LogoProps) => {
  const textSize = size === "sm" ? "text-xl" : size === "lg" ? "text-4xl" : "text-2xl";
  const tagSize  = size === "sm" ? "text-[8px]" : size === "lg" ? "text-sm" : "text-[10px]";

  return (
    <div className="flex flex-col items-start leading-none select-none">
      <span className={`${textSize} font-black italic tracking-tight`} style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}>
        <span style={{ color: white ? "#ffffff" : "#31549c" }}>PitStop</span>
        <span style={{ color: "#ea3839" }}> RH</span>
      </span>
      {showTagline && (
        <span className={`${tagSize} font-bold tracking-[0.2em] uppercase`} style={{ color: white ? "rgba(255,255,255,0.5)" : "#888888" }}>
          Consultoria e Serviços
        </span>
      )}
    </div>
  );
};

export default Logo;
