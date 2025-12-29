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

  // Get all images from a Google Drive folder
  static async getImagesFromFolder(folderId: string): Promise<string[]> {
    try {
      // For now, return sample images. In production, you'd use Google Drive API
      // This is a simplified version - you can manually add image URLs
      const sampleImages = [
        `https://drive.google.com/uc?export=download&id=1abc123def456`, // Replace with actual file IDs
        `https://drive.google.com/uc?export=download&id=2def456ghi789`,
        // Add more image IDs from your Google Drive
      ];

      return sampleImages;
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