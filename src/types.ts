export interface CarouselSlide {
  id: string;
  title: string;
  titleAr?: string;
  subtitle: string;
  subtitleAr?: string;
  description?: string;
  descriptionAr?: string;
  tag?: string;
  tagAr?: string;
  imageUrl: string;
  primaryActionText: string;
  primaryActionTextAr?: string;
  primaryActionLink?: string;
  secondaryActionText?: string;
  secondaryActionLink?: string;
  dateBadge?: string;
}

export type NewsCategory = 'All' | 'Press Release' | 'Policy Update' | 'Workforce Bulletin' | 'Recognition' | 'Public Advisory' | 'Initiatives';

export interface NewsArticle {
  id: string;
  title: string;
  titleAr?: string;
  slug: string;
  excerpt: string;
  excerptAr?: string;
  content: string[];
  contentAr?: string[];
  category: NewsCategory;
  publishDate: string;
  author: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
  referenceNumber?: string;
  attachments?: { name: string; size: string; type: string }[];
}

export type EventCategory = 'All' | 'Job Fair' | 'Webinar' | 'Conference' | 'Training' | 'Public Forum';

export interface DepartmentEvent {
  id: string;
  title: string;
  titleAr?: string;
  category: EventCategory;
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  isVirtual: boolean;
  virtualPlatform?: string;
  description: string;
  descriptionAr?: string;
  agenda?: string[];
  speakers?: { name: string; title: string; organization: string }[];
  targetAudience: string;
  registrationOpen: boolean;
  featured?: boolean;
  status?: 'upcoming' | 'past';
  attendeesCount?: string;
  recapSummary?: string;
  recapSummaryAr?: string;
  imageUrl?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  duration: string;
  publishDate: string;
  thumbnailUrl: string;
  videoUrl?: string;
  youtubeId?: string;
  views: string;
  description: string;
  descriptionAr: string;
  speaker?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  captionAr: string;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  titleAr: string;
  date: string;
  category: string;
  categoryAr: string;
  coverImage: string;
  photoCount: number;
  photos: GalleryPhoto[];
  description: string;
  descriptionAr: string;
}

export interface QuickAccessItem {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  badge?: string;
}

export interface RegulationItem {
  id: string;
  title: string;
  titleAr: string;
  lawNumber: string;
  category: 'Law' | 'Regulations' | 'Circulars' | 'Evaluation System' | 'Grievences and Complaints' | string;
  categoryAr: string;
  year: string;
  description: string;
  descriptionAr: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX';
  pdfUrl?: string;
  fileName?: string;
}

export interface InitiativeItem {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  summary: string;
  summaryAr: string;
  details: string[];
  detailsAr: string[];
  imageUrl: string;
  beneficiaries: string;
  beneficiariesAr: string;
  statusBadge: string;
  statusBadgeAr: string;
}

export type GrievanceStatus = 'Pending Review' | 'Under Investigation' | 'Committee Scheduled' | 'Resolved / Approved' | 'Closed / Rejected';
export type GrievanceType = 'Performance Appraisal' | 'Administrative Decision' | 'Leave & Entitlements' | 'Disciplinary Action' | 'Promotion & Grading' | 'Other';

export interface GrievanceRequest {
  id: string;
  referenceNumber: string;
  submissionDate: string;
  employeeName: string;
  civilId: string;
  employeeNumber: string;
  department: string;
  departmentAr?: string;
  email: string;
  phone: string;
  type: GrievanceType;
  typeAr?: string;
  subject: string;
  details: string;
  documentsAttached: string[];
  status: GrievanceStatus;
  adminNotes?: string;
  committeeDecision?: string;
  updatedAt?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  role: string;
  roleAr: string;
  department: string;
  lastLogin?: string;
}

export interface QuickAccessGroup {
  id: string;
  categoryTitle: string;
  categoryTitleAr: string;
  iconType: 'employee' | 'jobseeker' | 'government';
  items: QuickAccessItem[];
}

export interface SocialPost {
  id: string;
  platform: 'x' | 'instagram' | 'youtube' | 'linkedin';
  handle: string;
  author: string;
  avatarUrl: string;
  content: string;
  contentAr?: string;
  postDate: string;
  likes: string;
  shares: string;
  mediaUrl?: string;
  postLink: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  options?: string[];
}
