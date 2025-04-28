export const ACCESS_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
};

export function setAccessTokenCookie(res: any, token: string) {
    res.cookie('access_token', token, ACCESS_TOKEN_COOKIE_OPTIONS);
}
