// Google Drive Image Service
export class GoogleDriveService {
  // Convert sharing link to direct download link
  static convertToDirectLink(sharingLink: string): string {
    // Extract file ID from sharing link
    const fileIdMatch = sharingLink.match(/\/file\/d\/([a-zA-Z0-9-_]+)/) ||
                       sharingLink.match(/\/folders\/([a-zA-Z0-9-_]+)/) ||
                       sharingLink.match(/id=([a-zA-Z0-9-_]+)/);

    if (!fileIdMatch) return sharingLink;

    const fileId = fileIdMatch[1];

    // If it's a folder, return folder view link
    if (sharingLink.includes('/folders/')) {
      return `https://drive.google.com/drive/folders/${fileId}`;
    }

    // Convert to direct download link
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  // Get all images from a Google Drive folder using folder ID
  static async getImagesFromFolder(folderId: string = '19SaEgW7yPcsJTSAwsSBajBdsmHQrbItB'): Promise<any[]> {
    try {
      const apiKey = (import.meta as any).env?.VITE_GOOGLE_DRIVE_API_KEY || process.env.VITE_GOOGLE_DRIVE_API_KEY || '';

      // If API key is provided, fetch real data from Google Drive API
      if (apiKey) {
        const q = encodeURIComponent(`'${folderId}' in parents and mimeType contains 'image/' and trashed = false`);
        const fields = encodeURIComponent('files(id,name,thumbnailLink,webViewLink)');
        const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&key=${apiKey}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Drive API error: ${res.status}`);
        const data = await res.json();

        const files = (data.files || []).map((f: any) => ({
          id: f.id,
          name: f.name,
          webViewLink: f.webViewLink || `https://drive.google.com/file/d/${f.id}/view`,
          thumbnailLink: f.thumbnailLink || `https://drive.google.com/thumbnail?id=${f.id}&sz=s400`,
          directLink: `https://drive.google.com/uc?export=view&id=${f.id}`,
          category: inferCategoryFromName(f.name)
        }));

        console.log(`Loaded ${files.length} images from Google Drive folder: ${folderId}`);
        return files;
      }

      // Fallback: empty result when no API key; caller may use local JSON
      console.warn('VITE_GOOGLE_DRIVE_API_KEY not set. Returning empty list.');
      return [];
    } catch (error) {
      console.error('Error fetching images from Google Drive:', error);
      return [];
    }
  }

  // Extract folder ID from sharing link
  static extractFolderId(sharingLink: string): string | null {
    const match = sharingLink.match(/\/folders\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
  }
}

// Simple heuristic to infer batik category from filename
function inferCategoryFromName(name: string): string {
  const lower = (name || '').toLowerCase();
  const pairs: Array<[string, string]> = [
    ['aceh', 'batik-aceh'],
    ['bali', 'batik-bali'],
    ['betawi', 'batik-betawi'],
    ['celup', 'batik-celup'],
    ['ciamis', 'batik-ciamis'],
    ['kawung', 'batik-kawung'],
    ['lasem', 'batik-lasem'],
    ['madura', 'batik-madura'],
    ['megamendung', 'batik-megamendung'],
    ['parang', 'batik-parang'],
    ['pekalongan', 'batik-pekalongan'],
    ['sogan', 'batik-sogan'],
    ['solo', 'batik-solo'],
    ['sulawesi', 'batik-sulawesi'],
    ['sumatera', 'batik-sumatera'],
    ['yogyakarta', 'batik-yogyakarta']
  ];
  for (const [key, cat] of pairs) {
    if (lower.includes(key)) return cat;
  }
  return 'batik-unknown';
}

// Utility functions for image handling
export const imageUtils = {
  // Convert Google Drive sharing link to viewable image
  getViewableImageUrl: (sharingLink: string): string => {
    const fileIdMatch = sharingLink.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }
    return sharingLink;
  },

  // Convert to thumbnail (smaller size)
  getThumbnailUrl: (sharingLink: string): string => {
    const fileIdMatch = sharingLink.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=s400`;
    }
    return sharingLink;
  }
};