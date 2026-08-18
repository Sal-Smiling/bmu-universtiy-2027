import axios from 'axios';
import { programsData } from '../data/programsData';
import { newsData } from '../data/newsData';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bmu-universtiy-2027.onrender.com/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Fetch all academic programs from MongoDB via backend API
 * Automatically falls back to local programsData if backend server is offline
 */
export const fetchPrograms = async (params = {}) => {
  try {
    const response = await apiClient.get('/programs', { params });
    return response.data.data;
  } catch (error) {
    console.warn('[API Service]: Backend offline or unreachable. Using local fallback programsData.');
    let data = [...programsData];
    if (params.category && params.category !== 'All') {
      data = data.filter((p) => p.category === params.category);
    }
    if (params.degree && params.degree !== 'All') {
      data = data.filter((p) => p.degree === params.degree);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      data = data.filter(
        (p) => p.title.toLowerCase().includes(q) || p.department.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return data;
  }
};

/**
 * Fetch all news articles from MongoDB via backend API
 * Automatically falls back to local newsData if backend server is offline
 */
export const fetchNews = async (params = {}) => {
  try {
    const response = await apiClient.get('/news', { params });
    return response.data.data;
  } catch (error) {
    console.warn('[API Service]: Backend offline or unreachable. Using local fallback newsData.');
    let data = [...newsData];
    if (params.category && params.category !== 'All') {
      data = data.filter((n) => n.category === params.category);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      data = data.filter(
        (n) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return data;
  }
};

export const createNews = async (payload) => {
  try {
    const response = await apiClient.post('/news', payload);
    return response.data.data;
  } catch (error) {
    console.warn('[API Service]: Failed creating news:', error.message);
    throw error;
  }
};

export const updateNews = async (id, payload) => {
  try {
    const response = await apiClient.put(`/news/${id}`, payload);
    return response.data.data;
  } catch (error) {
    console.warn(`[API Service]: Failed updating news ${id}:`, error.message);
    throw error;
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await apiClient.delete(`/news/${id}`);
    return response.data;
  } catch (error) {
    console.warn(`[API Service]: Failed deleting news ${id}:`, error.message);
    throw error;
  }
};

export const fetchSettings = async () => {
  try {
    const response = await apiClient.get('/settings', { params: { _t: Date.now() } });
    return response.data.data;
  } catch (error) {
    console.warn('[API Service]: Backend settings unreachable. Using defaults.');
    return {
      banner: { 
        title: 'Shaping Quantum Pioneers & Ethical Innovators', 
        subtitle: 'Leading research, dual degrees, and technological breakthroughs across Southeast Asia and the globe.',
        tag: 'Global Collaboration',
        image: '',
        slides: []
      },
      partner_emblems: null,
      stats: { content: { activeStudents: '12,450+', faculties: '8 Academic Schools', institutions: '15+ Global Centers' } },
      tuition_fees: { content: [{ degree: 'Undergraduate BS (AI & Computing)', fee: '$8,500 / Year', scholarship: 'Up to 50% Merit Aid' }] }
    };
  }
};

export const saveSetting = async (key, payload) => {
  try {
    const response = await apiClient.post('/settings', { key, ...payload });
    return response.data.data;
  } catch (error) {
    console.warn(`[API Service]: Failed saving setting ${key}:`, error.message);
    return null;
  }
};


export const fetchTeam = async (params = {}) => {
  try {
    const response = await apiClient.get('/team', { params: { ...params, _t: Date.now() } });
    return response.data.data;
  } catch (error) {
    console.warn('[API Service]: Backend team unreachable. Using defaults.');
    return [];
  }
};

export const createTeamMember = async (payload) => {
  try {
    const response = await apiClient.post('/team', payload);
    return response.data.data;
  } catch (error) {
    console.warn('[API Service]: Failed creating team member:', error.message);
    throw error;
  }
};

export const updateTeamMember = async (id, payload) => {
  try {
    const response = await apiClient.put(`/team/${id}`, payload);
    return response.data.data;
  } catch (error) {
    console.warn(`[API Service]: Failed updating team member ${id}:`, error.message);
    throw error;
  }
};

export const deleteTeamMember = async (id) => {
  try {
    const response = await apiClient.delete(`/team/${id}`);
    return response.data;
  } catch (error) {
    console.warn(`[API Service]: Failed deleting team member ${id}:`, error.message);
    throw error;
  }
};

export const reorderTeamMember = async (id, direction) => {
  try {
    const response = await apiClient.put(`/team/reorder/${id}`, { direction });
    return response.data.data;
  } catch (error) {
    console.warn(`[API Service]: Failed reordering team member ${id}:`, error.message);
    throw error;
  }
};

export const fetchEvents = async (params = {}) => {
  try {
    const response = await apiClient.get('/events', { params });
    return response.data.data;
  } catch (error) {
    console.warn('[API Service]: Backend events unreachable.');
    return [];
  }
};

export const createEvent = async (data) => {
  const response = await apiClient.post('/events', data);
  return response.data.data || response.data;
};

export const updateEvent = async (id, data) => {
  const response = await apiClient.put(`/events/${id}`, data);
  return response.data.data || response.data;
};

export const deleteEvent = async (id) => {
  const response = await apiClient.delete(`/events/${id}`);
  return response.data;
};

export const fetchInternships = async (params = {}) => {
  try {
    const response = await apiClient.get('/internships', { params });
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.warn('[API Service]: Backend internships unreachable.');
    return [];
  }
};

export const createInternship = async (data) => {
  const response = await apiClient.post('/internships', data);
  return response.data.data;
};

export const updateInternship = async (id, data) => {
  const response = await apiClient.put(`/internships/${id}`, data);
  return response.data.data;
};

export const deleteInternship = async (id) => {
  const response = await apiClient.delete(`/internships/${id}`);
  return response.data;
};

// --- Scholarship API Methods ---

export const fetchScholarships = async (params = {}) => {
  try {
    const response = await apiClient.get('/scholarships', { params });
    return response.data;
  } catch (error) {
    console.warn('[API Service]: Backend scholarships unreachable.');
    return [];
  }
};

export const createScholarship = async (data) => {
  const response = await apiClient.post('/scholarships', data);
  return response.data;
};

export const updateScholarship = async (id, data) => {
  const response = await apiClient.put(`/scholarships/${id}`, data);
  return response.data;
};

export const deleteScholarship = async (id) => {
  const response = await apiClient.delete(`/scholarships/${id}`);
  return response.data;
};

// --- Campus Life API Methods ---

export const fetchCampusLife = async (params = {}) => {
  try {
    const response = await apiClient.get('/campus-life', { params });
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.warn('[API Service]: Backend campus life unreachable.');
    return [];
  }
};

export const createCampusLife = async (data) => {
  const response = await apiClient.post('/campus-life', data);
  return response.data;
};

export const updateCampusLife = async (id, data) => {
  const response = await apiClient.put(`/campus-life/${id}`, data);
  return response.data;
};

export const deleteCampusLife = async (id) => {
  const response = await apiClient.delete(`/campus-life/${id}`);
  return response.data;
};

// --- Community Services API Methods ---

export const fetchCommunityServices = async (params = {}) => {
  try {
    const response = await apiClient.get('/community-services', { params });
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.warn('[API Service]: Backend community services unreachable.');
    return [];
  }
};

export const createCommunityService = async (serviceData) => {
  const response = await apiClient.post('/community-services', serviceData);
  return response.data;
};

export const updateCommunityService = async (id, serviceData) => {
  const response = await apiClient.put(`/community-services/${id}`, serviceData);
  return response.data;
};

export const deleteCommunityService = async (id) => {
  const response = await apiClient.delete(`/community-services/${id}`);
  return response.data;
};

// --- Partners API (Global Reach) ---
export const fetchPartners = async (params = {}) => {
  try {
    const response = await apiClient.get('/partners', { params });
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.warn('[API Service]: Backend partners unreachable.');
    return [];
  }
};

export const createPartner = async (partnerData) => {
  const response = await apiClient.post('/partners', partnerData);
  return response.data;
};

export const updatePartner = async (id, partnerData) => {
  const response = await apiClient.put(`/partners/${id}`, partnerData);
  return response.data;
};

export const deletePartner = async (id) => {
  const response = await apiClient.delete(`/partners/${id}`);
  return response.data;
};

// --- Partnerships & MOU API ---
export const fetchPartnerships = async (params = {}) => {
  try {
    const response = await apiClient.get('/partnerships', { params });
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.warn('[API Service]: Backend partnerships unreachable.');
    return [];
  }
};

export const createPartnership = async (partnershipData) => {
  const response = await apiClient.post('/partnerships', partnershipData);
  return response.data;
};

export const updatePartnership = async (id, partnershipData) => {
  const response = await apiClient.put(`/partnerships/${id}`, partnershipData);
  return response.data;
};

export const deletePartnership = async (id) => {
  const response = await apiClient.delete(`/partnerships/${id}`);
  return response.data;
};

// ==========================================
// FACULTIES API
// ==========================================
export const fetchFaculties = async () => {
  try {
    const response = await apiClient.get('/faculties');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching faculties:', error);
    return [];
  }
};

export const createFaculty = async (facultyData) => {
  try {
    const response = await apiClient.post('/faculties', facultyData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating faculty:', error);
    throw error;
  }
};

export const updateFaculty = async (id, facultyData) => {
  try {
    const response = await apiClient.put(`/faculties/${id}`, facultyData);
    return response.data.data;
  } catch (error) {
    console.error('Error updating faculty:', error);
    throw error;
  }
};

export const deleteFaculty = async (id) => {
  try {
    const response = await apiClient.delete(`/faculties/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting faculty:', error);
    throw error;
  }
};

export default apiClient;
