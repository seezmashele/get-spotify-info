import {
  generateRandomString,
  generateCodeVerifier,
  generateCodeChallenge,
  redirectToAuthCodeFlow
} from "../js/misc"

// Session expired please sign in again

function Home() {
  const clientId = "fc825efe3f8c4a58b1ec570853cb95a1"
  // const redirectUri = "https://get-spotify-info.web.app/callback"
  const redirectUri = "http://localhost:5020/callback"

  return (
    <div className="w-full min-h-screen bg-purple-100f flex flex-col max-w-3xl px-8 mx-auto left-0 right-0 pb-20 justify-centerF items-center select-none">
      <h2 className="font-semibold text-3xl mt-24 text-centerF">
        get-spotify-info
      </h2>
      <p className="mt-4 text-centerF">Get details for an album or playlist</p>
      <button
        onClick={() => {
          redirectToAuthCodeFlow(clientId, redirectUri)
        }}
        className="borderF bg-black text-white mt-12 max-w-sm border-blackF rounded py-4 px-8 hover:bg-green-700"
      >
        Sign in to Spotify
      </button>
    </div>
  )
}

export default Home
