/**
 * Pack Service
 * Handles pack-related operations: fetching packs and opening packs
 */

import apiClient from '../api/apiClient';
import { API_CONFIG } from '../config/api.config';
import {
  UserPackListResponse,
  PackDetailedResponseDto,
  PackPurchaseResponseDto,
  PackOpenResponseDto,
} from '../types/types';

export interface PackPurchaseRequest {
  collectionId: string;
}

export const packService = {
  /**
   * Get user-owned packs
   */
  getUserPacks: async (userId: string): Promise<UserPackListResponse> => {
    const response = await apiClient.get<UserPackListResponse>(
      API_CONFIG.ENDPOINTS.USERS.GET_PACKS(userId)
    );
    return response.data;
  },

  /**
   * Get pack by ID
   */
  getPackById: async (packId: string): Promise<PackDetailedResponseDto> => {
    const response = await apiClient.get<PackDetailedResponseDto>(
      API_CONFIG.ENDPOINTS.PACKS.GET_BY_ID(packId)
    );
    return response.data;
  },

  /**
   * Purchase a pack for a collection
   */
  purchasePack: async (
    payload: PackPurchaseRequest
  ): Promise<PackPurchaseResponseDto> => {
    const response = await apiClient.post<PackPurchaseResponseDto>(
      API_CONFIG.ENDPOINTS.PACKS.PURCHASE,
      payload
    );
    return response.data;
  },

  /**
   * Open a pack and receive cards
   */
  openPack: async (packId: string): Promise<PackOpenResponseDto> => {
    const response = await apiClient.post<PackOpenResponseDto>(
      API_CONFIG.ENDPOINTS.PACKS.OPEN_PACK(packId)
    );
    return response.data;
  },
};
