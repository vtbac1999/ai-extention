export const API_BASE_URL = process.env.API_BASE_URL;

// Auth
export const LOGIN = API_BASE_URL + '/auth/login';
export const GOOGLE_LOGIN = API_BASE_URL + '/auth/google-login';
export const REGISTER = API_BASE_URL + '/auth/register';
export const LOGOUT = API_BASE_URL + '/auth/logout';
export const REFRESH = API_BASE_URL + '/auth/refresh';
export const FORGOT_PASSWORD = API_BASE_URL + '/auth/forgot-password';
export const CHANGE_PASSWORD = API_BASE_URL + '/users/change-password';

// Profile
export const PROFILE = API_BASE_URL + '/users/my-profile';
export const UPDATE_PROFILE = API_BASE_URL + '/users/profile';

// Industry
export const INDUSTRIES = API_BASE_URL + '/industry/search';

// Category
export const CATEGORIES = API_BASE_URL + '/categories';
export const CATEGORY = API_BASE_URL + '/category';

// Topic
export const TOPICS = API_BASE_URL + '/topics/public';
export const TOPIC = API_BASE_URL + '/topics/detail-public';

// Question
export const QUESTIONS = API_BASE_URL + '/questions/category';

// Chat
export const CHAT = API_BASE_URL + '/chat';
export const CHAT_HISTORY = API_BASE_URL + '/conversations';
export const CHAT_SESSION = API_BASE_URL + '/conversations';
// Conversation
export const CONVERSATION = API_BASE_URL + '/openai/conversation/{conversationId}/chatCompletion';
export const CONVERSATION_START = API_BASE_URL + '/openai/conversation';
export const CONVERSATION_GUEST = API_BASE_URL + '/openai/conversation/topic/{topicId}/freeChatCompletion/{uuid}';
export const CONVERSATION_START_GUEST = API_BASE_URL + '/openai/conversation/{uuid}/freeChatCompletion';
export const CONVERSATION_DEFAULT = API_BASE_URL + '/conversations/conversation-default';
// Messages
export const MESSAGES = API_BASE_URL + '/messages/{conversationId}';
// Survey
export const SURVEY = "/users/survey";

// Upload Image
export const UPLOAD_IMAGE = API_BASE_URL + '/upload';

//Subcription
export const SUBSCRIPTION = API_BASE_URL + '/subscriptions/me';

//Pricing plan
export const PRICING_PLAN = API_BASE_URL + '/pricing-plans';

//order
export const ORDERS = API_BASE_URL + '/orders';
export const ORDERS_CURRENT = API_BASE_URL + '/orders/current_order';