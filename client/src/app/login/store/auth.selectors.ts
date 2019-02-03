import { createSelector } from '@ngrx/store';

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
    selectAuthState,
    auth => auth.isLoggedIn
)

export const message = createSelector(
    selectAuthState,
    auth => auth.message
)

