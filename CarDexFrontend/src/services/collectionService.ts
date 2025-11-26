/**
 * Collection Service
 * Handles user collection operations
 */

import apiClient from '../api/apiClient';
import { API_CONFIG } from '../config/api.config';
import {
  CollectionListResponse,
  CollectionSummary,
  CollectionDetailedResponse,
} from '../types/types';

export const collectionService = {
  // Get all collections
  getAllCollections: async (): Promise<CollectionListResponse> => {
    const response = await apiClient.get<CollectionListResponse>(
      API_CONFIG.ENDPOINTS.COLLECTIONS.GET_ALL
    );
    return response.data;
  },

  /**
   * Get a single collection by its GUID (detailed: with cards)
   */
  getCollectionById: async (
    collectionId: string
  ): Promise<CollectionDetailedResponse> => {
    const response = await apiClient.get<CollectionDetailedResponse>(
      API_CONFIG.ENDPOINTS.COLLECTIONS.GET_COLLECTION_BY_ID(collectionId)
    );
    return response.data;
  },
};
