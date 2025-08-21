import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ConsentValue = "accepted" | "declined" | null;

interface cookieState {
  consent: ConsentValue;
}

const initialState: cookieState = {
  consent: null,
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 24 * days;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

const cookieSlice = createSlice({
  name: "cookieSlice",
  initialState,
  reducers: {
    setConsent: (state, action: PayloadAction<ConsentValue>) => {
      state.consent = action.payload;
      if (action.payload) {
        setCookie("cookieConsent", action.payload);
      }
    },
    loadConsentFromCookie: (state) => {
      const existing = getCookie("cookieConsent") as ConsentValue;
      if (existing) {
        state.consent = existing;
      }
    },
  },
});

export const { setConsent, loadConsentFromCookie } = cookieSlice.actions;
export default cookieSlice.reducer;
