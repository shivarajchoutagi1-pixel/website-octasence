/**
 * Icon wrapper for lucide-react icons
 * Centralized exports for commonly used icons across the application
 */

// Air quality related icons
import {
  AlertTriangle,
  Frown,
  HelpCircle,
  Meh,
  Skull,
  Smile,
  Wind,
} from 'lucide-react';
export const IconGood = Smile;
export const IconModerate = Meh;
export const IconUnhealthy = Frown;
export const IconVeryUnhealthy = AlertTriangle;
export const IconHazardous = Skull;
export const IconNoValue = HelpCircle;
export const IconWind = Wind;

// General UI icons
import {
  CheckCircle,
  Copy,
  Database,
  Download,
  File,
  Globe,
  HandCoins,
  Home,
  MapPin,
  Monitor,
  Package,
  Star,
} from 'lucide-react';
export const IconCopy = Copy;
export const IconGlobe = Globe;
export const IconStar = Star;
export const IconMonitor = Monitor;
export const IconData = Database;
export const IconFile = File;
export const IconCoinsHand = HandCoins;
export const IconMapPin = MapPin;
export const IconPackage = Package;
export const IconCheckCircle = CheckCircle;
export const IconDownload = Download;
export const IconHome = Home;

// Utility icons
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Info,
  Menu,
  Search,
  X,
} from 'lucide-react';
export const IconChevronDown = ChevronDown;
export const IconChevronUp = ChevronUp;
export const IconChevronLeft = ChevronLeft;
export const IconChevronRight = ChevronRight;
export const IconSearch = Search;
export const IconMenu = Menu;
export const IconClose = X;
export const IconExternalLink = ExternalLink;
export const IconInfo = Info;
export const IconAlertCircle = AlertCircle;
export const IconCheck = Check;

// Social icons
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
export const IconTwitter = Twitter;
export const IconFacebook = Facebook;
export const IconLinkedin = Linkedin;
export const IconInstagram = Instagram;
export const IconYoutube = Youtube;

// Helper function to get air quality icon based on category
export const getAirQualityIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'good':
      return IconGood;
    case 'moderate':
      return IconModerate;
    case 'unhealthy for sensitive groups':
    case 'unhealthy':
      return IconUnhealthy;
    case 'very unhealthy':
      return IconVeryUnhealthy;
    case 'hazardous':
      return IconHazardous;
    default:
      return IconNoValue;
  }
};

// Type for icon props (matches lucide-react IconProps)
export type IconProps = {
  size?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number;
};
