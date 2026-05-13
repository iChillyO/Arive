import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Conversation {
  id: string;
  title: string;
  model: string;
  agentType: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

interface ChatState {
  // Conversations
  conversations: Conversation[];
  activeConversationId: string | null;
  selectedModel: string;

  // Actions
  createConversation: (agentType?: string) => string;
  setActiveConversation: (id: string | null) => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, title: string) => void;
  setSelectedModel: (model: string) => void;
  incrementMessageCount: (id: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,
      selectedModel: "gpt-4o",

      createConversation: (agentType = "chat") => {
        const id = Date.now().toString();
        const conversation: Conversation = {
          id,
          title: "New Conversation",
          model: get().selectedModel,
          agentType,
          createdAt: new Date(),
          updatedAt: new Date(),
          messageCount: 0,
        };
        set((state) => ({
          conversations: [conversation, ...state.conversations],
          activeConversationId: id,
        }));
        return id;
      },

      setActiveConversation: (id) => set({ activeConversationId: id }),

      deleteConversation: (id) =>
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
          activeConversationId:
            state.activeConversationId === id
              ? null
              : state.activeConversationId,
        })),

      renameConversation: (id, title) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, title, updatedAt: new Date() } : c
          ),
        })),

      setSelectedModel: (model) => set({ selectedModel: model }),

      incrementMessageCount: (id) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id
              ? { ...c, messageCount: c.messageCount + 1, updatedAt: new Date() }
              : c
          ),
        })),
    }),
    {
      name: "stack-chat",
      partialize: (state) => ({
        conversations: state.conversations.slice(0, 50), // Keep last 50
        selectedModel: state.selectedModel,
      }),
    }
  )
);
