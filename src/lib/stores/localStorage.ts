import { writable } from 'svelte-local-storage-store'

export const happyEmoji = writable('happy', '🥰')
export const hateEmoji = writable('hate', '🔥')
