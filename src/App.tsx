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
  AlertTriangle,
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
  UserPlus,
  Lock,
  SlidersHorizontal,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface UserProfile {
  id: number;
  username: string;
  name: string;
  role: string;
}

// --- Photo helpers ---

function seedToId(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return (Math.abs(hash) % 70) + 1;
}

function getPortraitUrl(seed: string, gender: 'men' | 'women' = 'men'): string {
  return `https://randomuser.me/api/portraits/${gender}/${seedToId(seed)}.jpg`;
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
  const [currentView, setCurrentView] = useState<'dashboard' | 'person_list' | 'person_detail' | 'ficha_list' | 'ficha_new' | 'ficha_detail' | 'recognition' | 'rehabilitation_list' | 'document_registration' | 'document_detail' | 'document_search' | 'certificate_list' | 'certificate_registration' | 'certificate_list_extravio' | 'certificate_registration_extravio' | 'certificate_analysis_extravio' | 'certificate_analysis_extravio_detail' | 'certificate_decision_extravio' | 'certificate_decision_extravio_detail' | 'certificate_history_extravio' | 'certificate_history_extravio_detail' | 'parametrizacoes'>('dashboard');
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [selectedFicha, setSelectedFicha] = useState<any>(null);
  const [persons, setPersons] = useState<any[]>([
    {
      id: 1,
      process_number: 'PRE-1000/N/2026', occurrence_number: 'PN17022025000705/EPASA', unit: 'ESF', full_name: 'Bruno Fonseca', birth_date: '2010-05-15', gender: 'Masculino', marital_status: 'Solteiro', received_date: '2023-03-19',
      naturality: 'Cabo Verde', nationality: 'Cabo Verde', father_name: 'António Fonseca', mother_name: 'Maria Fonseca', profession: 'Estudante', 
      doc_type: 'BI', doc_number: '001234567LA041', doc_issue_date: '2020-01-01', doc_expiry_date: '2030-01-01', doc_issue_location: 'Praia',
      phone: '9884565', email: 'bruno@email.cv', island: 'Santiago', municipality: 'Praia', parish: 'N.S. Da Graça', locality: 'Cidade Da Praia', zone: 'Txadinha', reference_point: 'Perto da Escola',
      nif: '200123456', status: 'Por Associar', sent_by: 'Carlos Mascarenha', sent_date: '2023-03-20', sent_unit: 'ESF Praia', completed_by: null, completed_date: null, completed_unit: null,
      records: [
        {id: 1, person_id: 1, date: '2023-05-12T14:32:00', date_start: '2023-05-12T14:32:00', date_end: '2023-05-12T16:10:00', detention_date: '2023-05-12', reason: 'Furto qualificado em residência', ref_note: 'REF-2023-045', measures: 'Termo de Identidade e Residência', type: 'Criminal', auto_type: 'Auto de Notícia', natureza: 'Crime contra o Património', enquadramento: 'Furto Qualificado — Art. 197º CP', created_by: 'Carlos Mascarenha', sent_by: 'João Andrade', comando: 'Comando Regional Santiago Sul', unit: 'ESF Praia'}
      ],
      observations: [
        {id: 1, person_id: 1, author: 'Carlos Mascarenha', date: '2023-03-20', content: 'Pedido de registo enviado após abordagem e identificação do indivíduo. Documentação entregue à esquadra para instrução do processo.'}
      ]
    }
  ]);
  const [fichas, setFichas] = useState<any[]>([
    {
      id: 1,
      number: 'FICAD-102/N-PR/2026',
      name: 'Bruno Fonseca',
      birthDate: '1998-04-29',
      gender: 'Masculino',
      civilStatus: 'Solteiro(a)',
      nationality: 'Cabo-verdiana',
      birthPlace: 'Praia',
      fatherName: 'António Fonseca',
      motherName: 'Maria Fonseca',
      nif: '200123456',
      docNumber: '001234567LA041',
      docIssueDate: '2020-01-01',
      docExpiryDate: '2030-01-01',
      photo: getPortraitUrl('bruno_fonseca', 'men'),
      island: 'Santiago',
      estado: 'Completo',
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
        { id: 2, createdAt: '2024-02-24', validFrom: '2024-02-24', validTo: null, user: 'Paulo', type: 'Email', info: 'joai@gmail.com' },
        { id: 3, createdAt: '2024-02-24', validFrom: '2024-02-24', validTo: null, user: 'Paulo', type: 'Facebook', info: 'facebook.com/bruno' }
      ],
      nicknames: [
        { id: 1, createdAt: '2024-02-24', validFrom: '2024-02-24', validTo: null, user: 'Paulo', value: 'Manxedo' }
      ],
      documents: [
        { id: 1, createdAt: '2024-02-24', validFrom: '2024-02-24', validTo: null, user: 'Paulo', type: 'CNI', number: '001234567LA041', issueDate: '2020-01-01', expiryDate: '2030-01-01', issueLocation: 'Praia' }
      ],
      groups: [
        { id: 1, createdAt: '2023-05-12', validFrom: '2023-05-12', validTo: null, user: 'Carlos Mascarenha', sigla: 'TL', nome: 'Thug Life', funcao: 'Membro', areaAtuacao: 'Tráfico de estupefacientes', ilha: 'Santiago', cidade: 'Praia', freguesia: 'Achada Santo António', localidade: 'Achada Santo António', referencia: 'Zona do Mercado' }
      ],
      registrationReasons: [
        { id: 1, date: '10/10/2024', reason: 'Detenção em flagrante delito', refNo: 'OC-2024-1042', unit: 'ESF Praia', comando: 'Comando Regional Santiago Sul', measures: 'Prisão Preventiva', type: 'Criminal', auto_type: 'Auto de Detenção', natureza: 'Crime contra as Pessoas', enquadramento: 'Ofensa à Integridade Física — Art. 131º CP', tipologia: 'Detenção em Flagrante Delito', status: 'Ativo',
          rehabilitationDetails: {
            reason: 'O indivíduo cumpriu a pena e demonstrou bom comportamento nos últimos 5 anos, sem novos registros criminais.',
            attachments: [
              { name: 'certidao_judicial.pdf', size: 1024 * 450 },
              { name: 'comprovativo_residencia.pdf', size: 1024 * 120 }
            ],
            requestedAt: '29/04/2025',
            requestedBy: 'Bruno Fonseca'
          }
        },
        { id: 2, date: '10/10/2024', reason: 'Detenção em flagrante delito', refNo: 'OC-2024-1078', unit: 'ESF Mindelo', comando: 'Comando Regional Barlavento', measures: 'Termo de Identidade e Residência', type: 'Policial', auto_type: 'Auto de Ocorrência', natureza: 'Crime contra a Ordem Pública', enquadramento: 'Desordem Pública — Art. 279º CP', tipologia: 'Arguido', status: 'Ativo' },
        { id: 3, date: '15/03/2023', reason: 'Suspeito de furto qualificado', refNo: 'OC-2023-0821', unit: 'DP Praia', comando: 'Comando Regional Santiago Sul', measures: 'Liberdade Provisória', type: 'Criminal', auto_type: 'Auto de Notícia', natureza: 'Crime contra o Património', enquadramento: 'Furto Qualificado — Art. 197º CP', tipologia: 'Suspeito de Crime', status: 'Ativo',
          rejectedRehabilitation: {
            reason: 'O período mínimo de 3 anos após a condenação ainda não foi cumprido. A reabilitação só poderá ser solicitada novamente após 15/03/2026.',
            rejectedAt: '02/01/2025',
            rejectedBy: 'Carlos Mendes'
          }
        },
        { id: 4, date: '20/06/2021', reason: 'Desordem pública e resistência à autoridade', refNo: 'OC-2021-0345', unit: 'ESF Praia', comando: 'Comando Regional Santiago Sul', measures: 'Multa', type: 'Policial', auto_type: 'Auto de Ocorrência', natureza: 'Crime contra a Ordem Pública', enquadramento: 'Resistência à Autoridade — Art. 283º CP', tipologia: 'Arguido', status: 'Reabilitado',
          rehabilitationDetails: {
            reason: 'O indivíduo cumpriu integralmente as obrigações impostas, pagou a multa e não registou novos incidentes nos últimos 4 anos. A reabilitação é amplamente justificada.',
            attachments: [
              { name: 'comprovativo_multa_paga.pdf', size: 1024 * 85 },
              { name: 'declaracao_bom_comportamento.pdf', size: 1024 * 210 }
            ],
            requestedAt: '10/07/2025',
            requestedBy: 'Mónica Tavares',
            acceptedAt: '18/07/2025',
            acceptedBy: 'Carlos Mendes'
          }
        }
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
      ],
      attachments: [
        { id: 1, name: 'auto_detencao_2024.pdf', type: 'PDF', size: 524288, uploadedBy: 'Paulo', uploadedAt: '10/10/2024', description: 'Auto de detenção em flagrante delito' },
        { id: 2, name: 'termo_identificacao.pdf', type: 'PDF', size: 204800, uploadedBy: 'Paulo', uploadedAt: '10/10/2024', description: 'Termo de identificação e apresentação' },
        { id: 3, name: 'foto_tatuagem_braco.jpg', type: 'Imagem', size: 1048576, uploadedBy: 'Maria', uploadedAt: '15/01/2025', description: 'Fotografia de tatuagem tribal no braço direito' },
        { id: 4, name: 'relatorio_ocorrencia_006.docx', type: 'Documento', size: 327680, uploadedBy: 'Maria', uploadedAt: '14/03/2024', description: 'Relatório de ocorrência nº 006' }
      ]
    },
  ]);
  const [showAssociateModal, setShowAssociateModal] = useState(false);
  const [hideNewCadastroInAssociate, setHideNewCadastroInAssociate] = useState(false);
  const [associateSearchFilters, setAssociateSearchFilters] = useState({
    number: '',
    name: '',
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
  const [showConfirmConcluir, setShowConfirmConcluir] = useState(false);
  const [pendingConcluirAction, setPendingConcluirAction] = useState<(() => void) | null>(null);
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
  const [savedDocuments, setSavedDocuments] = useState<any[]>([]);
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
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [newDocument, setNewDocument] = useState({ type: 'CNI', number: '', issueDate: '', expiryDate: '', issueLocation: '' });
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroup, setNewGroup] = useState({ sigla: '', nome: '', funcao: '' });
  const [showAddressDetailsModal, setShowAddressDetailsModal] = useState(false);
  const [selectedAddressDetails, setSelectedAddressDetails] = useState<any>(null);
  
  // Add Motivo in Ficha State
  const [showAddMotivoInFicha, setShowAddMotivoInFicha] = useState(false);
  const [newMotivoInFicha, setNewMotivoInFicha] = useState({ reason: '', type: 'Criminal', date: '', refNo: '', unit: '', measures: '', auto_type: '', natureza: '', enquadramento: '', tipologia: '' });
  const [editingMotivoId, setEditingMotivoId] = useState<number | null>(null);
  const [editingMotivoData, setEditingMotivoData] = useState({ type: 'Criminal', sijNo: '', unit: '', measures: '' });
  const [showEditBiographic, setShowEditBiographic] = useState(false);
  const [editBiographicData, setEditBiographicData] = useState<any>({});

  // Parametrizações
  const [activeParamTab, setActiveParamTab] = useState<'domains' | 'groups'>('domains');
  const [selectedDomain, setSelectedDomain] = useState('Medidas Aplicadas');
  const [showAddParam, setShowAddParam] = useState(false);
  const [newParamData, setNewParamData] = useState({ valor: '', descricao: '' });
  const [editingParamId, setEditingParamId] = useState<number | null>(null);
  const [editingParamData, setEditingParamData] = useState({ valor: '', descricao: '', padrao: false });
  const [paramGroups, setParamGroups] = useState<any[]>([
    { id: 1, sigla: 'SG', nome: 'Sem Grupo',      areaAtuacao: '---',                          ilha: '',          cidade: '',        freguesia: '',                  localidade: '',                 referencia: '',               estado: 'Ativo' },
    { id: 2, sigla: 'TL', nome: 'Thug Life',       areaAtuacao: 'Tráfico de estupefacientes',   ilha: 'Santiago',  cidade: 'Praia',   freguesia: 'Achada Sto António', localidade: 'Achada Sto António',referencia: 'Zona do Mercado',  estado: 'Ativo' },
    { id: 3, sigla: 'BP', nome: 'Black Power',      areaAtuacao: 'Crimes contra o património',   ilha: 'Santiago',  cidade: 'Praia',   freguesia: 'Tira Chapéu',       localidade: 'Tira Chapéu',      referencia: '',               estado: 'Ativo' },
    { id: 4, sigla: 'OI', nome: 'Os Invictos',      areaAtuacao: 'Tráfico de estupefacientes',   ilha: 'Santiago',  cidade: 'Praia',   freguesia: 'Fazenda',           localidade: 'Fazenda',          referencia: '',               estado: 'Ativo' },
    { id: 5, sigla: 'SK', nome: 'Street Kings',     areaAtuacao: 'Confrontos e desordem pública',ilha: 'São Vicente',cidade: 'Mindelo', freguesia: 'Nª Srª da Luz',    localidade: 'Monte Sossego',    referencia: '',               estado: 'Ativo' },
  ]);
  const [showAddParamGroup, setShowAddParamGroup] = useState(false);
  const [newParamGroup, setNewParamGroup] = useState({ sigla: '', nome: '', areaAtuacao: '', ilha: '', cidade: '', freguesia: '', localidade: '', referencia: '' });
  const [editingParamGroupId, setEditingParamGroupId] = useState<number | null>(null);
  const [editingParamGroupData, setEditingParamGroupData] = useState({ sigla: '', nome: '', areaAtuacao: '', ilha: '', cidade: '', freguesia: '', localidade: '', referencia: '' });
  const [paramDomains, setParamDomains] = useState<Record<string, any[]>>({
    'Medidas Aplicadas': [
      { id: 1, valor: 'PP',  descricao: 'Prisão Preventiva',                    estado: 'Ativo' },
      { id: 2, valor: 'TIR', descricao: 'Termo de Identidade e Residência',     estado: 'Ativo' },
      { id: 3, valor: 'LP',  descricao: 'Liberdade Provisória',                 estado: 'Ativo' },
      { id: 4, valor: 'OAP', descricao: 'Obrigação de Apresentação Periódica',  estado: 'Ativo' },
      { id: 5, valor: 'PC',  descricao: 'Proibição de Contacto',                estado: 'Ativo' },
      { id: 6, valor: 'SP',  descricao: 'Suspensão de Pena',                    estado: 'Ativo' },
      { id: 7, valor: 'ML',  descricao: 'Multa',                                estado: 'Ativo' },
      { id: 8, valor: 'SMA', descricao: 'Sem Medidas Aplicadas',                estado: 'Ativo', padrao: true },
    ],
    'Tipo de Endereço': [
      { id: 1, valor: 'RES', descricao: 'Residência',  estado: 'Ativo' },
      { id: 2, valor: 'TRB', descricao: 'Trabalho',    estado: 'Ativo' },
      { id: 3, valor: 'OUT', descricao: 'Outro',        estado: 'Ativo' },
    ],
    'Finalidade de Certificado': [
      { id: 1, valor: 'CP', descricao: 'Concurso Público',    estado: 'Ativo' },
      { id: 2, valor: 'EP', descricao: 'Emprego Privado',     estado: 'Ativo' },
      { id: 3, valor: 'VE', descricao: 'Visto / Emigração',   estado: 'Ativo' },
      { id: 4, valor: 'PJ', descricao: 'Processo Judicial',   estado: 'Ativo' },
      { id: 5, valor: 'UP', descricao: 'Uso Pessoal',         estado: 'Ativo' },
      { id: 6, valor: 'LA', descricao: 'Licença / Alvará',    estado: 'Ativo' },
    ],
    'Tipo de Fotografia': [
      { id: 1,  valor: 'FRT', descricao: 'Frontal',               estado: 'Ativo' },
      { id: 2,  valor: 'PFE', descricao: 'Perfil Esquerdo',        estado: 'Ativo' },
      { id: 3,  valor: 'PFD', descricao: 'Perfil Direito',         estado: 'Ativo' },
      { id: 4,  valor: 'TAT', descricao: 'Tatuagem',                estado: 'Ativo' },
      { id: 5,  valor: 'PIE', descricao: 'Piercings',                estado: 'Ativo' },
      { id: 6,  valor: 'MDN', descricao: 'Marcas de Nascença',       estado: 'Ativo' },
      { id: 7,  valor: 'DPD', descricao: 'Dedo Polegar Direito',     estado: 'Ativo' },
      { id: 8,  valor: 'DID', descricao: 'Dedo Indicador Direito',   estado: 'Ativo' },
      { id: 9,  valor: 'DMD', descricao: 'Dedo Médio Direito',       estado: 'Ativo' },
      { id: 10, valor: 'DAD', descricao: 'Dedo Anelar Direito',      estado: 'Ativo' },
      { id: 11, valor: 'DND', descricao: 'Dedo Mindinho Direito',    estado: 'Ativo' },
      { id: 12, valor: 'DPE', descricao: 'Dedo Polegar Esquerdo',    estado: 'Ativo' },
      { id: 13, valor: 'DIE', descricao: 'Dedo Indicador Esquerdo',  estado: 'Ativo' },
      { id: 14, valor: 'DME', descricao: 'Dedo Médio Esquerdo',      estado: 'Ativo' },
      { id: 15, valor: 'DAE', descricao: 'Dedo Anelar Esquerdo',     estado: 'Ativo' },
      { id: 16, valor: 'DNE', descricao: 'Dedo Mindinho Esquerdo',   estado: 'Ativo' },
    ],
    'Motivo Cadastro Documento': [
      { id: 1, valor: 'VP',  descricao: 'Encontrado na Via Pública',            estado: 'Ativo' },
      { id: 2, valor: 'TER', descricao: 'Entregue por Terceiro',                estado: 'Ativo' },
      { id: 3, valor: 'OPE', descricao: 'Recolhido em Operação Policial',       estado: 'Ativo' },
      { id: 4, valor: 'INP', descricao: 'Extraviado em Instituição Pública',    estado: 'Ativo' },
      { id: 5, valor: 'OUT', descricao: 'Outro',                                estado: 'Ativo' },
    ],
  });


  // Rehabilitation Modal State
  const [showRehabilitationModal, setShowRehabilitationModal] = useState(false);
  const [showRehabilitationDetailsModal, setShowRehabilitationDetailsModal] = useState(false);
  const [selectedReasonForRehab, setSelectedReasonForRehab] = useState<any>(null);
  const [showPhotoHistoryDetailsModal, setShowPhotoHistoryDetailsModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showExportSelectModal, setShowExportSelectModal] = useState(false);
  const [exportOptions, setExportOptions] = useState<{
    photo: boolean;
    sinalComplementar: boolean;
    outrasInfo: boolean;
    motivoIds: number[];
  }>({ photo: true, sinalComplementar: true, outrasInfo: false, motivoIds: [] });
  const [selectedPhotoGroup, setSelectedPhotoGroup] = useState<any>(null);
  const [rehabilitationReason, setRehabilitationReason] = useState('');
  const [rehabilitationAttachments, setRehabilitationAttachments] = useState<File[]>([]);
  const [showApproveConfirmModal, setShowApproveConfirmModal] = useState(false);
  const [showRejectConfirmModal, setShowRejectConfirmModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rehabDetailsViewOnly, setRehabDetailsViewOnly] = useState(false);
  const [showRejectionReasonModal, setShowRejectionReasonModal] = useState(false);
  const [selectedRejectionDetails, setSelectedRejectionDetails] = useState<any>(null);
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
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const emptyDocData = () => ({
    document: {
      reason: '', type: '', number: '', issueDate: '', expiryDate: '', fullName: '',
      birthDate: '', nationality: '', birthPlace: '', fatherName: '', motherName: '',
      nif: '', phone: '', photo: null as string | null, attachments: [] as File[]
    },
    finder: {
      type: 'Civil', name: '', idType: '', idNumber: '', contact: '', foundDate: '',
      location: { island: '', county: '', parish: '', locality: '', zone: '', reference: '' }
    },
    storage: { island: '', county: '', organicUnit: '', observations: '' }
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

  const [certificateExtravioStep, setCertificateExtravioStep] = useState(1);
  const [certificateExtravioSearchFilters, setCertificateExtravioSearchFilters] = useState({
    orderNumber: '',
    name: '',
    birthDate: '',
    requestDate: ''
  });
  const [certificateExtravioData, setCertificateExtravioData] = useState({
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
    island: '',
    county: '',
    parish: '',
    locality: '',
    reference: '',
    phone: '',
    email: '',
    photo: null as string | null,
    lostDocType: '',
    lostDocNumber: '',
    lostDocIssueDate: '',
    lostDocExpiryDate: ''
  });
  const [ducExtravioGenerated, setDucExtravioGenerated] = useState(false);
  const [mockCertificatesExtravio, setMockCertificatesExtravio] = useState<any[]>([
    {
      id: '000004',
      name: 'Manuel Sousa',
      birthDate: '29/04/1998',
      requestDate: '19/02/2023',
      status: 'Concluído'
    }
  ]);

  // Biographical Search States
  const [bioSearchDocType, setBioSearchDocType] = useState('CNI');
  const [bioSearchName, setBioSearchName] = useState('');
  const [bioSearchDocNumber, setBioSearchDocNumber] = useState('');
  const [bioSearchResults, setBioSearchResults] = useState<any[]>([]);
  const [showBioSearchModal, setShowBioSearchModal] = useState(false);
  const [bioSearchTarget, setBioSearchTarget] = useState<'certificate' | 'certificate_extravio' | 'document' | 'ficha' | null>(null);

  // Lost Document Search States (Certificado de Extravio)
  const [lostDocSearchType, setLostDocSearchType] = useState('CNI');
  const [lostDocSearchNumber, setLostDocSearchNumber] = useState('');
  const [lostDocSearchName, setLostDocSearchName] = useState('');
  const [lostDocSearchResults, setLostDocSearchResults] = useState<any[]>([]);
  const [showLostDocSearchModal, setShowLostDocSearchModal] = useState(false);

  const emptyNewFicha = () => ({
    name: '', birthDate: '', gender: '', civilStatus: '', birthPlace: '',
    nationality: '', fatherName: '', motherName: '', nif: '', profession: '',
    docType: 'CNI', docNumber: '', docIssueDate: '', docExpiryDate: '', docIssueLocation: '',
    photo: null as string | null,
  });
  const [newFichaData, setNewFichaData] = useState(emptyNewFicha());
  const [newFichaExpanded, setNewFichaExpanded] = useState<Record<string,boolean>>({
    biographic: true, complementary: false, outras: false, motivo: false, biometric: false, observations: false, attachments: false
  });
  const toggleNewFicha = (k: string) => setNewFichaExpanded(p => ({...p, [k]: !p[k]}));
  const [newFichaChars, setNewFichaChars] = useState<{name:string;value:string;observation:string}[]>([]);
  const [newFichaNewChar, setNewFichaNewChar] = useState({ name: '', value: '', observation: '' });
  const [newFichaAddresses, setNewFichaAddresses] = useState<any[]>([]);
  const [newFichaNewAddress, setNewFichaNewAddress] = useState({ type: 'Residência', island: '', county: '', parish: '', locality: '', zone: '', reference: '' });
  const [newFichaContacts, setNewFichaContacts] = useState<any[]>([]);
  const [newFichaNewContact, setNewFichaNewContact] = useState({ type: 'Telemovel', info: '' });
  const [newFichaNicknames, setNewFichaNicknames] = useState<string[]>([]);
  const [newFichaNewNickname, setNewFichaNewNickname] = useState('');
  const [newFichaReasons, setNewFichaReasons] = useState<any[]>([]);
  const [newFichaNewReason, setNewFichaNewReason] = useState({ type: 'Criminal', date: '', refNo: '', unit: '', sijNo: '', measures: '', auto_type: '', natureza: '', enquadramento: '', tipologia: '' });
  const [newFichaObservations, setNewFichaObservations] = useState<{content:string;author:string;date:string}[]>([]);
  const [newFichaNewObs, setNewFichaNewObs] = useState('');
  const [newFichaAttachments, setNewFichaAttachments] = useState<{name:string;type:string}[]>([]);
  const [newFichaNewAttach, setNewFichaNewAttach] = useState({ name: '', type: 'Documento' });

  const handleBioSearch = () => {
    // Exige pelo menos um campo de pesquisa preenchido (N.º Documento ou Nome)
    if (!bioSearchName.trim() && !bioSearchDocNumber.trim()) return;
    const results = fichas.filter(f => {
      const matchName = bioSearchName ? f.name?.toLowerCase().includes(bioSearchName.toLowerCase()) : true;
      const matchDoc = bioSearchDocNumber ? (f.docNumber?.toLowerCase().includes(bioSearchDocNumber.toLowerCase()) || f.number?.toLowerCase().includes(bioSearchDocNumber.toLowerCase())) : true;
      return matchName && matchDoc;
    });
    setBioSearchResults(results);
    setShowBioSearchModal(true);
  };

  const handleLostDocSearch = () => {
    if (!lostDocSearchName.trim() && !lostDocSearchNumber.trim()) return;
    const results = fichas.filter(f => {
      const matchName = lostDocSearchName ? f.name?.toLowerCase().includes(lostDocSearchName.toLowerCase()) : true;
      const matchDoc = lostDocSearchNumber ? (f.docNumber?.toLowerCase().includes(lostDocSearchNumber.toLowerCase()) || f.number?.toLowerCase().includes(lostDocSearchNumber.toLowerCase())) : true;
      return matchName && matchDoc;
    });
    setLostDocSearchResults(results);
    setShowLostDocSearchModal(true);
  };

  const selectLostDocFromSearch = (ficha: any) => {
    setCertificateExtravioData({
      ...certificateExtravioData,
      lostDocType: ficha.docType || lostDocSearchType,
      lostDocNumber: ficha.docNumber || ficha.number || '',
      lostDocIssueDate: ficha.docIssueDate || '',
      lostDocExpiryDate: ficha.docExpiryDate || ''
    });
    setShowLostDocSearchModal(false);
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
    } else if (bioSearchTarget === 'certificate_extravio') {
      setCertificateExtravioData({
        ...certificateExtravioData,
        fullName: person.name || '',
        birthDate: person.birthDate || '',
        docType: bioSearchDocType,
        docNumber: person.docNumber || person.number || '',
        gender: person.gender || 'Masculino',
        civilStatus: person.civilStatus || 'Solteiro(a)',
        birthPlace: person.birthPlace || '',
        nationality: person.nationality || 'Cabo-verdiana',
        fatherName: person.fatherName || '',
        motherName: person.motherName || '',
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
          phone: person.contacts?.find((c: any) => c.type === 'Telemovel')?.info || '',
          photo: person.photo || null,
          type: bioSearchDocType || docData.document.type,
          number: person.docNumber || '',
          issueDate: person.docIssueDate || docData.document.issueDate,
          expiryDate: person.docExpiryDate || docData.document.expiryDate,
        }
      });
    } else if (bioSearchTarget === 'ficha') {
      setNewFichaData({
        name: person.name || '',
        birthDate: person.birthDate || '',
        gender: person.gender || '',
        civilStatus: person.civilStatus || '',
        birthPlace: person.birthPlace || '',
        nationality: person.nationality || 'Cabo-verdiana',
        fatherName: person.fatherName || '',
        motherName: person.motherName || '',
        nif: person.nif || '',
        profession: person.profession || '',
        docType: person.docType || bioSearchDocType,
        docNumber: person.docNumber || person.number || '',
        docIssueDate: person.docIssueDate || '',
        docExpiryDate: person.docExpiryDate || '',
        docIssueLocation: person.docIssueLocation || '',
        photo: person.photo || null,
      });
      if (person.addresses?.length > 0) {
        setNewFichaAddresses(person.addresses.map((a: any) => ({ ...a })));
      }
      if (person.contacts?.length > 0) {
        setNewFichaContacts(person.contacts.map((c: any) => ({ ...c })));
      }
    }
    setShowBioSearchModal(false);
    setBioSearchName('');
    setBioSearchDocNumber('');
  };
  const [mockAnalysisCertificates, setMockAnalysisCertificates] = useState<any[]>([
    {
      id: '000004',
      name: 'Bruno Fonseca',
      birthDate: '29/04/1998',
      requestDate: '19/02/2025',
      status: 'Por analisar',
      biographic: {
        fullName: 'Bruno Fonseca',
        birthDate: '1998-04-29',
        gender: 'Masculino',
        civilStatus: 'Solteiro',
        birthPlace: 'Praia',
        nationality: 'Cabo-verdiana',
        fatherName: 'António Fonseca',
        motherName: 'Maria Fonseca',
        nif: '200123456',
        docType: 'BI',
        docNumber: '001234567LA041'
      },
      address: {
        island: 'Santiago',
        council: 'Praia',
        parish: 'N.S Da Graça',
        locality: 'Palmarejo',
        reference: 'Perto do Mercado'
      },
      contact: {
        mobile: '9843347',
        email: 'joai@gmail.com'
      },
      reason: 'Emprego Público',
      attachments: [
        { name: 'Documento de Identificação.pdf', type: 'pdf' },
        { name: 'Representante Legal.pdf', type: 'pdf' },
        { name: 'Duc', type: 'pdf' }
      ],
      observations: [
        { user: 'Mascarenhas', date: '20/03/2025', text: 'Pedido de certificado para concurso público. Documentação em ordem.' }
      ],
      history: [
        { date: '19/02/2025', phase: 'Analise', status: 'Por analisar', user: 'Maria' }
      ]
    },
    {
      id: '000005',
      name: 'Manuel Sousa',
      birthDate: '27/06/1997',
      requestDate: '19/02/2025',
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
      reason: 'Matrícula Universidade',
      attachments: [
        { name: 'Documento de Identificação.pdf', type: 'pdf' },
        { name: 'Duc', type: 'pdf' }
      ],
      observations: [
        { user: 'Mascarenhas', date: '20/03/2025', text: 'Pedido para fins académicos.' }
      ],
      history: [
        { date: '19/02/2025', phase: 'Analise', status: 'Por analisar', user: 'Maria' }
      ]
    }
  ]);
  const [mockDecisionCertificates, setMockDecisionCertificates] = useState<any[]>([]);
  const [mockConcludedCertificates, setMockConcludedCertificates] = useState<any[]>([]);
  const [selectedAnalysisCertificate, setSelectedAnalysisCertificate] = useState<any>(null);
  const [selectedDecisionCertificate, setSelectedDecisionCertificate] = useState<any>(null);
  const [selectedHistoryCertificate, setSelectedHistoryCertificate] = useState<any>(null);
  const [mockAnalysisCertificatesExtravio, setMockAnalysisCertificatesExtravio] = useState<any[]>([
    {
      id: '000004',
      name: 'Manuel Sousa',
      birthDate: '29/04/1998',
      requestDate: '19/02/2025',
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
        council: 'Santiago',
        parish: 'N.S Da Graça',
        locality: 'Palmarejo',
        reference: 'Perto Paulino'
      },
      contact: {
        mobile: '9876545',
        email: 'manuel@gmail.com'
      },
      documentosExtraviados: {
        docType: 'CNI',
        docNumber: '19980712M0018',
        docIssueDate: '2018-07-12',
        docExpiryDate: '2028-07-12'
      },
      attachments: [
        { name: 'Declaração de Extravio.pdf', type: 'pdf' }
      ],
      observations: [
        { user: 'Mascarenhas', date: '20/03/2025', text: 'Pedido de certificado de extravio de CNI.' }
      ],
      history: [
        { date: '19/02/2025', phase: 'Analise', status: 'Por analisar', user: 'Maria' }
      ]
    }
  ]);
  const [mockDecisionCertificatesExtravio, setMockDecisionCertificatesExtravio] = useState<any[]>([]);
  const [mockConcludedCertificatesExtravio, setMockConcludedCertificatesExtravio] = useState<any[]>([]);
  const [selectedAnalysisCertificateExtravio, setSelectedAnalysisCertificateExtravio] = useState<any>(null);
  const [selectedDecisionCertificateExtravio, setSelectedDecisionCertificateExtravio] = useState<any>(null);
  const [selectedHistoryCertificateExtravio, setSelectedHistoryCertificateExtravio] = useState<any>(null);
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
  const [docSearchResults, setDocSearchResults] = useState<any[] | null>(null);
  const [fichaSearchFilters, setFichaSearchFilters] = useState({
    number: '',
    name: '',
    birthDate: '',
    comando: '',
    unit: '',
    auto_type: '',
    natureza: '',
    enquadramento: '',
    tipologia: '',
    tipo: '',
    doc_number: '',
    island: '',
    municipality: '',
    parish: '',
    locality: '',
    zone: ''
  });
  const [fichaSearchResults, setFichaSearchResults] = useState<any[] | null>(null);
  const [showFichaAdvancedFilters, setShowFichaAdvancedFilters] = useState(false);
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
        nationality: 'Cabo-verdiana',
        birthPlace: 'Praia',
        fatherName: 'António Fonseca',
        motherName: 'Maria Fonseca',
        nif: '200123456',
        phone: '9912345',
        photo: getPortraitUrl('bruno_fonseca', 'men')
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
      attachments: [
        { name: 'foto_frente_bi.jpg', type: 'Imagem' },
        { name: 'auto_ocorrencia.pdf', type: 'PDF' }
      ],
      estado: 'Por Levantar',
      registeredBy: 'Carlos Mendes',
      registeredAt: '2024-03-01'
    },
    {
      id: '002',
      document: {
        reason: 'Roubo',
        type: 'Passaporte',
        number: 'CV0098234',
        issueDate: '2019-06-15',
        expiryDate: '2029-06-15',
        fullName: 'Maria Santos',
        birthDate: '1985-11-20',
        nationality: 'Cabo-verdiana',
        birthPlace: 'Mindelo',
        fatherName: 'Carlos Santos',
        motherName: 'Ana Santos',
        nif: '200765432',
        phone: '9823456'
      },
      finder: {
        type: 'Policial',
        name: '',
        idType: '',
        idNumber: '',
        contact: '',
        foundDate: '2024-07-10',
        location: { island: 'São Vicente', county: 'São Vicente', parish: 'Nossa Senhora da Luz', locality: 'Centro', zone: '', reference: '' }
      },
      storage: {
        island: 'São Vicente',
        county: 'São Vicente',
        organicUnit: 'Esquadra Platô',
        observations: 'Passaporte com sinais de uso intenso.'
      },
      attachments: [],
      estado: 'Levantado',
      registeredBy: 'Paulo Lopes',
      registeredAt: '2024-07-10'
    },
    {
      id: '003',
      document: {
        reason: 'Encontrado',
        type: 'CNI',
        number: 'CNI2023001122',
        issueDate: '2023-02-01',
        expiryDate: '2033-02-01',
        fullName: 'Pedro Lopes',
        birthDate: '2000-03-05',
        nationality: 'Cabo-verdiana',
        birthPlace: 'Praia',
        fatherName: 'Manuel Lopes',
        motherName: 'Rosa Lopes',
        nif: '200543210',
        phone: '9756789'
      },
      finder: {
        type: 'Civil',
        name: 'Ana Tavares',
        idType: 'CNI',
        idNumber: 'CNI2020005678',
        contact: '9611234',
        foundDate: '2025-01-22',
        location: { island: 'Santiago', county: 'Praia', parish: 'Nossa Senhora da Graça', locality: 'Achada Santo António', zone: 'Zona 2', reference: 'Paragem de autocarro' }
      },
      storage: {
        island: 'Santiago',
        county: 'Praia',
        organicUnit: 'Esquadra Achada Santo António',
        observations: ''
      },
      attachments: [
        { name: 'cni_frente.jpg', type: 'Imagem' }
      ],
      estado: 'Por Levantar',
      registeredBy: 'Maria Santos',
      registeredAt: '2025-01-22'
    }
  ]);
  const [showLevantamentoModal, setShowLevantamentoModal] = useState(false);
  const [levantamentoIsOwner, setLevantamentoIsOwner] = useState<boolean | null>(null);
  const [levantamentoOtherPerson, setLevantamentoOtherPerson] = useState({ fullName: '', birthDate: '', docNumber: '', docType: 'CNI' });
  
  const [showOtherInfoHistory, setShowOtherInfoHistory] = useState({
    address: false,
    contact: false,
    nickname: false,
    document: false,
    group: false
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
              status: 'Ativo',
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
    setShowRehabilitationDetailsModal(false);
    setRehabDetailsViewOnly(false);
    setSuccessMessage('Reabilitação aceite com sucesso.');
    setShowSuccessModal(true);
    setPendingRehabAction(null);
  };

  const handleRejectRehabilitation = () => {
    if (!pendingRehabAction || !rejectReason.trim()) return;
    const { ficha, reg } = pendingRehabAction;

    const updatedFichas = fichas.map(f => {
      if (f.id === ficha.id) {
        const updatedReasons = f.registrationReasons.map((r: any) => {
          if (r.id === reg.id) {
            return { ...r, status: 'Recusado', rejectionReason: rejectReason.trim() };
          }
          return r;
        });
        return { ...f, registrationReasons: updatedReasons };
      }
      return f;
    });

    setFichas(updatedFichas);
    setShowRejectConfirmModal(false);
    setShowRehabilitationDetailsModal(false);
    setRehabDetailsViewOnly(false);
    setRejectReason('');
    setSuccessMessage('Reabilitação recusada.');
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
    associatedMotivo: true,
    analysisBiographic: true,
    analysisAnexos: true,
    analysisObservations: true,
    analysisHistory: true,
    extravioBiographic: true,
    extravioDocuments: true,
    extravioCertificateModel: true,
    extravioAnexos: true,
    extravioObservations: true,
    extravioHistory: true,
  });
  const [certAnalysisHasSearched, setCertAnalysisHasSearched] = useState(false);
  const [returnReasonExtravio, setReturnReasonExtravio] = useState('');
  const [showReturnModalExtravio, setShowReturnModalExtravio] = useState(false);

  const legacyCharacteristicTypes: Record<string, string[]> = {
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
      
      // Auto-match ficha — por número de documento ou nome completo
      const match = fichas.find(f =>
        (data.doc_number && f.docNumber && data.doc_number === f.docNumber) ||
        (data.full_name && f.name && data.full_name.toLowerCase().trim() === f.name.toLowerCase().trim())
      );
      
      if (match) {
        setSuggestedFicha(match);
      }

      setCurrentView('person_detail');
    } catch (err) {
      console.error('Error fetching person detail:', err);
    }
  };
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    // Normal
    occurrence_number: '',
    registration_number: '',
    unit: '',
    comando: '',
    estado: '',
    name: '',
    birth_date: '',
    alcunha: '',
    sexo: '',
    // Avançados
    date_from: '',
    date_to: '',
    nationality: '',
    doc_number: '',
    nif: '',
    island: '',
    municipality: '',
    parish: '',
    locality: '',
    zone: '',
    auto_type: '',
    natureza: '',
    enquadramento: '',
    tipologia: '',
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

  const handleAddOtherInfo = (type: 'address' | 'contact' | 'nickname' | 'document' | 'group') => {
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
      } else if (type === 'document') {
        newItem = { ...newItem, ...newDocument };
        updatedFicha.documents = [...(updatedFicha.documents || []), newItem];
        setShowAddDocument(false);
        setNewDocument({ type: 'CNI', number: '', issueDate: '', expiryDate: '', issueLocation: '' });
      } else if (type === 'group') {
        newItem = { ...newItem, ...newGroup };
        updatedFicha.groups = [...(updatedFicha.groups || []), newItem];
        setShowAddGroup(false);
        setNewGroup({ sigla: '', nome: '', funcao: '' });
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
      } else if (type === 'document') {
        newItem = { ...newItem, ...newDocument };
        setSavedDocuments([...savedDocuments, newItem]);
        setShowAddDocument(false);
        setNewDocument({ type: 'CNI', number: '', issueDate: '', expiryDate: '', issueLocation: '' });
      }
    }
  };

  const handleDeactivateOtherInfo = (type: 'address' | 'contact' | 'nickname' | 'document' | 'group', id: number) => {
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
      } else if (type === 'document') {
        updatedFicha.documents = updatedFicha.documents.map((item: any) =>
          item.id === id ? { ...item, validTo: today, deactivatedBy: deactivator } : item
        );
      } else if (type === 'group') {
        updatedFicha.groups = (updatedFicha.groups || []).map((item: any) =>
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
      } else if (type === 'document') {
        setSavedDocuments(savedDocuments.map((item: any) =>
          item.id === id ? { ...item, validTo: today, deactivatedBy: deactivator } : item
        ));
      }
    }
  };

  const handleClearFilters = () => {
    setSearchFilters({
      occurrence_number: '', registration_number: '', unit: '', comando: '', estado: '',
      name: '', birth_date: '', sexo: '',
      date_from: '', date_to: '', nationality: '', doc_number: '',
      island: '', municipality: '', parish: '', locality: '', zone: '',
      auto_type: '', natureza: '', enquadramento: '', tipologia: '',
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
        status: 'Por Associar'
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
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <div className="p-2.5 bg-slate-900 rounded-xl text-white shadow-lg shadow-slate-200">
              <ShieldCheck size={24} />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">SIC Policial</h2>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">Sistema Integrado de Cadastro</p>
            </div>
          </button>
          
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
                      title="Pré Cadastro"
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
                      title="Gestão de Documentos"
                      icon={FileText}
                      description="Gestão de documentos oficiais e ofícios do sistema."
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
                      onClick={() => setCurrentView('certificate_history')}
                    />
                    <MenuCard
                      title="Certificado de Extravio"
                      icon={FileWarning}
                      description="Emissão de certificados para documentos extraviados."
                      onClick={() => setCurrentView('certificate_list_extravio')}
                    />
                    <MenuCard
                      title="Analise"
                      icon={Search}
                      description="Análise de comunicações de extravio."
                      onClick={() => setCurrentView('certificate_analysis_extravio')}
                    />
                    <MenuCard
                      title="Decisão"
                      icon={Shield}
                      description="Decisão sobre comunicações de extravio."
                      onClick={() => setCurrentView('certificate_decision_extravio')}
                    />
                    <MenuCard
                      title="Historico Comunicações de Extravio"
                      icon={History}
                      description="Histórico de comunicações de itens extraviados."
                      onClick={() => setCurrentView('certificate_history_extravio')}
                    />
                  </div>
                </div>

                {/* Gestão do Sistema Section */}
                <div className="space-y-6">
                  <SectionHeader title="Gestão do Sistema" icon={Settings} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <MenuCard
                      title="Parametrizações"
                      icon={Database}
                      description="Gerir os domínios e valores parametrizáveis do sistema."
                      onClick={() => setCurrentView('parametrizacoes')}
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
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Pré Cadastro</h2>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-3 px-8 pt-8 pb-6 border-b border-slate-100">
                    <div className="p-2 bg-slate-900 text-white rounded-lg"><Search size={16} /></div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex-1">Filtrar Pesquisa</h3>
                    <button
                      type="button"
                      onClick={() => setShowAdvancedFilters(v => !v)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all border-2 ${
                        showAdvancedFilters
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:text-slate-900'
                      }`}
                    >
                      <SlidersHorizontal size={13} />
                      {showAdvancedFilters ? 'Filtros Avançados' : 'Filtros Avançados'}
                    </button>
                  </div>

                  <form onSubmit={handleSearch} className="px-8 py-6 space-y-6">

                    {/* ── Dados do Processo ── */}
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-4 border-slate-900 pl-3 mb-4">Dados do Processo</p>
                      <div className={`grid grid-cols-1 gap-4 ${showAdvancedFilters ? 'md:grid-cols-3' : 'md:grid-cols-3'}`}>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nº Ocorrência</label>
                          <input type="text" value={searchFilters.occurrence_number} onChange={(e) => setSearchFilters({...searchFilters, occurrence_number: e.target.value})} placeholder="Ex: OC-2024-001" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nº Registo</label>
                          <input type="text" value={searchFilters.registration_number} onChange={(e) => setSearchFilters({...searchFilters, registration_number: e.target.value})} placeholder="Ex: PRE-1000/N/2026" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                        </div>
                        {showAdvancedFilters && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comando</label>
                            <select value={searchFilters.comando} onChange={(e) => setSearchFilters({...searchFilters, comando: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                              <option value="">Todos</option>
                              <option value="Comando Regional Santiago Sul">Comando Regional Santiago Sul</option>
                              <option value="Comando Regional Santiago Norte">Comando Regional Santiago Norte</option>
                              <option value="Comando Regional Barlavento">Comando Regional Barlavento</option>
                              <option value="Comando Regional Sotavento">Comando Regional Sotavento</option>
                            </select>
                          </div>
                        )}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade</label>
                          <select value={searchFilters.unit} onChange={(e) => setSearchFilters({...searchFilters, unit: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                            <option value="">Todas</option>
                            <option value="ESF Praia">ESF Praia</option>
                            <option value="ESF Mindelo">ESF Mindelo</option>
                            <option value="DP Praia">DP Praia</option>
                            <option value="DP Mindelo">DP Mindelo</option>
                          </select>
                        </div>
                        {!showAdvancedFilters && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Receção</label>
                            <input type="date" value={searchFilters.date_from} onChange={(e) => setSearchFilters({...searchFilters, date_from: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                          </div>
                        )}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</label>
                          <select value={searchFilters.estado} onChange={(e) => setSearchFilters({...searchFilters, estado: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                            <option value="">Todos</option>
                            <option value="Por Associar">Por Associar</option>
                            <option value="Concluído">Concluído</option>
                          </select>
                        </div>

                        {/* Avançado: intervalo de data + dados da ocorrência */}
                        <AnimatePresence>
                          {showAdvancedFilters && (
                            <motion.div key="proc-adv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Receção — De</label>
                                <input type="date" value={searchFilters.date_from} onChange={(e) => setSearchFilters({...searchFilters, date_from: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Receção — Até</label>
                                <input type="date" value={searchFilters.date_to} onChange={(e) => setSearchFilters({...searchFilters, date_to: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Auto</label>
                                <select value={searchFilters.auto_type} onChange={(e) => setSearchFilters({...searchFilters, auto_type: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todos</option>
                                  <option>Auto de Detenção</option>
                                  <option>Auto de Notícia</option>
                                  <option>Auto de Ocorrência</option>
                                  <option>Auto de Apreensão</option>
                                  <option>Auto de Busca e Apreensão</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Natureza de Ocorrência</label>
                                <select value={searchFilters.natureza} onChange={(e) => setSearchFilters({...searchFilters, natureza: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  <option>Crime contra as Pessoas</option>
                                  <option>Crime contra o Património</option>
                                  <option>Crime contra o Estado</option>
                                  <option>Crime contra a Ordem Pública</option>
                                  <option>Crime de Tráfico</option>
                                  <option>Contraordenação</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enquadramento</label>
                                <select value={searchFilters.enquadramento} onChange={(e) => setSearchFilters({...searchFilters, enquadramento: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todos</option>
                                  <option>Ofensa à Integridade Física — Art. 131º CP</option>
                                  <option>Ofensa à Integridade Física Grave — Art. 132º CP</option>
                                  <option>Furto — Art. 195º CP</option>
                                  <option>Furto Qualificado — Art. 197º CP</option>
                                  <option>Roubo — Art. 200º CP</option>
                                  <option>Homicídio — Art. 122º CP</option>
                                  <option>Tráfico de Estupefacientes — Art. 15º DL 11/2021</option>
                                  <option>Corrupção — Art. 303º CP</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipologia</label>
                                <select value={searchFilters.tipologia} onChange={(e) => setSearchFilters({...searchFilters, tipologia: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  <option>Detenção em Flagrante Delito</option>
                                  <option>Arguido</option>
                                  <option>Investigado</option>
                                  <option>Suspeito</option>
                                  <option>Testemunha</option>
                                </select>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* ── Dados da Pessoa ── */}
                    <div className="border-t border-slate-100 pt-5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-4 border-slate-900 pl-3 mb-4">Dados da Pessoa</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                          <input type="text" value={searchFilters.name} onChange={(e) => setSearchFilters({...searchFilters, name: e.target.value})} placeholder="Nome e apelido" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Nascimento</label>
                          <input type="date" value={searchFilters.birth_date} onChange={(e) => setSearchFilters({...searchFilters, birth_date: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                        </div>

                        {/* Avançado: documento + nacionalidade */}
                        <AnimatePresence>
                          {showAdvancedFilters && (
                            <motion.div key="pessoa-adv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nº Documento</label>
                                <input type="text" value={searchFilters.doc_number} onChange={(e) => setSearchFilters({...searchFilters, doc_number: e.target.value})} placeholder="CNI, Passaporte, ..." className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NIF</label>
                                <input type="text" value={searchFilters.nif} onChange={(e) => setSearchFilters({...searchFilters, nif: e.target.value})} placeholder="Nº de Identificação Fiscal" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nacionalidade</label>
                                <select value={searchFilters.nationality} onChange={(e) => setSearchFilters({...searchFilters, nationality: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  <option>Cabo-verdiana</option>
                                  <option>Portuguesa</option>
                                  <option>Senegalesa</option>
                                  <option>Guineense</option>
                                  <option>Nigeriana</option>
                                  <option>Outra</option>
                                </select>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* ── Residência (só avançado) ── */}
                    <AnimatePresence>
                      {showAdvancedFilters && (
                        <motion.div key="residencia" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="border-t border-slate-100 pt-5">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-4 border-slate-900 pl-3 mb-4">Residência</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ilha</label>
                                <select value={searchFilters.island} onChange={(e) => setSearchFilters({...searchFilters, island: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  {['Santiago','São Vicente','Santo Antão','Fogo','Sal','Boavista','São Nicolau','Brava','Maio','Santa Luzia'].map(i => <option key={i}>{i}</option>)}
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Concelho</label>
                                <select value={searchFilters.municipality} onChange={(e) => setSearchFilters({...searchFilters, municipality: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todos</option>
                                  {['Praia','Santa Catarina','Santa Cruz','São Domingos','São Lourenço dos Órgãos','São Miguel','São Salvador do Mundo','Tarrafal','Ribeira Grande de Santiago','Mindelo','Santa Catarina do Fogo','Sal Rei'].map(m => <option key={m}>{m}</option>)}
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Freguesia</label>
                                <select value={searchFilters.parish} onChange={(e) => setSearchFilters({...searchFilters, parish: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  {['N.S Da Graça','São João Baptista','São Nicolau Tolentino','Santiago Maior','Santa Catarina','São Lourenço dos Órgãos','São Miguel Arcanjo','São Salvador do Mundo','Santo Amaro Abade','Nossa Senhora do Rosário'].map(p => <option key={p}>{p}</option>)}
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Localidade</label>
                                <select value={searchFilters.locality} onChange={(e) => setSearchFilters({...searchFilters, locality: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  {['Cidade Da Praia','Palmarejo','Achada Santo António','Achada Grande Frente','Achada Grande Trás','Várzea','Terra Branca','Tira Chapéu','Calabaceira','Fazenda','Mindelo'].map(l => <option key={l}>{l}</option>)}
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zona</label>
                                <select value={searchFilters.zone} onChange={(e) => setSearchFilters({...searchFilters, zone: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  {['Txadinha','Monteagarro','Achadinha','Pensamento','Safende',"Ponta d'Água",'Eugénio Lima','Lém Cachorro','Cruz Vermelha','Bairro Craveiro Lopes'].map(z => <option key={z}>{z}</option>)}
                                </select>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
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
                          <th className="px-6 py-4">Nº Ocorrência</th>
                          <th className="px-6 py-4">Nº Registo</th>
                          <th className="px-6 py-4">Unidade</th>
                          <th className="px-6 py-4">Data Receção</th>
                          <th className="px-6 py-4">Nome Completo</th>
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
                              <td className="px-6 py-4 text-sm font-bold text-blue-600 group-hover:underline">{p.occurrence_number || '---'}</td>
                              <td className="px-6 py-4 text-sm font-bold text-slate-700">{p.process_number || '---'}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-600">{p.unit || '---'}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-600">{p.received_date ? new Date(p.received_date).toLocaleDateString('pt-BR') : '---'}</td>
                              <td className="px-6 py-4 text-sm font-bold text-slate-900">{p.full_name || '---'}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-600">{p.birth_date ? new Date(p.birth_date).toLocaleDateString('pt-BR') : '---'}</td>
                              <td className="px-6 py-4 text-sm font-medium text-slate-600">{p.island || '---'}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${p.status === 'Concluído' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                  {p.status || 'Por Associar'}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="px-6 py-12 text-center text-slate-400 italic font-medium">Nenhum registro encontrado na base de dados</td>
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
                                  src={getPortraitUrl(result.seed)}
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
                                    src={getPortraitUrl(selectedRecognitionResult.seed)}
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
                                          src={getPortraitUrl(`${selectedRecognitionResult.seed}_${photo.seed}`)}
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
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{editingDocId ? 'Editar Documento' : 'Cadastro Documentos'}</h2>
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
                          <div className="flex-1 space-y-8">

                            {/* Dados Pessoais */}
                            <div className="space-y-4">
                              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Dados Pessoais</p>
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="md:col-span-2">
                                  <DetailField label="Nome Completo" value={docData.document.fullName} readOnly={false}
                                    onChange={(val: string) => setDocData({...docData, document: {...docData.document, fullName: val}})} />
                                </div>
                                <DetailField label="Data Nascimento" value={docData.document.birthDate} type="date" readOnly={false} icon={Calendar}
                                  onChange={(val: string) => setDocData({...docData, document: {...docData.document, birthDate: val}})} />
                                <DetailField label="Nacionalidade" value={docData.document.nationality} type="select" readOnly={false}
                                  options={['Cabo-verdiana', 'Portuguesa', 'Angolana', 'Senegalesa', 'Guineense']}
                                  onChange={(val: string) => setDocData({...docData, document: {...docData.document, nationality: val}})} />
                                <DetailField label="Naturalidade" value={docData.document.birthPlace} readOnly={false}
                                  onChange={(val: string) => setDocData({...docData, document: {...docData.document, birthPlace: val}})} />
                                <DetailField label="Nome Pai" value={docData.document.fatherName} readOnly={false}
                                  onChange={(val: string) => setDocData({...docData, document: {...docData.document, fatherName: val}})} />
                                <DetailField label="Nome Mãe" value={docData.document.motherName} readOnly={false}
                                  onChange={(val: string) => setDocData({...docData, document: {...docData.document, motherName: val}})} />
                              </div>
                            </div>

                            {/* Documentos de Identificação */}
                            <div className="space-y-4">
                              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Documentos de Identificação</p>
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <DetailField label="Tipo Documento" value={docData.document.type} type="select" readOnly={false}
                                  options={['CNI', 'BI', 'Passaporte', 'TRE', 'Carta Condução']}
                                  onChange={(val: string) => setDocData({...docData, document: {...docData.document, type: val}})} />
                                <DetailField label="Numero Documento" value={docData.document.number} readOnly={false}
                                  onChange={(val: string) => setDocData({...docData, document: {...docData.document, number: val}})} />
                                <DetailField label="Data Emissão" value={docData.document.issueDate} type="date" readOnly={false} icon={Calendar}
                                  onChange={(val: string) => setDocData({...docData, document: {...docData.document, issueDate: val}})} />
                                <DetailField label="Data Validade" value={docData.document.expiryDate} type="date" readOnly={false} icon={Calendar}
                                  onChange={(val: string) => setDocData({...docData, document: {...docData.document, expiryDate: val}})} />
                              </div>
                            </div>

                            {/* Motivo */}
                            <div className="space-y-4">
                              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Motivo</p>
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="md:col-span-2">
                                  <DetailField label="Motivo" value={docData.document.reason} type="select" readOnly={false}
                                    options={['Perda', 'Roubo', 'Encontrado']}
                                    onChange={(val: string) => setDocData({...docData, document: {...docData.document, reason: val}})} />
                                </div>
                              </div>
                            </div>

                            {/* Anexos */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">
                                  Anexos {savedAttachments.length > 0 && <span className="ml-2 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded-full">{savedAttachments.length}</span>}
                                </p>
                                <button
                                  onClick={() => setShowAttachmentModal(true)}
                                  className="px-4 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors text-xs border-2 border-slate-900 shadow-sm flex items-center gap-2"
                                >
                                  <Plus size={14} /> Adicionar Anexo
                                </button>
                              </div>
                              {savedAttachments.length > 0 ? (
                                <div className="space-y-2">
                                  {savedAttachments.map((att, idx) => {
                                    const isImg = att.type === 'Imagem';
                                    return (
                                      <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-slate-200 transition-all">
                                        <div className={`p-3 rounded-xl flex-shrink-0 ${isImg ? 'bg-blue-100 text-blue-600' : att.type === 'Relatório' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>
                                          {isImg ? <ImageIcon size={20} /> : <FileText size={20} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-black text-slate-900 truncate">{att.title}</p>
                                          <p className="text-[10px] text-slate-400 mt-1"><span className="font-bold">{att.type}</span> · {att.date}</p>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Visualizar"><Eye size={16} /></button>
                                          <button onClick={() => setSavedAttachments(savedAttachments.filter((_, i) => i !== idx))} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Eliminar"><Trash2 size={16} /></button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-xl">
                                  <Paperclip size={28} className="mx-auto text-slate-200 mb-2" />
                                  <p className="text-slate-400 text-sm italic">Nenhum anexo associado</p>
                                </div>
                              )}
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
                      onClick={() => docStep > 1 ? setDocStep(docStep - 1) : (setEditingDocId(null), setCurrentView('document_search'))}
                    >
                      Voltar
                    </Button>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                        onClick={() => { setEditingDocId(null); setCurrentView('document_search'); }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="primary"
                        icon={docStep === 3 ? Check : ArrowRight}
                        onClick={() => {
                          if (docStep < 3) {
                            setDocStep(docStep + 1);
                          } else if (editingDocId) {
                            const updatedDoc = {
                              ...registeredDoc,
                              ...docData,
                              id: editingDocId,
                              attachments: registeredDoc?.attachments || [],
                              registeredBy: registeredDoc?.registeredBy || user?.name || 'Carlos Mendes',
                              registeredAt: registeredDoc?.registeredAt || new Date().toLocaleDateString('pt-BR')
                            };
                            setMockDocuments(prev => prev.map(d => d.id === editingDocId ? updatedDoc : d));
                            setRegisteredDoc(updatedDoc);
                            setDocSearchResults(prev => prev ? prev.map(d => d.id === editingDocId ? updatedDoc : d) : prev);
                            setEditingDocId(null);
                            setIsReadOnlyView(true);
                            setSuccessMessage('Dados do documento atualizados com sucesso');
                            setShowSuccessModal(true);
                            setCurrentView('document_detail');
                          } else {
                            setRegisteredDoc({
                              ...docData,
                              id: '002',
                              estado: 'Por Levantar',
                              registeredBy: user?.name || 'Carlos Mendes',
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
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Detalhes do Registo</h2>
                      {(() => {
                        const estado = registeredDoc.estado || (registeredDoc.levantamento ? 'Levantado' : 'Por Levantar');
                        return (
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            estado === 'Levantado' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {estado}
                          </span>
                        );
                      })()}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registo Individual N.º {registeredDoc.id}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2">
                    <History size={14} className="text-slate-400 shrink-0" />
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registado por</p>
                      <p className="text-xs font-black text-slate-900">{registeredDoc.registeredBy || 'Carlos Mendes'} <span className="font-medium text-slate-400">•</span> {registeredDoc.registeredAt || new Date().toLocaleDateString('pt-BR')}</p>
                    </div>
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
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        {registeredDoc.document.photo && (
                          <div className="w-28 h-36 rounded-2xl border-4 border-white shadow-xl overflow-hidden shrink-0 bg-slate-100">
                            <img src={registeredDoc.document.photo} alt="Pessoa" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                        )}
                        <div className="flex-1 space-y-8">
                          {/* Dados Pessoais */}
                          <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Dados Pessoais</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                              <div className="md:col-span-2"><DetailField label="Nome Completo" value={registeredDoc.document.fullName} /></div>
                              <DetailField label="Data Nascimento" value={registeredDoc.document.birthDate} icon={Calendar} />
                              <DetailField label="Nacionalidade" value={registeredDoc.document.nationality} />
                              <DetailField label="Naturalidade" value={registeredDoc.document.birthPlace || '---'} />
                              <DetailField label="Nome Pai" value={registeredDoc.document.fatherName || '---'} />
                              <DetailField label="Nome Mãe" value={registeredDoc.document.motherName || '---'} />
                            </div>
                          </div>
                          {/* Documentos de Identificação */}
                          <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Documentos de Identificação</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                              <DetailField label="Tipo Documento" value={registeredDoc.document.type} />
                              <DetailField label="Número Documento" value={registeredDoc.document.number} />
                              <DetailField label="Data Emissão" value={registeredDoc.document.issueDate} icon={Calendar} />
                              <DetailField label="Data Validade" value={registeredDoc.document.expiryDate} icon={Calendar} />
                            </div>
                          </div>
                          {/* Motivo */}
                          <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Motivo</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                              <div className="md:col-span-2"><DetailField label="Motivo" value={registeredDoc.document.reason} /></div>
                            </div>
                          </div>
                          {/* Anexos */}
                          <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">
                              Anexos {(registeredDoc.attachments?.length ?? 0) > 0 && <span className="ml-2 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded-full">{registeredDoc.attachments.length}</span>}
                            </p>
                            {registeredDoc.attachments?.length > 0 ? (
                              <div className="space-y-2">
                                {registeredDoc.attachments.map((att: any, idx: number) => {
                                  const isImg = att.type === 'Imagem';
                                  return (
                                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-slate-200 transition-all">
                                      <div className={`p-3 rounded-xl flex-shrink-0 ${isImg ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                                        {isImg ? <ImageIcon size={20} /> : <FileText size={20} />}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-slate-900 truncate">{att.name}</p>
                                        <p className="text-[10px] text-slate-400 mt-1"><span className="font-bold">{att.type}</span></p>
                                      </div>
                                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Visualizar"><Eye size={16} /></button>
                                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Eliminar"><Trash2 size={16} /></button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-xl">
                                <Paperclip size={28} className="mx-auto text-slate-200 mb-2" />
                                <p className="text-slate-400 text-sm italic">Nenhum anexo associado</p>
                              </div>
                            )}
                          </div>
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

                  {/* Section: Levantamento */}
                  {registeredDoc.levantamento && (
                    <div className="space-y-4">
                      <div className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-600 text-white rounded-lg"><Check size={18} /></div>
                          <span className="uppercase tracking-widest text-xs">Dados de Levantamento</span>
                        </div>
                      </div>
                      <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                            registeredDoc.levantamento.isOwner ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                            {registeredDoc.levantamento.isOwner ? 'O Próprio Titular' : 'Terceiro Autorizado'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="md:col-span-2">
                            <DetailField label="Nome" value={registeredDoc.levantamento.nome} />
                          </div>
                          {registeredDoc.levantamento.dataNascimento && (
                            <DetailField label="Data Nascimento" value={registeredDoc.levantamento.dataNascimento} icon={Calendar} />
                          )}
                          {registeredDoc.levantamento.docType && (
                            <DetailField label="Tipo Documento" value={registeredDoc.levantamento.docType} />
                          )}
                          <DetailField label="Nº Documento" value={registeredDoc.levantamento.docNumber || '---'} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-slate-100">
                          <DetailField label="Registado Por" value={registeredDoc.levantamento.registadoPor} />
                          <DetailField label="Data de Levantamento" value={registeredDoc.levantamento.dataLevantamento} icon={Calendar} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t-2 border-slate-100">
                    <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('document_search')}>
                      Voltar para Gestão de Documentos
                    </Button>
                    {!registeredDoc.levantamento && (
                      <Button
                        variant="success"
                        icon={Check}
                        onClick={() => setShowLevantamentoModal(true)}
                      >
                        Realizar Levantamento
                      </Button>
                    )}
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
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Gestão de Documentos</h2>
                  <div className="flex gap-3">
                    <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('dashboard')}>Voltar ao Início</Button>
                    <Button variant="primary" icon={Plus} onClick={() => {
                      setEditingDocId(null);
                      setDocData(emptyDocData());
                      setDocStep(1);
                      setIsReadOnlyView(false);
                      setCurrentView('document_registration');
                    }}>Cadastro Documento</Button>
                  </div>
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
                      <Button variant="outline" onClick={() => {
                        setDocSearchFilters({ type: '', number: '', fullName: '', birthDate: '', island: '', organicUnit: '' });
                        setDocSearchResults(null);
                      }}>Limpar</Button>
                      <Button variant="primary" icon={Search} onClick={() => {
                        const f = docSearchFilters;
                        const results = mockDocuments.filter(doc => {
                          if (f.type && doc.document.type !== f.type) return false;
                          if (f.number && !doc.document.number.toLowerCase().includes(f.number.toLowerCase())) return false;
                          if (f.fullName && !doc.document.fullName.toLowerCase().includes(f.fullName.toLowerCase())) return false;
                          if (f.birthDate && doc.document.birthDate !== f.birthDate) return false;
                          if (f.island && doc.storage.island !== f.island) return false;
                          if (f.organicUnit && doc.storage.organicUnit !== f.organicUnit) return false;
                          return true;
                        });
                        setDocSearchResults(results);
                      }}>Pesquisar</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                      {docSearchResults !== null ? 'Resultados da Pesquisa' : 'Listagem de Documentos'}
                    </h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">
                      Total : {(docSearchResults !== null ? docSearchResults : mockDocuments).length.toString().padStart(2, '0')}
                    </span>
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
                          <th className="px-6 py-4">Estado</th>
                          <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {(docSearchResults !== null ? docSearchResults : mockDocuments).length === 0 ? (
                          <tr>
                            <td colSpan={8} className="px-6 py-12 text-center text-sm font-bold text-slate-400">
                              Nenhum documento encontrado para os filtros aplicados.
                            </td>
                          </tr>
                        ) : (
                          (docSearchResults !== null ? docSearchResults : mockDocuments).map((doc) => {
                            const estado = doc.estado || (doc.levantamento ? 'Levantado' : 'Por Levantar');
                            return (
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
                              <td className="px-6 py-4">
                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                  estado === 'Levantado'
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-amber-50 text-amber-600'
                                }`}>
                                  {estado}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  title="Editar dados do documento"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingDocId(doc.id);
                                    setRegisteredDoc(doc);
                                    setDocData({
                                      document: { ...emptyDocData().document, ...doc.document, attachments: [] },
                                      finder: {
                                        ...emptyDocData().finder,
                                        ...doc.finder,
                                        location: { ...emptyDocData().finder.location, ...doc.finder.location }
                                      },
                                      storage: { ...emptyDocData().storage, ...doc.storage }
                                    });
                                    setDocStep(1);
                                    setCurrentView('document_registration');
                                  }}
                                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                >
                                  <Edit size={16} />
                                </button>
                              </td>
                            </tr>
                            );
                          })
                        )}
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
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Solicitação de Pedido</h2>
                </div>

                {/* Steps — igual ao cadastro de documentos */}
                <div className="flex items-center justify-between max-w-2xl mx-auto relative px-4">
                  <div className="absolute top-6 left-12 right-12 h-1 bg-slate-100 rounded-full"></div>
                  <div
                    className="absolute top-6 left-12 h-1 bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: certificateStep === 1 ? '0%' : '100%' }}
                  ></div>
                  {[
                    { id: 1, label: 'Identificação', icon: User },
                    { id: 2, label: 'DUC', icon: FileText }
                  ].map((step) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                        certificateStep > step.id
                          ? 'bg-green-500 border-green-200 text-white shadow-lg shadow-green-100'
                          : certificateStep === step.id
                            ? 'bg-blue-600 border-blue-200 text-white shadow-lg shadow-blue-200 scale-110'
                            : 'bg-white border-slate-100 text-slate-300'
                      }`}>
                        {certificateStep > step.id ? <Check size={20} /> : <step.icon size={20} />}
                      </div>
                      <div className="flex flex-col items-center">
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${certificateStep === step.id ? 'text-blue-600' : 'text-slate-400'}`}>Passo {step.id}</span>
                        <span className={`text-[10px] font-bold whitespace-nowrap ${certificateStep === step.id ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card principal */}
                <div className="bg-white border-2 border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                  {/* Card header */}
                  <div className="p-6 bg-slate-50 border-b-2 border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-slate-900 text-white rounded-lg">
                      {certificateStep === 1 ? <User size={18} /> : <FileText size={18} />}
                    </div>
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                      {certificateStep === 1 ? 'Dados de Identificação' : 'Documento Único de Cobrança'}
                    </h3>
                  </div>

                  <div className="p-8 space-y-8">
                    {certificateStep === 1 ? (
                      <div className="space-y-8">

                        {/* Pesquisa biográfica */}
                        <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 space-y-4">
                          <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="w-full md:w-32 space-y-2">
                              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Tipo Doc</label>
                              <select value={bioSearchDocType} onChange={(e) => setBioSearchDocType(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all">
                                <option value="CNI">CNI</option>
                                <option value="Passaporte">Passaporte</option>
                                <option value="TRE">TRE</option>
                                <option value="BI">BI</option>
                              </select>
                            </div>
                            <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">N.º Documento</label>
                              <input type="text" value={bioSearchDocNumber} onChange={(e) => setBioSearchDocNumber(e.target.value)}
                                placeholder="Digite o número do documento..."
                                className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Nome da Pessoa</label>
                              <input type="text" value={bioSearchName} onChange={(e) => setBioSearchName(e.target.value)}
                                placeholder="Digite o nome..."
                                className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all" />
                            </div>
                            <Button variant="secondary" icon={Search} onClick={() => { setBioSearchTarget('certificate'); handleBioSearch(); }}>Pesquisar</Button>
                          </div>
                        </div>

                        {/* Dados Biográficos */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Dados Biográficos</p>
                          <div className="flex flex-col md:flex-row gap-8 items-start">
                            {certificateData.photo && (
                              <div className="w-32 h-40 rounded-2xl border-4 border-white shadow-xl overflow-hidden shrink-0 bg-slate-100">
                                <img src={certificateData.photo} alt="Pessoa" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
                              <div className="md:col-span-2">
                                <DetailField label="Nome Completo" value={certificateData.fullName} readOnly={false} onChange={(v) => setCertificateData({...certificateData, fullName: v})} />
                              </div>
                              <DetailField label="Data Nascimento" value={certificateData.birthDate} type="date" readOnly={false} icon={Calendar} onChange={(v) => setCertificateData({...certificateData, birthDate: v})} />
                              <DetailField label="Sexo" value={certificateData.gender} type="select" options={['Masculino', 'Feminino']} readOnly={false} onChange={(v) => setCertificateData({...certificateData, gender: v})} />
                              <DetailField label="Estado Civil" value={certificateData.civilStatus} type="select" options={['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)']} readOnly={false} onChange={(v) => setCertificateData({...certificateData, civilStatus: v})} />
                              <DetailField label="Naturalidade" value={certificateData.birthPlace} readOnly={false} onChange={(v) => setCertificateData({...certificateData, birthPlace: v})} />
                              <DetailField label="Nacionalidade" value={certificateData.nationality} type="select" options={['Cabo-verdiana', 'Portuguesa', 'Angolana', 'Outra']} readOnly={false} onChange={(v) => setCertificateData({...certificateData, nationality: v})} />
                              <DetailField label="Nome Pai" value={certificateData.fatherName} readOnly={false} onChange={(v) => setCertificateData({...certificateData, fatherName: v})} />
                              <DetailField label="Nome Mãe" value={certificateData.motherName} readOnly={false} onChange={(v) => setCertificateData({...certificateData, motherName: v})} />
                              <DetailField label="NIF" value={certificateData.nif} readOnly={false} onChange={(v) => setCertificateData({...certificateData, nif: v})} />
                            </div>
                          </div>
                        </div>

                        {/* Documento de Identificação */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Documento de Identificação</p>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <DetailField label="Tipo Documento" value={certificateData.docType} type="select" options={['BI', 'CNI', 'Passaporte', 'TRE']} readOnly={false} onChange={(v) => setCertificateData({...certificateData, docType: v})} />
                            <DetailField label="Número Documento" value={certificateData.docNumber} readOnly={false} onChange={(v) => setCertificateData({...certificateData, docNumber: v})} />
                          </div>
                        </div>

                        {/* Endereço */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Endereço</p>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <DetailField label="Ilha" value={certificateData.island} type="select" options={['Santiago', 'São Vicente', 'Sal', 'Boa Vista', 'Fogo', 'Santo Antão', 'Maio', 'Brava', 'São Nicolau']} readOnly={false} onChange={(v) => setCertificateData({...certificateData, island: v})} />
                            <DetailField label="Concelho" value={certificateData.county} readOnly={false} onChange={(v) => setCertificateData({...certificateData, county: v})} />
                            <DetailField label="Freguesia" value={certificateData.parish} readOnly={false} onChange={(v) => setCertificateData({...certificateData, parish: v})} />
                            <DetailField label="Localidade" value={certificateData.locality} readOnly={false} onChange={(v) => setCertificateData({...certificateData, locality: v})} />
                            <div className="md:col-span-2">
                              <DetailField label="Ponto de Referência" value={certificateData.reference} readOnly={false} icon={MapPin} onChange={(v) => setCertificateData({...certificateData, reference: v})} />
                            </div>
                          </div>
                        </div>

                        {/* Contacto */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Contacto</p>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <DetailField label="Telemóvel" value={certificateData.phone} readOnly={false} onChange={(v) => setCertificateData({...certificateData, phone: v})} />
                            <DetailField label="Email" value={certificateData.email} readOnly={false} onChange={(v) => setCertificateData({...certificateData, email: v})} />
                          </div>
                        </div>

                        {/* Motivo */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Motivo de Solicitação</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailField label="Motivo" value={certificateData.reason} readOnly={false} onChange={(v) => setCertificateData({...certificateData, reason: v})} />
                          </div>
                        </div>

                        {/* Anexos — igual ao cadastro de documentos */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">
                              Anexos {savedAttachments.length > 0 && <span className="ml-2 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded-full">{savedAttachments.length}</span>}
                            </p>
                            <button onClick={() => setShowAttachmentModal(true)}
                              className="px-4 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors text-xs border-2 border-slate-900 shadow-sm flex items-center gap-2">
                              <Plus size={14} /> Adicionar Anexo
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
                                  <button onClick={() => setSavedAttachments(savedAttachments.filter((_, i) => i !== idx))}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-full py-10 text-center border-2 border-dashed border-slate-100 rounded-xl">
                                <Paperclip size={28} className="mx-auto text-slate-200 mb-2" />
                                <p className="text-slate-400 text-sm italic">Nenhum anexo associado</p>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="space-y-8">
                        {!ducGenerated ? (
                          <div className="flex flex-col items-center justify-center py-16 space-y-6">
                            <div className="p-6 bg-blue-50 text-blue-600 rounded-2xl">
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
                                    <th className="px-6 py-4">Número DUC</th>
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
                                      <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">Por Pagar</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <div className="flex justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"><Eye size={16} /></button>
                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"><Printer size={16} /></button>
                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"><History size={16} /></button>
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

                  {/* Footer navegação */}
                  <div className="p-6 bg-slate-50 border-t-2 border-slate-100 flex justify-between items-center">
                    <Button variant="outline" icon={ArrowLeft} onClick={() => {
                      if (certificateStep === 1) setCurrentView('certificate_list');
                      else setCertificateStep(1);
                    }}>Voltar</Button>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setCurrentView('certificate_list')}>Cancelar</Button>
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
                            setSuccessMessage('Solicitação de Certificado Registada com Sucesso.');
                            setShowSuccessModal(true);
                            setCurrentView('certificate_list');
                          }}>Concluir</Button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : currentView === 'certificate_list_extravio' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Declaração para Emissão de Documentos — Certificado de Extravio</h2>
                  <Button icon={Plus} onClick={() => {
                    setCertificateExtravioStep(1);
                    setDucExtravioGenerated(false);
                    setCurrentView('certificate_registration_extravio');
                  }}>Nova Solicitação</Button>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">N.º Pedido</label>
                      <input
                        type="text"
                        value={certificateExtravioSearchFilters.orderNumber}
                        onChange={(e) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, orderNumber: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        placeholder="Ex: 000004"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome</label>
                      <input
                        type="text"
                        value={certificateExtravioSearchFilters.name}
                        onChange={(e) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, name: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        placeholder="Nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Nascimento</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={certificateExtravioSearchFilters.birthDate}
                          onChange={(e) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, birthDate: e.target.value})}
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
                          value={certificateExtravioSearchFilters.requestDate}
                          onChange={(e) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, requestDate: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all"
                        />
                        <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                      </div>
                    </div>

                    <div className="md:col-span-4 flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setCertificateExtravioSearchFilters({
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
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Total : {mockCertificatesExtravio.length.toString().padStart(2, '0')}</span>
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
                        {mockCertificatesExtravio.map((cert) => (
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
            ) : currentView === 'certificate_registration_extravio' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 pb-12"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Solicitação de Pedido</h2>
                </div>

                {/* Steps — igual ao certificado de cadastro */}
                <div className="flex items-center justify-between max-w-2xl mx-auto relative px-4">
                  <div className="absolute top-6 left-12 right-12 h-1 bg-slate-100 rounded-full"></div>
                  <div
                    className="absolute top-6 left-12 h-1 bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: certificateExtravioStep === 1 ? '0%' : '100%' }}
                  ></div>
                  {[
                    { id: 1, label: 'Identificação', icon: User },
                    { id: 2, label: 'DUC', icon: FileText }
                  ].map((step) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                        certificateExtravioStep > step.id
                          ? 'bg-green-500 border-green-200 text-white shadow-lg shadow-green-100'
                          : certificateExtravioStep === step.id
                            ? 'bg-blue-600 border-blue-200 text-white shadow-lg shadow-blue-200 scale-110'
                            : 'bg-white border-slate-100 text-slate-300'
                      }`}>
                        {certificateExtravioStep > step.id ? <Check size={20} /> : <step.icon size={20} />}
                      </div>
                      <div className="flex flex-col items-center">
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${certificateExtravioStep === step.id ? 'text-blue-600' : 'text-slate-400'}`}>Passo {step.id}</span>
                        <span className={`text-[10px] font-bold whitespace-nowrap ${certificateExtravioStep === step.id ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card principal */}
                <div className="bg-white border-2 border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                  {/* Card header */}
                  <div className="p-6 bg-slate-50 border-b-2 border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-slate-900 text-white rounded-lg">
                      {certificateExtravioStep === 1 ? <User size={18} /> : <FileText size={18} />}
                    </div>
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                      {certificateExtravioStep === 1 ? 'Dados de Identificação' : 'Documento Único de Cobrança'}
                    </h3>
                  </div>

                  <div className="p-8 space-y-8">
                    {certificateExtravioStep === 1 ? (
                      <div className="space-y-8">

                        {/* Pesquisa biográfica */}
                        <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 space-y-4">
                          <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="w-full md:w-32 space-y-2">
                              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Tipo Doc</label>
                              <select value={bioSearchDocType} onChange={(e) => setBioSearchDocType(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all">
                                <option value="CNI">CNI</option>
                                <option value="Passaporte">Passaporte</option>
                                <option value="TRE">TRE</option>
                                <option value="BI">BI</option>
                              </select>
                            </div>
                            <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">N.º Documento</label>
                              <input type="text" value={bioSearchDocNumber} onChange={(e) => setBioSearchDocNumber(e.target.value)}
                                placeholder="Digite o número do documento..."
                                className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Nome da Pessoa</label>
                              <input type="text" value={bioSearchName} onChange={(e) => setBioSearchName(e.target.value)}
                                placeholder="Digite o nome..."
                                className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all" />
                            </div>
                            <Button variant="secondary" icon={Search} onClick={() => { setBioSearchTarget('certificate_extravio'); handleBioSearch(); }}>Pesquisar</Button>
                          </div>
                        </div>

                        {/* Dados Biograficos */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Dados Biograficos</p>
                          <div className="flex flex-col md:flex-row gap-8 items-start">
                            {certificateExtravioData.photo && (
                              <div className="w-32 h-40 rounded-2xl border-4 border-white shadow-xl overflow-hidden shrink-0 bg-slate-100">
                                <img src={certificateExtravioData.photo} alt="Pessoa" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-6">
                              <DetailField label="Nome Completo" value={certificateExtravioData.fullName} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, fullName: v})} />
                              <DetailField label="Data Nascimento" value={certificateExtravioData.birthDate} type="date" readOnly={false} icon={Calendar} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, birthDate: v})} />
                              <DetailField label="Sexo" value={certificateExtravioData.gender} type="select" options={['Masculino', 'Feminino']} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, gender: v})} />
                              <DetailField label="Estado Civil" value={certificateExtravioData.civilStatus} type="select" options={['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)']} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, civilStatus: v})} />
                              <DetailField label="Naturalidade" value={certificateExtravioData.birthPlace} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, birthPlace: v})} />
                              <DetailField label="Nacionalidade" value={certificateExtravioData.nationality} type="select" options={['Cabo-verdiana', 'Portuguesa', 'Angolana', 'Outra']} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, nationality: v})} />
                              <DetailField label="Nome Pai" value={certificateExtravioData.fatherName} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, fatherName: v})} />
                              <DetailField label="Nome Mãe" value={certificateExtravioData.motherName} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, motherName: v})} />
                              <DetailField label="Tipo Documento" value={certificateExtravioData.docType} type="select" options={['BI', 'CNI', 'Passaporte', 'TRE']} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, docType: v})} />
                              <DetailField label="Número Documento" value={certificateExtravioData.docNumber} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, docNumber: v})} />
                            </div>
                          </div>
                        </div>

                        {/* Endereço */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Endereço</p>
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            <DetailField label="Ilha" value={certificateExtravioData.island} type="select" options={['Santiago', 'São Vicente', 'Sal', 'Boa Vista', 'Fogo', 'Santo Antão', 'Maio', 'Brava', 'São Nicolau']} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, island: v})} />
                            <DetailField label="Conselho" value={certificateExtravioData.county} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, county: v})} />
                            <DetailField label="Freguesia" value={certificateExtravioData.parish} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, parish: v})} />
                            <DetailField label="Localidade" value={certificateExtravioData.locality} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, locality: v})} />
                            <DetailField label="Ponto de Referencia" value={certificateExtravioData.reference} readOnly={false} icon={MapPin} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, reference: v})} />
                          </div>
                        </div>

                        {/* Contacto */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Contacto</p>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <DetailField label="Telemovel" value={certificateExtravioData.phone} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, phone: v})} />
                            <DetailField label="Email" value={certificateExtravioData.email} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, email: v})} />
                          </div>
                        </div>

                        {/* Documento Extraviado */}
                        <div className="space-y-4">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Documento Extraviado</p>

                          {/* Pesquisa de documento extraviado */}
                          <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 space-y-4">
                            <div className="flex flex-col md:flex-row gap-4 items-end">
                              <div className="w-full md:w-32 space-y-2">
                                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Tipo Doc</label>
                                <select value={lostDocSearchType} onChange={(e) => setLostDocSearchType(e.target.value)}
                                  className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all">
                                  <option value="CNI">CNI</option>
                                  <option value="Passaporte">Passaporte</option>
                                  <option value="TRE">TRE</option>
                                  <option value="BI">BI</option>
                                </select>
                              </div>
                              <div className="flex-1 space-y-2">
                                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">N.º Documento</label>
                                <input type="text" value={lostDocSearchNumber} onChange={(e) => setLostDocSearchNumber(e.target.value)}
                                  placeholder="Digite o número do documento..."
                                  className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all" />
                              </div>
                              <div className="flex-1 space-y-2">
                                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Nome da Pessoa</label>
                                <input type="text" value={lostDocSearchName} onChange={(e) => setLostDocSearchName(e.target.value)}
                                  placeholder="Digite o nome..."
                                  className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all" />
                              </div>
                              <Button variant="secondary" icon={Search} onClick={handleLostDocSearch}>Pesquisar</Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <DetailField label="Tipo Documento" value={certificateExtravioData.lostDocType} type="select" options={['BI', 'CNI', 'Passaporte', 'TRE']} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, lostDocType: v})} />
                            <DetailField label="Número Documento" value={certificateExtravioData.lostDocNumber} readOnly={false} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, lostDocNumber: v})} />
                            <DetailField label="Data Emissão" value={certificateExtravioData.lostDocIssueDate} type="date" readOnly={false} icon={Calendar} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, lostDocIssueDate: v})} />
                            <DetailField label="Data Validade" value={certificateExtravioData.lostDocExpiryDate} type="date" readOnly={false} icon={Calendar} onChange={(v) => setCertificateExtravioData({...certificateExtravioData, lostDocExpiryDate: v})} />
                          </div>
                        </div>

                        {/* Anexos — igual ao cadastro de documentos */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">
                              Anexos {savedAttachments.length > 0 && <span className="ml-2 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded-full">{savedAttachments.length}</span>}
                            </p>
                            <button onClick={() => setShowAttachmentModal(true)}
                              className="px-4 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors text-xs border-2 border-slate-900 shadow-sm flex items-center gap-2">
                              <Plus size={14} /> Adicionar Anexo
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
                                  <button onClick={() => setSavedAttachments(savedAttachments.filter((_, i) => i !== idx))}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-full py-10 text-center border-2 border-dashed border-slate-100 rounded-xl">
                                <Paperclip size={28} className="mx-auto text-slate-200 mb-2" />
                                <p className="text-slate-400 text-sm italic">Nenhum anexo associado</p>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="space-y-8">
                        {!ducExtravioGenerated ? (
                          <div className="flex flex-col items-center justify-center py-16 space-y-6">
                            <div className="p-6 bg-blue-50 text-blue-600 rounded-2xl">
                              <FileText size={48} />
                            </div>
                            <div className="text-center space-y-2">
                              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Gerar Documento de Cobrança</h3>
                              <p className="text-sm text-slate-400 font-medium">Clique no botão abaixo para gerar o DUC para este pedido.</p>
                            </div>
                            <Button variant="secondary" onClick={() => setDucExtravioGenerated(true)}>Gerar DUC</Button>
                          </div>
                        ) : (
                          <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                                    <th className="px-6 py-4">Número DUC</th>
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
                                      <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">Por Pagar</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                      <div className="flex justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"><Eye size={16} /></button>
                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"><Printer size={16} /></button>
                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"><History size={16} /></button>
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

                  {/* Footer navegação */}
                  <div className="p-6 bg-slate-50 border-t-2 border-slate-100 flex justify-between items-center">
                    <Button variant="outline" icon={ArrowLeft} onClick={() => {
                      if (certificateExtravioStep === 1) setCurrentView('certificate_list_extravio');
                      else setCertificateExtravioStep(1);
                    }}>Voltar</Button>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setCurrentView('certificate_list_extravio')}>Cancelar</Button>
                      {certificateExtravioStep === 1 ? (
                        <Button variant="primary" icon={ArrowRight} onClick={() => setCertificateExtravioStep(2)}>Próximo</Button>
                      ) : (
                        ducExtravioGenerated && (
                          <Button variant="primary" icon={Check} onClick={() => {
                            setMockCertificatesExtravio([...mockCertificatesExtravio, {
                              id: String(mockCertificatesExtravio.length + 4).padStart(6, '0'),
                              name: certificateExtravioData.fullName || 'Novo Pedido',
                              birthDate: certificateExtravioData.birthDate || '---',
                              requestDate: new Date().toLocaleDateString('pt-BR'),
                              status: 'Por Pagar'
                            }]);
                            setSuccessMessage('Solicitação de Certificado de Extravio Registada com Sucesso.');
                            setShowSuccessModal(true);
                            setCurrentView('certificate_list_extravio');
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
                              setCertAnalysisHasSearched(false);

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
                                      src="https://randomuser.me/api/portraits/men/32.jpg" 
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
                                    <button
                                      onClick={() => {
                                        setHideNewCadastroInAssociate(true);
                                        setShowAssociateModal(true);
                                      }}
                                      className="px-4 py-2 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all text-xs border border-blue-900 shadow-sm flex items-center gap-2"
                                    >
                                      <Search size={14} />
                                      Alterar Vínculo
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <DetailField label="Nome Completo" value={`${associatedPerson.name}${associatedPerson.surname ? ' ' + associatedPerson.surname : ''}`} />
                                    <DetailField label="Data Nascimento" value={new Date(associatedPerson.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
                                    <DetailField label="Sexo" value={associatedPerson.gender} />
                                    <DetailField label="Estado Civil" value={associatedPerson.maritalStatus || associatedPerson.civilStatus} />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Identificação</h3>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                  <DetailField label="NIF" value={associatedPerson.nif || ''} readOnly={true} />
                                  <DetailField label="Tipo Documento" value={associatedPerson.docType || 'CNI'} />
                                  <DetailField label="Número Documento" value={associatedPerson.docNumber || associatedPerson.number || '---'} />
                                  <DetailField label="Data Emissão" value={associatedPerson.docIssueDate || '15/10/2020'} icon={Calendar} />
                                  <DetailField label="Data Validade" value={associatedPerson.docExpiryDate || '15/10/2025'} icon={Calendar} />
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
                              <span className="uppercase tracking-widest text-xs">Motivos do Cadastro Associado</span>
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
                                          <th className="px-6 py-4">Nº SIG</th>
                                          <th className="px-6 py-4">Destino</th>
                                          <th className="px-6 py-4">Medidas</th>
                                          <th className="px-6 py-4">Tipo</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-slate-50">
                                        {(associatedPerson.registrationReasons || []).filter((reg: any) => reg.status === 'Ativo' || reg.status === 'Aguardando Reabilitação').map((reg: any) => (
                                          <tr key={reg.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.date}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.reason}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.refNo}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.destination}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.measures}</td>
                                            <td className="px-6 py-4 text-xs">
                                              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${reg.type === 'Criminal' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                                {reg.type}
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                        {(associatedPerson.registrationReasons || []).filter((reg: any) => reg.status === 'Ativo' || reg.status === 'Aguardando Reabilitação').length === 0 && (
                                          <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-slate-400 italic text-xs">Nenhum motivo ativo ou aguardando reabilitação.</td>
                                          </tr>
                                        )}
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
                      {/* Associar Cadastro button */}
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            setHideNewCadastroInAssociate(true);
                            setCertAnalysisHasSearched(true);
                            setShowAssociateModal(true);
                          }}
                          className="px-5 py-2.5 bg-white text-slate-700 border-2 border-slate-200 font-bold rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all text-xs flex items-center gap-2"
                        >
                          <Search size={14} />
                          Associar Cadastro
                        </button>
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
                                  <div className="absolute top-4 right-8 flex items-center gap-3">
                                    <button
                                      onClick={() => {
                                        setAssociatedPerson(suggestedFicha);
                                        setSuggestedFicha(null);
                                        setCertAnalysisHasSearched(true);
                                      }}
                                      className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-xs shadow-md shadow-blue-200 flex items-center gap-2"
                                    >
                                      <CheckCircle size={13} />
                                      Aceitar Match
                                    </button>
                                  </div>

                                  <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-shrink-0">
                                      <div className="w-32 h-40 border-2 border-slate-900 rounded overflow-hidden shadow-md bg-slate-100 relative">
                                        <img
                                          src="https://randomuser.me/api/portraits/men/32.jpg"
                                          alt="Perfil"
                                          className="w-full h-full object-cover grayscale contrast-150 brightness-90 opacity-60"
                                          referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[8px] text-white text-center py-0.5 font-mono">
                                          PN-CV-0001-2024-SIDE
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex-1 space-y-6 pt-8">
                                      <div className="w-full max-w-xs">
                                        <DetailField label="Cadastro nº:" value={suggestedFicha.number} />
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <DetailField label="Nome Completo" value={`${suggestedFicha.name}${suggestedFicha.surname ? ' ' + suggestedFicha.surname : ''}`} />
                                        <DetailField label="Data Nascimento" value={new Date(suggestedFicha.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
                                        <DetailField label="Sexo" value={suggestedFicha.gender} />
                                        <DetailField label="Estado Civil" value={suggestedFicha.maritalStatus || suggestedFicha.civilStatus} />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Identificação</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                      <DetailField label="NIF" value={suggestedFicha.nif || ''} readOnly={true} />
                                      <DetailField label="Tipo Documento" value={suggestedFicha.docType || 'CNI'} />
                                      <DetailField label="Número Documento" value={suggestedFicha.docNumber || suggestedFicha.number || '---'} />
                                      <DetailField label="Data Emissão" value={suggestedFicha.docIssueDate || '15/10/2020'} icon={Calendar} />
                                      <DetailField label="Data Validade" value={suggestedFicha.docExpiryDate || '15/10/2025'} icon={Calendar} />
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

                {/* Devolução Warning Banner */}
                {selectedAnalysisCertificate.returnReason && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4 bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="p-2 bg-amber-100 rounded-xl flex-shrink-0">
                      <AlertTriangle size={20} className="text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-amber-900 leading-relaxed">
                        <span className="font-black">Motivo Devolução:</span> {selectedAnalysisCertificate.returnReason}
                      </p>
                      <p className="text-[10px] text-amber-500 font-black uppercase tracking-wider mt-2">
                        {selectedAnalysisCertificate.returnedAt} · {selectedAnalysisCertificate.returnedBy}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Dados Biográficos Accordion */}
                <div className="space-y-2">
                  <button
                    onClick={() => toggleSection('analysisBiographic')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><User size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Dados Biográficos</span>
                    </div>
                    {expandedSections.analysisBiographic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisBiographic && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8 mt-1">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <DetailField label="Nome Completo" value={selectedAnalysisCertificate.biographic.fullName} />
                            <DetailField label="Data Nascimento" value={selectedAnalysisCertificate.biographic.birthDate} icon={Calendar} />
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
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endereço</h4>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                              <DetailField label="Ilha" value={selectedAnalysisCertificate.address.island} />
                              <DetailField label="Conselho" value={selectedAnalysisCertificate.address.council} />
                              <DetailField label="Freguesia" value={selectedAnalysisCertificate.address.parish} />
                              <DetailField label="Localidade" value={selectedAnalysisCertificate.address.locality} />
                              <DetailField label="Ponto de Referencia" value={selectedAnalysisCertificate.address.reference} icon={MapPin} />
                            </div>
                          </div>
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <DetailField label="Telemovel" value={selectedAnalysisCertificate.contact.mobile} />
                              <DetailField label="Email" value={selectedAnalysisCertificate.contact.email} />
                            </div>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <DetailField label="Finalidade" value={selectedAnalysisCertificate.reason} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Anexos Accordion */}
                <div className="space-y-2">
                  <button
                    onClick={() => toggleSection('analysisAnexos')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Paperclip size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Anexos</span>
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{selectedAnalysisCertificate.attachments.length}</span>
                    </div>
                    {expandedSections.analysisAnexos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisAnexos && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-3 mt-1">
                          <Button variant="outline" icon={Plus} className="text-xs py-2">Adicionar Anexo</Button>
                          <div className="space-y-2">
                            {selectedAnalysisCertificate.attachments.map((file: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-100 rounded-xl">
                                <div className="flex items-center gap-3">
                                  <FileText size={18} className="text-slate-400" />
                                  <span className="text-xs font-bold text-slate-900">{file.name}</span>
                                </div>
                                <button className="text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Observações Accordion */}
                <div className="space-y-2">
                  <button
                    onClick={() => toggleSection('analysisObservations')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><MessageSquare size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Observações</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={(e) => { e.stopPropagation(); }} className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Novo +</button>
                      {expandedSections.analysisObservations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisObservations && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-4 mt-1">
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Histórico do Pedido Accordion */}
                <div className="space-y-2">
                  <button
                    onClick={() => toggleSection('analysisHistory')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><History size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Histórico do Pedido</span>
                    </div>
                    {expandedSections.analysisHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisHistory && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm mt-1">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
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
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                            {(() => {
                              const activeMotivos = (associatedPerson?.registrationReasons || []).filter((r: any) => r.status === 'Ativo' || r.status === 'Aguardando Reabilitação');
                              return (
                                <div className="space-y-6 text-justify leading-relaxed text-sm">
                                  <p className="font-bold">ROBERTO CARLOS CENTEIO LIMA, Subintendente da Polícia Nacional e Diretor da Direção Central de Investigação Criminal da Polícia Nacional---------------------------------------</p>

                                  <p>
                                    <span className="font-bold">CERTIFICA</span>, que compulsados os ficheiros existentes no arquivo desta Direção, verifica-se que respeitante ao (à) cidadão (ã) Cabo-verdiano senhor (a) <span className="font-bold uppercase underline">{associatedPerson?.name} {associatedPerson?.surname}</span>, {associatedPerson?.maritalStatus || 'solteiro'}, nascido (a) em <span className="font-bold">{new Date(associatedPerson?.birthDate).toLocaleDateString('pt-BR')}</span>, filho (a) de <span className="font-bold">---</span>, natural de <span className="font-bold">Cabo Verde</span> e residente em <span className="font-bold">---</span>, portador de CNI Nº <span className="font-bold">9884565</span> emitido pelo (a) <span className="font-bold">---</span> em <span className="font-bold">15/10/2020</span>.
                                  </p>

                                  {activeMotivos.length === 0 ? (
                                    <div className="border-y-2 border-slate-900 py-2 text-center">
                                      <p className="font-black tracking-[0.5em] uppercase">Nada Consta--------------------------------------------------------------------------------</p>
                                    </div>
                                  ) : (
                                    <div className="border-y-2 border-slate-900 py-4 space-y-3">
                                      <p className="font-black text-xs uppercase tracking-widest text-center mb-3">Consta o(s) seguinte(s) registo(s):</p>
                                      <table className="w-full text-xs border-collapse">
                                        <thead>
                                          <tr className="border-b border-slate-300">
                                            <th className="text-left py-1 pr-3 font-black uppercase tracking-tighter">Data</th>
                                            <th className="text-left py-1 pr-3 font-black uppercase tracking-tighter">Motivo</th>
                                            <th className="text-left py-1 pr-3 font-black uppercase tracking-tighter">Tipo</th>
                                            <th className="text-left py-1 font-black uppercase tracking-tighter">Estado</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {activeMotivos.map((reg: any) => (
                                            <tr key={reg.id} className="border-b border-slate-100">
                                              <td className="py-1.5 pr-3 font-medium">{reg.date}</td>
                                              <td className="py-1.5 pr-3 font-medium">{reg.reason}</td>
                                              <td className="py-1.5 pr-3 font-medium">{reg.type}</td>
                                              <td className="py-1.5 font-bold">{reg.status}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}

                                  <p>Este certificado destina-se a <span className="font-bold uppercase underline">{selectedAnalysisCertificate.reason}</span> e só para esse fim é válido.</p>

                                  <p>Por ser verdade e haver sido solicitado pelo (a) interessado (a), manda passar o presente certificado, que vai devidamente assinado e autenticado com o carimbo a óleo em uso nesta Direção.</p>
                                </div>
                              );
                            })()}

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
                      if (!certAnalysisHasSearched) {
                        setErrorMessage('Deve pesquisar pelo menos uma vez na associação de cadastro antes de concluir.');
                        setShowErrorModal(true);
                        return;
                      }
                      setPendingConcluirAction(() => () => {
                        const newDecisionCert = {
                          ...selectedAnalysisCertificate,
                          associatedPerson: associatedPerson || null,
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
                      });
                      setShowConfirmConcluir(true);
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
                className="space-y-6 pb-12"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Decisão de Certificado de Cadastro</h2>
                </div>

                {/* Cadastro Associado ou botão associar */}
                {associatedPerson ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => toggleSection('associated')}
                      className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 text-white rounded-lg"><Fingerprint size={18} /></div>
                        <span className="uppercase tracking-widest text-xs">Cadastro Associado</span>
                      </div>
                      {expandedSections.associated ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <AnimatePresence>
                      {expandedSections.associated && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 space-y-8 shadow-sm mt-1">
                            <div className="flex flex-col md:flex-row gap-8">
                              <div className="flex-shrink-0">
                                <div className="w-32 h-40 border-2 border-slate-900 rounded overflow-hidden shadow-md bg-slate-100 relative">
                                  <img src={associatedPerson.photo || 'https://randomuser.me/api/portraits/men/32.jpg'} alt="Perfil" className="w-full h-full object-cover grayscale contrast-150 brightness-90" referrerPolicy="no-referrer" />
                                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[8px] text-white text-center py-0.5 font-mono">PN-CV-0001-2024-SIDE</div>
                                </div>
                              </div>
                              <div className="flex-1 space-y-6">
                                <div className="flex justify-between items-start">
                                  <div className="w-full max-w-xs">
                                    <DetailField label="Cadastro nº:" value={associatedPerson.number} />
                                  </div>
                                  <button
                                    onClick={() => { setHideNewCadastroInAssociate(true); setShowAssociateModal(true); }}
                                    className="px-4 py-2 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all text-xs border border-blue-900 shadow-sm flex items-center gap-2"
                                  >
                                    <Search size={14} />
                                    Alterar Vínculo
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                  <DetailField label="Nome Completo" value={`${associatedPerson.name}${associatedPerson.surname ? ' ' + associatedPerson.surname : ''}`} />
                                  <DetailField label="Data Nascimento" value={new Date(associatedPerson.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
                                  <DetailField label="Sexo" value={associatedPerson.gender} />
                                  <DetailField label="Estado Civil" value={associatedPerson.maritalStatus || associatedPerson.civilStatus} />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Identificação</h3>
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                <DetailField label="NIF" value={associatedPerson.nif || ''} readOnly={true} />
                                <DetailField label="Tipo Documento" value={associatedPerson.docType || 'CNI'} />
                                <DetailField label="Número Documento" value={associatedPerson.docNumber || associatedPerson.number || '---'} />
                                <DetailField label="Data Emissão" value={associatedPerson.docIssueDate || '15/10/2020'} icon={Calendar} />
                                <DetailField label="Data Validade" value={associatedPerson.docExpiryDate || '15/10/2025'} icon={Calendar} />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Motivos */}
                    {associatedPerson.registrationReasons && (
                      <div>
                        <button
                          onClick={() => toggleSection('associatedMotivo')}
                          className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-900 text-white rounded-lg"><HelpCircle size={18} /></div>
                            <span className="uppercase tracking-widest text-xs">Motivos do Cadastro Associado</span>
                          </div>
                          {expandedSections.associatedMotivo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        <AnimatePresence>
                          {expandedSections.associatedMotivo && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm mt-1">
                                <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-6 py-4">Data</th>
                                        <th className="px-6 py-4">Motivo</th>
                                        <th className="px-6 py-4">Nº SIG</th>
                                        <th className="px-6 py-4">Destino</th>
                                        <th className="px-6 py-4">Medidas</th>
                                        <th className="px-6 py-4">Tipo</th>
                                        <th className="px-6 py-4">Estado</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                      {(associatedPerson.registrationReasons || []).filter((reg: any) => reg.status === 'Ativo' || reg.status === 'Aguardando Reabilitação').map((reg: any) => (
                                        <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.date}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.reason}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.refNo}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.destination}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.measures}</td>
                                          <td className="px-6 py-4 text-xs">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${reg.type === 'Criminal' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>{reg.type}</span>
                                          </td>
                                          <td className="px-6 py-4 text-xs">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${reg.status === 'Ativo' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>{reg.status}</span>
                                          </td>
                                        </tr>
                                      ))}
                                      {(associatedPerson.registrationReasons || []).filter((reg: any) => reg.status === 'Ativo' || reg.status === 'Aguardando Reabilitação').length === 0 && (
                                        <tr><td colSpan={7} className="px-6 py-8 text-center text-slate-400 italic text-xs">Nenhum motivo ativo ou aguardando reabilitação.</td></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button
                      onClick={() => { setHideNewCadastroInAssociate(true); setShowAssociateModal(true); }}
                      className="px-5 py-2.5 bg-white text-slate-700 border-2 border-slate-200 font-bold rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all text-xs flex items-center gap-2"
                    >
                      <Search size={14} />
                      Associar Cadastro
                    </button>
                  </div>
                )}

                {/* Dados Biográficos */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('analysisBiographic')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><User size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Dados Biográficos</span>
                    </div>
                    {expandedSections.analysisBiographic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisBiographic && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8 mt-1">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <DetailField label="Nome Completo" value={selectedDecisionCertificate.biographic.fullName} />
                            <DetailField label="Data Nascimento" value={selectedDecisionCertificate.biographic.birthDate} icon={Calendar} />
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
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endereço</h4>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                              <DetailField label="Ilha" value={selectedDecisionCertificate.address.island} />
                              <DetailField label="Conselho" value={selectedDecisionCertificate.address.council} />
                              <DetailField label="Freguesia" value={selectedDecisionCertificate.address.parish} />
                              <DetailField label="Localidade" value={selectedDecisionCertificate.address.locality} />
                              <DetailField label="Ponto de Referencia" value={selectedDecisionCertificate.address.reference} icon={MapPin} />
                            </div>
                          </div>
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <DetailField label="Telemovel" value={selectedDecisionCertificate.contact.mobile} />
                              <DetailField label="Email" value={selectedDecisionCertificate.contact.email} />
                            </div>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <DetailField label="Finalidade" value={selectedDecisionCertificate.reason} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Modelo de Certificado */}
                <div className="space-y-2">
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
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-slate-200 p-8 rounded-2xl flex justify-center mt-1">
                          <div className="bg-white w-full max-w-3xl shadow-2xl p-12 space-y-8 font-serif text-slate-800 border border-slate-300">
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
                            <div className="text-center space-y-2">
                              <div className="inline-block border-2 border-slate-900 px-8 py-2">
                                <p className="text-sm font-black uppercase tracking-widest">Certificado de Cadastro Policial</p>
                                <p className="text-xs font-bold">N.º {selectedDecisionCertificate.id}/2024</p>
                              </div>
                            </div>
                            {(() => {
                              const activeMotivos = (associatedPerson?.registrationReasons || []).filter((r: any) => r.status === 'Ativo' || r.status === 'Aguardando Reabilitação');
                              return (
                                <div className="space-y-6 text-justify leading-relaxed text-sm">
                                  <p className="font-bold">ROBERTO CARLOS CENTEIO LIMA, Subintendente da Polícia Nacional e Diretor da Direção Central de Investigação Criminal da Polícia Nacional---------------------------------------</p>
                                  <p>
                                    <span className="font-bold">CERTIFICA</span>, que compulsados os ficheiros existentes no arquivo desta Direção, verifica-se que respeitante ao (à) cidadão (ã) Cabo-verdiano senhor (a) <span className="font-bold uppercase underline">{associatedPerson?.name}{associatedPerson?.surname ? ' ' + associatedPerson.surname : ''}</span>, {associatedPerson?.maritalStatus || associatedPerson?.civilStatus || 'solteiro'}, nascido (a) em <span className="font-bold">{associatedPerson ? new Date(associatedPerson.birthDate).toLocaleDateString('pt-BR') : '---'}</span>, portador de {associatedPerson?.docType || 'CNI'} Nº <span className="font-bold">{associatedPerson?.docNumber || '---'}</span>.
                                  </p>
                                  {activeMotivos.length === 0 ? (
                                    <div className="border-y-2 border-slate-900 py-2 text-center">
                                      <p className="font-black tracking-[0.5em] uppercase">Nada Consta--------------------------------------------------------------------------------</p>
                                    </div>
                                  ) : (
                                    <div className="border-y-2 border-slate-900 py-4 space-y-3">
                                      <p className="font-black text-xs uppercase tracking-widest text-center mb-3">Consta o(s) seguinte(s) registo(s):</p>
                                      <table className="w-full text-xs border-collapse">
                                        <thead>
                                          <tr className="border-b border-slate-300">
                                            <th className="text-left py-1 pr-3 font-black uppercase tracking-tighter">Data</th>
                                            <th className="text-left py-1 pr-3 font-black uppercase tracking-tighter">Motivo</th>
                                            <th className="text-left py-1 pr-3 font-black uppercase tracking-tighter">Tipo</th>
                                            <th className="text-left py-1 font-black uppercase tracking-tighter">Estado</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {activeMotivos.map((reg: any) => (
                                            <tr key={reg.id} className="border-b border-slate-100">
                                              <td className="py-1.5 pr-3 font-medium">{reg.date}</td>
                                              <td className="py-1.5 pr-3 font-medium">{reg.reason}</td>
                                              <td className="py-1.5 pr-3 font-medium">{reg.type}</td>
                                              <td className="py-1.5 font-bold">{reg.status}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                  <p>Este certificado destina-se a <span className="font-bold uppercase underline">{selectedDecisionCertificate.reason}</span> e só para esse fim é válido.</p>
                                  <p>Por ser verdade e haver sido solicitado pelo (a) interessado (a), manda passar o presente certificado, que vai devidamente assinado e autenticado com o carimbo a óleo em uso nesta Direção.</p>
                                </div>
                              );
                            })()}
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
                            <div className="pt-4 text-center">
                              <p className="text-[8px] italic text-slate-400">Este certificado é válido por 90 (dias) a contar da data da sua emissão.</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Anexos */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('analysisAnexos')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Paperclip size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Anexos</span>
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{selectedDecisionCertificate.attachments.length}</span>
                    </div>
                    {expandedSections.analysisAnexos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisAnexos && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-2 mt-1">
                          {selectedDecisionCertificate.attachments.map((file: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl">
                              <FileText size={18} className="text-slate-400" />
                              <span className="text-xs font-bold text-slate-900">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('analysisObservations')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><MessageSquare size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Observações</span>
                    </div>
                    {expandedSections.analysisObservations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisObservations && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-4 mt-1">
                          {selectedDecisionCertificate.observations.map((obs: any, idx: number) => (
                            <div key={idx} className="p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center"><ImageIcon size={20} className="text-slate-400" /></div>
                                <div>
                                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{obs.user}</p>
                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{obs.date}</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">{obs.text}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Histórico */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('analysisHistory')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><History size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Histórico do Pedido</span>
                    </div>
                    {expandedSections.analysisHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisHistory && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm mt-1">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
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
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                        setPendingConcluirAction(() => () => {
                          const concludedCert = {
                            ...selectedDecisionCertificate,
                            associatedPerson: associatedPerson || null,
                            status: 'Concluído',
                            concludedAt: new Date().toLocaleDateString('pt-BR'),
                            history: [
                              ...selectedDecisionCertificate.history,
                              { date: new Date().toLocaleDateString('pt-BR'), phase: 'Decisão', status: 'Concluído', user: user?.name || 'Sistema' }
                            ]
                          };
                          setMockConcludedCertificates(prev => [...prev, concludedCert]);
                          setSuccessMessage('Despacho concluído e certificado emitido com sucesso!');
                          setShowSuccessModal(true);
                          setMockDecisionCertificates(mockDecisionCertificates.filter(c => c.id !== selectedDecisionCertificate.id));
                          setCurrentView('certificate_decision');
                        });
                        setShowConfirmConcluir(true);
                      }}
                    >
                      Concluir e Emitir Certificado
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : currentView === 'certificate_history' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Histórico de Certificado de Cadastro</h2>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Todos os Pedidos</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">
                      Total : {(mockAnalysisCertificates.length + mockDecisionCertificates.length + mockConcludedCertificates.length).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                          <th className="px-6 py-4">Número Pedido</th>
                          <th className="px-6 py-4">Nome</th>
                          <th className="px-6 py-4">Data Nascimento</th>
                          <th className="px-6 py-4">Data Pedido</th>
                          <th className="px-6 py-4">Fase</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          ...mockAnalysisCertificates.map(c => ({ ...c, _fase: 'Análise', _faseColor: 'bg-blue-50 text-blue-600' })),
                          ...mockDecisionCertificates.map(c => ({ ...c, _fase: 'Decisão', _faseColor: 'bg-amber-50 text-amber-600' })),
                          ...mockConcludedCertificates.map(c => ({ ...c, _fase: 'Concluído', _faseColor: 'bg-emerald-50 text-emerald-600' })),
                        ].length > 0 ? [
                          ...mockAnalysisCertificates.map(c => ({ ...c, _fase: 'Análise', _faseColor: 'bg-blue-50 text-blue-600' })),
                          ...mockDecisionCertificates.map(c => ({ ...c, _fase: 'Decisão', _faseColor: 'bg-amber-50 text-amber-600' })),
                          ...mockConcludedCertificates.map(c => ({ ...c, _fase: 'Concluído', _faseColor: 'bg-emerald-50 text-emerald-600' })),
                        ].map((cert) => (
                          <tr
                            key={cert.id + cert._fase}
                            onClick={() => {
                              setSelectedHistoryCertificate(cert);
                              setAssociatedPerson(cert.associatedPerson || null);
                              setCurrentView('certificate_history_detail');
                            }}
                            className="hover:bg-blue-50 cursor-pointer transition-colors group"
                          >
                            <td className="px-6 py-4 text-sm font-bold text-blue-600 group-hover:underline">{cert.id}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{cert.name}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{cert.birthDate}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{cert.requestDate}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${cert._faseColor}`}>{cert._fase}</span>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic text-sm">Nenhum pedido encontrado.</td>
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

            ) : currentView === 'certificate_history_detail' && selectedHistoryCertificate ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pb-12"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Detalhe do Pedido</h2>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    selectedHistoryCertificate._fase === 'Concluído' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                    selectedHistoryCertificate._fase === 'Decisão' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                    'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}>{selectedHistoryCertificate._fase}</span>
                </div>

                {/* Devolução Warning */}
                {selectedHistoryCertificate.returnReason && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4 bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="p-2 bg-amber-100 rounded-xl flex-shrink-0">
                      <AlertTriangle size={20} className="text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-amber-900 leading-relaxed">
                        <span className="font-black">Motivo Devolução:</span> {selectedHistoryCertificate.returnReason}
                      </p>
                      <p className="text-[10px] text-amber-500 font-black uppercase tracking-wider mt-2">
                        {selectedHistoryCertificate.returnedAt} · {selectedHistoryCertificate.returnedBy}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Cadastro Associado */}
                {associatedPerson && (
                  <div className="space-y-4">
                    <button
                      onClick={() => toggleSection('associated')}
                      className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 text-white rounded-lg"><Fingerprint size={18} /></div>
                        <span className="uppercase tracking-widest text-xs">Cadastro Associado</span>
                      </div>
                      {expandedSections.associated ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <AnimatePresence>
                      {expandedSections.associated && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 space-y-8 shadow-sm mt-1">
                            <div className="flex flex-col md:flex-row gap-8">
                              <div className="flex-shrink-0">
                                <div className="w-32 h-40 border-2 border-slate-900 rounded overflow-hidden shadow-md bg-slate-100 relative">
                                  <img src={associatedPerson.photo || 'https://randomuser.me/api/portraits/men/32.jpg'} alt="Perfil" className="w-full h-full object-cover grayscale contrast-150 brightness-90" referrerPolicy="no-referrer" />
                                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[8px] text-white text-center py-0.5 font-mono">PN-CV-0001-2024-SIDE</div>
                                </div>
                              </div>
                              <div className="flex-1 space-y-6">
                                <div className="w-full max-w-xs">
                                  <DetailField label="Cadastro nº:" value={associatedPerson.number} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                  <DetailField label="Nome Completo" value={`${associatedPerson.name}${associatedPerson.surname ? ' ' + associatedPerson.surname : ''}`} />
                                  <DetailField label="Data Nascimento" value={new Date(associatedPerson.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
                                  <DetailField label="Sexo" value={associatedPerson.gender} />
                                  <DetailField label="Estado Civil" value={associatedPerson.maritalStatus || associatedPerson.civilStatus} />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento Identificação</h3>
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                <DetailField label="NIF" value={associatedPerson.nif || ''} />
                                <DetailField label="Tipo Documento" value={associatedPerson.docType || 'CNI'} />
                                <DetailField label="Número Documento" value={associatedPerson.docNumber || associatedPerson.number || '---'} />
                                <DetailField label="Data Emissão" value={associatedPerson.docIssueDate || '15/10/2020'} icon={Calendar} />
                                <DetailField label="Data Validade" value={associatedPerson.docExpiryDate || '15/10/2025'} icon={Calendar} />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {associatedPerson.registrationReasons && (
                      <div>
                        <button
                          onClick={() => toggleSection('associatedMotivo')}
                          className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-900 text-white rounded-lg"><HelpCircle size={18} /></div>
                            <span className="uppercase tracking-widest text-xs">Motivos do Cadastro Associado</span>
                          </div>
                          {expandedSections.associatedMotivo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        <AnimatePresence>
                          {expandedSections.associatedMotivo && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm mt-1">
                                <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-6 py-4">Data</th>
                                        <th className="px-6 py-4">Motivo</th>
                                        <th className="px-6 py-4">Nº SIG</th>
                                        <th className="px-6 py-4">Destino</th>
                                        <th className="px-6 py-4">Medidas</th>
                                        <th className="px-6 py-4">Tipo</th>
                                        <th className="px-6 py-4">Estado</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                      {(associatedPerson.registrationReasons || []).filter((reg: any) => reg.status === 'Ativo' || reg.status === 'Aguardando Reabilitação').map((reg: any) => (
                                        <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.date}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.reason}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.refNo}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.destination}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{reg.measures}</td>
                                          <td className="px-6 py-4 text-xs">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${reg.type === 'Criminal' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>{reg.type}</span>
                                          </td>
                                          <td className="px-6 py-4 text-xs">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${reg.status === 'Ativo' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>{reg.status}</span>
                                          </td>
                                        </tr>
                                      ))}
                                      {(associatedPerson.registrationReasons || []).filter((reg: any) => reg.status === 'Ativo' || reg.status === 'Aguardando Reabilitação').length === 0 && (
                                        <tr><td colSpan={7} className="px-6 py-8 text-center text-slate-400 italic text-xs">Nenhum motivo ativo ou aguardando reabilitação.</td></tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                )}

                {/* Dados Biográficos */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('analysisBiographic')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><User size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Dados Biográficos</span>
                    </div>
                    {expandedSections.analysisBiographic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisBiographic && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8 mt-1">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <DetailField label="Nome Completo" value={selectedHistoryCertificate.biographic.fullName} />
                            <DetailField label="Data Nascimento" value={selectedHistoryCertificate.biographic.birthDate} icon={Calendar} />
                            <DetailField label="Sexo" value={selectedHistoryCertificate.biographic.gender} />
                            <DetailField label="Estado Civil" value={selectedHistoryCertificate.biographic.civilStatus} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <DetailField label="Naturalidade" value={selectedHistoryCertificate.biographic.birthPlace} />
                            <DetailField label="Nacionalidade" value={selectedHistoryCertificate.biographic.nationality} />
                            <DetailField label="Nome Pai" value={selectedHistoryCertificate.biographic.fatherName} />
                            <DetailField label="Nome Mãe" value={selectedHistoryCertificate.biographic.motherName} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <DetailField label="NIF" value={selectedHistoryCertificate.biographic.nif || '---'} />
                            <DetailField label="Tipo Documento" value={selectedHistoryCertificate.biographic.docType} />
                            <DetailField label="Número Documento" value={selectedHistoryCertificate.biographic.docNumber} />
                          </div>
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endereço</h4>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                              <DetailField label="Ilha" value={selectedHistoryCertificate.address.island} />
                              <DetailField label="Conselho" value={selectedHistoryCertificate.address.council} />
                              <DetailField label="Freguesia" value={selectedHistoryCertificate.address.parish} />
                              <DetailField label="Localidade" value={selectedHistoryCertificate.address.locality} />
                              <DetailField label="Ponto de Referencia" value={selectedHistoryCertificate.address.reference} icon={MapPin} />
                            </div>
                          </div>
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <DetailField label="Telemovel" value={selectedHistoryCertificate.contact.mobile} />
                              <DetailField label="Email" value={selectedHistoryCertificate.contact.email} />
                            </div>
                          </div>
                          <div className="pt-2 border-t border-slate-100">
                            <DetailField label="Finalidade" value={selectedHistoryCertificate.reason} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Modelo de Certificado */}
                <div className="space-y-2">
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
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-slate-200 p-8 rounded-2xl flex justify-center mt-1">
                          <div className="bg-white w-full max-w-3xl shadow-2xl p-12 space-y-8 font-serif text-slate-800 border border-slate-300">
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
                            <div className="text-center space-y-2">
                              <div className="inline-block border-2 border-slate-900 px-8 py-2">
                                <p className="text-sm font-black uppercase tracking-widest">Certificado de Cadastro Policial</p>
                                <p className="text-xs font-bold">N.º {selectedHistoryCertificate.id}/2024</p>
                              </div>
                            </div>
                            {(() => {
                              const activeMotivos = (associatedPerson?.registrationReasons || []).filter((r: any) => r.status === 'Ativo' || r.status === 'Aguardando Reabilitação');
                              return (
                                <div className="space-y-6 text-justify leading-relaxed text-sm">
                                  <p className="font-bold">ROBERTO CARLOS CENTEIO LIMA, Subintendente da Polícia Nacional e Diretor da Direção Central de Investigação Criminal da Polícia Nacional---------------------------------------</p>
                                  <p>
                                    <span className="font-bold">CERTIFICA</span>, que compulsados os ficheiros existentes no arquivo desta Direção, verifica-se que respeitante ao (à) cidadão (ã) Cabo-verdiano senhor (a) <span className="font-bold uppercase underline">{associatedPerson?.name}{associatedPerson?.surname ? ' ' + associatedPerson.surname : ''}</span>, {associatedPerson?.maritalStatus || associatedPerson?.civilStatus || 'solteiro'}, nascido (a) em <span className="font-bold">{associatedPerson ? new Date(associatedPerson.birthDate).toLocaleDateString('pt-BR') : '---'}</span>, portador de {associatedPerson?.docType || 'CNI'} Nº <span className="font-bold">{associatedPerson?.docNumber || '---'}</span>.
                                  </p>
                                  {activeMotivos.length === 0 ? (
                                    <div className="border-y-2 border-slate-900 py-2 text-center">
                                      <p className="font-black tracking-[0.5em] uppercase">Nada Consta--------------------------------------------------------------------------------</p>
                                    </div>
                                  ) : (
                                    <div className="border-y-2 border-slate-900 py-4 space-y-3">
                                      <p className="font-black text-xs uppercase tracking-widest text-center mb-3">Consta o(s) seguinte(s) registo(s):</p>
                                      <table className="w-full text-xs border-collapse">
                                        <thead>
                                          <tr className="border-b border-slate-300">
                                            <th className="text-left py-1 pr-3 font-black uppercase tracking-tighter">Data</th>
                                            <th className="text-left py-1 pr-3 font-black uppercase tracking-tighter">Motivo</th>
                                            <th className="text-left py-1 pr-3 font-black uppercase tracking-tighter">Tipo</th>
                                            <th className="text-left py-1 font-black uppercase tracking-tighter">Estado</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {activeMotivos.map((reg: any) => (
                                            <tr key={reg.id} className="border-b border-slate-100">
                                              <td className="py-1.5 pr-3 font-medium">{reg.date}</td>
                                              <td className="py-1.5 pr-3 font-medium">{reg.reason}</td>
                                              <td className="py-1.5 pr-3 font-medium">{reg.type}</td>
                                              <td className="py-1.5 font-bold">{reg.status}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                  <p>Este certificado destina-se a <span className="font-bold uppercase underline">{selectedHistoryCertificate.reason}</span> e só para esse fim é válido.</p>
                                  <p>Por ser verdade e haver sido solicitado pelo (a) interessado (a), manda passar o presente certificado, que vai devidamente assinado e autenticado com o carimbo a óleo em uso nesta Direção.</p>
                                </div>
                              );
                            })()}
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
                            <div className="pt-4 text-center">
                              <p className="text-[8px] italic text-slate-400">Este certificado é válido por 90 (dias) a contar da data da sua emissão.</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Anexos */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('analysisAnexos')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Paperclip size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Anexos</span>
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{selectedHistoryCertificate.attachments.length}</span>
                    </div>
                    {expandedSections.analysisAnexos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisAnexos && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-2 mt-1">
                          {selectedHistoryCertificate.attachments.map((file: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl">
                              <FileText size={18} className="text-slate-400" />
                              <span className="text-xs font-bold text-slate-900">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('analysisObservations')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><MessageSquare size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Observações</span>
                    </div>
                    {expandedSections.analysisObservations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisObservations && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-4 mt-1">
                          {selectedHistoryCertificate.observations.map((obs: any, idx: number) => (
                            <div key={idx} className="p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center"><ImageIcon size={20} className="text-slate-400" /></div>
                                <div>
                                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{obs.user}</p>
                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{obs.date}</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">{obs.text}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Histórico */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('analysisHistory')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><History size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Histórico do Pedido</span>
                    </div>
                    {expandedSections.analysisHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.analysisHistory && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm mt-1">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                                  <th className="px-6 py-4">Data</th>
                                  <th className="px-6 py-4">Fase</th>
                                  <th className="px-6 py-4">Estado</th>
                                  <th className="px-6 py-4">Utente</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {selectedHistoryCertificate.history.map((h: any, idx: number) => (
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-start pt-8 border-t border-slate-100">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('certificate_history')}>Voltar</Button>
                </div>
              </motion.div>

            ) : currentView === 'certificate_analysis_extravio' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Análise de Certificado de Extravio</h2>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <DetailField label="N.º Pedido" value={certificateExtravioSearchFilters.orderNumber} readOnly={false} onChange={(val) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, orderNumber: val})} />
                    <DetailField label="Nome" value={certificateExtravioSearchFilters.name} readOnly={false} onChange={(val) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, name: val})} />
                    <DetailField label="Data de Nascimento" value={certificateExtravioSearchFilters.birthDate} type="date" readOnly={false} icon={Calendar} onChange={(val) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, birthDate: val})} />
                    <DetailField label="Data Pedido" value={certificateExtravioSearchFilters.requestDate} type="date" readOnly={false} icon={Calendar} onChange={(val) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, requestDate: val})} />
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button variant="primary" icon={Search} onClick={() => {}}>Pesquisar</Button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Listagem de Pedidos</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Total : {mockAnalysisCertificatesExtravio.length.toString().padStart(2, '0')}</span>
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
                        {mockAnalysisCertificatesExtravio.length > 0 ? (
                          mockAnalysisCertificatesExtravio.map((cert) => (
                            <tr
                              key={cert.id}
                              onClick={() => {
                                setSelectedAnalysisCertificateExtravio(cert);
                                setCurrentView('certificate_analysis_extravio_detail');
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
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic text-sm">Nenhum pedido aguardando análise.</td>
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
            ) : currentView === 'certificate_analysis_extravio_detail' && selectedAnalysisCertificateExtravio ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pb-12"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Análise de Certificado de Extravio</h2>
                </div>

                {/* Dados Biográficos */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioBiographic')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><User size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Dados Biográficos</span>
                    </div>
                    {expandedSections.extravioBiographic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioBiographic && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8 mt-1">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <DetailField label="Nome Completo" value={selectedAnalysisCertificateExtravio.biographic.fullName} />
                            <DetailField label="Data Nascimento" value={selectedAnalysisCertificateExtravio.biographic.birthDate} icon={Calendar} />
                            <DetailField label="Sexo" value={selectedAnalysisCertificateExtravio.biographic.gender} />
                            <DetailField label="Estado Civil" value={selectedAnalysisCertificateExtravio.biographic.civilStatus} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <DetailField label="Naturalidade" value={selectedAnalysisCertificateExtravio.biographic.birthPlace} />
                            <DetailField label="Nacionalidade" value={selectedAnalysisCertificateExtravio.biographic.nationality} />
                            <DetailField label="Nome Pai" value={selectedAnalysisCertificateExtravio.biographic.fatherName} />
                            <DetailField label="Nome Mãe" value={selectedAnalysisCertificateExtravio.biographic.motherName} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <DetailField label="Tipo Documento" value={selectedAnalysisCertificateExtravio.biographic.docType} />
                            <DetailField label="Número Documento" value={selectedAnalysisCertificateExtravio.biographic.docNumber} />
                          </div>
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endereço</h4>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                              <DetailField label="Ilha" value={selectedAnalysisCertificateExtravio.address.island} />
                              <DetailField label="Conselho" value={selectedAnalysisCertificateExtravio.address.council} />
                              <DetailField label="Freguesia" value={selectedAnalysisCertificateExtravio.address.parish} />
                              <DetailField label="Localidade" value={selectedAnalysisCertificateExtravio.address.locality} />
                              <DetailField label="Ponto de Referencia" value={selectedAnalysisCertificateExtravio.address.reference} icon={MapPin} />
                            </div>
                          </div>
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <DetailField label="Telemovel" value={selectedAnalysisCertificateExtravio.contact.mobile} />
                              <DetailField label="Email" value={selectedAnalysisCertificateExtravio.contact.email} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Documento Extraviado */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioDocuments')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><FileWarning size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Documento Extraviado</span>
                    </div>
                    {expandedSections.extravioDocuments ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioDocuments && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6 mt-1">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <DetailField label="Tipo Documento" value={selectedAnalysisCertificateExtravio.documentosExtraviados.docType} />
                            <DetailField label="Número Documento" value={selectedAnalysisCertificateExtravio.documentosExtraviados.docNumber} />
                            <DetailField label="Data Emissão" value={selectedAnalysisCertificateExtravio.documentosExtraviados.docIssueDate} icon={Calendar} />
                            <DetailField label="Data Validade" value={selectedAnalysisCertificateExtravio.documentosExtraviados.docExpiryDate} icon={Calendar} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Modelo de Certificado de Extravio */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioCertificateModel')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><FileText size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Modelo de Certificado de Extravio</span>
                    </div>
                    {expandedSections.extravioCertificateModel ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioCertificateModel && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-slate-200 p-8 rounded-2xl flex justify-center mt-1">
                          {(() => { const cert = selectedAnalysisCertificateExtravio; const doc = cert.documentosExtraviados; return (
                          <div className="bg-white w-full max-w-3xl shadow-2xl p-12 space-y-8 font-serif text-slate-800 border border-slate-300">
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
                            <div className="text-center space-y-2">
                              <div className="inline-block border-2 border-slate-900 px-8 py-2">
                                <p className="text-sm font-black uppercase tracking-widest">Certificado de Extravio de Documento</p>
                                <p className="text-xs font-bold">N.º {cert.id}/2026</p>
                              </div>
                            </div>
                            <div className="space-y-6 text-justify leading-relaxed text-sm">
                              <p className="font-bold">ROBERTO CARLOS CENTEIO LIMA, Subintendente da Polícia Nacional e Diretor da Direção Central de Investigação Criminal da Polícia Nacional---------------------------------------</p>
                              <p>
                                <span className="font-bold">CERTIFICA</span>, a pedido do (a) interessado (a), que compareceu perante esta Direção o (a) cidadão (ã) Cabo-verdiano (a) senhor (a) <span className="font-bold uppercase underline">{cert.biographic.fullName}</span>, {cert.biographic.civilStatus}, nascido (a) em <span className="font-bold">{cert.biographic.birthDate}</span>, filho (a) de <span className="font-bold">{cert.biographic.fatherName}</span> e de <span className="font-bold">{cert.biographic.motherName}</span>, portador (a) de {cert.biographic.docType} Nº <span className="font-bold">{cert.biographic.docNumber}</span>, declarando o extravio do seu documento de identificação.
                              </p>
                              <div className="border-y-2 border-slate-900 py-3 text-center">
                                <p className="font-black uppercase tracking-widest">Documento Extraviado: {doc.docType} Nº {doc.docNumber}</p>
                                {(doc.docIssueDate || doc.docExpiryDate) && (
                                  <p className="text-xs font-bold normal-case tracking-normal mt-1">
                                    {doc.docIssueDate && <>Emitido em {doc.docIssueDate}</>}{doc.docIssueDate && doc.docExpiryDate ? ' · ' : ''}{doc.docExpiryDate && <>Válido até {doc.docExpiryDate}</>}
                                  </p>
                                )}
                              </div>
                              <p>Por ser verdade e haver sido solicitado pelo (a) interessado (a), manda passar o presente certificado, que vai devidamente assinado e autenticado com o carimbo a óleo em uso nesta Direção.</p>
                            </div>
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
                          ); })()}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Anexos */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioAnexos')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Paperclip size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Anexos</span>
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{selectedAnalysisCertificateExtravio.attachments.length}</span>
                    </div>
                    {expandedSections.extravioAnexos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioAnexos && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-3 mt-1">
                          <Button variant="outline" icon={Plus} className="text-xs py-2">Adicionar Anexo</Button>
                          <div className="space-y-2">
                            {selectedAnalysisCertificateExtravio.attachments.map((file: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-100 rounded-xl">
                                <div className="flex items-center gap-3">
                                  <FileText size={18} className="text-slate-400" />
                                  <span className="text-xs font-bold text-slate-900">{file.name}</span>
                                </div>
                                <button className="text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioObservations')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><MessageSquare size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Observações</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={(e) => { e.stopPropagation(); }} className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Novo +</button>
                      {expandedSections.extravioObservations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioObservations && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-4 mt-1">
                          {selectedAnalysisCertificateExtravio.observations.map((obs: any, idx: number) => (
                            <div key={idx} className="p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center"><ImageIcon size={20} className="text-slate-400" /></div>
                                <div>
                                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{obs.user}</p>
                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{obs.date}</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">{obs.text}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Histórico do Pedido */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioHistory')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><History size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Histórico do Pedido</span>
                    </div>
                    {expandedSections.extravioHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioHistory && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm mt-1">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                                  <th className="px-6 py-4">Data</th>
                                  <th className="px-6 py-4">Fase</th>
                                  <th className="px-6 py-4">Estado</th>
                                  <th className="px-6 py-4">Utente</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {selectedAnalysisCertificateExtravio.history.map((h: any, idx: number) => (
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between pt-8 border-t border-slate-100">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('certificate_analysis_extravio')}>Voltar</Button>
                  <Button
                    variant="primary"
                    icon={Check}
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      setPendingConcluirAction(() => () => {
                        const newDecisionCert = {
                          ...selectedAnalysisCertificateExtravio,
                          status: 'Para Decisão',
                          history: [
                            ...selectedAnalysisCertificateExtravio.history,
                            { date: new Date().toLocaleDateString('pt-BR'), phase: 'Decisão', status: 'Para Decisão', user: user?.name || 'Sistema' }
                          ]
                        };
                        setMockDecisionCertificatesExtravio([...mockDecisionCertificatesExtravio, newDecisionCert]);
                        setMockAnalysisCertificatesExtravio(mockAnalysisCertificatesExtravio.filter(c => c.id !== selectedAnalysisCertificateExtravio.id));
                        setSuccessMessage('Pedido enviado para Decisão com sucesso.');
                        setShowSuccessModal(true);
                        setCurrentView('certificate_analysis_extravio');
                      });
                      setShowConfirmConcluir(true);
                    }}
                  >
                    Concluir
                  </Button>
                </div>
              </motion.div>
            ) : currentView === 'certificate_decision_extravio' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Decisão de Certificado de Extravio</h2>
                </div>

                <div className="bg-white p-8 rounded-2xl border-2 border-slate-100 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <DetailField label="N.º Pedido" value={certificateExtravioSearchFilters.orderNumber} readOnly={false} onChange={(val) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, orderNumber: val})} />
                    <DetailField label="Nome" value={certificateExtravioSearchFilters.name} readOnly={false} onChange={(val) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, name: val})} />
                    <DetailField label="Data de Nascimento" value={certificateExtravioSearchFilters.birthDate} type="date" readOnly={false} icon={Calendar} onChange={(val) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, birthDate: val})} />
                    <DetailField label="Data Pedido" value={certificateExtravioSearchFilters.requestDate} type="date" readOnly={false} icon={Calendar} onChange={(val) => setCertificateExtravioSearchFilters({...certificateExtravioSearchFilters, requestDate: val})} />
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button variant="primary" icon={Search} onClick={() => {}}>Pesquisar</Button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Listagem de Pedidos para Decisão</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Total : {mockDecisionCertificatesExtravio.length.toString().padStart(2, '0')}</span>
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
                        {mockDecisionCertificatesExtravio.length > 0 ? (
                          mockDecisionCertificatesExtravio.map((cert) => (
                            <tr
                              key={cert.id}
                              onClick={() => {
                                setSelectedDecisionCertificateExtravio(cert);
                                setCurrentView('certificate_decision_extravio_detail');
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
            ) : currentView === 'certificate_decision_extravio_detail' && selectedDecisionCertificateExtravio ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pb-12"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Decisão de Certificado de Extravio</h2>
                </div>

                {/* Devolução Warning */}
                {selectedDecisionCertificateExtravio.returnReason && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4 bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="p-2 bg-amber-100 rounded-xl flex-shrink-0">
                      <AlertTriangle size={20} className="text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-amber-900 leading-relaxed">
                        <span className="font-black">Motivo Devolução:</span> {selectedDecisionCertificateExtravio.returnReason}
                      </p>
                      <p className="text-[10px] text-amber-500 font-black uppercase tracking-wider mt-2">
                        {selectedDecisionCertificateExtravio.returnedAt} · {selectedDecisionCertificateExtravio.returnedBy}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Dados Biográficos */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioBiographic')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><User size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Dados Biográficos</span>
                    </div>
                    {expandedSections.extravioBiographic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioBiographic && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8 mt-1">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <DetailField label="Nome Completo" value={selectedDecisionCertificateExtravio.biographic.fullName} />
                            <DetailField label="Data Nascimento" value={selectedDecisionCertificateExtravio.biographic.birthDate} icon={Calendar} />
                            <DetailField label="Sexo" value={selectedDecisionCertificateExtravio.biographic.gender} />
                            <DetailField label="Estado Civil" value={selectedDecisionCertificateExtravio.biographic.civilStatus} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <DetailField label="Naturalidade" value={selectedDecisionCertificateExtravio.biographic.birthPlace} />
                            <DetailField label="Nacionalidade" value={selectedDecisionCertificateExtravio.biographic.nationality} />
                            <DetailField label="Nome Pai" value={selectedDecisionCertificateExtravio.biographic.fatherName} />
                            <DetailField label="Nome Mãe" value={selectedDecisionCertificateExtravio.biographic.motherName} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <DetailField label="Tipo Documento" value={selectedDecisionCertificateExtravio.biographic.docType} />
                            <DetailField label="Número Documento" value={selectedDecisionCertificateExtravio.biographic.docNumber} />
                          </div>
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endereço</h4>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                              <DetailField label="Ilha" value={selectedDecisionCertificateExtravio.address.island} />
                              <DetailField label="Conselho" value={selectedDecisionCertificateExtravio.address.council} />
                              <DetailField label="Freguesia" value={selectedDecisionCertificateExtravio.address.parish} />
                              <DetailField label="Localidade" value={selectedDecisionCertificateExtravio.address.locality} />
                              <DetailField label="Ponto de Referencia" value={selectedDecisionCertificateExtravio.address.reference} icon={MapPin} />
                            </div>
                          </div>
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <DetailField label="Telemovel" value={selectedDecisionCertificateExtravio.contact.mobile} />
                              <DetailField label="Email" value={selectedDecisionCertificateExtravio.contact.email} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Documento Extraviado */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioDocuments')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><FileWarning size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Documento Extraviado</span>
                    </div>
                    {expandedSections.extravioDocuments ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioDocuments && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6 mt-1">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <DetailField label="Tipo Documento" value={selectedDecisionCertificateExtravio.documentosExtraviados.docType} />
                            <DetailField label="Número Documento" value={selectedDecisionCertificateExtravio.documentosExtraviados.docNumber} />
                            <DetailField label="Data Emissão" value={selectedDecisionCertificateExtravio.documentosExtraviados.docIssueDate} icon={Calendar} />
                            <DetailField label="Data Validade" value={selectedDecisionCertificateExtravio.documentosExtraviados.docExpiryDate} icon={Calendar} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Modelo de Certificado de Extravio */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioCertificateModel')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><FileText size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Modelo de Certificado de Extravio</span>
                    </div>
                    {expandedSections.extravioCertificateModel ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioCertificateModel && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-slate-200 p-8 rounded-2xl flex justify-center mt-1">
                          {(() => { const cert = selectedDecisionCertificateExtravio; const doc = cert.documentosExtraviados; return (
                          <div className="bg-white w-full max-w-3xl shadow-2xl p-12 space-y-8 font-serif text-slate-800 border border-slate-300">
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
                            <div className="text-center space-y-2">
                              <div className="inline-block border-2 border-slate-900 px-8 py-2">
                                <p className="text-sm font-black uppercase tracking-widest">Certificado de Extravio de Documento</p>
                                <p className="text-xs font-bold">N.º {cert.id}/2026</p>
                              </div>
                            </div>
                            <div className="space-y-6 text-justify leading-relaxed text-sm">
                              <p className="font-bold">ROBERTO CARLOS CENTEIO LIMA, Subintendente da Polícia Nacional e Diretor da Direção Central de Investigação Criminal da Polícia Nacional---------------------------------------</p>
                              <p>
                                <span className="font-bold">CERTIFICA</span>, a pedido do (a) interessado (a), que compareceu perante esta Direção o (a) cidadão (ã) Cabo-verdiano (a) senhor (a) <span className="font-bold uppercase underline">{cert.biographic.fullName}</span>, {cert.biographic.civilStatus}, nascido (a) em <span className="font-bold">{cert.biographic.birthDate}</span>, filho (a) de <span className="font-bold">{cert.biographic.fatherName}</span> e de <span className="font-bold">{cert.biographic.motherName}</span>, portador (a) de {cert.biographic.docType} Nº <span className="font-bold">{cert.biographic.docNumber}</span>, declarando o extravio do seu documento de identificação.
                              </p>
                              <div className="border-y-2 border-slate-900 py-3 text-center">
                                <p className="font-black uppercase tracking-widest">Documento Extraviado: {doc.docType} Nº {doc.docNumber}</p>
                                {(doc.docIssueDate || doc.docExpiryDate) && (
                                  <p className="text-xs font-bold normal-case tracking-normal mt-1">
                                    {doc.docIssueDate && <>Emitido em {doc.docIssueDate}</>}{doc.docIssueDate && doc.docExpiryDate ? ' · ' : ''}{doc.docExpiryDate && <>Válido até {doc.docExpiryDate}</>}
                                  </p>
                                )}
                              </div>
                              <p>Por ser verdade e haver sido solicitado pelo (a) interessado (a), manda passar o presente certificado, que vai devidamente assinado e autenticado com o carimbo a óleo em uso nesta Direção.</p>
                            </div>
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
                          ); })()}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Anexos */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioAnexos')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Paperclip size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Anexos</span>
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{selectedDecisionCertificateExtravio.attachments.length}</span>
                    </div>
                    {expandedSections.extravioAnexos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioAnexos && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-2 mt-1">
                          {selectedDecisionCertificateExtravio.attachments.map((file: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl">
                              <FileText size={18} className="text-slate-400" />
                              <span className="text-xs font-bold text-slate-900">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioObservations')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><MessageSquare size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Observações</span>
                    </div>
                    {expandedSections.extravioObservations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioObservations && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-4 mt-1">
                          {selectedDecisionCertificateExtravio.observations.map((obs: any, idx: number) => (
                            <div key={idx} className="p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center"><ImageIcon size={20} className="text-slate-400" /></div>
                                <div>
                                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{obs.user}</p>
                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{obs.date}</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">{obs.text}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Histórico */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioHistory')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><History size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Histórico do Pedido</span>
                    </div>
                    {expandedSections.extravioHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioHistory && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm mt-1">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                                  <th className="px-6 py-4">Data</th>
                                  <th className="px-6 py-4">Fase</th>
                                  <th className="px-6 py-4">Estado</th>
                                  <th className="px-6 py-4">Utente</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {selectedDecisionCertificateExtravio.history.map((h: any, idx: number) => (
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between pt-8 border-t border-slate-100">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('certificate_decision_extravio')}>Voltar</Button>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      icon={RotateCcw}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => setShowReturnModalExtravio(true)}
                    >
                      Devolver
                    </Button>
                    <Button
                      variant="primary"
                      icon={CheckCircle}
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => {
                        setPendingConcluirAction(() => () => {
                          const concludedCert = {
                            ...selectedDecisionCertificateExtravio,
                            status: 'Concluído',
                            concludedAt: new Date().toLocaleDateString('pt-BR'),
                            history: [
                              ...selectedDecisionCertificateExtravio.history,
                              { date: new Date().toLocaleDateString('pt-BR'), phase: 'Decisão', status: 'Concluído', user: user?.name || 'Sistema' }
                            ]
                          };
                          setMockConcludedCertificatesExtravio(prev => [...prev, concludedCert]);
                          setSuccessMessage('Despacho concluído e certificado de extravio emitido com sucesso!');
                          setShowSuccessModal(true);
                          setMockDecisionCertificatesExtravio(mockDecisionCertificatesExtravio.filter(c => c.id !== selectedDecisionCertificateExtravio.id));
                          setCurrentView('certificate_decision_extravio');
                        });
                        setShowConfirmConcluir(true);
                      }}
                    >
                      Concluir e Emitir Certificado
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : currentView === 'certificate_history_extravio' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Histórico Comunicações de Extravio</h2>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Todos os Pedidos</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">
                      Total : {(mockAnalysisCertificatesExtravio.length + mockDecisionCertificatesExtravio.length + mockConcludedCertificatesExtravio.length).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                          <th className="px-6 py-4">Número Pedido</th>
                          <th className="px-6 py-4">Nome</th>
                          <th className="px-6 py-4">Data Nascimento</th>
                          <th className="px-6 py-4">Data Pedido</th>
                          <th className="px-6 py-4">Fase</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          ...mockAnalysisCertificatesExtravio.map(c => ({ ...c, _fase: 'Análise', _faseColor: 'bg-blue-50 text-blue-600' })),
                          ...mockDecisionCertificatesExtravio.map(c => ({ ...c, _fase: 'Decisão', _faseColor: 'bg-amber-50 text-amber-600' })),
                          ...mockConcludedCertificatesExtravio.map(c => ({ ...c, _fase: 'Concluído', _faseColor: 'bg-emerald-50 text-emerald-600' })),
                        ].length > 0 ? [
                          ...mockAnalysisCertificatesExtravio.map(c => ({ ...c, _fase: 'Análise', _faseColor: 'bg-blue-50 text-blue-600' })),
                          ...mockDecisionCertificatesExtravio.map(c => ({ ...c, _fase: 'Decisão', _faseColor: 'bg-amber-50 text-amber-600' })),
                          ...mockConcludedCertificatesExtravio.map(c => ({ ...c, _fase: 'Concluído', _faseColor: 'bg-emerald-50 text-emerald-600' })),
                        ].map((cert) => (
                          <tr
                            key={cert.id + cert._fase}
                            onClick={() => {
                              setSelectedHistoryCertificateExtravio(cert);
                              setCurrentView('certificate_history_extravio_detail');
                            }}
                            className="hover:bg-blue-50 cursor-pointer transition-colors group"
                          >
                            <td className="px-6 py-4 text-sm font-bold text-blue-600 group-hover:underline">{cert.id}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{cert.name}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{cert.birthDate}</td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-600">{cert.requestDate}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${cert._faseColor}`}>{cert._fase}</span>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic text-sm">Nenhum pedido encontrado.</td>
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

            ) : currentView === 'certificate_history_extravio_detail' && selectedHistoryCertificateExtravio ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pb-12"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Detalhe do Pedido</h2>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    selectedHistoryCertificateExtravio._fase === 'Concluído' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                    selectedHistoryCertificateExtravio._fase === 'Decisão' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                    'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}>{selectedHistoryCertificateExtravio._fase}</span>
                </div>

                {/* Devolução Warning */}
                {selectedHistoryCertificateExtravio.returnReason && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4 bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="p-2 bg-amber-100 rounded-xl flex-shrink-0">
                      <AlertTriangle size={20} className="text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-amber-900 leading-relaxed">
                        <span className="font-black">Motivo Devolução:</span> {selectedHistoryCertificateExtravio.returnReason}
                      </p>
                      <p className="text-[10px] text-amber-500 font-black uppercase tracking-wider mt-2">
                        {selectedHistoryCertificateExtravio.returnedAt} · {selectedHistoryCertificateExtravio.returnedBy}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Dados Biográficos */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioBiographic')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><User size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Dados Biográficos</span>
                    </div>
                    {expandedSections.extravioBiographic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioBiographic && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8 mt-1">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <DetailField label="Nome Completo" value={selectedHistoryCertificateExtravio.biographic.fullName} />
                            <DetailField label="Data Nascimento" value={selectedHistoryCertificateExtravio.biographic.birthDate} icon={Calendar} />
                            <DetailField label="Sexo" value={selectedHistoryCertificateExtravio.biographic.gender} />
                            <DetailField label="Estado Civil" value={selectedHistoryCertificateExtravio.biographic.civilStatus} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <DetailField label="Naturalidade" value={selectedHistoryCertificateExtravio.biographic.birthPlace} />
                            <DetailField label="Nacionalidade" value={selectedHistoryCertificateExtravio.biographic.nationality} />
                            <DetailField label="Nome Pai" value={selectedHistoryCertificateExtravio.biographic.fatherName} />
                            <DetailField label="Nome Mãe" value={selectedHistoryCertificateExtravio.biographic.motherName} />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <DetailField label="Tipo Documento" value={selectedHistoryCertificateExtravio.biographic.docType} />
                            <DetailField label="Número Documento" value={selectedHistoryCertificateExtravio.biographic.docNumber} />
                          </div>
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endereço</h4>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                              <DetailField label="Ilha" value={selectedHistoryCertificateExtravio.address.island} />
                              <DetailField label="Conselho" value={selectedHistoryCertificateExtravio.address.council} />
                              <DetailField label="Freguesia" value={selectedHistoryCertificateExtravio.address.parish} />
                              <DetailField label="Localidade" value={selectedHistoryCertificateExtravio.address.locality} />
                              <DetailField label="Ponto de Referencia" value={selectedHistoryCertificateExtravio.address.reference} icon={MapPin} />
                            </div>
                          </div>
                          <div className="space-y-4 pt-4 border-t border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <DetailField label="Telemovel" value={selectedHistoryCertificateExtravio.contact.mobile} />
                              <DetailField label="Email" value={selectedHistoryCertificateExtravio.contact.email} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Documento Extraviado */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioDocuments')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><FileWarning size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Documento Extraviado</span>
                    </div>
                    {expandedSections.extravioDocuments ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioDocuments && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6 mt-1">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <DetailField label="Tipo Documento" value={selectedHistoryCertificateExtravio.documentosExtraviados.docType} />
                            <DetailField label="Número Documento" value={selectedHistoryCertificateExtravio.documentosExtraviados.docNumber} />
                            <DetailField label="Data Emissão" value={selectedHistoryCertificateExtravio.documentosExtraviados.docIssueDate} icon={Calendar} />
                            <DetailField label="Data Validade" value={selectedHistoryCertificateExtravio.documentosExtraviados.docExpiryDate} icon={Calendar} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Modelo de Certificado de Extravio */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioCertificateModel')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><FileText size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Modelo de Certificado de Extravio</span>
                    </div>
                    {expandedSections.extravioCertificateModel ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioCertificateModel && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-slate-200 p-8 rounded-2xl flex justify-center mt-1">
                          {(() => { const cert = selectedHistoryCertificateExtravio; const doc = cert.documentosExtraviados; return (
                          <div className="bg-white w-full max-w-3xl shadow-2xl p-12 space-y-8 font-serif text-slate-800 border border-slate-300">
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
                            <div className="text-center space-y-2">
                              <div className="inline-block border-2 border-slate-900 px-8 py-2">
                                <p className="text-sm font-black uppercase tracking-widest">Certificado de Extravio de Documento</p>
                                <p className="text-xs font-bold">N.º {cert.id}/2026</p>
                              </div>
                            </div>
                            <div className="space-y-6 text-justify leading-relaxed text-sm">
                              <p className="font-bold">ROBERTO CARLOS CENTEIO LIMA, Subintendente da Polícia Nacional e Diretor da Direção Central de Investigação Criminal da Polícia Nacional---------------------------------------</p>
                              <p>
                                <span className="font-bold">CERTIFICA</span>, a pedido do (a) interessado (a), que compareceu perante esta Direção o (a) cidadão (ã) Cabo-verdiano (a) senhor (a) <span className="font-bold uppercase underline">{cert.biographic.fullName}</span>, {cert.biographic.civilStatus}, nascido (a) em <span className="font-bold">{cert.biographic.birthDate}</span>, filho (a) de <span className="font-bold">{cert.biographic.fatherName}</span> e de <span className="font-bold">{cert.biographic.motherName}</span>, portador (a) de {cert.biographic.docType} Nº <span className="font-bold">{cert.biographic.docNumber}</span>, declarando o extravio do seu documento de identificação.
                              </p>
                              <div className="border-y-2 border-slate-900 py-3 text-center">
                                <p className="font-black uppercase tracking-widest">Documento Extraviado: {doc.docType} Nº {doc.docNumber}</p>
                                {(doc.docIssueDate || doc.docExpiryDate) && (
                                  <p className="text-xs font-bold normal-case tracking-normal mt-1">
                                    {doc.docIssueDate && <>Emitido em {doc.docIssueDate}</>}{doc.docIssueDate && doc.docExpiryDate ? ' · ' : ''}{doc.docExpiryDate && <>Válido até {doc.docExpiryDate}</>}
                                  </p>
                                )}
                              </div>
                              <p>Por ser verdade e haver sido solicitado pelo (a) interessado (a), manda passar o presente certificado, que vai devidamente assinado e autenticado com o carimbo a óleo em uso nesta Direção.</p>
                            </div>
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
                          ); })()}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Anexos */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioAnexos')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Paperclip size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Anexos</span>
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{selectedHistoryCertificateExtravio.attachments.length}</span>
                    </div>
                    {expandedSections.extravioAnexos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioAnexos && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-2 mt-1">
                          {selectedHistoryCertificateExtravio.attachments.map((file: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl">
                              <FileText size={18} className="text-slate-400" />
                              <span className="text-xs font-bold text-slate-900">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioObservations')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><MessageSquare size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Observações</span>
                    </div>
                    {expandedSections.extravioObservations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioObservations && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm space-y-4 mt-1">
                          {selectedHistoryCertificateExtravio.observations.map((obs: any, idx: number) => (
                            <div key={idx} className="p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center"><ImageIcon size={20} className="text-slate-400" /></div>
                                <div>
                                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{obs.user}</p>
                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{obs.date}</p>
                                </div>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">{obs.text}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Histórico */}
                <div className="space-y-2">
                  <button onClick={() => toggleSection('extravioHistory')} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><History size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Histórico do Pedido</span>
                    </div>
                    {expandedSections.extravioHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <AnimatePresence>
                    {expandedSections.extravioHistory && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm mt-1">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
                                  <th className="px-6 py-4">Data</th>
                                  <th className="px-6 py-4">Fase</th>
                                  <th className="px-6 py-4">Estado</th>
                                  <th className="px-6 py-4">Utente</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {selectedHistoryCertificateExtravio.history.map((h: any, idx: number) => (
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-start pt-8 border-t border-slate-100">
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('certificate_history_extravio')}>Voltar</Button>
                </div>
              </motion.div>

            ) : currentView === 'parametrizacoes' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8 pb-12"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Parametrizações</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gestão dos domínios do sistema</p>
                  </div>
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('dashboard')}>Voltar</Button>
                </div>

                {/* Tab bar */}
                <div className="flex gap-2">
                  {([['domains', 'Domínios'], ['groups', 'Grupos']] as const).map(([tab, label]) => (
                    <button
                      key={tab}
                      onClick={() => setActiveParamTab(tab)}
                      className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                        activeParamTab === tab ? 'bg-slate-900 text-white' : 'bg-white border-2 border-slate-100 text-slate-500 hover:text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* ── TAB: Domínios ── */}
                {activeParamTab === 'domains' && (
                <div className="flex gap-6 items-start">

                  {/* Left sidebar — domain list */}
                  <div className="w-64 flex-shrink-0 bg-white border-2 border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-4 py-4 border-b-2 border-slate-100 bg-slate-50">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Domínios</p>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {Object.keys(paramDomains).map((domain) => {
                        const total = (paramDomains[domain] || []).length;
                        const active = (paramDomains[domain] || []).filter((p: any) => p.estado === 'Ativo').length;
                        const isSelected = selectedDomain === domain;
                        return (
                          <button
                            key={domain}
                            onClick={() => { setSelectedDomain(domain); setShowAddParam(false); setEditingParamId(null); }}
                            className={`w-full text-left px-4 py-3.5 flex items-center justify-between transition-all group ${
                              isSelected ? 'bg-slate-900' : 'hover:bg-slate-50'
                            }`}
                          >
                            <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>
                              {domain}
                            </span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {active}/{total}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right content */}
                  <div className="flex-1 bg-white border-2 border-slate-100 rounded-2xl shadow-sm overflow-hidden min-w-0">

                  {/* Add form */}
                  <AnimatePresence>
                    {showAddParam && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-5 bg-slate-50 border-b-2 border-slate-100 space-y-4">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Novo registo — {selectedDomain}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</label>
                              <input
                                type="text"
                                value={newParamData.valor}
                                onChange={(e) => setNewParamData({ ...newParamData, valor: e.target.value })}
                                placeholder="Ex: Auto de Busca"
                                className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Descrição</label>
                              <input
                                type="text"
                                value={newParamData.descricao}
                                onChange={(e) => setNewParamData({ ...newParamData, descricao: e.target.value })}
                                placeholder="Breve descrição do valor"
                                className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <button onClick={() => { setShowAddParam(false); setNewParamData({ valor: '', descricao: '' }); }} className="px-4 py-2 bg-white text-slate-700 border-2 border-slate-200 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
                              Cancelar
                            </button>
                            <button
                              onClick={() => {
                                if (!newParamData.valor.trim()) return;
                                setParamDomains(prev => ({
                                  ...prev,
                                  [selectedDomain]: [...(prev[selectedDomain] || []), { id: Date.now(), valor: newParamData.valor, descricao: newParamData.descricao, estado: 'Ativo', padrao: false }]
                                }));
                                setNewParamData({ valor: '', descricao: '' });
                                setShowAddParam(false);
                              }}
                              className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all"
                            >
                              <Plus size={14} />
                              Adicionar
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Table header */}
                  <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{selectedDomain}</span>
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                        {(paramDomains[selectedDomain] || []).length} registos
                      </span>
                    </div>
                    {!showAddParam && (
                      <button
                        onClick={() => setShowAddParam(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-700 transition-all"
                      >
                        <Plus size={13} />
                        Novo Registo
                      </button>
                    )}
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                          <th className="px-6 py-4 w-8">Nº</th>
                          <th className="px-6 py-4">Valor</th>
                          <th className="px-6 py-4">Descrição</th>
                          <th className="px-6 py-4">Estado</th>
                          <th className="px-6 py-4 text-center">Padrão</th>
                          <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {(paramDomains[selectedDomain] || []).slice().sort((a: any, b: any) => (a.valor || '').localeCompare(b.valor || '')).map((item: any, idx: number) => (
                          <tr key={item.id} className={`transition-colors ${item.estado === 'Inativo' ? 'opacity-50 bg-slate-50/50' : 'hover:bg-slate-50'}`}>
                            <td className="px-6 py-4 text-xs font-black text-slate-400">{(idx + 1).toString().padStart(2, '0')}</td>

                            {/* Valor — não editável */}
                            <td className="px-6 py-4">
                              <span className="text-sm font-bold text-slate-900">{item.valor}</span>
                            </td>

                            {/* Descrição — inline edit */}
                            <td className="px-6 py-4">
                              {editingParamId === item.id ? (
                                <input
                                  type="text"
                                  value={editingParamData.descricao}
                                  onChange={(e) => setEditingParamData({ ...editingParamData, descricao: e.target.value })}
                                  className="w-full px-3 py-1.5 bg-white border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-slate-900"
                                  autoFocus
                                />
                              ) : (
                                <span className="text-sm font-medium text-slate-500">{item.descricao || '---'}</span>
                              )}
                            </td>

                            {/* Estado */}
                            <td className="px-6 py-4">
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.estado === 'Ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                {item.estado}
                              </span>
                            </td>

                            {/* Padrão — só um por domínio, ajustável ao editar */}
                            <td className="px-6 py-4">
                              <div className="flex justify-center">
                                {editingParamId === item.id ? (
                                  <button
                                    type="button"
                                    onClick={() => setEditingParamData({ ...editingParamData, padrao: !editingParamData.padrao })}
                                    title={editingParamData.padrao ? 'Será o valor padrão' : 'Definir como padrão'}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border-2 ${
                                      editingParamData.padrao
                                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                                        : 'text-slate-400 border-slate-200 hover:text-amber-500 hover:border-amber-200 hover:bg-amber-50'
                                    }`}
                                  >
                                    <Star size={13} className={editingParamData.padrao ? 'fill-amber-500 text-amber-500' : ''} />
                                    {editingParamData.padrao ? 'Padrão' : 'Definir'}
                                  </button>
                                ) : item.padrao ? (
                                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-600" title="Valor padrão">
                                    <Star size={13} className="fill-amber-500 text-amber-500" />
                                    Padrão
                                  </span>
                                ) : (
                                  <Star size={13} className="text-slate-200" />
                                )}
                              </div>
                            </td>

                            {/* Ações */}
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                {editingParamId === item.id ? (
                                  <>
                                    <button
                                      onClick={() => {
                                        setParamDomains(prev => ({
                                          ...prev,
                                          [selectedDomain]: prev[selectedDomain].map((p: any) =>
                                            p.id === item.id
                                              ? { ...p, descricao: editingParamData.descricao, padrao: editingParamData.padrao }
                                              : { ...p, padrao: editingParamData.padrao ? false : p.padrao }
                                          )
                                        }));
                                        setEditingParamId(null);
                                      }}
                                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-700 transition-all"
                                    >
                                      <Check size={12} />
                                      Guardar
                                    </button>
                                    <button
                                      onClick={() => setEditingParamId(null)}
                                      className="px-3 py-1.5 bg-white text-slate-600 border-2 border-slate-200 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-all"
                                    >
                                      Cancelar
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {item.estado === 'Ativo' && (
                                      <button
                                        onClick={() => { setEditingParamId(item.id); setEditingParamData({ valor: item.valor, descricao: item.descricao || '', padrao: !!item.padrao }); }}
                                        className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                                        title="Editar"
                                      >
                                        <Edit size={15} />
                                      </button>
                                    )}
                                    <button
                                      onClick={() => {
                                        setParamDomains(prev => ({
                                          ...prev,
                                          [selectedDomain]: prev[selectedDomain].map((p: any) =>
                                            p.id === item.id ? { ...p, estado: p.estado === 'Ativo' ? 'Inativo' : 'Ativo' } : p
                                          )
                                        }));
                                      }}
                                      disabled={item.estado === 'Ativo' && item.padrao}
                                      title={item.estado === 'Ativo' && item.padrao ? 'Não é possível desativar o valor padrão' : undefined}
                                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-50 ${
                                        item.estado === 'Ativo'
                                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                      }`}
                                    >
                                      {item.estado === 'Ativo' ? 'Desativar' : 'Ativar'}
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                </div>
                )} {/* end TAB: Domínios */}


                {/* ── TAB: Grupos ── */}
                {activeParamTab === 'groups' && (
                <div className="bg-white border-2 border-slate-100 rounded-2xl shadow-sm overflow-hidden">

                  {/* Add form */}
                  <AnimatePresence>
                    {showAddParamGroup && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-6 py-5 bg-slate-50 border-b-2 border-slate-100 space-y-4">
                          <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Novo Grupo</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sigla</label>
                              <input type="text" value={newParamGroup.sigla} onChange={(e) => setNewParamGroup({ ...newParamGroup, sigla: e.target.value.toUpperCase() })} placeholder="Ex: TL" maxLength={6} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-black text-slate-900 outline-none focus:border-slate-900 transition-all uppercase" />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome</label>
                              <input type="text" value={newParamGroup.nome} onChange={(e) => setNewParamGroup({ ...newParamGroup, nome: e.target.value })} placeholder="Nome completo do grupo" className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                            </div>
                            <div className="space-y-1.5 md:col-span-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Área de Atuação</label>
                              <input type="text" value={newParamGroup.areaAtuacao} onChange={(e) => setNewParamGroup({ ...newParamGroup, areaAtuacao: e.target.value })} placeholder="Ex: Tráfico de estupefacientes, Furtos, ..." className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                            </div>
                          </div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-1 border-t border-slate-200">Endereço do Grupo</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ilha</label>
                              <select value={newParamGroup.ilha} onChange={(e) => setNewParamGroup({ ...newParamGroup, ilha: e.target.value })} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                <option value="">-- Selecionar --</option>
                                {['Santiago','São Vicente','Santo Antão','Fogo','Sal','Boavista','São Nicolau','Brava','Maio','Santa Luzia'].map(i => <option key={i}>{i}</option>)}
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cidade</label>
                              <input type="text" value={newParamGroup.cidade} onChange={(e) => setNewParamGroup({ ...newParamGroup, cidade: e.target.value })} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Freguesia</label>
                              <input type="text" value={newParamGroup.freguesia} onChange={(e) => setNewParamGroup({ ...newParamGroup, freguesia: e.target.value })} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Localidade</label>
                              <input type="text" value={newParamGroup.localidade} onChange={(e) => setNewParamGroup({ ...newParamGroup, localidade: e.target.value })} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Referência</label>
                              <input type="text" value={newParamGroup.referencia} onChange={(e) => setNewParamGroup({ ...newParamGroup, referencia: e.target.value })} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <button onClick={() => { setShowAddParamGroup(false); setNewParamGroup({ sigla: '', nome: '', areaAtuacao: '', ilha: '', cidade: '', freguesia: '', localidade: '', referencia: '' }); }} className="px-4 py-2 bg-white text-slate-700 border-2 border-slate-200 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">Cancelar</button>
                            <button
                              onClick={() => {
                                if (!newParamGroup.sigla.trim() || !newParamGroup.nome.trim()) return;
                                setParamGroups(prev => [...prev, { id: Date.now(), ...newParamGroup, estado: 'Ativo' }]);
                                setNewParamGroup({ sigla: '', nome: '', areaAtuacao: '', ilha: '', cidade: '', freguesia: '', localidade: '', referencia: '' });
                                setShowAddParamGroup(false);
                              }}
                              className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all"
                            >
                              <Plus size={14} /> Adicionar
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Table header */}
                  <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Grupos</span>
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{paramGroups.length} registos</span>
                    </div>
                    {!showAddParamGroup && (
                      <button onClick={() => setShowAddParamGroup(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-700 transition-all">
                        <Plus size={13} /> Novo Grupo
                      </button>
                    )}
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                          <th className="px-6 py-4 w-8">Nº</th>
                          <th className="px-6 py-4">Sigla</th>
                          <th className="px-6 py-4">Nome</th>
                          <th className="px-6 py-4">Área de Atuação</th>
                          <th className="px-6 py-4">Endereço</th>
                          <th className="px-6 py-4">Estado</th>
                          <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {paramGroups.map((grp: any, idx: number) => (
                          <tr key={grp.id} className={`transition-colors ${grp.estado === 'Inativo' ? 'opacity-50 bg-slate-50/50' : 'hover:bg-slate-50'}`}>
                            <td className="px-6 py-4 text-xs font-black text-slate-400">{(idx + 1).toString().padStart(2, '0')}</td>
                            <td className="px-6 py-4">
                              {editingParamGroupId === grp.id ? (
                                <input type="text" value={editingParamGroupData.sigla} onChange={(e) => setEditingParamGroupData({ ...editingParamGroupData, sigla: e.target.value.toUpperCase() })} maxLength={6} className="w-20 px-3 py-1.5 bg-white border-2 border-slate-900 rounded-lg text-sm font-black text-slate-900 outline-none uppercase" autoFocus />
                              ) : (
                                <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black rounded-md">{grp.sigla}</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {editingParamGroupId === grp.id ? (
                                <input type="text" value={editingParamGroupData.nome} onChange={(e) => setEditingParamGroupData({ ...editingParamGroupData, nome: e.target.value })} className="w-full px-3 py-1.5 bg-white border-2 border-slate-200 rounded-lg text-sm font-bold text-slate-900 outline-none focus:border-slate-900" />
                              ) : (
                                <span className="text-sm font-bold text-slate-900">{grp.nome}</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {editingParamGroupId === grp.id ? (
                                <input type="text" value={editingParamGroupData.areaAtuacao} onChange={(e) => setEditingParamGroupData({ ...editingParamGroupData, areaAtuacao: e.target.value })} className="w-full px-3 py-1.5 bg-white border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-slate-900" />
                              ) : (
                                <span className="text-sm font-medium text-slate-500">{grp.areaAtuacao || '---'}</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-xs font-medium text-slate-500">
                              {editingParamGroupId === grp.id ? (
                                <div className="grid grid-cols-2 gap-2">
                                  <select value={editingParamGroupData.ilha} onChange={(e) => setEditingParamGroupData({ ...editingParamGroupData, ilha: e.target.value })} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-slate-900">
                                    <option value="">Ilha</option>
                                    {['Santiago','São Vicente','Santo Antão','Fogo','Sal','Boavista','São Nicolau','Brava','Maio','Santa Luzia'].map(i => <option key={i}>{i}</option>)}
                                  </select>
                                  <input type="text" placeholder="Cidade" value={editingParamGroupData.cidade} onChange={(e) => setEditingParamGroupData({ ...editingParamGroupData, cidade: e.target.value })} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-slate-900" />
                                  <input type="text" placeholder="Freguesia" value={editingParamGroupData.freguesia} onChange={(e) => setEditingParamGroupData({ ...editingParamGroupData, freguesia: e.target.value })} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-slate-900" />
                                  <input type="text" placeholder="Localidade" value={editingParamGroupData.localidade} onChange={(e) => setEditingParamGroupData({ ...editingParamGroupData, localidade: e.target.value })} className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-slate-900" />
                                  <input type="text" placeholder="Referência" value={editingParamGroupData.referencia} onChange={(e) => setEditingParamGroupData({ ...editingParamGroupData, referencia: e.target.value })} className="col-span-2 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-slate-900" />
                                </div>
                              ) : (
                                [grp.localidade, grp.freguesia, grp.cidade, grp.ilha].filter(Boolean).join(', ') || '---'
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${grp.estado === 'Ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{grp.estado}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                {editingParamGroupId === grp.id ? (
                                  <>
                                    <button
                                      onClick={() => {
                                        setParamGroups(prev => prev.map(g => g.id === grp.id ? { ...g, ...editingParamGroupData } : g));
                                        setEditingParamGroupId(null);
                                      }}
                                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-700 transition-all"
                                    >
                                      <Check size={12} /> Guardar
                                    </button>
                                    <button onClick={() => setEditingParamGroupId(null)} className="px-3 py-1.5 bg-white text-slate-600 border-2 border-slate-200 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-all">Cancelar</button>
                                  </>
                                ) : (
                                  <>
                                    {grp.estado === 'Ativo' && (
                                      <button onClick={() => { setEditingParamGroupId(grp.id); setEditingParamGroupData({ sigla: grp.sigla, nome: grp.nome, areaAtuacao: grp.areaAtuacao || '', ilha: grp.ilha || '', cidade: grp.cidade || '', freguesia: grp.freguesia || '', localidade: grp.localidade || '', referencia: grp.referencia || '' }); }} className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all" title="Editar">
                                        <Edit size={15} />
                                      </button>
                                    )}
                                    <button
                                      onClick={() => setParamGroups(prev => prev.map(g => g.id === grp.id ? { ...g, estado: g.estado === 'Ativo' ? 'Inativo' : 'Ativo' } : g))}
                                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-colors ${grp.estado === 'Ativo' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                                    >
                                      {grp.estado === 'Ativo' ? 'Desativar' : 'Ativar'}
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                )} {/* end TAB: Grupos */}

              </motion.div>

            ) : currentView === 'ficha_list' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Gestão de Fichas</h2>
                  <Button variant="secondary" icon={UserPlus} onClick={() => {
                    setNewFichaData(emptyNewFicha());
                    setNewFichaChars([]); setNewFichaNewChar({ name: '', value: '', observation: '' });
                    setNewFichaAddresses([]); setNewFichaNewAddress({ type: 'Residência', island: '', county: '', parish: '', locality: '', zone: '', reference: '' });
                    setNewFichaContacts([]); setNewFichaNewContact({ type: 'Telemovel', info: '' });
                    setNewFichaNicknames([]); setNewFichaNewNickname('');
                    setNewFichaReasons([]); setNewFichaNewReason({ type: 'Criminal', date: '', refNo: '', unit: '', sijNo: '', measures: '', auto_type: '', natureza: '', enquadramento: '', tipologia: '' });
                    setNewFichaObservations([]); setNewFichaNewObs('');
                    setNewFichaAttachments([]); setNewFichaNewAttach({ name: '', type: 'Documento' });
                    setNewFichaExpanded({ biographic: true, complementary: false, outras: false, motivo: false, biometric: false, observations: false, attachments: false });
                    setCurrentView('ficha_new');
                  }}>Nova Ficha</Button>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 px-8 pt-8 pb-6 border-b border-slate-100">
                    <div className="p-2 bg-slate-900 text-white rounded-lg"><Search size={16} /></div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex-1">Localizar Ficha</h3>
                    <button
                      type="button"
                      onClick={() => setShowFichaAdvancedFilters(v => !v)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all border-2 ${
                        showFichaAdvancedFilters
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:text-slate-900'
                      }`}
                    >
                      <SlidersHorizontal size={13} />
                      Filtros Avançados
                    </button>
                  </div>

                  <div className="px-8 py-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Número Ficha</label>
                        <input type="text" value={fichaSearchFilters.number} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, number: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" placeholder="Ex: FICAD-102/N-PR/2026" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome do Indivíduo</label>
                        <input type="text" value={fichaSearchFilters.name} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, name: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" placeholder="Nome completo" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Nascimento</label>
                        <input type="date" value={fichaSearchFilters.birthDate} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, birthDate: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                      </div>
                    </div>

                    <AnimatePresence>
                      {showFichaAdvancedFilters && (
                        <motion.div key="ficha-adv" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-6">
                          <div className="border-t border-slate-100 pt-5">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-4 border-slate-900 pl-3 mb-4">Dados do Motivo de Cadastro</p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comando</label>
                                <select value={fichaSearchFilters.comando} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, comando: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todos</option>
                                  <option value="Comando Regional Santiago Sul">Comando Regional Santiago Sul</option>
                                  <option value="Comando Regional Santiago Norte">Comando Regional Santiago Norte</option>
                                  <option value="Comando Regional Barlavento">Comando Regional Barlavento</option>
                                  <option value="Comando Regional Sotavento">Comando Regional Sotavento</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade</label>
                                <select value={fichaSearchFilters.unit} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, unit: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  <option value="ESF Praia">ESF Praia</option>
                                  <option value="ESF Mindelo">ESF Mindelo</option>
                                  <option value="DP Praia">DP Praia</option>
                                  <option value="DP Mindelo">DP Mindelo</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Auto</label>
                                <select value={fichaSearchFilters.auto_type} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, auto_type: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todos</option>
                                  <option>Auto de Detenção</option>
                                  <option>Auto de Notícia</option>
                                  <option>Auto de Ocorrência</option>
                                  <option>Auto de Apreensão</option>
                                  <option>Auto de Busca e Apreensão</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Crime</label>
                                <select value={fichaSearchFilters.tipo} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, tipo: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todos</option>
                                  <option value="Criminal">Criminal</option>
                                  <option value="Policial">Policial</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Natureza de Ocorrência</label>
                                <select value={fichaSearchFilters.natureza} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, natureza: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  <option>Crime contra as Pessoas</option>
                                  <option>Crime contra o Património</option>
                                  <option>Crime contra o Estado</option>
                                  <option>Crime contra a Ordem Pública</option>
                                  <option>Crime de Tráfico</option>
                                  <option>Contraordenação</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enquadramento</label>
                                <select value={fichaSearchFilters.enquadramento} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, enquadramento: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todos</option>
                                  <option>Ofensa à Integridade Física — Art. 131º CP</option>
                                  <option>Ofensa à Integridade Física Grave — Art. 132º CP</option>
                                  <option>Furto — Art. 195º CP</option>
                                  <option>Furto Qualificado — Art. 197º CP</option>
                                  <option>Roubo — Art. 200º CP</option>
                                  <option>Homicídio — Art. 122º CP</option>
                                  <option>Tráfico de Estupefacientes — Art. 15º DL 11/2021</option>
                                  <option>Corrupção — Art. 303º CP</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipologia</label>
                                <select value={fichaSearchFilters.tipologia} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, tipologia: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  <option>Detenção em Flagrante Delito</option>
                                  <option>Arguido</option>
                                  <option>Investigado</option>
                                  <option>Suspeito</option>
                                  <option>Testemunha</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nº Documento</label>
                                <input type="text" value={fichaSearchFilters.doc_number} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, doc_number: e.target.value})} placeholder="CNI, Passaporte, ..." className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all" />
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-slate-100 pt-5">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-4 border-slate-900 pl-3 mb-4">Residência</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ilha</label>
                                <select value={fichaSearchFilters.island} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, island: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  {['Santiago','São Vicente','Santo Antão','Fogo','Sal','Boavista','São Nicolau','Brava','Maio','Santa Luzia'].map(i => <option key={i}>{i}</option>)}
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Concelho</label>
                                <select value={fichaSearchFilters.municipality} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, municipality: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todos</option>
                                  {['Praia','Santa Catarina','Santa Cruz','São Domingos','São Lourenço dos Órgãos','São Miguel','São Salvador do Mundo','Tarrafal','Ribeira Grande de Santiago','Mindelo','Santa Catarina do Fogo','Sal Rei'].map(m => <option key={m}>{m}</option>)}
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Freguesia</label>
                                <select value={fichaSearchFilters.parish} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, parish: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  {['N.S Da Graça','São João Baptista','São Nicolau Tolentino','Santiago Maior','Santa Catarina','São Lourenço dos Órgãos','São Miguel Arcanjo','São Salvador do Mundo','Santo Amaro Abade','Nossa Senhora do Rosário'].map(p => <option key={p}>{p}</option>)}
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Localidade</label>
                                <select value={fichaSearchFilters.locality} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, locality: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  {['Cidade Da Praia','Palmarejo','Achada Santo António','Achada Grande Frente','Achada Grande Trás','Várzea','Terra Branca','Tira Chapéu','Calabaceira','Fazenda','Mindelo'].map(l => <option key={l}>{l}</option>)}
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zona</label>
                                <select value={fichaSearchFilters.zone} onChange={(e) => setFichaSearchFilters({...fichaSearchFilters, zone: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all appearance-none">
                                  <option value="">Todas</option>
                                  {['Txadinha','Monteagarro','Achadinha','Pensamento','Safende',"Ponta d'Água",'Eugénio Lima','Lém Cachorro','Cruz Vermelha','Bairro Craveiro Lopes'].map(z => <option key={z}>{z}</option>)}
                                </select>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                      <Button variant="outline" onClick={() => {
                        setFichaSearchFilters({
                          number: '', name: '', birthDate: '',
                          comando: '', unit: '', auto_type: '', natureza: '', enquadramento: '', tipologia: '', tipo: '', doc_number: '',
                          island: '', municipality: '', parish: '', locality: '', zone: ''
                        });
                        setFichaSearchResults(null);
                      }}>Limpar</Button>
                      <Button variant="primary" icon={Search} onClick={() => {
                        const f = fichaSearchFilters;
                        const results = fichas.filter((ficha) => {
                          if (f.number && !ficha.number.toLowerCase().includes(f.number.toLowerCase())) return false;
                          if (f.name && !ficha.name.toLowerCase().includes(f.name.toLowerCase())) return false;
                          if (f.birthDate && ficha.birthDate !== f.birthDate) return false;
                          if (f.doc_number && !(ficha.docNumber || '').toLowerCase().includes(f.doc_number.toLowerCase())) return false;

                          const reasons = ficha.registrationReasons || [];
                          if (f.comando && !reasons.some((r: any) => r.comando === f.comando)) return false;
                          if (f.unit && !reasons.some((r: any) => r.unit === f.unit)) return false;
                          if (f.auto_type && !reasons.some((r: any) => r.auto_type === f.auto_type)) return false;
                          if (f.tipo && !reasons.some((r: any) => r.type === f.tipo)) return false;
                          if (f.natureza && !reasons.some((r: any) => r.natureza === f.natureza)) return false;
                          if (f.enquadramento && !reasons.some((r: any) => r.enquadramento === f.enquadramento)) return false;
                          if (f.tipologia && !reasons.some((r: any) => r.tipologia === f.tipologia)) return false;

                          const addresses = ficha.addresses || [];
                          const matchesAddress = (key: string, val: string) => !val || addresses.some((a: any) => a[key] === val) || (key === 'island' && ficha.island === val);
                          if (f.island && !matchesAddress('island', f.island)) return false;
                          if (f.municipality && !addresses.some((a: any) => a.council === f.municipality)) return false;
                          if (f.parish && !addresses.some((a: any) => a.parish === f.parish)) return false;
                          if (f.locality && !addresses.some((a: any) => a.locality === f.locality)) return false;
                          if (f.zone && !addresses.some((a: any) => a.zone === f.zone)) return false;

                          return true;
                        });
                        setFichaSearchResults(results);
                      }}>Pesquisar</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Fichas Registradas</h3>
                    <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-tighter">Total : {(fichaSearchResults !== null ? fichaSearchResults : fichas).length.toString().padStart(2, '0')}</span>
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
                        {(fichaSearchResults !== null ? fichaSearchResults : fichas).map((f, idx) => (
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
            ) : currentView === 'ficha_new' ? (
              (() => {
                const nfAccordion = (key: string, label: string, icon: any, badge?: number) => {
                  const Icon = icon;
                  return (
                    <button onClick={() => toggleNewFicha(key)} className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-900 text-white rounded-lg"><Icon size={18} /></div>
                        <span className="uppercase tracking-widest text-xs">{label}</span>
                        {badge !== undefined && badge > 0 && <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full">{badge}</span>}
                      </div>
                      {newFichaExpanded[key] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  );
                };
                const today = new Date().toISOString().slice(0,10);
                const saveHandler = () => {
                  if (!newFichaData.name) return;
                  const newId = fichas.length + 1;
                  const councilCode = (newFichaAddresses[0]?.council || 'Praia').slice(0, 2).toUpperCase();
                  const newNum = `FICAD-${newId}/N-${councilCode}/${new Date().getFullYear()}`;
                  const newFicha: any = {
                    id: newId, number: newNum, estado: 'Por Completar',
                    name: newFichaData.name, birthDate: newFichaData.birthDate,
                    island: newFichaAddresses[0]?.island || newFichaData.birthPlace || '',
                    birthPlace: newFichaData.birthPlace, gender: newFichaData.gender,
                    civilStatus: newFichaData.civilStatus, nationality: newFichaData.nationality,
                    fatherName: newFichaData.fatherName, motherName: newFichaData.motherName,
                    nif: newFichaData.nif, profession: newFichaData.profession,
                    docType: newFichaData.docType, docNumber: newFichaData.docNumber,
                    docIssueDate: newFichaData.docIssueDate, docExpiryDate: newFichaData.docExpiryDate,
                    docIssueLocation: newFichaData.docIssueLocation, photo: newFichaData.photo,
                    addresses: newFichaAddresses,
                    contacts: newFichaContacts,
                    nicknames: newFichaNicknames.map((v, i) => ({ id: i+1, createdAt: today, validFrom: today, validTo: null, user: user?.name || 'Admin', value: v })),
                    complementaryGroups: newFichaChars.length > 0 ? [{ id: 1, createdAt: today, validFrom: today, validTo: null, user: user?.name || 'Admin', otherNotes: '', characteristics: newFichaChars }] : [],
                    registrationReasons: newFichaReasons,
                    observations: newFichaObservations,
                    attachments: newFichaAttachments,
                    photoHistory: [],
                  };
                  setFichas([...fichas, newFicha]);
                  setSuccessMessage(`Ficha N.º ${newNum} criada com sucesso.`);
                  setShowSuccessModal(true);
                  setCurrentView('ficha_list');
                };
                return (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pb-12">
                    {/* Header */}
                    <div className="border-b-2 border-slate-100 pb-4 mb-4">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Nova Ficha de Cadastro</h2>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Preencha os dados do indivíduo</p>
                    </div>

                    {/* ── Accordion: Dados Biográficos ── */}
                    <div className="space-y-3">
                      {nfAccordion('biographic', 'Dados Biográficos', User)}
                      <AnimatePresence>
                        {newFichaExpanded.biographic && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                              {/* Document search */}
                              <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 space-y-4">
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Pré-preencher a partir de documento</p>
                                <div className="flex flex-col md:flex-row gap-4 items-end">
                                  <div className="w-full md:w-32 space-y-2">
                                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Tipo Doc</label>
                                    <select value={bioSearchDocType} onChange={(e) => setBioSearchDocType(e.target.value)} className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all">
                                      {['CNI','Passaporte','TRE','BI'].map(o => <option key={o}>{o}</option>)}
                                    </select>
                                  </div>
                                  <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">N.º Documento</label>
                                    <input type="text" value={bioSearchDocNumber} onChange={(e) => setBioSearchDocNumber(e.target.value)} placeholder="Número do documento..." className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all" />
                                  </div>
                                  <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Nome</label>
                                    <input type="text" value={bioSearchName} onChange={(e) => setBioSearchName(e.target.value)} placeholder="Nome da pessoa..." className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-600 transition-all" />
                                  </div>
                                  <Button variant="secondary" icon={Search} onClick={() => { setBioSearchTarget('ficha'); handleBioSearch(); }}>Pesquisar</Button>
                                </div>
                              </div>

                              {/* Dados pessoais */}
                              <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Dados Pessoais</h3>
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                  {newFichaData.photo && (
                                    <div className="w-28 h-36 rounded-2xl border-4 border-white shadow-xl overflow-hidden shrink-0 bg-slate-100">
                                      <img src={newFichaData.photo} alt="Foto" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    </div>
                                  )}
                                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="md:col-span-2"><DetailField label="Nome Completo *" value={newFichaData.name} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, name: v})} /></div>
                                    <DetailField label="Data Nascimento" value={newFichaData.birthDate} type="date" readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, birthDate: v})} icon={Calendar} />
                                    <DetailField label="Sexo" value={newFichaData.gender} type="select" options={['','Masculino','Feminino']} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, gender: v})} />
                                    <DetailField label="Estado Civil" value={newFichaData.civilStatus} type="select" options={['','Solteiro(a)','Casado(a)','Divorciado(a)','Viúvo(a)','União de Facto']} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, civilStatus: v})} />
                                    <DetailField label="Naturalidade" value={newFichaData.birthPlace} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, birthPlace: v})} />
                                    <DetailField label="Nacionalidade" value={newFichaData.nationality} type="select" options={['','Cabo-verdiana','Portuguesa','Angolana','Senegalesa','Guineense','Outra']} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, nationality: v})} />
                                    <DetailField label="Nome do Pai" value={newFichaData.fatherName} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, fatherName: v})} />
                                    <DetailField label="Nome da Mãe" value={newFichaData.motherName} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, motherName: v})} />
                                    <DetailField label="Profissão" value={newFichaData.profession} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, profession: v})} />
                                  </div>
                                </div>
                              </div>

                              {/* Documento identificação */}
                              <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Documento de Identificação</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                  <DetailField label="NIF" value={newFichaData.nif} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, nif: v})} />
                                  <DetailField label="Tipo Documento" value={newFichaData.docType} type="select" options={['CNI','Passaporte','TRE','BI']} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, docType: v})} />
                                  <DetailField label="Número Documento" value={newFichaData.docNumber} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, docNumber: v})} />
                                  <DetailField label="Data Emissão" value={newFichaData.docIssueDate} type="date" readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, docIssueDate: v})} icon={Calendar} />
                                  <DetailField label="Data Validade" value={newFichaData.docExpiryDate} type="date" readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, docExpiryDate: v})} icon={Calendar} />
                                  <DetailField label="Local de Emissão" value={newFichaData.docIssueLocation} readOnly={false} onChange={(v) => setNewFichaData({...newFichaData, docIssueLocation: v})} />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ── Accordion: Sinais Complementares ── */}
                    <div className="space-y-3">
                      {nfAccordion('complementary', 'Sinais Complementares', Fingerprint, savedCharacteristics.length)}
                      <AnimatePresence>
                        {newFichaExpanded.complementary && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm mt-2">
                              {savedCharacteristics.length > 0 ? (
                                <div className="space-y-4">
                                  <div className="flex justify-end">
                                    <button
                                      onClick={() => { setTempCharacteristics([...savedCharacteristics]); setShowComplementaryModal(true); }}
                                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      <Edit size={18} />
                                    </button>
                                  </div>
                                  <div className="overflow-x-auto border border-slate-900">
                                    <table className="w-full text-left border-collapse">
                                      <thead>
                                        <tr className="bg-slate-200 text-[11px] font-bold text-slate-900 border-b border-slate-900">
                                          <th className="px-4 py-2 border-r border-slate-900">Característica</th>
                                          <th className="px-4 py-2 border-r border-slate-900">Valor</th>
                                          <th className="px-4 py-2">Observação</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {savedCharacteristics.map((char: any, idx: number) => (
                                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                            <td className="px-4 py-2 text-xs border-r border-slate-900">{char.name}</td>
                                            <td className="px-4 py-2 text-xs border-r border-slate-900">{char.type}</td>
                                            <td className="px-4 py-2 text-xs">{char.observation}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
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
                    </div>

                    {/* ── Accordion: Outras Informações ── */}
                    <div className="space-y-3">
                      {nfAccordion('outras', 'Outras Informações', Info, newFichaAddresses.length + newFichaContacts.length + newFichaNicknames.length)}
                      <AnimatePresence>
                        {newFichaExpanded.outras && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-10">

                              {/* Moradas */}
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Moradas</h4>
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo</label>
                                      <select value={newFichaNewAddress.type} onChange={(e) => setNewFichaNewAddress({...newFichaNewAddress, type: e.target.value})} className="w-full px-3 py-2 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                        {['Residência','Trabalho','Outro'].map(o => <option key={o}>{o}</option>)}
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ilha</label>
                                      <select value={newFichaNewAddress.island} onChange={(e) => setNewFichaNewAddress({...newFichaNewAddress, island: e.target.value})} className="w-full px-3 py-2 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                        <option value="">Selecione...</option>
                                        {['Santiago','São Vicente','Sal','Boa Vista','Fogo','Santo Antão','Maio','Brava','São Nicolau'].map(o => <option key={o}>{o}</option>)}
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conselho</label>
                                      <input type="text" value={newFichaNewAddress.county} onChange={(e) => setNewFichaNewAddress({...newFichaNewAddress, county: e.target.value})} className="w-full px-3 py-2 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Freguesia</label>
                                      <input type="text" value={newFichaNewAddress.parish} onChange={(e) => setNewFichaNewAddress({...newFichaNewAddress, parish: e.target.value})} className="w-full px-3 py-2 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Localidade</label>
                                      <input type="text" value={newFichaNewAddress.locality} onChange={(e) => setNewFichaNewAddress({...newFichaNewAddress, locality: e.target.value})} className="w-full px-3 py-2 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zona</label>
                                      <input type="text" value={newFichaNewAddress.zone} onChange={(e) => setNewFichaNewAddress({...newFichaNewAddress, zone: e.target.value})} className="w-full px-3 py-2 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ponto de Referência</label>
                                      <input type="text" value={newFichaNewAddress.reference} onChange={(e) => setNewFichaNewAddress({...newFichaNewAddress, reference: e.target.value})} className="w-full px-3 py-2 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <Button variant="primary" icon={Plus} onClick={() => {
                                      if (!newFichaNewAddress.island) return;
                                      setNewFichaAddresses([...newFichaAddresses, { ...newFichaNewAddress, id: Date.now(), createdAt: today, validFrom: today, validTo: null, user: user?.name || 'Admin' }]);
                                      setNewFichaNewAddress({ type: 'Residência', island: '', county: '', parish: '', locality: '', zone: '', reference: '' });
                                    }}>Adicionar Morada</Button>
                                  </div>
                                </div>
                                {newFichaAddresses.length > 0 && (
                                  <div className="space-y-2">
                                    {newFichaAddresses.map((a, i) => (
                                      <div key={i} className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-3 flex-1">
                                          <span className="text-[10px] font-black bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full uppercase">{a.type}</span>
                                          <MapPin size={14} className="text-slate-400" />
                                          <span className="text-sm font-bold text-slate-900">{[a.locality, a.parish, a.county, a.island].filter(Boolean).join(', ')}</span>
                                          {a.reference && <span className="text-xs text-slate-400">— {a.reference}</span>}
                                        </div>
                                        <button onClick={() => setNewFichaAddresses(newFichaAddresses.filter((_,j)=>j!==i))} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Contactos */}
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Contactos</h4>
                                <div className="flex gap-4 items-end">
                                  <div className="w-40 space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo</label>
                                    <select value={newFichaNewContact.type} onChange={(e) => setNewFichaNewContact({...newFichaNewContact, type: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                      {['Telemovel','Email','Telefone fixo','Facebook','Instagram','Twitter / X','LinkedIn','TikTok','WhatsApp','Outro'].map(o => <option key={o}>{o}</option>)}
                                    </select>
                                  </div>
                                  <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto</label>
                                    <input type="text" value={newFichaNewContact.info} onChange={(e) => setNewFichaNewContact({...newFichaNewContact, info: e.target.value})} placeholder="Número ou email..." className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                                  </div>
                                  <Button variant="primary" icon={Plus} onClick={() => {
                                    if (!newFichaNewContact.info) return;
                                    setNewFichaContacts([...newFichaContacts, { ...newFichaNewContact, id: Date.now(), validFrom: today, validTo: null, user: user?.name || 'Admin' }]);
                                    setNewFichaNewContact({ type: newFichaNewContact.type, info: '' });
                                  }}>Adicionar</Button>
                                </div>
                                {newFichaContacts.length > 0 && (
                                  <div className="space-y-2">
                                    {newFichaContacts.map((c, i) => (
                                      <div key={i} className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                                        <span className="text-[10px] font-black text-slate-500 uppercase w-28">{c.type}</span>
                                        <span className="text-sm font-bold text-slate-900 flex-1">{c.info}</span>
                                        <button onClick={() => setNewFichaContacts(newFichaContacts.filter((_,j)=>j!==i))} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Alcunhas */}
                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Alcunhas</h4>
                                <div className="flex gap-4 items-end">
                                  <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alcunha</label>
                                    <input type="text" value={newFichaNewNickname} onChange={(e) => setNewFichaNewNickname(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && newFichaNewNickname) { setNewFichaNicknames([...newFichaNicknames, newFichaNewNickname]); setNewFichaNewNickname(''); } }} placeholder="Ex: Manxedo..." className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                                  </div>
                                  <Button variant="primary" icon={Plus} onClick={() => { if (!newFichaNewNickname) return; setNewFichaNicknames([...newFichaNicknames, newFichaNewNickname]); setNewFichaNewNickname(''); }}>Adicionar</Button>
                                </div>
                                {newFichaNicknames.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {newFichaNicknames.map((n, i) => (
                                      <span key={i} className="flex items-center gap-2 bg-slate-100 text-slate-800 text-xs font-black px-3 py-1.5 rounded-full">
                                        {n}<button onClick={() => setNewFichaNicknames(newFichaNicknames.filter((_,j)=>j!==i))} className="text-slate-400 hover:text-red-600 transition-colors"><X size={12} /></button>
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ── Accordion: Motivo de Cadastro ── */}
                    <div className="space-y-3">
                      {nfAccordion('motivo', 'Motivo de Cadastro', ClipboardList, newFichaReasons.length)}
                      <AnimatePresence>
                        {newFichaExpanded.motivo && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
                              <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 space-y-6">
                                {/* Linha 1 — Tipo, Tipo de Auto, Data */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo *</label>
                                    <select value={newFichaNewReason.type} onChange={(e) => setNewFichaNewReason({...newFichaNewReason, type: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                      <option value="Criminal">Criminal</option>
                                      <option value="Policial">Policial</option>
                                    </select>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Auto</label>
                                    <select value={newFichaNewReason.auto_type} onChange={(e) => setNewFichaNewReason({...newFichaNewReason, auto_type: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                      <option value="">Selecione...</option>
                                      <option>Auto de Notícia</option>
                                      <option>Auto de Detenção</option>
                                      <option>Auto de Flagrante Delito</option>
                                      <option>Auto de Ocorrência</option>
                                      <option>Auto de Apreensão</option>
                                      <option>Outro</option>
                                    </select>
                                  </div>
                                  <DetailField label="Data" value={newFichaNewReason.date} type="date" readOnly={false} icon={Calendar} onChange={(v) => setNewFichaNewReason({...newFichaNewReason, date: v})} />
                                </div>
                                {/* Linha 2 — Natureza, Enquadramento, Tipologia */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Natureza de Ocorrência</label>
                                    <select value={newFichaNewReason.natureza} onChange={(e) => setNewFichaNewReason({...newFichaNewReason, natureza: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                      <option value="">Selecione...</option>
                                      <option>Crime contra o Património</option>
                                      <option>Crime contra as Pessoas</option>
                                      <option>Crime contra a Ordem Pública</option>
                                      <option>Crime contra o Estado</option>
                                      <option>Crime contra a Família</option>
                                      <option>Crime de Droga / Tráfico</option>
                                      <option>Crime de Natureza Sexual</option>
                                      <option>Outro</option>
                                    </select>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enquadramento de Crime</label>
                                    <select value={newFichaNewReason.enquadramento} onChange={(e) => setNewFichaNewReason({...newFichaNewReason, enquadramento: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                      <option value="">Selecione...</option>
                                      <option>Furto Simples — Art. 193º CP</option>
                                      <option>Furto Qualificado — Art. 197º CP</option>
                                      <option>Roubo — Art. 200º CP</option>
                                      <option>Homicídio — Art. 122º CP</option>
                                      <option>Ofensa à Integridade Física — Art. 131º CP</option>
                                      <option>Violência Doméstica — Art. 134º CP</option>
                                      <option>Tráfico de Droga — Lei 78/III/90</option>
                                      <option>Desordem Pública — Art. 279º CP</option>
                                      <option>Resistência à Autoridade — Art. 283º CP</option>
                                      <option>Outro</option>
                                    </select>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipologia</label>
                                    <select value={newFichaNewReason.tipologia} onChange={(e) => setNewFichaNewReason({...newFichaNewReason, tipologia: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                      <option value="">Selecione...</option>
                                      <option>Detenção em Flagrante Delito</option>
                                      <option>Suspeito de Crime</option>
                                      <option>Arguido</option>
                                      <option>Investigado</option>
                                      <option>Condenado</option>
                                      <option>Reincidente</option>
                                      <option>Outro</option>
                                    </select>
                                  </div>
                                </div>
                                {/* Linha 3 — Unidade, Nº SIJ */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade</label>
                                    <select value={newFichaNewReason.unit} onChange={(e) => setNewFichaNewReason({...newFichaNewReason, unit: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                      <option value="">Selecione...</option>
                                      <option>ESF Praia</option>
                                      <option>ESF Mindelo</option>
                                      <option>ESF Santa Catarina</option>
                                      <option>ESF São Vicente</option>
                                      <option>DP Praia</option>
                                      <option>DP Mindelo</option>
                                      <option>DP Santa Cruz</option>
                                      <option>DP Tarrafal</option>
                                    </select>
                                  </div>
                                  <DetailField label="Nº SIJ" value={newFichaNewReason.sijNo} readOnly={false} onChange={(v) => setNewFichaNewReason({...newFichaNewReason, sijNo: v})} />
                                </div>
                                {/* Linha 4 — Nº Ocorrência, Medidas */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <DetailField label="Nº Ocorrência" value={newFichaNewReason.refNo} readOnly={false} onChange={(v) => setNewFichaNewReason({...newFichaNewReason, refNo: v})} />
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medidas Aplicadas</label>
                                    <select value={newFichaNewReason.measures} onChange={(e) => setNewFichaNewReason({...newFichaNewReason, measures: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                      <option value="">Selecione...</option>
                                      <option>Prisão Preventiva</option>
                                      <option>Termo de Identidade e Residência</option>
                                      <option>Liberdade Provisória</option>
                                      <option>Obrigação de Apresentação Periódica</option>
                                      <option>Proibição de Contacto</option>
                                      <option>Suspensão de Pena</option>
                                      <option>Multa</option>
                                      <option>Sem medidas aplicadas</option>
                                      <option>Outro</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="flex justify-end">
                                  <Button variant="primary" icon={Plus} onClick={() => {
                                    if (!newFichaNewReason.natureza) return;
                                    setNewFichaReasons([...newFichaReasons, { ...newFichaNewReason, id: Date.now(), status: 'Ativo' }]);
                                    setNewFichaNewReason({ type: 'Criminal', date: '', refNo: '', unit: '', sijNo: '', measures: '', auto_type: '', natureza: '', enquadramento: '', tipologia: '' });
                                  }}>Adicionar Motivo</Button>
                                </div>
                              </div>
                              {newFichaReasons.length > 0 ? (
                                <div className="space-y-3">
                                  {newFichaReasons.map((r, i) => (
                                    <div key={i} className="relative bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                                      <button onClick={() => setNewFichaReasons(newFichaReasons.filter((_,j)=>j!==i))} className="absolute top-3 right-3 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all z-10" title="Remover"><Trash2 size={14} /></button>
                                      <div className="px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="space-y-0.5">
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nº Ocorrência</p>
                                          <p className="text-xs font-bold text-slate-800">{r.refNo || '---'}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Data</p>
                                          <p className="text-xs font-bold text-slate-800">{r.date || '---'}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tipo de Auto</p>
                                          <p className="text-xs font-bold text-slate-800">{r.auto_type || '---'}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tipo</p>
                                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${r.type === 'Criminal' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>{r.type}</span>
                                        </div>
                                        <div className="space-y-0.5">
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Natureza de Ocorrência</p>
                                          <p className="text-xs font-bold text-slate-800">{r.natureza || '---'}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Enquadramento</p>
                                          <p className="text-xs font-bold text-slate-800">{r.enquadramento || '---'}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tipologia</p>
                                          <p className="text-xs font-bold text-slate-800">{r.tipologia || '---'}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Unidade</p>
                                          <p className="text-xs font-bold text-slate-800">{r.unit || '---'}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nº SIJ</p>
                                          <p className="text-xs font-bold text-slate-800">{r.sijNo || '---'}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Medidas</p>
                                          <p className="text-xs font-bold text-slate-800">{r.measures || '---'}</p>
                                        </div>
                                        <div className="space-y-0.5">
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Estado</p>
                                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">Ativo</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl">
                                  <ClipboardList size={32} className="mx-auto text-slate-300 mb-3" /><p className="text-sm font-bold text-slate-400">Nenhum motivo adicionado</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ── Accordion: Dados Biométricos ── */}
                    <div className="space-y-3">
                      {nfAccordion('biometric', 'Dados Biométricos', Camera)}
                      <AnimatePresence>
                        {newFichaExpanded.biometric && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-8">
                              {/* Fotografias */}
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fotografias de Registo</h4>
                                  <button
                                    onClick={() => { setTempPhotos([...savedPhotos]); setShowPhotoModal(true); }}
                                    className="px-4 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors text-xs border-2 border-slate-900 shadow-sm flex items-center gap-2"
                                  >
                                    <Camera size={14} />
                                    Adicionar Fotografia +
                                  </button>
                                </div>
                                {savedPhotos.length > 0 && (
                                  <div className="bg-slate-50 border-2 border-slate-900 p-8 rounded-sm">
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                                      {savedPhotos.map((photo, idx) => (
                                        <div key={idx} className="flex flex-col items-center space-y-4">
                                          <div className="w-full aspect-[3/4] bg-white shadow-lg overflow-hidden border border-slate-200">
                                            <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                                          </div>
                                          <p className="text-sm font-bold text-slate-900">{photo.title}</p>
                                          <button
                                            onClick={() => setSavedPhotos(savedPhotos.filter((_, i) => i !== idx))}
                                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                                          >
                                            <Trash2 size={16} />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ── Accordion: Observações ── */}
                    <div className="space-y-3">
                      {nfAccordion('observations', 'Observações', MessageSquare, newFichaObservations.length)}
                      <AnimatePresence>
                        {newFichaExpanded.observations && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
                              <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nova Observação</label>
                                <textarea value={newFichaNewObs} onChange={(e) => setNewFichaNewObs(e.target.value)} rows={3} placeholder="Escreva uma observação..." className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-slate-900 resize-none transition-all" />
                                <div className="flex justify-end">
                                  <Button variant="primary" icon={Plus} onClick={() => {
                                    if (!newFichaNewObs.trim()) return;
                                    setNewFichaObservations([...newFichaObservations, { content: newFichaNewObs.trim(), author: user?.name || 'Admin', date: today }]);
                                    setNewFichaNewObs('');
                                  }}>Adicionar Observação</Button>
                                </div>
                              </div>
                              {newFichaObservations.length > 0 && (
                                <div className="space-y-4">
                                  {newFichaObservations.map((o, i) => (
                                    <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shrink-0">
                                        {o.author.charAt(0).toUpperCase()}
                                      </div>
                                      <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-3">
                                          <p className="font-black text-slate-900 text-xs uppercase tracking-widest">{o.author}</p>
                                          <span className="text-[10px] font-bold text-slate-400">{o.date}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium italic">"{o.content}"</p>
                                      </div>
                                      <button onClick={() => setNewFichaObservations(newFichaObservations.filter((_,j)=>j!==i))} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14} /></button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ── Accordion: Anexos ── */}
                    <div className="space-y-3">
                      {nfAccordion('attachments', 'Anexos', Paperclip, savedAttachments.length)}
                      <AnimatePresence>
                        {newFichaExpanded.attachments && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm mt-2 space-y-6">
                              <div className="flex justify-end">
                                <button
                                  onClick={() => setShowAttachmentModal(true)}
                                  className="px-4 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors text-xs border-2 border-slate-900 shadow-sm flex items-center gap-2"
                                >
                                  <Plus size={16} />
                                  Adicionar Anexo
                                </button>
                              </div>
                              {savedAttachments.length > 0 ? (
                                <div className="space-y-2">
                                  {savedAttachments.map((att, idx) => {
                                    const isImg = att.type === 'Imagem';
                                    return (
                                      <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-slate-200 transition-all">
                                        <div className={`p-3 rounded-xl flex-shrink-0 ${isImg ? 'bg-blue-100 text-blue-600' : att.type === 'Relatório' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>
                                          {isImg ? <ImageIcon size={20} /> : <FileText size={20} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-black text-slate-900 truncate">{att.title}</p>
                                          <p className="text-[10px] text-slate-400 mt-1"><span className="font-bold">{att.type}</span> · {att.date}</p>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Visualizar"><Eye size={16} /></button>
                                          <button onClick={() => setSavedAttachments(savedAttachments.filter((_, i) => i !== idx))} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Eliminar"><Trash2 size={16} /></button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-xl">
                                  <Paperclip size={28} className="mx-auto text-slate-200 mb-2" />
                                  <p className="text-slate-400 text-sm italic">Nenhum anexo associado</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom save bar */}
                    <div className="sticky bottom-0 bg-white border-t-2 border-slate-100 px-0 py-4 flex justify-between items-center">
                      <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('ficha_list')}>Cancelar</Button>
                      <Button variant="success" icon={CheckCircle} onClick={saveHandler}>Gravar Ficha</Button>
                    </div>
                  </motion.div>
                );
              })()

            ) : currentView === 'ficha_detail' && selectedFicha ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 pb-12"
              >
                <div className="flex justify-between items-center border-b-2 border-slate-100 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Ficha de Cadastro</h2>
                    <div className="flex items-center gap-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registro Individual N.º {selectedFicha.number}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${(selectedFicha.estado || 'Por Completar') === 'Completo' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {selectedFicha.estado || 'Por Completar'}
                      </span>
                    </div>
                  </div>
                  <Button variant="success" icon={FileText} onClick={() => {
                    const reasons = selectedFicha.registrationReasons || [];
                    setExportOptions({ photo: true, sinalComplementar: true, outrasInfo: false, motivoIds: reasons.map((r: any) => r.id) });
                    setShowExportSelectModal(true);
                  }}>Exportar PDF</Button>
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
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditBiographicData({
                            name: selectedFicha.name || '',
                            birthDate: selectedFicha.birthDate || '',
                            gender: selectedFicha.gender || 'Masculino',
                            civilStatus: selectedFicha.civilStatus || '',
                            birthPlace: selectedFicha.birthPlace || '',
                            nationality: selectedFicha.nationality || '',
                            fatherName: selectedFicha.fatherName || '',
                            motherName: selectedFicha.motherName || '',
                            profession: selectedFicha.profession || '',
                            nif: selectedFicha.nif || '',
                          });
                          setShowEditBiographic(true);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-200 transition-all"
                      >
                        <Edit size={13} />
                        Editar
                      </button>
                      {expandedSections.biographic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
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
                            <DetailField label="Nome Completo" value={selectedFicha.name || ''} readOnly={false} onChange={(val) => setSelectedFicha({...selectedFicha, name: val})} />
                            <DetailField label="Data Nascimento" value={selectedFicha.birthDate || ''} type="date" icon={Calendar} readOnly={false} onChange={(val) => setSelectedFicha({...selectedFicha, birthDate: val})} />
                            <DetailField label="Sexo" value={selectedFicha.gender || 'Masculino'} type="select" options={['Masculino', 'Feminino']} readOnly={false} onChange={(val) => setSelectedFicha({...selectedFicha, gender: val})} />
                            <DetailField label="Estado Civil" value={selectedFicha.civilStatus || ''} type="select" options={['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União de facto']} readOnly={false} onChange={(val) => setSelectedFicha({...selectedFicha, civilStatus: val})} />
                            <DetailField label="Naturalidade" value={selectedFicha.birthPlace || ''} readOnly={false} onChange={(val) => setSelectedFicha({...selectedFicha, birthPlace: val})} />
                            <DetailField label="Nacionalidade" value={selectedFicha.nationality || ''} readOnly={false} onChange={(val) => setSelectedFicha({...selectedFicha, nationality: val})} />
                            <DetailField label="Nome Pai" value={selectedFicha.fatherName || ''} readOnly={false} onChange={(val) => setSelectedFicha({...selectedFicha, fatherName: val})} />
                            <DetailField label="Nome Mãe" value={selectedFicha.motherName || ''} readOnly={false} onChange={(val) => setSelectedFicha({...selectedFicha, motherName: val})} />
                            <DetailField label="Profissão" value={selectedFicha.profession || ''} readOnly={false} onChange={(val) => setSelectedFicha({...selectedFicha, profession: val})} />
                            <DetailField label="NIF" value={selectedFicha.nif || ''} readOnly={false} onChange={(val) => setSelectedFicha({...selectedFicha, nif: val})} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion: Sinais Complementares */}
                <div className="space-y-4">
                  <div
                    onClick={() => toggleSection('complementary')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Fingerprint size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Sinais Complementares</span>
                    </div>
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => { setShowComplementaryModal(true); if (!expandedSections.complementary) toggleSection('complementary'); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-700 transition-all"
                      >
                        <Plus size={13} /> Adicionar
                      </button>
                      {expandedSections.complementary ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                  
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
                          {/* Documento de Identificação */}
                          <div className="space-y-4">
                            <AnimatePresence>
                              {showAddDocument && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 mb-4"
                                >
                                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                    <h5 className="text-xs font-bold text-slate-700 uppercase">Novo Documento</h5>
                                    <button onClick={() => setShowAddDocument(false)} className="text-slate-400 hover:text-slate-600"><Trash2 size={14} /></button>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo</label>
                                      <select value={newDocument.type} onChange={(e) => setNewDocument({...newDocument, type: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors">
                                        <option value="CNI">CNI</option>
                                        <option value="Passaporte">Passaporte</option>
                                        <option value="Título de Residência">Título de Residência</option>
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Número</label>
                                      <input type="text" value={newDocument.number} onChange={(e) => setNewDocument({...newDocument, number: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Local de Emissão</label>
                                      <input type="text" value={newDocument.issueLocation} onChange={(e) => setNewDocument({...newDocument, issueLocation: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Data de Emissão</label>
                                      <input type="date" value={newDocument.issueDate} onChange={(e) => setNewDocument({...newDocument, issueDate: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Data de Validade</label>
                                      <input type="date" value={newDocument.expiryDate} onChange={(e) => setNewDocument({...newDocument, expiryDate: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors" />
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <button onClick={() => handleAddOtherInfo('document')} className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors">Confirmar Adição</button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            <div className="flex justify-between items-center">
                              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Documento de Identificação</h4>
                              <Button variant="outline" icon={showAddDocument ? Trash2 : Plus} onClick={() => setShowAddDocument(!showAddDocument)}>
                                {showAddDocument ? 'Cancelar' : 'Adicionar Documento'}
                              </Button>
                            </div>
                            <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                    <th className="px-6 py-4">Nº</th>
                                    <th className="px-6 py-4">Tipo</th>
                                    <th className="px-6 py-4">Número</th>
                                    <th className="px-6 py-4">Emissão</th>
                                    <th className="px-6 py-4">Validade</th>
                                    <th className="px-6 py-4">Local Emissão</th>
                                    <th className="px-6 py-4">Criado em</th>
                                    <th className="px-6 py-4 text-right">Ação</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                  {selectedFicha.documents?.filter((d: any) => d.validTo === null).map((doc: any, idx: number) => (
                                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                                      <td className="px-6 py-4 text-xs font-black text-slate-900">{(idx + 1).toString().padStart(2, '0')}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{doc.type}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-900">{doc.number}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{doc.issueDate}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{doc.expiryDate}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{doc.issueLocation || '---'}</td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{doc.validFrom}</td>
                                      <td className="px-6 py-4 text-right">
                                        {!doc.validTo && (
                                          <button onClick={() => handleDeactivateOtherInfo('document', doc.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-red-100 transition-colors">Desativar</button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {selectedFicha.documents?.some((d: any) => d.validTo !== null) && (
                              <div className="space-y-4">
                                <button onClick={() => setShowOtherInfoHistory({...showOtherInfoHistory, document: !showOtherInfoHistory.document})} className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                  {showOtherInfoHistory.document ? 'Ocultar Histórico' : 'Ver Histórico de Documentos'}
                                  {showOtherInfoHistory.document ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                </button>
                                <AnimatePresence>
                                  {showOtherInfoHistory.document && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-2">
                                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registos Históricos</h5>
                                      <div className="overflow-x-auto border border-slate-200 rounded-lg bg-slate-50/50">
                                        <table className="w-full text-left border-collapse">
                                          <thead>
                                            <tr className="bg-slate-100 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
                                              <th className="px-4 py-3">Tipo</th><th className="px-4 py-3">Número</th><th className="px-4 py-3">Emissão</th><th className="px-4 py-3">Validade</th><th className="px-4 py-3">Criado por</th><th className="px-4 py-3">Desativado por</th><th className="px-4 py-3">Desativado em</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {selectedFicha.documents?.filter((d: any) => d.validTo !== null).map((doc: any) => (
                                              <tr key={doc.id} className="border-b border-slate-100 opacity-60">
                                                <td className="px-4 py-3 text-xs">{doc.type}</td><td className="px-4 py-3 text-xs">{doc.number}</td><td className="px-4 py-3 text-xs">{doc.issueDate}</td><td className="px-4 py-3 text-xs">{doc.expiryDate}</td><td className="px-4 py-3 text-xs font-medium">{doc.user}</td><td className="px-4 py-3 text-xs font-medium text-red-600">{doc.deactivatedBy || '---'}</td><td className="px-4 py-3 text-xs text-red-600 font-medium">{doc.validTo}</td>
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

                          {/* Grupo */}
                          <div className="space-y-4">
                            <AnimatePresence>
                              {showAddGroup && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 mb-4"
                                >
                                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                    <h5 className="text-xs font-bold text-slate-700 uppercase">Associar Grupo</h5>
                                    <button onClick={() => setShowAddGroup(false)} className="text-slate-400 hover:text-slate-600"><Trash2 size={14} /></button>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Sigla</label>
                                      <select
                                        value={newGroup.sigla}
                                        onChange={(e) => {
                                          const selected = paramGroups.find((g: any) => g.sigla === e.target.value);
                                          setNewGroup({ ...newGroup, sigla: e.target.value, nome: selected?.nome || '' });
                                        }}
                                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
                                      >
                                        <option value="">-- Selecionar --</option>
                                        {paramGroups.filter((g: any) => g.estado === 'Ativo').map((g: any) => (
                                          <option key={g.id} value={g.sigla}>{g.sigla}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nome</label>
                                      <input
                                        type="text"
                                        value={newGroup.nome}
                                        readOnly
                                        className="w-full px-4 py-2.5 bg-slate-100 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-500 outline-none cursor-not-allowed"
                                        placeholder="Preenchido automaticamente"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Função</label>
                                      <input type="text" value={newGroup.funcao} onChange={(e) => setNewGroup({ ...newGroup, funcao: e.target.value })} placeholder="Ex: Membro, Líder, Associado" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors" />
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <button onClick={() => handleAddOtherInfo('group')} className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors">Confirmar Adição</button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="flex justify-between items-center">
                              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Grupo</h4>
                              <Button variant="outline" icon={showAddGroup ? Trash2 : Plus} onClick={() => setShowAddGroup(!showAddGroup)}>
                                {showAddGroup ? 'Cancelar' : 'Associar Grupo'}
                              </Button>
                            </div>

                            <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                    <th className="px-6 py-4">Nº</th>
                                    <th className="px-6 py-4">Sigla</th>
                                    <th className="px-6 py-4">Nome</th>
                                    <th className="px-6 py-4">Função</th>
                                    <th className="px-6 py-4">Criado em</th>
                                    <th className="px-6 py-4 text-right">Ação</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                  {(selectedFicha.groups || []).filter((g: any) => !g.validTo).map((grp: any, idx: number) => (
                                    <tr key={grp.id} className="hover:bg-slate-50 transition-colors">
                                      <td className="px-6 py-4 text-xs font-black text-slate-900">{(idx + 1).toString().padStart(2, '0')}</td>
                                      <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black rounded-md">{grp.sigla}</span>
                                      </td>
                                      <td className="px-6 py-4 text-xs font-bold text-slate-900">{grp.nome}</td>
                                      <td className="px-6 py-4 text-xs font-medium text-slate-600">{grp.funcao || '---'}</td>
                                      <td className="px-6 py-4 text-xs font-medium text-slate-500">{grp.validFrom}</td>
                                      <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDeactivateOtherInfo('group', grp.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-red-100 transition-colors">Desativar</button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {(selectedFicha.groups || []).some((g: any) => g.validTo) && (
                              <div className="space-y-4">
                                <button onClick={() => setShowOtherInfoHistory({ ...showOtherInfoHistory, group: !showOtherInfoHistory.group })} className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1">
                                  {showOtherInfoHistory.group ? 'Ocultar Histórico' : 'Ver Histórico de Grupos'}
                                  {showOtherInfoHistory.group ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                </button>
                                <AnimatePresence>
                                  {showOtherInfoHistory.group && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-2">
                                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registos Históricos</h5>
                                      <div className="overflow-x-auto border border-slate-200 rounded-lg bg-slate-50/50">
                                        <table className="w-full text-left border-collapse">
                                          <thead>
                                            <tr className="bg-slate-100 text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200">
                                              <th className="px-4 py-3">Sigla</th>
                                              <th className="px-4 py-3">Nome</th>
                                              <th className="px-4 py-3">Função</th>
                                              <th className="px-4 py-3">Criado por</th>
                                              <th className="px-4 py-3">Desativado por</th>
                                              <th className="px-4 py-3">Desativado em</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {(selectedFicha.groups || []).filter((g: any) => g.validTo).map((grp: any) => (
                                              <tr key={grp.id} className="border-b border-slate-100 opacity-60">
                                                <td className="px-4 py-3 text-xs font-black">{grp.sigla}</td>
                                                <td className="px-4 py-3 text-xs">{grp.nome}</td>
                                                <td className="px-4 py-3 text-xs">{grp.funcao || '---'}</td>
                                                <td className="px-4 py-3 text-xs font-medium">{grp.user}</td>
                                                <td className="px-4 py-3 text-xs font-medium text-red-600">{grp.deactivatedBy || '---'}</td>
                                                <td className="px-4 py-3 text-xs text-red-600 font-medium">{grp.validTo}</td>
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
                                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
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
                                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
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
                                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
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
                                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
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
                                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
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
                                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
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
                                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
                                      >
                                        <option value="Telemóvel">Telemóvel</option>
                                        <option value="Telefone">Telefone</option>
                                        <option value="Email">Email</option>
                                        <option value="Facebook">Facebook</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Twitter / X">Twitter / X</option>
                                        <option value="LinkedIn">LinkedIn</option>
                                        <option value="TikTok">TikTok</option>
                                        <option value="WhatsApp">WhatsApp</option>
                                      </select>
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[10px] font-bold text-slate-500 uppercase">Informação</label>
                                      <input 
                                        type="text" 
                                        value={newContact.info}
                                        onChange={(e) => setNewContact({...newContact, info: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
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
                                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
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
                  <div
                    onClick={() => toggleSection('motivo')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><HelpCircle size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Motivo do Cadastro</span>
                    </div>
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => { setShowAddMotivoInFicha(true); if (!expandedSections.motivo) toggleSection('motivo'); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-700 transition-all"
                      >
                        <Plus size={13} /> Adicionar
                      </button>
                      {expandedSections.motivo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedSections.motivo && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
                          <AnimatePresence>
                            {showAddMotivoInFicha && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 space-y-5">
                                  {/* Linha 1 — Tipo, Tipo de Auto, Data */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo *</label>
                                      <select value={newMotivoInFicha.type} onChange={(e) => setNewMotivoInFicha({...newMotivoInFicha, type: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                        <option value="Criminal">Criminal</option>
                                        <option value="Policial">Policial</option>
                                      </select>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Auto</label>
                                      <select value={newMotivoInFicha.auto_type} onChange={(e) => setNewMotivoInFicha({...newMotivoInFicha, auto_type: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                        <option value="">Selecione...</option>
                                        <option>Auto de Notícia</option>
                                        <option>Auto de Detenção</option>
                                        <option>Auto de Flagrante Delito</option>
                                        <option>Auto de Ocorrência</option>
                                        <option>Auto de Apreensão</option>
                                        <option>Outro</option>
                                      </select>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</label>
                                      <input type="date" value={newMotivoInFicha.date} onChange={(e) => setNewMotivoInFicha({...newMotivoInFicha, date: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                                    </div>
                                  </div>
                                  {/* Linha 2 — Natureza, Enquadramento, Tipologia */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Natureza de Ocorrência</label>
                                      <select value={newMotivoInFicha.natureza} onChange={(e) => setNewMotivoInFicha({...newMotivoInFicha, natureza: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                        <option value="">Selecione...</option>
                                        <option>Crime contra o Património</option>
                                        <option>Crime contra as Pessoas</option>
                                        <option>Crime contra a Ordem Pública</option>
                                        <option>Crime contra o Estado</option>
                                        <option>Crime contra a Família</option>
                                        <option>Crime de Droga / Tráfico</option>
                                        <option>Crime de Natureza Sexual</option>
                                        <option>Outro</option>
                                      </select>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enquadramento de Crime</label>
                                      <select value={newMotivoInFicha.enquadramento} onChange={(e) => setNewMotivoInFicha({...newMotivoInFicha, enquadramento: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                        <option value="">Selecione...</option>
                                        <option>Furto Simples — Art. 193º CP</option>
                                        <option>Furto Qualificado — Art. 197º CP</option>
                                        <option>Roubo — Art. 200º CP</option>
                                        <option>Homicídio — Art. 122º CP</option>
                                        <option>Ofensa à Integridade Física — Art. 131º CP</option>
                                        <option>Violência Doméstica — Art. 134º CP</option>
                                        <option>Tráfico de Droga — Lei 78/III/90</option>
                                        <option>Desordem Pública — Art. 279º CP</option>
                                        <option>Resistência à Autoridade — Art. 283º CP</option>
                                        <option>Outro</option>
                                      </select>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipologia</label>
                                      <select value={newMotivoInFicha.tipologia} onChange={(e) => setNewMotivoInFicha({...newMotivoInFicha, tipologia: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                        <option value="">Selecione...</option>
                                        <option>Detenção em Flagrante Delito</option>
                                        <option>Suspeito de Crime</option>
                                        <option>Arguido</option>
                                        <option>Investigado</option>
                                        <option>Condenado</option>
                                        <option>Reincidente</option>
                                        <option>Outro</option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* Linha 3 — Unidade */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade</label>
                                      <select value={newMotivoInFicha.unit} onChange={(e) => setNewMotivoInFicha({...newMotivoInFicha, unit: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                        <option value="">Selecione...</option>
                                        <option>ESF Praia</option>
                                        <option>ESF Mindelo</option>
                                        <option>ESF Santa Catarina</option>
                                        <option>ESF São Vicente</option>
                                        <option>DP Praia</option>
                                        <option>DP Mindelo</option>
                                        <option>DP Santa Cruz</option>
                                        <option>DP Tarrafal</option>
                                      </select>
                                    </div>
                                  </div>
                                  {/* Linha 4 — Nº Ocorrência, Medidas */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nº Ocorrência</label>
                                      <input type="text" value={newMotivoInFicha.refNo} onChange={(e) => setNewMotivoInFicha({...newMotivoInFicha, refNo: e.target.value})} placeholder="Ex: OC-2024-0001" className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medidas Aplicadas</label>
                                      <select value={newMotivoInFicha.measures} onChange={(e) => setNewMotivoInFicha({...newMotivoInFicha, measures: e.target.value})} className="w-full px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all">
                                        <option value="">Selecione...</option>
                                        <option>Prisão Preventiva</option>
                                        <option>Termo de Identidade e Residência</option>
                                        <option>Liberdade Provisória</option>
                                        <option>Obrigação de Apresentação Periódica</option>
                                        <option>Proibição de Contacto</option>
                                        <option>Suspensão de Pena</option>
                                        <option>Multa</option>
                                        <option>Sem medidas aplicadas</option>
                                        <option>Outro</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="flex justify-end gap-3">
                                    <button onClick={() => { setShowAddMotivoInFicha(false); setNewMotivoInFicha({ reason: '', type: 'Criminal', date: '', refNo: '', unit: '', measures: '', auto_type: '', natureza: '', enquadramento: '', tipologia: '' }); }} className="px-4 py-2 bg-white text-slate-600 border-2 border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all text-xs">Cancelar</button>
                                    <button
                                      onClick={() => {
                                        if (!newMotivoInFicha.refNo) return;
                                        const newReg = { ...newMotivoInFicha, id: Date.now(), status: 'Ativo' };
                                        setSelectedFicha((prev: any) => ({ ...prev, registrationReasons: [...(prev.registrationReasons || []), newReg] }));
                                        setNewMotivoInFicha({ reason: '', type: 'Criminal', date: '', refNo: '', unit: '', measures: '', auto_type: '', natureza: '', enquadramento: '', tipologia: '' });
                                        setShowAddMotivoInFicha(false);
                                      }}
                                      className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-700 transition-all text-xs flex items-center gap-2"
                                    >
                                      <Plus size={14} />
                                      Adicionar
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Lista de registos — card por registo */}
                          <div className="space-y-4">
                            {(selectedFicha?.registrationReasons || []).map((reg: any) => (
                              <div key={reg.id} className="relative border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                                {/* Botão editar — canto superior direito */}
                                <button
                                  onClick={() => {
                                    setEditingMotivoId(reg.id);
                                    setEditingMotivoData({ type: reg.type, sijNo: reg.sijNo || '', unit: reg.unit || '', measures: reg.measures || '' });
                                  }}
                                  className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all z-10"
                                  title="Editar"
                                >
                                  <Edit size={14} />
                                </button>
                                <div className="px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-5 bg-white">
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nº Ocorrência</p>
                                    <p className="text-xs font-bold text-slate-800">{reg.refNo || '---'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Data</p>
                                    <p className="text-xs font-bold text-slate-800">{reg.date || '---'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tipo de Auto</p>
                                    <p className="text-xs font-bold text-slate-800">{reg.auto_type || '---'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tipo</p>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${reg.type === 'Criminal' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>{reg.type}</span>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Natureza de Ocorrência</p>
                                    <p className="text-xs font-bold text-slate-800">{reg.natureza || '---'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Enquadramento</p>
                                    <p className="text-xs font-bold text-slate-800">{reg.enquadramento || '---'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tipologia</p>
                                    <p className="text-xs font-bold text-slate-800">{reg.tipologia || '---'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Unidade</p>
                                    <p className="text-xs font-bold text-slate-800">{reg.unit || '---'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nº SIJ</p>
                                    <p className="text-xs font-bold text-slate-800">{reg.sijNo || '---'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Medidas</p>
                                    <p className="text-xs font-bold text-slate-800">{reg.measures || '---'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Estado</p>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${reg.status === 'Reabilitado' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                      {reg.status === 'Reabilitado' ? 'Reabilitado' : 'Ativo'}
                                    </span>
                                  </div>
                                </div>
                                {/* Barra de Reabilitação — contextual */}
                                <div className={`px-6 py-3 flex items-center justify-between border-t-2 ${
                                  reg.status === 'Reabilitado' ? 'bg-emerald-50 border-emerald-100' :
                                  (reg.status === 'Ativo' && reg.rehabilitationDetails) ? 'bg-blue-50 border-blue-100' :
                                  'bg-slate-50 border-slate-100'
                                }`}>
                                  <div className="flex items-center gap-2">
                                    {/* Ativo com pedido pendente */}
                                    {reg.status === 'Ativo' && reg.rehabilitationDetails && (
                                      <>
                                        <ShieldCheck size={14} className="text-blue-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Pedido de reabilitação pendente</span>
                                      </>
                                    )}
                                    {/* Reabilitado */}
                                    {reg.status === 'Reabilitado' && (
                                      <>
                                        <ShieldCheck size={14} className="text-emerald-600" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Reabilitado</span>
                                      </>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {/* Ativo sem pedido → botão solicitar (sem label) */}
                                    {reg.status === 'Ativo' && !reg.rehabilitationDetails && (
                                      <button
                                        onClick={() => { setSelectedReasonForRehab(reg); setShowRehabilitationModal(true); }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-emerald-700 transition-all"
                                      >
                                        <ShieldCheck size={12} />
                                        Solicitar Reabilitação
                                      </button>
                                    )}
                                    {/* Ativo com pedido pendente → ver pedido (só leitura na ficha) */}
                                    {reg.status === 'Ativo' && reg.rehabilitationDetails && (
                                      <button
                                        onClick={() => { setSelectedReasonForRehab(reg); setRehabDetailsViewOnly(true); setShowRehabilitationDetailsModal(true); }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-blue-700 transition-all"
                                      >
                                        <Search size={12} />
                                        Ver Pedido
                                      </button>
                                    )}
                                    {/* Reabilitado → ver detalhes */}
                                    {reg.status === 'Reabilitado' && reg.rehabilitationDetails && (
                                      <button
                                        onClick={() => { setSelectedReasonForRehab(reg); setRehabDetailsViewOnly(true); setShowRehabilitationDetailsModal(true); }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-emerald-200 transition-all"
                                      >
                                        <Search size={12} />
                                        Ver Detalhes
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
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
                            <Button variant="outline" icon={Plus}>Anexar Fotografia</Button>
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
                                    <img src={getPortraitUrl(photo.seed)} alt={photo.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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

                {/* Accordion: Anexos */}
                <div className="space-y-4">
                  <button
                    onClick={() => toggleSection('attachments')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><Paperclip size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Anexos</span>
                      {(selectedFicha.attachments?.length ?? 0) > 0 && (
                        <span className="px-2 py-0.5 bg-slate-900 text-white rounded-full text-[10px] font-black">{selectedFicha.attachments.length}</span>
                      )}
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
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
                          <div className="flex justify-end">
                            <Button variant="outline" icon={Upload}>Carregar Anexo</Button>
                          </div>

                          {(!selectedFicha.attachments || selectedFicha.attachments.length === 0) ? (
                            <div className="text-center py-12 text-slate-400">
                              <Paperclip size={32} className="mx-auto mb-3 opacity-30" />
                              <p className="text-xs font-bold uppercase tracking-widest">Sem anexos</p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {selectedFicha.attachments.map((att: any) => {
                                const isPdf = att.type === 'PDF';
                                const isImg = att.type === 'Imagem';
                                const sizeKb = Math.round(att.size / 1024);
                                const sizeLabel = sizeKb >= 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
                                return (
                                  <div key={att.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-slate-200 transition-all">
                                    <div className={`p-3 rounded-xl flex-shrink-0 ${isPdf ? 'bg-red-100 text-red-600' : isImg ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-600'}`}>
                                      {isImg ? <ImageIcon size={20} /> : <FileText size={20} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-black text-slate-900 truncate">{att.name}</p>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{att.description}</p>
                                      <p className="text-[10px] text-slate-400 mt-1">
                                        <span className="font-bold">{att.type}</span> · {sizeLabel} · Carregado por <span className="font-bold">{att.uploadedBy}</span> em {att.uploadedAt}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                        <Download size={16} />
                                      </button>
                                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion: Registos Associados */}
                <div className="space-y-4">
                  <button
                    onClick={() => toggleSection('registos_associados')}
                    className="w-full bg-white border-2 border-slate-100 py-4 px-6 rounded-2xl flex items-center justify-between font-black text-slate-900 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-lg"><History size={18} /></div>
                      <span className="uppercase tracking-widest text-xs">Registos Associados</span>
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
                        <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm">
                          <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
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
                  <Button variant="outline" icon={ArrowLeft} onClick={() => setCurrentView('ficha_list')}>
                    Voltar para Lista
                  </Button>
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
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nº Registo: <span className="text-slate-600">{selectedPerson.process_number || '---'}</span></span>
                      <span className="text-slate-200 font-black">·</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nº Ocorrência: <span className="text-slate-600">{selectedPerson.occurrence_number || '---'}</span></span>
                      <span className="text-slate-200 font-black">·</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade: <span className="text-slate-600">{selectedPerson.sent_unit || selectedPerson.unit || '---'}</span></span>
                    </div>
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
                                      src="https://randomuser.me/api/portraits/men/32.jpg" 
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
                                          setSelectedFicha(null);
                                          setExpandedSections(prev => ({ ...prev, other_info: true }));
                                          // Pré-preencher residência e contactos a partir dos dados SIGO
                                          if (selectedPerson) {
                                            const today = new Date().toISOString().split('T')[0];
                                            const sigoAddress = {
                                              id: Date.now(),
                                              type: 'Residência',
                                              island: selectedPerson.island || '',
                                              council: selectedPerson.municipality || '',
                                              parish: selectedPerson.parish || '',
                                              locality: selectedPerson.locality || '',
                                              reference: selectedPerson.reference_point || selectedPerson.zone || '',
                                              createdAt: today,
                                              validFrom: today,
                                              validTo: null,
                                              user: user?.name || 'Sistema',
                                              fromSigo: true
                                            };
                                            setSavedAddresses([]);
                                            setSavedContacts([]);
                                          }
                                        }}
                                        className="px-4 py-2 bg-blue-400 text-white font-bold rounded-xl hover:bg-blue-500 transition-all text-xs border border-blue-400 shadow-sm flex items-center gap-2"
                                      >
                                        <UserPlus size={14} />
                                        Novo Cadastro
                                      </button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <DetailField label="Nome Completo" value={`${associatedPerson.name}${associatedPerson.surname ? ' ' + associatedPerson.surname : ''}`} />
                                    <DetailField label="Data Nascimento" value={new Date(associatedPerson.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
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
                                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Documento Identificação</h3>
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
                      {/* Associar Cadastro button */}
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            setHideNewCadastroInAssociate(false);
                            setShowAssociateModal(true);
                          }}
                          className="px-5 py-2.5 bg-white text-slate-700 border-2 border-slate-200 font-bold rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all text-xs flex items-center gap-2"
                        >
                          <Search size={14} />
                          Associar Cadastro
                        </button>
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
                                  <div className="absolute top-4 right-8 flex items-center gap-3">
                                    <button
                                      onClick={() => setSuggestedFicha(null)}
                                      className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all text-xs flex items-center gap-2"
                                    >
                                      <X size={13} />
                                      Rejeitar Match
                                    </button>
                                    <button
                                      onClick={() => {
                                        setAssociatedPerson(suggestedFicha);
                                        setSuggestedFicha(null);
                                      }}
                                      className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-xs shadow-md shadow-blue-200 flex items-center gap-2"
                                    >
                                      <CheckCircle size={13} />
                                      Aceitar Match
                                    </button>
                                  </div>
                                  
                                  <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-shrink-0">
                                      <div className="w-32 h-40 border-2 border-slate-900 rounded overflow-hidden shadow-md bg-slate-100 relative">
                                        <img 
                                          src="https://randomuser.me/api/portraits/men/32.jpg" 
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
                                        <DetailField label="Nome Completo" value={`${suggestedFicha.name}${suggestedFicha.surname ? ' ' + suggestedFicha.surname : ''}`} />
                                        <DetailField label="Data Nascimento" value={new Date(suggestedFicha.birthDate).toLocaleDateString('pt-BR')} icon={Calendar} />
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

                {/* Botão Associar Ficha (modo novo cadastro) */}
                <AnimatePresence>
                  {isNewRegistration && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-end"
                    >
                      <button
                        onClick={() => {
                          setIsNewRegistration(false);
                          setHideNewCadastroInAssociate(false);
                          setShowAssociateModal(true);
                        }}
                        className="px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all text-xs flex items-center gap-2 shadow-sm"
                      >
                        <Search size={14} />
                        Associar Ficha Existente
                      </button>
                    </motion.div>
                  )}
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
                      <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full uppercase tracking-widest">SIGO</span>
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
                          {/* SIGO notice */}
                          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
                            <Lock size={12} className="text-blue-400 flex-shrink-0" />
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Dados provenientes do SIGO — não editáveis</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                          <DetailField label="Nome Completo" value={selectedPerson.full_name || ''} />
                          <DetailField label="Data Nascimento" value={selectedPerson.birth_date ? new Date(selectedPerson.birth_date).toLocaleDateString('pt-BR') : '---'} icon={Calendar} />
                          <DetailField label="Sexo" value={selectedPerson.gender} />
                          <DetailField label="Estado Civil" value={selectedPerson.marital_status} />
                          <DetailField label="Naturalidade" value={selectedPerson.naturality} />
                          <DetailField label="Nacionalidade" value={selectedPerson.nationality} />
                          <DetailField label="Nome Pai" value={selectedPerson.father_name} />
                          <DetailField label="Nome Mãe" value={selectedPerson.mother_name} />
                          <DetailField label="Profissão" value={selectedPerson.profession} />
                          <DetailField label="NIF" value={selectedPerson.nif || ''} />
                          <DetailField label="Alcunha" value={(selectedFicha?.nicknames || savedNicknames)?.filter((n: any) => n.validTo === null).map((n: any) => n.value).join(', ') || ''} />
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

                {/* Outras Informações Accordion */}
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
                            <div className="bg-white border-2 border-slate-100 rounded-2xl p-8 shadow-sm mt-2 space-y-12">
                              {/* Endereço */}
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Endereço</h4>
                                  {isNewRegistration && (
                                    <Button variant="outline" icon={showAddAddress ? X : Plus} onClick={() => setShowAddAddress(!showAddAddress)}>
                                      {showAddAddress ? 'Cancelar' : 'Adicionar Endereço'}
                                    </Button>
                                  )}
                                </div>
                                {/* Formulário — só em novo cadastro */}
                                <AnimatePresence>
                                  {isNewRegistration && showAddAddress && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                        <h5 className="text-xs font-bold text-slate-700 uppercase">Novo Endereço</h5>
                                        <button onClick={() => setShowAddAddress(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo</label>
                                          <select value={newAddress.type} onChange={(e) => setNewAddress({...newAddress, type: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors">
                                            <option value="Residência">Residência</option>
                                            <option value="Trabalho">Trabalho</option>
                                            <option value="Outro">Outro</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Ilha</label>
                                          <select value={newAddress.island} onChange={(e) => setNewAddress({...newAddress, island: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors">
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
                                          <select value={newAddress.council} onChange={(e) => setNewAddress({...newAddress, council: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors">
                                            <option value="">Selecione...</option>
                                            <option value="Praia">Praia</option>
                                            <option value="Mindelo">Mindelo</option>
                                            <option value="Espargos">Espargos</option>
                                            <option value="Assomada">Assomada</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Freguesia</label>
                                          <select value={newAddress.parish} onChange={(e) => setNewAddress({...newAddress, parish: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors">
                                            <option value="">Selecione...</option>
                                            <option value="Nossa Senhora da Graça">Nossa Senhora da Graça</option>
                                            <option value="São Nicolau Tolentino">São Nicolau Tolentino</option>
                                            <option value="Santíssimo Nome de Jesus">Santíssimo Nome de Jesus</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Localidade</label>
                                          <select value={newAddress.locality} onChange={(e) => setNewAddress({...newAddress, locality: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors">
                                            <option value="">Selecione...</option>
                                            <option value="Achada Santo António">Achada Santo António</option>
                                            <option value="Palmarejo">Palmarejo</option>
                                            <option value="Plateau">Plateau</option>
                                            <option value="Fazenda">Fazenda</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Referência</label>
                                          <input type="text" value={newAddress.reference} onChange={(e) => setNewAddress({...newAddress, reference: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors" />
                                        </div>
                                      </div>
                                      <div className="flex justify-end">
                                        <button onClick={() => handleAddOtherInfo('address')} className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors">Confirmar Adição</button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                                <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-6 py-4">Nº</th>
                                        <th className="px-6 py-4">Tipo</th>
                                        <th className="px-6 py-4">Ilha</th>
                                        <th className="px-6 py-4">Localidade</th>
                                        <th className="px-6 py-4 text-right">Ação</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                      {/* Linha SIGO — sempre visível */}
                                      {selectedPerson?.island && (
                                        <tr className="bg-blue-50/40">
                                          <td className="px-6 py-4 text-xs font-black text-slate-900">01</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">Residência</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{selectedPerson.island}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{selectedPerson.locality || '---'}</td>
                                          <td className="px-6 py-4 text-right">
                                            <button
                                              onClick={() => {
                                                setSelectedAddressDetails({
                                                  type: 'Residência',
                                                  island: selectedPerson.island,
                                                  council: selectedPerson.municipality,
                                                  parish: selectedPerson.parish,
                                                  locality: selectedPerson.locality,
                                                  zone: selectedPerson.zone,
                                                  reference: selectedPerson.reference_point,
                                                  validFrom: '—',
                                                  user: 'SIGO',
                                                });
                                                setShowAddressDetailsModal(true);
                                              }}
                                              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
                                            >
                                              <Search size={16} />
                                            </button>
                                          </td>
                                        </tr>
                                      )}
                                      {/* Linhas adicionadas manualmente — só em novo cadastro */}
                                      {isNewRegistration && savedAddresses?.filter((a: any) => a.validTo === null).map((addr: any, idx: number) => (
                                        <tr key={addr.id} className="hover:bg-slate-50 transition-colors group">
                                          <td className="px-6 py-4 text-xs font-black text-slate-900">{(idx + 2).toString().padStart(2, '0')}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{addr.type}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{addr.island}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{addr.locality}</td>
                                          <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            <button
                                              onClick={() => {
                                                setSelectedAddressDetails({ ...addr, council: addr.municipality });
                                                setShowAddressDetailsModal(true);
                                              }}
                                              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                                            >
                                              <Search size={16} />
                                            </button>
                                            <button onClick={() => setSavedAddresses(prev => prev.filter((a: any) => a.id !== addr.id))} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-red-100 transition-colors">Remover</button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              {/* Contactos */}
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Contactos</h4>
                                  {isNewRegistration && (
                                    <Button variant="outline" icon={showAddContact ? X : Plus} onClick={() => setShowAddContact(!showAddContact)}>
                                      {showAddContact ? 'Cancelar' : 'Adicionar Contacto'}
                                    </Button>
                                  )}
                                </div>
                                <AnimatePresence>
                                  {isNewRegistration && showAddContact && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                        <h5 className="text-xs font-bold text-slate-700 uppercase">Novo Contacto</h5>
                                        <button onClick={() => setShowAddContact(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo</label>
                                          <select value={newContact.type} onChange={(e) => setNewContact({...newContact, type: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors">
                                            <option value="Telemóvel">Telemóvel</option>
                                            <option value="Telefone">Telefone</option>
                                            <option value="Email">Email</option>
                                            <option value="Facebook">Facebook</option>
                                            <option value="Instagram">Instagram</option>
                                            <option value="Twitter / X">Twitter / X</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                            <option value="TikTok">TikTok</option>
                                            <option value="WhatsApp">WhatsApp</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Informação</label>
                                          <input type="text" value={newContact.info} onChange={(e) => setNewContact({...newContact, info: e.target.value})} placeholder="Ex: 999 99 99 ou email@exemplo.com" className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors" />
                                        </div>
                                      </div>
                                      <div className="flex justify-end">
                                        <button onClick={() => handleAddOtherInfo('contact')} className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors">Confirmar Adição</button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                                <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-6 py-4">Nº</th>
                                        <th className="px-6 py-4">Tipo</th>
                                        <th className="px-6 py-4">Informação</th>
                                        <th className="px-6 py-4 text-right">Ação</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                      {/* Telemóvel SIGO — sem ações */}
                                      {selectedPerson?.phone && (
                                        <tr className="bg-blue-50/40">
                                          <td className="px-6 py-4 text-xs font-black text-slate-900">01</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">Telemóvel</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-800">{selectedPerson.phone}</td>
                                          <td className="px-6 py-4 text-right text-slate-300 text-xs">—</td>
                                        </tr>
                                      )}
                                      {/* Email SIGO — sem ações */}
                                      {selectedPerson?.email && (
                                        <tr className="bg-blue-50/40">
                                          <td className="px-6 py-4 text-xs font-black text-slate-900">{selectedPerson?.phone ? '02' : '01'}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">Email</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-800">{selectedPerson.email}</td>
                                          <td className="px-6 py-4 text-right text-slate-300 text-xs">—</td>
                                        </tr>
                                      )}
                                      {/* Contactos manuais */}
                                      {savedContacts?.filter((c: any) => c.validTo === null).map((contact: any, idx: number) => (
                                        <tr key={contact.id} className="hover:bg-slate-50 transition-colors group">
                                          <td className="px-6 py-4 text-xs font-black text-slate-900">{(idx + (selectedPerson?.phone ? 1 : 0) + (selectedPerson?.email ? 1 : 0) + 1).toString().padStart(2, '0')}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{contact.type}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-800">{contact.info}</td>
                                          <td className="px-6 py-4 text-right">
                                            <button onClick={() => setSavedContacts(prev => prev.filter((c: any) => c.id !== contact.id))} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-red-100 transition-colors">Remover</button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              {/* Documento de Identificação */}
                              <div className="space-y-4">
                                <AnimatePresence>
                                  {isNewRegistration && showAddDocument && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4 mb-4"
                                    >
                                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                        <h5 className="text-xs font-bold text-slate-700 uppercase">Novo Documento</h5>
                                        <button onClick={() => setShowAddDocument(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Tipo</label>
                                          <select value={newDocument.type} onChange={(e) => setNewDocument({...newDocument, type: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors">
                                            <option value="CNI">CNI</option>
                                            <option value="Passaporte">Passaporte</option>
                                            <option value="Título de Residência">Título de Residência</option>
                                          </select>
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Número</label>
                                          <input type="text" value={newDocument.number} onChange={(e) => setNewDocument({...newDocument, number: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors" />
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Local de Emissão</label>
                                          <input type="text" value={newDocument.issueLocation} onChange={(e) => setNewDocument({...newDocument, issueLocation: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors" />
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Data de Emissão</label>
                                          <input type="date" value={newDocument.issueDate} onChange={(e) => setNewDocument({...newDocument, issueDate: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors" />
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[10px] font-bold text-slate-500 uppercase">Data de Validade</label>
                                          <input type="date" value={newDocument.expiryDate} onChange={(e) => setNewDocument({...newDocument, expiryDate: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors" />
                                        </div>
                                      </div>
                                      <div className="flex justify-end">
                                        <button onClick={() => handleAddOtherInfo('document')} className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors">Confirmar Adição</button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                                <div className="flex justify-between items-center">
                                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-slate-900 pl-4">Documento de Identificação</h4>
                                  {isNewRegistration && (
                                    <Button variant="outline" icon={showAddDocument ? X : Plus} onClick={() => setShowAddDocument(!showAddDocument)}>
                                      {showAddDocument ? 'Cancelar' : 'Adicionar Documento'}
                                    </Button>
                                  )}
                                </div>
                                <div className="overflow-x-auto border-2 border-slate-50 rounded-2xl">
                                  <table className="w-full text-left border-collapse">
                                    <thead>
                                      <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <th className="px-6 py-4">Nº</th>
                                        <th className="px-6 py-4">Tipo</th>
                                        <th className="px-6 py-4">Número</th>
                                        <th className="px-6 py-4">Emissão</th>
                                        <th className="px-6 py-4">Validade</th>
                                        <th className="px-6 py-4">Local Emissão</th>
                                        <th className="px-6 py-4 text-right">Ação</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                      {/* Documento SIGO — sem ações */}
                                      {selectedPerson?.doc_number && (
                                        <tr className="bg-blue-50/40">
                                          <td className="px-6 py-4 text-xs font-black text-slate-900">01</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{selectedPerson.doc_type || '---'}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-900">{selectedPerson.doc_number}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{selectedPerson.doc_issue_date ? new Date(selectedPerson.doc_issue_date).toLocaleDateString('pt-BR') : '---'}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{selectedPerson.doc_expiry_date ? new Date(selectedPerson.doc_expiry_date).toLocaleDateString('pt-BR') : '---'}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{selectedPerson.doc_issue_location || '---'}</td>
                                          <td className="px-6 py-4 text-right text-slate-300 text-xs">—</td>
                                        </tr>
                                      )}
                                      {savedDocuments?.filter((d: any) => d.validTo === null).map((doc: any, idx: number) => (
                                        <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                                          <td className="px-6 py-4 text-xs font-black text-slate-900">{(idx + (selectedPerson?.doc_number ? 1 : 0) + 1).toString().padStart(2, '0')}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{doc.type}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-900">{doc.number}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{doc.issueDate}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{doc.expiryDate}</td>
                                          <td className="px-6 py-4 text-xs font-bold text-slate-600">{doc.issueLocation || '---'}</td>
                                          <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleDeactivateOtherInfo('document', doc.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-tighter hover:bg-red-100 transition-colors">Remover</button>
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
                        <div className="space-y-4 mt-2">
                          {selectedPerson.records?.map((r: any) => (
                            <div key={r.id} className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                              {/* Campos fora da tabela */}
                              <div className="px-6 py-5 grid grid-cols-2 md:grid-cols-3 gap-6 border-b border-slate-100">
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data e Hora — Início</p>
                                  <p className="text-sm font-bold text-slate-800">
                                    {new Date(r.date_start || r.date).toLocaleDateString('pt-BR')}
                                  </p>
                                  <p className="text-xs font-medium text-slate-400">
                                    {new Date(r.date_start || r.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data e Hora — Fim</p>
                                  {r.date_end ? (
                                    <>
                                      <p className="text-sm font-bold text-slate-800">
                                        {new Date(r.date_end).toLocaleDateString('pt-BR')}
                                      </p>
                                      <p className="text-xs font-medium text-slate-400">
                                        {new Date(r.date_end).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                      </p>
                                    </>
                                  ) : (
                                    <p className="text-sm font-bold text-slate-800">---</p>
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data da Detenção</p>
                                  <p className="text-sm font-bold text-slate-800">{r.detention_date ? new Date(r.detention_date).toLocaleDateString('pt-BR') : '---'}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nº Ocorrência</p>
                                  <p className="text-sm font-bold text-slate-800">{r.ref_note || '---'}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Auto</p>
                                  <p className="text-sm font-bold text-slate-800">{r.auto_type || '---'}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Criado por</p>
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                      <User size={11} className="text-slate-500" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-800">{r.created_by || '---'}</p>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enviado por</p>
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                      <User size={11} className="text-slate-500" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-800">{r.sent_by || '---'}</p>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comando</p>
                                  <p className="text-sm font-bold text-slate-800">{r.comando || '---'}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade</p>
                                  <p className="text-sm font-bold text-slate-800">{r.unit || '---'}</p>
                                </div>
                              </div>
                              {/* Tabela — Natureza, Enquadramento, Tipologia */}
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                    <th className="px-6 py-3">Natureza de Ocorrência</th>
                                    <th className="px-6 py-3">Enquadramento de Crime</th>
                                    <th className="px-6 py-3">Tipologia</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="px-6 py-3 text-sm font-bold text-slate-800">{r.natureza || '---'}</td>
                                    <td className="px-6 py-3 text-sm font-bold text-slate-800">{r.enquadramento || '---'}</td>
                                    <td className="px-6 py-3 text-sm font-bold text-slate-800">{r.reason || '---'}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          ))}
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
                          {(isNewRegistration || selectedFicha) && (
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
                          )}
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
                              <p className="text-sm text-slate-700 leading-relaxed">{o.content}</p>
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
                          {(isNewRegistration || selectedFicha) && (
                          <div className="flex justify-end">
                            <button
                              onClick={() => setShowAttachmentModal(true)}
                              className="px-4 py-2 bg-white text-slate-900 font-bold rounded hover:bg-slate-50 transition-colors text-xs border-2 border-slate-900 shadow-sm flex items-center gap-2"
                            >
                              <Plus size={16} />
                              Adicionar Anexo
                            </button>
                          </div>
                          )}

                          {savedAttachments.length > 0 ? (
                            <div className="space-y-2">
                              {savedAttachments.map((att, idx) => {
                                const isImg = att.type === 'Imagem';
                                return (
                                  <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-slate-200 transition-all">
                                    <div className={`p-3 rounded-xl flex-shrink-0 ${isImg ? 'bg-blue-100 text-blue-600' : att.type === 'Relatório' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'}`}>
                                      {isImg ? <ImageIcon size={20} /> : <FileText size={20} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-black text-slate-900 truncate">{att.title}</p>
                                      <p className="text-[10px] text-slate-400 mt-1"><span className="font-bold">{att.type}</span> · {att.date}</p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Visualizar"><Eye size={16} /></button>
                                      <button onClick={() => setSavedAttachments(savedAttachments.filter((_, i) => i !== idx))} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Eliminar"><Trash2 size={16} /></button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-xl">
                              <Paperclip size={28} className="mx-auto text-slate-200 mb-2" />
                              <p className="text-slate-400 text-sm italic">Nenhum anexo associado</p>
                            </div>
                          )}
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
                            const councilCode = (updatedPerson.municipality || 'Praia').slice(0, 2).toUpperCase();
                            const newFicha = {
                              id: Date.now(),
                              number: `FICAD-${fichas.length + 1}/N-${councilCode}/${new Date().getFullYear()}`,
                              estado: 'Por Completar',
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
                        returnReason: returnReason.trim(),
                        returnedBy: user?.name || 'Sistema',
                        returnedAt: new Date().toLocaleDateString('pt-BR'),
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

        {/* Devolver Pedido Modal (Certificado de Extravio) */}
        <AnimatePresence>
          {showReturnModalExtravio && (
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
                      value={returnReasonExtravio}
                      onChange={(e) => setReturnReasonExtravio(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                  <button
                    onClick={() => setShowReturnModalExtravio(false)}
                    className="flex-1 px-4 py-2 bg-white text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm border-2 border-slate-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (!returnReasonExtravio.trim()) {
                        setErrorMessage('Por favor, informe o motivo da devolução.');
                        setShowErrorModal(true);
                        return;
                      }
                      const returnedCert = {
                        ...selectedDecisionCertificateExtravio,
                        status: 'Devolvido',
                        returnReason: returnReasonExtravio.trim(),
                        returnedBy: user?.name || 'Sistema',
                        returnedAt: new Date().toLocaleDateString('pt-BR'),
                        history: [
                          ...selectedDecisionCertificateExtravio.history,
                          { date: new Date().toLocaleDateString('pt-BR'), phase: 'Analise', status: 'Devolvido', user: user?.name || 'Sistema' }
                        ],
                        observations: [
                          ...selectedDecisionCertificateExtravio.observations,
                          { user: user?.name || 'Sistema', date: new Date().toLocaleDateString('pt-BR'), text: `DEVOLUÇÃO: ${returnReasonExtravio}` }
                        ]
                      };
                      setMockAnalysisCertificatesExtravio([...mockAnalysisCertificatesExtravio, returnedCert]);
                      setMockDecisionCertificatesExtravio(mockDecisionCertificatesExtravio.filter(c => c.id !== selectedDecisionCertificateExtravio.id));
                      setShowReturnModalExtravio(false);
                      setReturnReasonExtravio('');
                      setSuccessMessage('Pedido devolvido para análise com sucesso.');
                      setShowSuccessModal(true);
                      setCurrentView('certificate_decision_extravio');
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Numero Cadastro</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
                        value={associateSearchFilters.number}
                        onChange={(e) => setAssociateSearchFilters({...associateSearchFilters, number: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nome Completo</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
                        value={associateSearchFilters.name}
                        onChange={(e) => setAssociateSearchFilters({...associateSearchFilters, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Data Nascimento</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
                          value={associateSearchFilters.birthDate}
                          onChange={(e) => setAssociateSearchFilters({...associateSearchFilters, birthDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Número Documento</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-colors"
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
                        const f = associateSearchFilters;
                        const results = fichas.filter(ficha => {
                          const fullName = `${ficha.name}${ficha.surname ? ' ' + ficha.surname : ''}`.toLowerCase();
                          if (f.number && !ficha.number.includes(f.number)) return false;
                          if (f.name && !fullName.includes(f.name.toLowerCase())) return false;
                          if (f.birthDate && ficha.birthDate !== f.birthDate) return false;
                          if (f.docNumber && ficha.docNumber && !ficha.docNumber.toLowerCase().includes(f.docNumber.toLowerCase())) return false;
                          return true;
                        });
                        setAssociateResults(results);
                        setHasSearchedAssociate(true);
                        setCertAnalysisHasSearched(true);
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
                              <th className="px-4 py-3">Nome Completo</th>
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
                                  <td className="px-4 py-4 text-sm text-slate-700">{r.name}{r.surname ? ' ' + r.surname : ''}</td>
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
                                <td colSpan={6} className="px-4 py-8 text-center text-slate-400 italic">Nenhum registro encontrado</td>
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
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border-2 border-slate-100 overflow-hidden"
              >
                <div className="bg-blue-600 px-6 py-8 flex flex-col items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <Fingerprint size={32} className="text-white" />
                  </motion.div>
                  <h3 className="text-base font-black text-white uppercase tracking-widest">Confirmar Associação</h3>
                </div>
                <div className="px-6 py-6 text-center space-y-6">
                  <p className="text-sm font-bold text-slate-600">Deseja associar este cadastro ao pedido atual?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConfirmAssociate(false)}
                      className="flex-1 py-3 border-2 border-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all"
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
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Confirmation Modal (New Registration) */}
        <AnimatePresence>
          {showConfirmNew && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border-2 border-slate-100 overflow-hidden"
              >
                <div className="bg-slate-900 px-6 py-8 flex flex-col items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center"
                  >
                    <UserPlus size={32} className="text-white" />
                  </motion.div>
                  <h3 className="text-base font-black text-white uppercase tracking-widest">Novo Cadastro</h3>
                </div>
                <div className="px-6 py-6 text-center space-y-6">
                  <p className="text-sm font-bold text-slate-600">Deseja iniciar um novo cadastro manual para esta ocorrência?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConfirmNew(false)}
                      className="flex-1 py-3 border-2 border-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        setIsNewRegistration(true);
                        setAssociatedPerson(null);
                        setSelectedFicha(null);
                        setShowConfirmNew(false);
                        setShowAssociateModal(false);
                        setExpandedSections(prev => ({ ...prev, biographic: true, complementary: true, biometric: true, other_info: true }));
                        setSavedAddresses([]);
                        setSavedContacts([]);
                      }}
                      className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Confirmation Modal (Concluir Análise) */}
        <AnimatePresence>
          {showConfirmConcluir && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border-2 border-slate-100 overflow-hidden"
              >
                <div className="bg-amber-500 px-6 py-8 flex flex-col items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    <FileCheck size={32} className="text-white" />
                  </motion.div>
                  <h3 className="text-base font-black text-white uppercase tracking-widest">Concluir Análise</h3>
                </div>
                <div className="px-6 py-6 text-center space-y-6">
                  <p className="text-sm font-bold text-slate-600">
                    {currentView === 'certificate_analysis_extravio_detail'
                      ? <>Tem a certeza que deseja enviar este pedido para <span className="text-slate-900">Decisão</span>?</>
                      : associatedPerson
                        ? <>Tem a certeza que deseja enviar este pedido para <span className="text-slate-900">Decisão</span>? O cadastro <span className="text-slate-900 font-black">{associatedPerson.number}</span> ficará associado.</>
                        : <>Tem a certeza que deseja enviar este pedido para <span className="text-slate-900">Decisão</span> sem cadastro associado?</>
                    }
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setShowConfirmConcluir(false); setPendingConcluirAction(null); }}
                      className="flex-1 py-3 border-2 border-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        setShowConfirmConcluir(false);
                        if (pendingConcluirAction) pendingConcluirAction();
                        setPendingConcluirAction(null);
                      }}
                      className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                    >
                      Confirmar
                    </button>
                  </div>
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
                        {Object.keys(legacyCharacteristicTypes).map(name => (
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
                          {currentCharacteristic.name && legacyCharacteristicTypes[currentCharacteristic.name].map(type => (
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border-2 border-slate-100"
            >
              <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><MapPin size={16} /></div>
                  <h3 className="font-black text-sm uppercase tracking-widest">Detalhes do Endereço</h3>
                </div>
                <button onClick={() => setShowAddressDetailsModal(false)} className="text-slate-400 hover:text-white transition-colors p-1">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-6">
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
              <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end">
                <Button variant="outline" onClick={() => setShowAddressDetailsModal(false)}>Fechar</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Solicitação Reabilitação Cadastro Modal */}
      <AnimatePresence>
        {showRehabilitationModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border-2 border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={18} className="text-white" /></div>
                  <div>
                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Solicitar Reabilitação</h2>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Ficha N.º {selectedFicha?.number} — {selectedFicha?.name}</p>
                  </div>
                </div>
                <button onClick={() => setShowRehabilitationModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                {/* Info do registo */}
                {selectedReasonForRehab && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-100 space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nº Ocorrência</p>
                      <p className="text-sm font-black text-slate-900">{selectedReasonForRehab.refNo || '---'}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-100 space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo</p>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${selectedReasonForRehab.type === 'Criminal' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>{selectedReasonForRehab.type}</span>
                    </div>
                  </div>
                )}

                {/* Motivo */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Motivo da Solicitação *</p>
                  <textarea
                    rows={4}
                    value={rehabilitationReason}
                    onChange={(e) => setRehabilitationReason(e.target.value)}
                    placeholder="Descreva detalhadamente o motivo do pedido de reabilitação..."
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-slate-900 transition-all resize-none"
                  />
                </div>

                {/* Anexos */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Anexos</p>
                    <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-200 transition-all">
                      <Plus size={12} />
                      Adicionar
                      <input type="file" multiple className="hidden" onChange={(e) => { if (e.target.files) setRehabilitationAttachments([...rehabilitationAttachments, ...Array.from(e.target.files)]); }} />
                    </label>
                  </div>
                  {rehabilitationAttachments.length === 0 ? (
                    <div className="py-6 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
                      <Paperclip size={20} className="mb-1.5 opacity-30" />
                      <p className="text-[10px] font-medium">Nenhum anexo selecionado</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {rehabilitationAttachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl hover:border-slate-200 transition-all">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <Paperclip size={14} className="text-slate-400 flex-shrink-0" />
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold text-slate-700 truncate">{file.name}</p>
                              <p className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          <button onClick={() => { const f = [...rehabilitationAttachments]; f.splice(idx, 1); setRehabilitationAttachments(f); }} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t-2 border-slate-100 flex items-center justify-end gap-3">
                <button onClick={() => { setShowRehabilitationModal(false); setRehabilitationReason(''); setRehabilitationAttachments([]); }} className="px-4 py-2 bg-white text-slate-700 border-2 border-slate-200 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
                  Cancelar
                </button>
                <button onClick={handleConfirmRehabilitation} className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-all">
                  <ShieldCheck size={14} />
                  Confirmar Solicitação
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

        {/* Detalhes da Solicitação de Reabilitação Modal */}
      <AnimatePresence>
        {showRehabilitationDetailsModal && selectedReasonForRehab?.rehabilitationDetails && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border-2 border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><RotateCcw size={18} className="text-white" /></div>
                  <div>
                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Solicitação de Reabilitação</h2>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Ficha N.º {selectedFicha?.number} — {selectedFicha?.name}</p>
                  </div>
                </div>
                <button onClick={() => {
                  setShowRehabilitationDetailsModal(false);
                  setRehabDetailsViewOnly(false);
                  if (!rehabDetailsViewOnly) {
                    setPendingRehabAction({ ficha: selectedFicha, reg: selectedReasonForRehab });
                    setRejectReason('');
                    setShowRejectConfirmModal(true);
                  }
                }} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all" title={rehabDetailsViewOnly ? 'Fechar' : 'Recusar'}>
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                {/* Meta */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-100 space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Solicitado em</p>
                    <p className="text-sm font-black text-slate-900">{selectedReasonForRehab.rehabilitationDetails.requestedAt}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-100 space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Solicitado por</p>
                    <p className="text-sm font-black text-slate-900">{selectedReasonForRehab.rehabilitationDetails.requestedBy}</p>
                  </div>
                </div>

                {/* Accepted info (if Reabilitado) */}
                {selectedReasonForRehab.rehabilitationDetails.acceptedAt && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-100 space-y-1">
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Aceite em</p>
                      <p className="text-sm font-black text-emerald-700">{selectedReasonForRehab.rehabilitationDetails.acceptedAt}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-100 space-y-1">
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Aceite por</p>
                      <p className="text-sm font-black text-emerald-700">{selectedReasonForRehab.rehabilitationDetails.acceptedBy}</p>
                    </div>
                  </div>
                )}

                {/* Motivo */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Motivo da Solicitação</p>
                  <div className="bg-slate-50 border-2 border-slate-100 rounded-xl p-4 text-sm text-slate-700 leading-relaxed font-medium">
                    {selectedReasonForRehab.rehabilitationDetails.reason}
                  </div>
                </div>

                {/* Anexos */}
                {selectedReasonForRehab.rehabilitationDetails.attachments?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Anexos ({selectedReasonForRehab.rehabilitationDetails.attachments.length})
                    </p>
                    <div className="space-y-2">
                      {selectedReasonForRehab.rehabilitationDetails.attachments.map((file: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl group hover:border-slate-200 transition-all">
                          <div className="flex items-center gap-3">
                            <Paperclip size={14} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-700">{file.name}</span>
                          </div>
                          <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Visualizar">
                            <Eye size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t-2 border-slate-100 flex items-center justify-between gap-3">
                <Button variant="outline" onClick={() => { setShowRehabilitationDetailsModal(false); setRehabDetailsViewOnly(false); }}>Fechar</Button>
                {!rehabDetailsViewOnly && (
                  <div className="flex gap-3">
                    <Button variant="danger" icon={X} onClick={() => {
                      setPendingRehabAction({ ficha: selectedFicha, reg: selectedReasonForRehab });
                      setRejectReason('');
                      setShowRejectConfirmModal(true);
                    }}>Recusar</Button>
                    <Button variant="success" icon={CheckCircle} onClick={() => {
                      setPendingRehabAction({ ficha: selectedFicha, reg: selectedReasonForRehab });
                      setShowApproveConfirmModal(true);
                    }}>Aceitar</Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reject Confirmation Modal */}
      <AnimatePresence>
        {showRejectConfirmModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl border-2 border-slate-100 overflow-hidden"
            >
              <div className="bg-red-600 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><X size={18} className="text-white" /></div>
                  <h2 className="text-sm font-black text-white uppercase tracking-widest">Recusar Reabilitação</h2>
                </div>
                <button onClick={() => setShowRejectConfirmModal(false)} className="p-2 text-red-200 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-sm text-slate-600 font-medium">Tem a certeza que deseja recusar esta solicitação de reabilitação? Esta ação não pode ser revertida.</p>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                    Motivo da Recusa <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Descreva o motivo pelo qual a reabilitação está a ser recusada..."
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-red-400 resize-none transition-colors"
                  />
                  {rejectReason.trim() === '' && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Campo obrigatório</p>
                  )}
                </div>
              </div>
              <div className="px-6 py-4 border-t-2 border-slate-100 flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowRejectConfirmModal(false)}>Cancelar</Button>
                <button
                  onClick={handleRejectRehabilitation}
                  disabled={!rejectReason.trim()}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${rejectReason.trim() ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                >
                  <X size={14} />
                  Confirmar Recusa
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Approve Confirmation Modal */}
      <AnimatePresence>
        {showApproveConfirmModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border-2 border-slate-100 overflow-hidden"
            >
              <div className="bg-emerald-600 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><CheckCircle size={18} className="text-white" /></div>
                  <h2 className="text-sm font-black text-white uppercase tracking-widest">Confirmar Aceitação</h2>
                </div>
                <button onClick={() => setShowApproveConfirmModal(false)} className="p-2 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 space-y-2">
                <p className="text-sm font-black text-slate-900">Aceitar reabilitação?</p>
                <p className="text-sm text-slate-500 font-medium">O cadastro será marcado como reabilitado. Esta ação não pode ser revertida.</p>
              </div>
              <div className="px-6 py-4 border-t-2 border-slate-100 flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowApproveConfirmModal(false)}>Cancelar</Button>
                <Button variant="success" icon={CheckCircle} onClick={handleApproveRehabilitation}>Confirmar</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rejection Reason Modal */}
      <AnimatePresence>
        {showRejectionReasonModal && selectedRejectionDetails && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl border-2 border-slate-100 overflow-hidden"
            >
              <div className="bg-red-600 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><Info size={18} className="text-white" /></div>
                  <div>
                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Reabilitação Recusada</h2>
                    <p className="text-[10px] text-red-200 font-medium mt-0.5">Motivo da recusa da solicitação</p>
                  </div>
                </div>
                <button onClick={() => { setShowRejectionReasonModal(false); setSelectedRejectionDetails(null); }} className="p-2 text-red-200 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-100 space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recusado em</p>
                    <p className="text-sm font-black text-slate-900">{selectedRejectionDetails.rejectedAt}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-100 space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recusado por</p>
                    <p className="text-sm font-black text-slate-900">{selectedRejectionDetails.rejectedBy}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Motivo da Recusa</p>
                  <div className="bg-red-50 border-2 border-red-100 rounded-xl p-4 text-sm text-red-700 leading-relaxed font-medium">
                    {selectedRejectionDetails.reason}
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t-2 border-slate-100 flex justify-end">
                <Button variant="outline" onClick={() => { setShowRejectionReasonModal(false); setSelectedRejectionDetails(null); }}>Fechar</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[210] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border-2 border-slate-100 overflow-hidden"
            >
              <div className="bg-emerald-600 px-6 py-8 flex flex-col items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <CheckCircle size={36} className="text-white" />
                </motion.div>
                <h3 className="text-lg font-black text-white uppercase tracking-widest">Operação Concluída</h3>
              </div>
              <div className="px-6 py-6 text-center space-y-6">
                <p className="text-sm font-bold text-slate-600">{successMessage}</p>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[210] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border-2 border-slate-100 overflow-hidden"
            >
              <div className="bg-red-600 px-6 py-8 flex flex-col items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <FileWarning size={32} className="text-white" />
                </motion.div>
                <h3 className="text-base font-black text-white uppercase tracking-widest">Atenção</h3>
              </div>
              <div className="px-6 py-6 text-center space-y-6">
                <p className="text-sm font-bold text-slate-600">{errorMessage}</p>
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal — Editar Dados Biográficos */}
      <AnimatePresence>
        {showEditBiographic && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border-2 border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><User size={18} className="text-white" /></div>
                  <div>
                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Dados Biográficos</h2>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Ficha N.º {selectedFicha?.number} — {selectedFicha?.name}</p>
                  </div>
                </div>
                <button onClick={() => setShowEditBiographic(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nome Completo */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</label>
                    <input type="text" value={editBiographicData.name || ''} onChange={(e) => setEditBiographicData({...editBiographicData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                  </div>
                  {/* Data Nascimento */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data de Nascimento</label>
                    <input type="date" value={editBiographicData.birthDate || ''} onChange={(e) => setEditBiographicData({...editBiographicData, birthDate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                  </div>
                  {/* Sexo */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sexo</label>
                    <select value={editBiographicData.gender || ''} onChange={(e) => setEditBiographicData({...editBiographicData, gender: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all appearance-none">
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                    </select>
                  </div>
                  {/* Estado Civil */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado Civil</label>
                    <select value={editBiographicData.civilStatus || ''} onChange={(e) => setEditBiographicData({...editBiographicData, civilStatus: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all appearance-none">
                      <option value="">Selecione...</option>
                      <option>Solteiro(a)</option>
                      <option>Casado(a)</option>
                      <option>Divorciado(a)</option>
                      <option>Viúvo(a)</option>
                      <option>União de facto</option>
                    </select>
                  </div>
                  {/* Naturalidade */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Naturalidade</label>
                    <input type="text" value={editBiographicData.birthPlace || ''} onChange={(e) => setEditBiographicData({...editBiographicData, birthPlace: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                  </div>
                  {/* Nacionalidade */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nacionalidade</label>
                    <input type="text" value={editBiographicData.nationality || ''} onChange={(e) => setEditBiographicData({...editBiographicData, nationality: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                  </div>
                  {/* Nome Pai */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome do Pai</label>
                    <input type="text" value={editBiographicData.fatherName || ''} onChange={(e) => setEditBiographicData({...editBiographicData, fatherName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                  </div>
                  {/* Nome Mãe */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome da Mãe</label>
                    <input type="text" value={editBiographicData.motherName || ''} onChange={(e) => setEditBiographicData({...editBiographicData, motherName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                  </div>
                  {/* Profissão */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profissão</label>
                    <input type="text" value={editBiographicData.profession || ''} onChange={(e) => setEditBiographicData({...editBiographicData, profession: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                  </div>
                  {/* NIF */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NIF</label>
                    <input type="text" value={editBiographicData.nif || ''} onChange={(e) => setEditBiographicData({...editBiographicData, nif: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all" />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t-2 border-slate-100 flex items-center justify-end gap-3">
                <button onClick={() => setShowEditBiographic(false)} className="px-4 py-2 bg-white text-slate-700 border-2 border-slate-200 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setSelectedFicha((prev: any) => ({ ...prev, ...editBiographicData }));
                    setFichas((prev: any[]) => prev.map(f => f.id === selectedFicha?.id ? { ...f, ...editBiographicData } : f));
                    setShowEditBiographic(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all"
                >
                  <Check size={14} />
                  Guardar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal — Editar Motivo de Cadastro */}
      <AnimatePresence>
        {editingMotivoId !== null && (() => {
          const reg = (selectedFicha?.registrationReasons || []).find((r: any) => r.id === editingMotivoId);
          if (!reg) return null;
          return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Motivo de Cadastro</p>
                    <h2 className="text-sm font-black text-white">{reg.refNo} — {reg.date}</h2>
                  </div>
                  <button onClick={() => setEditingMotivoId(null)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <X size={18} />
                  </button>
                </div>

                {/* Contexto readonly — strip compacto */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-b-2 border-slate-100 bg-slate-50">
                  {[
                    { label: 'Tipo de Auto', value: reg.auto_type },
                    { label: 'Natureza', value: reg.natureza },
                    { label: 'Tipologia', value: reg.tipologia },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-4 py-3 space-y-0.5">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                      <p className="text-xs font-bold text-slate-700 leading-tight">{value || '---'}</p>
                    </div>
                  ))}
                </div>

                {/* Campos editáveis */}
                <div className="p-6 space-y-5">
                  {/* Tipo */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo</label>
                    <div className="flex gap-2">
                      {['Criminal', 'Policial'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setEditingMotivoData({ ...editingMotivoData, type: t })}
                          className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest border-2 transition-all ${
                            editingMotivoData.type === t
                              ? t === 'Criminal'
                                ? 'bg-purple-600 border-purple-600 text-white'
                                : 'bg-blue-600 border-blue-600 text-white'
                              : 'bg-white border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-700'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nº SIJ + Unidade */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nº SIJ</label>
                      <input
                        type="text"
                        value={editingMotivoData.sijNo}
                        onChange={(e) => setEditingMotivoData({ ...editingMotivoData, sijNo: e.target.value })}
                        placeholder="Ex: SIJ-2024-0001"
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade</label>
                      <select
                        value={editingMotivoData.unit}
                        onChange={(e) => setEditingMotivoData({ ...editingMotivoData, unit: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all appearance-none"
                      >
                        <option value="">Selecione...</option>
                        <option>ESF Praia</option>
                        <option>ESF Mindelo</option>
                        <option>ESF Santa Catarina</option>
                        <option>ESF São Vicente</option>
                        <option>DP Praia</option>
                        <option>DP Mindelo</option>
                        <option>DP Santa Cruz</option>
                        <option>DP Tarrafal</option>
                      </select>
                    </div>
                  </div>

                  {/* Medidas Aplicadas */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medidas Aplicadas</label>
                    <select
                      value={editingMotivoData.measures}
                      onChange={(e) => setEditingMotivoData({ ...editingMotivoData, measures: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-slate-900 transition-all appearance-none"
                    >
                      <option value="">Selecione...</option>
                      <option>Prisão Preventiva</option>
                      <option>Termo de Identidade e Residência</option>
                      <option>Liberdade Provisória</option>
                      <option>Obrigação de Apresentação Periódica</option>
                      <option>Proibição de Contacto</option>
                      <option>Suspensão de Pena</option>
                      <option>Multa</option>
                      <option>Sem medidas aplicadas</option>
                    </select>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t-2 border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
                  <button onClick={() => setEditingMotivoId(null)} className="px-4 py-2 bg-white text-slate-700 border-2 border-slate-200 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all">
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFicha((prev: any) => ({
                        ...prev,
                        registrationReasons: (prev.registrationReasons || []).map((r: any) =>
                          r.id === editingMotivoId
                            ? { ...r, type: editingMotivoData.type, sijNo: editingMotivoData.sijNo, unit: editingMotivoData.unit, measures: editingMotivoData.measures }
                            : r
                        )
                      }));
                      setEditingMotivoId(null);
                    }}
                    className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all"
                  >
                    <Check size={14} /> Guardar
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
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
                          src={getPortraitUrl(photo.seed)}
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

      {/* Modal de Seleção de Exportação */}
      <AnimatePresence>
        {showExportSelectModal && selectedFicha && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border-2 border-slate-200 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500 p-2 rounded-lg"><FileText size={18} className="text-white" /></div>
                  <div>
                    <h3 className="text-white font-black text-sm uppercase tracking-widest">Exportar Ficha de Cadastro</h3>
                    <p className="text-slate-400 text-[10px]">Selecione o conteúdo a incluir no PDF</p>
                  </div>
                </div>
                <button onClick={() => setShowExportSelectModal(false)} className="p-2 text-slate-400 hover:text-white rounded-full transition-all"><X size={20} /></button>
              </div>

              <div className="p-6 space-y-6">
                {/* Secções gerais */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secções a incluir</p>
                  {[
                    { key: 'photo', label: 'Fotografia de Perfil', desc: 'Foto frontal do cadastrado' },
                    { key: 'sinalComplementar', label: 'Sinais Complementares', desc: 'Características físicas, tatuagens, cicatrizes' },
                    { key: 'outrasInfo', label: 'Outras Informações', desc: 'Moradas, contactos, alcunhas' },
                  ].map(({ key, label, desc }) => (
                    <label key={key} className="flex items-center gap-4 p-4 border-2 border-slate-100 rounded-xl hover:border-slate-300 cursor-pointer transition-all group">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${exportOptions[key as keyof typeof exportOptions] ? 'bg-slate-900 border-slate-900' : 'border-slate-300'}`}>
                        {exportOptions[key as keyof typeof exportOptions] && <Check size={12} className="text-white" />}
                      </div>
                      <input type="checkbox" className="sr-only" checked={!!exportOptions[key as keyof typeof exportOptions]}
                        onChange={(e) => setExportOptions(prev => ({ ...prev, [key]: e.target.checked }))} />
                      <div>
                        <p className="text-sm font-black text-slate-900">{label}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Motivos de Cadastro */}
                {(selectedFicha.registrationReasons || []).length > 0 && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Motivos de Cadastro a incluir</p>
                    {(selectedFicha.registrationReasons || []).map((r: any) => (
                      <label key={r.id} className="flex items-center gap-4 p-4 border-2 border-slate-100 rounded-xl hover:border-slate-300 cursor-pointer transition-all">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${exportOptions.motivoIds.includes(r.id) ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                          {exportOptions.motivoIds.includes(r.id) && <Check size={12} className="text-white" />}
                        </div>
                        <input type="checkbox" className="sr-only" checked={exportOptions.motivoIds.includes(r.id)}
                          onChange={(e) => setExportOptions(prev => ({
                            ...prev,
                            motivoIds: e.target.checked ? [...prev.motivoIds, r.id] : prev.motivoIds.filter(id => id !== r.id)
                          }))} />
                        <div className="flex-1">
                          <p className="text-sm font-black text-slate-900">{r.reason}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${r.type === 'Criminal' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{r.type}</span>
                            <span className="text-[10px] text-slate-400">{r.date}</span>
                            <span className="text-[10px] text-slate-500 font-bold">{r.status}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-6 pb-6 flex items-center justify-end gap-3">
                <Button variant="outline" onClick={() => setShowExportSelectModal(false)}>Cancelar</Button>
                <Button variant="success" icon={FileText} onClick={() => { setShowExportSelectModal(false); setShowPdfModal(true); }}>Gerar PDF</Button>
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
                  <div className="bg-red-500 p-2 rounded"><FileText size={20} className="text-white" /></div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Ficha_Cadastro_{selectedFicha.number}.pdf</h3>
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Documento de Cadastro Policial</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => { setShowPdfModal(false); setShowExportSelectModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 rounded-lg transition-all text-xs font-bold border border-slate-600">
                    <ArrowLeft size={16} />
                    Alterar Seleção
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all text-xs font-bold border border-slate-700">
                    <Printer size={16} />
                    Imprimir
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded-lg transition-all text-xs font-bold shadow-lg shadow-blue-900/20">
                    <Download size={16} />
                    Download
                  </button>
                  <div className="w-px h-6 bg-slate-700 mx-2" />
                  <button onClick={() => setShowPdfModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all">
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* PDF Content Area */}
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
                      <Shield size={40} className="text-slate-200" />
                    </div>
                  </div>

                  {/* Document Title */}
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-black uppercase underline decoration-4 underline-offset-8">Ficha de Cadastro Individual</h2>
                    <p className="mt-4 text-slate-500 font-sans text-sm">N.º de Registo: <span className="font-bold text-slate-900">{selectedFicha.number}</span> | Data de Emissão: {new Date().toLocaleDateString('pt-PT')}</p>
                  </div>

                  {/* Main Content Grid — foto + dados básicos */}
                  <div className={`grid gap-8 mb-10 ${exportOptions.photo ? 'grid-cols-3' : 'grid-cols-1'}`}>
                    {exportOptions.photo && (
                      <div className="col-span-1">
                        <div className="w-full aspect-[3/4] border-4 border-slate-900 bg-slate-100 overflow-hidden">
                          <img src={getPortraitUrl(selectedFicha?.number || 'frontal')} alt="Frontal" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                        </div>
                        <p className="text-center mt-2 text-[10px] uppercase font-bold font-sans text-slate-400 tracking-widest">Fotografia Frontal</p>
                      </div>
                    )}
                    <div className={`${exportOptions.photo ? 'col-span-2' : 'col-span-1'} space-y-4 font-sans`}>
                      <div className="border-b border-slate-200 pb-2">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Nome Completo</p>
                        <p className="text-lg font-bold text-slate-900">{selectedFicha.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-b border-slate-200 pb-2">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Data de Nascimento</p>
                          <p className="text-sm font-bold text-slate-900">{selectedFicha.birthDate || '—'}</p>
                        </div>
                        <div className="border-b border-slate-200 pb-2">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Naturalidade</p>
                          <p className="text-sm font-bold text-slate-900">{selectedFicha.birthPlace || selectedFicha.island || '—'}</p>
                        </div>
                        <div className="border-b border-slate-200 pb-2">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Género</p>
                          <p className="text-sm font-bold text-slate-900">{selectedFicha.gender || '—'}</p>
                        </div>
                        <div className="border-b border-slate-200 pb-2">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Estado Civil</p>
                          <p className="text-sm font-bold text-slate-900">{selectedFicha.civilStatus || '—'}</p>
                        </div>
                        <div className="border-b border-slate-200 pb-2">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">Nacionalidade</p>
                          <p className="text-sm font-bold text-slate-900">{selectedFicha.nationality || '—'}</p>
                        </div>
                        <div className="border-b border-slate-200 pb-2">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">N.º Documento</p>
                          <p className="text-sm font-bold text-slate-900">{selectedFicha.docNumber || selectedFicha.number || '—'}</p>
                        </div>
                      </div>
                      {(selectedFicha.fatherName || selectedFicha.motherName) && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border-b border-slate-200 pb-2">
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Filiação — Pai</p>
                            <p className="text-sm font-bold text-slate-900">{selectedFicha.fatherName || '—'}</p>
                          </div>
                          <div className="border-b border-slate-200 pb-2">
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Filiação — Mãe</p>
                            <p className="text-sm font-bold text-slate-900">{selectedFicha.motherName || '—'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sinais Complementares */}
                  {exportOptions.sinalComplementar && (() => {
                    const grupo = (selectedFicha.complementaryGroups || []).find((g: any) => !g.validTo) || (selectedFicha.complementaryGroups || [])[0];
                    if (!grupo) return null;
                    return (
                      <div className="space-y-3 mb-10 font-sans">
                        <h3 className="text-sm font-black uppercase bg-slate-900 text-white px-3 py-1.5 inline-block">Sinais Complementares</h3>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-3 border-t-2 border-slate-900 pt-4">
                          {(grupo.characteristics || []).map((c: any, i: number) => (
                            <div key={i} className="flex justify-between items-end border-b border-slate-100 pb-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">{c.name}</span>
                              <span className="text-xs font-bold text-slate-900">{c.value}{c.observation ? ` (${c.observation})` : ''}</span>
                            </div>
                          ))}
                        </div>
                        {grupo.otherNotes && (
                          <p className="text-xs text-slate-500 italic mt-2">Notas: {grupo.otherNotes}</p>
                        )}
                      </div>
                    );
                  })()}

                  {/* Outras Informações */}
                  {exportOptions.outrasInfo && (
                    <div className="space-y-6 mb-10 font-sans">
                      <h3 className="text-sm font-black uppercase bg-slate-900 text-white px-3 py-1.5 inline-block">Outras Informações</h3>

                      {(selectedFicha.addresses || []).length > 0 && (
                        <div className="border-t-2 border-slate-900 pt-4 space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Moradas</p>
                          {(selectedFicha.addresses || []).map((a: any, i: number) => (
                            <div key={i} className="text-xs text-slate-800 border-b border-slate-100 pb-1">
                              <span className="font-bold">{a.type}:</span> {[a.locality, a.parish, a.council, a.island].filter(Boolean).join(', ')}
                              {a.reference ? ` — Ref: ${a.reference}` : ''}
                            </div>
                          ))}
                        </div>
                      )}

                      {(selectedFicha.contacts || []).length > 0 && (
                        <div className="border-t border-slate-200 pt-4 space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Contactos</p>
                          <div className="grid grid-cols-2 gap-2">
                            {(selectedFicha.contacts || []).map((c: any, i: number) => (
                              <div key={i} className="text-xs text-slate-800">
                                <span className="font-bold">{c.type}:</span> {c.info}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {(selectedFicha.nicknames || []).length > 0 && (
                        <div className="border-t border-slate-200 pt-4 space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Alcunhas</p>
                          <p className="text-xs text-slate-800">{(selectedFicha.nicknames || []).map((n: any) => n.value).join(', ')}</p>
                        </div>
                      )}

                    </div>
                  )}

                  {/* Motivos de Cadastro */}
                  {exportOptions.motivoIds.length > 0 && (
                    <div className="space-y-3 mb-10 font-sans">
                      <h3 className="text-sm font-black uppercase bg-slate-900 text-white px-3 py-1.5 inline-block">Motivos de Cadastro</h3>
                      <div className="border-t-2 border-slate-900 pt-4 space-y-3">
                        {(selectedFicha.registrationReasons || [])
                          .filter((r: any) => exportOptions.motivoIds.includes(r.id))
                          .map((r: any, i: number) => (
                            <div key={i} className="border border-slate-200 rounded p-3 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-slate-900">{r.reason}</span>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${r.type === 'Criminal' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{r.type}</span>
                              </div>
                              <div className="flex gap-4 text-[10px] text-slate-500">
                                <span>Data: <span className="font-bold text-slate-700">{r.date}</span></span>
                                {r.refNo && r.refNo !== '---' && <span>Ref: <span className="font-bold text-slate-700">{r.refNo}</span></span>}
                                <span>Estado: <span className="font-bold text-slate-700">{r.status}</span></span>
                              </div>
                              {r.destination && r.destination !== '---' && (
                                <p className="text-[10px] text-slate-500">Destino: <span className="font-bold text-slate-700">{r.destination}</span></p>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Footer / Signatures */}
                  <div className="mt-auto pt-16 grid grid-cols-2 gap-24 font-sans">
                    <div className="text-center space-y-10">
                      <div className="w-full h-px bg-slate-300" />
                      <p className="text-[10px] font-bold uppercase text-slate-400">Assinatura do Funcionário</p>
                    </div>
                    <div className="text-center space-y-10">
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
                        <option value="Dedo Polegar Direito">Dedo Polegar Direito</option>
                        <option value="Dedo Indicador Direito">Dedo Indicador Direito</option>
                        <option value="Dedo Médio Direito">Dedo Médio Direito</option>
                        <option value="Dedo Anelar Direito">Dedo Anelar Direito</option>
                        <option value="Dedo Mindinho Direito">Dedo Mindinho Direito</option>
                        <option value="Dedo Polegar Esquerdo">Dedo Polegar Esquerdo</option>
                        <option value="Dedo Indicador Esquerdo">Dedo Indicador Esquerdo</option>
                        <option value="Dedo Médio Esquerdo">Dedo Médio Esquerdo</option>
                        <option value="Dedo Anelar Esquerdo">Dedo Anelar Esquerdo</option>
                        <option value="Dedo Mindinho Esquerdo">Dedo Mindinho Esquerdo</option>
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

      {/* Lost Document Search Modal (Certificado de Extravio) */}
      <AnimatePresence>
        {showLostDocSearchModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLostDocSearchModal(false)}
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
                  onClick={() => setShowLostDocSearchModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {lostDocSearchResults.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                      <Search size={32} />
                    </div>
                    <p className="font-bold text-slate-900">Nenhum resultado encontrado para {lostDocSearchName ? `"${lostDocSearchName}"` : ''} {lostDocSearchName && lostDocSearchNumber ? 'e' : ''} {lostDocSearchNumber ? `"${lostDocSearchNumber}"` : ''}</p>
                    <p className="text-sm text-slate-400">Tente buscar por um nome ou número de documento diferente.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Selecione o documento correspondente:</p>
                    <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2">
                      {lostDocSearchResults.map((ficha) => (
                        <button
                          key={ficha.id}
                          onClick={() => selectLostDocFromSearch(ficha)}
                          className="w-full text-left p-4 bg-slate-50 border-2 border-slate-100 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all group"
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h4 className="font-black text-slate-900 uppercase text-xs tracking-tight group-hover:text-blue-600">{ficha.name}</h4>
                              <div className="flex gap-4 text-[10px] text-slate-400 font-bold">
                                <span>Doc: {ficha.docType || lostDocSearchType} {ficha.docNumber || ficha.number || '---'}</span>
                                <span>Emissão: {ficha.docIssueDate || '---'}</span>
                                <span>Validade: {ficha.docExpiryDate || '---'}</span>
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
                  <Button variant="outline" onClick={() => setShowLostDocSearchModal(false)}>Fechar</Button>
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
                    placeholder="Ex: PRE-1000/N/2026"
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border-2 border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg"><Check size={18} className="text-white" /></div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Realizar Levantamento</h3>
                </div>
                <button onClick={() => { setShowLevantamentoModal(false); setLevantamentoIsOwner(null); setLevantamentoOtherPerson({ fullName: '', birthDate: '', docNumber: '', docType: 'CNI' }); }}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Dados do documento (sempre visível) */}
                <div className="bg-slate-50 border-2 border-slate-100 rounded-xl p-4 space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documento a Levantar</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Titular</p>
                      <p className="text-sm font-black text-slate-900">{registeredDoc?.document?.fullName || '---'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Nº Documento</p>
                      <p className="text-sm font-black text-slate-900">{registeredDoc?.document?.number || '---'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Tipo</p>
                      <p className="text-sm font-black text-slate-900">{registeredDoc?.document?.type || '---'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Data Nascimento</p>
                      <p className="text-sm font-black text-slate-900">{registeredDoc?.document?.birthDate || '---'}</p>
                    </div>
                  </div>
                </div>

                {/* Pergunta: quem levanta? */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Quem está a realizar o levantamento?</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { setLevantamentoIsOwner(true); setLevantamentoOtherPerson({ fullName: '', birthDate: '', docNumber: '', docType: 'CNI' }); }}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        levantamentoIsOwner === true
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${levantamentoIsOwner === true ? 'border-emerald-500' : 'border-slate-300'}`}>
                          {levantamentoIsOwner === true && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <span className="text-xs font-black text-slate-900">O Próprio Titular</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium pl-6">O dono do documento</p>
                    </button>
                    <button
                      onClick={() => setLevantamentoIsOwner(false)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        levantamentoIsOwner === false
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${levantamentoIsOwner === false ? 'border-blue-500' : 'border-slate-300'}`}>
                          {levantamentoIsOwner === false && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                        </div>
                        <span className="text-xs font-black text-slate-900">Outra Pessoa</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium pl-6">Terceiro autorizado</p>
                    </button>
                  </div>
                </div>

                {/* Campos para outra pessoa */}
                {levantamentoIsOwner === false && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-l-4 border-blue-500 pl-3">Dados do Coletor</p>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo <span className="text-red-500">*</span></label>
                        <input type="text" value={levantamentoOtherPerson.fullName}
                          onChange={(e) => setLevantamentoOtherPerson({...levantamentoOtherPerson, fullName: e.target.value})}
                          placeholder="Nome completo do coletor"
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data de Nascimento <span className="text-red-500">*</span></label>
                        <input type="date" value={levantamentoOtherPerson.birthDate}
                          onChange={(e) => setLevantamentoOtherPerson({...levantamentoOtherPerson, birthDate: e.target.value})}
                          className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo Documento <span className="text-red-500">*</span></label>
                          <select value={levantamentoOtherPerson.docType}
                            onChange={(e) => setLevantamentoOtherPerson({...levantamentoOtherPerson, docType: e.target.value})}
                            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all">
                            <option value="CNI">CNI</option>
                            <option value="BI">BI</option>
                            <option value="Passaporte">Passaporte</option>
                            <option value="TRE">TRE</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nº Documento <span className="text-red-500">*</span></label>
                          <input type="text" value={levantamentoOtherPerson.docNumber}
                            onChange={(e) => setLevantamentoOtherPerson({...levantamentoOtherPerson, docNumber: e.target.value})}
                            placeholder="Nº de identificação"
                            className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t-2 border-slate-100 flex gap-3 justify-between">
                <Button variant="outline" onClick={() => { setShowLevantamentoModal(false); setLevantamentoIsOwner(null); setLevantamentoOtherPerson({ fullName: '', birthDate: '', docNumber: '', docType: 'CNI' }); }}>
                  Cancelar
                </Button>
                {(() => {
                  const otherPersonValid = levantamentoOtherPerson.fullName.trim() && levantamentoOtherPerson.birthDate && levantamentoOtherPerson.docNumber.trim();
                  const canSubmit = levantamentoIsOwner === true || (levantamentoIsOwner === false && otherPersonValid);
                  return (
                    <button
                      disabled={!canSubmit}
                      onClick={() => {
                        setRegisteredDoc({
                          ...registeredDoc,
                          levantamento: {
                            isOwner: levantamentoIsOwner,
                            nome: levantamentoIsOwner ? registeredDoc?.document?.fullName : levantamentoOtherPerson.fullName,
                            dataNascimento: levantamentoIsOwner ? registeredDoc?.document?.birthDate : levantamentoOtherPerson.birthDate,
                            docType: levantamentoIsOwner ? registeredDoc?.document?.type : levantamentoOtherPerson.docType,
                            docNumber: levantamentoIsOwner ? registeredDoc?.document?.number : levantamentoOtherPerson.docNumber,
                            registadoPor: user?.name || 'Administrador do Sistema',
                            dataLevantamento: new Date().toLocaleDateString('pt-BR')
                          }
                        });
                        setShowLevantamentoModal(false);
                        setLevantamentoIsOwner(null);
                        setLevantamentoOtherPerson({ fullName: '', birthDate: '', docNumber: '', docType: 'CNI' });
                        setSuccessMessage('Levantamento realizado com sucesso.');
                        setShowSuccessModal(true);
                      }}
                      className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${
                        canSubmit ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Check size={14} /> Concluir Levantamento
                    </button>
                  );
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
