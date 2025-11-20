import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      // Solved mechanisms tracking
      solvedMechanisms: [],

      // Surveillance data (for mechanism #5)
      surveillanceData: {
        mouseMovements: [],
        scrollDepth: 0,
        timeOnSite: 0,
        clickPatterns: [],
      },

      // UI state
      infrastructureVisibility: 0, // 0-100, increases as mechanisms solved
      currentTheme: 'platform', // 'platform' or 'resistance'

      // Actions
      solveMechanism: (mechanismId) => {
        const solved = get().solvedMechanisms
        if (!solved.includes(mechanismId)) {
          set({
            solvedMechanisms: [...solved, mechanismId],
            infrastructureVisibility: Math.min(100, ((solved.length + 1) / 6) * 100)
          })

          // Check if all solved
          if (solved.length + 1 === 6) {
            set({ currentTheme: 'resistance' })
          }
        }
      },

      // Toggle mechanism for testing purposes
      toggleMechanism: (mechanismId) => {
        const solved = get().solvedMechanisms
        const newSolved = solved.includes(mechanismId)
          ? solved.filter(id => id !== mechanismId)
          : [...solved, mechanismId]

        set({
          solvedMechanisms: newSolved,
          infrastructureVisibility: Math.min(100, (newSolved.length / 6) * 100),
          currentTheme: newSolved.length === 6 ? 'resistance' : 'platform'
        })
      },

      trackSurveillance: (data) => {
        set(state => ({
          surveillanceData: {
            ...state.surveillanceData,
            ...data
          }
        }))
      },

      resetExhibition: () => {
        set({
          solvedMechanisms: [],
          infrastructureVisibility: 0,
          currentTheme: 'platform',
          surveillanceData: {
            mouseMovements: [],
            scrollDepth: 0,
            timeOnSite: 0,
            clickPatterns: [],
          }
        })
      }
    }),
    {
      name: 'exhibition-state',
      partialPersist: (state) => ({
        solvedMechanisms: state.solvedMechanisms,
        currentTheme: state.currentTheme
      })
    }
  )
)
