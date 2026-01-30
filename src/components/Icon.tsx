import { HiDocumentMagnifyingGlass, HiEnvelope, HiMoon, HiSun } from "react-icons/hi2";
import { GrNotes } from "react-icons/gr";
import { ImLab } from "react-icons/im";
import { IoMdContact } from "react-icons/io";

interface IconProps {
  name: 'notes' | 'lab' | 'paper' | 'contact' | 'newsletter' | 'moon' | 'sun';
  size?: string;
}

const iconMap = {
  notes: GrNotes,
  lab: ImLab,
  paper: HiDocumentMagnifyingGlass,
  contact: IoMdContact,
  newsletter: HiEnvelope,
  moon: HiMoon,
  sun: HiSun,
};

export default function Icon({ name, size = "20px" }: IconProps) {
  const IconComponent = iconMap[name];
  return <IconComponent size={size} />;
}
