"use client"

import { useEffect, useState } from "react"

function Callback() {
  const [playlistURL, setPlaylistURL] = useState("")
  const clientId = "fc825efe3f8c4a58b1ec570853cb95a1"
  const [code, setCode] = useState(null)
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null)
  // const redirectUri = "https://get-spotify-info.web.app/callback"
  const redirectUri = "http://localhost:5020/callback"

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paramsCode = params.get("code")
    setCode(paramsCode)
  }, [])

  useEffect(() => {
    console.log("check code", code)
    if (code) getAccessToken(clientId, code)
  }, [code])

  useEffect(() => {
    if (spotifyAccessToken) fetchProfile(spotifyAccessToken)
    console.log("check spotifyAccessToken", spotifyAccessToken)
  }, [spotifyAccessToken])

  async function getAccessToken(clientId, passedCode) {
    const verifier = localStorage.getItem("verifier")
    const params = new URLSearchParams()
    params.append("client_id", clientId)
    params.append("grant_type", "authorization_code")
    params.append("code", passedCode)
    params.append("redirect_uri", redirectUri)
    params.append("code_verifier", verifier)
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    })
    const { access_token } = await result.json()
    if (access_token) setSpotifyAccessToken(access_token)
  }

  async function fetchProfile(token) {
    console.log("fetching profile - token", token)
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
    let profile = await result.json()
    console.log("profile", profile)
    // return profile
  }

  const doNothing = () => {
    console.log("did nothing")
  }

  return (
    <div className=" w-full flex flex-col max-w-3xl px-8 mx-auto left-0 right-0 pb-20 select-none">
      <div className="w-full mt-6 flex bg-neutral-50 p-3 rounded-md">
        <div className="mr-5">
          <h3 className="font-bold text-xl text-centerF">
            Get details for an album or playlist
          </h3>
          <p className="mt-2 text-centerF text-neutral-500">
            Paste the link of any Spotify album or playlist below
          </p>
        </div>
        <div className="flex-grow"></div>
        <div className="">
          <div className="borderF border-blackF text-white bg-black rounded px-3 py-2 text-center">
            <p className="text-xs">Signed in as</p>
            <p className="font-bold">Sizwe M</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-8 bg-neutral-300F flex justify-center items-center space-x-3">
        <input
          required
          placeholder="Paste the link here"
          type="text"
          value={playlistURL}
          onChange={e => setPlaylistURL(e.target.value)}
          className="border flex-grow file:border-2 rounded p-4 border-neutral-400"
        />
        <button
          onClick={doNothing}
          className="border border-neutral-200 bg-neutral-50 rounded p-2 px-3 hover:bg-neutral-100"
        >
          Paste link
        </button>
        <button
          onClick={doNothing}
          className="bg-green-600 text-white rounded p-2 px-3 hover:bg-green-700"
        >
          Get info
        </button>
      </div>
      {/* <div className="rounded font-semibold bg-red-50 p-3 text-red-500 text-center mt-9">
        Session expired. Sign in again
      </div> */}
      <div className="w-full mt-8 flex justify-center">
        <div
          className="borderF roundedF w-full min-h-[20rem] border-black
        "
        >
          <div className="w-full pb-3 flex space-x-3 items-center border-black border-b">
            <div className="font-bold text-xl flex-grow select-text">
              Album: DJ Bongz – Syalo
            </div>
            <div className=""></div>
            <button
              onClick={doNothing}
              className="bg-neutral-50 whitespace-nowrap text-blue-600F border-neutral-200 border rounded p-2 px-3 hover:bg-neutral-100"
            >
              Copy title
            </button>
            <button
              onClick={doNothing}
              className="bg-neutral-50 whitespace-nowrap rounded p-2 px-3 hover:bg-neutral-100 border border-neutral-200"
            >
              Copy tracklist
            </button>
          </div>

          <div className="select-text py-6">
            <ol start="1" className="list-decimal">
              <li>Soulmove Nomathemba (feat. Sisanda & Kgosi)</li>
              <li>Lele </li>
              <li>DJ Bongz & DJ Gukwa – Smokolo Mapakisha (feat. Zaba)</li>
              <li>Kumnandi Ukujaiva (feat. Zaba)</li>
              <li>Angsakhoni (feat. Scammer & Mr AVM)</li>
              <li>Keep It Cool (feat. Zaba)</li>
              <li>Shaya (feat. Bongo & Rara)</li>
              <li>Agogo</li>
            </ol>
          </div>
          <div className="flex py-6 justify-center items-center select-text border-t border-black space-x-5">
            <div className="">
              <span>Release date: </span>
              <span>20 September 2022</span>
            </div>
            <div className="flex-grow"></div>
            {/* <div className="select-none"> - </div> */}
            <div className="flex-grow"></div>
            <div className="">
              <span>5 songs.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Callback
