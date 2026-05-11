/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  User, 
  FileText, 
  Search, 
  ShieldCheck, 
  ClipboardList, 
  Fingerprint, 
  FileCheck, 
  FileWarning, 
  History, 
  LogOut,
  Plus,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  Edit,
  Trash2,
  Camera,
  Upload,
  Download,
  Printer,
  Image as ImageIcon,
  Paperclip,
  MessageSquare,
  MoreVertical,
  Shield,
  Info,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  MapPin,
  X,
  Eye,
  Check,
  FilePlus,
  RotateCcw,
  CheckCircle,
  Database,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface UserProfile {
  id: number;
  username: string;
  name: string;
  role: string;
}

// --- Components ---

const Button = ({ 
  children, 
  icon: Icon, 
  onClick, 
  variant = 'primary',
  className = ""
}: { 
  children: React.ReactNode; 
  icon?: any; 
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  className?: string;
}) => {
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-[4px_4px_0px_0px_rgba(37,99,235,0.2)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
    outline: 'border-2 border-slate-200 text-slate-700 hover:border-slate-900 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
    danger: 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200',
    success: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-200'
  };

  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={18} />}
      <span>{children}</span>
    </button>
  );
};

const MenuCard = ({ 
  title, 
  icon: Icon, 
  onClick,
  description
}: { 
  title: string; 
  icon: any; 
  onClick?: () => void;
  description?: string;
}) => (
  <motion.button
    whileHover={{ scale: 1.01, translateY: -4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex flex-col items-start p-6 bg-white border-2 border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500 transition-all text-left group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
      <Icon size={120} />
    </div>
    <div className="p-3 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all mb-4 shadow-inner">
      <Icon size={24} />
    </div>
    <div className="space-y-1">
      <h3 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase text-xs tracking-widest">{title}</h3>
      {description && <p className="text-xs text-slate-400 font-medium line-clamp-2">{description}</p>}
    </div>
  </motion.button>
);

const SectionHeader = ({ title, icon: Icon }: { title: string, icon?: any }) => (
  <div className="flex items-center gap-4 mb-8 mt-12 first:mt-0">
    <div className="flex items-center gap-3">
      {Icon && <div className="p-2 bg-slate-900 text-white rounded-lg"><Icon size={16} /></div>}
      <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">
        {title}
      </h2>
    </div>
    <div className="flex-1 h-[2px] bg-slate-100 rounded-full"></div>
  </div>
);

const DetailField = ({ label, value, type = 'text', options = [], icon: Icon, readOnly = true, onChange }: { label: string, value: string, type?: 'text' | 'select' | 'date', options?: string[], icon?: any, readOnly?: boolean, onChange?: (val: string) => void }) => (
  <div className="space-y-1.5 group">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-focus-within:text-blue-600 transition-colors">{label}</label>
    <div className="relative">
      {type === 'text' || type === 'date' ? (
        <input 
          type={type} 
          readOnly={readOnly} 
          value={value || ''} 
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
        />
      ) : (
        <select 
          disabled={readOnly} 
          value={value || ''} 
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 appearance-none outline-none focus:border-slate-900 focus:bg-white transition-all"
        >
          <option value="">{value || 'Selecione...'}</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )}
      {Icon && <Icon size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" />}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentView, setCurrentView] = useState<'dashboard' | 'person_list' | 'person_detail' | 'ficha_list' | 'ficha_detail' | 'recognition' | 'rehabilitation_list' | 'document_registration' | 'document_detail' | 'document_search' | 'certificate_list' | 'certificate_registration'>('dashboard');
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [selectedFicha, setSelectedFicha] = useState<any>(null);
  const [persons, setPersons] = useState<any[]>([
    {
      id: 1,
      process_number: '0001', unit: 'ESF', full_name: 'Bruno Fonseca', birth_date: '2010-05-15', gender: 'Masculino', marital_status: 'Solteiro', 
      naturality: 'Cabo Verde', nationality: 'Cabo Verde', father_name: 'António Fonseca', mother_name: 'Maria Fonseca', profession: 'Estudante', 
      doc_type: 'CNI', doc_number: '9884565', doc_issue_date: '2020-10-15', doc_expiry_date: '2025-10-15', doc_issue_location: 'Praia', 
      phone: '9884565', email: 'bruno@email.cv', island: 'Santiago', municipality: 'Praia', parish: 'N.S. Da Graça', locality: 'Cidade Da Praia', zone: 'Txadinha', reference_point: 'Perto da Escola',
      nif: '123456789', status: 'Por Registar', sent_by: 'Agente Mascarenha', sent_date: '2023-03-20', sent_unit: 'ESF Praia', completed_by: null, completed_date: null, completed_unit: null,
      records: [
        {id: 1, person_id: 1, date: '2023-05-12', reason: 'Furto qualificado em residência', ref_note: 'REF-2023-045', destination: 'Ministério Público', measures: 'Termo de Identidade e Residência', type: 'Criminal'}
      ],
      observations: [
        {id: 1, person_id: 1, author: 'Agente Mascarenha', date: '2023-03-20', content: 'O indivíduo demonstrou comportamento cooperativo durante a abordagem inicial, mas apresentou resistência ao ser informado sobre a detenção.'},
        {id: 2, person_id: 1, author: 'Inspetor Tavares', date: '2024-10-11', content: 'Evidências coletadas no local confirmam a participação direta do suspeito no evento reportado. Relatório detalhado anexo ao processo físico.'}
      ]
    }
  ]);
  const [fichas, setFichas] = useState<any[]>([
    { 
      id: 1, 
      number: '0006', 
      name: 'Bruno Fonseca', 
      birthDate: '1998-04-29', 
      island: 'Santiago',
      complementaryGroups: [
        {
          id: 1,
          createdAt: '2025-01-07',
          validFrom: '2025-01-07',
          validTo: null,
          user: 'Paulo',
          otherNotes: 'Indivíduo apresenta-se calmo durante o registo.',
          characteristics: [
            { name: 'Altura', value: '1.85', observation: 'Medido com calçado' },
            { name: 'Constituição Física', value: 'Atlético', observation: '' },
            { name: 'Cabelo', value: 'Curto', observation: 'Corte militar' },
            { name: 'Cor', value: 'Preto', observation: '' },
            { name: 'Barba', value: 'Sim', observation: 'Bem aparada' },
            { name: 'Bigode', value: 'Sim', observation: 'Estilo clássico' },
            { name: 'Boca', value: 'Média', observation: '' },
            { name: 'Naris', value: 'Reto', observation: '' },
            { name: 'Orelha', value: 'Pequena', observation: '' },
            { name: 'Olhos', value: 'Castanhos', observation: '' },
            { name: 'Rosto', value: 'Oval', observation: '' },
            { name: 'Tatuagens', value: 'Tribal no braço', observation: 'Braço direito' },
            { name: 'Cicatrizes', value: 'No queixo', observation: 'Pequena cicatriz de infância' }
          ]
        },
        {
          id: 2,
          createdAt: '2023-05-15',
          validFrom: '2023-05-15',
          validTo: '2025-01-06',
          user: 'Maria',
          closedBy: 'Paulo',
          otherNotes: 'Registo inicial de rotina.',
          characteristics: [
            { name: 'Altura', value: '1.83', observation: '' },
            { name: 'Constituição Física', value: 'Magro', observation: '' },
            { name: 'Cabelo', value: 'Comprido', observation: '' }
          ]
        }
      ],
      addresses: [
        { id: 1, createdAt: '2024-02-24', validFrom: '2024-02-24', validTo: null, user: 'Paulo', type: 'Residencia', island: 'Santiago', council: 'Praia', parish: 'N.S Da Graça', locality: 'São Filipe', reference: 'Perto enacol' }
      ],
      contacts: [
        { id: 1, createdAt: '2024-02-24', validFrom: '2024-02-24', validTo: null, user: 'Paulo', type: 'Telemovel', info: '9843347' },
        { id: 2, createdAt: '2024-02-24', validFrom: '2024-02-24', validTo: null, user: 'Paulo', type: 'Email', info: 'joai@gmail.com' }
      ],
      nicknames: [
        { id: 1, createdAt: '2024-02-24', validFrom: '2024-02-24', validTo: null, user: 'Paulo', value: 'Manxedo' }
      ],
      socialNetworks: [
        { id: 1, createdAt: '2024-02-24', validFrom: '2024-02-24', validTo: null, user: 'Paulo', type: 'Facebook', link: 'facebook.com/bruno' }
      ],
      registrationReasons: [
        { id: 1, date: '10/10/2024', reason: 'Detenção em flagrante delito', refNo: '---', destination: '---', measures: '---', type: 'Criminal', status: 'Aguardando Reabilitação', 
          rehabilitationDetails: {
            reason: 'O indivíduo cumpriu a pena e demonstrou bom comportamento nos últimos 5 anos, sem novos registros criminais.',
            attachments: [
              { name: 'certidao_judicial.pdf', size: 1024 * 450 },
              { name: 'comprovativo_residencia.pdf', size: 1024 * 120 }
            ],
            requestedAt: '29/04/2025',
            requestedBy: 'Agente Bruno Fonseca'
          }
        },
        { id: 2, date: '10/10/2024', reason: 'Detenção em flagrante delito', refNo: '---', destination: '---', measures: '---', type: 'Policial', status: 'Ativo' }
      ],
      photoHistory: [
        { 
          id: 1, 
          createdAt: '2023-01-10', 
          updatedAt: '2024-01-15', 
          createdBy: 'Maria', 
          updatedBy: 'Paulo',
          photos: [
            { label: 'Frontal', seed: 'h1_frontal' },
            { label: 'Perfil Esquerdo', seed: 'h1_left' }
          ]
        },
        { 
          id: 2, 
          createdAt: '2022-05-20', 
          updatedAt: '2023-01-09', 
          createdBy: 'João', 
          updatedBy: 'Maria',
          photos: [
            { label: 'Frontal', seed: 'h2_frontal' },
            { label: 'Tatuagem', seed: 'h2_tattoo' }
          ]
        }
      ]
    },
    { 
      id: 2, 
      number: '123456789', 
      name: 'Alvino Mota', 
      birthDate: '1995-12-15', 
      island: 'Santiago',
      birthPlace: 'Praia',
      fatherName: 'António Mota',
      motherName: 'Maria Mota',
      gender: 'Masculino',
      civilStatus: 'Solteiro(a)',
      nationality: 'Cabo-verdiana',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      addresses: [
        { id: 1, type: 'Residência', island: 'Santiago', council: 'Praia', parish: 'Nossa Senhora da Graça', locality: 'Achada Santo António', reference: 'Próximo ao BCA' }
      ],
      contacts: [
        { id: 1, type: 'Telemovel', info: '9123456' },
        { id: 2, type: 'Email', info: 'alvino@example.com' }
      ],
      docNumber: '123456789',
      nif: '123456789'
    }
  ]);
  const [showAssociateModal, setShowAssociateModal] = useState(false);
  const [hideNewCadastroInAssociate, setHideNewCadastroInAssociate] = useState(false);
  const [associateSearchFilters, setAssociateSearchFilters] = useState({
    number: '',
    name: '',
    surname: '',
    birthDate: '',
    docNumber: ''
  });
  const [associateResults, setAssociateResults] = useState<any[]>([]);
  const [hasSearchedAssociate, setHasSearchedAssociate] = useState(false);
  const [showConfirmAssociate, setShowConfirmAssociate] = useState(false);
  const [personToAssociate, setPersonToAssociate] = useState<any>(null);
  const [associatedPerson, setAssociatedPerson] = useState<any>(null);
  const [suggestedFicha, setSuggestedFicha] = useState<any>(null);
  const [isNewRegistration, setIsNewRegistration] = useState(false);
  const [showConfirmNew, setShowConfirmNew] = useState(false);
  const [showComplementaryModal, setShowComplementaryModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [tempPhotos, setTempPhotos] = useState<any[]>([]);
  const [savedPhotos, setSavedPhotos] = useState<any[]>([]);
  const [currentPhotoTitle, setCurrentPhotoTitle] = useState('Frontal');
  const [showObsModal, setShowObsModal] = useState(false);
  const [editingObs, setEditingObs] = useState<any>(null);
  const [obsContent, setObsContent] = useState('');
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [tempAttachments, setTempAttachments] = useState<any[]>([]);
  const [savedAttachments, setSavedAttachments] = useState<any[]>([]);
  const [attachmentTitle, setAttachmentTitle] = useState('');
  const [attachmentType, setAttachmentType] = useState('Documento');
  const [tempCharacteristics, setTempCharacteristics] = useState<any[]>([]);
  const [savedCharacteristics, setSavedCharacteristics] = useState<any[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [savedContacts, setSavedContacts] = useState<any[]>([]);
  const [savedNicknames, setSavedNicknames] = useState<any[]>([]);
  const [savedSocialNetworks, setSavedSocialNetworks] = useState<any[]>([]);
  const [otherNotes, setOtherNotes] = useState('');
  const [currentCharacteristic, setCurrentCharacteristic] = useState({
    name: '',
    type: '',
    observation: ''
  });
  const [heightRangeFrom, setHeightRangeFrom] = useState('');
  const [heightRangeTo, setHeightRangeTo] = useState('');
  
  const [showComplementaryHistory, setShowComplementaryHistory] = useState(false);
  const [showComplementaryDetailsModal, setShowComplementaryDetailsModal] = useState(false);
  const [selectedComplementaryGroup, setSelectedComplementaryGroup] = useState<any>(null);
  
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddNickname, setShowAddNickname] = useState(false);
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [showAddressDetailsModal, setShowAddressDetailsModal] = useState(false);
  const [selectedAddressDetails, setSelectedAddressDetails] = useState<any>(null);
  
  // Rehabilitation Modal State
  const [showRehabilitationModal, setShowRehabilitationModal] = useState(false);
  const [showRehabilitationDetailsModal, setShowRehabilitationDetailsModal] = useState(false);
  const [selectedReasonForRehab, setSelectedReasonForRehab] = useState<any>(null);
  const [showPhotoHistoryDetailsModal, setShowPhotoHistoryDetailsModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedPhotoGroup, setSelectedPhotoGroup] = useState<any>(null);
  const [rehabilitationReason, setRehabilitationReason] = useState('');
  const [rehabilitationAttachments, setRehabilitationAttachments] = useState<File[]>([]);
  const [showApproveConfirmModal, setShowApproveConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingRehabAction, setPendingRehabAction] = useState<{ficha: any, reg: any} | null>(null);
  
  // Document Registration State
  const [docStep, setDocStep] = useState(1);
  const [docData, setDocData] = useState({
    document: {
      reason: '',
      type: '',
      number: '',
      issueDate: '',
      expiryDate: '',
      fullName: '',
      birthDate: '',
      nationality: '',
      birthPlace: '',
      fatherName: '',
      motherName: '',
      nif: '',
      phone: '',
      photo: null as string | null,
      attachments: [] as File[]
    },
    finder: {
      type: 'Civil',
      name: '',
      idType: '',
      idNumber: '',
      contact: '',
      foundDate: '',
      location: {
        island: '',
        county: '',
        parish: '',
        locality: '',
        zone: '',
        reference: ''
      }
    },
    storage: {
      island: '',
      county: '',
      organicUnit: '',
      observations: ''
    }
  });
  const [certificateStep, setCertificateStep] = useState(1);
  const [certificateSearchFilters, setCertificateSearchFilters] = useState({
    orderNumber: '',
    name: '',
    birthDate: '',
    requestDate: ''
  });
  const [certificateData, setCertificateData] = useState({
    fullName: '',
    birthDate: '',
    gender: '',
    civilStatus: '',
    birthPlace: '',
    nationality: '',
    fatherName: '',
    motherName: '',
    docType: '',
    docNumber: '',
    nif: '',
    island: '',
    county: '',
    parish: '',
    locality: '',
    reference: '',
    phone: '',
    email: '',
    reason: '',
    photo: null as string | null,
    attachments: [] as any[]
  });
  const [ducGenerated, setDucGenerated] = useState(false);
  const [mockCertificates, setMockCertificates] = useState<any[]>([
    {
      id: '000003',
      name: 'Bruno Fonseca',
      birthDate: '29/04/1998',
      requestDate: '19/02/2023',
      status: 'Por Pagar'
    }
  ]);

  // Biographical Search States
  const [bioSearchDocType, setBioSearchDocType] = useState('CNI');
  const [bioSearchName, setBioSearchName] = useState('');
  const [bioSearchDocNumber, setBioSearchDocNumber] = useState('');
  const [bioSearchResults, setBioSearchResults] = useState<any[]>([]);
  const [showBioSearchModal, setShowBioSearchModal] = useState(false);
  const [bioSearchTarget, setBioSearchTarget] = useState<'certificate' | 'document' | null>(null);

  const handleBioSearch = () => {
    const results = fichas.filter(f => {
      const matchName = bioSearchName ? f.name?.toLowerCase().includes(bioSearchName.toLowerCase()) : true;
      const matchDoc = bioSearchDocNumber ? (f.docNumber?.toLowerCase().includes(bioSearchDocNumber.toLowerCase()) || f.number?.toLowerCase().includes(bioSearchDocNumber.toLowerCase())) : true;
      
      // If both are empty, don't return everything unless specified (usually it's better to require at least one)
      if (!bioSearchName && !bioSearchDocNumber) return false;
      
      return matchName && matchDoc;
    });
    setBioSearchResults(results);
    setShowBioSearchModal(true);
  };

  const selectPersonFromSearch = (person: any) => {
    if (bioSearchTarget === 'certificate') {
      setCertificateData({
        ...certificateData,
        fullName: person.name || '',
        birthDate: person.birthDate || '',
        docType: bioSearchDocType,
        docNumber: person.docNumber || person.number || '', // Fallback to number if docNumber not present
        gender: person.gender || 'Masculino',
        civilStatus: person.civilStatus || 'Solteiro(a)',
        birthPlace: person.birthPlace || '',
        nationality: person.nationality || 'Cabo-verdiana',
        fatherName: person.fatherName || '',
        motherName: person.motherName || '',
        nif: person.nif || '',
        // Endereço (if available)
        island: person.addresses?.[0]?.island || '',
        county: person.addresses?.[0]?.council || '',
        parish: person.addresses?.[0]?.parish || '',
        locality: person.addresses?.[0]?.locality || '',
        reference: person.addresses?.[0]?.reference || '',
        // Contacto
        phone: person.contacts?.find((c: any) => c.type === 'Telemovel')?.info || '',
        email: person.contacts?.find((c: any) => c.type === 'Email')?.info || '',
        photo: person.photo || null,
      });
    } else if (bioSearchTarget === 'document') {
      setDocData({
        ...docData,
        document: {
          ...docData.document,
          fullName: person.name || '',
          birthDate: person.birthDate || '',
          nationality: person.nationality || 'Cabo-verdiana',
          birthPlace: person.birthPlace || '',
          fatherName: person.fatherName || '',
          motherName: person.motherName || '',
          nif: person.nif || '',
          phone: person.contacts?.find((c: any) => c.type === 'Telemovel')?.info || '',
          photo: person.photo || null,
        }
      });
    }
    setShowBioSearchModal(false);
    setBioSearchName('');
    setBioSearchDocNumber('');
  };
  const [mockAnalysisCertificates, setMockAnalysisCertificates] = useState<any[]>([
    {
      id: '000004',
      name: 'Manuel Sousa',
      birthDate: '29/04/1998',
      requestDate: '19/02/2023',
      status: 'Por analisar',
      biographic: {
        fullName: 'Manuel Sousa',
        birthDate: '1997-06-27',
        gender: 'Masculino',
        civilStatus: 'Solteiro',
        birthPlace: 'Cabo Verde',
        nationality: 'Cabo-verdiana',
        fatherName: 'Pedro Sousa',
        motherName: 'Maria Sousa',
        docType: 'CNI',
        docNumber: '11485999M0'
      },
      address: {
        island: 'Santiago',
        council: 'Praia',
        parish: 'N.S Da Graça',
        locality: 'Palmarejo',
        reference: 'Perto Paulino'
      },
      contact: {
        mobile: '9876545',
        email: 'manuel@gmail.com'
      },
      reason: 'Matricula Universidade',
      attachments: [
        { name: 'Documento de Identificação.pdf', type: 'pdf' },
        { name: 'Representante Legal.pdf', type: 'pdf' },
        { name: 'Duc', type: 'pdf' }
      ],
      observations: [
        { user: 'Mascarenhas', date: '20/03/2023', text: 'vjhvuj hyasd ubasiud asdabjsd asjdba sdjbsd asaia asi ia a ikabsidubasd ubiasd kbiuasbd kjbasd basidb ibasidb iuasa' }
      ],
      history: [
        { date: '14/03/2024', phase: 'Analise', status: 'Por analisar', user: 'Maria' }
      ]
    }
  ]);
  const [mockDecisionCertificates, setMockDecisionCertificates] = useState<any[]>([]);
  const [selectedAnalysisCertificate, setSelectedAnalysisCertificate] = useState<any>(null);
  const [selectedDecisionCertificate, setSelectedDecisionCertificate] = useState<any>(null);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [registeredDoc, setRegisteredDoc] = useState<any>(null);
  const [isReadOnlyView, setIsReadOnlyView] = useState(false);
  const [docSearchFilters, setDocSearchFilters] = useState({
    type: '',
    number: '',
    fullName: '',
    birthDate: '',
    island: '',
    organicUnit: ''
  });
  const [mockDocuments, setMockDocuments] = useState<any[]>([
    {
      id: '001',
      document: {
        reason: 'Extravio',
        type: 'BI',
        number: '001234567LA041',
        issueDate: '2020-01-01',
        expiryDate: '2030-01-01',
        fullName: 'Bruno Fonseca',
        birthDate: '1998-04-29',
        nationality: 'Cabo-verdiana'
      },
      finder: {
        type: 'Civil',
        name: 'João Silva',
        idType: 'BI',
        idNumber: '123456789',
        contact: '9999999',
        foundDate: '2024-03-01',
        location: {
          island: 'Santiago',
          county: 'Praia',
          parish: 'N.S. Graça',
          locality: 'Platô',
          zone: 'Centro',
          reference: 'Próximo ao mercado'
        }
      },
      storage: {
        island: 'Santiago',
        county: 'Praia',
        organicUnit: 'Esquadra Fazenda',
        observations: 'Documento em bom estado.'
      },
      registeredBy: 'Agente PN - 001',
      registeredAt: '2024-03-01'
    }
  ]);
  const [showLevantamentoModal, setShowLevantamentoModal] = useState(false);
  const [levantamentoData, setLevantamentoData] = useState({
    nome: '',
    apelido: '',
    dataNascimento: ''
  });
  
  const [showOtherInfoHistory, setShowOtherInfoHistory] = useState({
    address: false,
    contact: false,
    nickname: false,
    social: false
  });

  const [recognitionFilters, setRecognitionFilters] = useState({
    fullName: '',
    birthDate: '',
    fatherName: '',
    motherName: '',
    docNumber: '',
    nickname: '',
    showComplementary: false,
    physicalConstitution: '',
    hair: '',
    hairColor: '',
    skinColor: '',
    beard: '',
    mustache: '',
    tattoo: '',
    glasses: '',
    nose: '',
    mouth: '',
    face: '',
    heightFrom: '',
    heightTo: '',
    weightFrom: '',
    weightTo: ''
  });

  const [recognitionResults, setRecognitionResults] = useState<any[]>([]);
  const [hasSearchedRecognition, setHasSearchedRecognition] = useState(false);
  const [selectedRecognitionResult, setSelectedRecognitionResult] = useState<any>(null);

  const [newAddress, setNewAddress] = useState({
    type: 'Residência',
    island: 'Santiago',
    council: '',
    parish: '',
    locality: '',
    reference: ''
  });

  const [newContact, setNewContact] = useState({
    type: 'Telemóvel',
    info: ''
  });

  const [newNickname, setNewNickname] = useState({
    value: ''
  });

  const [newSocial, setNewSocial] = useState({
    type: 'Facebook',
    link: ''
  });

  const handleConfirmRehabilitation = () => {
    if (!rehabilitationReason.trim()) {
      alert('O motivo da reabilitação é obrigatório.');
      return;
    }

    if (!selectedFicha || !selectedReasonForRehab) return;

    const updatedFichas = fichas.map(f => {
      if (f.id === selectedFicha.id) {
        const updatedReasons = f.registrationReasons.map((r: any) => {
          if (r.id === selectedReasonForRehab.id) {
            return {
              ...r,
              status: 'Aguardando Reabilitação',
              rehabilitationDetails: {
                reason: rehabilitationReason,
                attachments: rehabilitationAttachments.map(file => ({ name: file.name, size: file.size })),
                requestedAt: new Date().toLocaleDateString('pt-PT'),
                requestedBy: user?.name || 'Admin'
              }
            };
          }
          return r;
        });
        return { ...f, registrationReasons: updatedReasons };
      }
      return f;
    });

    setFichas(updatedFichas);
    // Also update selectedFicha to reflect changes immediately
    const updatedFicha = updatedFichas.find(f => f.id === selectedFicha.id);
    setSelectedFicha(updatedFicha);

    setShowRehabilitationModal(false);
    setRehabilitationReason('');
    setRehabilitationAttachments([]);
    setSelectedReasonForRehab(null);
  };

  const handleApproveRehabilitation = () => {
    if (!pendingRehabAction) return;
    const { ficha, reg } = pendingRehabAction;

    const updatedFichas = fichas.map(f => {
      if (f.id === ficha.id) {
        const updatedReasons = f.registrationReasons.map((r: any) => {
          if (r.id === reg.id) {
            return { ...r, status: 'Reabilitado' };
          }
          return r;
        });
        return { ...f, registrationReasons: updatedReasons };
      }
      return f;
    });

    setFichas(updatedFichas);
    setShowApproveConfirmModal(false);
    setSuccessMessage('Reabilitado com sucesso');
    setShowSuccessModal(true);
    setPendingRehabAction(null);
  };
  
  // Accordion states
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    biographic: true,
    records: true,
    observations: true,
    associated: true,
    complementary: true,
    biometric: true,
    responsibles: true,
    attachments: true,
    other_info: true,
    motivo: true,
    registos_associados: true,
    certificateModel: true,
    associatedMotivo: true
  });

  const characteristicTypes: Record<string, string[]> = {
    'Barba': ['Cavanhaque', 'Barba Comprida', 'Barba Curta', 'Sem Barba'],
    'Boca': ['Pequena', 'Média', 'Grande', 'Lábios Grossos', 'Lábios Finos'],
    'Naris': ['Arqueado', 'Chato', 'Aquilino', 'Reto'],
    'Orelha': ['Pequena', 'Média', 'Grande', 'De Abano'],
    'Olhos': ['Castanhos', 'Azuis', 'Verdes', 'Pretos'],
    'Rosto': ['Rosto Oval', 'Rosto Redondo', 'Rosto Quadrado', 'Rosto em Forma de Coração', 'Rosto Oblongo'],
    'Cabelo': ['Crespo', 'Liso', 'Ondulado', 'Careca'],
    'Bigode': ['Sim', 'Não', 'Fino', 'Grosso'],
    'Altura': [],
    'Constituição Física': ['Atlética', 'Magro', 'Obeso', 'Forte'],
    'Tatuagens': ['Tribal no braço direito', 'Nas costas', 'No pescoço'],
    'Cicatrizes': ['No queixo', 'Na testa', 'No braço']
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const fetchPersonDetail = async (id: number) => {
    try {
      setAssociatedPerson(null);
      setSuggestedFicha(null);
      
      const data = persons.find(p => p.id === id);
      if (!data) throw new Error("Person not found");
      
      setSelectedPerson(data);
      
      // Auto-match ficha
      const match = fichas.find(f => 
        (data.nif && f.nif === data.nif) || 
        (data.id_number && (f.docNumber === data.id_number || f.number === data.id_number))
      );
      
      if (match) {
        setSuggestedFicha(match);
      }

      setCurrentView('person_detail');
    } catch (err) {
      console.error('Error fetching person detail:', err);
    }
  };
  const [searchFilters, setSearchFilters] = useState({
    process: '',
    unit: '',
    name: '',
    birth_date: '',
    island: ''
  });

  const fetchPersons = async () => {
    // MOCK: Local filtering can be done here if needed.
    // We already have initial persons state.
  };

  useEffect(() => {
    if (currentView === 'person_list') {
      fetchPersons();
    }
  }, [currentView]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPersons();
  };

  const handleAddOtherInfo = (type: 'address' | 'contact' | 'nickname' | 'social') => {
    const today = new Date().toISOString().split('T')[0];
    let newItem: any = {
      id: Date.now(),
      createdAt: today,
      validFrom: today,
      validTo: null,
      user: user?.name || 'Admin'
    };

    if (selectedFicha) {
      const updatedFicha = { ...selectedFicha };

      if (type === 'address') {
        newItem = { ...newItem, ...newAddress };
        updatedFicha.addresses = [...(updatedFicha.addresses || []), newItem];
        setShowAddAddress(false);
        setNewAddress({ type: 'Residência', island: 'Santiago', council: '', parish: '', locality: '', reference: '' });
      } else if (type === 'contact') {
        newItem = { ...newItem, ...newContact };
        updatedFicha.contacts = [...(updatedFicha.contacts || []), newItem];
        setShowAddContact(false);
        setNewContact({ type: 'Telemóvel', info: '' });
      } else if (type === 'nickname') {
        newItem = { ...newItem, ...newNickname };
        updatedFicha.nicknames = [...(updatedFicha.nicknames || []), newItem];
        setShowAddNickname(false);
        setNewNickname({ value: '' });
      } else if (type === 'social') {
        newItem = { ...newItem, ...newSocial };
        updatedFicha.socialNetworks = [...(updatedFicha.socialNetworks || []), newItem];
        setShowAddSocial(false);
        setNewSocial({ type: 'Facebook', link: '' });
      }

      setSelectedFicha(updatedFicha);
      setFichas(fichas.map(f => f.id === updatedFicha.id ? updatedFicha : f));
    } else {
      // Normal flow when creating a new registration in person_detail
      if (type === 'address') {
        newItem = { ...newItem, ...newAddress };
        setSavedAddresses([...savedAddresses, newItem]);
        setShowAddAddress(false);
        setNewAddress({ type: 'Residência', island: 'Santiago', council: '', parish: '', locality: '', reference: '' });
      } else if (type === 'contact') {
        newItem = { ...newItem, ...newContact };
        setSavedContacts([...savedContacts, newItem]);
        setShowAddContact(false);
        setNewContact({ type: 'Telemóvel', info: '' });
      } else if (type === 'nickname') {
        newItem = { ...newItem, ...newNickname };
        setSavedNicknames([...savedNicknames, newItem]);
        setShowAddNickname(false);
        setNewNickname({ value: '' });
      } else if (type === 'social') {
        newItem = { ...newItem, ...newSocial };
        setSavedSocialNetworks([...savedSocialNetworks, newItem]);
        setShowAddSocial(false);
        setNewSocial({ type: 'Facebook', link: '' });
      }
    }
  };

  const handleDeactivateOtherInfo = (type: 'address' | 'contact' | 'nickname' | 'social', id: number) => {
    const today = new Date().toISOString().split('T')[0];
    const deactivator = user?.name || 'Admin';

    if (selectedFicha) {
      const updatedFicha = { ...selectedFicha };

      if (type === 'address') {
        updatedFicha.addresses = updatedFicha.addresses.map((item: any) => 
          item.id === id ? { ...item, validTo: today, deactivatedBy: deactivator } : item
        );
      } else if (type === 'contact') {
        updatedFicha.contacts = updatedFicha.contacts.map((item: any) => 
          item.id === id ? { ...item, validTo: today, deactivatedBy: deactivator } : item
        );
      } else if (type === 'nickname') {
        updatedFicha.nicknames = updatedFicha.nicknames.map((item: any) => 
          item.id === id ? { ...item, validTo: today, deactivatedBy: deactivator } : item
        );
      } else if (type === 'social') {
        updatedFicha.socialNetworks = updatedFicha.socialNetworks.map((item: any) => 
          item.id === id ? { ...item, validTo: today, deactivatedBy: deactivator } : item
        );
      }

      setSelectedFicha(updatedFicha);
      setFichas(fichas.map(f => f.id === updatedFicha.id ? updatedFicha : f));
    } else {
      if (type === 'address') {
        setSavedAddresses(savedAddresses.map((item: any) => 
          item.id === id ? { ...item, validTo: today, deactivatedBy: deactivator } : item
        ));
      } else if (type === 'contact') {
        setSavedContacts(savedContacts.map((item: any) => 
          item.id === id ? { ...item, validTo: today, deactivatedBy: deactivator } : item
        ));
      } else if (type === 'nickname') {
        setSavedNicknames(savedNicknames.map((item: any) => 
          item.id === id ? { ...item, validTo: today, deactivatedBy: deactivator } : item
        ));
      } else if (type === 'social') {
        setSavedSocialNetworks(savedSocialNetworks.map((item: any) => 
          item.id === id ? { ...item, validTo: today, deactivatedBy: deactivator } : item
        ));
      }
    }
  };

  const handleClearFilters = () => {
    setSearchFilters({
      process: '',
      unit: '',
      name: '',
      birth_date: '',
      island: ''
    });
  };

  const handleClearRecognitionFilters = () => {
    setRecognitionFilters({
      fullName: '',
      birthDate: '',
      fatherName: '',
      motherName: '',
      docNumber: '',
      nickname: '',
      showComplementary: false,
      physicalConstitution: '',
      hair: '',
      hairColor: '',
      skinColor: '',
      beard: '',
      mustache: '',
      tattoo: '',
      glasses: '',
      nose: '',
      mouth: '',
      face: '',
      heightFrom: '',
      heightTo: '',
      weightFrom: '',
      weightTo: ''
    });
    setRecognitionResults([]);
    setHasSearchedRecognition(false);
  };

  const handleRecognitionSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      // For demo, just return some mock results based on fichas or random
      const mockResults = [
        { id: 102, number: '102', seed: 'p1' },
        { id: 10, number: '010', seed: 'p2' },
        { id: 51, number: '051', seed: 'p3' },
        { id: 85, number: '085', seed: 'p4' },
        { id: 15, number: '015', seed: 'p5' },
        { id: 22, number: '022', seed: 'p6' },
        { id: 44, number: '044', seed: 'p7' },
      ];
      setRecognitionResults(mockResults);
      setHasSearchedRecognition(true);
      setLoading(false);
      if (mockResults.length > 0) {
        setSelectedRecognitionResult(mockResults[0]);
      }
    }, 800);
  };

  const [showPersonModal, setShowPersonModal] = useState(false);
  const [formData, setFormData] = useState({
    process_number: '',
    unit: 'ESF',
    full_name: '',
    birth_date: '',
    island: 'Santiago',
    id_number: '',
    nif: '',
    gender: 'M',
    nationality: 'Angolana',
    address: ''
  });

  const handlePersonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock creating person
      const newPerson = {
        id: Date.now(),
        ...formData,
        status: 'Por Registar'
      };
      setPersons(prev => [newPerson, ...prev]);
      
      alert('Pessoa cadastrada com sucesso!');
      setShowPersonModal(false);
      setFormData({
        process_number: '',
        unit: 'ESF',
        full_name: '',
        birth_date: '',
        island: 'Santiago',
        id_number: '',
        nif: '',
        gender: 'M',
        nationality: 'Angolana',
        address: ''
      });
    } catch (err) {
      alert('Erro ao processar');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        setUser({ id: 1, username: 'admin', name: 'Administrador do Sistema', role: 'admin' });
      } else {
        setError('Falha no login. Utilize admin / admin123.');
      }
      setLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="p-8 bg-slate-900 text-white text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">POLÍCIA NACIONAL</h1>
            <p className="text-slate-400 text-sm mt-1">Sistema Integrado de Cadastro</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2">
                <FileWarning size={16} />
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Usuário</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Seu número de agente"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Senha</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Autenticando..." : "ENTRAR NO SISTEMA"}
            </button>
          </form>
          
          <div className="px-8 pb-8 text-center">
            <p className="text-xs text-slate-400">
              Acesso restrito a pessoal autorizado. <br/>
              Todas as ações são monitoradas e registradas.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)] z-10">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-slate-900 rounded-xl text-white shadow-lg shadow-slate-200">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">SIC Policial</h2>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">Sistema Integrado de Cadastro</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{user.name}</p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{user.role}</p>
              </div>
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black shadow-lg border-4 border-white">
                {user.name.charAt(0)}
              </div>
            </div>
            <div className="h-8 w-[2px] bg-slate-100 rounded-full"></div>
            <button 
              onClick={handleLogout}
              className="group flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest"
            >
              <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
              <span>Sair</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-12 bg-[#FBFBFC]">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                {/* Welcome Section */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Bem-vindo, {user.name.split(' ')[0]}</h1>
                  <p className="text-slate-400 font-medium">Selecione uma das opções abaixo para gerenciar o sistema de cadastro policial.</p>
                </div>

                {/* Cadastro Section */}
                <div className="space-y-6">
                  <SectionHeader title="Cadastro" icon={Users} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <MenuCard 
                      title="Pessoa" 
                      icon={User} 
                      description="Gerenciar registros biográficos e dados pessoais de indivíduos."
                      onClick={() => setCurrentView('person_list')}
                    />
                    <MenuCard 
                      title="Gestão de Ficha de Cadastro" 
                      icon={ClipboardList} 
                      description="Visualizar e editar fichas de identificação individual completas."
                      onClick={() => setCurrentView('ficha_list')}
                    />
                    <MenuCard 
                      title="Gestão de Reconhecimento" 
                      icon={Fingerprint} 
                      description="Pesquisa avançada por sinais complementares e biometria."
                      onClick={() => setCurrentView('recognition')}
                    />
                    <MenuCard 
                      title="Reabilitação" 
                      icon={ShieldCheck} 
                      description="Processar solicitações de reabilitação e limpeza de histórico."
                      onClick={() => setCurrentView('rehabilitation_list')}
                    />
                    <MenuCard 
                      title="Documentos" 
                      icon={FileText} 
                      description="Gestão de documentos oficiais e ofícios do sistema."
                      onClick={() => {
                        setDocStep(1);
                        setIsReadOnlyView(false);
                        setCurrentView('document_registration');
                      }}
                    />
                    <MenuCard 
                      title="Pesquisa Documentos" 
                      icon={Search} 
                      description="Localizar documentos emitidos e histórico de solicitações."
                      onClick={() => setCurrentView('document_search')}
                    />
                  </div>
                </div>

                {/* Emissão de Documentos Section */}
                <div className="space-y-6">
                  <SectionHeader title="Emissão de Documentos" icon={FileText} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <MenuCard 
                      title="Certificado de Cadastro" 
                      icon={FileCheck} 
                      description="Emissão de certificados de cadastro e antecedentes policiais."
                      onClick={() => setCurrentView('certificate_list')}
                    />
                    <MenuCard 
                      title="Análise" 
                      icon={Search} 
                      description="Relatórios analíticos e estatísticas de emissão."
                      onClick={() => setCurrentView('certificate_analysis')}
                    />
                    <MenuCard 
                      title="Decisão" 
                      icon={Shield} 
                      description="Processo de decisão e aprovação de documentos."
                      onClick={() => setCurrentView('certificate_decision')}
                    />
                    <MenuCard 
                      title="Histórico Certificado de Cadastro" 
                      icon={History} 
                      description="Histórico completo de certificados emitidos."
                    />
                    <MenuCard 
                      title="Certificado de Extravio" 
                      icon={FileWarning} 
                      description="Emissão de certificados para documentos extraviados."
                    />
                    <MenuCard 
                      title="Analise" 
                      icon={Search} 
                      description="Análise de comunicações de extravio."
                    />
                    <MenuCard 
                      title="Decisão" 
                      icon={Shield} 
                      description="Decisão sobre comunicações de extravio."
                    />
                    <MenuCard 
                      title="Historico Comunicações de Extravio" 
                      icon={History} 
                      description="Histórico de comunicações de itens extraviados."
                    />
                  </div>
                </div>
              </motion.div>
            ) : currentView === 'person_list' ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Cadastro Policial</h2>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-slate-900 text-white rounded-lg"><Search size={16} /></div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Filtrar Pesquisa</h3>
                  </div>
                  
                  <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Processo / Ocorrência</label>
                      <input 
                        type="text" 
                        value={searchFilters.process}
                        onChange={(e) => setSearchFilters({...searchFilters, process: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        placeholder="N.º Processo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade</label>
                      <select 
                        value={searchFilters.unit}
                        onChange={(e) => setSearchFilters({...searchFilters, unit: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none"
                      >
                        <option value="">Selecione...</option>
                        <option value="ESF">ESF</option>
                        <option value="DP">DP</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                      <input 
                        type="text" 
                        value={searchFilters.name}
                        onChange={(e) => setSearchFilters({...searchFilters, name: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        placeholder="Nome do indivíduo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Nascimento</label>
                      <input 
                        type="date" 
                        value={searchFilters.birth_date}
                        onChange={(e) => setSearchFilters({...searchFilters, birth_date: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ilha</label>
                      <select 
                        value={searchFilters.island}
                        onChange={(e) => setSearchFilters({...searchFilters, island: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none"
                      >
                        <option value="">Selecione...</option>
                        <option value="Santiago">Santiago</option>
                        <option value="São Vicente">São Vicente</option>
                        <option value="Sal">Sal</option>
                      </select>
                    </div>

                    <div className="md:col-span-5 flex justify-end gap-3 mt-4">
                      <Button variant="outline" onClick={handleClearFilters}>Limpar</Button>
                      <Button variant="primary" icon={Search} onClick={() => {}}>Pesquisar</Button>
                    </div>
                  </form>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Listagem de Registros</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Total : {persons.length.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                          <th className="px-6 py-4">Processo / Ocorrência</th>
                          <th className="px-6 py-4">Unidade</th>
                          <th className="px-6 py-4">Nome</th>
                          <th className="px-6 py-4">Data Nascimento</th>
                          <th className="px-6 py-4">Ilha</th>
                          <th className="px-6 py-4">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {persons.length > 0 ? (
                          persons.map((p, idx) => (
                            <tr 
                              key={p.id} 
                              className="hover:bg-slate-50 cursor-pointer transition-colors group"
                              onClick={() => fetchPersonDetail(p.id)}
                            >
                              <td className="px-6 py-4 text-sm font-bold text-blue-600 group-hover:underline">{p.process_number || '---'}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-600">{p.unit || '---'}</td>
                              <td className="px-6 py-4 text-sm font-bold text-slate-900">{p.full_name}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-600">{p.birth_date ? new Date(p.birth_date).toLocaleDateString('pt-BR') : '---'}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-600">{p.island || '---'}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                                  p.status === 'Concluído' ? 'bg-emerald-50 text-emerald-600' :
                                  p.status === 'Em Processo' ? 'bg-amber-50 text-amber-600' :
                                  'bg-slate-100 text-slate-500'
                                }`}>
                                  {p.status || 'Por Registar'}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic font-medium">Nenhum registro encontrado na base de dados</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-start">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('dashboard')}>Voltar ao Início</Button>
                </div>
              </motion.div>
            ) : currentView === 'recognition' ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Gestão de Reconhecimento</h2>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-slate-900 text-white rounded-lg"><Search size={16} /></div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Pesquisa Avançada</h3>
                  </div>
                  
                  <form onSubmit={handleRecognitionSearch} className="space-y-8">
                    {/* Biographical Search */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                        <input 
                          type="text" 
                          value={recognitionFilters.fullName}
                          onChange={(e) => setRecognitionFilters({...recognitionFilters, fullName: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Nascimento</label>
                        <input 
                          type="date" 
                          value={recognitionFilters.birthDate}
                          onChange={(e) => setRecognitionFilters({...recognitionFilters, birthDate: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Pai</label>
                        <input 
                          type="text" 
                          value={recognitionFilters.fatherName}
                          onChange={(e) => setRecognitionFilters({...recognitionFilters, fatherName: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Mãe</label>
                        <input 
                          type="text" 
                          value={recognitionFilters.motherName}
                          onChange={(e) => setRecognitionFilters({...recognitionFilters, motherName: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">N.º Documento</label>
                        <input 
                          type="text" 
                          value={recognitionFilters.docNumber}
                          onChange={(e) => setRecognitionFilters({...recognitionFilters, docNumber: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Toggle Complementary */}
                    <div className="flex items-center gap-3 py-2 border-y border-slate-50">
                      <label className="relative inline-flex items-center cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={recognitionFilters.showComplementary}
                          onChange={(e) => setRecognitionFilters({...recognitionFilters, showComplementary: e.target.checked})}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                        <span className="ml-3 text-[10px] font-black text-slate-900 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Sinais Complementares</span>
                      </label>
                    </div>

                    {/* Complementary Search Fields */}
                    <AnimatePresence>
                      {recognitionFilters.showComplementary && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                            {[
                              { label: 'Constituição Fisica', key: 'physicalConstitution' },
                              { label: 'Cabelo', key: 'hair' },
                              { label: 'Cor do Cabelo', key: 'hairColor' },
                              { label: 'Cor da Pele', key: 'skinColor' },
                              { label: 'Barba', key: 'beard' },
                              { label: 'Bigode', key: 'mustache' },
                              { label: 'Tatuagem', key: 'tattoo' },
                              { label: 'Óculos', key: 'glasses' },
                              { label: 'Nariz', key: 'nose' },
                              { label: 'Boca', key: 'mouth' },
                              { label: 'Rosto', key: 'face' }
                            ].map((field) => (
                              <div key={field.key} className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{field.label}</label>
                                <select 
                                  value={(recognitionFilters as any)[field.key]}
                                  onChange={(e) => setRecognitionFilters({...recognitionFilters, [field.key]: e.target.value})}
                                  className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none"
                                >
                                  <option value="">Selecione...</option>
                                  <option value="Opção 1">Opção 1</option>
                                  <option value="Opção 2">Opção 2</option>
                                </select>
                              </div>
                            ))}

                            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Altura Estimada</label>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-slate-400">De:</span>
                                  <input 
                                    type="text" 
                                    placeholder="0.00"
                                    value={recognitionFilters.heightFrom}
                                    onChange={(e) => setRecognitionFilters({...recognitionFilters, heightFrom: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-100 rounded-lg text-sm font-bold outline-none focus:border-slate-900"
                                  />
                                  <span className="text-[10px] font-bold text-slate-400">À:</span>
                                  <input 
                                    type="text" 
                                    placeholder="0.00"
                                    value={recognitionFilters.heightTo}
                                    onChange={(e) => setRecognitionFilters({...recognitionFilters, heightTo: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-100 rounded-lg text-sm font-bold outline-none focus:border-slate-900"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Peso Estimado</label>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-slate-400">De:</span>
                                  <input 
                                    type="text" 
                                    placeholder="0 kg"
                                    value={recognitionFilters.weightFrom}
                                    onChange={(e) => setRecognitionFilters({...recognitionFilters, weightFrom: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-100 rounded-lg text-sm font-bold outline-none focus:border-slate-900"
                                  />
                                  <span className="text-[10px] font-bold text-slate-400">À:</span>
                                  <input 
                                    type="text" 
                                    placeholder="0 kg"
                                    value={recognitionFilters.weightTo}
                                    onChange={(e) => setRecognitionFilters({...recognitionFilters, weightTo: e.target.value})}
                                    className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-100 rounded-lg text-sm font-bold outline-none focus:border-slate-900"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-50">
                      <Button variant="outline" onClick={handleClearRecognitionFilters}>Limpar</Button>
                      <Button variant="primary" icon={Search} onClick={() => {}}>Pesquisar</Button>
                    </div>
                  </form>
                </div>

                {/* Results Section */}
                {hasSearchedRecognition && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Resultados Encontrados</h3>
                      <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-full tracking-tighter">{recognitionResults.length} Registros</span>
                    </div>

                    <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-12">
                      {/* Horizontal Scroll of Photos */}
                      <div className="relative group">
                        <div className="flex items-center gap-8 overflow-x-auto pb-8 custom-scrollbar scroll-smooth">
                          {recognitionResults.map((result) => (
                            <button 
                              key={result.id}
                              onClick={() => setSelectedRecognitionResult(result)}
                              className={`flex-shrink-0 flex flex-col items-center gap-4 transition-all ${
                                selectedRecognitionResult?.id === result.id ? 'scale-105' : 'opacity-50 hover:opacity-100'
                              }`}
                            >
                              <div className={`w-36 aspect-[3/4] rounded-2xl overflow-hidden border-4 transition-all shadow-lg ${
                                selectedRecognitionResult?.id === result.id ? 'border-slate-900' : 'border-white'
                              }`}>
                                <img 
                                  src={`https://picsum.photos/seed/${result.seed}/300/400`} 
                                  alt={`Result ${result.number}`} 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <p className={`text-[10px] font-black uppercase tracking-widest ${
                                selectedRecognitionResult?.id === result.id ? 'text-slate-900' : 'text-slate-400'
                              }`}>N.º {result.number}</p>
                            </button>
                          ))}
                        </div>
                        
                        <button className="absolute left-[-20px] top-[40%] translate-y-[-50%] p-3 bg-white border-2 border-slate-100 rounded-full shadow-xl hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100">
                          <ChevronLeft size={20} />
                        </button>
                        <button className="absolute right-[-20px] top-[40%] translate-y-[-50%] p-3 bg-white border-2 border-slate-100 rounded-full shadow-xl hover:bg-slate-50 transition-all opacity-0 group-hover:opacity-100">
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      {/* Preview Area */}
                      {selectedRecognitionResult && (
                        <div className="border-2 border-slate-100 rounded-3xl bg-slate-50 p-12 min-h-[600px] flex flex-col relative overflow-hidden shadow-inner">
                          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                            <div className="grid grid-cols-10 gap-8 p-8">
                              {Array.from({ length: 100 }).map((_, i) => (
                                <Fingerprint key={i} size={60} />
                              ))}
                            </div>
                          </div>
                          
                          <div className="z-10 space-y-8">
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Ficha Cadastro Numero: {selectedRecognitionResult.number}</h4>
                              <Button variant="secondary" onClick={() => {
                                const ficha = fichas.find(f => f.number.includes(selectedRecognitionResult.number)) || fichas[0];
                                setSelectedFicha(ficha);
                                setCurrentView('ficha_detail');
                              }}>Visualizar Ficha Completa</Button>
                            </div>

                            <div className="grid grid-cols-12 gap-12 items-start">
                              {/* Main Photo Column */}
                              <div className="col-span-4 flex flex-col items-center gap-4">
                                <motion.div 
                                  key={`${selectedRecognitionResult.id}-frontal`}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="w-full aspect-[3/4] bg-white border-2 border-slate-200 rounded-xl shadow-lg overflow-hidden"
                                >
                                  <img 
                                    src={`https://picsum.photos/seed/${selectedRecognitionResult.seed}/600/800`} 
                                    alt="Frontal" 
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </motion.div>
                                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Frontal</p>
                              </div>

                              {/* Other Photos Box */}
                              <div className="col-span-8 bg-[#F0F0F0] border-2 border-slate-900 rounded-lg p-8 min-h-[450px]">
                                <div className="grid grid-cols-3 gap-8">
                                  {[
                                    { label: 'Perfil Esquerdo', seed: 'left' },
                                    { label: 'Perfil Direito', seed: 'right' },
                                    { label: 'Tatuagem', seed: 'tattoo' }
                                  ].map((photo) => (
                                    <div key={photo.label} className="flex flex-col items-center gap-4">
                                      <div className="w-full aspect-square bg-white border-2 border-white rounded shadow-sm overflow-hidden">
                                        <img 
                                          src={`https://picsum.photos/seed/${selectedRecognitionResult.seed}_${photo.seed}/300/300`} 
                                          alt={photo.label} 
                                          className="w-full h-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      </div>
                                      <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest text-center">{photo.label}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-start">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('dashboard')}>Voltar ao Início</Button>
                </div>
              </motion.div>
            ) : currentView === 'rehabilitation_list' ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Reabilitação</h2>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Número Ficha</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data de Nascimento</label>
                      <div className="relative">
                        <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                        <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</label>
                      <select className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                        <option value="">Selecione...</option>
                        <option value="Aguardando">Aguardando Reabilitação</option>
                        <option value="Reabilitado">Reabilitado</option>
                      </select>
                    </div>
                    <Button variant="primary" onClick={() => {}}>Pesquisar</Button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Solicitações de Reabilitação</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">
                      Total : {fichas.reduce((acc, f) => acc + (f.registrationReasons?.filter((r: any) => r.status === 'Aguardando Reabilitação' || r.rehabilitationDetails).length || 0), 0).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-[10px] uppercase font-black text-slate-600 tracking-widest border-b border-slate-200">
                          <th className="px-4 py-3 border-r border-slate-200">Número Ficha</th>
                          <th className="px-4 py-3 border-r border-slate-200">Nome</th>
                          <th className="px-4 py-3 border-r border-slate-200">Data</th>
                          <th className="px-4 py-3 border-r border-slate-200">Cadastro</th>
                          <th className="px-4 py-3 border-r border-slate-200">Motivo Reabilitação</th>
                          <th className="px-4 py-3">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {fichas.flatMap(ficha => 
                          (ficha.registrationReasons || [])
                            .filter((reg: any) => reg.status === 'Aguardando Reabilitação' || reg.rehabilitationDetails)
                            .map((reg: any) => (
                              <tr key={`${ficha.id}-${reg.id}`} className="hover:bg-blue-50/50 transition-colors">
                                <td className="px-4 py-3 text-sm font-bold text-blue-600 border-r border-slate-100">{ficha.number}</td>
                                <td className="px-4 py-3 text-sm font-bold text-slate-900 border-r border-slate-100">{ficha.name}</td>
                                <td className="px-4 py-3 text-sm font-medium text-slate-600 border-r border-slate-100">{reg.date}</td>
                                <td className="px-4 py-3 text-sm font-medium text-slate-600 border-r border-slate-100">{reg.reason}</td>
                                <td className="px-4 py-3 text-sm font-medium text-slate-600 border-r border-slate-100">{reg.rehabilitationDetails?.reason || '---'}</td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <button 
                                      title="Ver Detalhes"
                                      onClick={() => {
                                        setSelectedFicha(ficha);
                                        setSelectedReasonForRehab(reg);
                                        setShowRehabilitationDetailsModal(true);
                                      }}
                                      className="p-1.5 text-blue-500 hover:bg-blue-100 rounded-lg transition-all"
                                    >
                                      <Info size={18} />
                                    </button>
                                    <button 
                                      title="Aprovar Reabilitação"
                                      onClick={() => {
                                        setPendingRehabAction({ ficha, reg });
                                        setShowApproveConfirmModal(true);
                                      }}
                                      className="p-1.5 text-emerald-500 hover:bg-emerald-100 rounded-lg transition-all"
                                    >
                                      <ShieldCheck size={18} />
                                    </button>
                                    <button className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-all">
                                      <X size={18} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-start">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('dashboard')}>Voltar ao Início</Button>
                </div>
              </motion.div>
            ) : currentView === 'document_registration' ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Cadastro Documentos</h2>
                </div>

                {/* Steps Indicator */}
                <div className="flex items-center justify-between max-w-4xl mx-auto mb-12 relative px-4">
                  {/* Progress Line Background */}
                  <div className="absolute top-6 left-12 right-12 h-1 bg-slate-100 rounded-full"></div>
                  {/* Active Progress Line */}
                  <div 
                    className="absolute top-6 left-12 h-1 bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `calc(${((docStep - 1) / 2) * 100}% - ${docStep === 1 ? '0px' : docStep === 2 ? '24px' : '48px'})` }}
                  ></div>

                  {[
                    { id: 1, label: 'Identificação', icon: FileText },
                    { id: 2, label: 'Quem Encontrou', icon: User },
                    { id: 3, label: 'Localização', icon: MapPin }
                  ].map((step) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-3 group">
                      <div 
                        className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                          docStep > step.id 
                            ? 'bg-green-500 border-green-200 text-white shadow-lg shadow-green-100' 
                            : docStep === step.id
                              ? 'bg-blue-600 border-blue-200 text-white shadow-lg shadow-blue-200 scale-110'
                              : 'bg-white border-slate-100 text-slate-300'
                        }`}
                      >
                        {docStep > step.id ? <Check size={20} /> : <step.icon size={20} />}
                      </div>
                      <div className="flex flex-col items-center">
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors ${
                          docStep === step.id ? 'text-blue-600' : 'text-slate-400'
                        }`}>
                          Passo {step.id}
                        </span>
                        <span className={`text-[10px] font-bold whitespace-nowrap transition-colors ${
                          docStep === step.id ? 'text-slate-900' : 'text-slate-400'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white border-2 border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-6 bg-slate-50 border-b-2 border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-slate-900 text-white rounded-lg">
                      {docStep === 1 ? <FileText size={18} /> : docStep === 2 ? <User size={18} /> : <MapPin size={18} />}
                    </div>
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                      {docStep === 1 ? 'Dados Documento' : docStep === 2 ? 'Informações de Quem Encontrou' : 'Localização do Documento / Observações'}
                    </h3>
                  </div>

                  <div className="p-8 space-y-8">
                    {docStep === 1 && (
                      <div className="space-y-8">
                        {/* Biographical Search bar */}
                        <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 space-y-4">
                          <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="w-full md:w-32 space-y-2">
                              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Tipo Doc</label>
                              <select 
                                value={bioSearchDocType}
                                onChange={(e) => setBioSearchDocType(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all"
                              >
                                <option value="CNI">CNI</option>
                                <option value="Passaporte">Passaporte</option>
                                <option value="TRE">TRE</option>
                                <option value="BI">BI</option>
                              </select>
                            </div>
                            <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">N.º Documento</label>
                              <input 
                                type="text"
                                value={bioSearchDocNumber}
                                onChange={(e) => setBioSearchDocNumber(e.target.value)}
                                placeholder="Digite o número do documento..."
                                className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Nome da Pessoa</label>
                              <input 
                                type="text"
                                value={bioSearchName}
                                onChange={(e) => setBioSearchName(e.target.value)}
                                placeholder="Digite o nome..."
                                className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all"
                              />
                            </div>
                            <Button 
                              variant="secondary" 
                              icon={Search} 
                              onClick={() => {
                                setBioSearchTarget('document');
                                handleBioSearch();
                              }}
                            >
                              Pesquisar
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          {docData.document.photo && (
                            <div className="w-32 h-40 rounded-2xl border-4 border-white shadow-xl overflow-hidden shrink-0 bg-slate-100 mt-2">
                              <img src={docData.document.photo} alt="Pessoa" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                          )}
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-4">
                              <DetailField 
                                label="Motivo" 
                                value={docData.document.reason} 
                                type="select" 
                                readOnly={false}
                                options={['Perda', 'Roubo', 'Encontrado']}
                                onChange={(val: string) => setDocData({...docData, document: {...docData.document, reason: val}})}
                              />
                            </div>
                            <DetailField 
                              label="NIF" 
                              value={docData.document.nif} 
                              readOnly={false}
                              onChange={(val: string) => setDocData({...docData, document: {...docData.document, nif: val}})}
                            />
                            <DetailField 
                              label="Tipo Documento" 
                              value={docData.document.type} 
                              type="select" 
                              readOnly={false}
                              options={['CNI', 'Passaporte', 'Carta Condução']}
                              onChange={(val: string) => setDocData({...docData, document: {...docData.document, type: val}})}
                            />
                            <DetailField 
                              label="Numero Documento" 
                              value={docData.document.number} 
                              readOnly={false}
                              onChange={(val: string) => setDocData({...docData, document: {...docData.document, number: val}})}
                            />
                            <DetailField 
                              label="Data Emissão" 
                              value={docData.document.issueDate} 
                              type="date"
                              readOnly={false}
                              icon={Calendar}
                              onChange={(val: string) => setDocData({...docData, document: {...docData.document, issueDate: val}})}
                            />
                            <DetailField 
                              label="Data Validade" 
                              value={docData.document.expiryDate} 
                              type="date"
                              readOnly={false}
                              icon={Calendar}
                              onChange={(val: string) => setDocData({...docData, document: {...docData.document, expiryDate: val}})}
                            />
                            <div className="md:col-span-2">
                              <DetailField 
                                label="Nome Completo" 
                                value={docData.document.fullName} 
                                readOnly={false}
                                onChange={(val: string) => setDocData({...docData, document: {...docData.document, fullName: val}})}
                              />
                            </div>
                            <DetailField 
                              label="Data Nascimento" 
                              value={docData.document.birthDate} 
                              type="date"
                              readOnly={false}
                              icon={Calendar}
                              onChange={(val: string) => setDocData({...docData, document: {...docData.document, birthDate: val}})}
                            />
                            <DetailField 
                              label="Nacionalidade" 
                              value={docData.document.nationality} 
                              type="select" 
                              readOnly={false}
                              options={['Cabo-verdiana', 'Portuguesa', 'Angolana']}
                              onChange={(val: string) => setDocData({...docData, document: {...docData.document, nationality: val}})}
                            />
                            <DetailField 
                              label="Naturalidade" 
                              value={docData.document.birthPlace} 
                              readOnly={false}
                              onChange={(val: string) => setDocData({...docData, document: {...docData.document, birthPlace: val}})}
                            />
                            <DetailField 
                              label="Nome Pai" 
                              value={docData.document.fatherName} 
                              readOnly={false}
                              onChange={(val: string) => setDocData({...docData, document: {...docData.document, fatherName: val}})}
                            />
                            <DetailField 
                              label="Nome Mãe" 
                              value={docData.document.motherName} 
                              readOnly={false}
                              onChange={(val: string) => setDocData({...docData, document: {...docData.document, motherName: val}})}
                            />
                            <DetailField 
                              label="Telemóvel" 
                              value={docData.document.phone} 
                              readOnly={false}
                              onChange={(val: string) => setDocData({...docData, document: {...docData.document, phone: val}})}
                            />
                            <div className="md:col-span-4 pt-4">
                              <Button variant="outline" icon={Paperclip} onClick={() => {}}>Anexar Documento</Button>
                            </div>
                          </div>
                        </div>
                    </div>
                  )}

                    {docStep === 2 && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <DetailField 
                            label="Tipo" 
                            value={docData.finder.type} 
                            type="select" 
                            readOnly={false}
                            options={['Civil', 'Policial']}
                            onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, type: val}})}
                          />
                        </div>

                        {docData.finder.type === 'Civil' && (
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-2">
                              <DetailField 
                                label="Nome" 
                                value={docData.finder.name} 
                                readOnly={false}
                                onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, name: val}})}
                              />
                            </div>
                            <DetailField 
                              label="Tipo Documento de Identificação" 
                              value={docData.finder.idType} 
                              type="select" 
                              readOnly={false}
                              options={['CNI', 'Passaporte']}
                              onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, idType: val}})}
                            />
                            <DetailField 
                              label="Numero Documento" 
                              value={docData.finder.idNumber} 
                              readOnly={false}
                              onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, idNumber: val}})}
                            />
                            <DetailField 
                              label="Contacto" 
                              value={docData.finder.contact} 
                              readOnly={false}
                              onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, contact: val}})}
                            />
                            <DetailField 
                              label="Data em que foi encontrado" 
                              value={docData.finder.foundDate} 
                              type="date"
                              readOnly={false}
                              icon={Calendar}
                              onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, foundDate: val}})}
                            />

                            <div className="md:col-span-4 pt-4 space-y-6">
                              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Local Encontrado:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <DetailField 
                                  label="Ilha" 
                                  value={docData.finder.location.island} 
                                  type="select" 
                                  readOnly={false}
                                  options={['Santiago', 'São Vicente', 'Sal']}
                                  onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, location: {...docData.finder.location, island: val}}})}
                                />
                                <DetailField 
                                  label="Concelho" 
                                  value={docData.finder.location.county} 
                                  type="select" 
                                  readOnly={false}
                                  options={['Praia', 'Santa Catarina']}
                                  onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, location: {...docData.finder.location, county: val}}})}
                                />
                                <DetailField 
                                  label="Freguesia" 
                                  value={docData.finder.location.parish} 
                                  type="select" 
                                  readOnly={false}
                                  options={['Nossa Senhora da Graça']}
                                  onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, location: {...docData.finder.location, parish: val}}})}
                                />
                                <DetailField 
                                  label="Localidade" 
                                  value={docData.finder.location.locality} 
                                  type="select" 
                                  readOnly={false}
                                  options={['Achada Santo António']}
                                  onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, location: {...docData.finder.location, locality: val}}})}
                                />
                                <DetailField 
                                  label="Zona" 
                                  value={docData.finder.location.zone} 
                                  type="select" 
                                  readOnly={false}
                                  options={['Zona 1']}
                                  onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, location: {...docData.finder.location, zone: val}}})}
                                />
                                <div className="md:col-span-2">
                                  <DetailField 
                                    label="Outro Ponto de Referência" 
                                    value={docData.finder.location.reference} 
                                    readOnly={false}
                                    onChange={(val: string) => setDocData({...docData, finder: {...docData.finder, location: {...docData.finder.location, reference: val}}})}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {docStep === 3 && (
                      <div className="space-y-8">
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Localização do Documento</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <DetailField 
                              label="Ilha" 
                              value={docData.storage.island} 
                              type="select" 
                              readOnly={false}
                              options={['Santiago']}
                              onChange={(val: string) => setDocData({...docData, storage: {...docData.storage, island: val}})}
                            />
                            <DetailField 
                              label="Concelho" 
                              value={docData.storage.county} 
                              type="select" 
                              readOnly={false}
                              options={['Praia']}
                              onChange={(val: string) => setDocData({...docData, storage: {...docData.storage, county: val}})}
                            />
                            <DetailField 
                              label="Unidade Organica" 
                              value={docData.storage.organicUnit} 
                              type="select" 
                              readOnly={false}
                              options={['PN - Praia']}
                              onChange={(val: string) => setDocData({...docData, storage: {...docData.storage, organicUnit: val}})}
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Obs:</label>
                          <textarea 
                            rows={6}
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all resize-none"
                            value={docData.storage.observations}
                            onChange={(e) => setDocData({...docData, storage: {...docData.storage, observations: e.target.value}})}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-slate-50 border-t-2 border-slate-100 flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      icon={ArrowLeft}
                      onClick={() => docStep > 1 ? setDocStep(docStep - 1) : setCurrentView('dashboard')}
                    >
                      Voltar
                    </Button>
                    <div className="flex gap-4">
                      <Button 
                        variant="outline" 
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                        onClick={() => setCurrentView('dashboard')}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        variant="primary" 
                        icon={docStep === 3 ? Check : ArrowRight}
                        onClick={() => {
                          if (docStep < 3) {
                            setDocStep(docStep + 1);
                          } else {
                            setRegisteredDoc({
                              ...docData, 
                              id: '002',
                              registeredBy: user?.name || 'Agente PN - 001',
                              registeredAt: new Date().toLocaleDateString('pt-BR')
                            });
                            setSuccessMessage('Cadastro Documento Perdido com Sucesso');
                            setShowSuccessModal(true);
                            setCurrentView('document_detail');
                          }
                        }}
                      >
                        {docStep === 3 ? 'Concluir' : 'Próximo'}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : currentView === 'document_detail' && registeredDoc ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 pb-12"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Detalhes do Registo</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registo Individual N.º {registeredDoc.id}</p>
                  </div>
                  <div className="flex gap-3">
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Section: Dados Documento */}
                  <div className="space-y-4">
                    <div className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 text-white rounded-lg"><FileText size={18} /></div>
                        <span className="uppercase tracking-widest text-xs">Dados do Documento</span>
                      </div>
                      {!isReadOnlyView && (
                        <button 
                          onClick={() => {
                            setDocStep(1);
                            setCurrentView('document_registration');
                          }}
                          className="text-slate-400 hover:text-slate-900 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                    </div>
                    
                    <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-4">
                          <DetailField label="Motivo" value={registeredDoc.document.reason} />
                        </div>
                        <DetailField label="NIF" value={registeredDoc.document.nif || '---'} />
                        <DetailField label="Tipo Documento" value={registeredDoc.document.type} />
                        <DetailField label="Número Documento" value={registeredDoc.document.number} />
                        <DetailField label="Data Emissão" value={registeredDoc.document.issueDate} icon={Calendar} />
                        <DetailField label="Data Validade" value={registeredDoc.document.expiryDate} icon={Calendar} />
                        <div className="md:col-span-2">
                          <DetailField label="Nome Completo" value={registeredDoc.document.fullName} />
                        </div>
                        <DetailField label="Data Nascimento" value={registeredDoc.document.birthDate} icon={Calendar} />
                        <DetailField label="Nacionalidade" value={registeredDoc.document.nationality} />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Anexos</h3>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl w-fit">
                          <FileText size={20} className="text-slate-900" />
                          <span className="text-xs font-bold text-slate-900">Copia Documento.pdf</span>
                          {!isReadOnlyView && (
                            <button className="text-red-500 hover:text-red-700 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section: Finder Data */}
                  <div className="space-y-4">
                    <div className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 text-white rounded-lg"><User size={18} /></div>
                        <span className="uppercase tracking-widest text-xs">Informações de Quem Encontrou</span>
                      </div>
                      {!isReadOnlyView && (
                        <button 
                          onClick={() => {
                            setDocStep(2);
                            setCurrentView('document_registration');
                          }}
                          className="text-slate-400 hover:text-slate-900 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                    </div>
                    
                    <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                          <DetailField label="Nome" value={registeredDoc.finder.name} />
                        </div>
                        <DetailField label="Tipo Documento Identificação" value={registeredDoc.finder.idType} />
                        <DetailField label="Número Documento" value={registeredDoc.finder.idNumber} />
                        <DetailField label="Contacto" value={registeredDoc.finder.contact} />
                        <DetailField label="Data em que foi encontrado" value={registeredDoc.finder.foundDate} icon={Calendar} />
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Local Encontrado</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                          <DetailField label="Ilha" value={registeredDoc.finder.location.island} />
                          <DetailField label="Concelho" value={registeredDoc.finder.location.county} />
                          <DetailField label="Freguesia" value={registeredDoc.finder.location.parish} />
                          <DetailField label="Localidade" value={registeredDoc.finder.location.locality} />
                          <DetailField label="Zona" value={registeredDoc.finder.location.zone} />
                          <div className="md:col-span-2">
                            <DetailField label="Outro Ponto de Referência" value={registeredDoc.finder.location.reference} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section: Storage Data */}
                  <div className="space-y-4">
                    <div className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 text-white rounded-lg"><MapPin size={18} /></div>
                        <span className="uppercase tracking-widest text-xs">Localização do Documento / Observações</span>
                      </div>
                      <div className="flex gap-2">
                        {!isReadOnlyView && (
                          <button 
                            onClick={() => {
                              setDocStep(3);
                              setCurrentView('document_registration');
                            }}
                            className="text-slate-400 hover:text-slate-900 transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <DetailField label="Ilha" value={registeredDoc.storage.island} />
                        <DetailField label="Concelho" value={registeredDoc.storage.county} />
                        <DetailField label="Unidade Orgânica" value={registeredDoc.storage.organicUnit} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Observações</label>
                        <div className="p-4 bg-slate-50 border-2 border-slate-100 rounded-xl min-h-[100px] text-sm font-bold text-slate-900">
                          {registeredDoc.storage.observations || '---'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section: Dados de Registo */}
                  <div className="space-y-4">
                    <div className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 text-white rounded-lg"><History size={18} /></div>
                        <span className="uppercase tracking-widest text-xs">Dados de Registo</span>
                      </div>
                    </div>
                    
                    <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                      <DetailField label="Registado Por" value={registeredDoc.registeredBy || 'Agente PN - 001'} />
                      <DetailField label="Data de Registo" value={registeredDoc.registeredAt || new Date().toLocaleDateString('pt-BR')} icon={Calendar} />
                    </div>
                  </div>

                  {/* Section: Levantamento */}
                  {registeredDoc.levantamento ? (
                    <div className="space-y-4">
                      <div className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-600 text-white rounded-lg"><Check size={18} /></div>
                          <span className="uppercase tracking-widest text-xs">Dados de Levantamento</span>
                        </div>
                      </div>
                      
                      <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <DetailField label="Nome" value={registeredDoc.levantamento.nome} />
                          <DetailField label="Apelido" value={registeredDoc.levantamento.apelido} />
                          <DetailField label="Data Nascimento" value={registeredDoc.levantamento.dataNascimento} icon={Calendar} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                          <DetailField label="Levantamento Registado Por" value={registeredDoc.levantamento.registadoPor} />
                          <DetailField label="Data de Levantamento" value={registeredDoc.levantamento.dataLevantamento} icon={Calendar} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end pt-8 border-t border-slate-100 mt-12">
                      <Button 
                        variant="primary" 
                        className="bg-green-600 hover:bg-green-700 border-green-600 shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]"
                        icon={Check}
                        onClick={() => setShowLevantamentoModal(true)}
                      >
                        Realizar Levantamento
                      </Button>
                    </div>
                  )}

                  <div className="flex justify-start pt-4">
                    <Button variant="outline" icon={ArrowLeft} onClick={() => {
                      if (isReadOnlyView) {
                        setCurrentView('document_search');
                      } else {
                        setCurrentView('dashboard');
                      }
                    }}>
                      {isReadOnlyView ? 'Voltar para Pesquisa' : 'Voltar ao Início'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : currentView === 'document_search' ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Pesquisa Documento</h2>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo Documento</label>
                      <select 
                        value={docSearchFilters.type}
                        onChange={(e) => setDocSearchFilters({...docSearchFilters, type: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none"
                      >
                        <option value="">Selecione...</option>
                        <option value="BI">BI</option>
                        <option value="Passaporte">Passaporte</option>
                        <option value="CNI">CNI</option>
                        <option value="TRE">TRE</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Número Documento</label>
                      <input 
                        type="text" 
                        value={docSearchFilters.number}
                        onChange={(e) => setDocSearchFilters({...docSearchFilters, number: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        placeholder="Ex: 001234567LA041"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                      <input 
                        type="text" 
                        value={docSearchFilters.fullName}
                        onChange={(e) => setDocSearchFilters({...docSearchFilters, fullName: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        placeholder="Nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Nascimento</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={docSearchFilters.birthDate}
                          onChange={(e) => setDocSearchFilters({...docSearchFilters, birthDate: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        />
                        <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ilha</label>
                      <select 
                        value={docSearchFilters.island}
                        onChange={(e) => setDocSearchFilters({...docSearchFilters, island: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none"
                      >
                        <option value="">Selecione...</option>
                        <option value="Santiago">Santiago</option>
                        <option value="São Vicente">São Vicente</option>
                        <option value="Sal">Sal</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade Organica</label>
                      <select 
                        value={docSearchFilters.organicUnit}
                        onChange={(e) => setDocSearchFilters({...docSearchFilters, organicUnit: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none"
                      >
                        <option value="">Selecione...</option>
                        <option value="Esquadra Fazenda">Esquadra Fazenda</option>
                        <option value="Esquadra Platô">Esquadra Platô</option>
                        <option value="Esquadra Achada Santo António">Esquadra Achada Santo António</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setDocSearchFilters({
                        type: '',
                        number: '',
                        fullName: '',
                        birthDate: '',
                        island: '',
                        organicUnit: ''
                      })}>Limpar</Button>
                      <Button variant="primary" icon={Search} onClick={() => {}}>Pesquisar</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Listagem de Documentos</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Total : {mockDocuments.length.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                          <th className="px-6 py-4">Tipo</th>
                          <th className="px-6 py-4">Numero</th>
                          <th className="px-6 py-4">Nome</th>
                          <th className="px-6 py-4">Data Nascimento</th>
                          <th className="px-6 py-4">Ilha</th>
                          <th className="px-6 py-4">Unidade Organica</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {mockDocuments.map((doc) => (
                          <tr 
                            key={doc.id}
                            onClick={() => {
                              setRegisteredDoc(doc);
                              setIsReadOnlyView(true);
                              setCurrentView('document_detail');
                            }}
                            className="hover:bg-blue-50 cursor-pointer transition-colors group"
                          >
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{doc.document.type}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{doc.document.number}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{doc.document.fullName}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{doc.document.birthDate}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{doc.storage.island}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{doc.storage.organicUnit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex gap-2">
                      <button className="p-2 bg-white border-2 border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-50" disabled><ChevronLeft size={16} /></button>
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-black">1</button>
                      <button className="p-2 bg-white border-2 border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-50" disabled><ChevronRight size={16} /></button>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Página 1 de 1</span>
                  </div>
                </div>

                <div className="flex justify-start">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('dashboard')}>Voltar ao Início</Button>
                </div>
              </motion.div>
            ) : currentView === 'certificate_list' ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Solicitação de Certificado de Cadastro</h2>
                  <Button icon={Plus} onClick={() => {
                    setCertificateStep(1);
                    setDucGenerated(false);
                    setCurrentView('certificate_registration');
                  }}>Nova Solicitação</Button>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">N.º Pedido</label>
                      <input 
                        type="text" 
                        value={certificateSearchFilters.orderNumber}
                        onChange={(e) => setCertificateSearchFilters({...certificateSearchFilters, orderNumber: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        placeholder="Ex: 000003"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome</label>
                      <input 
                        type="text" 
                        value={certificateSearchFilters.name}
                        onChange={(e) => setCertificateSearchFilters({...certificateSearchFilters, name: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        placeholder="Nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data de Nascimento</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={certificateSearchFilters.birthDate}
                          onChange={(e) => setCertificateSearchFilters({...certificateSearchFilters, birthDate: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        />
                        <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Pedido</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          value={certificateSearchFilters.requestDate}
                          onChange={(e) => setCertificateSearchFilters({...certificateSearchFilters, requestDate: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        />
                        <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                      </div>
                    </div>

                    <div className="md:col-span-4 flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setCertificateSearchFilters({
                        orderNumber: '',
                        name: '',
                        birthDate: '',
                        requestDate: ''
                      })}>Limpar</Button>
                      <Button variant="primary" icon={Search} onClick={() => {}}>Pesquisar</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Listagem de Pedidos</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Total : {mockCertificates.length.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                          <th className="px-6 py-4">Número Pedido</th>
                          <th className="px-6 py-4">Nome</th>
                          <th className="px-6 py-4">Data Nascimento</th>
                          <th className="px-6 py-4">Data Pedido</th>
                          <th className="px-6 py-4">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {mockCertificates.map((cert) => (
                          <tr 
                            key={cert.id}
                            className="hover:bg-blue-50 cursor-pointer transition-colors group"
                          >
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{cert.id}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{cert.name}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{cert.birthDate}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{cert.requestDate}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                cert.status === 'Por Pagar' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                              }`}>
                                {cert.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex gap-2">
                      <button className="p-2 bg-white border-2 border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-50" disabled><ChevronLeft size={16} /></button>
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-black">1</button>
                      <button className="p-2 bg-white border-2 border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-50" disabled><ChevronRight size={16} /></button>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Página 1 de 1</span>
                  </div>
                </div>

                <div className="flex justify-start">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('dashboard')}>Voltar</Button>
                </div>
              </motion.div>
            ) : currentView === 'certificate_registration' ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 pb-12"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Solicitação de Pedido</h2>
                </div>

                <div className="flex gap-4">
                  <div className={`flex-1 p-4 rounded-2xl border-2 transition-all ${certificateStep === 1 ? 'bg-blue-50 border-blue-600' : 'bg-white border-slate-100'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${certificateStep === 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
                      <span className={`text-xs font-black uppercase tracking-widest ${certificateStep === 1 ? 'text-blue-600' : 'text-slate-400'}`}>Identificação</span>
                    </div>
                  </div>
                  <div className={`flex-1 p-4 rounded-2xl border-2 transition-all ${certificateStep === 2 ? 'bg-blue-50 border-blue-600' : 'bg-white border-slate-100'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${certificateStep === 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
                      <span className={`text-xs font-black uppercase tracking-widest ${certificateStep === 2 ? 'text-blue-600' : 'text-slate-400'}`}>DUC</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 space-y-12">
                    {certificateStep === 1 ? (
                      <div className="space-y-12">
                        <div className="space-y-6">
                          <div className="w-full bg-slate-900 py-3 px-6 rounded-xl text-center">
                            <span className="text-xs font-black text-white uppercase tracking-[0.3em]">Dados Biograficos</span>
                          </div>

                          {/* Biographical Search bar */}
                          <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 mb-8 space-y-4">
                            <div className="flex flex-col md:flex-row gap-4 items-end">
                              <div className="w-full md:w-32 space-y-2">
                                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Tipo Doc</label>
                                <select 
                                  value={bioSearchDocType}
                                  onChange={(e) => setBioSearchDocType(e.target.value)}
                                  className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all"
                                >
                                  <option value="CNI">CNI</option>
                                  <option value="Passaporte">Passaporte</option>
                                  <option value="TRE">TRE</option>
                                  <option value="BI">BI</option>
                                </select>
                              </div>
                              <div className="flex-1 space-y-2">
                                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">N.º Documento</label>
                                <input 
                                  type="text"
                                  value={bioSearchDocNumber}
                                  onChange={(e) => setBioSearchDocNumber(e.target.value)}
                                  placeholder="Digite o número do documento..."
                                  className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all"
                                />
                              </div>
                              <div className="flex-1 space-y-2">
                                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Nome da Pessoa</label>
                                <input 
                                  type="text"
                                  value={bioSearchName}
                                  onChange={(e) => setBioSearchName(e.target.value)}
                                  placeholder="Digite o nome..."
                                  className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all"
                                />
                              </div>
                              <Button 
                                variant="secondary" 
                                icon={Search} 
                                onClick={() => {
                                  setBioSearchTarget('certificate');
                                  handleBioSearch();
                                }}
                              >
                                Pesquisar
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row gap-8 items-start">
                            {certificateData.photo && (
                              <div className="w-32 h-40 rounded-2xl border-4 border-white shadow-xl overflow-hidden shrink-0 bg-slate-100 mt-2">
                                <img src={certificateData.photo} alt="Pessoa" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
                              <div className="md:col-span-2">
                                <DetailField label="Nome Completo" value={certificateData.fullName} readOnly={false} onChange={(v) => setCertificateData({...certificateData, fullName: v})} />
                              </div>
                              <DetailField label="Data Nascimento *" value={certificateData.birthDate} type="date" readOnly={false} onChange={(v) => setCertificateData({...certificateData, birthDate: v})} />
                              <DetailField label="Sexo" value={certificateData.gender} type="select" options={['Masculino', 'Feminino']} readOnly={false} onChange={(v) => setCertificateData({...certificateData, gender: v})} />
                              <DetailField label="Estado Civil" value={certificateData.civilStatus} type="select" options={['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)']} readOnly={false} onChange={(v) => setCertificateData({...certificateData, civilStatus: v})} />
                              <DetailField label="Naturalidade" value={certificateData.birthPlace} readOnly={false} onChange={(v) => setCertificateData({...certificateData, birthPlace: v})} />
                              <DetailField label="Nacionalidade" value={certificateData.nationality} type="select" options={['Cabo-verdiana', 'Portuguesa', 'Angolana', 'Outra']} readOnly={false} onChange={(v) => setCertificateData({...certificateData, nationality: v})} />
                              <DetailField label="Nome Pai" value={certificateData.fatherName} readOnly={false} onChange={(v) => setCertificateData({...certificateData, fatherName: v})} />
                              <DetailField label="Nome Mãe" value={certificateData.motherName} readOnly={false} onChange={(v) => setCertificateData({...certificateData, motherName: v})} />
                              <DetailField label="NIF" value={certificateData.nif} readOnly={false} onChange={(v) => setCertificateData({...certificateData, nif: v})} />
                            <DetailField label="Tipo Documento" value={certificateData.docType} type="select" options={['BI', 'CNI', 'Passaporte', 'TRE']} readOnly={false} onChange={(v) => setCertificateData({...certificateData, docType: v})} />
                              <DetailField label="Número Documento" value={certificateData.docNumber} readOnly={false} onChange={(v) => setCertificateData({...certificateData, docNumber: v})} />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Endereço</h3>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <DetailField label="Ilha" value={certificateData.island} type="select" options={['Santiago', 'São Vicente', 'Sal', 'Boa Vista', 'Fogo', 'Santo Antão', 'Maio', 'Brava', 'São Nicolau']} readOnly={false} onChange={(v) => setCertificateData({...certificateData, island: v})} />
                            <DetailField label="Conselho" value={certificateData.county} readOnly={false} onChange={(v) => setCertificateData({...certificateData, county: v})} />
                            <DetailField label="Freguesia" value={certificateData.parish} readOnly={false} onChange={(v) => setCertificateData({...certificateData, parish: v})} />
                            <DetailField label="Localidade" value={certificateData.locality} readOnly={false} onChange={(v) => setCertificateData({...certificateData, locality: v})} />
                            <div className="md:col-span-2">
                              <DetailField label="Ponto de Referencia" value={certificateData.reference} readOnly={false} onChange={(v) => setCertificateData({...certificateData, reference: v})} icon={MapPin} />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Contacto</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailField label="Telemovel" value={certificateData.phone} readOnly={false} onChange={(v) => setCertificateData({...certificateData, phone: v})} />
                            <DetailField label="Email" value={certificateData.email} readOnly={false} onChange={(v) => setCertificateData({...certificateData, email: v})} />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Motivo de Solicitação</h3>
                          <div className="grid grid-cols-1">
                            <DetailField label="Motivo de Solicitação" value={certificateData.reason} readOnly={false} onChange={(v) => setCertificateData({...certificateData, reason: v})} />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="w-full bg-slate-900 py-3 px-6 rounded-xl text-center">
                            <span className="text-xs font-black text-white uppercase tracking-[0.3em]">Anexos</span>
                          </div>
                          <div className="flex flex-wrap gap-4">
                            {certificateData.attachments.map((file, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl">
                                <FileText size={20} className="text-slate-900" />
                                <span className="text-xs font-bold text-slate-900">{file.name}</span>
                                <button className="text-red-500 hover:text-red-700" onClick={() => {
                                  const newFiles = [...certificateData.attachments];
                                  newFiles.splice(idx, 1);
                                  setCertificateData({...certificateData, attachments: newFiles});
                                }}><Trash2 size={14} /></button>
                              </div>
                            ))}
                            <button 
                              onClick={() => setCertificateData({...certificateData, attachments: [...certificateData.attachments, { name: 'documento.pdf' }]})}
                              className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all"
                            >
                              <Plus size={18} />
                              <span className="text-xs font-black uppercase tracking-widest">Adicionar Anexo</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-12">
                        <div className="w-full bg-slate-900 py-3 px-6 rounded-xl text-center">
                          <span className="text-xs font-black text-white uppercase tracking-[0.3em]">Documento Unico de Cobrança</span>
                        </div>
                        
                        {!ducGenerated ? (
                          <div className="flex flex-col items-center justify-center py-12 space-y-6">
                            <div className="p-6 bg-blue-50 text-blue-600 rounded-full">
                              <FileText size={48} />
                            </div>
                            <div className="text-center space-y-2">
                              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Gerar Documento de Cobrança</h3>
                              <p className="text-sm text-slate-400 font-medium">Clique no botão abaixo para gerar o DUC para este pedido.</p>
                            </div>
                            <Button variant="secondary" onClick={() => setDucGenerated(true)}>Gerar DUC</Button>
                          </div>
                        ) : (
                          <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                                    <th className="px-6 py-4">Numero DUC</th>
                                    <th className="px-6 py-4">Total a Pagar</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4 text-right">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-slate-50">
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900">9865457</td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900">500$</td>
                                    <td className="px-6 py-4">
                                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest">Por Pagar</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <div className="flex justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-slate-900"><Eye size={16} /></button>
                                        <button className="p-2 text-slate-400 hover:text-slate-900"><ClipboardList size={16} /></button>
                                        <button className="p-2 text-slate-400 hover:text-slate-900"><History size={16} /></button>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-8 bg-slate-50 border-t-2 border-slate-100 flex justify-between items-center">
                    <Button variant="outline" icon={ArrowLeft} onClick={() => {
                      if (certificateStep === 1) {
                        setCurrentView('certificate_list');
                      } else {
                        setCertificateStep(1);
                      }
                    }}>Voltar</Button>
                    
                    <div className="flex gap-3">
                      {certificateStep === 1 ? (
                        <Button variant="primary" icon={ArrowRight} onClick={() => setCertificateStep(2)}>Próximo</Button>
                      ) : (
                        ducGenerated && (
                          <Button variant="primary" icon={Check} onClick={() => {
                            setMockCertificates([...mockCertificates, {
                              id: '000004',
                              name: certificateData.fullName || 'Novo Pedido',
                              birthDate: certificateData.birthDate || '---',
                              requestDate: new Date().toLocaleDateString('pt-BR'),
                              status: 'Por Pagar'
                            }]);
                            setSuccessMessage('Solicitação de Certificado Registada com Sucesso');
                            setShowSuccessModal(true);
                            setCurrentView('certificate_list');
                          }}>Concluir</Button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : currentView === 'certificate_analysis' ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Análise de Certificado de Cadastro</h2>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <DetailField label="N.º Pedido" value={certificateSearchFilters.orderNumber} readOnly={false} onChange={(val) => setCertificateSearchFilters({...certificateSearchFilters, orderNumber: val})} />
                    <DetailField label="Nome" value={certificateSearchFilters.name} readOnly={false} onChange={(val) => setCertificateSearchFilters({...certificateSearchFilters, name: val})} />
                    <DetailField label="Data de Nascimento" value={certificateSearchFilters.birthDate} type="date" readOnly={false} icon={Calendar} onChange={(val) => setCertificateSearchFilters({...certificateSearchFilters, birthDate: val})} />
                    <DetailField label="Data Pedido" value={certificateSearchFilters.requestDate} type="date" readOnly={false} icon={Calendar} onChange={(val) => setCertificateSearchFilters({...certificateSearchFilters, requestDate: val})} />
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button variant="primary" icon={Search} onClick={() => {}}>Pesquisar</Button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Listagem de Pedidos</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Total : {mockAnalysisCertificates.length.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                          <th className="px-6 py-4">Número Pedido</th>
                          <th className="px-6 py-4">Nome</th>
                          <th className="px-6 py-4">Data Nascimento</th>
                          <th className="px-6 py-4">Data Pedido</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {mockAnalysisCertificates.map((cert) => (
                          <tr 
                            key={cert.id}
                            onClick={() => {
                              setSelectedAnalysisCertificate(cert);
                              setAssociatedPerson(null);
                              setSuggestedFicha(null);
                              
                              // Auto-match ficha
                              const match = fichas.find(f => 
                                (cert.biographic.nif && f.nif === cert.biographic.nif) || 
                                (cert.biographic.docNumber && (f.docNumber === cert.biographic.docNumber || f.number === cert.biographic.docNumber))
                              );
                              
                              if (match) {
                                setSuggestedFicha(match);
                              }
                              
                              setCurrentView('certificate_analysis_detail');
                            }}
                            className="hover:bg-blue-50 cursor-pointer transition-colors group"
                          >
                            <td className="px-6 py-4 text-sm font-bold text-blue-600 group-hover:underline">{cert.id}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{cert.name}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{cert.birthDate}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{cert.requestDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-start">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('dashboard')}>Voltar ao Início</Button>
                </div>
              </motion.div>
            ) : currentView === 'certificate_analysis_detail' && selectedAnalysisCertificate ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 pb-12"
              >
                {/* Sugestão de Vínculo ou Cadastro Associado */}
                <AnimatePresence mode="wait">
                  {associatedPerson ? (
                    <motion.div 
                      key="associated"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 mb-8"
                    >
                      <button 
                        onClick={() => toggleSection('associated')}
                        className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 text-white rounded-lg">
                            <Fingerprint size={18} />
                          </div>
                          <span className="uppercase tracking-widest text-xs">Cadastro Associado</span>
                        </div>
                        {expandedSections.associated ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>

                      <AnimatePresence>
                        {expandedSections.associated && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 space-y-8 shadow-sm mt-2 relative">
                              <div className="flex flex-col md:flex-row gap-8">
                                {/* Profile Picture */}
                                <div className="flex-shrink-0">
                                  <div className="w-32 h-40 border-2 border-slate-900 rounded overflow-hidden shadow-md bg-slate-100 relative">
                                    <img 
                                      src="https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?q=80&w=300&h=400&auto=format&fit=crop" 
                                      alt="Perfil" 
                                      className="w-full h-full object-cover grayscale contrast-150 brightness-90"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[8px] text-white text-center py-0.5 font-mono">
                                      PN-CV-0001-2024-SIDE
                                    </div>
                                  </div>
                                </div>

                                <div className="flex-1 space-y-6">
                                  <div className="flex justify-between items-start">
                                    <div className="w-full max-w-xs">
                                      <DetailField label="Cadastro nº:" value={associatedPerson.number} />
                                    </div>
                                    <div className="flex gap-3">
                                      <button 
                                        onClick={() => {
                                          setHideNewCadastroInAssociate(false);
                                          setShowAssociateModal(true);
                                        }}
                                        className="px-4 py-2 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all text-xs border border-blue-900 shadow-sm flex items-center gap-2"
                                      >
                                        <Search size={14} />
                                        Alterar Vínculo
                                      </button>
                                      <button 
                                        onClick={() => {
                                          setHideNewCadastroInAssociate(true);
                                          setIsNewRegistration(true);
                                        }}
                                        className="px-4 py-2 bg-blue-400 text-white font-bold rounded-xl hover:bg-blue-500 transition-all text-xs border border-blue-400 shadow-sm flex items-center gap-2"
                                      >
                                        <UserPlus size={14} />
                                        Novo Cadastro
                                      </button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <DetailField label="Nome Completo" value={`${associatedPerson.name} ${associatedPerson.surname}`} />
                                    <DetailField label="Data Nascimento *" value={new Date(associatedPerson.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
                                    <DetailField label="Sexo" value={associatedPerson.gender} />
                                    <DetailField label="Estado Civil" value={associatedPerson.maritalStatus} />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Identificação</h3>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                  <DetailField label="NIF" value={associatedPerson.nif || ''} readOnly={false} onChange={(val) => setAssociatedPerson({...associatedPerson, nif: val})} />
                                  <DetailField label="Tipo Documento" value="CNI" />
                                  <DetailField label="Número Documento" value={associatedPerson.docNumber || associatedPerson.number || '---'} />
                                  <DetailField label="Data Emissão" value="15/10/2020" icon={Calendar} />
                                  <DetailField label="Data Validade" value="15/10/2025" icon={Calendar} />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Motivo do Cadastro Accordion */}
                      {associatedPerson.registrationReasons && (
                        <div className="mt-4">
                          <button 
                            onClick={() => toggleSection('associatedMotivo')}
                            className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-900 text-white rounded-lg"><HelpCircle size={18} /></div>
                              <span className="uppercase tracking-widest text-xs">Motivos do Cadastro ASSOCIADO</span>
                            </div>
                            {expandedSections.associatedMotivo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                          
                          <AnimatePresence>
                            {expandedSections.associatedMotivo && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6 mt-2">
                                  <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                                    <table className="w-full text-left border-collapse">
                                      <thead>
                                        <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                          <th className="px-6 py-4">Data</th>
                                          <th className="px-6 py-4">Motivo</th>
                                          <th className="px-6 py-4">Nº Ref</th>
                                          <th className="px-6 py-4">Destino</th>
                                          <th className="px-6 py-4">Medidas</th>
                                          <th className="px-6 py-4">Tipo</th>
                                          <th className="px-6 py-4">Estado</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-50">
                                        {(associatedPerson.registrationReasons || []).map((reg: any) => (
                                          <tr key={reg.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.date}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.reason}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.refNo}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.destination}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.measures}</td>
                                            <td className="px-6 py-4 text-xs">
                                              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                                                reg.type === 'Criminal' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                                              }`}>
                                                {reg.type}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs">
                                              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                                                reg.status === 'Reabilitado' ? 'bg-emerald-50 text-emerald-600' : 
                                                reg.status === 'Ativo' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                                              }`}>
                                                {reg.status}
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="not-associated"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 mb-8"
                    >
                      {/* Banner Area */}
                      <div className={`${suggestedFicha ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'} border-2 rounded-2xl p-6 shadow-sm mb-4`}>
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 ${suggestedFicha ? 'bg-blue-600 shadow-blue-200' : 'bg-slate-400 shadow-slate-200'} text-white rounded-xl shadow-lg`}>
                              {suggestedFicha ? <ShieldCheck size={24} /> : <Search size={24} />}
                            </div>
                            <div>
                              <h4 className={`text-sm font-black ${suggestedFicha ? 'text-blue-900' : 'text-slate-900'} uppercase tracking-wider`}>
                                {suggestedFicha ? 'Possível Correspondência Encontrada' : 'Nenhuma Correspondência Encontrada'}
                              </h4>
                              <p className={`text-xs ${suggestedFicha ? 'text-blue-700' : 'text-slate-500'} font-medium italic`}>
                                {suggestedFicha 
                                  ? <>Dados biográficos coincidem com o cadastro <strong>{suggestedFicha.number}</strong></>
                                  : 'Não foi encontrada nenhuma correspondência automática para este pedido.'}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {suggestedFicha && (
                              <button 
                                onClick={() => {
                                  setAssociatedPerson(suggestedFicha);
                                  setSuggestedFicha(null);
                                }}
                                className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-xs shadow-lg shadow-blue-200 flex items-center gap-2"
                              >
                                <CheckCircle size={14} />
                                Aceitar Match
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                setHideNewCadastroInAssociate(false);
                                setShowAssociateModal(true);
                              }}
                              className="px-4 py-2.5 bg-white text-slate-600 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all text-xs flex items-center gap-2"
                            >
                              <Search size={14} />
                              Associar Cadastro
                            </button>
                          </div>
                        </div>
                      </div>

                      {suggestedFicha && (
                        <>
                          <button 
                            onClick={() => toggleSection('associated')}
                            className="w-full bg-white border-2 border-blue-200 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-600 text-white rounded-lg">
                                <Fingerprint size={18} />
                              </div>
                              <span className="uppercase tracking-widest text-xs">Sugestão de Cadastro (Match)</span>
                            </div>
                            {expandedSections.associated ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>

                          <AnimatePresence>
                            {expandedSections.associated && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-white border-2 border-blue-100 shadow-blue-50 rounded-2xl p-8 space-y-8 shadow-sm mt-2 relative">
                                  <div className="absolute top-4 right-8">
                                    <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase tracking-tighter">Dados em Revisão</span>
                                  </div>
                                  
                                  <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-shrink-0">
                                      <div className="w-32 h-40 border-2 border-slate-900 rounded overflow-hidden shadow-md bg-slate-100 relative">
                                        <img 
                                          src="https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?q=80&w=300&h=400&auto=format&fit=crop" 
                                          alt="Perfil" 
                                          className="w-full h-full object-cover grayscale contrast-150 brightness-90 opacity-60"
                                          referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[8px] text-white text-center py-0.5 font-mono">
                                          PN-CV-0001-2024-SIDE
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex-1 space-y-6">
                                      <div className="flex justify-between items-start">
                                        <div className="w-full max-w-xs">
                                          <DetailField label="Cadastro nº:" value={suggestedFicha.number} />
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <DetailField label="Nome Completo" value={`${suggestedFicha.name} ${suggestedFicha.surname}`} />
                                        <DetailField label="Data Nascimento *" value={new Date(suggestedFicha.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
                                        <DetailField label="Sexo" value={suggestedFicha.gender} />
                                        <DetailField label="Estado Civil" value={suggestedFicha.maritalStatus} />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Identificação</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                      <DetailField label="NIF" value={suggestedFicha.nif || ''} readOnly={true} />
                                      <DetailField label="Tipo Documento" value="CNI" />
                                      <DetailField label="Número Documento" value={suggestedFicha.docNumber || suggestedFicha.number || '---'} />
                                      <DetailField label="Data Emissão" value="15/10/2020" icon={Calendar} />
                                      <DetailField label="Data Validade" value="15/10/2025" icon={Calendar} />
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                  <div className="border-b-2 border-slate-900 pb-2 mb-6">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Dados Biográficos</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <DetailField label="Nome Completo" value={selectedAnalysisCertificate.biographic.fullName} />
                    <DetailField label="Data Nascimento *" value={selectedAnalysisCertificate.biographic.birthDate} icon={Calendar} />
                    <DetailField label="Sexo" value={selectedAnalysisCertificate.biographic.gender} />
                    <DetailField label="Estado Civil" value={selectedAnalysisCertificate.biographic.civilStatus} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <DetailField label="Naturalidade" value={selectedAnalysisCertificate.biographic.birthPlace} />
                    <DetailField label="Nacionalidade" value={selectedAnalysisCertificate.biographic.nationality} />
                    <DetailField label="Nome Pai" value={selectedAnalysisCertificate.biographic.fatherName} />
                    <DetailField label="Nome Mãe" value={selectedAnalysisCertificate.biographic.motherName} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <DetailField label="NIF" value={selectedAnalysisCertificate.biographic.nif || '---'} />
                    <DetailField label="Tipo Documento" value={selectedAnalysisCertificate.biographic.docType} />
                    <DetailField label="Número Documento" value={selectedAnalysisCertificate.biographic.docNumber} />
                  </div>

                  <div className="space-y-4 pt-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endereço</h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      <DetailField label="Ilha" value={selectedAnalysisCertificate.address.island} />
                      <DetailField label="Conselho" value={selectedAnalysisCertificate.address.council} />
                      <DetailField label="Freguesia" value={selectedAnalysisCertificate.address.parish} />
                      <DetailField label="Localidade" value={selectedAnalysisCertificate.address.locality} />
                      <DetailField label="Ponto de Referencia" value={selectedAnalysisCertificate.address.reference} icon={MapPin} />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <DetailField label="Telemovel" value={selectedAnalysisCertificate.contact.mobile} />
                      <DetailField label="Email" value={selectedAnalysisCertificate.contact.email} />
                    </div>
                  </div>

                  <div className="pt-4">
                    <DetailField label="Ficha de Antecedente" value={selectedAnalysisCertificate.reason} />
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                  <div className="border-b-2 border-slate-900 pb-2 mb-6">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Anexos</h3>
                  </div>
                  <div className="space-y-4">
                    <Button variant="outline" icon={Plus} className="text-xs py-2">Adicionar Anexo</Button>
                    <div className="space-y-2">
                      {selectedAnalysisCertificate.attachments.map((file: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-100 rounded-xl">
                          <div className="flex items-center gap-3">
                            <FileText size={18} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-900">{file.name}</span>
                          </div>
                          <button className="text-slate-400 hover:text-red-600 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                  <div className="border-b-2 border-slate-900 pb-2 mb-4 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Observações</h3>
                    <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Novo +</button>
                  </div>
                  <div className="space-y-4">
                    {selectedAnalysisCertificate.observations.map((obs: any, idx: number) => (
                      <div key={idx} className="p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                            <ImageIcon size={20} className="text-slate-400" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{obs.user}</p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{obs.date}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{obs.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-4 bg-slate-50 border-b-2 border-slate-100 flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Historico do pedido</h3>
                    <button className="p-1 hover:bg-slate-200 rounded transition-colors"><ChevronDown size={16} /></button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                          <th className="px-6 py-4">Data</th>
                          <th className="px-6 py-4">Fase</th>
                          <th className="px-6 py-4">Estado</th>
                          <th className="px-6 py-4">Utente</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {selectedAnalysisCertificate.history.map((h: any, idx: number) => (
                          <tr key={idx} className="bg-white">
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{h.date}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{h.phase}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{h.status}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{h.user}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Modelo de Certificado Accordion */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('certificateModel')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><FileText size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Modelo de Certificado de Cadastro</span>
                    </div>
                    {expandedSections.certificateModel ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  <AnimatePresence>
                    {expandedSections.certificateModel && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-slate-200 p-8 rounded-2xl flex justify-center">
                          <div className="bg-white w-full max-w-3xl shadow-2xl p-12 space-y-8 font-serif text-slate-800 border border-slate-300">
                            {/* Document Header */}
                            <div className="flex flex-col items-center text-center space-y-2 border-b-2 border-slate-900 pb-6">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                                  <Shield size={32} className="text-slate-400" />
                                </div>
                                <div className="text-left">
                                  <p className="text-xs font-bold uppercase tracking-tighter">Ministério da Administração Interna</p>
                                  <p className="text-[10px] font-bold uppercase tracking-tighter">Direção Nacional da Polícia Nacional</p>
                                  <p className="text-[10px] font-bold uppercase tracking-tighter">Direção Central de Investigação Criminal</p>
                                </div>
                              </div>
                            </div>

                            {/* Document Title */}
                            <div className="text-center space-y-2">
                              <div className="inline-block border-2 border-slate-900 px-8 py-2">
                                <p className="text-sm font-black uppercase tracking-widest">Certificado de Cadastro Policial</p>
                                <p className="text-xs font-bold">N.º {selectedAnalysisCertificate.id}/2024</p>
                              </div>
                            </div>

                            {/* Document Body */}
                            <div className="space-y-6 text-justify leading-relaxed text-sm">
                              <p className="font-bold">ROBERTO CARLOS CENTEIO LIMA, Subintendente da Polícia Nacional e Diretor da Direção Central de Investigação Criminal da Polícia Nacional---------------------------------------</p>
                              
                              <p>
                                <span className="font-bold">CERTIFICA</span>, que compulsados os ficheiros existentes no arquivo desta Direção, verifica-se que respeitante ao (à) cidadão (ã) Cabo-verdiano senhor (a) <span className="font-bold uppercase underline">{associatedPerson?.name} {associatedPerson?.surname}</span>, {associatedPerson?.maritalStatus || 'solteiro'}, nascido (a) em <span className="font-bold">{new Date(associatedPerson?.birthDate).toLocaleDateString('pt-BR')}</span>, filho (a) de <span className="font-bold">---</span>, natural de <span className="font-bold">Cabo Verde</span> e residente em <span className="font-bold">---</span>, portador de CNI Nº <span className="font-bold">9884565</span> emitido pelo (a) <span className="font-bold">---</span> em <span className="font-bold">15/10/2020</span>.
                              </p>

                              <div className="border-y-2 border-slate-900 py-2 text-center">
                                <p className="font-black tracking-[0.5em] uppercase">Nada Consta--------------------------------------------------------------------------------</p>
                              </div>

                              <p>Este certificado destina-se a <span className="font-bold uppercase underline">{selectedAnalysisCertificate.reason}</span> e só para esse fim é válido.</p>
                              
                              <p>Por ser verdade e haver sido solicitado pelo (a) interessado (a), manda passar o presente certificado, que vai devidamente assinado e autenticado com o carimbo a óleo em uso nesta Direção.</p>
                            </div>

                            {/* Document Footer */}
                            <div className="pt-12 flex flex-col items-center text-center space-y-8">
                              <p className="text-xs font-bold">Direção Central de Investigação Criminal, {new Date().toLocaleDateString('pt-BR')}</p>
                              
                              <div className="space-y-1">
                                <p className="text-xs font-bold">O Diretor,</p>
                                <div className="pt-8">
                                  <p className="text-xs font-bold">/Roberto Carlos Centeio Lima/</p>
                                  <p className="text-[10px] font-bold">Subintendente da PN</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between pt-8 border-t border-slate-100">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('certificate_analysis')}>Voltar</Button>
                  <Button 
                    variant="primary" 
                    icon={Check} 
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      if (!associatedPerson) {
                        setErrorMessage('Deve associar uma ficha de cadastro antes de concluir.');
                        setShowErrorModal(true);
                        return;
                      }
                      // Move to decision
                      const newDecisionCert = {
                        ...selectedAnalysisCertificate,
                        associatedPerson: associatedPerson,
                        status: 'Para Decisão',
                        history: [
                          ...selectedAnalysisCertificate.history,
                          { date: new Date().toLocaleDateString('pt-BR'), phase: 'Decisão', status: 'Para Decisão', user: user?.name || 'Sistema' }
                        ]
                      };
                      setMockDecisionCertificates([...mockDecisionCertificates, newDecisionCert]);
                      setMockAnalysisCertificates(mockAnalysisCertificates.filter(c => c.id !== selectedAnalysisCertificate.id));
                      setSuccessMessage('Pedido enviado para Decisão com sucesso.');
                      setShowSuccessModal(true);
                      setCurrentView('certificate_analysis');
                    }}
                  >
                    Concluir
                  </Button>
                </div>
              </motion.div>
            ) : currentView === 'certificate_decision' ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Decisão de Certificado de Cadastro</h2>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <DetailField label="N.º Pedido" value={certificateSearchFilters.orderNumber} readOnly={false} onChange={(val) => setCertificateSearchFilters({...certificateSearchFilters, orderNumber: val})} />
                    <DetailField label="Nome" value={certificateSearchFilters.name} readOnly={false} onChange={(val) => setCertificateSearchFilters({...certificateSearchFilters, name: val})} />
                    <DetailField label="Data de Nascimento" value={certificateSearchFilters.birthDate} type="date" readOnly={false} icon={Calendar} onChange={(val) => setCertificateSearchFilters({...certificateSearchFilters, birthDate: val})} />
                    <DetailField label="Data Pedido" value={certificateSearchFilters.requestDate} type="date" readOnly={false} icon={Calendar} onChange={(val) => setCertificateSearchFilters({...certificateSearchFilters, requestDate: val})} />
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button variant="primary" icon={Search} onClick={() => {}}>Pesquisar</Button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Listagem de Pedidos para Decisão</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Total : {mockDecisionCertificates.length.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                          <th className="px-6 py-4">Número Pedido</th>
                          <th className="px-6 py-4">Nome</th>
                          <th className="px-6 py-4">Data Nascimento</th>
                          <th className="px-6 py-4">Data Pedido</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {mockDecisionCertificates.length > 0 ? (
                          mockDecisionCertificates.map((cert) => (
                            <tr 
                              key={cert.id}
                              onClick={() => {
                                setSelectedDecisionCertificate(cert);
                                setAssociatedPerson(cert.associatedPerson);
                                setSuggestedFicha(null);
                                
                                if (!cert.associatedPerson) {
                                  // Auto-match if not already associated
                                  const match = fichas.find(f => 
                                    (cert.biographic.nif && f.nif === cert.biographic.nif) || 
                                    (cert.biographic.docNumber && (f.docNumber === cert.biographic.docNumber || f.number === cert.biographic.docNumber))
                                  );
                                  if (match) setSuggestedFicha(match);
                                }
                                
                                setCurrentView('certificate_decision_detail');
                              }}
                              className="hover:bg-blue-50 cursor-pointer transition-colors group"
                            >
                              <td className="px-6 py-4 text-sm font-bold text-blue-600 group-hover:underline">{cert.id}</td>
                              <td className="px-6 py-4 text-sm font-bold text-slate-900">{cert.name}</td>
                              <td className="px-6 py-4 text-sm font-bold text-slate-600">{cert.birthDate}</td>
                              <td className="px-6 py-4 text-sm font-bold text-slate-600">{cert.requestDate}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic text-sm">Nenhum pedido aguardando decisão.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-start">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('dashboard')}>Voltar ao Início</Button>
                </div>
              </motion.div>
            ) : currentView === 'certificate_decision_detail' && selectedDecisionCertificate ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 pb-12"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Decisão de Certificado de Cadastro</h2>
                </div>

                {/* Sugestão de Vínculo ou Cadastro Associado */}
                <AnimatePresence mode="wait">
                  {associatedPerson ? (
                    <motion.div 
                      key="associated"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 mb-8"
                    >
                      <button 
                        onClick={() => toggleSection('associated')}
                        className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 text-white rounded-lg">
                            <Fingerprint size={18} />
                          </div>
                          <span className="uppercase tracking-widest text-xs">Cadastro Associado</span>
                        </div>
                        {expandedSections.associated ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>

                      <AnimatePresence>
                        {expandedSections.associated && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 space-y-8 shadow-sm mt-2 relative">
                              <div className="flex flex-col md:flex-row gap-8">
                                {/* Profile Picture */}
                                <div className="flex-shrink-0">
                                  <div className="w-32 h-40 border-2 border-slate-900 rounded overflow-hidden shadow-md bg-slate-100 relative">
                                    <img 
                                      src="https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?q=80&w=300&h=400&auto=format&fit=crop" 
                                      alt="Perfil" 
                                      className="w-full h-full object-cover grayscale contrast-150 brightness-90"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[8px] text-white text-center py-0.5 font-mono">
                                      PN-CV-0001-2024-SIDE
                                    </div>
                                  </div>
                                </div>

                                <div className="flex-1 space-y-6">
                                  <div className="flex justify-between items-start">
                                    <div className="w-full max-w-xs">
                                      <DetailField label="Cadastro nº:" value={associatedPerson.number} />
                                    </div>
                                    <div className="flex gap-3">
                                      <button 
                                        onClick={() => {
                                          setHideNewCadastroInAssociate(false);
                                          setShowAssociateModal(true);
                                        }}
                                        className="px-4 py-2 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all text-xs border border-blue-900 shadow-sm flex items-center gap-2"
                                      >
                                        <Search size={14} />
                                        Alterar Vínculo
                                      </button>
                                      <button 
                                        onClick={() => {
                                          setHideNewCadastroInAssociate(true);
                                          setIsNewRegistration(true);
                                        }}
                                        className="px-4 py-2 bg-blue-400 text-white font-bold rounded-xl hover:bg-blue-500 transition-all text-xs border border-blue-400 shadow-sm flex items-center gap-2"
                                      >
                                        <UserPlus size={14} />
                                        Novo Cadastro
                                      </button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <DetailField label="Nome Completo" value={`${associatedPerson.name} ${associatedPerson.surname}`} />
                                    <DetailField label="Data Nascimento *" value={new Date(associatedPerson.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
                                    <DetailField label="Sexo" value={associatedPerson.gender} />
                                    <DetailField label="Estado Civil" value={associatedPerson.maritalStatus} />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Identificação</h3>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                  <DetailField label="NIF" value={associatedPerson.nif || ''} readOnly={false} onChange={(val) => setAssociatedPerson({...associatedPerson, nif: val})} />
                                  <DetailField label="Tipo Documento" value="CNI" />
                                  <DetailField label="Número Documento" value={associatedPerson.docNumber || associatedPerson.number || '---'} />
                                  <DetailField label="Data Emissão" value="15/10/2020" icon={Calendar} />
                                  <DetailField label="Data Validade" value="15/10/2025" icon={Calendar} />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Motivo do Cadastro Accordion */}
                      {associatedPerson.registrationReasons && (
                        <div className="mt-4">
                          <button 
                            onClick={() => toggleSection('associatedMotivo')}
                            className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-900 text-white rounded-lg"><HelpCircle size={18} /></div>
                              <span className="uppercase tracking-widest text-xs">Motivos do Cadastro ASSOCIADO</span>
                            </div>
                            {expandedSections.associatedMotivo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                          
                          <AnimatePresence>
                            {expandedSections.associatedMotivo && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6 mt-2">
                                  <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                                    <table className="w-full text-left border-collapse">
                                      <thead>
                                        <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                          <th className="px-6 py-4">Data</th>
                                          <th className="px-6 py-4">Motivo</th>
                                          <th className="px-6 py-4">Nº Ref</th>
                                          <th className="px-6 py-4">Destino</th>
                                          <th className="px-6 py-4">Medidas</th>
                                          <th className="px-6 py-4">Tipo</th>
                                          <th className="px-6 py-4">Estado</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-50">
                                        {(associatedPerson.registrationReasons || []).map((reg: any) => (
                                          <tr key={reg.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.date}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.reason}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.refNo}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.destination}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.measures}</td>
                                            <td className="px-6 py-4 text-xs">
                                              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                                                reg.type === 'Criminal' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                                              }`}>
                                                {reg.type}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs">
                                              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                                                reg.status === 'Reabilitado' ? 'bg-emerald-50 text-emerald-600' : 
                                                reg.status === 'Ativo' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                                              }`}>
                                                {reg.status}
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="not-associated"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 mb-8"
                    >
                      {/* Banner Area */}
                      <div className={`${suggestedFicha ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'} border-2 rounded-2xl p-6 shadow-sm mb-4`}>
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 ${suggestedFicha ? 'bg-blue-600 shadow-blue-200' : 'bg-slate-400 shadow-slate-200'} text-white rounded-xl shadow-lg`}>
                              {suggestedFicha ? <ShieldCheck size={24} /> : <Search size={24} />}
                            </div>
                            <div>
                              <h4 className={`text-sm font-black ${suggestedFicha ? 'text-blue-900' : 'text-slate-900'} uppercase tracking-wider`}>
                                {suggestedFicha ? 'Possível Correspondência Encontrada' : 'Nenhuma Correspondência Encontrada'}
                              </h4>
                              <p className={`text-xs ${suggestedFicha ? 'text-blue-700' : 'text-slate-500'} font-medium italic`}>
                                {suggestedFicha 
                                  ? <>Dados biográficos coincidem com o cadastro <strong>{suggestedFicha.number}</strong></>
                                  : 'Não foi encontrada nenhuma correspondência automática para este pedido.'}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {suggestedFicha && (
                              <button 
                                onClick={() => {
                                  setAssociatedPerson(suggestedFicha);
                                  setSuggestedFicha(null);
                                }}
                                className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-xs shadow-lg shadow-blue-200 flex items-center gap-2"
                              >
                                <CheckCircle size={14} />
                                Aceitar Match
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                setHideNewCadastroInAssociate(false);
                                setShowAssociateModal(true);
                              }}
                              className="px-4 py-2.5 bg-white text-slate-600 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all text-xs flex items-center gap-2"
                            >
                              <Search size={14} />
                              Associar Cadastro
                            </button>
                          </div>
                        </div>
                      </div>

                      {suggestedFicha && (
                        <>
                          <button 
                            onClick={() => toggleSection('associated')}
                            className="w-full bg-white border-2 border-blue-200 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-600 text-white rounded-lg">
                                <Fingerprint size={18} />
                              </div>
                              <span className="uppercase tracking-widest text-xs">Sugestão de Cadastro (Match)</span>
                            </div>
                            {expandedSections.associated ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>

                          <AnimatePresence>
                            {expandedSections.associated && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-white border-2 border-blue-100 shadow-blue-50 rounded-2xl p-8 space-y-8 shadow-sm mt-2 relative">
                                  <div className="absolute top-4 right-8">
                                    <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase tracking-tighter">Dados em Revisão</span>
                                  </div>
                                  
                                  <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-shrink-0">
                                      <div className="w-32 h-40 border-2 border-slate-900 rounded overflow-hidden shadow-md bg-slate-100 relative">
                                        <img 
                                          src="https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?q=80&w=300&h=400&auto=format&fit=crop" 
                                          alt="Perfil" 
                                          className="w-full h-full object-cover grayscale contrast-150 brightness-90 opacity-60"
                                          referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[8px] text-white text-center py-0.5 font-mono">
                                          PN-CV-0001-2024-SIDE
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex-1 space-y-6">
                                      <div className="flex justify-between items-start">
                                        <div className="w-full max-w-xs">
                                          <DetailField label="Cadastro nº:" value={suggestedFicha.number} />
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <DetailField label="Nome Completo" value={`${suggestedFicha.name} ${suggestedFicha.surname}`} />
                                        <DetailField label="Data Nascimento *" value={new Date(suggestedFicha.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
                                        <DetailField label="Sexo" value={suggestedFicha.gender} />
                                        <DetailField label="Estado Civil" value={suggestedFicha.maritalStatus} />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Identificação</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                      <DetailField label="NIF" value={suggestedFicha.nif || ''} readOnly={true} />
                                      <DetailField label="Tipo Documento" value="CNI" />
                                      <DetailField label="Número Documento" value={suggestedFicha.docNumber || suggestedFicha.number || '---'} />
                                      <DetailField label="Data Emissão" value="15/10/2020" icon={Calendar} />
                                      <DetailField label="Data Validade" value="15/10/2025" icon={Calendar} />
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Modelo de Certificado Accordion */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('certificateModel')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><FileText size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Modelo de Certificado de Cadastro</span>
                    </div>
                    {expandedSections.certificateModel ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  <AnimatePresence>
                    {expandedSections.certificateModel && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-slate-200 p-8 rounded-2xl flex justify-center">
                          <div className="bg-white w-full max-w-3xl shadow-2xl p-12 space-y-8 font-serif text-slate-800 border border-slate-300">
                            {/* Document Header */}
                            <div className="flex flex-col items-center text-center space-y-2 border-b-2 border-slate-900 pb-6">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                                  <Shield size={32} className="text-slate-400" />
                                </div>
                                <div className="text-left">
                                  <p className="text-xs font-bold uppercase tracking-tighter">Ministério da Administração Interna</p>
                                  <p className="text-[10px] font-bold uppercase tracking-tighter">Direção Nacional da Polícia Nacional</p>
                                  <p className="text-[10px] font-bold uppercase tracking-tighter">Direção Central de Investigação Criminal</p>
                                </div>
                              </div>
                            </div>

                            {/* Document Title */}
                            <div className="text-center space-y-2">
                              <div className="inline-block border-2 border-slate-900 px-8 py-2">
                                <p className="text-sm font-black uppercase tracking-widest">Certificado de Cadastro Policial</p>
                                <p className="text-xs font-bold">N.º {selectedDecisionCertificate.id}/2024</p>
                              </div>
                            </div>

                            {/* Document Body */}
                            <div className="space-y-6 text-justify leading-relaxed text-sm">
                              <p className="font-bold">ROBERTO CARLOS CENTEIO LIMA, Subintendente da Polícia Nacional e Diretor da Direção Central de Investigação Criminal da Polícia Nacional---------------------------------------</p>
                              
                              <p>
                                <span className="font-bold">CERTIFICA</span>, que compulsados os ficheiros existentes no arquivo desta Direção, verifica-se que respeitante ao (à) cidadão (ã) Cabo-verdiano senhor (a) <span className="font-bold uppercase underline">{associatedPerson?.name} {associatedPerson?.surname}</span>, {associatedPerson?.maritalStatus || 'solteiro'}, nascido (a) em <span className="font-bold">{new Date(associatedPerson?.birthDate).toLocaleDateString('pt-BR')}</span>, filho (a) de <span className="font-bold">---</span>, natural de <span className="font-bold">Cabo Verde</span> e residente em <span className="font-bold">---</span>, portador de CNI Nº <span className="font-bold">9884565</span> emitido pelo (a) <span className="font-bold">---</span> em <span className="font-bold">15/10/2020</span>.
                              </p>

                              <div className="border-y-2 border-slate-900 py-2 text-center">
                                <p className="font-black tracking-[0.5em] uppercase">Nada Consta--------------------------------------------------------------------------------</p>
                              </div>

                              <p>Este certificado destina-se a <span className="font-bold uppercase underline">{selectedDecisionCertificate.reason}</span> e só para esse fim é válido.</p>
                              
                              <p>Por ser verdade e haver sido solicitado pelo (a) interessado (a), manda passar o presente certificado, que vai devidamente assinado e autenticado com o carimbo a óleo em uso nesta Direção.</p>
                            </div>

                            {/* Document Footer */}
                            <div className="pt-12 flex flex-col items-center text-center space-y-8">
                              <p className="text-xs font-bold">Direção Central de Investigação Criminal, {new Date().toLocaleDateString('pt-BR')}</p>
                              
                              <div className="space-y-1">
                                <p className="text-xs font-bold">O Diretor,</p>
                                <div className="pt-8">
                                  <p className="text-xs font-bold">/Roberto Carlos Centeio Lima/</p>
                                  <p className="text-[10px] font-bold">Subintendente da PN</p>
                                </div>
                              </div>
                            </div>

                            <div className="pt-12 text-center">
                              <p className="text-[8px] italic text-slate-400">Este certificado é válido por 90 (dias) a contar da data da sua emissão.</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                  <div className="border-b-2 border-slate-900 pb-2 mb-6">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Dados Biográficos</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <DetailField label="Nome Completo" value={selectedDecisionCertificate.biographic.fullName} />
                    <DetailField label="Data Nascimento *" value={selectedDecisionCertificate.biographic.birthDate} icon={Calendar} />
                    <DetailField label="Sexo" value={selectedDecisionCertificate.biographic.gender} />
                    <DetailField label="Estado Civil" value={selectedDecisionCertificate.biographic.civilStatus} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <DetailField label="Naturalidade" value={selectedDecisionCertificate.biographic.birthPlace} />
                    <DetailField label="Nacionalidade" value={selectedDecisionCertificate.biographic.nationality} />
                    <DetailField label="Nome Pai" value={selectedDecisionCertificate.biographic.fatherName} />
                    <DetailField label="Nome Mãe" value={selectedDecisionCertificate.biographic.motherName} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <DetailField label="NIF" value={selectedDecisionCertificate.biographic.nif || '---'} />
                    <DetailField label="Tipo Documento" value={selectedDecisionCertificate.biographic.docType} />
                    <DetailField label="Número Documento" value={selectedDecisionCertificate.biographic.docNumber} />
                  </div>

                  <div className="space-y-4 pt-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endereço</h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      <DetailField label="Ilha" value={selectedDecisionCertificate.address.island} />
                      <DetailField label="Conselho" value={selectedDecisionCertificate.address.council} />
                      <DetailField label="Freguesia" value={selectedDecisionCertificate.address.parish} />
                      <DetailField label="Localidade" value={selectedDecisionCertificate.address.locality} />
                      <DetailField label="Ponto de Referencia" value={selectedDecisionCertificate.address.reference} icon={MapPin} />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <DetailField label="Telemovel" value={selectedDecisionCertificate.contact.mobile} />
                      <DetailField label="Email" value={selectedDecisionCertificate.contact.email} />
                    </div>
                  </div>

                  <div className="pt-4">
                    <DetailField label="Ficha de Antecedente" value={selectedDecisionCertificate.reason} />
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                  <div className="border-b-2 border-slate-900 pb-2 mb-6">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Anexos</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {selectedDecisionCertificate.attachments.map((file: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-100 rounded-xl">
                          <div className="flex items-center gap-3">
                            <FileText size={18} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-900">{file.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                  <div className="border-b-2 border-slate-900 pb-2 mb-4 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Observações</h3>
                  </div>
                  <div className="space-y-4">
                    {selectedDecisionCertificate.observations.map((obs: any, idx: number) => (
                      <div key={idx} className="p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                            <ImageIcon size={20} className="text-slate-400" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{obs.user}</p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{obs.date}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{obs.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-4 bg-slate-50 border-b-2 border-slate-100 flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Historico do pedido</h3>
                    <button className="p-1 hover:bg-slate-200 rounded transition-colors"><ChevronDown size={16} /></button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                          <th className="px-6 py-4">Data</th>
                          <th className="px-6 py-4">Fase</th>
                          <th className="px-6 py-4">Estado</th>
                          <th className="px-6 py-4">Utente</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {selectedDecisionCertificate.history.map((h: any, idx: number) => (
                          <tr key={idx} className="bg-white">
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{h.date}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{h.phase}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{h.status}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{h.user}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-between pt-8 border-t border-slate-100">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('certificate_decision')}>Voltar</Button>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      icon={RotateCcw} 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => setShowReturnModal(true)}
                    >
                      Devolver
                    </Button>
                    <Button 
                      variant="primary" 
                      icon={CheckCircle} 
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => {
                        setSuccessMessage('Pedido Concluído com Sucesso!');
                        setShowSuccessModal(true);
                        setMockDecisionCertificates(mockDecisionCertificates.filter(c => c.id !== selectedDecisionCertificate.id));
                        setCurrentView('certificate_decision');
                      }}
                    >
                      Concluir Pedido
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : currentView === 'ficha_list' ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Gestão de Fichas</h2>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-slate-900 text-white rounded-lg"><Search size={16} /></div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Localizar Ficha</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Número Ficha</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" placeholder="Ex: 0001" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome do Indivíduo</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" placeholder="Nome completo" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Nascimento</label>
                      <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                    </div>
                    <Button variant="primary" icon={Search} onClick={() => {}}>Pesquisar</Button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Fichas Registradas</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Total : {fichas.length.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                          <th className="px-6 py-4">N.º Ficha</th>
                          <th className="px-6 py-4">Nome Completo</th>
                          <th className="px-6 py-4">Data Nascimento</th>
                          <th className="px-6 py-4">Ilha</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {fichas.map((f, idx) => (
                          <tr 
                            key={f.id} 
                            className="hover:bg-slate-50 cursor-pointer transition-colors group"
                            onClick={() => {
                              setSelectedFicha(f);
                              setCurrentView('ficha_detail');
                            }}
                          >
                            <td className="px-6 py-4 text-sm font-bold text-blue-600 group-hover:underline">{f.number}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{f.name}</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-600">{f.birthDate ? new Date(f.birthDate).toLocaleDateString('pt-BR') : '---'}</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-600">{f.island}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-start">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('dashboard')}>Voltar ao Início</Button>
                </div>
              </motion.div>
            ) : currentView === 'ficha_detail' && selectedFicha ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 pb-12"
              >
                <div className="flex justify-between items-center border-b-2 border-slate-100 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Ficha de Identificação</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registro Individual N.º {selectedFicha.number}</p>
                  </div>
                  <Button variant="success" icon={FileText} onClick={() => setShowPdfModal(true)}>Exportar PDF</Button>
                </div>

                {/* Accordion: Dados Biográficos */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('biographic')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><User size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Dados Biográficos</span>
                    </div>
                    {expandedSections.biographic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.biographic && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <DetailField label="Nome Completo" value={selectedFicha.name || 'Bruno Fonseca'} />
                            <DetailField label="Data Nascimento *" value="15 / 15 / 2010" icon={Calendar} />
                            <DetailField label="Sexo" value="Masculino" type="select" options={['Masculino', 'Feminino']} />
                            <DetailField label="Estado Civil" value="Solteiro" type="select" options={['Solteiro', 'Casado']} />
                            <DetailField label="Naturalidade" value="Cabo Verde" type="select" options={['Cabo Verde']} />
                            <DetailField label="Nacionalidade" value="Cabo Verde" type="select" options={['Cabo Verde']} />
                            <DetailField label="Nome Pai" value="" />
                            <DetailField label="Nome Mãe" value="" />
                            <DetailField label="Profissão" value="" />
                            <DetailField label="Alcunha" value="" />
                          </div>

                          <div className="space-y-6">
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Documento Identificação</h3>
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                              <DetailField label="NIF" value={selectedFicha.nif || ''} readOnly={false} onChange={(val) => setSelectedFicha({...selectedFicha, nif: val})} />
                              <DetailField label="Tipo Documento" value={selectedFicha.docType || 'CNI'} type="select" options={['CNI', 'Passaporte']} />
                              <DetailField label="Número Documento" value="9884565" />
                              <DetailField label="Data Emissão" value="15 / 10 / 2020" icon={Calendar} />
                              <DetailField label="Data Validade" value="15 / 10 / 2025" icon={Calendar} />
                              <DetailField label="Local Emissão" value="" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion: Sinais Complementares */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('complementary')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Fingerprint size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Sinais Complementares</span>
                    </div>
                    {expandedSections.complementary ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.complementary && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                          <div className="flex justify-between items-center">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grupo Ativo</h3>
                            <Button 
                              variant="outline" 
                              icon={Plus} 
                              onClick={() => {
                                setTempCharacteristics([]);
                                setShowComplementaryModal(true);
                              }}
                            >
                              Adicionar Sinais
                            </Button>
                          </div>

                          {/* Active Group Card */}
                          {selectedFicha.complementaryGroups?.filter((g: any) => g.validTo === null).map((activeGroup: any) => (
                            <div key={activeGroup.id} className="border-2 border-slate-50 rounded-2xl p-8 bg-slate-50/30 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 bg-slate-900 text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                                Ativo
                              </div>
                              <div className="flex justify-between items-start mb-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                                  <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Criação</p>
                                    <p className="text-sm font-bold text-slate-900">{activeGroup.createdAt}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Válido De</p>
                                    <p className="text-sm font-bold text-slate-900">{activeGroup.validFrom}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Válido Até</p>
                                    <p className="text-sm font-bold text-blue-600 uppercase tracking-tighter">Atual</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Utilizador</p>
                                    <p className="text-sm font-bold text-slate-900">{activeGroup.user}</p>
                                  </div>
                                </div>
                                <Button 
                                  variant="outline" 
                                  icon={Search} 
                                  onClick={() => {
                                    setSelectedComplementaryGroup(activeGroup);
                                    setShowComplementaryDetailsModal(true);
                                  }}
                                >
                                  Ver Detalhes
                                </Button>
                              </div>
                              
                              <div className="space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resumo das Características</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                  {activeGroup.characteristics.slice(0, 6).map((char: any, idx: number) => (
                                    <div key={idx} className="flex flex-col gap-1">
                                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{char.name}</span>
                                      <span className="text-sm font-bold text-slate-900">{char.value}</span>
                                    </div>
                                  ))}
                                  {activeGroup.characteristics.length > 6 && (
                                    <div className="flex items-center">
                                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">+{activeGroup.characteristics.length - 6} mais</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* History Toggle */}
                          {selectedFicha.complementaryGroups?.some((g: any) => g.validTo !== null) && (
                            <div className="space-y-4 pt-4 border-t border-slate-50">
                              <button 
                                onClick={() => setShowComplementaryHistory(!showComplementaryHistory)}
                                className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors"
                              >
                                {showComplementaryHistory ? 'Ocultar Histórico' : 'Ver Histórico de Sinais'}
                                {showComplementaryHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </button>

                              <AnimatePresence>
                                {showComplementaryHistory && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden space-y-4"
                                  >
                                    <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                                      <table className="w-full text-left border-collapse">
                                        <thead>
                                          <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                            <th className="px-6 py-4">Data Criação</th>
                                            <th className="px-6 py-4">Válido De</th>
                                            <th className="px-6 py-4">Válido Até</th>
                                            <th className="px-6 py-4">Utilizador</th>
                                            <th className="px-6 py-4">Estado</th>
                                            <th className="px-6 py-4 text-right">Ação</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                          {selectedFicha.complementaryGroups?.filter((g: any) => g.validTo !== null).map((group: any) => (
                                            <tr key={group.id} className="hover:bg-slate-50 transition-colors group">
                                              <td className="px-6 py-4 text-xs font-bold text-slate-600">{group.createdAt}</td>
                                              <td className="px-6 py-4 text-xs font-bold text-slate-600">{group.validFrom}</td>
                                              <td className="px-6 py-4 text-xs font-bold text-slate-600">{group.validTo}</td>
                                              <td className="px-6 py-4 text-xs font-bold text-slate-600">{group.user}</td>
                                              <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-tighter">Inativo</span>
                                              </td>
                                              <td className="px-6 py-4 text-right">
                                                <button 
                                                  onClick={() => {
                                                    setSelectedComplementaryGroup(group);
                                                    setShowComplementaryDetailsModal(true);
                                                  }}
                                                  className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
                                                >
                                                  <Search size={16} />
                                                </button>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion: Outras Informações */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('other_info')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Info size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Outras Informações</span>
                    </div>
                    {expandedSections.other_info ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.other_info && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-12">
                          {/* Endereço */}
                          <div className="space-y-4">
                            <AnimatePresence>
                              {showAddAddress && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 mb-4"
                                >
                                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                    <h5 className="text-xs font-bold text-slate-700 uppercase">Novo Endereço</h5>
                                    <button onClick={() => setShowAddAddress(false)} className="text-slate-400 hover:text-slate-600"><Trash2 size={14} /></button>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo</label>
                                      <select 
                                        value={newAddress.type}
                                        onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                      >
                                        <option value="Residência">Residência</option>
                                        <option value="Trabalho">Trabalho</option>
                                        <option value="Outro">Outro</option>
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Ilha</label>
                                      <select 
                                        value={newAddress.island}
                                        onChange={(e) => setNewAddress({...newAddress, island: e.target.value})}
                                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                      >
                                        <option value="">Selecione...</option>
                                        <option value="Santiago">Santiago</option>
                                        <option value="São Vicente">São Vicente</option>
                                        <option value="Sal">Sal</option>
                                        <option value="Fogo">Fogo</option>
                                        <option value="Santo Antão">Santo Antão</option>
                                        <option value="Boa Vista">Boa Vista</option>
                                        <option value="Maio">Maio</option>
                                        <option value="São Nicolau">São Nicolau</option>
                                        <option value="Brava">Brava</option>
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Conselho</label>
                                      <select 
                                        value={newAddress.council}
                                        onChange={(e) => setNewAddress({...newAddress, council: e.target.value})}
                                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                      >
                                        <option value="">Selecione...</option>
                                        <option value="Praia">Praia</option>
                                        <option value="Mindelo">Mindelo</option>
                                        <option value="Espargos">Espargos</option>
                                        <option value="Assomada">Assomada</option>
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Freguesia</label>
                                      <select 
                                        value={newAddress.parish}
                                        onChange={(e) => setNewAddress({...newAddress, parish: e.target.value})}
                                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                      >
                                        <option value="">Selecione...</option>
                                        <option value="Nossa Senhora da Graça">Nossa Senhora da Graça</option>
                                        <option value="São Nicolau Tolentino">São Nicolau Tolentino</option>
                                        <option value="Santíssimo Nome de Jesus">Santíssimo Nome de Jesus</option>
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Localidade</label>
                                      <select 
                                        value={newAddress.locality}
                                        onChange={(e) => setNewAddress({...newAddress, locality: e.target.value})}
                                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                      >
                                        <option value="">Selecione...</option>
                                        <option value="Achada Santo António">Achada Santo António</option>
                                        <option value="Palmarejo">Palmarejo</option>
                                        <option value="Plateau">Plateau</option>
                                        <option value="Fazenda">Fazenda</option>
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Referência</label>
                                      <input 
                                        type="text" 
                                        value={newAddress.reference}
                                        onChange={(e) => setNewAddress({...newAddress, reference: e.target.value})}
                                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <button 
                                      onClick={() => handleAddOtherInfo('address')}
                                      className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors"
                                    >
                                      Confirmar Adição
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="flex justify-between items-center">
                              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Endereço</h4>
                              <Button 
                                variant="outline" 
                                icon={showAddAddress ? Trash2 : Plus} 
                                onClick={() => setShowAddAddress(!showAddAddress)}
                              >
                                {showAddAddress ? 'Cancelar' : 'Adicionar Endereço'}
                              </Button>
                            </div>

                            <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                    <th className="px-6 py-4">N º</th>
                                    <th className="px-6 py-4">Tipo</th>
                                    <th className="px-6 py-4">Ilha</th>
                                    <th className="px-6 py-4">Localidade</th>
                                    <th className="px-6 py-4">Criado em</th>
                                    <th className="px-6 py-4 text-right">Ação</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                  {selectedFicha.addresses?.filter((a: any) => a.validTo === null).map((addr: any, idx: number) => (
                                    <tr key={addr.id} className="hover:bg-slate-50 transition-colors group">
                                      <td className="px-6 py-4 text-xs font-black text-slate-900">{(idx + 1).toString().padStart(2, '0')}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{addr.type}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{addr.island}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{addr.locality}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{addr.validFrom}</td>
                                      <td className="px-6 py-4 text-right flex justify-end gap-3">
                                        <button 
                                          onClick={() => {
                                            setSelectedAddressDetails(addr);
                                            setShowAddressDetailsModal(true);
                                          }}
                                          className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
                                        >
                                          <Search size={16} />
                                        </button>
                                        {!addr.validTo && (
                                          <button 
                                            onClick={() => handleDeactivateOtherInfo('address', addr.id)}
                                            className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-red-100 transition-colors"
                                          >
                                            Desativar
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {/* Address History */}
                            {selectedFicha.addresses?.some((a: any) => a.validTo !== null) && (
                              <div className="space-y-4">
                                <button 
                                  onClick={() => setShowOtherInfoHistory({...showOtherInfoHistory, address: !showOtherInfoHistory.address})}
                                  className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  {showOtherInfoHistory.address ? 'Ocultar Histórico' : 'Ver Histórico de Endereços'}
                                  {showOtherInfoHistory.address ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                </button>

                                <AnimatePresence>
                                  {showOtherInfoHistory.address && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden space-y-2"
                                    >
                                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registos Históricos</h5>
                                      <div className="overflow-x-auto border border-slate-200 rounded-lg bg-slate-50/50">
                                        <table className="w-full text-left border-collapse">
                                          <thead>
                                            <tr className="bg-slate-100 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
                                              <th className="px-4 py-3">Tipo</th>
                                              <th className="px-4 py-3">Ilha</th>
                                              <th className="px-4 py-3">Localidade</th>
                                              <th className="px-4 py-3">Criado por</th>
                                              <th className="px-4 py-3">Desativado por</th>
                                              <th className="px-4 py-3">Criado em</th>
                                              <th className="px-4 py-3">Desativado em</th>
                                              <th className="px-4 py-3 text-right">Ação</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {selectedFicha.addresses?.filter((a: any) => a.validTo !== null).map((addr: any) => (
                                              <tr key={addr.id} className="border-b border-slate-100 opacity-60 hover:opacity-100 transition-opacity">
                                                <td className="px-4 py-3 text-xs">{addr.type}</td>
                                                <td className="px-4 py-3 text-xs">{addr.island}</td>
                                                <td className="px-4 py-3 text-xs">{addr.locality}</td>
                                                <td className="px-4 py-3 text-xs font-medium">{addr.user}</td>
                                                <td className="px-4 py-3 text-xs font-medium text-red-600">{addr.deactivatedBy || '---'}</td>
                                                <td className="px-4 py-3 text-xs">{addr.validFrom}</td>
                                                <td className="px-4 py-3 text-xs text-red-600 font-medium">{addr.validTo}</td>
                                                <td className="px-4 py-3 text-right">
                                                  <button 
                                                    onClick={() => {
                                                      setSelectedAddressDetails(addr);
                                                      setShowAddressDetailsModal(true);
                                                    }}
                                                    className="text-blue-600 hover:bg-blue-50 p-1 rounded border border-blue-200"
                                                  >
                                                    <Search size={14} />
                                                  </button>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </div>

                          {/* Contactos */}
                          <div className="space-y-4">
                            <AnimatePresence>
                              {showAddContact && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 mb-4"
                                >
                                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                    <h5 className="text-xs font-bold text-slate-700 uppercase">Novo Contacto</h5>
                                    <button onClick={() => setShowAddContact(false)} className="text-slate-400 hover:text-slate-600"><Trash2 size={14} /></button>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo</label>
                                      <select 
                                        value={newContact.type}
                                        onChange={(e) => setNewContact({...newContact, type: e.target.value})}
                                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                      >
                                        <option value="Telemóvel">Telemóvel</option>
                                        <option value="Telefone">Telefone</option>
                                        <option value="Email">Email</option>
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Informação</label>
                                      <input 
                                        type="text" 
                                        value={newContact.info}
                                        onChange={(e) => setNewContact({...newContact, info: e.target.value})}
                                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <button 
                                      onClick={() => handleAddOtherInfo('contact')}
                                      className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors"
                                    >
                                      Confirmar Adição
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="flex justify-between items-center">
                              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Contactos</h4>
                              <Button 
                                variant="outline" 
                                icon={showAddContact ? Trash2 : Plus} 
                                onClick={() => setShowAddContact(!showAddContact)}
                              >
                                {showAddContact ? 'Cancelar' : 'Adicionar Contacto'}
                              </Button>
                            </div>

                            <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                    <th className="px-6 py-4">N º</th>
                                    <th className="px-6 py-4">Utilizador</th>
                                    <th className="px-6 py-4">Tipo</th>
                                    <th className="px-6 py-4">Informação</th>
                                    <th className="px-6 py-4">Criado em</th>
                                    <th className="px-6 py-4 text-right">Ação</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                  {selectedFicha.contacts?.filter((c: any) => c.validTo === null).map((contact: any, idx: number) => (
                                    <tr key={contact.id} className="hover:bg-slate-50 transition-colors group">
                                      <td className="px-6 py-4 text-xs font-black text-slate-900">{(idx + 1).toString().padStart(2, '0')}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{contact.user}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{contact.type}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{contact.info}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{contact.validFrom}</td>
                                      <td className="px-6 py-4 text-right">
                                        {!contact.validTo && (
                                          <button 
                                            onClick={() => handleDeactivateOtherInfo('contact', contact.id)}
                                            className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-red-100 transition-colors"
                                          >
                                            Desativar
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {/* Contact History */}
                            {selectedFicha.contacts?.some((c: any) => c.validTo !== null) && (
                              <div className="space-y-4">
                                <button 
                                  onClick={() => setShowOtherInfoHistory({...showOtherInfoHistory, contact: !showOtherInfoHistory.contact})}
                                  className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  {showOtherInfoHistory.contact ? 'Ocultar Histórico' : 'Ver Histórico de Contactos'}
                                  {showOtherInfoHistory.contact ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                </button>

                                <AnimatePresence>
                                  {showOtherInfoHistory.contact && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden space-y-2"
                                    >
                                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registos Históricos</h5>
                                      <div className="overflow-x-auto border border-slate-200 rounded-lg bg-slate-50/50">
                                        <table className="w-full text-left border-collapse">
                                          <thead>
                                            <tr className="bg-slate-100 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
                                              <th className="px-4 py-3">Tipo</th>
                                              <th className="px-4 py-3">Informação</th>
                                              <th className="px-4 py-3">Criado por</th>
                                              <th className="px-4 py-3">Desativado por</th>
                                              <th className="px-4 py-3">Criado em</th>
                                              <th className="px-4 py-3">Desativado em</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {selectedFicha.contacts?.filter((c: any) => c.validTo !== null).map((contact: any) => (
                                              <tr key={contact.id} className="border-b border-slate-100 opacity-60">
                                                <td className="px-4 py-3 text-xs">{contact.type}</td>
                                                <td className="px-4 py-3 text-xs">{contact.info}</td>
                                                <td className="px-4 py-3 text-xs font-medium">{contact.user}</td>
                                                <td className="px-4 py-3 text-xs font-medium text-red-600">{contact.deactivatedBy || '---'}</td>
                                                <td className="px-4 py-3 text-xs">{contact.validFrom}</td>
                                                <td className="px-4 py-3 text-xs text-red-600 font-medium">{contact.validTo}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </div>

                          {/* Redes Sociais */}
                          <div className="space-y-4">
                            <AnimatePresence>
                              {showAddSocial && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 mb-4"
                                >
                                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                    <h5 className="text-xs font-bold text-slate-700 uppercase">Nova Rede Social</h5>
                                    <button onClick={() => setShowAddSocial(false)} className="text-slate-400 hover:text-slate-600"><Trash2 size={14} /></button>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo</label>
                                      <select 
                                        value={newSocial.type}
                                        onChange={(e) => setNewSocial({...newSocial, type: e.target.value})}
                                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                      >
                                        <option value="Facebook">Facebook</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Twitter">Twitter / X</option>
                                        <option value="LinkedIn">LinkedIn</option>
                                        <option value="TikTok">TikTok</option>
                                        <option value="Outro">Outro</option>
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Link / Username</label>
                                      <input 
                                        type="text" 
                                        value={newSocial.link}
                                        onChange={(e) => setNewSocial({...newSocial, link: e.target.value})}
                                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <button 
                                      onClick={() => handleAddOtherInfo('social')}
                                      className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors"
                                    >
                                      Confirmar Adição
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="flex justify-between items-center">
                              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Redes Sociais</h4>
                              <Button 
                                variant="outline" 
                                icon={showAddSocial ? Trash2 : Plus} 
                                onClick={() => setShowAddSocial(!showAddSocial)}
                              >
                                {showAddSocial ? 'Cancelar' : 'Adicionar Rede Social'}
                              </Button>
                            </div>

                            <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                    <th className="px-6 py-4">N º</th>
                                    <th className="px-6 py-4">Utilizador</th>
                                    <th className="px-6 py-4">Tipo</th>
                                    <th className="px-6 py-4">Link</th>
                                    <th className="px-6 py-4">Criado em</th>
                                    <th className="px-6 py-4 text-right">Ação</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                  {selectedFicha.socialNetworks?.filter((s: any) => s.validTo === null).map((social: any, idx: number) => (
                                    <tr key={social.id} className="hover:bg-slate-50 transition-colors group">
                                      <td className="px-6 py-4 text-xs font-black text-slate-900">{(idx + 1).toString().padStart(2, '0')}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{social.user}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{social.type}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-blue-600 hover:underline cursor-pointer">{social.link}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{social.validFrom}</td>
                                      <td className="px-6 py-4 text-right">
                                        {!social.validTo && (
                                          <button 
                                            onClick={() => handleDeactivateOtherInfo('social', social.id)}
                                            className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-red-100 transition-colors"
                                          >
                                            Desativar
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {/* Social History */}
                            {selectedFicha.socialNetworks?.some((s: any) => s.validTo !== null) && (
                              <div className="space-y-4">
                                <button 
                                  onClick={() => setShowOtherInfoHistory({...showOtherInfoHistory, social: !showOtherInfoHistory.social})}
                                  className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  {showOtherInfoHistory.social ? 'Ocultar Histórico' : 'Ver Histórico de Redes Sociais'}
                                  {showOtherInfoHistory.social ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                </button>

                                <AnimatePresence>
                                  {showOtherInfoHistory.social && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden space-y-2"
                                    >
                                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registos Históricos</h5>
                                      <div className="overflow-x-auto border border-slate-200 rounded-lg bg-slate-50/50">
                                        <table className="w-full text-left border-collapse">
                                          <thead>
                                            <tr className="bg-slate-100 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
                                              <th className="px-4 py-3">Tipo</th>
                                              <th className="px-4 py-3">Link</th>
                                              <th className="px-4 py-3">Criado por</th>
                                              <th className="px-4 py-3">Desativado por</th>
                                              <th className="px-4 py-3">Criado em</th>
                                              <th className="px-4 py-3">Desativado em</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {selectedFicha.socialNetworks?.filter((s: any) => s.validTo !== null).map((social: any) => (
                                              <tr key={social.id} className="border-b border-slate-100 opacity-60">
                                                <td className="px-4 py-3 text-xs">{social.type}</td>
                                                <td className="px-4 py-3 text-xs">{social.link}</td>
                                                <td className="px-4 py-3 text-xs font-medium">{social.user}</td>
                                                <td className="px-4 py-3 text-xs font-medium text-red-600">{social.deactivatedBy || '---'}</td>
                                                <td className="px-4 py-3 text-xs">{social.validFrom}</td>
                                                <td className="px-4 py-3 text-xs text-red-600 font-medium">{social.validTo}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </div>

                          {/* Alcunhas */}
                          <div className="space-y-4">
                            <AnimatePresence>
                              {showAddNickname && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 mb-4"
                                >
                                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                    <h5 className="text-xs font-bold text-slate-700 uppercase">Nova Alcunha</h5>
                                    <button onClick={() => setShowAddNickname(false)} className="text-slate-400 hover:text-slate-600"><Trash2 size={14} /></button>
                                  </div>
                                  <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Alcunha</label>
                                      <input 
                                        type="text" 
                                        value={newNickname.value}
                                        onChange={(e) => setNewNickname({...newNickname, value: e.target.value})}
                                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <button 
                                      onClick={() => handleAddOtherInfo('nickname')}
                                      className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors"
                                    >
                                      Confirmar Adição
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="flex justify-between items-center">
                              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Alcunhas</h4>
                              <Button 
                                variant="outline" 
                                icon={showAddNickname ? Trash2 : Plus} 
                                onClick={() => setShowAddNickname(!showAddNickname)}
                              >
                                {showAddNickname ? 'Cancelar' : 'Adicionar Alcunha'}
                              </Button>
                            </div>

                            <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                    <th className="px-6 py-4">N º</th>
                                    <th className="px-6 py-4">Utilizador</th>
                                    <th className="px-6 py-4">Alcunha</th>
                                    <th className="px-6 py-4">Criado em</th>
                                    <th className="px-6 py-4 text-right">Ação</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                  {selectedFicha.nicknames?.filter((n: any) => n.validTo === null).map((nick: any, idx: number) => (
                                    <tr key={nick.id} className="hover:bg-slate-50 transition-colors group">
                                      <td className="px-6 py-4 text-xs font-black text-slate-900">{(idx + 1).toString().padStart(2, '0')}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{nick.user}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{nick.value}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{nick.validFrom}</td>
                                      <td className="px-6 py-4 text-right">
                                        {!nick.validTo && (
                                          <button 
                                            onClick={() => handleDeactivateOtherInfo('nickname', nick.id)}
                                            className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-red-100 transition-colors"
                                          >
                                            Desativar
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {/* Nickname History */}
                            {selectedFicha.nicknames?.some((n: any) => n.validTo !== null) && (
                              <div className="space-y-4">
                                <button 
                                  onClick={() => setShowOtherInfoHistory({...showOtherInfoHistory, nickname: !showOtherInfoHistory.nickname})}
                                  className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  {showOtherInfoHistory.nickname ? 'Ocultar Histórico' : 'Ver Histórico de Alcunhas'}
                                  {showOtherInfoHistory.nickname ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                </button>

                                <AnimatePresence>
                                  {showOtherInfoHistory.nickname && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden space-y-2"
                                    >
                                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registos Históricos</h5>
                                      <div className="overflow-x-auto border border-slate-200 rounded-lg bg-slate-50/50">
                                        <table className="w-full text-left border-collapse">
                                          <thead>
                                            <tr className="bg-slate-100 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
                                              <th className="px-4 py-3">Alcunha</th>
                                              <th className="px-4 py-3">Criado por</th>
                                              <th className="px-4 py-3">Desativado por</th>
                                              <th className="px-4 py-3">Criado em</th>
                                              <th className="px-4 py-3">Desativado em</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {selectedFicha.nicknames?.filter((n: any) => n.validTo !== null).map((nick: any) => (
                                              <tr key={nick.id} className="border-b border-slate-100 opacity-60">
                                                <td className="px-4 py-3 text-xs">{nick.value}</td>
                                                <td className="px-4 py-3 text-xs font-medium">{nick.user}</td>
                                                <td className="px-4 py-3 text-xs font-medium text-red-600">{nick.deactivatedBy || '---'}</td>
                                                <td className="px-4 py-3 text-xs">{nick.validFrom}</td>
                                                <td className="px-4 py-3 text-xs text-red-600 font-medium">{nick.validTo}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion: Motivo do Cadastro */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('motivo')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><HelpCircle size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Motivo do Cadastro</span>
                    </div>
                    {expandedSections.motivo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.motivo && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
                          <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                  <th className="px-6 py-4">Data</th>
                                  <th className="px-6 py-4">Motivo</th>
                                  <th className="px-6 py-4">Nº Ref</th>
                                  <th className="px-6 py-4">Destino</th>
                                  <th className="px-6 py-4">Medidas</th>
                                  <th className="px-6 py-4">Tipo</th>
                                  <th className="px-6 py-4">Estado</th>
                                  <th className="px-6 py-4 text-right">Ação</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {(selectedFicha?.registrationReasons || []).map((reg: any) => (
                                  <tr key={reg.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.date}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.reason}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.refNo}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.destination}</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.measures}</td>
                                    <td className="px-6 py-4 text-xs">
                                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                                        reg.type === 'Criminal' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                                      }`}>
                                        {reg.type}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs">
                                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                                        reg.status === 'Reabilitado' ? 'bg-emerald-50 text-emerald-600' : 
                                        reg.status === 'Aguardando Reabilitação' ? 'bg-blue-50 text-blue-600' :
                                        'bg-amber-50 text-amber-600'
                                      }`}>
                                        {reg.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <div className="flex justify-end gap-3">
                                        {reg.status === 'Ativo' && (
                                          <button 
                                            onClick={() => {
                                              setSelectedReasonForRehab(reg);
                                              setShowRehabilitationModal(true);
                                            }}
                                            className="p-2 text-emerald-400 hover:text-emerald-600 hover:bg-white rounded-lg transition-all"
                                          >
                                            <ShieldCheck size={16} />
                                          </button>
                                        )}
                                        {reg.rehabilitationDetails && (
                                          <button 
                                            onClick={() => {
                                              setSelectedReasonForRehab(reg);
                                              setShowRehabilitationDetailsModal(true);
                                            }}
                                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
                                          >
                                            <Search size={16} />
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion: Dados Biométricos */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('biometric')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Fingerprint size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Dados Biométricos</span>
                    </div>
                    {expandedSections.biometric ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.biometric && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                          <div className="flex justify-end gap-3">
                            <Button variant="outline" icon={Fingerprint}>Scan Fingerprint</Button>
                            <Button variant="outline" icon={Plus}>Anexar Fotografia</Button>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fingerprints Associadas</h4>
                            <div className="flex gap-6 items-center">
                              <div className="w-20 h-28 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50 group hover:border-slate-900 transition-colors cursor-pointer">
                                <Fingerprint size={40} className="text-slate-200 group-hover:text-slate-900 transition-colors" />
                              </div>
                              <div className="w-20 h-28 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50 group hover:border-slate-900 transition-colors cursor-pointer">
                                <Fingerprint size={40} className="text-slate-200 group-hover:text-slate-900 transition-colors" />
                              </div>
                              <button className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fotografias Atuais</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                              {[
                                { label: 'Frontal', seed: 'frontal' },
                                { label: 'Perfil Esquerdo', seed: 'left' },
                                { label: 'Perfil Direito', seed: 'right' },
                                { label: 'Tatuagem', seed: 'tattoo' }
                              ].map((photo) => (
                                <div key={photo.label} className="flex flex-col items-center gap-3">
                                  <div className="w-full aspect-[3/4] bg-white border-2 border-slate-50 rounded-2xl overflow-hidden shadow-sm group relative cursor-pointer">
                                    <img src={`https://picsum.photos/seed/${photo.seed}/300/400`} alt={photo.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <Search className="text-white" size={24} />
                                    </div>
                                  </div>
                                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{photo.label}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4 pt-6 border-t border-slate-50">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Histórico de Fotografias</h4>
                            <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                    <th className="px-6 py-4">Data Criação</th>
                                    <th className="px-6 py-4">Data Atualização</th>
                                    <th className="px-6 py-4">Quem Criou</th>
                                    <th className="px-6 py-4">Quem Atualizou</th>
                                    <th className="px-6 py-4 text-right">Ação</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                  {(selectedFicha?.photoHistory || []).map((group: any) => (
                                    <tr key={group.id} className="hover:bg-slate-50 transition-colors group">
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{group.createdAt}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{group.updatedAt || group.createdAt}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{group.createdBy}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{group.updatedBy || group.createdBy}</td>
                                      <td className="px-6 py-4 text-right">
                                        <button 
                                          onClick={() => {
                                            setSelectedPhotoGroup(group);
                                            setShowPhotoHistoryDetailsModal(true);
                                          }}
                                          className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
                                        >
                                          <Search size={16} />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion: Observações */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('observations')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><MessageSquare size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Observações</span>
                    </div>
                    {expandedSections.observations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.observations && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
                          <div className="flex justify-end">
                            <Button variant="outline" icon={Plus}>Nova Observação</Button>
                          </div>
                          <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-50 space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-lg shadow-lg">
                                M
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                  <p className="font-black text-slate-900 text-xs uppercase tracking-widest">Mascarenha</p>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">20/03/2023</span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                                  "vjhvuj hyasd ubasiud asdabjsd asjdba sdjbsd asaia asi ia a ikabsidubasd ubiasd kbiuasbd kjbasd basidb ibasidb iuasa"
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion: Registos Associados */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('registos_associados')}
                    className="w-full bg-white border-2 border-slate-900 py-2 px-4 flex items-center justify-between font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-center gap-2">
                      <History size={20} className="text-blue-600" />
                      <span>Registos Associados</span>
                    </div>
                    {expandedSections.registos_associados ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.registos_associados && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                          <div className="overflow-x-auto border border-slate-200 rounded-lg">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50 text-[11px] font-bold text-slate-900 uppercase border-b border-slate-200">
                                  <th className="px-4 py-3">Data</th>
                                  <th className="px-4 py-3">Nº Processo / Ocorrência</th>
                                  <th className="px-4 py-3">Unidade</th>
                                  <th className="px-4 py-3">Utilizador</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="hover:bg-slate-50 transition-colors">
                                  <td className="px-4 py-3 text-sm">14/03/2024</td>
                                  <td className="px-4 py-3 text-sm font-bold text-blue-600">006</td>
                                  <td className="px-4 py-3 text-sm">ESF</td>
                                  <td className="px-4 py-3 text-sm">Maria</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-start pt-4">
                  <button 
                    onClick={() => setCurrentView('ficha_list')}
                    className="flex items-center gap-2 px-8 py-2 bg-blue-100 text-blue-700 font-bold rounded hover:bg-blue-200 transition-colors text-sm border border-blue-300"
                  >
                    <ArrowLeft size={18} />
                    Voltar para Lista
                  </button>
                </div>
              </motion.div>
            ) : currentView === 'person_detail' && selectedPerson ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 pb-12"
              >
                {/* Header Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-100 pb-6 gap-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Registo de Pessoa</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Processo nº {selectedPerson.process_number} • Unidade: {selectedPerson.unit}</p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-3">
                      <div className="p-2 bg-blue-600 text-white rounded-lg"><History size={14} /></div>
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Enviado por</p>
                        <p className="text-[10px] font-bold text-slate-700">{selectedPerson.sent_by || '---'} • {selectedPerson.sent_date ? new Date(selectedPerson.sent_date).toLocaleDateString('pt-BR') : '---'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sugestão de Vínculo ou Cadastro Associado */}
                <AnimatePresence mode="wait">
                  {associatedPerson && !isNewRegistration ? (
                    <motion.div 
                      key="associated"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 mb-8"
                    >
                      <button 
                        onClick={() => toggleSection('associated')}
                        className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 text-white rounded-lg">
                            <Users size={18} />
                          </div>
                          <span className="uppercase tracking-widest text-xs">Cadastro Associado</span>
                        </div>
                        {expandedSections.associated ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>

                      <AnimatePresence>
                        {expandedSections.associated && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 space-y-8 shadow-sm mt-2 relative">
                              <div className="flex flex-col md:flex-row gap-8">
                                {/* Profile Picture */}
                                <div className="flex-shrink-0">
                                  <div className="w-32 h-40 border-2 border-slate-900 rounded overflow-hidden shadow-md bg-slate-100 relative">
                                    <img 
                                      src="https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?q=80&w=300&h=400&auto=format&fit=crop" 
                                      alt="Perfil" 
                                      className="w-full h-full object-cover grayscale contrast-150 brightness-90"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[8px] text-white text-center py-0.5 font-mono">
                                      PN-CV-0001-2024-SIDE
                                    </div>
                                  </div>
                                </div>

                                <div className="flex-1 space-y-6">
                                  <div className="flex justify-between items-start">
                                    <div className="w-full max-w-xs">
                                      <DetailField label="Cadastro nº:" value={associatedPerson.number} />
                                    </div>
                                    <div className="flex gap-3">
                                      <button 
                                        onClick={() => {
                                          setHideNewCadastroInAssociate(false);
                                          setShowAssociateModal(true);
                                        }}
                                        className="px-4 py-2 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all text-xs border border-blue-900 shadow-sm flex items-center gap-2"
                                      >
                                        <Search size={14} />
                                        Alterar Vínculo
                                      </button>
                                      <button 
                                        onClick={() => {
                                          setHideNewCadastroInAssociate(true);
                                          setIsNewRegistration(true);
                                        }}
                                        className="px-4 py-2 bg-blue-400 text-white font-bold rounded-xl hover:bg-blue-500 transition-all text-xs border border-blue-400 shadow-sm flex items-center gap-2"
                                      >
                                        <UserPlus size={14} />
                                        Novo Cadastro
                                      </button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <DetailField label="Nome Completo" value={`${associatedPerson.name} ${associatedPerson.surname}`} />
                                    <DetailField label="Data Nascimento *" value={new Date(associatedPerson.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
                                    <DetailField label="Sexo" value={associatedPerson.gender} type="select" options={['Masculino', 'Feminino', 'Outro']} />
                                    <DetailField label="Estado Civil" value={associatedPerson.maritalStatus} type="select" options={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']} />
                                    <DetailField label="Naturalidade" value="Cabo Verde" type="select" options={['Cabo Verde', 'Angola', 'Portugal']} />
                                    <DetailField label="Nacionalidade" value="Cabo Verde" type="select" options={['Cabo Verde', 'Angola', 'Portugal']} />
                                    <DetailField label="Nome Pai" value="---" />
                                    <DetailField label="Nome Mãe" value="---" />
                                    <DetailField label="NIF" value={associatedPerson.nif || "---"} />
                                    <DetailField label="Profissão" value="---" />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3 className="font-bold text-slate-800 border-l-4 border-blue-600 pl-3">Documento Identificação</h3>
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                                  <DetailField label="NIF" value={associatedPerson.nif || ''} readOnly={false} onChange={(val) => setAssociatedPerson({...associatedPerson, nif: val})} />
                                  <DetailField label="Tipo Documento" value="CNI" type="select" options={['CNI', 'Passaporte', 'BI']} />
                                  <DetailField label="Número Documento" value={associatedPerson.docNumber || associatedPerson.number || '---'} />
                                  <DetailField label="Data Emissão" value="15/10/2020" icon={Calendar} />
                                  <DetailField label="Data Validade" value="15/10/2025" icon={Calendar} />
                                  <DetailField label="Local Emissão" value="---" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : !isNewRegistration ? (
                    <motion.div 
                      key="not-associated"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 mb-8"
                    >
                      {/* Banner Area */}
                      <div className={`${suggestedFicha ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'} border-2 rounded-2xl p-6 shadow-sm mb-4`}>
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 ${suggestedFicha ? 'bg-blue-600 shadow-blue-200' : 'bg-slate-400 shadow-slate-200'} text-white rounded-xl shadow-lg`}>
                              {suggestedFicha ? <ShieldCheck size={24} /> : <Search size={24} />}
                            </div>
                            <div>
                              <h4 className={`text-sm font-black ${suggestedFicha ? 'text-blue-900' : 'text-slate-900'} uppercase tracking-wider`}>
                                {suggestedFicha ? 'Possível Correspondência Encontrada' : 'Nenhuma Correspondência Encontrada'}
                              </h4>
                              <p className={`text-xs ${suggestedFicha ? 'text-blue-700' : 'text-slate-500'} font-medium italic`}>
                                {suggestedFicha 
                                  ? <>Dados biográficos coincidem com o cadastro <strong>{suggestedFicha.number}</strong></>
                                  : 'Não foi encontrada nenhuma correspondência automática para esta pessoa.'}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {suggestedFicha && (
                              <button 
                                onClick={() => {
                                  setAssociatedPerson(suggestedFicha);
                                  setSuggestedFicha(null);
                                }}
                                className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-xs shadow-lg shadow-blue-200 flex items-center gap-2"
                              >
                                <CheckCircle size={14} />
                                Aceitar Match
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                setHideNewCadastroInAssociate(false);
                                setShowAssociateModal(true);
                              }}
                              className="px-4 py-2.5 bg-white text-slate-600 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all text-xs flex items-center gap-2"
                            >
                              <Search size={14} />
                              Associar Cadastro
                            </button>
                          </div>
                        </div>
                      </div>

                      {suggestedFicha && (
                        <>
                          <button 
                            onClick={() => toggleSection('associated')}
                            className="w-full bg-white border-2 border-blue-200 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-600 text-white rounded-lg">
                                <Users size={18} />
                              </div>
                              <span className="uppercase tracking-widest text-xs">Sugestão de Cadastro (Match)</span>
                            </div>
                            {expandedSections.associated ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>

                          <AnimatePresence>
                            {expandedSections.associated && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-white border-2 border-blue-100 shadow-blue-50 rounded-2xl p-8 space-y-8 shadow-sm mt-2 relative">
                                  <div className="absolute top-4 right-8">
                                    <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase tracking-tighter">Dados em Revisão</span>
                                  </div>
                                  
                                  <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-shrink-0">
                                      <div className="w-32 h-40 border-2 border-slate-900 rounded overflow-hidden shadow-md bg-slate-100 relative">
                                        <img 
                                          src="https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?q=80&w=300&h=400&auto=format&fit=crop" 
                                          alt="Perfil" 
                                          className="w-full h-full object-cover grayscale contrast-150 brightness-90 opacity-60"
                                          referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[8px] text-white text-center py-0.5 font-mono">
                                          PN-CV-0001-2024-SIDE
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex-1 space-y-6">
                                      <div className="flex justify-between items-start">
                                        <div className="w-full max-w-xs">
                                          <DetailField label="Cadastro nº:" value={suggestedFicha.number} />
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <DetailField label="Nome Completo" value={`${suggestedFicha.name} ${suggestedFicha.surname}`} />
                                        <DetailField label="Data Nascimento *" value={new Date(suggestedFicha.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
                                        <DetailField label="Sexo" value={suggestedFicha.gender} />
                                        <DetailField label="Estado Civil" value={suggestedFicha.maritalStatus} />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Identificação</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                      <DetailField label="NIF" value={suggestedFicha.nif || ''} readOnly={true} />
                                      <DetailField label="Tipo Documento" value="CNI" />
                                      <DetailField label="Número Documento" value={suggestedFicha.docNumber || suggestedFicha.number || '---'} />
                                      <DetailField label="Data Emissão" value="15/10/2020" icon={Calendar} />
                                      <DetailField label="Data Validade" value="15/10/2025" icon={Calendar} />
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Dados Biográficos Accordion */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('biographic')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><User size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Dados Biográficos</span>
                    </div>
                    {expandedSections.biographic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.biographic && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8 mt-2">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                          <DetailField label="Nome Completo" value={selectedPerson.full_name} />
                          <DetailField label="Data Nascimento *" value={selectedPerson.birth_date ? new Date(selectedPerson.birth_date).toLocaleDateString('pt-BR') : '---'} icon={Calendar} />
                          <DetailField label="Sexo" value={selectedPerson.gender} type="select" options={['Masculino', 'Feminino', 'Outro']} />
                          <DetailField label="Estado Civil" value={selectedPerson.marital_status} type="select" options={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']} />
                          <DetailField label="Naturalidade" value={selectedPerson.naturality} type="select" options={['Cabo Verde', 'Angola', 'Portugal']} />
                          <DetailField label="Nacionalidade" value={selectedPerson.nationality} type="select" options={['Cabo Verde', 'Angola', 'Portugal']} />
                          <DetailField label="Nome Pai" value={selectedPerson.father_name} />
                          <DetailField label="Nome Mãe" value={selectedPerson.mother_name} />
                          <DetailField label="Profissão" value={selectedPerson.profession} />
                        </div>

                        {/* Documento Identificação */}
                        <div className="space-y-4 mt-8">
                          <h3 className="font-bold text-slate-800 border-l-4 border-blue-600 pl-3">Documento Identificação</h3>
                          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                            <DetailField label="NIF" value={selectedPerson.nif || ''} readOnly={false} onChange={(val) => setSelectedPerson({...selectedPerson, nif: val})} />
                            <DetailField label="Tipo Documento" value={selectedPerson.doc_type} type="select" options={['CNI', 'Passaporte', 'BI']} />
                            <DetailField label="Número Documento" value={selectedPerson.doc_number} />
                            <DetailField label="Data Emissão" value={selectedPerson.doc_issue_date ? new Date(selectedPerson.doc_issue_date).toLocaleDateString('pt-BR') : '---'} icon={Calendar} />
                            <DetailField label="Data Validade" value={selectedPerson.doc_expiry_date ? new Date(selectedPerson.doc_expiry_date).toLocaleDateString('pt-BR') : '---'} icon={Calendar} />
                            <DetailField label="Local Emissão" value={selectedPerson.doc_issue_location} />
                          </div>
                        </div>

                        {/* Contacto */}
                        <div className="space-y-4 mt-8">
                          <h3 className="font-bold text-slate-800 border-l-4 border-blue-600 pl-3">Contacto</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailField label="Telemovel" value={selectedPerson.phone} />
                            <DetailField label="Email" value={selectedPerson.email} />
                          </div>
                        </div>

                        {/* Residencia */}
                        <div className="space-y-4 mt-8">
                          <h3 className="font-bold text-slate-800 border-l-4 border-blue-600 pl-3">Residencia</h3>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <DetailField label="Ilha" value={selectedPerson.island} type="select" options={['Santiago', 'São Vicente', 'Sal', 'Fogo', 'Santo Antão']} />
                            <DetailField label="Concelho" value={selectedPerson.municipality} type="select" options={['Praia', 'Mindelo', 'Espargos', 'São Filipe', 'Porto Novo']} />
                            <DetailField label="Freguesia" value={selectedPerson.parish} type="select" options={['N.S. Da Graça', 'N.S. Da Luz']} />
                            <DetailField label="Localidade" value={selectedPerson.locality} type="select" options={['Cidade Da Praia', 'Mindelo']} />
                            <DetailField label="Zona" value={selectedPerson.zone} type="select" options={['Txadinha', 'Monte Sossego']} />
                            <DetailField label="Outro Ponto de Referência" value={selectedPerson.reference_point} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sinais Complementares Accordion (New Registration Mode) */}
                <AnimatePresence>
                  {isNewRegistration && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <button 
                        onClick={() => toggleSection('complementary')}
                        className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 text-white rounded-lg"><Plus size={18} /></div>
                          <span className="uppercase tracking-widest text-xs">Sinais Complementares</span>
                        </div>
                        {expandedSections.complementary ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      <AnimatePresence>
                        {expandedSections.complementary && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm mt-2">
                              {savedCharacteristics.length > 0 ? (
                                <div className="space-y-4">
                                  <div className="flex justify-end">
                                    <button 
                                      onClick={() => {
                                        setTempCharacteristics([...savedCharacteristics]);
                                        setShowComplementaryModal(true);
                                      }}
                                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      <Edit size={18} />
                                    </button>
                                  </div>
                                  <div className="overflow-x-auto border border-slate-900">
                                    <table className="w-full text-left border-collapse">
                                      <thead>
                                        <tr className="bg-slate-200 text-[11px] font-bold text-slate-900 border-b border-slate-900">
                                          <th className="px-4 py-2 border-r border-slate-900">Caracteristica</th>
                                          <th className="px-4 py-2 border-r border-slate-900">Tipo Caracteristicas</th>
                                          <th className="px-4 py-2">observação</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {savedCharacteristics.map((char, idx) => (
                                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                            <td className="px-4 py-2 text-xs border-r border-slate-900">{char.name}</td>
                                            <td className="px-4 py-2 text-xs border-r border-slate-900">{char.type}</td>
                                            <td className="px-4 py-2 text-xs">{char.observation}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  {otherNotes && (
                                    <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded">
                                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Outras Notas de Referencia</p>
                                      <p className="text-sm text-slate-700">{otherNotes}</p>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="flex justify-end">
                                  <button 
                                    onClick={() => setShowComplementaryModal(true)}
                                    className="px-4 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 transition-colors text-xs border border-blue-900 shadow-sm"
                                  >
                                    Adicionar Sinais Complementares +
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dados Biométricos Accordion (New Registration Mode) */}
                <AnimatePresence>
                  {isNewRegistration && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <button 
                        onClick={() => toggleSection('biometric')}
                        className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 text-white rounded-lg"><Fingerprint size={18} /></div>
                          <span className="uppercase tracking-widest text-xs">Dados Biométricos</span>
                        </div>
                        {expandedSections.biometric ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      <AnimatePresence>
                        {expandedSections.biometric && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm mt-2">
                              <div className="flex justify-end gap-3 mb-6">
                                <button className="px-4 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors text-xs border-2 border-slate-900 shadow-sm flex items-center gap-2">
                                  <Fingerprint size={16} />
                                  Scan Fingerprint
                                </button>
                                <button 
                                  onClick={() => {
                                    setTempPhotos([...savedPhotos]);
                                    setShowPhotoModal(true);
                                  }}
                                  className="px-4 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors text-xs border-2 border-slate-900 shadow-sm"
                                >
                                  Adicionar Fotografia +
                                </button>
                              </div>

                              {savedPhotos.length > 0 && (
                                <div className="bg-slate-50 border-2 border-slate-900 p-8 rounded-sm">
                                  <h3 className="font-bold text-slate-900 mb-8 text-sm uppercase tracking-tight">Fotografias Associadas</h3>
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                                    {savedPhotos.map((photo, idx) => (
                                      <div key={idx} className="flex flex-col items-center space-y-4">
                                        <div className="w-full aspect-[3/4] bg-white shadow-lg overflow-hidden border border-slate-200">
                                          <img 
                                            src={photo.url} 
                                            alt={photo.title} 
                                            className="w-full h-full object-cover"
                                            referrerPolicy="no-referrer"
                                          />
                                        </div>
                                        <p className="text-sm font-bold text-slate-900">{photo.title}</p>
                                        <button 
                                          onClick={() => {
                                            const newPhotos = savedPhotos.filter((_, i) => i !== idx);
                                            setSavedPhotos(newPhotos);
                                          }}
                                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                                        >
                                          <Trash2 size={20} />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Outras Informações Accordion (New Registration Mode) */}
                <AnimatePresence>
                  {isNewRegistration && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <button 
                        onClick={() => toggleSection('other_info')}
                        className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 text-white rounded-lg"><Info size={18} /></div>
                          <span className="uppercase tracking-widest text-xs">Outras Informações</span>
                        </div>
                        {expandedSections.other_info ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSections.other_info && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm mt-2 space-y-12">
                              {/* Endereço */}
                              <div className="space-y-4">
                                <AnimatePresence>
                                  {showAddAddress && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 mb-4"
                                    >
                                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                        <h5 className="text-xs font-bold text-slate-700 uppercase">Novo Endereço</h5>
                                        <button onClick={() => setShowAddAddress(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo</label>
                                          <select 
                                            value={newAddress.type}
                                            onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                          >
                                            <option value="Residência">Residência</option>
                                            <option value="Trabalho">Trabalho</option>
                                            <option value="Outro">Outro</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Ilha</label>
                                          <select 
                                            value={newAddress.island}
                                            onChange={(e) => setNewAddress({...newAddress, island: e.target.value})}
                                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                          >
                                            <option value="">Selecione...</option>
                                            <option value="Santiago">Santiago</option>
                                            <option value="São Vicente">São Vicente</option>
                                            <option value="Sal">Sal</option>
                                            <option value="Fogo">Fogo</option>
                                            <option value="Santo Antão">Santo Antão</option>
                                            <option value="Boa Vista">Boa Vista</option>
                                            <option value="Maio">Maio</option>
                                            <option value="São Nicolau">São Nicolau</option>
                                            <option value="Brava">Brava</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Conselho</label>
                                          <select 
                                            value={newAddress.council}
                                            onChange={(e) => setNewAddress({...newAddress, council: e.target.value})}
                                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                          >
                                            <option value="">Selecione...</option>
                                            <option value="Praia">Praia</option>
                                            <option value="Mindelo">Mindelo</option>
                                            <option value="Espargos">Espargos</option>
                                            <option value="Assomada">Assomada</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Freguesia</label>
                                          <select 
                                            value={newAddress.parish}
                                            onChange={(e) => setNewAddress({...newAddress, parish: e.target.value})}
                                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                          >
                                            <option value="">Selecione...</option>
                                            <option value="Nossa Senhora da Graça">Nossa Senhora da Graça</option>
                                            <option value="São Nicolau Tolentino">São Nicolau Tolentino</option>
                                            <option value="Santíssimo Nome de Jesus">Santíssimo Nome de Jesus</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Localidade</label>
                                          <select 
                                            value={newAddress.locality}
                                            onChange={(e) => setNewAddress({...newAddress, locality: e.target.value})}
                                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                          >
                                            <option value="">Selecione...</option>
                                            <option value="Achada Santo António">Achada Santo António</option>
                                            <option value="Palmarejo">Palmarejo</option>
                                            <option value="Plateau">Plateau</option>
                                            <option value="Fazenda">Fazenda</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Referência</label>
                                          <input 
                                            type="text" 
                                            value={newAddress.reference}
                                            onChange={(e) => setNewAddress({...newAddress, reference: e.target.value})}
                                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex justify-end">
                                        <button 
                                          onClick={() => handleAddOtherInfo('address')}
                                          className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors"
                                        >
                                          Confirmar Adição
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                <div className="flex justify-between items-center">
                                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Endereço</h4>
                                  <Button 
                                    variant="outline" 
                                    icon={showAddAddress ? X : Plus} 
                                    onClick={() => setShowAddAddress(!showAddAddress)}
                                  >
                                    {showAddAddress ? 'Cancelar' : 'Adicionar Endereço'}
                                  </Button>
                                </div>

                                <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-6 py-4">N º</th>
                                        <th className="px-6 py-4">Tipo</th>
                                        <th className="px-6 py-4">Ilha</th>
                                        <th className="px-6 py-4">Localidade</th>
                                        <th className="px-6 py-4">Criado em</th>
                                        <th className="px-6 py-4 text-right">Ação</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                      {(selectedFicha?.addresses || savedAddresses)?.filter((a: any) => a.validTo === null).map((addr: any, idx: number) => (
                                        <tr key={addr.id} className="hover:bg-slate-50 transition-colors group">
                                          <td className="px-6 py-4 text-xs font-black text-slate-900">{(idx + 1).toString().padStart(2, '0')}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{addr.type}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{addr.island}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{addr.locality}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{addr.validFrom}</td>
                                          <td className="px-6 py-4 text-right flex justify-end gap-3">
                                            <button 
                                              onClick={() => {
                                                setSelectedAddressDetails(addr);
                                                setShowAddressDetailsModal(true);
                                              }}
                                              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
                                            >
                                              <Search size={16} />
                                            </button>
                                            {!addr.validTo && (
                                              <button 
                                                onClick={() => handleDeactivateOtherInfo('address', addr.id)}
                                                className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-red-100 transition-colors"
                                              >
                                                Desativar
                                              </button>
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              {/* Contactos */}
                              <div className="space-y-4">
                                <AnimatePresence>
                                  {showAddContact && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 mb-4"
                                    >
                                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                        <h5 className="text-xs font-bold text-slate-700 uppercase">Novo Contacto</h5>
                                        <button onClick={() => setShowAddContact(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo</label>
                                          <select 
                                            value={newContact.type}
                                            onChange={(e) => setNewContact({...newContact, type: e.target.value})}
                                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                          >
                                            <option value="Telemóvel">Telemóvel</option>
                                            <option value="Telefone">Telefone</option>
                                            <option value="Email">Email</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Informação</label>
                                          <input 
                                            type="text" 
                                            value={newContact.info}
                                            onChange={(e) => setNewContact({...newContact, info: e.target.value})}
                                            placeholder="Ex: 999 99 99 ou email@exemplo.com"
                                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex justify-end">
                                        <button 
                                          onClick={() => handleAddOtherInfo('contact')}
                                          className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors"
                                        >
                                          Confirmar Adição
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                <div className="flex justify-between items-center">
                                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Contactos</h4>
                                  <Button 
                                    variant="outline" 
                                    icon={showAddContact ? X : Plus} 
                                    onClick={() => setShowAddContact(!showAddContact)}
                                  >
                                    {showAddContact ? 'Cancelar' : 'Adicionar Contacto'}
                                  </Button>
                                </div>

                                <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-6 py-4">N º</th>
                                        <th className="px-6 py-4">Tipo</th>
                                        <th className="px-6 py-4">Informação</th>
                                        <th className="px-6 py-4">Criado em</th>
                                        <th className="px-6 py-4 text-right">Ação</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                      {(selectedFicha?.contacts || savedContacts)?.filter((c: any) => c.validTo === null).map((contact: any, idx: number) => (
                                        <tr key={contact.id} className="hover:bg-slate-50 transition-colors group">
                                          <td className="px-6 py-4 text-xs font-black text-slate-900">{(idx + 1).toString().padStart(2, '0')}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{contact.type}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-800">{contact.info}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{contact.validFrom}</td>
                                          <td className="px-6 py-4 text-right">
                                            {!contact.validTo && (
                                              <button 
                                                onClick={() => handleDeactivateOtherInfo('contact', contact.id)}
                                                className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-red-100 transition-colors"
                                              >
                                                Desativar
                                              </button>
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Alcunhas */}
                                <div className="space-y-4">
                                  <AnimatePresence>
                                    {showAddNickname && (
                                      <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 mb-4"
                                      >
                                        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                          <h5 className="text-xs font-bold text-slate-700 uppercase">Nova Alcunha</h5>
                                          <button onClick={() => setShowAddNickname(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Alcunha</label>
                                          <input 
                                            type="text" 
                                            value={newNickname.value}
                                            onChange={(e) => setNewNickname({value: e.target.value})}
                                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                          />
                                        </div>
                                        <div className="flex justify-end">
                                          <button 
                                            onClick={() => handleAddOtherInfo('nickname')}
                                            className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors"
                                          >
                                            Confirmar Adição
                                          </button>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                  <div className="flex justify-between items-center">
                                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Alcunhas</h4>
                                    <Button 
                                      variant="outline" 
                                      icon={showAddNickname ? X : Plus} 
                                      onClick={() => setShowAddNickname(!showAddNickname)}
                                    >
                                      {showAddNickname ? 'Cancelar' : 'Adicionar Alcunha'}
                                    </Button>
                                  </div>

                                  <div className="border-2 border-slate-50 rounded-2xl overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                      <thead>
                                        <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                          <th className="px-6 py-3">Alcunha</th>
                                          <th className="px-6 py-3 text-right">Ação</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-50">
                                        {(selectedFicha?.nicknames || savedNicknames)?.filter((n: any) => n.validTo === null).map((nickname: any) => (
                                          <tr key={nickname.id}>
                                            <td className="px-6 py-3 text-xs font-bold text-slate-700">{nickname.value}</td>
                                            <td className="px-6 py-3 text-right">
                                              <button 
                                                onClick={() => handleDeactivateOtherInfo('nickname', nickname.id)}
                                                className="text-red-500 hover:text-red-700"
                                              >
                                                <Trash2 size={16} />
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                {/* Redes Sociais */}
                                <div className="space-y-4">
                                  <AnimatePresence>
                                    {showAddSocial && (
                                      <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 mb-4"
                                      >
                                        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                          <h5 className="text-xs font-bold text-slate-700 uppercase">Nova Rede Social</h5>
                                          <button onClick={() => setShowAddSocial(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo</label>
                                            <select 
                                              value={newSocial.type}
                                              onChange={(e) => setNewSocial({...newSocial, type: e.target.value})}
                                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                            >
                                              <option value="Facebook">Facebook</option>
                                              <option value="Instagram">Instagram</option>
                                              <option value="Twitter">Twitter</option>
                                              <option value="LinkedIn">LinkedIn</option>
                                            </select>
                                          </div>
                                          <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase">Link / Username</label>
                                            <input 
                                              type="text" 
                                              value={newSocial.link}
                                              onChange={(e) => setNewSocial({...newSocial, link: e.target.value})}
                                              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                                            />
                                          </div>
                                        </div>
                                        <div className="flex justify-end">
                                          <button 
                                            onClick={() => handleAddOtherInfo('social')}
                                            className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors"
                                          >
                                            Confirmar Adição
                                          </button>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                  <div className="flex justify-between items-center">
                                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Redes Sociais</h4>
                                    <Button 
                                      variant="outline" 
                                      icon={showAddSocial ? X : Plus} 
                                      onClick={() => setShowAddSocial(!showAddSocial)}
                                    >
                                      {showAddSocial ? 'Cancelar' : 'Adicionar Rede Social'}
                                    </Button>
                                  </div>

                                  <div className="border-2 border-slate-50 rounded-2xl overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                      <thead>
                                        <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                          <th className="px-6 py-3">Rede Social</th>
                                          <th className="px-6 py-3">Link</th>
                                          <th className="px-6 py-3 text-right">Ação</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-50">
                                        {(selectedFicha?.socialNetworks || savedSocialNetworks)?.filter((s: any) => s.validTo === null).map((social: any) => (
                                          <tr key={social.id}>
                                            <td className="px-6 py-3 text-xs font-bold text-slate-700">{social.type}</td>
                                            <td className="px-6 py-3 text-xs text-slate-600 truncate max-w-[150px]">{social.link}</td>
                                            <td className="px-6 py-3 text-right">
                                              <button 
                                                onClick={() => handleDeactivateOtherInfo('social', social.id)}
                                                className="text-red-500 hover:text-red-700"
                                              >
                                                <Trash2 size={16} />
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Motivo do Cadastro Accordion */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('records')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><ClipboardList size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Motivo do Cadastro</span>
                    </div>
                    {expandedSections.records ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.records && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden mt-2 shadow-sm">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-200 text-slate-700 text-xs uppercase font-bold">
                                <th className="px-4 py-2 border-r border-slate-300">Data</th>
                                <th className="px-4 py-2 border-r border-slate-300">Motivo do Cadastro</th>
                                <th className="px-4 py-2 border-r border-slate-300">Nº Ref/ Nota</th>
                                <th className="px-4 py-2 border-r border-slate-300">Destino</th>
                                <th className="px-4 py-2 border-r border-slate-300">Medidas</th>
                                <th className="px-4 py-2">Tipo</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedPerson.records?.map((r: any) => (
                                <tr key={r.id} className="border-t border-slate-300">
                                  <td className="px-4 py-2 border-r border-slate-300 text-sm">{new Date(r.date).toLocaleDateString('pt-BR')}</td>
                                  <td className="px-4 py-2 border-r border-slate-300 text-sm">{r.reason}</td>
                                  <td className="px-4 py-2 border-r border-slate-300 text-sm">{r.ref_note}</td>
                                  <td className="px-4 py-2 border-r border-slate-300 text-sm">{r.destination}</td>
                                  <td className="px-4 py-2 border-r border-slate-300 text-sm">{r.measures}</td>
                                  <td className="px-4 py-2 text-sm">{r.type}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>



                {/* Observações Accordion */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('observations')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><MessageSquare size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Observações</span>
                    </div>
                    {expandedSections.observations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.observations && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 space-y-4 mt-2 shadow-sm">
                          <div className="flex justify-end">
                            <button 
                              onClick={() => {
                                setEditingObs(null);
                                setObsContent('');
                                setShowObsModal(true);
                              }}
                              className="px-4 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors text-xs border-2 border-slate-900 shadow-sm flex items-center gap-2"
                            >
                              <Plus size={16} />
                              Nova Observação
                            </button>
                          </div>
                          {selectedPerson.observations?.map((o: any) => (
                            <div key={o.id} className="bg-white border border-slate-300 p-6 relative group">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-slate-100 border border-slate-300 flex items-center justify-center">
                                    <User size={24} className="text-slate-400" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-800">{o.author}</p>
                                    <p className="text-xs text-slate-500">{new Date(o.date).toLocaleDateString('pt-BR')}</p>
                                  </div>
                                </div>
                                
                                {user?.name === o.author && (
                                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => {
                                        setEditingObs(o);
                                        setObsContent(o.content);
                                        setShowObsModal(true);
                                      }}
                                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button 
                                      onClick={() => {
                                        if (confirm('Deseja eliminar esta observação?')) {
                                          const newObs = selectedPerson.observations.filter((obs: any) => obs.id !== o.id);
                                          setSelectedPerson({...selectedPerson, observations: newObs});
                                        }
                                      }}
                                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-slate-700 leading-relaxed">
                                {o.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Anexo Accordion */}
                <div className="space-y-4">
                  <button 
                    onClick={() => toggleSection('attachments')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Paperclip size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Anexos</span>
                    </div>
                    {expandedSections.attachments ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.attachments && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 mt-2 space-y-6 shadow-sm">
                          <div className="flex justify-end">
                            <button 
                              onClick={() => setShowAttachmentModal(true)}
                              className="px-4 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors text-xs border-2 border-slate-900 shadow-sm flex items-center gap-2"
                            >
                              <Plus size={16} />
                              Adicionar Anexo
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {savedAttachments.length > 0 ? (
                              savedAttachments.map((att, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg group relative">
                                  <div className="w-12 h-12 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-400">
                                    {att.type === 'Imagem' ? <ImageIcon size={24} /> : <FileText size={24} />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 truncate">{att.title}</p>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">{att.type} • {att.date}</p>
                                  </div>
                                  <button 
                                    onClick={() => setSavedAttachments(savedAttachments.filter((_, i) => i !== idx))}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-100 rounded-xl">
                                <Paperclip size={32} className="mx-auto text-slate-200 mb-2" />
                                <p className="text-slate-400 text-sm italic">Nenhum anexo associado</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between pt-8">
                  <button 
                    onClick={() => setCurrentView('person_list')}
                    className="px-8 py-2 bg-blue-100 text-blue-700 font-bold rounded hover:bg-blue-200 transition-colors text-sm border border-blue-300 shadow-sm"
                  >
                    Voltar
                  </button>
                  
                  { (associatedPerson || isNewRegistration) ? (
                    <div className="flex gap-4">
                      <button 
                        className="px-8 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors text-sm border border-blue-600 shadow-md"
                      >
                        Guardar
                      </button>
                      <button 
                        onClick={() => {
                          if (selectedPerson) {
                            // Update status to Concluído
                            const updatedPerson = { 
                              ...selectedPerson, 
                              status: 'Concluído',
                              completed_by: user?.name,
                              completed_date: new Date().toISOString(),
                              completed_unit: user?.unit || 'Unidade Central'
                            };
                            setSelectedPerson(updatedPerson);
                            
                            // Add to Fichas list
                            const newFicha = {
                              id: Date.now(),
                              number: updatedPerson.process_number || '---',
                              name: updatedPerson.full_name,
                              birthDate: updatedPerson.birth_date,
                              island: updatedPerson.island
                            };
                            setFichas([newFicha, ...fichas]);
                            
                            // Update in persons list too
                            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p));
                            
                            alert('Registo concluído com sucesso! Ficha de cadastro gerada.');
                          }
                        }}
                        className="px-8 py-2 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 transition-colors text-sm border border-emerald-700 shadow-md"
                      >
                        Concluir
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => {
                        setHideNewCadastroInAssociate(false);
                        setShowAssociateModal(true);
                      }}
                      className="px-8 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors text-sm border border-blue-600 shadow-md"
                    >
                      Associar Cadastro
                    </button>
                  )}
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>

        {/* Return Modal */}
        <AnimatePresence>
          {showReturnModal && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200"
              >
                <div className="p-6 border-b border-slate-100 bg-slate-50">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Devolver Pedido</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Motivo da Devolução</label>
                    <textarea 
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all min-h-[120px]"
                      placeholder="Descreva o motivo pelo qual o pedido está sendo devolvido para análise..."
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                  <button 
                    onClick={() => setShowReturnModal(false)}
                    className="flex-1 px-4 py-2 bg-white text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm border-2 border-slate-200"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => {
                      if (!returnReason.trim()) {
                        setErrorMessage('Por favor, informe o motivo da devolução.');
                        setShowErrorModal(true);
                        return;
                      }
                      // Return to analysis
                      const returnedCert = {
                        ...selectedDecisionCertificate,
                        status: 'Devolvido',
                        history: [
                          ...selectedDecisionCertificate.history,
                          { date: new Date().toLocaleDateString('pt-BR'), phase: 'Analise', status: 'Devolvido', user: user?.name || 'Sistema' }
                        ],
                        observations: [
                          ...selectedDecisionCertificate.observations,
                          { user: user?.name || 'Sistema', date: new Date().toLocaleDateString('pt-BR'), text: `DEVOLUÇÃO: ${returnReason}` }
                        ]
                      };
                      setMockAnalysisCertificates([...mockAnalysisCertificates, returnedCert]);
                      setMockDecisionCertificates(mockDecisionCertificates.filter(c => c.id !== selectedDecisionCertificate.id));
                      setShowReturnModal(false);
                      setReturnReason('');
                      setSuccessMessage('Pedido devolvido para análise com sucesso.');
                      setShowSuccessModal(true);
                      setCurrentView('certificate_decision');
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm shadow-md"
                  >
                    Devolver
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Associar Cadastro Modal */}
        <AnimatePresence>
          {showAssociateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden border border-slate-200"
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h2 className="text-xl font-bold text-slate-800">Associar Ficha Individual</h2>
                  {hasSearchedAssociate && !hideNewCadastroInAssociate && (
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors text-xs shadow-sm"
                      onClick={() => {
                        setShowConfirmNew(true);
                      }}
                    >
                      Novo Cadastro
                    </button>
                  )}
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Numero Cadastro</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                        value={associateSearchFilters.number}
                        onChange={(e) => setAssociateSearchFilters({...associateSearchFilters, number: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nome</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                        value={associateSearchFilters.name}
                        onChange={(e) => setAssociateSearchFilters({...associateSearchFilters, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Apelido</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                        value={associateSearchFilters.surname}
                        onChange={(e) => setAssociateSearchFilters({...associateSearchFilters, surname: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Data Nascimento</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                          value={associateSearchFilters.birthDate}
                          onChange={(e) => setAssociateSearchFilters({...associateSearchFilters, birthDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Número Documento</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500"
                        value={associateSearchFilters.docNumber}
                        onChange={(e) => setAssociateSearchFilters({...associateSearchFilters, docNumber: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => {
                        setAssociateSearchFilters({
                          number: '',
                          name: '',
                          surname: '',
                          birthDate: '',
                          docNumber: ''
                        });
                        setAssociateResults([]);
                        setHasSearchedAssociate(false);
                      }}
                      className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded hover:bg-slate-200 transition-colors text-xs border border-slate-300"
                    >
                      Limpar
                    </button>
                    <button 
                      onClick={() => {
                        // Mock search logic for demonstration
                        setAssociateResults([
                          { id: 99, number: '006', name: 'Bruno', surname: 'Mascarenhas', birthDate: '2000-12-15', gender: 'Masculino', maritalStatus: 'Solteira' }
                        ]);
                        setHasSearchedAssociate(true);
                      }}
                      className="px-6 py-2 bg-slate-800 text-white font-bold rounded hover:bg-slate-900 transition-colors text-xs shadow-sm"
                    >
                      Pesquisar
                    </button>
                  </div>

                  {hasSearchedAssociate && (
                    <div className="mt-8 border-t border-slate-100 pt-6">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="text-[11px] font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-200">
                              <th className="px-4 py-3">Nº Ficha</th>
                              <th className="px-4 py-3">Nome</th>
                              <th className="px-4 py-3">Apelido</th>
                              <th className="px-4 py-3">Data Nascimento</th>
                              <th className="px-4 py-3">Sexo</th>
                              <th className="px-4 py-3">Estado Civil</th>
                              <th className="px-4 py-3 text-right">Ação</th>
                            </tr>
                          </thead>
                          <tbody>
                            {associateResults.length > 0 ? (
                              associateResults.map((r) => (
                                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                  <td className="px-4 py-4 text-sm font-medium text-slate-700">{r.number}</td>
                                  <td className="px-4 py-4 text-sm text-slate-700">{r.name}</td>
                                  <td className="px-4 py-4 text-sm text-slate-700">{r.surname}</td>
                                  <td className="px-4 py-4 text-sm text-slate-700">{new Date(r.birthDate).toLocaleDateString('pt-BR')}</td>
                                  <td className="px-4 py-4 text-sm text-slate-700">{r.gender}</td>
                                  <td className="px-4 py-4 text-sm text-slate-700">{r.maritalStatus}</td>
                                  <td className="px-4 py-4 text-right">
                                    <button 
                                      onClick={() => {
                                        setPersonToAssociate(r);
                                        setShowConfirmAssociate(true);
                                      }}
                                      className="text-blue-500 font-bold text-xs hover:underline"
                                    >
                                      Associar
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-slate-400 italic">Nenhum registro encontrado</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-slate-100 flex justify-start bg-slate-50">
                  <button 
                    onClick={() => setShowAssociateModal(false)}
                    className="px-8 py-2 bg-blue-900 text-white font-bold rounded hover:bg-blue-950 transition-colors text-xs shadow-md"
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Confirmation Modal (Associate) */}
        <AnimatePresence>
          {showConfirmAssociate && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center space-y-6 border border-slate-200"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Fingerprint size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800">Confirmar Associação</h3>
                  <p className="text-sm text-slate-500">Deseja associar este cadastro à ocorrência atual?</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowConfirmAssociate(false)}
                    className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded hover:bg-slate-200 transition-colors text-sm border border-slate-300"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => {
                      setAssociatedPerson(personToAssociate);
                      setIsNewRegistration(false);
                      setShowConfirmAssociate(false);
                      setShowAssociateModal(false);
                      setExpandedSections(prev => ({ ...prev, associated: true }));
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors text-sm shadow-md"
                  >
                    Confirmar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Confirmation Modal (New Registration) */}
        <AnimatePresence>
          {showConfirmNew && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center space-y-6 border border-slate-200"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Plus size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800">Novo Cadastro</h3>
                  <p className="text-sm text-slate-500">Deseja iniciar um novo cadastro manual para esta ocorrência?</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowConfirmNew(false)}
                    className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded hover:bg-slate-200 transition-colors text-sm border border-slate-300"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => {
                      setIsNewRegistration(true);
                      setAssociatedPerson(null);
                      setShowConfirmNew(false);
                      setShowAssociateModal(false);
                      setExpandedSections(prev => ({ ...prev, biographic: true, complementary: true, biometric: true }));
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors text-sm shadow-md"
                  >
                    Confirmar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Sinais Complementares Modal */}
        <AnimatePresence>
          {showComplementaryModal && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded shadow-2xl w-full max-w-5xl overflow-hidden border-2 border-slate-900"
              >
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800">Sinais Complementares</h2>
                </div>

                <div className="p-6 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Caracteristicas*</label>
                      <select 
                        className="w-full px-3 py-2 border-2 border-blue-400 rounded bg-blue-50 text-sm outline-none"
                        value={currentCharacteristic.name}
                        onChange={(e) => setCurrentCharacteristic({
                          ...currentCharacteristic, 
                          name: e.target.value,
                          type: '' // Reset type when name changes
                        })}
                      >
                        <option value="">Escolher</option>
                        {Object.keys(characteristicTypes).map(name => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Tipo Características *</label>
                      {currentCharacteristic.name === 'Altura' ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            placeholder="De (m)"
                            className="w-full px-3 py-2 border-2 border-slate-900 rounded bg-white text-sm outline-none"
                            value={heightRangeFrom}
                            onChange={(e) => setHeightRangeFrom(e.target.value)}
                          />
                          <span className="text-slate-500 font-bold">-</span>
                          <input 
                            type="text" 
                            placeholder="A (m)"
                            className="w-full px-3 py-2 border-2 border-slate-900 rounded bg-white text-sm outline-none"
                            value={heightRangeTo}
                            onChange={(e) => setHeightRangeTo(e.target.value)}
                          />
                        </div>
                      ) : (
                        <select 
                          className="w-full px-3 py-2 border-2 border-slate-900 rounded bg-white text-sm outline-none"
                          value={currentCharacteristic.type}
                          onChange={(e) => setCurrentCharacteristic({...currentCharacteristic, type: e.target.value})}
                          disabled={!currentCharacteristic.name}
                        >
                          <option value="">Escolher</option>
                          {currentCharacteristic.name && characteristicTypes[currentCharacteristic.name].map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Observação</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border-2 border-slate-900 rounded bg-white text-sm outline-none"
                        value={currentCharacteristic.observation}
                        onChange={(e) => setCurrentCharacteristic({...currentCharacteristic, observation: e.target.value})}
                      />
                    </div>
                    <div>
                      <button 
                        onClick={() => {
                          const isHeight = currentCharacteristic.name === 'Altura';
                          const finalType = isHeight ? `${heightRangeFrom}m - ${heightRangeTo}m` : currentCharacteristic.type;
                          
                          if (currentCharacteristic.name && (isHeight ? (heightRangeFrom && heightRangeTo) : currentCharacteristic.type)) {
                            setTempCharacteristics([...tempCharacteristics, { ...currentCharacteristic, type: finalType }]);
                            setCurrentCharacteristic({ name: '', type: '', observation: '' });
                            setHeightRangeFrom('');
                            setHeightRangeTo('');
                          }
                        }}
                        className="px-6 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors text-xs border-2 border-slate-900 shadow-sm"
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>

                  {/* Temporary List Table */}
                  {tempCharacteristics.length > 0 && (
                    <div className="border border-slate-200 rounded overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50">
                          <tr className="text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
                            <th className="px-4 py-2">Caracteristica</th>
                            <th className="px-4 py-2">Tipo</th>
                            <th className="px-4 py-2">Observação</th>
                            <th className="px-4 py-2 text-right">Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tempCharacteristics.map((char, idx) => (
                            <tr key={idx} className="border-b border-slate-100 last:border-0">
                              <td className="px-4 py-2 text-sm">{char.name}</td>
                              <td className="px-4 py-2 text-sm">{char.type}</td>
                              <td className="px-4 py-2 text-sm">{char.observation}</td>
                              <td className="px-4 py-2 text-right">
                                <button 
                                  onClick={() => setTempCharacteristics(tempCharacteristics.filter((_, i) => i !== idx))}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Outras Notas de Referencia</label>
                    <textarea 
                      className="w-full px-4 py-3 border-2 border-slate-900 rounded min-h-[120px] outline-none"
                      value={otherNotes}
                      onChange={(e) => setOtherNotes(e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200 flex justify-end gap-4">
                  <button 
                    onClick={() => {
                      setShowComplementaryModal(false);
                      setTempCharacteristics([]);
                      setCurrentCharacteristic({ name: '', type: '', observation: '' });
                    }}
                    className="px-8 py-2 bg-slate-600 text-white font-bold rounded hover:bg-slate-700 transition-colors text-sm shadow-md"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => {
                      const newGroup = {
                        id: Date.now(),
                        createdAt: new Date().toISOString().split('T')[0],
                        validFrom: new Date().toISOString().split('T')[0],
                        validTo: null,
                        user: 'Utilizador Atual',
                        otherNotes: otherNotes,
                        characteristics: tempCharacteristics.map(c => ({ 
                          name: c.name, 
                          value: c.type,
                          observation: c.observation
                        }))
                      };

                      if (selectedFicha) {
                        const updatedGroups = (selectedFicha.complementaryGroups || []).map((g: any) => {
                          if (g.validTo === null) {
                            return { ...g, validTo: new Date().toISOString().split('T')[0], closedBy: 'Utilizador Atual' };
                          }
                          return g;
                        });
                        
                        const updatedFicha = {
                          ...selectedFicha,
                          complementaryGroups: [newGroup, ...updatedGroups]
                        };
                        
                        setSelectedFicha(updatedFicha);
                        setFichas(prev => prev.map(f => f.id === selectedFicha.id ? updatedFicha : f));
                      } else {
                        setSavedCharacteristics([...tempCharacteristics]);
                      }
                      setShowComplementaryModal(false);
                    }}
                    className="px-8 py-2 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 transition-colors text-sm shadow-md"
                  >
                    Guardar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      {/* Address Details Modal */}
      <AnimatePresence>
        {showAddressDetailsModal && selectedAddressDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200"
            >
              <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-blue-400" />
                  <h3 className="font-bold">Detalhes do Endereço</h3>
                </div>
                <button onClick={() => setShowAddressDetailsModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Tipo</p>
                    <p className="text-sm font-bold text-slate-800">{selectedAddressDetails.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Ilha</p>
                    <p className="text-sm font-bold text-slate-800">{selectedAddressDetails.island}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Conselho</p>
                    <p className="text-sm font-bold text-slate-800">{selectedAddressDetails.council || '---'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Freguesia</p>
                    <p className="text-sm font-bold text-slate-800">{selectedAddressDetails.parish || '---'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Localidade</p>
                    <p className="text-sm font-bold text-slate-800">{selectedAddressDetails.locality || '---'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Criado em</p>
                    <p className="text-sm font-bold text-slate-800">{selectedAddressDetails.validFrom}</p>
                  </div>
                </div>
                <div className="space-y-1 border-t border-slate-100 pt-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Referência</p>
                  <p className="text-sm font-bold text-slate-800">{selectedAddressDetails.reference || 'Nenhuma referência fornecida.'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Criado por</p>
                    <p className="text-xs font-medium text-slate-600">{selectedAddressDetails.user}</p>
                  </div>
                  {selectedAddressDetails.deactivatedBy && (
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Desativado por</p>
                      <p className="text-xs font-medium text-red-600">{selectedAddressDetails.deactivatedBy}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
                <button 
                  onClick={() => setShowAddressDetailsModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded hover:bg-slate-300 transition-colors text-sm"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Solicitação Reabilitação Cadastro Modal */}
      <AnimatePresence>
        {showRehabilitationModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border-4 border-slate-900 w-full max-w-xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="p-6 border-b-4 border-slate-900 bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500 rounded-lg text-white">
                    <ShieldCheck size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Solicitação de Reabilitação</h2>
                </div>
                <button 
                  onClick={() => setShowRehabilitationModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Motivo da Reabilitação</label>
                  <textarea 
                    rows={3}
                    value={rehabilitationReason}
                    onChange={(e) => setRehabilitationReason(e.target.value)}
                    placeholder="Descreva detalhadamente o motivo do pedido de reabilitação..."
                    className="w-full px-4 py-3 border-2 border-slate-900 rounded-lg outline-none focus:ring-4 focus:ring-emerald-500/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Anexos Necessários</label>
                    <label className="cursor-pointer px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded border-2 border-blue-200 text-[10px] hover:bg-blue-100 transition-colors flex items-center gap-1">
                      <Plus size={12} />
                      Adicionar Anexo
                      <input 
                        type="file" 
                        multiple
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files) {
                            setRehabilitationAttachments([...rehabilitationAttachments, ...Array.from(e.target.files)]);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {rehabilitationAttachments.length === 0 ? (
                      <div className="py-8 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
                        <Paperclip size={24} className="mb-2 opacity-20" />
                        <p className="text-[10px] font-medium italic">Nenhum anexo selecionado</p>
                      </div>
                    ) : (
                      rehabilitationAttachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-200 rounded-lg group hover:border-slate-900 transition-colors">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2 bg-white border border-slate-200 rounded shadow-sm">
                              <Paperclip size={14} className="text-slate-400" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold text-slate-700 truncate">{file.name}</p>
                              <p className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              const newFiles = [...rehabilitationAttachments];
                              newFiles.splice(idx, 1);
                              setRehabilitationAttachments(newFiles);
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button 
                    onClick={() => setShowRehabilitationModal(false)}
                    className="px-8 py-2.5 bg-white text-slate-900 font-bold border-2 border-slate-900 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    CANCELAR
                  </button>
                  <button 
                    onClick={handleConfirmRehabilitation}
                    className="px-10 py-2.5 bg-emerald-500 text-white font-bold border-2 border-slate-900 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                  >
                    <ShieldCheck size={18} />
                    CONFIRMAR SOLICITAÇÃO
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

        {/* Detalhes da Solicitação de Reabilitação Modal */}
      <AnimatePresence>
        {showRehabilitationDetailsModal && selectedReasonForRehab?.rehabilitationDetails && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border-4 border-slate-900 w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="p-6 border-b-4 border-slate-900 bg-blue-600 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <Info size={24} />
                  <h2 className="text-xl font-bold">Detalhes da Reabilitação</h2>
                </div>
                <button 
                  onClick={() => setShowRehabilitationDetailsModal(false)}
                  className="p-2 hover:bg-blue-700 rounded-full text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border-2 border-slate-200 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Número Ficha</p>
                    <p className="text-sm font-bold text-blue-600">{selectedFicha?.number}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Nome do Indivíduo</p>
                    <p className="text-sm font-bold text-slate-800">{selectedFicha?.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 border-2 border-slate-200 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Solicitado em</p>
                    <p className="text-sm font-bold text-slate-800">{selectedReasonForRehab.rehabilitationDetails.requestedAt}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Solicitado por</p>
                    <p className="text-sm font-bold text-slate-800">{selectedReasonForRehab.rehabilitationDetails.requestedBy}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Motivo da Solicitação</p>
                  <div className="p-4 bg-white border-2 border-slate-900 rounded-lg text-sm text-slate-700 leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                    {selectedReasonForRehab.rehabilitationDetails.reason}
                  </div>
                </div>

                {selectedReasonForRehab.rehabilitationDetails.attachments.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Anexos ({selectedReasonForRehab.rehabilitationDetails.attachments.length})</p>
                    <div className="space-y-2">
                      {selectedReasonForRehab.rehabilitationDetails.attachments.map((file: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Paperclip size={14} className="text-blue-600" />
                            <span className="text-xs font-bold text-slate-700">{file.name}</span>
                          </div>
                          <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Visualizar">
                            <Eye size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => setShowRehabilitationDetailsModal(false)}
                    className="px-8 py-2.5 bg-slate-900 text-white font-bold border-2 border-slate-900 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    FECHAR
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Approve Confirmation Modal */}
      <AnimatePresence>
        {showApproveConfirmModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border-4 border-slate-900 rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-10 text-center space-y-4">
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest">Alerta</h3>
                <p className="text-xl font-bold text-slate-900">Deseja Realmente Reabilitar o Cadastro?</p>
              </div>
              <div className="flex border-t-4 border-slate-900">
                <button 
                  onClick={() => setShowApproveConfirmModal(false)}
                  className="flex-1 py-5 bg-[#A5C9F3] hover:bg-[#8AB8ED] text-slate-900 font-black uppercase tracking-widest border-r-4 border-slate-900 transition-colors"
                >
                  Não
                </button>
                <button 
                  onClick={handleApproveRehabilitation}
                  className="flex-1 py-5 bg-[#A5C9F3] hover:bg-[#8AB8ED] text-slate-900 font-black uppercase tracking-widest transition-colors"
                >
                  Sim
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[210] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white border-4 border-emerald-500 rounded-2xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Sucesso!</h3>
                <p className="text-slate-600 font-bold">{successMessage}</p>
              </div>
              <Button 
                variant="primary" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 border-emerald-700"
                onClick={() => setShowSuccessModal(false)}
              >
                OK
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[210] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white border-4 border-red-500 rounded-2xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl"
            >
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <FileWarning size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Erro!</h3>
                <p className="text-slate-600 font-bold">{errorMessage}</p>
              </div>
              <Button 
                variant="primary" 
                className="w-full bg-red-600 hover:bg-red-700 border-red-700"
                onClick={() => setShowErrorModal(false)}
              >
                Entendido
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detalhes do Histórico de Fotografias Modal */}
      <AnimatePresence>
        {showPhotoHistoryDetailsModal && selectedPhotoGroup && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border-4 border-slate-900 w-full max-w-4xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="p-6 border-b-4 border-slate-900 bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <History size={24} />
                  <h2 className="text-xl font-bold uppercase tracking-tight">Fotos do Histórico - {selectedPhotoGroup.createdAt}</h2>
                </div>
                <button 
                  onClick={() => setShowPhotoHistoryDetailsModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-4 gap-6 bg-slate-50 p-6 border-2 border-slate-200 rounded-xl shadow-inner">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Data Criação</p>
                    <p className="text-sm font-bold text-slate-800">{selectedPhotoGroup.createdAt}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Data Atualização</p>
                    <p className="text-sm font-bold text-slate-800">{selectedPhotoGroup.updatedAt}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Quem Criou</p>
                    <p className="text-sm font-bold text-slate-800">{selectedPhotoGroup.createdBy}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Quem Atualizou</p>
                    <p className="text-sm font-bold text-slate-800">{selectedPhotoGroup.updatedBy}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {selectedPhotoGroup.photos.map((photo: any, idx: number) => (
                    <div key={idx} className="flex flex-col items-center gap-3">
                      <div className="w-full aspect-[3/4] bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-md hover:border-slate-900 transition-all group">
                        <img 
                          src={`https://picsum.photos/seed/${photo.seed}/300/400`} 
                          alt={photo.label} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                          referrerPolicy="no-referrer" 
                        />
                      </div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{photo.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => setShowPhotoHistoryDetailsModal(false)}
                    className="px-10 py-2.5 bg-slate-900 text-white font-bold border-2 border-slate-900 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    FECHAR
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de Exportação PDF */}
      <AnimatePresence>
        {showPdfModal && selectedFicha && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-slate-800 border-2 border-slate-700 w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl rounded-2xl overflow-hidden"
            >
              {/* PDF Toolbar */}
              <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="bg-red-500 p-2 rounded">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Ficha_Cadastro_{selectedFicha.number}.pdf</h3>
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Documento de Identificação Policial</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all text-xs font-bold border border-slate-700">
                    <Printer size={16} />
                    Imprimir
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded-lg transition-all text-xs font-bold shadow-lg shadow-blue-900/20">
                    <Download size={16} />
                    Download
                  </button>
                  <div className="w-px h-6 bg-slate-700 mx-2" />
                  <button 
                    onClick={() => setShowPdfModal(false)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* PDF Content Area (Simulated) */}
              <div className="flex-1 bg-slate-700 overflow-y-auto p-12 flex justify-center custom-scrollbar">
                <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[20mm] text-slate-900 font-serif relative overflow-hidden">
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-45deg]">
                    <h1 className="text-[120px] font-bold">CONFIDENCIAL</h1>
                  </div>

                  {/* Header */}
                  <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-8">
                    <div className="space-y-2">
                      <h1 className="text-2xl font-bold uppercase tracking-tighter">República de Cabo Verde</h1>
                      <h2 className="text-lg font-medium text-slate-600">Ministério da Administração Interna</h2>
                      <h3 className="text-md font-bold text-slate-800">Polícia Nacional - Direção Central de Investigação</h3>
                    </div>
                    <div className="w-24 h-24 border-2 border-slate-900 flex items-center justify-center bg-slate-50">
                      <img src="/logo.png" alt="Logo" className="w-16 h-16 opacity-20" />
                    </div>
                  </div>

                  {/* Document Title */}
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-black uppercase underline decoration-4 underline-offset-8">Ficha de Identificação Individual</h2>
                    <p className="mt-4 text-slate-500 font-sans text-sm">N.º de Registo: <span className="font-bold text-slate-900">{selectedFicha.number}</span> | Data de Emissão: {new Date().toLocaleDateString()}</p>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-3 gap-8 mb-12">
                    {/* Photo */}
                    <div className="col-span-1">
                      <div className="w-full aspect-[3/4] border-4 border-slate-900 bg-slate-100 flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/frontal/400/533`} 
                          alt="Frontal" 
                          className="w-full h-full object-cover grayscale" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <p className="text-center mt-2 text-[10px] uppercase font-bold font-sans text-slate-400 tracking-widest">Fotografia Frontal</p>
                    </div>

                    {/* Basic Info */}
                    <div className="col-span-2 space-y-6 font-sans">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="border-b border-slate-200 pb-1">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Nome Completo</p>
                          <p className="text-lg font-bold text-slate-900">{selectedFicha.name}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-b border-slate-200 pb-1">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Data de Nascimento</p>
                          <p className="text-sm font-bold text-slate-900">{selectedFicha.birthDate}</p>
                        </div>
                        <div className="border-b border-slate-200 pb-1">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Naturalidade</p>
                          <p className="text-sm font-bold text-slate-900">{selectedFicha.island}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-b border-slate-200 pb-1">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Documento (CNI)</p>
                          <p className="text-sm font-bold text-slate-900">9884565</p>
                        </div>
                        <div className="border-b border-slate-200 pb-1">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Estado Civil</p>
                          <p className="text-sm font-bold text-slate-900">Solteiro</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Characteristics */}
                  <div className="space-y-4 mb-12 font-sans">
                    <h3 className="text-sm font-black uppercase bg-slate-900 text-white px-3 py-1 inline-block">Sinais e Características</h3>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 border-t-2 border-slate-900 pt-4">
                      {[
                        { label: 'Altura', value: '1.85 m' },
                        { label: 'Constituição', value: 'Atlético' },
                        { label: 'Cabelo', value: 'Preto, Curto' },
                        { label: 'Olhos', value: 'Castanhos' },
                        { label: 'Pele', value: 'Morena' },
                        { label: 'Tatuagens', value: 'Braço Direito (Tribal)' }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-end border-b border-slate-100 pb-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</span>
                          <span className="text-xs font-bold text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer / Signatures */}
                  <div className="mt-auto pt-24 grid grid-cols-2 gap-24 font-sans">
                    <div className="text-center space-y-12">
                      <div className="w-full h-px bg-slate-300" />
                      <p className="text-[10px] font-bold uppercase text-slate-400">Assinatura do Funcionário</p>
                    </div>
                    <div className="text-center space-y-12">
                      <div className="w-full h-px bg-slate-300" />
                      <p className="text-[10px] font-bold uppercase text-slate-400">Selo Branco / Autenticação</p>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <p className="text-[8px] text-slate-300 font-sans uppercase tracking-[0.2em]">Documento Gerado Eletronicamente pelo Sistema de Gestão Policial (SGP)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

        <AnimatePresence>
          {showComplementaryDetailsModal && selectedComplementaryGroup && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white border-4 border-slate-900 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="p-6 border-b-4 border-slate-900 bg-blue-600 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white">
                    <Shield size={24} />
                    <h2 className="text-xl font-bold">Detalhes dos Sinais Complementares</h2>
                  </div>
                  <button 
                    onClick={() => setShowComplementaryDetailsModal(false)}
                    className="p-2 hover:bg-blue-700 rounded-full text-white transition-colors"
                  >
                    <Plus size={24} className="rotate-45" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  {/* Metadata Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 border-2 border-slate-900 rounded-xl">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Período de Validade</p>
                      <p className="text-sm font-bold text-slate-800">
                        {selectedComplementaryGroup.validFrom} <span className="text-slate-400 mx-2">→</span> {selectedComplementaryGroup.validTo || 'Atual'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Criado por / Data</p>
                      <p className="text-sm font-bold text-slate-800">
                        {selectedComplementaryGroup.user} <span className="text-slate-400 mx-2">|</span> {selectedComplementaryGroup.createdAt}
                      </p>
                    </div>
                    {selectedComplementaryGroup.closedBy && (
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Fechado por / Data</p>
                        <p className="text-sm font-bold text-slate-800">
                          {selectedComplementaryGroup.closedBy} <span className="text-slate-400 mx-2">|</span> {selectedComplementaryGroup.validTo}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Characteristics Table */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-l-4 border-blue-600 pl-3">Características Registadas</h3>
                    <div className="border-2 border-slate-900 rounded-xl overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-900 text-white text-[11px] font-bold uppercase">
                            <th className="px-4 py-3">Característica</th>
                            <th className="px-4 py-3">Tipo / Valor</th>
                            <th className="px-4 py-3">Observação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedComplementaryGroup.characteristics.map((char: any, idx: number) => (
                            <tr key={idx} className="border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3 text-sm font-bold text-slate-700">{char.name}</td>
                              <td className="px-4 py-3 text-sm text-slate-600">{char.value}</td>
                              <td className="px-4 py-3 text-sm text-slate-500 italic">{char.observation || '---'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Other Notes */}
                  {selectedComplementaryGroup.otherNotes && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-l-4 border-blue-600 pl-3">Outras Notas de Referência</h3>
                      <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl text-sm text-slate-700 leading-relaxed italic">
                        "{selectedComplementaryGroup.otherNotes}"
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t-4 border-slate-900 bg-slate-50 flex justify-end">
                  <button 
                    onClick={() => setShowComplementaryDetailsModal(false)}
                    className="px-8 py-2 bg-slate-900 text-white font-bold rounded hover:bg-slate-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                  >
                    Fechar Detalhes
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Adicionar Fotografia Modal */}
        <AnimatePresence>
          {showPhotoModal && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded shadow-2xl w-full max-w-5xl overflow-hidden border-2 border-slate-900"
              >
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800">Adicionar Fotografia</h2>
                </div>

                <div className="p-6 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-64 space-y-1">
                      <label className="text-xs font-bold text-slate-700">Titulo</label>
                      <select 
                        className="w-full px-3 py-2 border-2 border-slate-900 rounded bg-white text-sm outline-none"
                        value={currentPhotoTitle}
                        onChange={(e) => setCurrentPhotoTitle(e.target.value)}
                      >
                        <option value="Frontal">Frontal</option>
                        <option value="Perfil Esquerdo">Perfil Esquerdo</option>
                        <option value="Perfil Direito">Perfil Direito</option>
                        <option value="Tatuagem">Tatuagem</option>
                        <option value="Piercings">Piercings</option>
                        <option value="Marcas de Nascença">Marcas de Nascença</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-6">
                      <label className="cursor-pointer px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded hover:bg-blue-100 transition-colors text-xs border border-blue-200 flex items-center gap-2">
                        <Upload size={16} />
                        Carregar Anexo ....
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // In a real app, we'd upload this. For now, create a preview URL.
                              const url = URL.createObjectURL(file);
                              setTempPhotos([...tempPhotos, { title: currentPhotoTitle, url, id: Date.now() }]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Photos Table */}
                  <div className="border border-slate-900 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-200 text-[11px] font-bold text-slate-900 border-b border-slate-900">
                          <th className="px-4 py-2 border-r border-slate-900">Titulo</th>
                          <th className="px-4 py-2 border-r border-slate-900">Fotografia</th>
                          <th className="px-4 py-2">Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tempPhotos.length > 0 ? (
                          tempPhotos.map((photo, idx) => (
                            <tr key={photo.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                              <td className="px-4 py-2 text-xs border-r border-slate-900 font-bold">{photo.title}</td>
                              <td className="px-4 py-2 text-xs border-r border-slate-900">
                                <div className="w-16 h-12 border border-slate-300 rounded overflow-hidden">
                                  <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                                </div>
                              </td>
                              <td className="px-4 py-2 text-xs">
                                <button 
                                  onClick={() => setTempPhotos(tempPhotos.filter(p => p.id !== photo.id))}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="px-4 py-12 text-center text-slate-400 italic text-sm">
                              Nenhuma fotografia adicionada
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200 flex justify-end gap-4">
                  <button 
                    onClick={() => {
                      setShowPhotoModal(false);
                      setTempPhotos([]);
                    }}
                    className="px-8 py-2 bg-slate-600 text-white font-bold rounded hover:bg-slate-700 transition-colors text-sm shadow-md"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => {
                      setSavedPhotos([...tempPhotos]);
                      setShowPhotoModal(false);
                    }}
                    className="px-8 py-2 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 transition-colors text-sm shadow-md"
                  >
                    Guardar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Observação Modal */}
        <AnimatePresence>
          {showObsModal && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded shadow-2xl w-full max-w-lg overflow-hidden border-2 border-slate-900"
              >
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800">
                    {editingObs ? 'Editar Observação' : 'Nova Observação'}
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Conteúdo</label>
                    <textarea 
                      className="w-full px-3 py-2 border-2 border-slate-900 rounded bg-white text-sm outline-none min-h-[150px] resize-none"
                      placeholder="Escreva aqui a observação..."
                      value={obsContent}
                      onChange={(e) => setObsContent(e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200 flex justify-end gap-4">
                  <button 
                    onClick={() => setShowObsModal(false)}
                    className="px-8 py-2 bg-slate-600 text-white font-bold rounded hover:bg-slate-700 transition-colors text-sm shadow-md"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => {
                      if (!obsContent.trim()) return;
                      
                      if (editingObs) {
                        const newObs = selectedPerson.observations.map((o: any) => 
                          o.id === editingObs.id ? { ...o, content: obsContent } : o
                        );
                        setSelectedPerson({...selectedPerson, observations: newObs});
                      } else {
                        const newObs = {
                          id: Date.now(),
                          author: user?.name,
                          date: new Date().toISOString(),
                          content: obsContent
                        };
                        setSelectedPerson({
                          ...selectedPerson, 
                          observations: [newObs, ...(selectedPerson.observations || [])]
                        });
                      }
                      setShowObsModal(false);
                    }}
                    className="px-8 py-2 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 transition-colors text-sm shadow-md"
                  >
                    Guardar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Anexo Modal */}
        <AnimatePresence>
          {showAttachmentModal && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded shadow-2xl w-full max-w-lg overflow-hidden border-2 border-slate-900"
              >
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800">Adicionar Anexo</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Título do Anexo</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border-2 border-slate-900 rounded bg-white text-sm outline-none"
                      value={attachmentTitle}
                      onChange={(e) => setAttachmentTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Tipo</label>
                    <select 
                      className="w-full px-3 py-2 border-2 border-slate-900 rounded bg-white text-sm outline-none"
                      value={attachmentType}
                      onChange={(e) => setAttachmentType(e.target.value)}
                    >
                      <option value="Documento">Documento</option>
                      <option value="Imagem">Imagem</option>
                      <option value="Relatório">Relatório</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                  <div className="pt-4">
                    <label className="cursor-pointer w-full py-8 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                      <Upload className="text-slate-400" size={32} />
                      <span className="text-sm font-bold text-slate-600">Clique para carregar ficheiro</span>
                      <input type="file" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && attachmentTitle) {
                          setSavedAttachments([
                            ...savedAttachments, 
                            { 
                              title: attachmentTitle, 
                              type: attachmentType, 
                              date: new Date().toLocaleDateString('pt-BR') 
                            }
                          ]);
                          setShowAttachmentModal(false);
                          setAttachmentTitle('');
                        }
                      }} />
                    </label>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200 flex justify-end gap-4">
                  <button 
                    onClick={() => setShowAttachmentModal(false)}
                    className="px-8 py-2 bg-slate-600 text-white font-bold rounded hover:bg-slate-700 transition-colors text-sm shadow-md"
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 px-8 py-3 flex items-center justify-between text-[10px] text-slate-400 font-medium uppercase tracking-wider">
          <p>© 2024 POLÍCIA NACIONAL - MININT. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex gap-4">
            <span>Versão 2.4.0-build</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Servidor Online
            </span>
          </div>
        </footer>
      </main>

      {/* Biographical Search Results Modal */}
      <AnimatePresence>
        {showBioSearchModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBioSearchModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Search size={20} />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight">Resultados da Pesquisa</h3>
                </div>
                <button 
                  onClick={() => setShowBioSearchModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {bioSearchResults.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                      <Search size={32} />
                    </div>
                    <p className="font-bold text-slate-900">Nenhum resultado encontrado para {bioSearchName ? `"${bioSearchName}"` : ''} {bioSearchName && bioSearchDocNumber ? 'e' : ''} {bioSearchDocNumber ? `"${bioSearchDocNumber}"` : ''}</p>
                    <p className="text-sm text-slate-400">Tente buscar por um nome ou número de documento diferente.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Selecione a pessoa correspondente:</p>
                    <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2">
                      {bioSearchResults.map((person) => (
                        <button 
                          key={person.id}
                          onClick={() => selectPersonFromSearch(person)}
                          className="w-full text-left p-4 bg-slate-50 border-2 border-slate-100 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all group"
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h4 className="font-black text-slate-900 uppercase text-xs tracking-tight group-hover:text-blue-600">{person.name}</h4>
                              <div className="flex gap-4 text-[10px] text-slate-400 font-bold">
                                <span>Nascimento: {person.birthDate}</span>
                                <span>Doc: {person.docNumber || person.number || '---'}</span>
                              </div>
                            </div>
                            <div className="p-2 bg-white rounded-lg border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-colors">
                              <CheckCircle size={16} />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end pt-4">
                  <Button variant="outline" onClick={() => setShowBioSearchModal(false)}>Fechar</Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Person Registration Modal */}
      <AnimatePresence>
        {showPersonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPersonModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <User size={20} />
                  </div>
                  <h3 className="text-lg font-bold">Novo Cadastro de Pessoa</h3>
                </div>
                <button 
                  onClick={() => setShowPersonModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <form onSubmit={handlePersonSubmit} className="p-8 grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Número Processo / Ocorrência</label>
                  <input 
                    type="text" 
                    required
                    value={formData.process_number}
                    onChange={(e) => setFormData({...formData, process_number: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ex: 0006"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Unidade</label>
                  <select 
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="ESF">ESF</option>
                    <option value="DP">DP</option>
                  </select>
                </div>

                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label>
                  <input 
                    type="text" 
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Nome completo do cidadão"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">NIF</label>
                  <input 
                    type="text" 
                    value={formData.nif}
                    onChange={(e) => setFormData({...formData, nif: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Número de Identificação Fiscal"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nº de Identificação (BI/Passaporte)</label>
                  <input 
                    type="text" 
                    required
                    value={formData.id_number}
                    onChange={(e) => setFormData({...formData, id_number: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Ex: 001234567LA041"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Data de Nascimento</label>
                  <input 
                    type="date" 
                    required
                    value={formData.birth_date}
                    onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Gênero</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="O">Outro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Ilha</label>
                  <select 
                    value={formData.island}
                    onChange={(e) => setFormData({...formData, island: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Santiago">Santiago</option>
                    <option value="São Vicente">São Vicente</option>
                    <option value="Sal">Sal</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nacionalidade</label>
                  <input 
                    type="text" 
                    required
                    value={formData.nationality}
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Endereço de Residência</label>
                  <textarea 
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    placeholder="Rua, Bairro, Município, Província"
                  />
                </div>

                <div className="col-span-2 flex justify-end gap-3 mt-4">
                  <button 
                    type="button"
                    onClick={() => setShowPersonModal(false)}
                    className="px-6 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    CANCELAR
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-8 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all disabled:opacity-50"
                  >
                    {loading ? "SALVANDO..." : "SALVAR CADASTRO"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showLevantamentoModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border-2 border-slate-100 overflow-hidden"
            >
              <div className="p-6 bg-slate-50 border-b-2 border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-600 text-white rounded-lg"><Check size={18} /></div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Realizar Levantamento</h3>
                </div>
                <button onClick={() => setShowLevantamentoModal(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <DetailField 
                    label="Nome" 
                    value={levantamentoData.nome} 
                    readOnly={false}
                    onChange={(val) => setLevantamentoData({...levantamentoData, nome: val})}
                  />
                  <DetailField 
                    label="Apelido" 
                    value={levantamentoData.apelido} 
                    readOnly={false}
                    onChange={(val) => setLevantamentoData({...levantamentoData, apelido: val})}
                  />
                  <DetailField 
                    label="Data Nascimento" 
                    value={levantamentoData.dataNascimento} 
                    type="date"
                    readOnly={false}
                    icon={Calendar}
                    onChange={(val) => setLevantamentoData({...levantamentoData, dataNascimento: val})}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowLevantamentoModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1 bg-green-600 hover:bg-green-700 border-green-600"
                    icon={Check}
                    onClick={() => {
                      setRegisteredDoc({
                        ...registeredDoc,
                        levantamento: {
                          ...levantamentoData,
                          registadoPor: user?.name || 'Agente PN - 001',
                          dataLevantamento: new Date().toLocaleDateString('pt-BR')
                        }
                      });
                      setShowLevantamentoModal(false);
                      setSuccessMessage('Levantamento realizado com sucesso');
                      setShowSuccessModal(true);
                    }}
                  >
                    Concluir Levantamento
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
