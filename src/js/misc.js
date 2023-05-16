export const generateRandomString = length => {
  let text = ""
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const generateCodeVerifier = length => {
  let text = ""
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const generateCodeChallenge = async codeVerifier => {
  const data = new TextEncoder().encode(codeVerifier)
  const digest = await window.crypto.subtle.digest("SHA-256", data)
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

export const redirectToAuthCodeFlow = async (clientId, redirectUri) => {
  const verifier = generateCodeVerifier(128)
  const challenge = await generateCodeChallenge(verifier)

  localStorage.setItem("verifier", verifier)

  const params = new URLSearchParams()
  params.append("client_id", clientId)
  params.append("response_type", "code")
  params.append("redirect_uri", redirectUri)
  params.append(
    "scope",
    "user-read-private user-read-email user-library-read user-top-read playlist-read-private playlist-read-collaborative user-follow-read user-read-recently-played"
  )
  params.append("code_challenge_method", "S256")
  params.append("code_challenge", challenge)

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
}
