1. Verify Redirect URLs

The error occurs because the redirectUrl in your code doesn’t match the one registered in Google Cloud Console or Supabase.
Development:

    Your code uses:
    javascript
    Copy

    const redirectUrl = __DEV__
      ? `https://auth.expo.io/@prarthan/crybaby/auth/callback`
      : `dev.prarthan.crybaby://auth/callback`

    Ensure this exact URL (https://auth.expo.io/@prarthan/crybaby/auth/callback) is:

        Added to Google Cloud Console under Authorized redirect URIs.

        Added to Supabase under Authentication > URL Configuration.

Production:

    Your code uses:
    javascript
    Copy

    `dev.prarthan.crybaby://auth/callback`

    Ensure this exact URL is:

        Added to Google Cloud Console under Authorized redirect URIs.

        Added to Supabase under Authentication > URL Configuration.

        Matches the scheme in your app.json:
        json
        Copy

        {
          "expo": {
            "scheme": "dev.prarthan.crybaby",
            "ios": { "bundleIdentifier": "dev.prarthan.crybaby" },
            "android": { "package": "dev.prarthan.crybaby" }
          }
        }

2. Use AuthSession.makeRedirectUri

Instead of hardcoding the redirect URL, use Expo’s AuthSession.makeRedirectUri to dynamically generate the correct URL for both development and production:
javascript
Copy

const redirectUrl = AuthSession.makeRedirectUri({
  path: 'auth/callback',
  useProxy: __DEV__, // Use the Expo proxy in development
});

This ensures the redirect URL is always correct for the current environment.
3. Fix WebBrowser.openAuthSessionAsync

The redirectUrl passed to WebBrowser.openAuthSessionAsync must match the one used in supabase.auth.signInWithOAuth. Update your code:
javascript
Copy

const result = await WebBrowser.openAuthSessionAsync(
  data.url,
  redirectUrl, // Use the same redirectUrl as above
  {
    preferEphemeralSession: true,
    showInRecents: true,
  }
);

4. Debugging the Redirect URL

Add a log to verify the redirectUrl is correct:
javascript
Copy

console.log('Redirect URL:', redirectUrl);

Check the console output and ensure it matches the URLs registered in Google Cloud Console and Supabase.
5. Update Supabase OAuth Configuration

Ensure Supabase is configured to use the correct Google OAuth client IDs for each platform:

    Android Client ID: Use the one from Google Cloud Console.

    Web Client ID: Use the one from Google Cloud Console.

In your Supabase dashboard:

    Go to Authentication > Providers > Google.

    Add the Web Client ID and Android Client ID.

6. Handle Token Extraction

Your token extraction logic assumes the tokens are in the URL hash (#). However, Supabase typically returns them in the query parameters (?). Update this part:
javascript
Copy

if (result.type === 'success') {
  const { url } = result;
  console.log('Success URL:', url);

  // Extract tokens from query parameters
  const params = new URLSearchParams(url.split('?')[1]);
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');

  if (access_token && refresh_token) {
    console.log('Setting session from auth response');
    const { error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (sessionError) {
      console.error('Session error:', sessionError);
      throw sessionError;
    }
  } else {
    console.error('No tokens in response URL');
    throw new Error('No tokens in response URL');
  }
}

7. Full Updated Function

Here’s the updated signInWithGoogle function:
javascript
Copy

const signInWithGoogle = async () => {
  try {
    console.log('Starting Google sign in...');

    // Create redirect URL dynamically
    const redirectUrl = AuthSession.makeRedirectUri({
      path: 'auth/callback',
      useProxy: __DEV__, // Use Expo proxy in development
    });

    console.log('Auth Configuration:', {
      redirectUrl,
      supabaseUrl: Constants.expoConfig?.extra?.SUPABASE_URL,
      isDev: __DEV__,
      platform: Platform.OS,
    });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          client_id: Platform.OS === 'android'
            ? Constants.expoConfig?.extra?.GOOGLE_ANDROID_CLIENT_ID
            : Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID,
        },
      },
    });

    if (error) {
      console.error('OAuth error:', error);
      throw error;
    }

    if (!data?.url) {
      console.error('No OAuth URL returned');
      throw new Error('No OAuth URL returned');
    }

    console.log('Opening OAuth URL:', data.url);
    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectUrl,
      {
        preferEphemeralSession: true,
        showInRecents: true,
      }
    );

    console.log('Auth Response:', result);

    if (result.type === 'success') {
      const { url } = result;
      console.log('Success URL:', url);

      // Extract tokens from query parameters
      const params = new URLSearchParams(url.split('?')[1]);
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');

      if (access_token && refresh_token) {
        console.log('Setting session from auth response');
        const { error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }
      } else {
        console.error('No tokens in response URL');
        throw new Error('No tokens in response URL');
      }
    } else {
      console.log('Auth cancelled or failed:', result.type);
    }
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};