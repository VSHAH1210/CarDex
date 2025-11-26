
// ENUMS

// > Card grade rarity, from common -> uncommon -> rare
export enum GradeEnum {
  FACTORY = "FACTORY",
  LIMITED_RUN = "LIMITED_RUN",
  NISMO = "NISMO"
}

// > Trade type, signifying what the User wants in return
export enum TradeEnum {
  FOR_CARD = "FOR_CARD",
  FOR_PRICE = "FOR_PRICE"
}

// > Reward type. Note that all completed trades give a 'reward'
//   to be claimed, instead of giving it to the user directly
export enum RewardEnum {
  PACK = "PACK",
  CURRENCY = "CURRENCY",
  CARD_FROM_TRADE = "CARD_FROM_TRADE",
  CURRENCY_FROM_TRADE = "CURRENCY_FROM_TRADE"
}


export interface User {
  id: string;
  username: string;
  password?: string;
  currency: number;
  owned_cards?: string[];
  owned_packs?: string[];
  open_trades?: string[];
  trade_history?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserPublicProfileResponse {
  id: string;
  username: string;
  createdAt: string;
}

export interface UserProfileResponse extends UserPublicProfileResponse {
  currency: number;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  year: string;
  make: string;
  model: string;
  stat1: number;
  stat2: number;
  statN: number;
  value: number;
  image: string;
}

export interface Card {
  id: string;
  user_id?: string;
  vehicle_id?: string;
  collection_id?: string;
  grade: GradeEnum | string;
  value: number;
  name?: string;
  createdAt?: string;
}

export interface Pack {
  id: string;
  user_id?: string;
  collection_id: string;
  value: number;
}

export interface Collection {
  id: string;
  vehicles: string[];
  name: string;
  image: string;
  packPrice: number;
}

export interface OpenTrade {
  id: string;
  type: TradeEnum;
  user_id: string;
  card_id: string;
  price: number;
  want_card_id: string | null;
}

export interface CompletedTrade {
  id: string;
  type: TradeEnum;
  seller_user_id: string;
  seller_card_id: string;
  buyer_user_id: string;
  buyer_card_id: string | null;
  executed_date: Date;
  price: number;
}

export interface Reward {
  id: string;
  user_id: string;
  type: RewardEnum;
  item_id: string | null;
  amount: number | null;
  created_at: Date;
  claimed_at: Date | null;
}

// Helper types for validation and responses
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface TradeValidation extends ValidationResult {
  trade?: CompletedTrade;
}

/**
 * Represents a user's progress in a specific collection
 */
export interface CollectionProgress {
  collectionId: string;
  collectionName: string;
  collectionImage: string;
  ownedVehicles: number;   
  totalVehicles: number;     // Total unique vehicles in collection
  percentage: number;        
}

/**
 * Response from GET /users/{userId}/collection-progress
 * Contains progress data for all collections where user owns at least 1 card
 */
export interface CollectionProgressResponse {
  collections: CollectionProgress[];
  totalCollections: number;  // How many collections user has cards from
}

/**
 * Detailed vehicle information
 * Used when fetching cards with full vehicle data
 */
export interface VehicleDetails {
  id: string;
  year: string;
  make: string;
  model: string;
  stat1: number;
  stat2: number;
  stat3: number;
  value: number;
  image: string;
}

/**
 * Card with embedded vehicle details
 * Returned by GET /users/{userId}/cards/with-vehicles
 * Combines card metadata (grade, value) with full vehicle info
 */
export interface CardWithVehicle {
  id: string;
  vehicleId: string;
  collectionId: string;
  grade: GradeEnum;
  value: number;
  // Embedded vehicle details
  year: string;
  make: string;
  model: string;
  stat1: number;
  stat2: number;
  stat3: number;
  vehicleImage: string;
}

/**
 * Response from GET /users/{userId}/cards/with-vehicles
 * Returns cards with full vehicle details for display
 */
export interface CardWithVehicleListResponse {
  cards: CardWithVehicle[];
  total: number;
  limit: number;
  offset: number;
}

// One card in the detailed collection response
export interface CollectionCard {
  id: string;
  name: string;
  grade: GradeEnum;   
  value: number;
  createdAt: string;  
}

// Detailed collection response 
export interface CollectionDetailedResponse {
  id: string;
  name: string;
  theme: string;
  description: string;
  cardCount: number;
  cards: CollectionCard[];
}

/**
 * Backend DTOs (API Contracts)
 */

export interface CardSummaryResponse {
  id: string;
  name: string;
  grade: GradeEnum | string;
  value: number;
  createdAt: string;
}

export interface CardListResponseDto {
  cards: CardSummaryResponse[];
  total: number;
  limit: number;
  offset: number;
}

export interface CardDetailedResponse extends CardSummaryResponse {
  description: string;
  vehicleId: string;
  collectionId: string;
  ownerId: string;
}

export interface UserCardSummary {
  id: string;
  vehicleId: string;
  collectionId: string;
  grade: GradeEnum;
  value: number;
}

export interface UserCardListResponse {
  cards: UserCardSummary[];
  total: number;
  limit: number;
  offset: number;
}

export interface UserPackSummary {
  id: string;
  collectionId: string;
  collectionName?: string;
  value: number;
}

export interface UserPackListResponse {
  packs: UserPackSummary[];
  total: number;
}

export interface UserRewardItem {
  id: string;
  userId: string;
  type: RewardEnum;
  itemId: string | null;
  amount: number | null;
  createdAt: string;
  claimedAt: string | null;
}

export interface UserRewardListResponse {
  rewards: UserRewardItem[];
  total: number;
}

export interface TradeResponseDto {
  id: string;
  type: TradeEnum | string;
  userId: string;
  username: string;
  cardId: string;
  price: number | null;
  wantCardId: string | null;
  createdAt: string;
}

export interface TradeDetailedResponseDto extends TradeResponseDto {
  card?: CardDetailedResponse | null;
  wantCard?: CardDetailedResponse | null;
}

export interface TradeListResponseDto {
  trades: TradeResponseDto[];
  total: number;
  limit: number;
  offset: number;
}

export interface UserTradeResponseDto {
  id: string;
  type: TradeEnum | string;
  cardId: string;
  price: number | null;
  wantCardId: string | null;
  createdAt: string;
}

export interface UserTradeListResponseDto {
  trades: UserTradeResponseDto[];
  total: number;
}

export interface CompletedTradeDto {
  id: string;
  type: TradeEnum | string;
  sellerUserId: string;
  sellerCardId: string;
  buyerUserId: string;
  buyerCardId: string | null;
  executedDate: string;
  price: number;
}

export interface ExecuteTradeResponseDto {
  completed_trade: CompletedTradeDto;
  seller_reward: UserRewardItem | null;
  buyer_reward: UserRewardItem | null;
}

export interface CollectionSummary {
  id: string;
  name: string;
  theme: string;
  description: string;
  cardCount: number;
}

export interface CollectionListResponse {
  collections: CollectionSummary[];
  total: number;
}

export interface PackResponseDto {
  id: string;
  collectionId: string;
  collectionName: string;
  purchasedAt: string;
  isOpened: boolean;
}

export interface PackPurchaseResponseDto {
  pack: PackResponseDto;
  userCurrency: number;
}

export interface PackOpenResponseDto {
  cards: CardDetailedResponse[];
  pack: PackResponseDto;
}

export interface PackDetailedResponseDto extends PackResponseDto {
  previewCards: CardSummaryResponse[];
  estimatedValue: number;
}