interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  white?: boolean;
}

const heightMap = { sm: "h-8", md: "h-10", lg: "h-14" };

const Logo = ({ size = "md", white = false }: LogoProps) => (
  <img
    src={white ? "/logo-branco.png" : "/logo-colorido.png"}
    alt="PitStop RH"
    className={`${heightMap[size]} w-auto object-contain select-none`}
    draggable={false}
  />
);

export default Logo;
